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

static NSString * const RNInjectorEventListenerInAppMessagePresentedKey = @"IN_APP_MESSAGE_PRESENTED_LISTENER_KEY";
static NSString * const RNInjectorEventListenerInAppMessageHiddenKey = @"IN_APP_MESSAGE_HIDDEN_LISTENER_KEY";
static NSString * const RNInjectorEventListenerInAppMessageUrlActionKey = @"IN_APP_MESSAGE_URL_ACTION_LISTENER_KEY";
static NSString * const RNInjectorEventListenerInAppMessageDeepLinkActionKey = @"IN_APP_MESSAGE_DEEPLINK_ACTION_LISTENER_KEY";
static NSString * const RNInjectorEventListenerInAppMessageCustomActionKey = @"IN_APP_MESSAGE_CUSTOM_ACTION_LISTENER_KEY";

NS_ASSUME_NONNULL_BEGIN

@interface RNInjector () <RNSyneriseManagerDelegate, SNRInjectorInAppMessageDelegate>

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
    [SNRInjector setInAppMessageDelegate:self];
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

- (void)SNR_inAppMessageHandledDeepLinkAction:(SNRInAppMessageData *)data deeplink:(NSString *)deeplink {
    [self sendInAppMessageDeepLinkActionToJS:data deepLink:deeplink];
}

- (void)SNR_inAppMessageHandledCustomAction:(SNRInAppMessageData *)data name:(NSString *)name parameters:(NSDictionary *)parameters {
    [self sendInAppMessageCustomActionToJS:data name:name parameters:parameters];
}

#pragma mark - JS Mapping

- (NSString *)stringWithSyneriseSource:(SNRSyneriseSource)source {
    if (source == SNRSyneriseSourceSimplePush) {
        return @"SIMPLE_PUSH";
    } else if (source == SNRSyneriseSourceInAppMessage) {
        return @"IN_APP_MESSAGE";
    } else {
        return @"NOT_SPECIFIED";
    }
}

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
    
    RNInjectorEventListenerInAppMessagePresentedKey: kRNSyneriseInAppMessagePresentedKey,
    RNInjectorEventListenerInAppMessageHiddenKey: kRNSyneriseInAppMessageHiddenKey,
    RNInjectorEventListenerInAppMessageUrlActionKey: kRNSyneriseInAppMessageUrlActionKey,
    RNInjectorEventListenerInAppMessageDeepLinkActionKey: kRNSyneriseInAppMessageDeeplinkActionKey,
    RNInjectorEventListenerInAppMessageCustomActionKey: kRNSyneriseInAppMessageCustomActionKey
  };
}

//closeInAppMessage(campaignHash: String)

RCT_EXPORT_METHOD(closeInAppMessage:(nonnull NSString *)campaignHash)
{
    [SNRInjector closeInAppMessageWithCampaignHash:campaignHash];
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

@end

NS_ASSUME_NONNULL_END
