//
//  RNSyneriseNotifications.m
//  react-native-synerise-sdk
//
//  Created by Synerise
//  Copyright © 2021 Synerise. All rights reserved.
//

#import "RNSyneriseNotifications.h"
#import "RNSyneriseManager.h"

static char * const RNNotificationsQueueLabel = "com.synerise.sdk.react.notifications.queue";

static NSString * const RNNotificationsEventListenerRegistrationTokenKey = @"REGISTRATION_TOKEN_LISTENER_KEY";
static NSString * const RNNotificationsEventListenerRegistrationRequiredKey = @"REGISTRATION_REQUIRED_LISTENER_KEY";
static NSString * const RNNotificationsEventListenerNotificationKey = @"NOTIFICATION_LISTENER_KEY";

static NSString * const RNNotificationsEventObjectTokenKey = @"token";
static NSString * const RNNotificationsEventObjectPayloadKey = @"payload";
static NSString * const RNNotificationsEventObjectActionIdentifierKey = @"actionIdentifier";

NS_ASSUME_NONNULL_BEGIN

@interface RNSyneriseNotificationItem: NSObject

@property (copy, nonatomic, nonnull, readwrite) NSDictionary *userInfo;
@property (copy, nonatomic, nullable, readwrite) NSString *actionIdentifier;

@end

@implementation RNSyneriseNotificationItem

@end

@interface RNSyneriseNotifications () <RNSyneriseManagerDelegate>

@property (strong, nonatomic, nonnull, readonly) dispatch_queue_t queue;

@property (copy, nonatomic, nullable, readwrite) NSString *registrationToken;
@property (copy, nonatomic, nonnull, readonly) NSMutableArray<RNSyneriseNotificationItem *> *pendingNotificationItems;

@end

@implementation RNSyneriseNotifications {
    BOOL _isProcessing;
}

static RNSyneriseNotifications *moduleInstance;

RCT_EXPORT_MODULE();

#pragma mark - Static (Public)

+ (void)didChangeRegistrationToken:(NSString *)registrationToken {
    [moduleInstance didChangeRegistrationToken:registrationToken];
}

+ (void)didReceiveNotification:(NSDictionary *)userInfo {
    [moduleInstance didReceiveNotification:userInfo actionIdentifier:nil];
}

+ (void)didReceiveNotification:(NSDictionary *)userInfo actionIdentifier:(nullable NSString *)actionIdentifier {
    [moduleInstance didReceiveNotification:userInfo actionIdentifier:actionIdentifier];
}

#pragma mark - Lifecycle

