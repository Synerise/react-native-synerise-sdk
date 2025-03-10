//
//  RNInjector.h
//  react-native-synerise-sdk
//
//  Created by Synerise
//  Copyright © 2021 Synerise. All rights reserved.
//

#import "RNBaseModule.h"

NS_ASSUME_NONNULL_BEGIN

@interface RNInjector : RNBaseModule <RCTBridgeModule>

- (void)executeURLAction:(NSURL *)URL source:(SNRSyneriseSource)source;
- (void)executeDeepLinkAction:(NSString *)deepLink source:(SNRSyneriseSource)source;

@end

NS_ASSUME_NONNULL_END
