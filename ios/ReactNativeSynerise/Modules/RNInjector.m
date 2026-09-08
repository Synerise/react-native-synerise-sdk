//
//  RNInjector.m
//  react-native-synerise-sdk
//
//  Created by Synerise
//  Copyright © 2021 Synerise. All rights reserved.
//

#import "RNInjector.h"
#import "RNSyneriseManager.h"
#import "RNInAppManager.h"
#import "RNInlineInAppView.h"

#import <React/RCTUIManager.h>
#import <React/RCTUtils.h>

NS_ASSUME_NONNULL_BEGIN

static NSString * const RNInjectorEventListenerUrlActionKey = @"URL_ACTION_LISTENER_KEY";
static NSString * const RNInjectorEventListenerDeepLinkActionKey = @"DEEPLINK_ACTION_LISTENER_KEY";

static NSString * const RNInjectorEventListenerInAppMessagePresentedKey = @"IN_APP_MESSAGE_PRESENTED_LISTENER_KEY";
static NSString * const RNInjectorEventListenerInAppMessageHiddenKey = @"IN_APP_MESSAGE_HIDDEN_LISTENER_KEY";
static NSString * const RNInjectorEventListenerInAppMessageUrlActionKey = @"IN_APP_MESSAGE_URL_ACTION_LISTENER_KEY";
static NSString * const RNInjectorEventListenerInAppMessageDeepLinkActionKey = @"IN_APP_MESSAGE_DEEPLINK_ACTION_LISTENER_KEY";
static NSString * const RNInjectorEventListenerInAppMessageCustomActionKey = @"IN_APP_MESSAGE_CUSTOM_ACTION_LISTENER_KEY";
static NSString * const RNInjectorEventListenerInAppMessageCustomMethodKey = @"IN_APP_MESSAGE_CUSTOM_METHOD_LISTENER_KEY";

static NSString * const RNInjectorEventListenerInlineInAppMessageAvailableKey = @"INLINE_IN_APP_MESSAGE_AVAILABLE_LISTENER_KEY";
static NSString * const RNInjectorEventListenerInlineInAppMessageUrlActionKey = @"INLINE_IN_APP_MESSAGE_URL_ACTION_LISTENER_KEY";
static NSString * const RNInjectorEventListenerInlineInAppMessageDeepLinkActionKey = @"INLINE_IN_APP_MESSAGE_DEEPLINK_ACTION_LISTENER_KEY";
static NSString * const RNInjectorEventListenerInlineInAppMessageCustomActionKey = @"INLINE_IN_APP_MESSAGE_CUSTOM_ACTION_LISTENER_KEY";
static NSString * const RNInjectorEventListenerInlineInAppMessageCustomMethodKey = @"INLINE_IN_APP_MESSAGE_CUSTOM_METHOD_LISTENER_KEY";

@interface RNInjector () <RNSyneriseManagerDelegate>

@property (nonatomic, strong) RNInAppManager *inAppManager;

@end

@implementation RNInjector

@synthesize bridge = _bridge;

static RNInjector *moduleInstance;

RCT_EXPORT_MODULE();

#pragma mark - Lifecycle

- (instancetype)init {
    if (moduleInstance != nil) {
        return moduleInstance;
    }

    self = [super init];

    if (self) {
        _inAppManager = [[RNInAppManager alloc] init];
        [[RNSyneriseManager sharedInstance] addDelegate:self];
    }

    moduleInstance = self;

    return self;
}

#pragma mark - Public

- (void)executeURLAction:(NSURL *)URL source:(SNRSyneriseSource)source {
    [self sendURLActionToJS:URL source:source];
}

- (void)executeDeepLinkAction:(NSString *)deepLink source:(SNRSyneriseSource)source {
    [self sendDeepLinkActionToJS:deepLink source:source];
}

#pragma mark - Private

- (void)sendURLActionToJS:(NSURL *)URL source:(SNRSyneriseSource)source {
    NSDictionary *userInfo = @{
        @"url": [URL absoluteString],
        @"source": [self stringWithSyneriseSource:source]
    };
    [[NSNotificationCenter defaultCenter] postNotificationName:kRNSyneriseUrlActionEvent object:nil userInfo:userInfo];
}

- (void)sendDeepLinkActionToJS:(NSString *)deepLink source:(SNRSyneriseSource)source {
    NSDictionary *userInfo = @{
        @"deepLink": deepLink,
        @"source": [self stringWithSyneriseSource:source]
    };
    [[NSNotificationCenter defaultCenter] postNotificationName:kRNSyneriseDeepLinkActionEvent object:nil userInfo:userInfo];
}

#pragma mark - RNSyneriseManagerDelegate

- (void)applicationJavaScriptDidLoad {
    // nothing for yet
}

- (void)syneriseIsInitialized {
    [self.inAppManager activate];
}

#pragma mark - JS Mapping

- (NSString *)stringWithSyneriseSource:(SNRSyneriseSource)source {
    if (source == SNRSyneriseSourceSimplePush) {
        return @"SIMPLE_PUSH";
    } else if (source == SNRSyneriseSourceInAppMessage) {
        return @"IN_APP_MESSAGE";
    } else if (source == SNRSyneriseSourceInlineInAppMessage) {
        return @"INLINE_IN_APP_MESSAGE";
    } else {
        return @"NOT_SPECIFIED";
    }
}

#pragma mark - JS Module

