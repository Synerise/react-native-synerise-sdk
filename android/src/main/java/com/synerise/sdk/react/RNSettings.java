package com.synerise.sdk.react;


import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.facebook.react.bridge.ReadableType;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.synerise.sdk.core.Synerise;
import com.synerise.sdk.core.settings.Settings;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

public class RNSettings extends RNBaseModule {

    public static final String RN_SETTINGS_SDK_ENABLED = "SDK_ENABLED";
    public static final String RN_SETTINGS_SDK_MIN_TOKEN_REFRESH_INTERVAL = "SDK_MIN_TOKEN_REFRESH_INTERVAL";
    public static final String RN_SETTINGS_SHOULD_DESTROY_SESSION_ON_API_KEY_CHANGE = "SDK_SHOULD_DESTROY_SESSION_ON_API_KEY_CHANGE";
    public static final String RN_SETTINGS_TRACKER_IS_BACKEND_TIME_SYNC_REQUIRED = "TRACKER_IS_BACKEND_TIME_SYNC_REQUIRED";
    public static final String RN_SETTINGS_TRACKER_MIN_BATCH_SIZE = "TRACKER_MIN_BATCH_SIZE";
    public static final String RN_SETTINGS_TRACKER_MAX_BATCH_SIZE = "TRACKER_MAX_BATCH_SIZE";
    public static final String RN_SETTINGS_TRACKER_AUTO_FLUSH_TIMEOUT = "TRACKER_AUTO_FLUSH_TIMEOUT";
    public static final String RN_SETTINGS_TRACKER_EVENTS_TRIGGERING_FLUSH = "TRACKER_EVENTS_TRIGGERING_FLUSH";
    public static final String RN_SETTINGS_NOTIFICATIONS_ENABLED = "NOTIFICATIONS_ENABLED";
    public static final String RN_SETTINGS_NOTIFICATIONS_ENCRYPTION = "NOTIFICATIONS_ENCRYPTION";
    public static final String RN_SETTINGS_INJECTOR_AUTOMATIC = "INJECTOR_AUTOMATIC";
    public static final String RN_SETTINGS_IN_APP_CHECK_GLOBAL_CONTROL_GROUPS_ON_DEFINITIONS_FETCH = "IN_APP_CHECK_GLOBAL_CONTROL_GROUPS_ON_DEFINITIONS_FETCH";
    public static final String RN_SETTINGS_IN_APP_MAX_DEFINITION_UPDATE_INTERVAL_LIMIT = "IN_APP_MAX_DEFINITION_UPDATE_INTERVAL_LIMIT";
    public static final String RN_SETTINGS_IN_APP_MESSAGING_RENDERING_TIMEOUT = "IN_APP_MESSAGING_RENDERING_TIMEOUT";
    public static final String RN_SETTINGS_IN_APP_MESSAGING_SHOULD_SEND_IN_APP_CAPPING_EVENT = "IN_APP_MESSAGING_SHOULD_SEND_IN_APP_CAPPING_EVENT";

    public RNSettings(ReactApplicationContext reactApplicationContext) {
        super(reactApplicationContext);
    }

