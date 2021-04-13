//
//  RNBaseModule.h
//  react-native-synerise-sdk
//
//  Created by Synerise
//  Copyright © 2021 Synerise. All rights reserved.
//

#import "ReactNativeSynerise.h"

NS_ASSUME_NONNULL_BEGIN

@interface RNBaseModule : NSObject

- (void)executeSuccessCallbackResponse:(RCTResponseSenderBlock)response data:(id)data;
- (void)executeFailureCallbackResponse:(RCTResponseSenderBlock)response error:(NSError *)error;
- (void)executeDefaultFailureCallbackResponse:(RCTResponseSenderBlock)response;

- (NSDictionary *)dictionaryWithError:(NSError *)error;


@end

NS_ASSUME_NONNULL_END
