//
//  RNInjector.m
//  react-native-synerise-sdk
//
//  Created by Synerise
//  Copyright © 2018 Synerise. All rights reserved.
//

#import "RNInjector.h"
#import "RNSyneriseManager.h"

static NSString * const RNInjectorEventListenerUrlActionKey = @"URL_ACTION_LISTENER_KEY";
static NSString * const RNInjectorEventListenerDeepLinkActionKey = @"DEEPLINK_ACTION_LISTENER_KEY";
static NSString * const RNInjectorEventListenerBannerPresentedKey = @"BANNER_PRESENTED_LISTENER_KEY";
static NSString * const RNInjectorEventListenerBannerHiddenKey = @"BANNER_HIDDEN_LISTENER_KEY";

static NSString * const RNInjectorEventObjectUrlKey = @"url";
static NSString * const RNInjectorEventObjectDeepLinkKey = @"deepLink";

NS_ASSUME_NONNULL_BEGIN

@interface RNInjector () <RNSyneriseManagerDelegate, SNRInjectorBannerDelegate>

@end

@implementation RNInjector

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
        [SNRInjector setBannerDelegate:self];
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
    id eventBody = [self dictionaryWithURLAction:URL];
    [[NSNotificationCenter defaultCenter] postNotificationName:kRNSyneriseUrlActionEvent object:nil userInfo:eventBody];
}

- (void)sendDeepLinkActionToJS:(NSString *)deepLink {
    id eventBody = [self dictionaryWithDeepLinkAction:deepLink];
    [[NSNotificationCenter defaultCenter] postNotificationName:kRNSyneriseDeepLinkActionEvent object:nil userInfo:eventBody];
}

- (void)sendBannerPresentedToJS {
    [[NSNotificationCenter defaultCenter] postNotificationName:kRNSyneriseBannerPresentedEvent object:nil userInfo:nil];
}

- (void)sendBannerHiddenToJS {
    [[NSNotificationCenter defaultCenter] postNotificationName:kRNSyneriseBannerHiddenEvent object:nil userInfo:nil];
}

#pragma mark - SNRInjectorBannerDelegate

- (BOOL)SNR_shouldBannerAppear:(NSDictionary *)bannerDictionary {
    return YES;
}

- (void)SNR_bannerDidAppear {
    [self sendBannerPresentedToJS];
}

- (void)SNR_bannerDidDisappear {
    [self sendBannerHiddenToJS];
}

#pragma mark - JS Mapping

- (NSDictionary *)dictionaryWithURLAction:(NSURL *)URL {
    return @{
        RNInjectorEventObjectUrlKey: [URL absoluteString]
    };
}

- (NSDictionary *)dictionaryWithDeepLinkAction:(NSString *)deepLink {
    return @{
        RNInjectorEventObjectDeepLinkKey: deepLink
    };
}

#pragma mark - JS Module

- (NSDictionary *)constantsToExport
{
  return @{
    RNInjectorEventListenerUrlActionKey: kRNSyneriseUrlActionEvent,
    RNInjectorEventListenerDeepLinkActionKey: kRNSyneriseDeepLinkActionEvent,
    RNInjectorEventListenerBannerPresentedKey : kRNSyneriseBannerPresentedEvent,
    RNInjectorEventListenerBannerHiddenKey: kRNSyneriseBannerHiddenEvent
  };
}

@end

NS_ASSUME_NONNULL_END
