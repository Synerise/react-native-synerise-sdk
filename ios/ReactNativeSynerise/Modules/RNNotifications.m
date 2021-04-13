//
//  RNNotifications.m
//  react-native-synerise-sdk
//
//  Created by Synerise
//  Copyright © 2021 Synerise. All rights reserved.
//

#import "RNNotifications.h"
#import "RNSyneriseManager.h"

static char * const RNNotificationsQueueLabel = "com.synerise.sdk.react.notifications.queue";

static NSString * const RNNotificationsEventListenerRegistrationTokenKey = @"REGISTRATION_TOKEN_LISTENER_KEY";
static NSString * const RNNotificationsEventListenerRegistrationRequiredKey = @"REGISTRATION_REQUIRED_LISTENER_KEY";
static NSString * const RNNotificationsEventListenerNotificationKey = @"NOTIFICATION_LISTENER_KEY";

static NSString * const RNNotificationsEventObjectTokenKey = @"token";
static NSString * const RNNotificationsEventObjectPayloadKey = @"payload";

NS_ASSUME_NONNULL_BEGIN

@interface RNNotifications () <RNSyneriseManagerDelegate>

@property (strong, nonatomic, nonnull, readonly) dispatch_queue_t queue;

@property (copy, nonatomic, nullable, readwrite) NSString *registrationToken;
@property (copy, nonatomic, nonnull, readonly) NSMutableArray<NSDictionary *> *pendingNotifications;

@end

@implementation RNNotifications {
    BOOL _isProcessing;
}

static RNNotifications *moduleInstance;

RCT_EXPORT_MODULE();

#pragma mark - Static (Public)

+ (void)didChangeRegistrationToken:(NSString *)registrationToken {
    [moduleInstance didChangeRegistrationToken:registrationToken];
}

+ (void)didReceiveNotification:(NSDictionary *)userInfo {
    [moduleInstance didReceiveNotification:userInfo];
}

#pragma mark - Lifecycle

- (instancetype)init {
    if (moduleInstance != nil) {
        return moduleInstance;
    }
    
    self = [super init];
    
    if (self) {
        _queue = dispatch_queue_create(RNNotificationsQueueLabel, DISPATCH_QUEUE_SERIAL);
        _pendingNotifications = [@[] mutableCopy];

        _isProcessing = NO;
        
        [[RNSyneriseManager sharedInstance] addDelegate:self];
    }
    
    moduleInstance = self;
    
    return self;
}

#pragma mark - Public

- (void)executeRegistrationRequired {
    if ([self isProcessing] == YES) {
        [self sendRegistrationRequiredToJS];
    }
}

#pragma mark - Private

- (void)didChangeRegistrationToken:(NSString *)registrationToken {
    if ([self isProcessing] == YES) {
        [self sendRegistrationTokenToJS:registrationToken];
    } else {
        self.registrationToken = registrationToken;
    }
}

- (void)didReceiveNotification:(NSDictionary *)userInfo {
    if ([self isProcessing] == YES) {
        [self sendNotificationToJS:userInfo];
    } else {
        [self addPendingNotification:userInfo];
    }
}

- (BOOL)canStartProcessing {
    if ([[RNSyneriseManager sharedInstance] isApplicationJavaScriptLoaded] == YES &&
        [[RNSyneriseManager sharedInstance] isSyneriseJavaScriptLoaded] == YES) {
        return YES;
    }
    
    return NO;
}

- (BOOL)isProcessing {
    return _isProcessing;
}

- (void)startProcessingIfPossible {
    if ([self canStartProcessing] == YES) {
        _isProcessing = YES;
        
        NSString *registrationToken = self.registrationToken;
        if (registrationToken != nil) {
            [self sendRegistrationTokenToJS:registrationToken];
        }
        
        [self flushPendingNotifications];
    }
}

- (void)addPendingNotification:(NSDictionary *)userInfo {
    dispatch_async(self.queue, ^{
        [self.pendingNotifications addObject:userInfo];
    });
}

- (void)flushPendingNotifications {
    dispatch_async(self.queue, ^{
        NSArray *pendingNotificationsCopied = [self.pendingNotifications copy];
        NSInteger countNotifications = [pendingNotificationsCopied count];
        
        for (NSInteger i = 0; i < countNotifications; i++) {
            NSDictionary *notification = pendingNotificationsCopied[i];
            
            [self sendNotificationToJS:notification];
        }
        
        [self.pendingNotifications removeAllObjects];
    });
}

