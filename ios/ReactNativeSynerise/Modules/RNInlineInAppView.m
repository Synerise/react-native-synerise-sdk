//
//  RNInlineInAppView.m
//  react-native-synerise-sdk
//
//  Created by Synerise
//  Copyright © 2021 Synerise. All rights reserved.
//

#import "RNInlineInAppView.h"

#import <SyneriseSDK/SyneriseSDK.h>

#import "NSMutableDictionary+ReactNative.h"
#import "RNInlineInAppViewRegistry.h"

NS_ASSUME_NONNULL_BEGIN

@interface RNInlineInAppView () <SNRInlineInAppViewDelegate>

@property (nonatomic, strong, nullable) SNRInlineInAppView *inlineView;

@end

@implementation RNInlineInAppView

#pragma mark - Props

- (void)setPlacementKey:(nullable NSString *)placementKey {
    if (_placementKey != nil && [_placementKey isEqualToString:placementKey]) {
        return;
    }

    _placementKey = [placementKey copy];

    if (self.adoptViewId != nil) {
        return;
    }

    [self teardownInline];
    [self createInlineViewIfPossible];
}

- (void)setIdentifier:(nullable NSString *)identifier {
    _identifier = [identifier copy];
    [self applyIdentifier];
}

/**
 * The id is only remembered once the registry actually hands the view over. A stale id (the element
 * was re-mounted after the view had already been taken, e.g. navigation back or a JS reload) leaves
 * the component on its regular placement-key path instead of pinning it to an empty view forever.
 */
- (void)setAdoptViewId:(nullable NSString *)adoptViewId {
    if (adoptViewId == nil || [_adoptViewId isEqualToString:adoptViewId] == YES) {
        return;
    }

    SNRInlineInAppView *retainedView = [RNInlineInAppViewRegistry takeRetainedViewWithIdentifier:adoptViewId];
    if (retainedView == nil) {
        [self createInlineViewIfPossible];
        return;
    }

    _adoptViewId = [adoptViewId copy];
    [self adoptInlineView:retainedView];
}

#pragma mark - Commands

- (void)render {
    [self createInlineViewIfPossible];
    [self.inlineView render];
}

- (BOOL)isRendered {
    return self.inlineView != nil ? [self.inlineView isRendered] : NO;
}

- (nullable NSDictionary *)currentDataDictionary {
    SNRInlineInAppMessageData *data = [self.inlineView getData];
    return data != nil ? [self dictionaryWithInlineInAppMessageData:data] : nil;
}

- (void)teardownInline {
    if (self.inlineView != nil) {
        self.inlineView.delegate = nil;
        [self.inlineView removeFromSuperview];
        self.inlineView = nil;
    }
}

#pragma mark - Lifecycle

- (void)didMoveToWindow {
    [super didMoveToWindow];

    if (self.window != nil) {
        [self createInlineViewIfPossible];
    }
}

- (void)layoutSubviews {
    [super layoutSubviews];
    self.inlineView.frame = self.bounds;
}

#pragma mark - Private

/**
 * Mounts the already-rendered view the SDK announced instead of rendering again; the view this
 * component created for itself is discarded so it stops competing for the same placement key.
 */
- (void)adoptInlineView:(SNRInlineInAppView *)retainedView {
    if (retainedView == self.inlineView) {
        return;
    }

    [self teardownInline];

    [retainedView removeFromSuperview];
    retainedView.delegate = self;
    retainedView.frame = self.bounds;
    retainedView.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
    self.inlineView = retainedView;
    [self applyIdentifier];
    [self addSubview:retainedView];
    [self setNeedsLayout];
}

- (void)createInlineViewIfPossible {
    if (self.adoptViewId != nil) {
        return;
    }

    if (self.placementKey == nil || self.placementKey.length == 0 || self.inlineView != nil) {
        return;
    }

    SNRInlineInAppView *inlineView = [SNRInjector createInlineInAppViewWithPlacementKey:self.placementKey];
    if (inlineView == nil) {
        return;
    }

    inlineView.delegate = self;
    inlineView.frame = self.bounds;
    inlineView.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
    self.inlineView = inlineView;
    [self applyIdentifier];
    [self addSubview:inlineView];
}

/** The prop can arrive before the SDK view exists, so the identifier is re-applied whenever a view is created or adopted. */
- (void)applyIdentifier {
    if (self.inlineView != nil && self.identifier != nil) {
        [self.inlineView setIdentifier:self.identifier];
    }
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

#pragma mark - SNRInlineInAppViewDelegate

- (void)SNR_inlineInAppViewDidStartProcessing:(SNRInlineInAppView *)view {
    if (self.onProcessingStarted != nil) {
        self.onProcessingStarted(@{});
    }
}

- (void)SNR_inlineInAppViewDidLoad:(SNRInlineInAppView *)view data:(SNRInlineInAppMessageData *)data {
    if (self.onLoaded != nil) {
        self.onLoaded(@{@"data": [self dictionaryWithInlineInAppMessageData:data]});
    }
}

- (void)SNR_inlineInAppViewDidUpdate:(SNRInlineInAppView *)view data:(SNRInlineInAppMessageData *)data {
    if (self.onUpdated != nil) {
        self.onUpdated(@{@"data": [self dictionaryWithInlineInAppMessageData:data]});
    }
}

- (void)SNR_inlineInAppViewDidFail:(SNRInlineInAppView *)view error:(NSError *)error {
    if (self.onFailed != nil) {
        self.onFailed(@{
            @"data": [self dictionaryWithInlineInAppMessageData:[view getData]],
            @"error": error.localizedDescription != nil ? error.localizedDescription : @""
        });
    }
}

- (void)SNR_inlineInAppViewShouldBeRemoved:(SNRInlineInAppView *)view data:(SNRInlineInAppMessageData *)data {
    if (self.onRemove != nil) {
        self.onRemove(@{@"data": [self dictionaryWithInlineInAppMessageData:data]});
    }
}

- (void)SNR_inlineInAppViewChangeSizeIsNeeded:(SNRInlineInAppView *)view data:(SNRInlineInAppMessageData *)data size:(SNRInlineInAppSize *)size {
    if (self.onSizeChanged != nil) {
        self.onSizeChanged(@{
            @"data": [self dictionaryWithInlineInAppMessageData:data],
            @"widthPx": @(size.widthPx),
            @"heightPx": @(size.heightPx),
            @"width": @(size.widthPt),
            @"height": @(size.heightPt),
            @"widthScreenRatio": @(size.widthScreenRatio),
            @"heightScreenRatio": @(size.heightScreenRatio)
        });
    }
}

@end

NS_ASSUME_NONNULL_END
