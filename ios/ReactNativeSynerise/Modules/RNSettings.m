//
//  RNSettings.m
//  react-native-synerise-sdk
//
//  Created by Synerise
//  Copyright © 2018 Synerise. All rights reserved.
//

#import "RNSettings.h"

static NSString * const RNSettingsSDKEnabled = @"SDK_ENABLED";
static NSString * const RNSettingsSDKMinTokenRefreshInterval = @"SDK_MIN_TOKEN_REFRESH_INTERVAL";
static NSString * const RNSettingsSDKShouldDestroySessionOnApiKeyChange = @"SDK_SHOULD_DESTROY_SESSION_ON_API_KEY_CHANGE";

static NSString * const RNSettingsTrackerMinBatchSize = @"TRACKER_MIN_BATCH_SIZE";
static NSString * const RNSettingsTrackerMaxBatchSize = @"TRACKER_MAX_BATCH_SIZE";
static NSString * const RNSettingsTrackerAutoFlushTimeout = @"TRACKER_AUTO_FLUSH_TIMEOUT";

static NSString * const RNSettingsNotificationsEnabled = @"NOTIFICATIONS_ENABLED";
static NSString * const RNSettingsNotificationsDisableInAppAlerts = @"NOTIFICATIONS_DISABLE_IN_APP_ALERTS";
static NSString * const RNSettingsNotificationsAppGroupIdentifier = @"NOTIFICATIONS_APP_GROUP_IDENTIFIER";

static NSString * const RNSettingsInjectorAutomatic = @"INJECTOR_AUTOMATIC";

NS_ASSUME_NONNULL_BEGIN

@implementation RNSettings

static RNSettings *moduleInstance;

RCT_EXPORT_MODULE();

#pragma mark - Lifecycle

- (instancetype)init {
    if (moduleInstance != nil) {
        return moduleInstance;
    }
    
    self = [super init];
    
    if (self) {

    }
    
    moduleInstance = self;
    
    return self;
}

#pragma mark - Private

