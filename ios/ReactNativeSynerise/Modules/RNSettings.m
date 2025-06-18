//
//  RNSettings.m
//  react-native-synerise-sdk
//
//  Created by Synerise
//  Copyright © 2021 Synerise. All rights reserved.
//

#import "RNSettings.h"

static NSString * const RNSettingsSDKEnabled = @"SDK_ENABLED";
static NSString * const RNSettingsSDKDoNotTrack = @"SDK_DO_NOT_TRACK";
static NSString * const RNSettingsSDKAppGroupIdentifier = @"SDK_APP_GROUP_IDENTIFIER";
static NSString * const RNSettingsSDKKeychainGroupIdentifier = @"SDK_KEYCHAIN_GROUP_IDENTIFIER";
static NSString * const RNSettingsSDKMinTokenRefreshInterval = @"SDK_MIN_TOKEN_REFRESH_INTERVAL";
static NSString * const RNSettingsSDKShouldDestroySessionOnApiKeyChange = @"SDK_SHOULD_DESTROY_SESSION_ON_API_KEY_CHANGE";
static NSString * const RNSettingsSDKLocalizable = @"SDK_LOCALIZABLE";

static NSString * const RNSettingsTrackerIsBackendTimeSyncRequired = @"TRACKER_IS_BACKEND_TIME_SYNC_REQUIRED";
static NSString * const RNSettingsTrackerMinBatchSize = @"TRACKER_MIN_BATCH_SIZE";
static NSString * const RNSettingsTrackerMaxBatchSize = @"TRACKER_MAX_BATCH_SIZE";
static NSString * const RNSettingsTrackerAutoFlushTimeout = @"TRACKER_AUTO_FLUSH_TIMEOUT";
static NSString * const RNSettingsTrackerEventsTriggeringFlush = @"TRACKER_EVENTS_TRIGGERING_FLUSH";

static NSString * const RNSettingsNotificationsEnabled = @"NOTIFICATIONS_ENABLED";
static NSString * const RNSettingsNotificationsEncryption = @"NOTIFICATIONS_ENCRYPTION";
static NSString * const RNSettingsNotificationsDisableInAppAlerts = @"NOTIFICATIONS_DISABLE_IN_APP_ALERTS";

static NSString * const RNSettingsInAppMessagingCheckGlobalControlGroupsOnDefinitionsFetch = @"IN_APP_CHECK_GLOBAL_CONTROL_GROUPS_ON_DEFINITIONS_FETCH";
static NSString * const RNSettingsInAppMessagingMaxDefinitionUpdateIntervalLimit = @"IN_APP_MAX_DEFINITION_UPDATE_INTERVAL_LIMIT";
static NSString * const RNSettingsInAppMessagingContentBaseUrl = @"IN_APP_MESSAGING_CONTENT_BASE_URL";
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
    [self updateSettingsKeyPath:@"sdk.doNotTrack" expectedClass:[NSNumber class] object:dictionary[RNSettingsSDKDoNotTrack]];
    [self updateSettingsKeyPath:@"sdk.appGroupIdentifier" expectedClass:[NSString class] object:dictionary[RNSettingsSDKAppGroupIdentifier]];
    [self updateSettingsKeyPath:@"sdk.keychainGroupIdentifier" expectedClass:[NSString class] object:dictionary[RNSettingsSDKKeychainGroupIdentifier]];
    [self updateSettingsKeyPath:@"sdk.minTokenRefreshInterval" expectedClass:[NSNumber class] object:dictionary[RNSettingsSDKMinTokenRefreshInterval]];
    [self updateSettingsKeyPath:@"sdk.shouldDestroySessionOnApiKeyChange" expectedClass:[NSNumber class] object:dictionary[RNSettingsSDKShouldDestroySessionOnApiKeyChange]];
    [self updateSettingsKeyPath:@"sdk.localizable" expectedClass:[NSDictionary class] object:[self normalizeSDKLocalizableDictionary:dictionary[RNSettingsSDKLocalizable]]];

    [self updateSettingsKeyPath:@"tracker.isBackendTimeSyncRequired" expectedClass:[NSNumber class] object:dictionary[RNSettingsTrackerIsBackendTimeSyncRequired]];
    [self updateSettingsKeyPath:@"tracker.minBatchSize" expectedClass:[NSNumber class] object:dictionary[RNSettingsTrackerMinBatchSize]];
    [self updateSettingsKeyPath:@"tracker.maxBatchSize" expectedClass:[NSNumber class] object:dictionary[RNSettingsTrackerMaxBatchSize]];
    [self updateSettingsKeyPath:@"tracker.autoFlushTimeout" expectedClass:[NSNumber class] object:dictionary[RNSettingsTrackerAutoFlushTimeout]];
    [self updateSettingsKeyPath:@"tracker.eventsTriggeringFlush" expectedClass:[NSArray class] object:dictionary[RNSettingsTrackerEventsTriggeringFlush]];

    [self updateSettingsKeyPath:@"notifications.enabled" expectedClass:[NSNumber class] object:dictionary[RNSettingsNotificationsEnabled]];
    [self updateSettingsKeyPath:@"notifications.encryption" expectedClass:[NSNumber class] object:dictionary[RNSettingsNotificationsEncryption]];
    [self updateSettingsKeyPath:@"notifications.disableInAppAlerts" expectedClass:[NSNumber class] object:dictionary[RNSettingsNotificationsDisableInAppAlerts]];
    
    [self updateSettingsKeyPath:@"inAppMessaging.checkGlobalControlGroupsOnDefinitionsFetch" expectedClass:[NSNumber class] object:dictionary[RNSettingsInAppMessagingCheckGlobalControlGroupsOnDefinitionsFetch]];
    [self updateSettingsKeyPath:@"inAppMessaging.maxDefinitionUpdateIntervalLimit" expectedClass:[NSNumber class] object:dictionary[RNSettingsInAppMessagingMaxDefinitionUpdateIntervalLimit]];
    [self updateSettingsKeyPath:@"inAppMessaging.contentBaseUrl" expectedClass:[NSString class] object:dictionary[RNSettingsInAppMessagingContentBaseUrl]];
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

