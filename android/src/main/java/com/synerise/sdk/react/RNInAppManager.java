package com.synerise.sdk.react;


import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Dynamic;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.synerise.sdk.injector.Injector;
import com.synerise.sdk.injector.inapp.InAppCustomMethodCompletion;
import com.synerise.sdk.injector.inapp.InAppMessageData;
import com.synerise.sdk.injector.inapp.OnInAppListener;
import com.synerise.sdk.injector.inapp.inline.InlineInAppMessageData;
import com.synerise.sdk.injector.inapp.inline.OnInlineInAppListener;
import com.synerise.sdk.injector.inapp.ui.inline.InlineInAppView;

import com.synerise.sdk.react.inapp.inline.RNInlineInAppViewRegistry;
import com.synerise.sdk.react.utils.ArrayUtil;
import com.synerise.sdk.react.utils.MapUtil;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

public class RNInAppManager {

    private static final String IN_APP_MESSAGE_PRESENTED_LISTENER_VALUE = "inAppPresented";
    private static final String IN_APP_MESSAGE_HIDDEN_LISTENER_VALUE = "inAppHidden";
    private static final String IN_APP_MESSAGE_URL_ACTION_LISTENER_VALUE = "inAppUrlAction";
    private static final String IN_APP_MESSAGE_DEEPLINK_ACTION_LISTENER_VALUE = "inAppDeepLinkAction";
    private static final String IN_APP_MESSAGE_CUSTOM_ACTION_LISTENER_VALUE = "inAppCustomAction";
    private static final String IN_APP_MESSAGE_CUSTOM_METHOD_VALUE = "inAppCustomMethod";
    private static final String INLINE_IN_APP_MESSAGE_URL_ACTION_LISTENER_VALUE = "inlineInAppUrlAction";
    private static final String INLINE_IN_APP_MESSAGE_DEEPLINK_ACTION_LISTENER_VALUE = "inlineInAppDeepLinkAction";
    private static final String INLINE_IN_APP_MESSAGE_CUSTOM_ACTION_LISTENER_VALUE = "inlineInAppCustomAction";
    private static final String INLINE_IN_APP_MESSAGE_CUSTOM_METHOD_LISTENER_VALUE = "inlineInAppCustomMethod";
    private static final String INLINE_IN_APP_MESSAGE_AVAILABLE_LISTENER_VALUE = "inlineInAppAvailable";

    private static final String JINJAVA_CONTEXT_KEY = "jinjavaContext";

    private static final ConcurrentHashMap<String, InAppCustomMethodCompletion> pendingInlineCustomMethodCompletions = new ConcurrentHashMap<>();
    private static final ConcurrentHashMap<String, InAppCustomMethodCompletion> pendingInAppCustomMethodCompletions = new ConcurrentHashMap<>();

    private final ReactApplicationContext reactApplicationContext;

    public RNInAppManager(ReactApplicationContext reactApplicationContext) {
        this.reactApplicationContext = reactApplicationContext;
    }

    public void closeInAppMessage(String campaignHash) {
        Injector.closeInAppMessage(campaignHash);
    }

    public void resolveInlineCustomMethod(String callId, boolean success, Dynamic result, String error) {
        resolvePendingCustomMethod(pendingInlineCustomMethodCompletions, callId, success, result, error);
    }

    public void resolveInAppCustomMethod(String callId, boolean success, Dynamic result, String error) {
        resolvePendingCustomMethod(pendingInAppCustomMethodCompletions, callId, success, result, error);
    }

    /**
     * Shared by the overlay and inline paths so both accept the same result shapes. `Dynamic` keeps the
     * JS value's own type (string, number, boolean, array, object, null) instead of forcing an object,
     * matching iOS and the 1.10.0 behaviour.
     */
    private static void resolvePendingCustomMethod(ConcurrentHashMap<String, InAppCustomMethodCompletion> pendingCompletions, String callId, boolean success, Dynamic result, String error) {
        InAppCustomMethodCompletion completion = pendingCompletions.remove(callId);
        if (completion == null) {
            return;
        }
        if (success) {
            completion.success(customMethodResultFromDynamic(result));
        } else {
            completion.failure(error != null ? error : "Unknown error.");
        }
    }

