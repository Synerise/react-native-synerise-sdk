package com.synerise.sdk.react;

import android.os.Handler;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.google.gson.Gson;
import com.synerise.sdk.core.Synerise;
import com.synerise.sdk.core.utils.SystemUtils;
import com.synerise.sdk.injector.Injector;
import com.synerise.sdk.injector.callback.OnInjectorListener;
import com.synerise.sdk.injector.callback.SyneriseSource;
import com.synerise.sdk.injector.inapp.InAppMessageData;
import com.synerise.sdk.injector.inapp.OnInAppListener;
import com.synerise.sdk.injector.ui.handler.InjectorActionHandler;
import com.synerise.sdk.react.utils.MapUtil;
import org.json.JSONException;
import org.json.JSONObject;
import java.util.HashMap;
import java.util.Map;
import javax.annotation.Nonnull;
import javax.annotation.Nullable;

public class RNInjector extends RNBaseModule {

    private static ReactApplicationContext reactApplicationContext;
    private static final String URL = "url";
    private static final String OPEN_URL_KEY = "URL_ACTION_LISTENER_KEY";
    private static final String DEEP_LINK_KEY = "DEEPLINK_ACTION_LISTENER_KEY";
    private static final String OPEN_URL_VALUE = "openUrl";
    private static final String DEEP_LINK = "deepLink";
    private static final String SOURCE = "source";
    private static final String DEEP_LINK_VALUE = "deepLink";
    private static final String IN_APP_MESSAGE_PRESENTED_LISTENER_KEY = "IN_APP_MESSAGE_PRESENTED_LISTENER_KEY";
    private static final String IN_APP_MESSAGE_HIDDEN_LISTENER_KEY = "IN_APP_MESSAGE_HIDDEN_LISTENER_KEY";
    private static final String IN_APP_MESSAGE_URL_ACTION_LISTENER_KEY = "IN_APP_MESSAGE_URL_ACTION_LISTENER_KEY";
    private static final String IN_APP_MESSAGE_DEEPLINK_ACTION_LISTENER_KEY = "IN_APP_MESSAGE_DEEPLINK_ACTION_LISTENER_KEY";
    private static final String IN_APP_MESSAGE_CUSTOM_ACTION_LISTENER_KEY = "IN_APP_MESSAGE_CUSTOM_ACTION_LISTENER_KEY";
    private static final String IN_APP_MESSAGE_PRESENTED_LISTENER_VALUE = "inAppPresented";
    private static final String IN_APP_MESSAGE_HIDDEN_LISTENER_VALUE = "inAppHidden";
    private static final String IN_APP_MESSAGE_URL_ACTION_LISTENER_VALUE = "inAppUrlAction";
    private static final String IN_APP_MESSAGE_DEEPLINK_ACTION_LISTENER_VALUE = "inAppDeepLinkAction";
    private static final String IN_APP_MESSAGE_CUSTOM_ACTION_LISTENER_VALUE = "inAppCustomAction";
    private static Boolean shouldBannerPresentFlag = false;
    private Gson gson = new Gson();

    public RNInjector(ReactApplicationContext reactApplicationContext) {
        super(reactApplicationContext);
        this.reactApplicationContext = reactApplicationContext;
    }

    @ReactMethod
    public void handleOpenUrlBySDK(String url) {
        SystemUtils.openURL(Synerise.getApplicationContext(), url);
    }