    @Nonnull
    @Override
    public String getName() {
        return "RNSettings";
    }

    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put(RN_SETTINGS_SDK_ENABLED, RN_SETTINGS_SDK_ENABLED);
        constants.put(RN_SETTINGS_SDK_MIN_TOKEN_REFRESH_INTERVAL, RN_SETTINGS_SDK_MIN_TOKEN_REFRESH_INTERVAL);
        constants.put(RN_SETTINGS_TRACKER_IS_BACKEND_TIME_SYNC_REQUIRED, RN_SETTINGS_TRACKER_IS_BACKEND_TIME_SYNC_REQUIRED);
        constants.put(RN_SETTINGS_TRACKER_MIN_BATCH_SIZE, RN_SETTINGS_TRACKER_MIN_BATCH_SIZE);
        constants.put(RN_SETTINGS_TRACKER_MAX_BATCH_SIZE, RN_SETTINGS_TRACKER_MAX_BATCH_SIZE);
        constants.put(RN_SETTINGS_TRACKER_AUTO_FLUSH_TIMEOUT, RN_SETTINGS_TRACKER_AUTO_FLUSH_TIMEOUT);
        constants.put(RN_SETTINGS_TRACKER_EVENTS_TRIGGERING_FLUSH, RN_SETTINGS_TRACKER_EVENTS_TRIGGERING_FLUSH);
        constants.put(RN_SETTINGS_INJECTOR_AUTOMATIC, RN_SETTINGS_INJECTOR_AUTOMATIC);
        constants.put(RN_SETTINGS_NOTIFICATIONS_ENABLED, RN_SETTINGS_NOTIFICATIONS_ENABLED);
        constants.put(RN_SETTINGS_NOTIFICATIONS_ENCRYPTION, RN_SETTINGS_NOTIFICATIONS_ENCRYPTION);
        constants.put(RN_SETTINGS_SHOULD_DESTROY_SESSION_ON_API_KEY_CHANGE, RN_SETTINGS_SHOULD_DESTROY_SESSION_ON_API_KEY_CHANGE);
        constants.put(RN_SETTINGS_IN_APP_CHECK_GLOBAL_CONTROL_GROUPS_ON_DEFINITIONS_FETCH, RN_SETTINGS_IN_APP_CHECK_GLOBAL_CONTROL_GROUPS_ON_DEFINITIONS_FETCH);
        constants.put(RN_SETTINGS_IN_APP_MAX_DEFINITION_UPDATE_INTERVAL_LIMIT, RN_SETTINGS_IN_APP_MAX_DEFINITION_UPDATE_INTERVAL_LIMIT);
        constants.put(RN_SETTINGS_IN_APP_MESSAGING_RENDERING_TIMEOUT, RN_SETTINGS_IN_APP_MESSAGING_RENDERING_TIMEOUT);
        constants.put(RN_SETTINGS_IN_APP_MESSAGING_SHOULD_SEND_IN_APP_CAPPING_EVENT, RN_SETTINGS_IN_APP_MESSAGING_SHOULD_SEND_IN_APP_CAPPING_EVENT);
        return constants;
    }

    //function getOne(key: string)
    @ReactMethod(isBlockingSynchronousMethod = true)
    public WritableMap getOne(String key) {
        Map<String, Object> settings = settingsDictionary();
        WritableMap setting = Arguments.createMap();
        if (settings.get(key) instanceof Boolean && settings.containsKey(key)) {
            setting.putBoolean(key, (Boolean) settings.get(key));
        }
        if (settings.get(key) instanceof Integer) {
            setting.putInt(key, (int) settings.get(key));
        }
        if (settings.get(key) instanceof List) {
            List<String> eventsTriggeringFlush = (List<String>) settings.get(key);
            WritableArray writableArray = Arguments.createArray();

            for (int i = 0; i < Objects.requireNonNull(eventsTriggeringFlush).size(); i++) {
                writableArray.pushString(eventsTriggeringFlush.get(i));
            }

            setting.putArray(key, (WritableArray) writableArray);
        }
        return setting;
    }

    //function setOne(key: string, value: any)
    @ReactMethod
    public void setOne(ReadableMap settingMap) {
        String key = settingMap.getString("key");
        ReadableType type = settingMap.getType("value");
        switch (type) {
            case Boolean:
                matchSetting(key, settingMap.getBoolean("value"));
                break;
            case Number:
                matchSetting(key, settingMap.getInt("value"));
                break;
            case Array:
                matchSetting(key, settingMap.getArray("value"));
                break;
        }
    }

    //function setMany(settings: object)
    @ReactMethod
    public void setMany(ReadableMap newSettings) {
        ReadableMapKeySetIterator iterator = newSettings.keySetIterator();

        while (iterator.hasNextKey()) {
            String key = iterator.nextKey();
            ReadableType type = newSettings.getType(key);
            switch (type) {
                case Boolean:
                   matchSetting(key, newSettings.getBoolean(key));
                    break;
                case Number:
                   matchSetting(key, newSettings.getInt(key));
                    break;
                case Array:
                    matchSetting(key, newSettings.getArray(key));
                    break;
            }
        }
    }

    private void matchSetting(String key, Object value) {
        switch (key) {
            case RN_SETTINGS_SDK_ENABLED:
                if (value instanceof Boolean) {
                    Settings.getInstance().sdk.setSDKEnabled((Boolean) value);
                }
                break;
            case RN_SETTINGS_SDK_MIN_TOKEN_REFRESH_INTERVAL:
                if (value instanceof Integer) {
                    Settings.getInstance().sdk.setMinTokenRefreshInterval((int) value);
                }
                break;
            case RN_SETTINGS_TRACKER_IS_BACKEND_TIME_SYNC_REQUIRED:
                if (value instanceof Boolean) {
                    Settings.getInstance().tracker.isBackendTimeSyncRequired = (Boolean) value;
                }
            case RN_SETTINGS_TRACKER_AUTO_FLUSH_TIMEOUT:
                if (value instanceof Integer) {
                    Settings.getInstance().tracker.setAutoFlushTimeout(((int) value) * 1000);
                }
                break;
            case RN_SETTINGS_TRACKER_EVENTS_TRIGGERING_FLUSH:
                if (value instanceof ReadableArray) {
                    List<String> eventsFromRN = new ArrayList<>();
                    for (int i = 0; i< ((ReadableArray) value).size(); i++) {
                        eventsFromRN.add(((ReadableArray) value).getString(i));
                    }
                    Settings.getInstance().tracker.eventsTriggeringFlush = eventsFromRN;
                }
                break;
            case RN_SETTINGS_TRACKER_MAX_BATCH_SIZE:
                if (value instanceof Integer) {
                    Settings.getInstance().tracker.setMaximumBatchSize((int) value);
                }
                break;
            case RN_SETTINGS_TRACKER_MIN_BATCH_SIZE:
                if (value instanceof Integer) {
                    Settings.getInstance().tracker.setMinimumBatchSize((int) value);
                }
                break;
            case RN_SETTINGS_INJECTOR_AUTOMATIC:
                if (value instanceof Boolean) {
                    Settings.getInstance().injector.automatic = (Boolean) value;
                }
                break;
            case RN_SETTINGS_NOTIFICATIONS_ENABLED:
                if (value instanceof Boolean) {
                    Settings.getInstance().notifications.enabled = (Boolean) value;
                }
                break;
            case RN_SETTINGS_NOTIFICATIONS_ENCRYPTION:
                if (value instanceof Boolean) {
                    Settings.getInstance().notifications.setEncryption((Boolean) value);
                }
                break;
            case RN_SETTINGS_SHOULD_DESTROY_SESSION_ON_API_KEY_CHANGE:
                if (value instanceof Boolean) {
                    Settings.getInstance().sdk.shouldDestroySessionOnApiKeyChange = (Boolean) value;
                }
                break;
            case RN_SETTINGS_IN_APP_CHECK_GLOBAL_CONTROL_GROUPS_ON_DEFINITIONS_FETCH:
                if (value instanceof Boolean) {
                    Settings.getInstance().inAppMessaging.checkGlobalControlGroupsOnDefinitionsFetch = (Boolean) value;
                }
            case RN_SETTINGS_IN_APP_MAX_DEFINITION_UPDATE_INTERVAL_LIMIT:
                if (value instanceof Integer) {
                    Settings.getInstance().inAppMessaging.setMaxDefinitionUpdateIntervalLimit((int) value);
                }

            case RN_SETTINGS_IN_APP_MESSAGING_RENDERING_TIMEOUT:
                if (value instanceof Integer) {
                    Settings.getInstance().inAppMessaging.renderingTimeout = ((int) value) * 1000;
                }
            
            case RN_SETTINGS_IN_APP_MESSAGING_SHOULD_SEND_IN_APP_CAPPING_EVENT:
                if (value instanceof Boolean) {
                    Settings.getInstance().inAppMessaging.shouldSendInAppCappingEvent = (Boolean) value;
                }
        }
    }

    private Map<String, Object> settingsDictionary() {
        Map<String, Object> settings = new HashMap<>();
        settings.put(RN_SETTINGS_SDK_ENABLED, Synerise.settings.sdk.isSDKEnabled());
        settings.put(RN_SETTINGS_SDK_MIN_TOKEN_REFRESH_INTERVAL, Synerise.settings.sdk.getMinTokenRefreshInterval());
        settings.put(RN_SETTINGS_TRACKER_IS_BACKEND_TIME_SYNC_REQUIRED, Synerise.settings.tracker.isBackendTimeSyncRequired);
        settings.put(RN_SETTINGS_TRACKER_MIN_BATCH_SIZE, Synerise.settings.tracker.minBatchSize);
        settings.put(RN_SETTINGS_TRACKER_MAX_BATCH_SIZE, Synerise.settings.tracker.maxBatchSize);
        settings.put(RN_SETTINGS_TRACKER_AUTO_FLUSH_TIMEOUT, Synerise.settings.tracker.autoFlushTimeout / 1000);
        settings.put(RN_SETTINGS_TRACKER_EVENTS_TRIGGERING_FLUSH, Synerise.settings.tracker.eventsTriggeringFlush);
        settings.put(RN_SETTINGS_INJECTOR_AUTOMATIC, Synerise.settings.injector.automatic);
        settings.put(RN_SETTINGS_NOTIFICATIONS_ENABLED, Synerise.settings.notifications.enabled);
        settings.put(RN_SETTINGS_NOTIFICATIONS_ENCRYPTION, Synerise.settings.notifications.getEncryption());
        settings.put(RN_SETTINGS_SHOULD_DESTROY_SESSION_ON_API_KEY_CHANGE, Synerise.settings.sdk.shouldDestroySessionOnApiKeyChange);
        settings.put(RN_SETTINGS_IN_APP_CHECK_GLOBAL_CONTROL_GROUPS_ON_DEFINITIONS_FETCH, Synerise.settings.inAppMessaging.checkGlobalControlGroupsOnDefinitionsFetch);
        settings.put(RN_SETTINGS_IN_APP_MESSAGING_RENDERING_TIMEOUT, Synerise.settings.inAppMessaging.renderingTimeout / 1000);
        settings.put(RN_SETTINGS_IN_APP_MAX_DEFINITION_UPDATE_INTERVAL_LIMIT, Synerise.settings.inAppMessaging.getMaxDefinitionUpdateIntervalLimit());
        settings.put(RN_SETTINGS_IN_APP_MESSAGING_SHOULD_SEND_IN_APP_CAPPING_EVENT, Synerise.settings.inAppMessaging.shouldSendInAppCappingEvent);
        return settings;
    }
}
