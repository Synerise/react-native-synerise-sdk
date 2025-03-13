package com.synerise.sdk.react;

import android.os.Handler;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.google.gson.Gson;
import com.synerise.sdk.core.Synerise;
import com.synerise.sdk.core.listeners.DataActionListener;
import com.synerise.sdk.core.utils.SystemUtils;
import com.synerise.sdk.error.ApiError;
import com.synerise.sdk.injector.Injector;
import com.synerise.sdk.injector.callback.InjectorSource;
import com.synerise.sdk.injector.callback.OnBannerListener;
import com.synerise.sdk.injector.callback.OnInjectorListener;
import com.synerise.sdk.injector.callback.OnWalkthroughListener;
import com.synerise.sdk.injector.inapp.InAppMessageData;
import com.synerise.sdk.injector.inapp.OnInAppListener;
import com.synerise.sdk.injector.net.model.inject.walkthrough.WalkthroughResponse;
import com.synerise.sdk.injector.net.model.push.banner.TemplateBanner;
import com.synerise.sdk.injector.ui.handler.InjectorActionHandler;
import com.synerise.sdk.react.utils.MapUtil;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.List;
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
    private static final String BANNER_PRESENTED_KEY = "BANNER_PRESENTED_LISTENER_KEY";
    private static final String BANNER_HIDDEN_KEY = "BANNER_HIDDEN_LISTENER_KEY";
    private static final String BANNER_PRESENTED_VALUE = "bannerPresented";
    private static final String BANNER_HIDDEN_VALUE = "bannerClosed";
    private static final String WALKTHROUGH_LOADING_ERROR_KEY = "WALKTHROUGH_LOADING_ERROR_LISTENER_KEY";
    private static final String WALKTHROUGH_LOADING_ERROR_VALUE = "walkthroughLoadingError";
    private static final String WALKTHROUGH_LOADED_KEY = "WALKTHROUGH_LOADED_LISTENER_KEY";
    private static final String WALKTHROUGH_LOADED_VALUE = "walkthroughLoaded";
    private static final String WALKTHROUGH_PRESENTED_KEY = "WALKTHROUGH_PRESENTED_LISTENER_KEY";
    private static final String WALKTHROUGH_PRESENTED_VALUE = "walkthroughPresented";
    private static final String WALKTHROUGH_HIDDEN_KEY = "WALKTHROUGH_HIDDEN_LISTENER_KEY";
    private static final String WALKTHROUGH_HIDDEN_VALUE = "walkthroughHidden";
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
    public void getWalkthrough() {
        Injector.getWalkthrough();
    }

    @ReactMethod
    public void showWalkthrough() {
        Injector.showWalkthrough();
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public boolean isWalkthroughLoaded() {
        return Injector.isWalkthroughLoaded();
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public boolean isLoadedWalkthroughUnique() {
        return Injector.isLoadedWalkthroughUnique();
    }

    @ReactMethod
    public void setBannerShouldPresentFlag(boolean flag) {
        shouldBannerPresentFlag = flag;
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
        constants.put(BANNER_HIDDEN_KEY, BANNER_HIDDEN_VALUE);
        constants.put(BANNER_PRESENTED_KEY, BANNER_PRESENTED_VALUE);
        constants.put(WALKTHROUGH_LOADING_ERROR_KEY, WALKTHROUGH_LOADING_ERROR_VALUE);
        constants.put(WALKTHROUGH_PRESENTED_KEY, WALKTHROUGH_PRESENTED_VALUE);
        constants.put(WALKTHROUGH_LOADED_KEY, WALKTHROUGH_LOADED_VALUE);
        constants.put(WALKTHROUGH_HIDDEN_KEY, WALKTHROUGH_HIDDEN_VALUE);
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
        initializeBannerListener();
        initializeWalkthroughListener();
    }

    protected static void initializeActionInjectorListener() {
        InjectorActionHandler.setOnInjectorListener(new OnInjectorListener() {
            @Override
            public boolean onOpenUrl(InjectorSource injectorSource, String url) {
                Handler handler = new android.os.Handler();
                handler.postDelayed(new Runnable() {
                    @Override
                    public void run() {
                        onActionOpenUrl(url, injectorSource.name());
                    }
                }, 300);

                return injectorSource != InjectorSource.WALKTHROUGH;
            }

            @Override
            public boolean onDeepLink(InjectorSource injectorSource, String deepLink) {
                Handler handler = new android.os.Handler();
                handler.postDelayed(new Runnable() {
                    @Override
                    public void run() {
                        onActionDeepLink(deepLink, injectorSource.name());
                    }
                }, 300);

                return injectorSource != InjectorSource.WALKTHROUGH;
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

    private static void initializeBannerListener() {
        Injector.setOnBannerListener(new OnBannerListener() {

            @Override
            public void onPresented() {
                super.onPresented();
                onBannerPresented();
            }

            @Override
            public boolean shouldPresent(TemplateBanner banner) {
                return shouldBannerPresentFlag;
            }

            @Override
            public void onClosed() {
                super.onClosed();
                onBannerClosed();
            }
        });
    }

    private static void onBannerPresented() {
        sendEventToJs(BANNER_PRESENTED_VALUE, null, reactApplicationContext);
    }

    private static void onBannerClosed() {
        sendEventToJs(BANNER_HIDDEN_VALUE, null, reactApplicationContext);
    }

    private static void initializeWalkthroughListener() {
        Injector.setOnWalkthroughListener(new OnWalkthroughListener() {
            @Override
            public void onLoadingError(ApiError apiError) {
                super.onLoadingError(apiError);
                onWalkthroughLoadingError(apiError);
            }

            @Override
            public void onLoaded(WalkthroughResponse response) {
                super.onLoaded(response);
                onWalkthroughLoaded();
            }

            @Override
            public void onPresented() {
                super.onPresented();
                onWalkthroughPresented();
            }

            @Override
            public void onClosed() {
                super.onClosed();
                onWalkthroughClosed();
            }
        });
    }

    private static void onWalkthroughLoadingError(ApiError apiError) {
        WritableMap error = apiErrorToJsError(apiError);
        sendEventToJs(WALKTHROUGH_LOADING_ERROR_VALUE, error, reactApplicationContext);
    }

    private static void onWalkthroughLoaded() {
        sendEventToJs(WALKTHROUGH_LOADED_VALUE, null, reactApplicationContext);
    }

    private static void onWalkthroughPresented() {
        sendEventToJs(WALKTHROUGH_PRESENTED_VALUE, null, reactApplicationContext);
    }

    private static void onWalkthroughClosed() {
        sendEventToJs(WALKTHROUGH_HIDDEN_VALUE, null, reactApplicationContext);
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
