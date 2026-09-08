//
//  RNInlineInAppView.h
//  react-native-synerise-sdk
//
//  Created by Synerise
//  Copyright © 2021 Synerise. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <React/RCTComponent.h>

NS_ASSUME_NONNULL_BEGIN

@interface RNInlineInAppView : UIView

@property (nonatomic, copy, nullable) NSString *placementKey;
@property (nonatomic, copy, nullable) NSString *identifier;

/** Set by the SDK when handing over an already-rendered view through the global listener. */
@property (nonatomic, copy, nullable) NSString *adoptViewId;

@property (nonatomic, copy, nullable) RCTDirectEventBlock onLoaded;
@property (nonatomic, copy, nullable) RCTDirectEventBlock onUpdated;
@property (nonatomic, copy, nullable) RCTDirectEventBlock onFailed;
@property (nonatomic, copy, nullable) RCTDirectEventBlock onRemove;
@property (nonatomic, copy, nullable) RCTDirectEventBlock onSizeChanged;
@property (nonatomic, copy, nullable) RCTDirectEventBlock onProcessingStarted;

- (void)render;
- (void)teardownInline;
- (BOOL)isRendered;
- (nullable NSDictionary *)currentDataDictionary;

@end

NS_ASSUME_NONNULL_END