    @ReactMethod
    public void handleDeepLinkBySDK(String deepLink) {
        SystemUtils.openDeepLink(Synerise.getApplicationContext(), deepLink);
    }

    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put(OPEN_URL_KEY, OPEN_URL_VALUE);
        constants.put(DEEP_LINK_KEY, DEEP_LINK_VALUE);
        constants.put(IN_APP_MESSAGE_PRESENTED_LISTENER_KEY, IN_APP_MESSAGE_PRESENTED_LISTENER_VALUE);
        constants.put(IN_APP_MESSAGE_HIDDEN_LISTENER_KEY, IN_APP_MESSAGE_HIDDEN_LISTENER_VALUE);
        constants.put(IN_APP_MESSAGE_URL_ACTION_LISTENER_KEY, IN_APP_MESSAGE_URL_ACTION_LISTENER_VALUE);
        constants.put(IN_APP_MESSAGE_DEEPLINK_ACTION_LISTENER_KEY, IN_APP_MESSAGE_DEEPLINK_ACTION_LISTENER_VALUE);
        constants.put(IN_APP_MESSAGE_CUSTOM_ACTION_LISTENER_KEY, IN_APP_MESSAGE_CUSTOM_ACTION_LISTENER_VALUE);
        return constants;
    }

    @Nonnull
    @Override
    public String getName() {
        return "RNInjector";
    }

    protected static void initializeInjector() {
        initializeInAppListener();
    }

    protected static void initializeActionInjectorListener() {
        InjectorActionHandler.setOnInjectorListener(new OnInjectorListener() {
            @Override
            public void onOpenUrl(SyneriseSource syneriseSource, String url) {
                Handler handler = new android.os.Handler();
                handler.postDelayed(new Runnable() {
                    @Override
                    public void run() {
                        onActionOpenUrl(url, syneriseSource.name());
                    }
                }, 300);
            }

            @Override
            public void onDeepLink(SyneriseSource syneriseSource, String deepLink) {
                Handler handler = new android.os.Handler();
                handler.postDelayed(new Runnable() {
                    @Override
                    public void run() {
                        onActionDeepLink(deepLink, syneriseSource.name());
                    }
                }, 300);
            }
        });
    }

    private static void onActionOpenUrl(String url, String source) {
        WritableMap data = Arguments.createMap();
        data.putString(URL, url);
        data.putString(SOURCE, source);
        sendEventToJs(OPEN_URL_VALUE, data, reactApplicationContext);
    }

    private static void onActionDeepLink(String deepLink, String source) {
        WritableMap data = Arguments.createMap();
        data.putString(DEEP_LINK, deepLink);
        data.putString(SOURCE, source);
        sendEventToJs(DEEP_LINK_VALUE, data, reactApplicationContext);
    }

    private static void initializeInAppListener() {
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
                return null;
            }

            @Override
            public void onCustomAction(String identifier, HashMap<String, Object> params, InAppMessageData inAppMessageData) {
                onInAppCustomAction(identifier, params, inAppMessageData);
            }
        });
    }

    private static void onInAppPresented(InAppMessageData inAppMessageData) {
        WritableMap objectToJs = Arguments.createMap();
        WritableMap data = Arguments.createMap();
        data.putString("campaignHash", inAppMessageData.getCampaignHash());
        data.putString("variantIdentifier", inAppMessageData.getVariantId());
        data.putMap("additionalParameters", MapUtil.toWritableMap(inAppMessageData.getAdditionalParameters()));
        objectToJs.putMap("data", data);
        sendEventToJs(IN_APP_MESSAGE_PRESENTED_LISTENER_VALUE, objectToJs, reactApplicationContext);
    }

    private static void onInAppHidden(InAppMessageData inAppMessageData) {
        WritableMap objectToJs = Arguments.createMap();
        WritableMap data = Arguments.createMap();
        data.putString("campaignHash", inAppMessageData.getCampaignHash());
        data.putString("variantIdentifier", inAppMessageData.getVariantId());
        data.putMap("additionalParameters", MapUtil.toWritableMap(inAppMessageData.getAdditionalParameters()));
        objectToJs.putMap("data", data);
        sendEventToJs(IN_APP_MESSAGE_HIDDEN_LISTENER_VALUE, objectToJs, reactApplicationContext);
    }

    private static void onInAppMessageOpenUrl(InAppMessageData inAppMessageData) {
        WritableMap objectToJs = Arguments.createMap();
        WritableMap data = Arguments.createMap();
        data.putString("campaignHash", inAppMessageData.getCampaignHash());
        data.putString("variantIdentifier", inAppMessageData.getVariantId());
        data.putMap("additionalParameters", MapUtil.toWritableMap(inAppMessageData.getAdditionalParameters()));
        objectToJs.putMap("data", data);
        objectToJs.putString("url", inAppMessageData.getUrl());
        sendEventToJs(IN_APP_MESSAGE_URL_ACTION_LISTENER_VALUE, objectToJs, reactApplicationContext);
    }

    private static void onInAppMessageDeepLink(InAppMessageData inAppMessageData) {
        WritableMap objectToJs = Arguments.createMap();
        WritableMap data = Arguments.createMap();
        data.putString("campaignHash", inAppMessageData.getCampaignHash());
        data.putString("variantIdentifier", inAppMessageData.getVariantId());
        data.putMap("additionalParameters", MapUtil.toWritableMap(inAppMessageData.getAdditionalParameters()));
        objectToJs.putMap("data", data);
        objectToJs.putString("deepLink", inAppMessageData.getDeepLink());
        sendEventToJs(IN_APP_MESSAGE_DEEPLINK_ACTION_LISTENER_VALUE, objectToJs, reactApplicationContext);
    }

    private static void onInAppCustomAction(String identifier, HashMap<String, Object> params, InAppMessageData inAppMessageData) {
        WritableMap objectToJs = Arguments.createMap();
        WritableMap data = Arguments.createMap();
        data.putString("campaignHash", inAppMessageData.getCampaignHash());
        data.putString("variantIdentifier", inAppMessageData.getVariantId());
        data.putMap("additionalParameters", MapUtil.toWritableMap(inAppMessageData.getAdditionalParameters()));
        objectToJs.putMap("data", objectToJs);
        objectToJs.putString("name", identifier);
        objectToJs.putMap("parameters", MapUtil.toWritableMap(params));
        sendEventToJs(IN_APP_MESSAGE_CUSTOM_ACTION_LISTENER_VALUE, objectToJs, reactApplicationContext);
    }

    private String readableMapToJson(ReadableMap map) {
        String json;
        try {
            JSONObject jsonObject = new JSONObject(map.toString());
            json = jsonObject.get("NativeMap").toString();
        } catch (JSONException e) {
            json = null;
        }

        return json;
    }
}
