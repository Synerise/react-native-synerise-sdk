//
//  RNInlineInAppViewManager.m
//  react-native-synerise-sdk
//
//  Created by Synerise
//  Copyright © 2021 Synerise. All rights reserved.
//

#import "RNInlineInAppViewManager.h"
#import "RNInlineInAppView.h"

#import <React/RCTUIManager.h>

NS_ASSUME_NONNULL_BEGIN

@implementation RNInlineInAppViewManager

RCT_EXPORT_MODULE()

- (UIView *)view {
    return [RNInlineInAppView new];
}

+ (BOOL)requiresMainQueueSetup {
    return YES;
}

RCT_EXPORT_VIEW_PROPERTY(placementKey, NSString)
RCT_EXPORT_VIEW_PROPERTY(identifier, NSString)
RCT_EXPORT_VIEW_PROPERTY(adoptViewId, NSString)

RCT_EXPORT_VIEW_PROPERTY(onLoaded, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onUpdated, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onFailed, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onRemove, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onSizeChanged, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onProcessingStarted, RCTDirectEventBlock)

//render()

RCT_EXPORT_METHOD(render:(nonnull NSNumber *)reactTag)
{
    [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *, UIView *> *viewRegistry) {
        UIView *view = viewRegistry[reactTag];
        if ([view isKindOfClass:[RNInlineInAppView class]]) {
            [(RNInlineInAppView *)view render];
        }
    }];
}

//release()

RCT_EXPORT_METHOD(release:(nonnull NSNumber *)reactTag)
{
    [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *, UIView *> *viewRegistry) {
        UIView *view = viewRegistry[reactTag];
        if ([view isKindOfClass:[RNInlineInAppView class]]) {
            [(RNInlineInAppView *)view teardownInline];
        }
    }];
}

@end

NS_ASSUME_NONNULL_END