- (instancetype)init {
    if (moduleInstance != nil) {
        return moduleInstance;
    }
    
    self = [super init];
    
    if (self) {
        _queue = dispatch_queue_create(RNNotificationsQueueLabel, DISPATCH_QUEUE_SERIAL);
        _pendingNotificationItems = [@[] mutableCopy];

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

- (void)didReceiveNotification:(NSDictionary *)userInfo actionIdentifier:(nullable NSString *)actionIdentifier {
    RNSyneriseNotificationItem *notificationItem = [self notificationItemWithUserInfo:userInfo andActionIdentifier:actionIdentifier];
    if (notificationItem == nil) {
        return;
    }
    
    if ([self isProcessing] == YES) {
        [self sendNotificationItemToJS:notificationItem];
    } else {
        [self addPendingNotificationItem:notificationItem];
    }
}

- (nullable RNSyneriseNotificationItem *)notificationItemWithUserInfo:(NSDictionary *)userInfo andActionIdentifier:(nullable NSString *)actionIdentifier {
    RNSyneriseNotificationItem *notificationItem = [RNSyneriseNotificationItem new];
    
    if (userInfo != nil) {
        notificationItem.userInfo = userInfo;
    } else {
        return nil;
    }
    
    if (actionIdentifier != nil) {
        notificationItem.actionIdentifier = actionIdentifier;
    }
    
    return notificationItem;
}

- (BOOL)canStartProcessing {
    if ([[RNSyneriseManager sharedInstance] isApplicationJavaScriptLoaded] == YES &&
        [[RNSyneriseManager sharedInstance] isSyneriseInitialized] == YES) {
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
        
        [self flushPendingNotificationItems];
    }
}

- (void)addPendingNotificationItem:(RNSyneriseNotificationItem *)notificationItem {
    dispatch_async(self.queue, ^{
        [self.pendingNotificationItems addObject:notificationItem];
    });
}

- (void)flushPendingNotificationItems {
    dispatch_async(self.queue, ^{
        NSArray *pendingNotificationItemsCopied = [self.pendingNotificationItems copy];
        NSInteger countNotificationItems = [pendingNotificationItemsCopied count];

        for (NSInteger i = 0; i < countNotificationItems; i++) {
            RNSyneriseNotificationItem *notificationItem = pendingNotificationItemsCopied[i];

            [self sendNotificationItemToJS:notificationItem];
        }

        [self.pendingNotificationItems removeAllObjects];
    });
}

- (void)sendRegistrationTokenToJS:(NSString *)registrationToken {
    id eventBody = [self dictionaryWithRegistrationToken:registrationToken];
    [[NSNotificationCenter defaultCenter] postNotificationName:kRNSyneriseRegistrationTokenEvent object:nil userInfo:eventBody];
}

- (void)sendRegistrationRequiredToJS {
    [[NSNotificationCenter defaultCenter] postNotificationName:kRNSyneriseRegistrationRequiredEvent object:nil userInfo:nil];
}

- (void)sendNotificationItemToJS:(RNSyneriseNotificationItem *)notificationItem {
    id eventBody = [self dictionaryWithNotificationItem:notificationItem];
    [[NSNotificationCenter defaultCenter] postNotificationName:kRNSyneriseNotificationEvent object:nil userInfo:eventBody];
}

#pragma mark - JS Mapping

- (NSDictionary *)dictionaryWithRegistrationToken:(NSString *)registrationToken {
    return @{
        RNNotificationsEventObjectTokenKey: registrationToken
    };
}

- (NSDictionary *)dictionaryWithNotificationItem:(RNSyneriseNotificationItem *)notificationItem {
    return @{
        RNNotificationsEventObjectPayloadKey: notificationItem.userInfo,
        RNNotificationsEventObjectActionIdentifierKey: notificationItem.actionIdentifier ?: [NSNull null]
    };
}

#pragma mark - RNSyneriseManagerDelegate

- (void)applicationJavaScriptDidLoad {
    // nothing for yet
}

- (void)syneriseIsInitialized {
    dispatch_async(dispatch_get_main_queue(), ^{
        [self performSelector:@selector(startProcessingIfPossible) withObject:nil afterDelay:0.25f];
    });
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

//registerForNotifications(registrationToken: String, mobileAgreement: boolean | null, onSuccess: () => void, onError: (error: Error) => void)

RCT_EXPORT_METHOD(registerForNotifications:(NSString *)registrationToken withMobileAgreement:(nonnull NSNumber *)withMobileAgreement mobileAgreement:(nonnull NSNumber *)mobileAgreement response:(RCTResponseSenderBlock)response)
{
    if (withMobileAgreement != nil && [withMobileAgreement boolValue] == YES) {
        [SNRClient registerForPush:registrationToken mobilePushAgreement:[mobileAgreement boolValue] success:^() {
            [self executeSuccessCallbackResponse:response data:@1];
        } failure:^(NSError *error) {
            [self executeFailureCallbackResponse:response error:error];
        }];
    } else {
        [SNRClient registerForPush:registrationToken success:^() {
            [self executeSuccessCallbackResponse:response data:@1];
        } failure:^(NSError *error) {
            [self executeFailureCallbackResponse:response error:error];
        }];
    }
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

//handleNotification(payload: object, actionIdentifier: string)

RCT_EXPORT_METHOD(handleNotification:(NSDictionary *)userInfo actionIdentifier:(NSString *)actionIdentifier)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        [SNRSynerise handleNotification:userInfo actionIdentifier:actionIdentifier];
    });
}

@end

NS_ASSUME_NONNULL_END