- (NSDictionary *)constantsToExport
{
  return @{
    RNInjectorEventListenerUrlActionKey: kRNSyneriseUrlActionEvent,
    RNInjectorEventListenerDeepLinkActionKey: kRNSyneriseDeepLinkActionEvent,

    RNInjectorEventListenerInAppMessagePresentedKey: kRNSyneriseInAppMessagePresentedKey,
    RNInjectorEventListenerInAppMessageHiddenKey: kRNSyneriseInAppMessageHiddenKey,
    RNInjectorEventListenerInAppMessageUrlActionKey: kRNSyneriseInAppMessageUrlActionKey,
    RNInjectorEventListenerInAppMessageDeepLinkActionKey: kRNSyneriseInAppMessageDeeplinkActionKey,
    RNInjectorEventListenerInAppMessageCustomActionKey: kRNSyneriseInAppMessageCustomActionKey,

    RNInjectorEventListenerInlineInAppMessageAvailableKey: kRNSyneriseInlineInAppMessageAvailableKey,
    RNInjectorEventListenerInlineInAppMessageUrlActionKey: kRNSyneriseInlineInAppMessageUrlActionKey,
    RNInjectorEventListenerInlineInAppMessageDeepLinkActionKey: kRNSyneriseInlineInAppMessageDeeplinkActionKey,
    RNInjectorEventListenerInlineInAppMessageCustomActionKey: kRNSyneriseInlineInAppMessageCustomActionKey,
    RNInjectorEventListenerInlineInAppMessageCustomMethodKey: kRNSyneriseInlineInAppMessageCustomMethodKey,
    RNInjectorEventListenerInAppMessageCustomMethodKey: kRNSyneriseInAppMessageCustomMethodKey
  };
}

//setInAppContext(context: object)

RCT_EXPORT_METHOD(setInAppContext:(nonnull NSDictionary *)context)
{
    [SNRInjector setInAppContext:context];
}

//notifyInAppContextChange()

RCT_EXPORT_METHOD(notifyInAppContextChange)
{
    [SNRInjector notifyInAppContextChange];
}

//closeInAppMessage(campaignHash: String)

RCT_EXPORT_METHOD(closeInAppMessage:(nonnull NSString *)campaignHash)
{
    [self.inAppManager closeInAppMessage:campaignHash];
}

//handleOpenUrlBySDK(url: string)

RCT_EXPORT_METHOD(handleOpenUrlBySDK:(nonnull NSString *)urlString)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        NSURL *URL = [NSURL URLWithString:urlString];
        if ([[UIApplication sharedApplication] canOpenURL:URL]) {
            if (@available(iOS 10, *)) {
                [[UIApplication sharedApplication] openURL:URL options:@{} completionHandler:nil];
            } else {
                [[UIApplication sharedApplication] openURL:URL];
            }
        }
    });
}

//handleDeepLinkBySDK(deepLink: string)

RCT_EXPORT_METHOD(handleDeepLinkBySDK:(nonnull NSString *)deepLink)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        NSURL *deepLinkURL = [NSURL URLWithString:deepLink];
        if ([[UIApplication sharedApplication] canOpenURL:deepLinkURL]) {
            if (@available(iOS 10, *)) {
                [[UIApplication sharedApplication] openURL:deepLinkURL options:@{} completionHandler:^(BOOL success) {

                }];
            } else {
                [[UIApplication sharedApplication] openURL:deepLinkURL];
            }
        }
    });
}

//resolveInlineCustomMethod(callId: String, success: boolean, result: any | null, error: string | null)

RCT_EXPORT_METHOD(resolveInlineCustomMethod:(nonnull NSString *)callId success:(BOOL)success result:(nullable id)result error:(nullable NSString *)error)
{
    [self.inAppManager resolveInlineCustomMethodWithCallId:callId success:success result:result error:error];
}

//isInlineInAppRendered(viewTag: number, callback)

RCT_EXPORT_METHOD(isInlineInAppRendered:(nonnull NSNumber *)viewTag response:(RCTResponseSenderBlock)response)
{
    // Resolve the view on the main queue instead of `addUIBlock:` — that API asserts the UIManager queue
    // and its blocks only run on the next UIManager batch, which may never come while the screen is idle.
    RCTUIManager *uiManager = self.bridge.uiManager;
    RCTExecuteOnMainQueue(^{
        UIView *view = [uiManager viewForReactTag:viewTag];
        BOOL isRendered = [view isKindOfClass:[RNInlineInAppView class]] ? [(RNInlineInAppView *)view isRendered] : NO;
        [self executeSuccessCallbackResponse:response data:@(isRendered)];
    });
}

//getInlineInAppData(viewTag: number, callback)

RCT_EXPORT_METHOD(getInlineInAppData:(nonnull NSNumber *)viewTag response:(RCTResponseSenderBlock)response)
{
    RCTUIManager *uiManager = self.bridge.uiManager;
    RCTExecuteOnMainQueue(^{
        UIView *view = [uiManager viewForReactTag:viewTag];
        NSDictionary *data = [view isKindOfClass:[RNInlineInAppView class]] ? [(RNInlineInAppView *)view currentDataDictionary] : nil;
        [self executeSuccessCallbackResponse:response data:(data != nil ? data : [NSNull null])];
    });
}

//resolveInAppCustomMethod(callId: String, success: boolean, result: any | null, error: string | null)

RCT_EXPORT_METHOD(resolveInAppCustomMethod:(nonnull NSString *)callId success:(BOOL)success result:(nullable id)result error:(nullable NSString *)error)
{
    [self.inAppManager resolveInAppCustomMethodWithCallId:callId success:success result:result error:error];
}

@end

NS_ASSUME_NONNULL_END
