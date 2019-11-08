//
//  RNBaseModule.h
//  react-native-synerise-sdk
//
//  Created by Synerise
//  Copyright © 2018 Synerise. All rights reserved.
//

#import "ReactNativeSynerise.h"
#import "RNReactCommunicationUtils.h"

#ifndef PROPERTY_STRING
    #define PROPERTY_STRING( prop ) NSStringFromSelector(@selector(prop))
#endif

NS_ASSUME_NONNULL_BEGIN

@interface RNBaseModule : NSObject

- (void)executeSuccessCallbackResponse:(RCTResponseSenderBlock)response data:(id)data;
- (void)executeFailureCallbackResponse:(RCTResponseSenderBlock)response error:(NSError *)error;
- (void)executeDefaultFailureCallbackResponse:(RCTResponseSenderBlock)response;

@end

NS_ASSUME_NONNULL_END