- (NSDictionary *)normalizeSDKLocalizableDictionary:(nullable NSDictionary *)dictionary {
    if ([dictionary isKindOfClass:NSNull.class] == YES || dictionary == nil) {
        return nil;
    }

    static NSString *JSLocalizableKeyOK = @"LocalizableStringKeyOK";
    static NSString *JSLocalizableKeyCancel = @"LocalizableStringKeyCancel";

    NSMutableDictionary *newDictionary = [@{} mutableCopy];

    NSString *localizableKeyOK = dictionary[JSLocalizableKeyOK];
    if (localizableKeyOK != nil) {
        newDictionary[_SNR_Constants.LOCALIZABLE_STRING_KEY_OK] = localizableKeyOK;
    }

    NSString *localizableKeyCancel = dictionary[JSLocalizableKeyCancel];
    if (localizableKeyCancel != nil) {
        newDictionary[_SNR_Constants.LOCALIZABLE_STRING_KEY_CANCEL] = localizableKeyCancel;
    }

    if ([newDictionary count] == 0 ){
        return nil;
    }

    return [[NSDictionary alloc] initWithDictionary:newDictionary];
}

#pragma mark - JS Mapping

- (NSDictionary *)settingsDictionary {
    NSMutableDictionary *dictionary = [@{} mutableCopy];
    
    dictionary[RNSettingsSDKEnabled] = [NSNumber numberWithBool:SNRSynerise.settings.sdk.enabled];
    dictionary[RNSettingsSDKDoNotTrack] = [NSNumber numberWithBool:SNRSynerise.settings.sdk.doNotTrack];
    dictionary[RNSettingsSDKAppGroupIdentifier] = SNRSynerise.settings.sdk.appGroupIdentifier ?: [NSNull null];
    dictionary[RNSettingsSDKKeychainGroupIdentifier] = SNRSynerise.settings.sdk.keychainGroupIdentifier ?: [NSNull null];
    dictionary[RNSettingsSDKMinTokenRefreshInterval] = [NSNumber numberWithDouble:SNRSynerise.settings.sdk.minTokenRefreshInterval];
    dictionary[RNSettingsSDKShouldDestroySessionOnApiKeyChange] = [NSNumber numberWithDouble:SNRSynerise.settings.sdk.shouldDestroySessionOnApiKeyChange];
    dictionary[RNSettingsSDKLocalizable] = SNRSynerise.settings.sdk.localizable ?: [NSNull null];

    dictionary[RNSettingsTrackerIsBackendTimeSyncRequired] = [NSNumber numberWithBool:SNRSynerise.settings.tracker.isBackendTimeSyncRequired];
    dictionary[RNSettingsTrackerMinBatchSize] = [NSNumber numberWithInteger:SNRSynerise.settings.tracker.minBatchSize];
    dictionary[RNSettingsTrackerMaxBatchSize] = [NSNumber numberWithInteger:SNRSynerise.settings.tracker.maxBatchSize];
    dictionary[RNSettingsTrackerAutoFlushTimeout] = [NSNumber numberWithDouble:SNRSynerise.settings.tracker.autoFlushTimeout];
    dictionary[RNSettingsTrackerEventsTriggeringFlush] = SNRSynerise.settings.tracker.eventsTriggeringFlush ?: [NSNull null];

    dictionary[RNSettingsNotificationsEnabled] = [NSNumber numberWithBool:SNRSynerise.settings.notifications.enabled];
    dictionary[RNSettingsNotificationsEncryption] = [NSNumber numberWithBool:SNRSynerise.settings.notifications.encryption];
    dictionary[RNSettingsNotificationsDisableInAppAlerts] = [NSNumber numberWithBool:SNRSynerise.settings.notifications.disableInAppAlerts];
    
    dictionary[RNSettingsInAppMessagingCheckGlobalControlGroupsOnDefinitionsFetch] = [NSNumber numberWithBool:SNRSynerise.settings.inAppMessaging.checkGlobalControlGroupsOnDefinitionsFetch];
    dictionary[RNSettingsInAppMessagingMaxDefinitionUpdateIntervalLimit] = [NSNumber numberWithDouble:SNRSynerise.settings.inAppMessaging.maxDefinitionUpdateIntervalLimit];
    dictionary[RNSettingsInAppMessagingContentBaseUrl] = SNRSynerise.settings.inAppMessaging.contentBaseUrl ?: [NSNull null];
    dictionary[RNSettingsInAppMessagingRenderingTimeout] = [NSNumber numberWithDouble:SNRSynerise.settings.inAppMessaging.renderingTimeout];
    dictionary[RNSettingsInAppMessagingShouldSendInAppCappingEvent] = [NSNumber numberWithBool:SNRSynerise.settings.inAppMessaging.shouldSendInAppCappingEvent];

    dictionary[RNSettingsInjectorAutomatic] = [NSNumber numberWithBool:SNRSynerise.settings.injector.automatic];
    
    return dictionary;
}