- (void)updateSettingsWithDictionary:(NSDictionary *)dictionary {
    [self updateSettingsKeyPath:@"sdk.enabled" expectedClass:[NSNumber class] object:dictionary[RNSettingsSDKEnabled]];
    [self updateSettingsKeyPath:@"sdk.minTokenRefreshInterval" expectedClass:[NSNumber class] object:dictionary[RNSettingsSDKMinTokenRefreshInterval]];
    [self updateSettingsKeyPath:@"sdk.shouldDestroySessionOnApiKeyChange" expectedClass:[NSNumber class] object:dictionary[RNSettingsSDKShouldDestroySessionOnApiKeyChange]];
    
    [self updateSettingsKeyPath:@"tracker.minBatchSize" expectedClass:[NSNumber class] object:dictionary[RNSettingsTrackerMinBatchSize]];
    [self updateSettingsKeyPath:@"tracker.maxBatchSize" expectedClass:[NSNumber class] object:dictionary[RNSettingsTrackerMaxBatchSize]];
    [self updateSettingsKeyPath:@"tracker.autoFlushTimeout" expectedClass:[NSNumber class] object:dictionary[RNSettingsTrackerAutoFlushTimeout]];
    
    [self updateSettingsKeyPath:@"notifications.enabled" expectedClass:[NSNumber class] object:dictionary[RNSettingsNotificationsEnabled]];
    [self updateSettingsKeyPath:@"notifications.disableInAppAlerts" expectedClass:[NSNumber class] object:dictionary[RNSettingsNotificationsDisableInAppAlerts]];
    [self updateSettingsKeyPath:@"notifications.appGroupIdentifier" expectedClass:[NSString class] object:dictionary[RNSettingsNotificationsAppGroupIdentifier]];
    
    [self updateSettingsKeyPath:@"injector.automatic" expectedClass:[NSNumber class] object:dictionary[RNSettingsInjectorAutomatic]];
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

#pragma mark - JS Mapping

- (NSDictionary *)settingsDictionary {
    NSMutableDictionary *dictionary = [@{} mutableCopy];
    dictionary[RNSettingsSDKEnabled] = [NSNumber numberWithBool:SNRSynerise.settings.sdk.enabled];
    dictionary[RNSettingsSDKMinTokenRefreshInterval] = [NSNumber numberWithDouble:SNRSynerise.settings.sdk.minTokenRefreshInterval];
    dictionary[RNSettingsSDKShouldDestroySessionOnApiKeyChange] = [NSNumber numberWithDouble:SNRSynerise.settings.sdk.shouldDestroySessionOnApiKeyChange];
    
    dictionary[RNSettingsTrackerMinBatchSize] = [NSNumber numberWithInteger:SNRSynerise.settings.tracker.minBatchSize];
    dictionary[RNSettingsTrackerMaxBatchSize] = [NSNumber numberWithInteger:SNRSynerise.settings.tracker.maxBatchSize];
    dictionary[RNSettingsTrackerAutoFlushTimeout] = [NSNumber numberWithDouble:SNRSynerise.settings.tracker.autoFlushTimeout];
    
    dictionary[RNSettingsNotificationsEnabled] = [NSNumber numberWithBool:SNRSynerise.settings.notifications.enabled];
    dictionary[RNSettingsNotificationsDisableInAppAlerts] = [NSNumber numberWithBool:SNRSynerise.settings.notifications.disableInAppAlerts];
    dictionary[RNSettingsNotificationsAppGroupIdentifier] = SNRSynerise.settings.notifications.appGroupIdentifier ?: [NSNull null];
    
    dictionary[RNSettingsInjectorAutomatic] = [NSNumber numberWithBool:SNRSynerise.settings.injector.automatic];
    
    return dictionary;
}

#pragma mark - JS Module

- (NSDictionary *)constantsToExport
{
  return @{
      RNSettingsSDKEnabled: RNSettingsSDKEnabled,
      RNSettingsSDKMinTokenRefreshInterval: RNSettingsSDKMinTokenRefreshInterval,
      RNSettingsSDKShouldDestroySessionOnApiKeyChange: RNSettingsSDKShouldDestroySessionOnApiKeyChange,
          
      RNSettingsTrackerMinBatchSize: RNSettingsTrackerMinBatchSize,
      RNSettingsTrackerMaxBatchSize: RNSettingsTrackerMaxBatchSize,
      RNSettingsTrackerAutoFlushTimeout: RNSettingsTrackerAutoFlushTimeout,
      
      RNSettingsNotificationsEnabled: RNSettingsNotificationsEnabled,
      RNSettingsNotificationsDisableInAppAlerts: RNSettingsNotificationsDisableInAppAlerts,
      RNSettingsNotificationsAppGroupIdentifier: RNSettingsNotificationsAppGroupIdentifier,
      
      RNSettingsInjectorAutomatic: RNSettingsInjectorAutomatic
  };
}

//function getOne(key: String)

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(getOne:(NSString *)key)
{
    return [self settingsDictionary][key];
}

//function setOne(settingsOneOption: ISettingsOneOption)

RCT_EXPORT_METHOD(setOne:(NSDictionary *)settingsOneOption)
{
    NSString *key = settingsOneOption[@"key"];
    id value = settingsOneOption[@"value"];
    
    if (key == nil || value == nil) {
        return;
    }
    
    NSMutableDictionary *settingsDictionary = [[self settingsDictionary] mutableCopy];
    
    if ([[settingsDictionary allKeys] containsObject:key]) {
        [self updateSettingsWithDictionary:@{ key: value }];
    }
}

//function setMany(settingsManyOptions: ISettingsManyOptions)

RCT_EXPORT_METHOD(setMany:(NSDictionary *)settingsManyOptions)
{
    if (settingsManyOptions == nil || [settingsManyOptions count] == 0) {
        return;
    }
    
    NSMutableDictionary *settingsDictionary = [[self settingsDictionary] mutableCopy];
    [settingsDictionary addEntriesFromDictionary:settingsManyOptions];
    
    [self updateSettingsWithDictionary:settingsDictionary];
}

@end

NS_ASSUME_NONNULL_END
