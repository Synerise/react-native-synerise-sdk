package com.synerise.sdk.react;

import android.os.Handler;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Dynamic;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.UIManagerModule;
import com.synerise.sdk.core.Synerise;
import com.synerise.sdk.core.utils.SystemUtils;
import com.synerise.sdk.injector.Injector;
import com.synerise.sdk.injector.callback.OnInjectorListener;
import com.synerise.sdk.injector.inapp.inline.InlineInAppMessageData;
import com.synerise.sdk.injector.callback.SyneriseSource;
import com.synerise.sdk.injector.ui.handler.InjectorActionHandler;
import com.synerise.sdk.react.inapp.inline.RNInlineInAppContainer;
import com.synerise.sdk.react.utils.MapUtil;
import java.util.HashMap;
import java.util.Map;
import javax.annotation.Nonnull;
import javax.annotation.Nullable;

public class RNInjector extends RNBaseModule {

    private static ReactApplicationContext reactApplicationContext;
    private static RNInAppManager inAppManager;
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
    private static final String IN_APP_MESSAGE_CUSTOM_METHOD_LISTENER_KEY = "IN_APP_MESSAGE_CUSTOM_METHOD_LISTENER_KEY";
    private static final String IN_APP_MESSAGE_CUSTOM_METHOD_LISTENER_VALUE = "inAppCustomMethod";
    private static final String INLINE_IN_APP_MESSAGE_URL_ACTION_LISTENER_KEY = "INLINE_IN_APP_MESSAGE_URL_ACTION_LISTENER_KEY";
    private static final String INLINE_IN_APP_MESSAGE_DEEPLINK_ACTION_LISTENER_KEY = "INLINE_IN_APP_MESSAGE_DEEPLINK_ACTION_LISTENER_KEY";
    private static final String INLINE_IN_APP_MESSAGE_CUSTOM_ACTION_LISTENER_KEY = "INLINE_IN_APP_MESSAGE_CUSTOM_ACTION_LISTENER_KEY";
    private static final String INLINE_IN_APP_MESSAGE_CUSTOM_METHOD_LISTENER_KEY = "INLINE_IN_APP_MESSAGE_CUSTOM_METHOD_LISTENER_KEY";
    private static final String INLINE_IN_APP_MESSAGE_AVAILABLE_LISTENER_KEY = "INLINE_IN_APP_MESSAGE_AVAILABLE_LISTENER_KEY";
    private static final String INLINE_IN_APP_MESSAGE_URL_ACTION_LISTENER_VALUE = "inlineInAppUrlAction";
    private static final String INLINE_IN_APP_MESSAGE_DEEPLINK_ACTION_LISTENER_VALUE = "inlineInAppDeepLinkAction";
    private static final String INLINE_IN_APP_MESSAGE_CUSTOM_ACTION_LISTENER_VALUE = "inlineInAppCustomAction";
    private static final String INLINE_IN_APP_MESSAGE_CUSTOM_METHOD_LISTENER_VALUE = "inlineInAppCustomMethod";
    private static final String INLINE_IN_APP_MESSAGE_AVAILABLE_LISTENER_VALUE = "inlineInAppAvailable";

    public RNInjector(ReactApplicationContext reactApplicationContext) {
        super(reactApplicationContext);
        this.reactApplicationContext = reactApplicationContext;
        inAppManager = new RNInAppManager(reactApplicationContext);
    }

    @ReactMethod
    public void closeInAppMessage(String campaignHash) {
        inAppManager.closeInAppMessage(campaignHash);
    }

    @ReactMethod
    public void handleOpenUrlBySDK(String url) {
        SystemUtils.openURL(Synerise.getApplicationContext(), url);
    }

    @ReactMethod
    public void handleDeepLinkBySDK(String deepLink) {
        SystemUtils.openDeepLink(Synerise.getApplicationContext(), deepLink);
    }

    @ReactMethod
    public void resolveInlineCustomMethod(String callId, boolean success, Dynamic result, String error) {
        inAppManager.resolveInlineCustomMethod(callId, success, result, error);
    }

    @ReactMethod
    public void resolveInAppCustomMethod(String callId, boolean success, Dynamic result, String error) {
        inAppManager.resolveInAppCustomMethod(callId, success, result, error);
    }

