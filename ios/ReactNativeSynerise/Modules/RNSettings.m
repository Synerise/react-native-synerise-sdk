//
//  RNSettings.m
//  react-native-synerise-sdk
//
//  Created by Synerise
//  Copyright © 2018 Synerise. All rights reserved.
//

#import "RNSettings.h"

static NSString * const RNSettingsSdkEnabled = @"SDK_ENABLED";
static NSString * const RNSettingsSdkMinTokenRefreshInterval = @"SDK_MIN_TOKEN_REFRESH_INTERVAL";

static NSString * const RNSettingsTrackerMinBatchSize = @"TRACKER_MIN_BATCH_SIZE";
static NSString * const RNSettingsTrackerMaxBatchSize = @"TRACKER_MAX_BATCH_SIZE";
static NSString * const RNSettingsTrackerAutoFlushTimeout = @"TRACKER_AUTO_FLUSH_TIMEOUT";

NS_ASSUME_NONNULL_BEGIN

@implementation RNSettings

RCT_EXPORT_MODULE();

- (NSDictionary *)constantsToExport
{
  return @{
      RNSettingsSdkEnabled: RNSettingsSdkEnabled,
      RNSettingsSdkMinTokenRefreshInterval: RNSettingsSdkMinTokenRefreshInterval,
      RNSettingsTrackerMinBatchSize: RNSettingsTrackerMinBatchSize,
      RNSettingsTrackerMaxBatchSize: RNSettingsTrackerMaxBatchSize,
      RNSettingsTrackerAutoFlushTimeout: RNSettingsTrackerAutoFlushTimeout
  };
}

//function getOne(key: String)

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(getOne:(NSString *)key)
{
    return [self settingsDictionary][key];
}

//function setOne(key: String, value: any)

RCT_EXPORT_METHOD(setOne:(NSString *)key value:(id)value)
{
    NSMutableDictionary *settingsDictionary = [[self settingsDictionary] mutableCopy];
    settingsDictionary[key] = value;
    
    [self updateSettingsWithDictionary:settingsDictionary];
}

//function setMany(settings: object)

RCT_EXPORT_METHOD(setMany:(NSDictionary *)settings)
{
    NSMutableDictionary *settingsDictionary = [[self settingsDictionary] mutableCopy];
    [settingsDictionary addEntriesFromDictionary:settings];
    
    [self updateSettingsWithDictionary:settingsDictionary];
}

#pragma mark - JS Mapping

- (NSDictionary *)settingsDictionary {
    NSMutableDictionary *dictionary = [@{} mutableCopy];
    dictionary[RNSettingsSdkEnabled] = [NSNumber numberWithBool:SNRSynerise.settings.sdk.enabled];
    dictionary[RNSettingsSdkMinTokenRefreshInterval] = [NSNumber numberWithDouble:SNRSynerise.settings.sdk.minTokenRefreshInterval];
    
    dictionary[RNSettingsTrackerMinBatchSize] = [NSNumber numberWithInteger:SNRSynerise.settings.tracker.minBatchSize];
    dictionary[RNSettingsTrackerMaxBatchSize] = [NSNumber numberWithInteger:SNRSynerise.settings.tracker.maxBatchSize];
    dictionary[RNSettingsTrackerAutoFlushTimeout] = [NSNumber numberWithDouble:SNRSynerise.settings.tracker.autoFlushTimeout];
    
    return dictionary;
}

#pragma mark - Private

- (void)updateSettingsWithDictionary:(NSDictionary *)dictionary {
    [self updateSettingsKeyPath:@"sdk.enabled" expectedClass:[NSNumber class] object:dictionary[RNSettingsSdkEnabled]];
    [self updateSettingsKeyPath:@"sdk.minTokenRefreshInterval" expectedClass:[NSNumber class] object:dictionary[RNSettingsSdkMinTokenRefreshInterval]];
    
    [self updateSettingsKeyPath:@"tracker.minBatchSize" expectedClass:[NSNumber class] object:dictionary[RNSettingsTrackerMinBatchSize]];
    [self updateSettingsKeyPath:@"tracker.maxBatchSize" expectedClass:[NSNumber class] object:dictionary[RNSettingsTrackerMaxBatchSize]];
    [self updateSettingsKeyPath:@"tracker.autoFlushTimeout" expectedClass:[NSNumber class] object:dictionary[RNSettingsTrackerAutoFlushTimeout]];
}

- (void)updateSettingsKeyPath:(NSString *)keyPath expectedClass:(Class)expectedClass object:(nullable id)object {
    @try {
        if (object == nil) {
            return;
        }
        
        if ([object isKindOfClass:expectedClass] == NO) {
            return;
        }
        
        [SNRSynerise.settings setValue:object forKeyPath:keyPath];
    }
    @catch (NSException *expection) {}
    @finally {}
}


@end

NS_ASSUME_NONNULL_END
