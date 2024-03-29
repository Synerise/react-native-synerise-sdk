//
//  RNSettings.m
//  react-native-synerise-sdk
//
//  Created by Synerise
//  Copyright © 2021 Synerise. All rights reserved.
//

#import "RNSettings.h"

static NSString * const RNSettingsSDKEnabled = @"SDK_ENABLED";
static NSString * const RNSettingsSDKAppGroupIdentifier = @"SDK_APP_GROUP_IDENTIFIER";
static NSString * const RNSettingsSDKKeychainGroupIdentifier = @"SDK_KEYCHAIN_GROUP_IDENTIFIER";
static NSString * const RNSettingsSDKMinTokenRefreshInterval = @"SDK_MIN_TOKEN_REFRESH_INTERVAL";
static NSString * const RNSettingsSDKShouldDestroySessionOnApiKeyChange = @"SDK_SHOULD_DESTROY_SESSION_ON_API_KEY_CHANGE";

static NSString * const RNSettingsTrackerIsBackendTimeSyncRequired = @"TRACKER_IS_BACKEND_TIME_SYNC_REQUIRED";
static NSString * const RNSettingsTrackerMinBatchSize = @"TRACKER_MIN_BATCH_SIZE";
static NSString * const RNSettingsTrackerMaxBatchSize = @"TRACKER_MAX_BATCH_SIZE";
static NSString * const RNSettingsTrackerAutoFlushTimeout = @"TRACKER_AUTO_FLUSH_TIMEOUT";

static NSString * const RNSettingsNotificationsEnabled = @"NOTIFICATIONS_ENABLED";
static NSString * const RNSettingsNotificationsEncryption = @"NOTIFICATIONS_ENCRYPTION";
static NSString * const RNSettingsNotificationsDisableInAppAlerts = @"NOTIFICATIONS_DISABLE_IN_APP_ALERTS";