    private static Object customMethodResultFromDynamic(Dynamic result) {
        if (result == null || result.isNull()) {
            return null;
        }
        switch (result.getType()) {
            case Boolean:
                return result.asBoolean();
            case Number:
                return result.asDouble();
            case String:
                return result.asString();
            case Map:
                return MapUtil.toMap(result.asMap());
            case Array:
                return ArrayUtil.toArray(result.asArray());
            default:
                return null;
        }
    }

    public void initializeInAppListener() {
        Injector.setOnInAppListener(new OnInAppListener() {
            @Override
            public boolean shouldShow(InAppMessageData inAppMessageData) {
                return true;
            }

            @Override
            public void onShown(InAppMessageData inAppMessageData) {
                onInAppPresented(inAppMessageData);
            }

            @Override
            public void onDismissed(InAppMessageData inAppMessageData) {
                onInAppHidden(inAppMessageData);
            }

            @Override
            public void onHandledOpenUrl(InAppMessageData inAppMessageData) {
                onInAppMessageOpenUrl(inAppMessageData);
            }

            @Override
            public void onHandledOpenDeepLink(InAppMessageData inAppMessageData) {
                onInAppMessageDeepLink(inAppMessageData);
            }

            @Override
            public HashMap<String, Object> onContextFromAppRequired(InAppMessageData inAppMessageData) {
                return jinjavaContextFromApp();
            }

            @Override
            public void onCustomAction(String identifier, HashMap<String, Object> params, InAppMessageData inAppMessageData) {
                onInAppCustomAction(identifier, params, inAppMessageData);
            }

            @Override
            public void onCustomMethod(String name, HashMap<String, Object> params, InAppMessageData inAppMessageData, InAppCustomMethodCompletion completion) {
                onInAppCustomMethod(name, params, inAppMessageData, completion);
            }
        });
    }


    private void onInAppPresented(InAppMessageData inAppMessageData) {
        WritableMap objectToJs = Arguments.createMap();
        WritableMap data = Arguments.createMap();
        data.putString("campaignHash", inAppMessageData.getCampaignHash());
        data.putString("variantIdentifier", inAppMessageData.getVariantId());
        data.putMap("additionalParameters", MapUtil.toWritableMap(inAppMessageData.getAdditionalParameters()));
        data.putBoolean("isTest", Boolean.TRUE.equals(inAppMessageData.getTest()));
        objectToJs.putMap("data", data);
        sendEventToJs(IN_APP_MESSAGE_PRESENTED_LISTENER_VALUE, objectToJs);
    }

    private void onInAppHidden(InAppMessageData inAppMessageData) {
        WritableMap objectToJs = Arguments.createMap();
        WritableMap data = Arguments.createMap();
        data.putString("campaignHash", inAppMessageData.getCampaignHash());
        data.putString("variantIdentifier", inAppMessageData.getVariantId());
        data.putMap("additionalParameters", MapUtil.toWritableMap(inAppMessageData.getAdditionalParameters()));
        data.putBoolean("isTest", Boolean.TRUE.equals(inAppMessageData.getTest()));
        objectToJs.putMap("data", data);
        sendEventToJs(IN_APP_MESSAGE_HIDDEN_LISTENER_VALUE, objectToJs);
    }

    private void onInAppMessageOpenUrl(InAppMessageData inAppMessageData) {
        WritableMap objectToJs = Arguments.createMap();
        WritableMap data = Arguments.createMap();
        data.putString("campaignHash", inAppMessageData.getCampaignHash());
        data.putString("variantIdentifier", inAppMessageData.getVariantId());
        data.putMap("additionalParameters", MapUtil.toWritableMap(inAppMessageData.getAdditionalParameters()));
        data.putBoolean("isTest", Boolean.TRUE.equals(inAppMessageData.getTest()));
        objectToJs.putMap("data", data);
        objectToJs.putString("url", inAppMessageData.getUrl());
        sendEventToJs(IN_APP_MESSAGE_URL_ACTION_LISTENER_VALUE, objectToJs);
    }

