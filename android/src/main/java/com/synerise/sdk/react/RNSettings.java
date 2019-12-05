package com.synerise.sdk.react;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.facebook.react.bridge.ReadableType;
import com.facebook.react.bridge.WritableMap;
import com.synerise.sdk.core.Synerise;
import com.synerise.sdk.core.settings.Settings;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Nonnull;

public class RNSettings extends RNBaseModule {

    public static final String RN_SETTINGS_SDK_ENABLED = "SDK_ENABLED";
    public static final String RN_SETTINGS_SDK_MIN_TOKEN_REFRESH_INTERVAL = "SDK_MIN_TOKEN_REFRESH_INTERVAL";
    public static final String RN_SETTINGS_TRACKER_MIN_BATCH_SIZE = "TRACKER_MIN_BATCH_SIZE";
    public static final String RN_SETTINGS_TRACKER_MAX_BATCH_SIZE = "TRACKER_MAX_BATCH_SIZE";
    public static final String RN_SETTINGS_TRACKER_AUTO_FLUSH_TIMEOUT = "TRACKER_AUTO_FLUSH_TIMEOUT";

    public RNSettings(ReactApplicationContext reactApplicationContext) {
        super(reactApplicationContext);
    }

    @Nonnull
    @Override
    public String getName() {
        return "RNSettings";
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public WritableMap constantsToExport() {
        WritableMap constants = Arguments.createMap();
        constants.putString(RN_SETTINGS_SDK_ENABLED, RN_SETTINGS_SDK_ENABLED);
        constants.putString(RN_SETTINGS_SDK_MIN_TOKEN_REFRESH_INTERVAL, RN_SETTINGS_SDK_MIN_TOKEN_REFRESH_INTERVAL);
        constants.putString(RN_SETTINGS_TRACKER_MIN_BATCH_SIZE, RN_SETTINGS_TRACKER_MIN_BATCH_SIZE);
        constants.putString(RN_SETTINGS_TRACKER_MAX_BATCH_SIZE, RN_SETTINGS_TRACKER_MAX_BATCH_SIZE);
        constants.putString(RN_SETTINGS_TRACKER_AUTO_FLUSH_TIMEOUT, RN_SETTINGS_TRACKER_AUTO_FLUSH_TIMEOUT);
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
        return setting;
    }

    //function setOne(key: string, value: any)
    @ReactMethod
    public void setOne(String key, Object value) {
        matchSetting(key, value);
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
                   setOne(key, newSettings.getBoolean(key));
                    break;
                case Number:
                   setOne(key, newSettings.getInt(key));
                    break;
            }
        }
    }

    private void matchSetting(String key, Object value) {
        switch (key) {
            case RN_SETTINGS_SDK_ENABLED:
                if (value instanceof Boolean) {
                    Settings.sdk.enabled = (Boolean) value;
                }
                break;
            case RN_SETTINGS_SDK_MIN_TOKEN_REFRESH_INTERVAL:
                if (value instanceof Integer) {
                    Settings.sdk.setMinTokenRefreshInterval((int) value);
                }
                break;
            case RN_SETTINGS_TRACKER_AUTO_FLUSH_TIMEOUT:
                if (value instanceof Integer) {
                    Settings.tracker.setAutoFlushTimeout((int) value);
                }
                break;
            case RN_SETTINGS_TRACKER_MAX_BATCH_SIZE:
                if (value instanceof Integer) {
                    Settings.tracker.setMaximumBatchSize((int) value);
                }
                break;
            case RN_SETTINGS_TRACKER_MIN_BATCH_SIZE:
                if (value instanceof Integer) {
                    Settings.tracker.setMinimumBatchSize((int) value);
                }
                break;
        }
    }

    private Map<String, Object> settingsDictionary() {
        Map<String, Object> settings = new HashMap<>();
        settings.put(RN_SETTINGS_SDK_ENABLED, Synerise.settings.sdk.enabled);
        settings.put(RN_SETTINGS_SDK_MIN_TOKEN_REFRESH_INTERVAL, Synerise.settings.sdk.getMinTokenRefreshInterval());
        settings.put(RN_SETTINGS_TRACKER_MIN_BATCH_SIZE, Synerise.settings.tracker.minBatchSize);
        settings.put(RN_SETTINGS_TRACKER_MAX_BATCH_SIZE, Synerise.settings.tracker.maxBatchSize);
        settings.put(RN_SETTINGS_TRACKER_AUTO_FLUSH_TIMEOUT, Synerise.settings.tracker.autoFlushTimeout);
        return settings;
    }
}
