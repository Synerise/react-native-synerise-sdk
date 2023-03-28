//
//  RNSynerise.m
//  react-native-synerise-sdk
//
//  Created by Synerise
//  Copyright © 2021 Synerise. All rights reserved.
//

#import "RNSynerise.h"
#import "RNSyneriseInitializer.h"
#import "RNInjector.h"
#import "RNNotifications.h"

static NSString * const RNSyneriseInitializationSucessEventListenerKey = @"INITIALIZATION_SUCCESS_LISTENER_KEY";
static NSString * const RNSyneriseInitializationFailureEventListenerKey = @"INITIALIZATION_FAILURE_LISTENER_KEY";

NS_ASSUME_NONNULL_BEGIN

@interface RNSynerise () <SNRSyneriseDelegate>

@property (strong, nonatomic, nullable, readwrite) RNSyneriseInitializer *initializer;

@end

@implementation RNSynerise

static RNSynerise *moduleInstance;

static BOOL isInitialized = NO;

RCT_EXPORT_MODULE();

#pragma mark - Lifecycle

- (instancetype)init {
    if (moduleInstance != nil) {
        return moduleInstance;
    }
    
    self = [super init];
    
    if (self) {
        [SNRSynerise setDelegate:self];
    }
    
    moduleInstance = self;
    
    return self;
}

#pragma mark - Private

- (void)sendInitializationSuccessToJS {
    [[NSNotificationCenter defaultCenter] postNotificationName:kRNSyneriseInitializationSuccessEvent object:nil userInfo:@{}];
}

- (void)sendInitializationFailureToJS:(NSError *)error {
    NSDictionary *errorDictionary = [self dictionaryWithError:error];
    [[NSNotificationCenter defaultCenter] postNotificationName:kRNSyneriseInitializationFailureEvent object:nil userInfo:errorDictionary];
}

#pragma mark - SNRSyneriseDelegate

- (void)SNR_initialized {
    [self sendInitializationSuccessToJS];
}

- (void)SNR_initializationError:(NSError *)error {
    [self sendInitializationFailureToJS:error];
}

- (void)SNR_registerForPushNotificationsIsNeeded {
    [[RNSyneriseManager sharedInstance].notifications executeRegistrationRequired];
}

- (void)SNR_handledActionWithURL:(NSURL *)url activity:(SNRSyneriseActivity)activity completionHandler:(SNRSyneriseActivityCompletionHandler)completionHandler {
    if (activity == SNRSyneriseActivityInAppMessage) {
        return;
    }
    
    completionHandler(SNRSyneriseActivityActionHide, ^{
        [[RNSyneriseManager sharedInstance].injector executeURLAction:url];
    });
}

- (void)SNR_handledActionWithDeepLink:(NSString *)deepLink activity:(SNRSyneriseActivity)activity completionHandler:(SNRSyneriseActivityCompletionHandler)completionHandler {
    if (activity == SNRSyneriseActivityInAppMessage) {
        return;
    }
    
    completionHandler(SNRSyneriseActivityActionHide, ^{
        [[RNSyneriseManager sharedInstance].injector executeDeepLinkAction:deepLink];
    });
}

#pragma mark - JS Module

- (NSDictionary *)constantsToExport
{
  return @{
      RNSyneriseInitializationSucessEventListenerKey: kRNSyneriseInitializationSuccessEvent,
      RNSyneriseInitializationFailureEventListenerKey: kRNSyneriseInitializationFailureEvent
  };
}

RCT_EXPORT_METHOD(createInitializer) {
   self.initializer = [RNSyneriseInitializer new];
}

RCT_EXPORT_METHOD(withClientApiKey:(NSString *)clientApiKey) {
    if (clientApiKey == nil) {
        return;
    }
    
    self.initializer.clientApiKey = clientApiKey;
}

RCT_EXPORT_METHOD(withBaseUrl:(NSString *)baseUrl) {
    if (baseUrl == nil) {
        return;
    }
    
    self.initializer.baseURL = baseUrl;
}

RCT_EXPORT_METHOD(withDebugModeEnabled:(BOOL)debugModeEnabled) {
    self.initializer.debugModeEnabled = debugModeEnabled;
}

RCT_EXPORT_METHOD(withCrashHandlingEnabled:(BOOL)crashHandlingEnabled) {
    self.initializer.crashHandlingEnabled = crashHandlingEnabled;
}

RCT_EXPORT_METHOD(initializeSynerise) {
    if (isInitialized == YES) {
        return;
    }
    
    [self.initializer initializeSynerise];
    isInitialized = YES;
}

RCT_EXPORT_METHOD(syneriseInitialized) {
    [self.initializer syneriseInitialized];
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(isSyneriseInitialized) {
    return [NSNumber numberWithBool:isInitialized];
}

RCT_EXPORT_METHOD(changeClientApiKey:(NSString *)clientApiKey) {
    if (clientApiKey == nil) {
        return;
    }
    
    [SNRSynerise changeClientApiKey:clientApiKey];
}

@end

NS_ASSUME_NONNULL_END