static NSString * const RNSettingsInAppMessagingMaxDefinitionUpdateIntervalLimit = @"IN_APP_MAX_DEFINITION_UPDATE_INTERVAL_LIMIT";
static NSString * const RNSettingsInAppMessagingRenderingTimeout = @"IN_APP_MESSAGING_RENDERING_TIMEOUT";
static NSString * const RNSettingsInAppMessagingShouldSendInAppCappingEvent = @"IN_APP_MESSAGING_SHOULD_SEND_IN_APP_CAPPING_EVENT";

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
    [self updateSettingsKeyPath:@"sdk.appGroupIdentifier" expectedClass:[NSString class] object:dictionary[RNSettingsSDKAppGroupIdentifier]];
    [self updateSettingsKeyPath:@"sdk.keychainGroupIdentifier" expectedClass:[NSString class] object:dictionary[RNSettingsSDKKeychainGroupIdentifier]];
    [self updateSettingsKeyPath:@"sdk.minTokenRefreshInterval" expectedClass:[NSNumber class] object:dictionary[RNSettingsSDKMinTokenRefreshInterval]];
    [self updateSettingsKeyPath:@"sdk.shouldDestroySessionOnApiKeyChange" expectedClass:[NSNumber class] object:dictionary[RNSettingsSDKShouldDestroySessionOnApiKeyChange]];
    
    [self updateSettingsKeyPath:@"tracker.isBackendTimeSyncRequired" expectedClass:[NSNumber class] object:dictionary[RNSettingsTrackerIsBackendTimeSyncRequired]];
    [self updateSettingsKeyPath:@"tracker.minBatchSize" expectedClass:[NSNumber class] object:dictionary[RNSettingsTrackerMinBatchSize]];
    [self updateSettingsKeyPath:@"tracker.maxBatchSize" expectedClass:[NSNumber class] object:dictionary[RNSettingsTrackerMaxBatchSize]];
    [self updateSettingsKeyPath:@"tracker.autoFlushTimeout" expectedClass:[NSNumber class] object:dictionary[RNSettingsTrackerAutoFlushTimeout]];
    
    [self updateSettingsKeyPath:@"notifications.enabled" expectedClass:[NSNumber class] object:dictionary[RNSettingsNotificationsEnabled]];
    [self updateSettingsKeyPath:@"notifications.encryption" expectedClass:[NSNumber class] object:dictionary[RNSettingsNotificationsEncryption]];
    [self updateSettingsKeyPath:@"notifications.disableInAppAlerts" expectedClass:[NSNumber class] object:dictionary[RNSettingsNotificationsDisableInAppAlerts]];
    
    [self updateSettingsKeyPath:@"inAppMessaging.maxDefinitionUpdateIntervalLimit" expectedClass:[NSNumber class] object:dictionary[RNSettingsInAppMessagingMaxDefinitionUpdateIntervalLimit]];
    [self updateSettingsKeyPath:@"inAppMessaging.renderingTimeout" expectedClass:[NSNumber class] object:dictionary[RNSettingsInAppMessagingRenderingTimeout]];
    [self updateSettingsKeyPath:@"inAppMessaging.shouldSendInAppCappingEvent" expectedClass:[NSNumber class] object:dictionary[RNSettingsInAppMessagingShouldSendInAppCappingEvent]];

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
    dictionary[RNSettingsSDKAppGroupIdentifier] = SNRSynerise.settings.sdk.appGroupIdentifier ?: [NSNull null];
    dictionary[RNSettingsSDKKeychainGroupIdentifier] = SNRSynerise.settings.sdk.keychainGroupIdentifier ?: [NSNull null];
    dictionary[RNSettingsSDKMinTokenRefreshInterval] = [NSNumber numberWithDouble:SNRSynerise.settings.sdk.minTokenRefreshInterval];
    dictionary[RNSettingsSDKShouldDestroySessionOnApiKeyChange] = [NSNumber numberWithDouble:SNRSynerise.settings.sdk.shouldDestroySessionOnApiKeyChange];
    
    dictionary[RNSettingsTrackerIsBackendTimeSyncRequired] = [NSNumber numberWithBool:SNRSynerise.settings.tracker.isBackendTimeSyncRequired];
    dictionary[RNSettingsTrackerMinBatchSize] = [NSNumber numberWithInteger:SNRSynerise.settings.tracker.minBatchSize];
    dictionary[RNSettingsTrackerMaxBatchSize] = [NSNumber numberWithInteger:SNRSynerise.settings.tracker.maxBatchSize];
    dictionary[RNSettingsTrackerAutoFlushTimeout] = [NSNumber numberWithDouble:SNRSynerise.settings.tracker.autoFlushTimeout];

    dictionary[RNSettingsNotificationsEnabled] = [NSNumber numberWithBool:SNRSynerise.settings.notifications.enabled];
    dictionary[RNSettingsNotificationsEncryption] = [NSNumber numberWithBool:SNRSynerise.settings.notifications.encryption];
    dictionary[RNSettingsNotificationsDisableInAppAlerts] = [NSNumber numberWithBool:SNRSynerise.settings.notifications.disableInAppAlerts];
    
    dictionary[RNSettingsInAppMessagingMaxDefinitionUpdateIntervalLimit] = [NSNumber numberWithDouble:SNRSynerise.settings.inAppMessaging.maxDefinitionUpdateIntervalLimit];
    dictionary[RNSettingsInAppMessagingRenderingTimeout] = [NSNumber numberWithDouble:SNRSynerise.settings.inAppMessaging.renderingTimeout];
    dictionary[RNSettingsInAppMessagingShouldSendInAppCappingEvent] = [NSNumber numberWithDouble:SNRSynerise.settings.inAppMessaging.shouldSendInAppCappingEvent];

    dictionary[RNSettingsInjectorAutomatic] = [NSNumber numberWithBool:SNRSynerise.settings.injector.automatic];
    
    return dictionary;
}

#pragma mark - JS Module

- (NSDictionary *)constantsToExport
{
  return @{
      RNSettingsSDKEnabled: RNSettingsSDKEnabled,
      RNSettingsSDKAppGroupIdentifier: RNSettingsSDKAppGroupIdentifier,
      RNSettingsSDKKeychainGroupIdentifier: RNSettingsSDKKeychainGroupIdentifier,
      RNSettingsSDKMinTokenRefreshInterval: RNSettingsSDKMinTokenRefreshInterval,
      RNSettingsSDKShouldDestroySessionOnApiKeyChange: RNSettingsSDKShouldDestroySessionOnApiKeyChange,
          
      RNSettingsTrackerIsBackendTimeSyncRequired: RNSettingsTrackerIsBackendTimeSyncRequired,
      RNSettingsTrackerMinBatchSize: RNSettingsTrackerMinBatchSize,
      RNSettingsTrackerMaxBatchSize: RNSettingsTrackerMaxBatchSize,
      RNSettingsTrackerAutoFlushTimeout: RNSettingsTrackerAutoFlushTimeout,

      RNSettingsNotificationsEnabled: RNSettingsNotificationsEnabled,
      RNSettingsNotificationsEncryption: RNSettingsNotificationsEncryption,
      RNSettingsNotificationsDisableInAppAlerts: RNSettingsNotificationsDisableInAppAlerts,
      
      RNSettingsInAppMessagingMaxDefinitionUpdateIntervalLimit: RNSettingsInAppMessagingMaxDefinitionUpdateIntervalLimit,
      RNSettingsInAppMessagingRenderingTimeout: RNSettingsInAppMessagingRenderingTimeout,
      RNSettingsInAppMessagingShouldSendInAppCappingEvent: RNSettingsInAppMessagingShouldSendInAppCappingEvent,

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