#pragma mark - JS Module

- (NSDictionary *)constantsToExport
{
  return @{
      RNSettingsSDKEnabled: RNSettingsSDKEnabled,
      RNSettingsSDKDoNotTrack: RNSettingsSDKDoNotTrack,
      RNSettingsSDKAppGroupIdentifier: RNSettingsSDKAppGroupIdentifier,
      RNSettingsSDKKeychainGroupIdentifier: RNSettingsSDKKeychainGroupIdentifier,
      RNSettingsSDKMinTokenRefreshInterval: RNSettingsSDKMinTokenRefreshInterval,
      RNSettingsSDKShouldDestroySessionOnApiKeyChange: RNSettingsSDKShouldDestroySessionOnApiKeyChange,
      RNSettingsSDKLocalizable: RNSettingsSDKLocalizable,

      RNSettingsTrackerIsBackendTimeSyncRequired: RNSettingsTrackerIsBackendTimeSyncRequired,
      RNSettingsTrackerMinBatchSize: RNSettingsTrackerMinBatchSize,
      RNSettingsTrackerMaxBatchSize: RNSettingsTrackerMaxBatchSize,
      RNSettingsTrackerAutoFlushTimeout: RNSettingsTrackerAutoFlushTimeout,
      RNSettingsTrackerEventsTriggeringFlush: RNSettingsTrackerEventsTriggeringFlush,

      RNSettingsNotificationsEnabled: RNSettingsNotificationsEnabled,
      RNSettingsNotificationsEncryption: RNSettingsNotificationsEncryption,
      RNSettingsNotificationsDisableInAppAlerts: RNSettingsNotificationsDisableInAppAlerts,
      
      RNSettingsInAppMessagingCheckGlobalControlGroupsOnDefinitionsFetch: RNSettingsInAppMessagingCheckGlobalControlGroupsOnDefinitionsFetch,
      RNSettingsInAppMessagingMaxDefinitionUpdateIntervalLimit: RNSettingsInAppMessagingMaxDefinitionUpdateIntervalLimit,
      RNSettingsInAppMessagingContentBaseUrl: RNSettingsInAppMessagingContentBaseUrl,
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
