//
//  RNReactCommunicationUtils.m
//  react-native-synerise-sdk
//
//  Created by Synerise
//  Copyright © 2018 Synerise. All rights reserved.
//

#import "RNReactCommunicationUtils.h"

NS_ASSUME_NONNULL_BEGIN

@implementation RNReactCommunicationUtils

+ (NSDictionary *)normalizeDictionary:(NSDictionary *)dictionary {
    NSMutableDictionary *mutableDictionary = [dictionary mutableCopy];
    
    for (NSString *key in [mutableDictionary allKeys]) {
        if (mutableDictionary[key] == [NSNull null]) {
            [mutableDictionary removeObjectForKey:key];
        }
    }
    
    return [NSDictionary dictionaryWithDictionary:mutableDictionary];
}

@end

NS_ASSUME_NONNULL_END
