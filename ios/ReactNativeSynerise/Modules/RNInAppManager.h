//
//  RNInAppManager.h
//  react-native-synerise-sdk
//
//  Created by Synerise
//  Copyright © 2024 Synerise. All rights reserved.
//

#import <Foundation/Foundation.h>

#import <SyneriseSDK/SyneriseSDK.h>

NS_ASSUME_NONNULL_BEGIN

@interface RNInAppManager : NSObject

- (void)activate;

- (void)closeInAppMessage:(NSString *)campaignHash;
- (void)resolveInlineCustomMethodWithCallId:(NSString *)callId success:(BOOL)success result:(nullable id)result error:(nullable NSString *)error;
- (void)resolveInAppCustomMethodWithCallId:(NSString *)callId success:(BOOL)success result:(nullable id)result error:(nullable NSString *)error;

@end

NS_ASSUME_NONNULL_END