    private void onInAppMessageDeepLink(InAppMessageData inAppMessageData) {
        WritableMap objectToJs = Arguments.createMap();
        WritableMap data = Arguments.createMap();
        data.putString("campaignHash", inAppMessageData.getCampaignHash());
        data.putString("variantIdentifier", inAppMessageData.getVariantId());
        data.putMap("additionalParameters", MapUtil.toWritableMap(inAppMessageData.getAdditionalParameters()));
        data.putBoolean("isTest", Boolean.TRUE.equals(inAppMessageData.getTest()));
        objectToJs.putMap("data", data);
        objectToJs.putString("deepLink", inAppMessageData.getDeepLink());
        sendEventToJs(IN_APP_MESSAGE_DEEPLINK_ACTION_LISTENER_VALUE, objectToJs);
    }

    private void onInAppCustomAction(String identifier, HashMap<String, Object> params, InAppMessageData inAppMessageData) {
        WritableMap objectToJs = Arguments.createMap();
        WritableMap data = Arguments.createMap();
        data.putString("campaignHash", inAppMessageData.getCampaignHash());
        data.putString("variantIdentifier", inAppMessageData.getVariantId());
        data.putMap("additionalParameters", MapUtil.toWritableMap(inAppMessageData.getAdditionalParameters()));
        data.putBoolean("isTest", Boolean.TRUE.equals(inAppMessageData.getTest()));
        objectToJs.putMap("data", data);
        objectToJs.putString("name", identifier);
        objectToJs.putMap("parameters", MapUtil.toWritableMap(params));
        sendEventToJs(IN_APP_MESSAGE_CUSTOM_ACTION_LISTENER_VALUE, objectToJs);
    }

    private void onInAppCustomMethod(String name, HashMap<String, Object> params, InAppMessageData inAppMessageData, InAppCustomMethodCompletion completion) {
        String callId = UUID.randomUUID().toString();
        pendingInAppCustomMethodCompletions.put(callId, completion);
        WritableMap objectToJs = Arguments.createMap();
        objectToJs.putString("callId", callId);
        objectToJs.putString("name", name);
        objectToJs.putMap("parameters", params != null ? MapUtil.objectMapToWritableMap(params) : Arguments.createMap());
        objectToJs.putMap("data", baseDataToWritableMap(inAppMessageData));
        sendEventToJs(IN_APP_MESSAGE_CUSTOM_METHOD_VALUE, objectToJs);
    }

    public void initializeInlineInAppListener() {
        Injector.setOnInlineInAppListener(new OnInlineInAppListener() {
            @Override
            public void onInlineInAppAvailable(InlineInAppView view, InlineInAppMessageData data) {
                String viewId = RNInlineInAppViewRegistry.retain(data.getPlacementKey(), view);
                emitInlineInAppAvailable(data, viewId);
            }

            @Override
            public Map<String, Object> onContextFromAppRequired(InlineInAppMessageData data) {
                return jinjavaContextFromApp();
            }

            @Override
            public void onOpenedUrl(InlineInAppMessageData data, String url) {
                onInlineOpenedUrl(data, url);
            }

            @Override
            public void onOpenedDeepLink(InlineInAppMessageData data, String deepLink) {
                onInlineOpenedDeepLink(data, deepLink);
            }

            @Override
            public void onCustomAction(InlineInAppMessageData data, String name, Map<String, Object> params) {
                onInlineCustomAction(data, name, params);
            }

            @Override
            public void onCustomMethod(String name, HashMap<String, Object> params, InlineInAppMessageData data, InAppCustomMethodCompletion completion) {
                onInlineCustomMethod(name, params, data, completion);
            }
        });
    }

