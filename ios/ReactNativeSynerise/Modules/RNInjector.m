//
//  RNInjector.m
//  react-native-synerise-sdk
//
//  Created by Synerise
//  Copyright © 2021 Synerise. All rights reserved.
//

#import "RNInjector.h"
#import "RNSyneriseManager.h"

static NSString * const RNInjectorEventListenerUrlActionKey = @"URL_ACTION_LISTENER_KEY";
static NSString * const RNInjectorEventListenerDeepLinkActionKey = @"DEEPLINK_ACTION_LISTENER_KEY";

static NSString * const RNInjectorEventListenerBannerPresentedKey = @"BANNER_PRESENTED_LISTENER_KEY";
static NSString * const RNInjectorEventListenerBannerHiddenKey = @"BANNER_HIDDEN_LISTENER_KEY";

static NSString * const RNInjectorEventListenerWalkthroughLoadedKey = @"WALKTHROUGH_LOADED_LISTENER_KEY";
static NSString * const RNInjectorEventListenerWalkthroughLoadingErrorKey = @"WALKTHROUGH_LOADING_ERROR_LISTENER_KEY";
static NSString * const RNInjectorEventListenerWalkthroughPresentedKey = @"WALKTHROUGH_PRESENTED_LISTENER_KEY";
static NSString * const RNInjectorEventListenerWalkthroughHiddenKey = @"WALKTHROUGH_HIDDEN_LISTENER_KEY";

static NSString * const RNInjectorEventListenerInAppMessagePresentedKey = @"IN_APP_MESSAGE_PRESENTED_LISTENER_KEY";
static NSString * const RNInjectorEventListenerInAppMessageHiddenKey = @"IN_APP_MESSAGE_HIDDEN_LISTENER_KEY";
static NSString * const RNInjectorEventListenerInAppMessageUrlActionKey = @"IN_APP_MESSAGE_URL_ACTION_LISTENER_KEY";
static NSString * const RNInjectorEventListenerInAppMessageDeeplinkActionKey = @"IN_APP_MESSAGE_DEEPLINK_ACTION_LISTENER_KEY";
static NSString * const RNInjectorEventListenerInAppMessageCustomActionKey = @"IN_APP_MESSAGE_CUSTOM_ACTION_LISTENER_KEY";

NS_ASSUME_NONNULL_BEGIN

@interface RNInjector () <RNSyneriseManagerDelegate, SNRInjectorBannerDelegate, SNRInjectorWalkthroughDelegate, SNRInjectorInAppMessageDelegate>

@end

@implementation RNInjector {
    BOOL _bannerShouldPresentFlag;
}

static RNInjector *moduleInstance;

RCT_EXPORT_MODULE();

#pragma mark - Lifecycle

- (instancetype)init {
    if (moduleInstance != nil) {
        return moduleInstance;
    }
    
    self = [super init];
    
    if (self) {
        [[RNSyneriseManager sharedInstance] addDelegate:self];
        
        _bannerShouldPresentFlag = YES;
    }
    
    moduleInstance = self;
    
    return self;
}
         
#pragma mark - Public

- (void)executeURLAction:(NSURL *)URL {
    [self sendURLActionToJS:URL];
}

- (void)executeDeepLinkAction:(NSString *)deepLink {
    [self sendDeepLinkActionToJS:deepLink];
}

#pragma mark - Private

- (void)sendURLActionToJS:(NSURL *)URL {
    NSDictionary *userInfo = @{
        @"url": [URL absoluteString]
    };
    [[NSNotificationCenter defaultCenter] postNotificationName:kRNSyneriseUrlActionEvent object:nil userInfo:userInfo];
}

- (void)sendDeepLinkActionToJS:(NSString *)deepLink {
    NSDictionary *userInfo = @{
        @"deepLink": deepLink
    };
    [[NSNotificationCenter defaultCenter] postNotificationName:kRNSyneriseDeepLinkActionEvent object:nil userInfo:userInfo];
}

- (void)sendBannerPresentedToJS {
    [[NSNotificationCenter defaultCenter] postNotificationName:kRNSyneriseBannerPresentedEvent object:nil userInfo:nil];
}

- (void)sendBannerHiddenToJS {
    [[NSNotificationCenter defaultCenter] postNotificationName:kRNSyneriseBannerHiddenEvent object:nil userInfo:nil];
}

- (void)sendWalkthroughLoadedToJS {
    [[NSNotificationCenter defaultCenter] postNotificationName:kRNSyneriseWalkthroughLoadedEvent object:nil userInfo:nil];
}