    @ReactMethod
    public void isInlineInAppRendered(int viewTag, Callback callback) {
        UIManagerModule uiManager = getReactApplicationContext().getNativeModule(UIManagerModule.class);
        if (uiManager == null) {
            executeSuccessCallbackResponse(callback, false, null);
            return;
        }

        uiManager.addUIBlock(nativeViewHierarchyManager -> {
            try {
                android.view.View view = nativeViewHierarchyManager.resolveView(viewTag);
                if (view instanceof RNInlineInAppContainer) {
                    boolean isRendered = ((RNInlineInAppContainer) view).getInlineInAppView().isRendered();
                    executeSuccessCallbackResponse(callback, isRendered, null);
                } else {
                    executeSuccessCallbackResponse(callback, false, null);
                }
            } catch (Exception exception) {
                executeSuccessCallbackResponse(callback, false, null);
            }
        });
    }

    /** Resolves null when the view is not mounted or holds no rendered campaign. */
    @ReactMethod
    public void getInlineInAppData(int viewTag, Callback callback) {
        UIManagerModule uiManager = getReactApplicationContext().getNativeModule(UIManagerModule.class);
        if (uiManager == null) {
            executeSuccessCallbackResponse(callback, null, null);
            return;
        }

        uiManager.addUIBlock(nativeViewHierarchyManager -> {
            try {
                android.view.View view = nativeViewHierarchyManager.resolveView(viewTag);
                if (view instanceof RNInlineInAppContainer) {
                    InlineInAppMessageData data = ((RNInlineInAppContainer) view).getInlineInAppView().getData();
                    executeSuccessCallbackResponse(callback, inlineDataToWritableMap(data), null);
                } else {
                    executeSuccessCallbackResponse(callback, null, null);
                }
            } catch (Exception exception) {
                executeSuccessCallbackResponse(callback, null, null);
            }
        });
    }

    private WritableMap inlineDataToWritableMap(InlineInAppMessageData data) {
        if (data == null) {
            return null;
        }

        WritableMap dataMap = Arguments.createMap();
        dataMap.putString("campaignHash", data.getCampaignHash());
        dataMap.putString("variantIdentifier", data.getVariantId());
        dataMap.putString("placementKey", data.getPlacementKey());
        dataMap.putMap("additionalParameters", data.getAdditionalParameters() != null
                ? MapUtil.objectMapToWritableMap(data.getAdditionalParameters())
                : Arguments.createMap());
        dataMap.putBoolean("isTest", data.isTest());

        return dataMap;
    }


    @ReactMethod
    public void setInAppContext(ReadableMap context) {
        Injector.setInAppContext(new HashMap<>(MapUtil.toMap(context)));
    }

    @ReactMethod
    public void notifyInAppContextChange() {
        Injector.notifyInAppContextChange();
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
        constants.put(IN_APP_MESSAGE_CUSTOM_METHOD_LISTENER_KEY, IN_APP_MESSAGE_CUSTOM_METHOD_LISTENER_VALUE);
        constants.put(INLINE_IN_APP_MESSAGE_URL_ACTION_LISTENER_KEY, INLINE_IN_APP_MESSAGE_URL_ACTION_LISTENER_VALUE);
        constants.put(INLINE_IN_APP_MESSAGE_DEEPLINK_ACTION_LISTENER_KEY, INLINE_IN_APP_MESSAGE_DEEPLINK_ACTION_LISTENER_VALUE);
        constants.put(INLINE_IN_APP_MESSAGE_CUSTOM_ACTION_LISTENER_KEY, INLINE_IN_APP_MESSAGE_CUSTOM_ACTION_LISTENER_VALUE);
        constants.put(INLINE_IN_APP_MESSAGE_CUSTOM_METHOD_LISTENER_KEY, INLINE_IN_APP_MESSAGE_CUSTOM_METHOD_LISTENER_VALUE);
        constants.put(INLINE_IN_APP_MESSAGE_AVAILABLE_LISTENER_KEY, INLINE_IN_APP_MESSAGE_AVAILABLE_LISTENER_VALUE);
        return constants;
    }

    @Nonnull
    @Override
    public String getName() {
        return "RNInjector";
    }

    protected static void initializeInjector() {
        inAppManager.initializeInAppListener();
        inAppManager.initializeInlineInAppListener();
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
}
