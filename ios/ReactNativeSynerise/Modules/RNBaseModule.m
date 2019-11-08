//
//  RNBaseModule.m
//  react-native-synerise-sdk
//
//  Created by Synerise
//  Copyright © 2018 Synerise. All rights reserved.
//

#import "RNBaseModule.h"

static NSString * const RNDefaultErrorDomain = @"com.synerise.sdk.error";
static NSInteger const RNDefaultErrorCode = -1;
static NSString * const RNDefaultErrorMessage = @"";

static NSString * const RNErrorObjectCode = @"code";
static NSString * const RNErrorObjectMessage = @"message";

@implementation RNBaseModule

#pragma mark - Static

+ (BOOL)requiresMainQueueSetup {
    return YES;
}

#pragma mark - Public

- (void)executeSuccessCallbackResponse:(RCTResponseSenderBlock)response data:(id)data {
    response([self successCallbackArrayWithData:data]);
}

- (void)executeFailureCallbackResponse:(RCTResponseSenderBlock)response error:(NSError *)error {
    response([self failureCallbackArrayWithError:error]);
}

- (void)executeDefaultFailureCallbackResponse:(RCTResponseSenderBlock)response {
    response([self failureCallbackArrayWithError:[self defaultError]]);
}

#pragma mark - Helpers

- (NSError *)defaultError {
    //TODO: localized keys
    NSInteger code = RNDefaultErrorCode;
    NSString *description = RNDefaultErrorMessage;
    NSDictionary *userInfo = @{
                               NSLocalizedDescriptionKey: description
                               };
    
    return [NSError errorWithDomain:RNDefaultErrorDomain code:code userInfo:userInfo];
}

- (NSArray *)successCallbackArrayWithData:(id)data {
    return @[
             @YES,
             data,
             [NSNull null],
             [NSNull null]
             ];
}

- (NSArray *)failureCallbackArrayWithError:(NSError *)error {
    return @[
             @NO,
             [NSNull null],
             @{
                 RNErrorObjectCode: [NSNumber numberWithInteger:error.code],
                 RNErrorObjectMessage: error.localizedDescription
                 }
             ];
}

@end