- (void)sendRegistrationTokenToJS:(NSString *)registrationToken {
    id eventBody = [self dictionaryWithRegistrationToken:registrationToken];
    [[NSNotificationCenter defaultCenter] postNotificationName:kRNSyneriseRegistrationTokenEvent object:nil userInfo:eventBody];
}

- (void)sendRegistrationRequiredToJS {
    [[NSNotificationCenter defaultCenter] postNotificationName:kRNSyneriseRegistrationRequiredEvent object:nil userInfo:nil];
}

- (void)sendNotificationToJS:(NSDictionary *)userInfo {
    id eventBody = [self dictionaryWithNotification:userInfo];
    [[NSNotificationCenter defaultCenter] postNotificationName:kRNSyneriseNotificationEvent object:nil userInfo:eventBody];
}

#pragma mark - JS Mapping

- (NSDictionary *)dictionaryWithRegistrationToken:(NSString *)registrationToken {
    return @{
        RNNotificationsEventObjectTokenKey: registrationToken
    };
}

- (NSDictionary *)dictionaryWithNotification:(NSDictionary *)userInfo {
    return @{
        RNNotificationsEventObjectPayloadKey: userInfo
    };
}

#pragma mark - RNSyneriseManagerDelegate

- (void)applicationJavaScriptDidLoad {
    [self startProcessingIfPossible];
}

- (void)syneriseJavaScriptDidLoad {
    [self startProcessingIfPossible];
}

#pragma mark - JS Module

- (NSDictionary *)constantsToExport
{
  return @{
      RNNotificationsEventListenerRegistrationTokenKey: kRNSyneriseRegistrationTokenEvent,
      RNNotificationsEventListenerRegistrationRequiredKey: kRNSyneriseRegistrationRequiredEvent,
      RNNotificationsEventListenerNotificationKey: kRNSyneriseNotificationEvent
  };
}

//registerForNotifications(registrationToken: String, mobileAgreement: boolean, onSuccess: () => void, onError: (error: Error) => void)

RCT_EXPORT_METHOD(registerForNotifications:(NSString *)registrationToken mobileAgreement:(nonnull NSNumber *)mobileAgreement response:(RCTResponseSenderBlock)response)
{
    [SNRClient registerForPush:registrationToken mobilePushAgreement:[mobileAgreement boolValue] success:^(BOOL isSuccess) {
        [self executeSuccessCallbackResponse:response data:@1];
    } failure:^(NSError *error) {
        [self executeFailureCallbackResponse:response error:error];
    }];
}

//isSyneriseNotification(payload: object)

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(isSyneriseNotification:(NSDictionary *)userInfo)
{
    return [NSNumber numberWithBool:[SNRSynerise isSyneriseNotification:userInfo]];
}

//isSyneriseSimplePush(payload: object)

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(isSyneriseSimplePush:(NSDictionary *)userInfo)
{
    return [NSNumber numberWithBool:[SNRSynerise isSyneriseSimplePush:userInfo]];
}

//isSyneriseBanner(payload: object)

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(isSyneriseBanner:(NSDictionary *)userInfo)
{
    return [NSNumber numberWithBool:[SNRSynerise isSyneriseBanner:userInfo]];
}

//isSilentCommand(payload: object)

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(isSilentCommand:(NSDictionary *)userInfo)
{
    return [NSNumber numberWithBool:[SNRSynerise isSyneriseSilentCommand:userInfo]];
}

//isSilentSDKCommand(payload: object)

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(isSilentSDKCommand:(NSDictionary *)userInfo)
{
    return [NSNumber numberWithBool:[SNRSynerise isSyneriseSilentSDKCommand:userInfo]];
}

//isNotificationEncrypted(payload: object)

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(isNotificationEncrypted:(NSDictionary *)userInfo)
{
    return [NSNumber numberWithBool:[SNRSynerise isNotificationEncrypted:userInfo]];
}

//decryptNotification(payload: object)

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(decryptNotification:(NSDictionary *)userInfo)
{
    NSDictionary *decryptedUserInfo = [SNRSynerise decryptNotification:userInfo];
    if (decryptedUserInfo != nil) {
        return @[
            @YES,
            decryptedUserInfo
        ];
    } else {
        return @[
            @NO,
            [NSNull null]
        ];
    }
}

//handleNotification(payload: object)

RCT_EXPORT_METHOD(handleNotification:(NSDictionary *)userInfo)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        [SNRSynerise handleNotification:userInfo];
    });
}

@end

NS_ASSUME_NONNULL_END