    private WritableMap inlineDataToWritableMap(InlineInAppMessageData data) {
        WritableMap dataMap = Arguments.createMap();
        if (data != null) {
            dataMap.putString("campaignHash", data.getCampaignHash());
            dataMap.putString("variantIdentifier", data.getVariantId());
            dataMap.putString("placementKey", data.getPlacementKey());
            dataMap.putBoolean("isTest", data.isTest());
            Map<String, Object> additionalParameters = data.getAdditionalParameters();
            dataMap.putMap("additionalParameters", additionalParameters != null ? MapUtil.objectMapToWritableMap(additionalParameters) : Arguments.createMap());
        }
        return dataMap;
    }

    private void emitInlineInAppAvailable(InlineInAppMessageData data, String viewId) {
        WritableMap objectToJs = Arguments.createMap();
        objectToJs.putMap("data", inlineDataToWritableMap(data));
        objectToJs.putString("viewId", viewId);
        sendEventToJs(INLINE_IN_APP_MESSAGE_AVAILABLE_LISTENER_VALUE, objectToJs);
    }

    private void onInlineOpenedUrl(InlineInAppMessageData data, String url) {
        WritableMap objectToJs = Arguments.createMap();
        objectToJs.putMap("data", inlineDataToWritableMap(data));
        objectToJs.putString("url", url);
        sendEventToJs(INLINE_IN_APP_MESSAGE_URL_ACTION_LISTENER_VALUE, objectToJs);
    }

    private void onInlineOpenedDeepLink(InlineInAppMessageData data, String deepLink) {
        WritableMap objectToJs = Arguments.createMap();
        objectToJs.putMap("data", inlineDataToWritableMap(data));
        objectToJs.putString("deepLink", deepLink);
        sendEventToJs(INLINE_IN_APP_MESSAGE_DEEPLINK_ACTION_LISTENER_VALUE, objectToJs);
    }

    private void onInlineCustomAction(InlineInAppMessageData data, String name, Map<String, Object> params) {
        WritableMap objectToJs = Arguments.createMap();
        objectToJs.putMap("data", inlineDataToWritableMap(data));
        objectToJs.putString("name", name);
        objectToJs.putMap("parameters", params != null ? MapUtil.objectMapToWritableMap(params) : Arguments.createMap());
        sendEventToJs(INLINE_IN_APP_MESSAGE_CUSTOM_ACTION_LISTENER_VALUE, objectToJs);
    }

    private void onInlineCustomMethod(String name, HashMap<String, Object> params, InlineInAppMessageData data, InAppCustomMethodCompletion completion) {
        String callId = UUID.randomUUID().toString();
        pendingInlineCustomMethodCompletions.put(callId, completion);
        WritableMap objectToJs = Arguments.createMap();
        objectToJs.putString("callId", callId);
        objectToJs.putString("name", name);
        objectToJs.putMap("parameters", params != null ? MapUtil.objectMapToWritableMap(params) : Arguments.createMap());
        objectToJs.putMap("data", inlineDataToWritableMap(data));
        sendEventToJs(INLINE_IN_APP_MESSAGE_CUSTOM_METHOD_LISTENER_VALUE, objectToJs);
    }




    private WritableMap baseDataToWritableMap(InAppMessageData data) {
        WritableMap dataMap = Arguments.createMap();
        if (data != null) {
            dataMap.putString("campaignHash", data.getCampaignHash());
            dataMap.putString("variantIdentifier", data.getVariantId());
            dataMap.putBoolean("isTest", Boolean.TRUE.equals(data.getTest()));
            Map<String, Object> additionalParameters = data.getAdditionalParameters();
            dataMap.putMap("additionalParameters", additionalParameters != null ? MapUtil.objectMapToWritableMap(additionalParameters) : Arguments.createMap());
        }
        return dataMap;
    }

    private HashMap<String, Object> jinjavaContextFromApp() {
        Object jinjavaContext = Injector.inAppContext.get(JINJAVA_CONTEXT_KEY);
        if (jinjavaContext instanceof Map) {
            return new HashMap<>((Map<String, Object>) jinjavaContext);
        }

        return new HashMap<>();
    }

    private void sendEventToJs(String eventName, WritableMap data) {
        reactApplicationContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, data);
    }
}
