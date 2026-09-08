//
//  RNInAppManager.m
//  react-native-synerise-sdk
//
//  Created by Synerise
//  Copyright © 2024 Synerise. All rights reserved.
//

#import "RNInAppManager.h"
#import "RNInlineInAppViewRegistry.h"

#import "ReactNativeSynerise.h"

NS_ASSUME_NONNULL_BEGIN

static NSString * const RNInAppManagerJinjavaContextKey = @"jinjavaContext";

@interface RNInAppManager () <SNRInjectorInAppMessageDelegate, SNRInjectorInlineInAppMessageDelegate>

@property (nonatomic, strong) NSMutableDictionary<NSString *, SNRInAppCustomMethodCompletion *> *pendingInlineCustomMethodCompletions;
@property (nonatomic, strong) NSMutableDictionary<NSString *, SNRInAppCustomMethodCompletion *> *pendingInAppCustomMethodCompletions;

@end

@implementation RNInAppManager

- (instancetype)init {
    self = [super init];
    if (self) {
        _pendingInlineCustomMethodCompletions = [NSMutableDictionary dictionary];
        _pendingInAppCustomMethodCompletions = [NSMutableDictionary dictionary];
    }
    return self;
}

#pragma mark - Public

- (void)activate {
    [SNRInjector setInAppMessageDelegate:self];
    [SNRInjector setInlineInAppMessageDelegate:self];
}

- (void)closeInAppMessage:(NSString *)campaignHash {
    [SNRInjector closeInAppMessageWithCampaignHash:campaignHash];
}

- (void)resolveInlineCustomMethodWithCallId:(NSString *)callId success:(BOOL)success result:(nullable id)result error:(nullable NSString *)error {
    [self resolvePendingCustomMethodIn:self.pendingInlineCustomMethodCompletions callId:callId success:success result:result error:error];
}

- (void)resolveInAppCustomMethodWithCallId:(NSString *)callId success:(BOOL)success result:(nullable id)result error:(nullable NSString *)error {
    [self resolvePendingCustomMethodIn:self.pendingInAppCustomMethodCompletions callId:callId success:success result:result error:error];
}

#pragma mark - Private

/** Shared by the overlay and inline paths so both accept the same `result` shapes and error fallback. */
- (void)resolvePendingCustomMethodIn:(NSMutableDictionary<NSString *, SNRInAppCustomMethodCompletion *> *)pendingCompletions callId:(NSString *)callId success:(BOOL)success result:(nullable id)result error:(nullable NSString *)error {
    SNRInAppCustomMethodCompletion *completion;
    @synchronized (self) {
        completion = pendingCompletions[callId];
        [pendingCompletions removeObjectForKey:callId];
    }

    if (completion == nil) {
        return;
    }

    if ([result isKindOfClass:[NSNull class]] == YES) {
        result = nil;
    }

    if (success == YES) {
        [completion success:result];
    } else {
        if (error == nil || [error isKindOfClass:[NSNull class]] == YES) {
          error = @"Unknown error.";
        }

        [completion failure:error];
    }
}

#pragma mark - Emit

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

- (void)sendInAppMessageCustomMethodToJS:(SNRInAppMessageData *)data callId:(NSString *)callId name:(NSString *)name parameters:(nullable NSDictionary *)parameters {
    NSDictionary *dataDictionary = [self dictionaryWithInAppMessageData:data];
    NSDictionary *userInfo = @{
        @"callId": callId,
        @"name": name,
        @"parameters": parameters != nil ? [NSDictionary dictionaryWithDictionary:parameters] : @{},
        @"data": dataDictionary != nil ? dataDictionary : @{}
    };
    [[NSNotificationCenter defaultCenter] postNotificationName:kRNSyneriseInAppMessageCustomMethodKey object:nil userInfo:userInfo];
}

- (void)sendInlineInAppAvailableToJS:(SNRInlineInAppMessageData *)data viewIdentifier:(NSString *)viewIdentifier {
    NSDictionary *userInfo = @{
        @"data": [self dictionaryWithInlineInAppMessageData:data],
        @"viewId": viewIdentifier
    };
    [[NSNotificationCenter defaultCenter] postNotificationName:kRNSyneriseInlineInAppMessageAvailableKey object:nil userInfo:userInfo];
}

- (void)sendInlineInAppOpenedUrlToJS:(SNRInlineInAppMessageData *)data url:(NSURL *)URL {
    NSDictionary *userInfo = @{
        @"data": [self dictionaryWithInlineInAppMessageData:data],
        @"url": [URL absoluteString]
    };
    [[NSNotificationCenter defaultCenter] postNotificationName:kRNSyneriseInlineInAppMessageUrlActionKey object:nil userInfo:userInfo];
}

- (void)sendInlineInAppOpenedDeepLinkToJS:(SNRInlineInAppMessageData *)data deepLink:(NSString *)deepLink {
    NSDictionary *userInfo = @{
        @"data": [self dictionaryWithInlineInAppMessageData:data],
        @"deepLink": deepLink
    };
    [[NSNotificationCenter defaultCenter] postNotificationName:kRNSyneriseInlineInAppMessageDeeplinkActionKey object:nil userInfo:userInfo];
}

