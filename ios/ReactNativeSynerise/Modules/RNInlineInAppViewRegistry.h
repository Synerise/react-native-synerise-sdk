//
//  RNInlineInAppViewRegistry.h
//  react-native-synerise-sdk
//
//  Created by Synerise
//  Copyright © 2021 Synerise. All rights reserved.
//

#import <Foundation/Foundation.h>

@class SNRInlineInAppView;

NS_ASSUME_NONNULL_BEGIN

/**
 * Holds SDK-created inline views announced through the global listener until JS mounts them.
 * React Native cannot pass a native view instance to JS, so the view is parked here under a
 * generated id that travels to JS and comes back as the `adoptViewId` prop.
 */
@interface RNInlineInAppViewRegistry : NSObject

+ (NSString *)retainInlineInAppView:(SNRInlineInAppView *)view placementKey:(nullable NSString *)placementKey;
+ (nullable SNRInlineInAppView *)takeRetainedViewWithIdentifier:(NSString *)viewIdentifier;

@end

NS_ASSUME_NONNULL_END