- (void)sendWalkthroughLoadingErrorToJS:(NSError *)error {
    NSDictionary *errorDictionary = [self dictionaryWithError:error];
    [[NSNotificationCenter defaultCenter] postNotificationName:kRNSyneriseWalkthroughLoadingErrorEvent object:nil userInfo:errorDictionary];
}

- (void)sendWalkthroughPresentedToJS {
    [[NSNotificationCenter defaultCenter] postNotificationName:kRNSyneriseWalkthroughPresentedEvent object:nil userInfo:nil];
}

- (void)sendWalkthroughHiddenToJS {
    [[NSNotificationCenter defaultCenter] postNotificationName:kRNSyneriseWalkthroughHiddenEvent object:nil userInfo:nil];
}

- (void)sendInAppMessagePresentedToJS:(SNRInAppMessageData *)data {
    NSDictionary *userInfo = @{
        @"data": [self dictionaryWithInAppMessageData:data]
    };
    [[NSNotificationCenter defaultCenter] postNotificationName:kRNSyneriseInAppMessagePresentedKey object:nil userInfo:userInfo];
}

- (void)sendInAppMessageHiddenToJS:(SNRInAppMessageData *)data {
    NSDictionary *userInfo = @{
        @"data": [self dictionaryWithInAppMessageData:data]
    };
    [[NSNotificationCenter defaultCenter] postNotificationName:kRNSyneriseInAppMessageHiddenKey object:nil userInfo:userInfo];
}

- (void)sendInAppMessageUrlActionToJS:(SNRInAppMessageData *)data url:(NSURL *)URL {
    NSDictionary *userInfo = @{
        @"data": [self dictionaryWithInAppMessageData:data],
        @"url": [URL absoluteString]
    };
    [[NSNotificationCenter defaultCenter] postNotificationName:kRNSyneriseInAppMessageUrlActionKey object:nil userInfo:userInfo];
}

- (void)sendInAppMessageDeepLinkActionToJS:(SNRInAppMessageData *)data deepLink:(NSString *)deepLink {
    NSDictionary *userInfo = @{
        @"data": [self dictionaryWithInAppMessageData:data],
        @"deepLink": deepLink
    };
    [[NSNotificationCenter defaultCenter] postNotificationName:kRNSyneriseInAppMessageDeeplinkActionKey object:nil userInfo:userInfo];
}

- (void)sendInAppMessageCustomActionToJS:(SNRInAppMessageData *)data name:(NSString *)name parameters:(nullable NSDictionary *)parameters {
    NSDictionary *userInfo = @{
        @"data": [self dictionaryWithInAppMessageData:data],
        @"name": name,
        @"parameters": [NSDictionary dictionaryWithDictionary:parameters]
    };
    [[NSNotificationCenter defaultCenter] postNotificationName:kRNSyneriseInAppMessageCustomActionKey object:nil userInfo:userInfo];
}

#pragma mark - RNSyneriseManagerDelegate

- (void)applicationJavaScriptDidLoad {
    // nothing for yet
}

- (void)syneriseJavaScriptDidLoad {
    [SNRInjector setBannerDelegate:self];
    [SNRInjector setWalkthroughDelegate:self];
    [SNRInjector setInAppMessageDelegate:self];
}

#pragma mark - SNRInjectorBannerDelegate

- (BOOL)SNR_shouldBannerAppear:(NSDictionary *)bannerDictionary {
    return _bannerShouldPresentFlag;
}

- (void)SNR_bannerDidAppear {
    [self sendBannerPresentedToJS];
}

- (void)SNR_bannerDidDisappear {
    [self sendBannerHiddenToJS];
}

#pragma mark - SNRInjectorWalkthroughDelegate

- (void)SNR_walkthroughDidLoad {
    [self sendWalkthroughLoadedToJS];
}

- (void)SNR_walkthroughDidLoad:(NSDictionary *)walkthroughDictionary {
    [self sendWalkthroughLoadedToJS];
}

- (void)SNR_walkthroughLoadingError:(NSError *)error {
    [self sendWalkthroughLoadingErrorToJS:error];
}

- (void)SNR_walkthroughDidAppear {
    [self sendBannerPresentedToJS];
}

- (void)SNR_walkthroughDidDisappear {
    [self sendWalkthroughHiddenToJS];
}

#pragma mark - SNRInjectorInAppMessageDelegate

- (BOOL)SNR_shouldInAppMessageAppear:(SNRInAppMessageData *)data {
    return YES;
}