- (void)sendInlineInAppCustomActionToJS:(SNRInlineInAppMessageData *)data name:(NSString *)name parameters:(nullable NSDictionary *)parameters {
    NSDictionary *userInfo = @{
        @"data": [self dictionaryWithInlineInAppMessageData:data],
        @"name": name,
        @"parameters": parameters != nil ? [NSDictionary dictionaryWithDictionary:parameters] : @{}
    };
    [[NSNotificationCenter defaultCenter] postNotificationName:kRNSyneriseInlineInAppMessageCustomActionKey object:nil userInfo:userInfo];
}

- (void)sendInlineInAppCustomMethodToJS:(SNRInlineInAppMessageData *)data callId:(NSString *)callId name:(NSString *)name parameters:(nullable NSDictionary *)parameters {
    NSDictionary *userInfo = @{
        @"callId": callId,
        @"name": name,
        @"parameters": parameters != nil ? [NSDictionary dictionaryWithDictionary:parameters] : @{},
        @"data": [self dictionaryWithInlineInAppMessageData:data]
    };
    [[NSNotificationCenter defaultCenter] postNotificationName:kRNSyneriseInlineInAppMessageCustomMethodKey object:nil userInfo:userInfo];
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
}

- (nullable NSDictionary *)SNR_inAppMessageContextIsNeeded:(SNRInAppMessageData *)data {
    return [self jinjavaContextFromApp];
}

- (void)SNR_inAppMessageHandledURLAction:(SNRInAppMessageData *)data url:(NSURL *)url {
    [self sendInAppMessageUrlActionToJS:data url:url];
}

- (void)SNR_inAppMessageHandledDeepLinkAction:(SNRInAppMessageData *)data deepLink:(NSString *)deepLink {
    [self sendInAppMessageDeepLinkActionToJS:data deepLink:deepLink];
}

- (void)SNR_inAppMessageHandledCustomAction:(SNRInAppMessageData *)data name:(NSString *)name parameters:(NSDictionary *)parameters {
    [self sendInAppMessageCustomActionToJS:data name:name parameters:parameters];
}

- (void)SNR_inAppMessageHandledCustomMethod:(SNRInAppMessageData *)data name:(NSString *)name parameters:(NSDictionary *)parameters completion:(SNRInAppCustomMethodCompletion *)completion {
    NSString *callId = [[NSUUID UUID] UUIDString];
    @synchronized (self) {
        self.pendingInAppCustomMethodCompletions[callId] = completion;
    }
    [self sendInAppMessageCustomMethodToJS:data callId:callId name:name parameters:parameters];
}

#pragma mark - SNRInjectorInlineInAppMessageDelegate

- (void)SNR_inlineInAppMessageDidBecomeAvailable:(SNRInlineInAppView *)view data:(SNRInlineInAppMessageData *)data {
    NSString *viewIdentifier = [RNInlineInAppViewRegistry retainInlineInAppView:view placementKey:data.placementKey];
    [self sendInlineInAppAvailableToJS:data viewIdentifier:viewIdentifier];
}

- (nullable NSDictionary *)SNR_inlineInAppMessageContextIsNeeded:(SNRInlineInAppMessageData *)data {
    return [self jinjavaContextFromApp];
}


/**
 * The app-owned context the backend evaluates on render. Read straight from the mirrored dictionary,
 * so the SDK's render thread is never blocked waiting on JS.
 */
- (NSDictionary *)jinjavaContextFromApp {
    id jinjavaContext = SNRInjector.inAppContext[RNInAppManagerJinjavaContextKey];
    return [jinjavaContext isKindOfClass:[NSDictionary class]] ? jinjavaContext : @{};
}


- (void)SNR_inlineInAppMessageHandledURLAction:(SNRInlineInAppMessageData *)data url:(NSURL *)url {
    [self sendInlineInAppOpenedUrlToJS:data url:url];
}

- (void)SNR_inlineInAppMessageHandledDeepLinkAction:(SNRInlineInAppMessageData *)data deepLink:(NSString *)deepLink {
    [self sendInlineInAppOpenedDeepLinkToJS:data deepLink:deepLink];
}

- (void)SNR_inlineInAppMessageHandledCustomAction:(SNRInlineInAppMessageData *)data name:(NSString *)name parameters:(NSDictionary *)parameters {
    [self sendInlineInAppCustomActionToJS:data name:name parameters:parameters];
}

- (void)SNR_inlineInAppMessageHandledCustomMethod:(SNRInlineInAppMessageData *)data name:(NSString *)name parameters:(NSDictionary *)parameters completion:(SNRInAppCustomMethodCompletion *)completion {
    NSString *callId = [[NSUUID UUID] UUIDString];
    @synchronized (self) {
        self.pendingInlineCustomMethodCompletions[callId] = completion;
    }
    [self sendInlineInAppCustomMethodToJS:data callId:callId name:name parameters:parameters];
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

- (NSDictionary *)dictionaryWithInlineInAppMessageData:(nullable SNRInlineInAppMessageData *)model {
    NSMutableDictionary *dictionary = [@{} mutableCopy];

    if (model != nil) {
        [dictionary setString:model.campaignHash forKey:@"campaignHash"];
        [dictionary setString:model.variantIdentifier forKey:@"variantIdentifier"];
        [dictionary setString:model.placementKey forKey:@"placementKey"];
        [dictionary setDictionary:model.additionalParameters forKey:@"additionalParameters"];
        [dictionary setBool:model.isTest forKey:@"isTest"];
    }

    return dictionary;
}

@end

NS_ASSUME_NONNULL_END
