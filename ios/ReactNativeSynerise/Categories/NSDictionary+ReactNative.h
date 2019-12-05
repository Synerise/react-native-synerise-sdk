//
//  NSDictionary+ReactNative.h
//  react-native-synerise-sdk
//
//  Created by Synerise
//  Copyright © 2018 Synerise. All rights reserved.
//

NS_ASSUME_NONNULL_BEGIN

@interface NSDictionary (ReactNative)

- (nullable NSString *)getStringForKey:(NSString *)key;
- (nullable NSNumber *)getNumberForKey:(NSString *)key;
- (nullable NSArray *)getArrayForKey:(NSString *)key;
- (nullable NSDictionary *)getDictionaryForKey:(NSString *)key;
- (NSInteger)getIntegerForKey:(NSString *)key;
- (double)getDoubleForKey:(NSString *)key;
- (BOOL)getBoolForKey:(NSString *)key;

@end

NS_ASSUME_NONNULL_END
