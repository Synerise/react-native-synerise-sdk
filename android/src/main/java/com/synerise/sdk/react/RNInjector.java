package com.synerise.sdk.react;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.google.gson.Gson;
import com.synerise.sdk.core.listeners.DataActionListener;
import com.synerise.sdk.error.ApiError;
import com.synerise.sdk.injector.Injector;
import com.synerise.sdk.injector.callback.InjectorSource;
import com.synerise.sdk.injector.callback.OnBannerListener;
import com.synerise.sdk.injector.callback.OnInjectorListener;
import com.synerise.sdk.injector.callback.OnWalkthroughListener;
import com.synerise.sdk.injector.net.model.push.banner.TemplateBanner;
import com.synerise.sdk.injector.ui.handler.InjectorActionHandler;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

public class RNInjector extends RNBaseModule {

    private static ReactApplicationContext reactApplicationContext;
    private static String URL = "url";
    private static String OPEN_URL_KEY = "URL_ACTION_LISTENER_KEY";
    private static String DEEP_LINK_KEY = "DEEPLINK_ACTION_LISTENER_KEY";
    private static String OPEN_URL_VALUE = "openUrl";
    private static String DEEP_LINK = "deepLink";
    private static String DEEP_LINK_VALUE = "deepLink";
    private static String BANNER_PRESENTED_KEY = "BANNER_PRESENTED_LISTENER_KEY";
    private static String BANNER_HIDDEN_KEY = "BANNER_HIDDEN_LISTENER_KEY";
    private static String BANNER_PRESENTED_VALUE = "bannerPresented";
    private static String BANNER_HIDDEN_VALUE = "bannerClosed";
    private static String WALKTHROUGH_LOADING_ERROR_KEY = "WALKTHROUGH_LOADING_ERROR_LISTENER_KEY";
    private static String WALKTHROUGH_LOADING_ERROR_VALUE = "walkthroughLoadingError";
    private static String WALKTHROUGH_LOADED_KEY = "WALKTHROUGH_LOADED_LISTENER_KEY";
    private static String WALKTHROUGH_LOADED_VALUE = "walkthroughLoaded";
    private static String WALKTHROUGH_PRESENTED_KEY = "WALKTHROUGH_PRESENTED_LISTENER_KEY";
    private static String WALKTHROUGH_PRESENTED_VALUE = "walkthroughPresented";
    private static String WALKTHROUGH_HIDDEN_KEY = "WALKTHROUGH_HIDDEN_LISTENER_KEY";
    private static String WALKTHROUGH_HIDDEN_VALUE = "walkthroughHidden";
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
    public void setShouldBannerPresentFlag(Boolean shouldBannerPresentFlag) {
        this.shouldBannerPresentFlag = shouldBannerPresentFlag;
    }

    @ReactMethod
    public void fetchBanners(Callback callback) {
        Injector.fetchBanners(new DataActionListener<List<TemplateBanner>>() {
            @Override
            public void onDataAction(List<TemplateBanner> templateBanners) {
                WritableArray array = Arguments.createArray();
                for (TemplateBanner banner : templateBanners) {
                    try {
                        String jsonObject = gson.toJson(banner);
                        WritableMap objectMap = convertJsonToMap(new JSONObject(jsonObject));
                        array.pushMap(objectMap);
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                }
                executeSuccessCallbackResponse(callback, array, null);
            }
        }, new DataActionListener<ApiError>() {
            @Override
            public void onDataAction(ApiError apiError) {
                executeFailureCallbackResponse(callback, null, apiError);
            }
        });
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public WritableArray getBanners() {
        List<TemplateBanner> bannerList = Injector.getBanners();
        WritableArray array = Arguments.createArray();
        for (TemplateBanner banner : bannerList) {
            try {
                String jsonObject = gson.toJson(banner);
                WritableMap objectMap = convertJsonToMap(new JSONObject(jsonObject));
                array.pushMap(objectMap);
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }
        return array;
    }

    @ReactMethod
    public void showBanner(ReadableMap bannerObject, Boolean markPresented) {
        String bannerJson = readableMapToJson(bannerObject);
        TemplateBanner banner = TemplateBanner.fromJson(bannerJson, new Gson());
        Injector.showBanner(banner, markPresented);
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
        return constants;
    }

    @Nonnull
    @Override
    public String getName() {
        return "RNInjector";
    }

    protected static void initializeInjector() {
        initializeActionInjectorListener();
        initializeBannerListener();
        initializeWalkthroughListener();
    }

    private static void onActionOpenUrl(String url) {
        WritableMap data = Arguments.createMap();
        data.putString(URL, url);
        sendEventToJs(OPEN_URL_VALUE, data, reactApplicationContext);
    }

    private static void onActionDeepLink(String deepLink) {
        WritableMap data = Arguments.createMap();
        data.putString(DEEP_LINK, deepLink);
        sendEventToJs(DEEP_LINK_VALUE, data, reactApplicationContext);
    }

    private static void initializeActionInjectorListener() {
        InjectorActionHandler.setOnInjectorListener(new OnInjectorListener() {
            @Override
            public boolean onOpenUrl(InjectorSource injectorSource, String url) {
                onActionOpenUrl(url);
                return injectorSource != InjectorSource.WALKTHROUGH;
            }

            @Override
            public boolean onDeepLink(InjectorSource injectorSource, String deepLink) {
                onActionDeepLink(deepLink);
                return injectorSource != InjectorSource.WALKTHROUGH;
            }
        });
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
            public void onLoaded() {
                super.onLoaded();
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