- (void)SNR_inAppMessageDidAppear:(SNRInAppMessageData *)data {
    [self sendInAppMessagePresentedToJS:data];
}

- (void)SNR_inAppMessageDidDisappear:(SNRInAppMessageData *)data {
    [self sendInAppMessageHiddenToJS:data];
}

- (void)SNR_inAppMessageDidChangeSize:(CGRect)rect {
    // nothing for yet
}

- (nullable NSDictionary *)SNR_inAppMessageContextIsNeeded:(SNRInAppMessageData *)data {
    return nil;
}

- (void)SNR_inAppMessageHandledURLAction:(SNRInAppMessageData *)data url:(NSURL *)url {
    [self sendInAppMessageUrlActionToJS:data url:url];
}

- (void)SNR_inAppMessageHandledDeeplinkAction:(SNRInAppMessageData *)data deeplink:(NSString *)deeplink {
    [self sendInAppMessageDeepLinkActionToJS:data deepLink:deeplink];
}

- (void)SNR_inAppMessageHandledCustomAction:(SNRInAppMessageData *)data name:(NSString *)name parameters:(NSDictionary *)parameters {
    [self sendInAppMessageCustomActionToJS:data name:name parameters:parameters];
}

#pragma mark - JS Mapping

- (nullable NSDictionary *)dictionaryWithInAppMessageData:(nullable SNRInAppMessageData *)model {
    if (model != nil) {
        NSMutableDictionary *dictionary = [@{} mutableCopy];
        
        [dictionary setString:model.campaignHash forKey:@"campaignHash"];
        [dictionary setString:model.variantIdentifier forKey:@"variantIdentifier"];
        [dictionary setDictionary:model.additionalParameters forKey:@"additionalParameters"];
        [dictionary setBool:model.isTest forKey:@"isTest"];
        
        return dictionary;
    }
    
    return nil;
}

#pragma mark - JS Module

- (NSDictionary *)constantsToExport
{
  return @{
    RNInjectorEventListenerUrlActionKey: kRNSyneriseUrlActionEvent,
    RNInjectorEventListenerDeepLinkActionKey: kRNSyneriseDeepLinkActionEvent,
    
    RNInjectorEventListenerBannerPresentedKey : kRNSyneriseBannerPresentedEvent,
    RNInjectorEventListenerBannerHiddenKey: kRNSyneriseBannerHiddenEvent,
    
    RNInjectorEventListenerWalkthroughLoadedKey: kRNSyneriseWalkthroughLoadedEvent,
    RNInjectorEventListenerWalkthroughLoadingErrorKey: kRNSyneriseWalkthroughLoadingErrorEvent,
    RNInjectorEventListenerWalkthroughPresentedKey: kRNSyneriseWalkthroughPresentedEvent,
    RNInjectorEventListenerWalkthroughHiddenKey: kRNSyneriseWalkthroughHiddenEvent,
    
    RNInjectorEventListenerInAppMessagePresentedKey: kRNSyneriseInAppMessagePresentedKey,
    RNInjectorEventListenerInAppMessageHiddenKey: kRNSyneriseInAppMessageHiddenKey,
    RNInjectorEventListenerInAppMessageUrlActionKey: kRNSyneriseInAppMessageUrlActionKey,
    RNInjectorEventListenerInAppMessageDeeplinkActionKey: kRNSyneriseInAppMessageDeeplinkActionKey,
    RNInjectorEventListenerInAppMessageCustomActionKey: kRNSyneriseInAppMessageCustomActionKey
  };
}

//setBannerShouldPresentFlag(flag: boolean)

RCT_EXPORT_METHOD(setBannerShouldPresentFlag:(nonnull NSNumber *)flag)
{
    _bannerShouldPresentFlag = [flag boolValue];
}

//getWalkthrough()

RCT_EXPORT_METHOD(getWalkthrough)
{
    [SNRInjector getWalkthrough];
}

//showWalkthrough()

RCT_EXPORT_METHOD(showWalkthrough)
{
    [SNRInjector showWalkthrough];
}

//isWalkthroughLoaded() : boolean

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(isWalkthroughLoaded)
{
    return [NSNumber numberWithBool:[SNRInjector isWalkthroughLoaded]];
}

//isLoadedWalkthroughUnique() : boolean

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(isLoadedWalkthroughUnique)
{
    return [NSNumber numberWithBool:[SNRInjector isLoadedWalkthroughUnique]];
}

@end

NS_ASSUME_NONNULL_END
