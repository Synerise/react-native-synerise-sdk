package com.synerise.sdk.react;

import android.os.Bundle;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.synerise.sdk.client.Client;
import com.synerise.sdk.core.listeners.DataActionListener;
import com.synerise.sdk.core.listeners.OnRegisterForPushListener;
import com.synerise.sdk.core.net.IApiCall;
import com.synerise.sdk.core.types.exceptions.DecryptionException;
import com.synerise.sdk.error.ApiError;
import com.synerise.sdk.injector.Injector;
import com.synerise.sdk.react.listeners.OnRegisterPushListener;
import com.synerise.sdk.react.utils.MapUtil;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

import static com.synerise.sdk.injector.SynerisePushKeys.CONTENT;
import static com.synerise.sdk.injector.SynerisePushKeys.CONTENT_TYPE;
import static com.synerise.sdk.injector.SynerisePushKeys.ISSUER;
import static com.synerise.sdk.injector.SynerisePushKeys.MESSAGE_TYPE;

public class RNNotifications extends RNBaseModule {

    private static ReactApplicationContext reactApplicationContext;
    private static ArrayList<Map<String, String>> dataToSend = new ArrayList<>();
    private static ArrayList<String> tokensToSend = new ArrayList<>();
    private static OnRegisterPushListener pushListener = OnRegisterPushListener.NULL;
    protected static OnRegisterForPushListener registerNativeForPushListener;
    private static final String TOKEN_KEY = "token";
    private static final String PAYLOAD_KEY = "payload";
    private static final String REGISTRATION_TOKEN_LISTENER_KEY = "REGISTRATION_TOKEN_LISTENER_KEY";
    private static final String NOTIFICATION_LISTENER_KEY = "NOTIFICATION_LISTENER_KEY";
    private static final String REGISTRATION_REQUIRED_LISTENER_KEY = "REGISTRATION_REQUIRED_LISTENER_KEY";
    private static final String NOTIFICATION_LISTENER_VALUE = "SyneriseNotification";
    private static final String REGISTRATION_TOKEN_LISTENER_VALUE = "SyneriseFCMToken";
    private static final String REGISTRATION_REQUIRED_LISTENER_VALUE = "TokenRegistrationRequired";
    private IApiCall registerForNotificationCall;

    public RNNotifications(ReactApplicationContext reactApplicationContext) {
        super(reactApplicationContext);
        this.reactApplicationContext = reactApplicationContext;

        registerNativeForPushListener = new OnRegisterForPushListener() {
            @Override
            public void onRegisterForPushRequired() {
                pushListener.onRegisterPushRequired();
            }
        };
    }

    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put(REGISTRATION_REQUIRED_LISTENER_KEY, REGISTRATION_REQUIRED_LISTENER_VALUE);
        constants.put(REGISTRATION_TOKEN_LISTENER_KEY, REGISTRATION_TOKEN_LISTENER_VALUE);
        constants.put(NOTIFICATION_LISTENER_KEY, NOTIFICATION_LISTENER_VALUE);
        return constants;
    }

    @Nonnull
    @Override
    public String getName() {
        return "RNNotifications";
    }

    //handleNotification(payload: Object)
    @ReactMethod
    public void handleNotification(ReadableMap map) {
        Injector.handlePushPayload(MapUtil.toStringMap(map));
    }

    //isSynerisePush(payload: Object)
    @ReactMethod(isBlockingSynchronousMethod = true)
    public boolean isSyneriseNotification(ReadableMap map) {
        return Injector.isSynerisePush(MapUtil.toStringMap(map));
    }

    //isSilentCommand(payload: Object)
    @ReactMethod(isBlockingSynchronousMethod =  true)
    public boolean isSilentCommand(ReadableMap map) {
        return Injector.isSilentCommand(MapUtil.toStringMap(map));
    }

    //isSilentCommandSdk(payload: Object)
    @ReactMethod(isBlockingSynchronousMethod = true)
    public boolean isSilentSDKCommand(ReadableMap map) {
        return Injector.isSilentCommandSdk(MapUtil.toStringMap(map));
    }

    //isSyneriseSimplePush(payload: Object)
    @ReactMethod(isBlockingSynchronousMethod = true)
    public boolean isSyneriseSimplePush(ReadableMap map) {
        return Injector.isSyneriseSimplePush(MapUtil.toStringMap(map));
    }

    //isSyneriseBanner(payload: Object)
    @ReactMethod(isBlockingSynchronousMethod = true)
    public boolean isSyneriseBanner(ReadableMap map) {
        return Injector.isSyneriseBanner(MapUtil.toStringMap(map));
    }
    //isNotificationEncrypted(payload: object)
    @ReactMethod(isBlockingSynchronousMethod = true)
    public boolean isNotificationEncrypted(ReadableMap map) {
        return Injector.isPushEncrypted(MapUtil.toStringMap(map));
    }

    //decryptNotification(payload: object): object
    @ReactMethod(isBlockingSynchronousMethod = true)
    public WritableArray decryptNotification(ReadableMap map) {
        WritableArray notificationArrayForJs = Arguments.createArray();
        try {
            WritableMap payload = MapUtil.stringMapToWritableMap(Injector.decryptPushPayload(MapUtil.toStringMap(map)));
            notificationArrayForJs.pushBoolean(true);
            notificationArrayForJs.pushMap(payload);
        } catch (DecryptionException e) {
            notificationArrayForJs.pushBoolean(false);
            notificationArrayForJs.pushNull();
        }

        return notificationArrayForJs;
    }

    //registerForNotifications(token: String, onSuccess: () => void, onError: (error: Error) => void)
    @ReactMethod
    public void registerForNotifications(String registrationToken, boolean mobileAgreement, Callback callback) {
        registerForNotificationCall = Client.registerForPush(registrationToken, mobileAgreement);
        registerForNotificationCall.execute(() -> executeSuccessCallbackResponse(callback, null, null), new DataActionListener<ApiError>() {
            @Override
            public void onDataAction(ApiError apiError) {
                executeFailureCallbackResponse(callback, null, apiError);
            }
        });
    }

    public static void onNotificationReceive(Map<String, String> data) {
        dataToSend.add(data);
        flushNotifications();
    }

    public static void onNotificationReceive(Bundle bundle) {
        Map<String, String> data = new HashMap<>();
        if (bundle != null) {
            if (bundle.get(ISSUER.getKey()) != null) {
                data.put(ISSUER.getKey(), (String) bundle.get(ISSUER.getKey()));
            }
            if (bundle.get(CONTENT_TYPE.getKey()) != null) {
                data.put(CONTENT_TYPE.getKey(), (String) bundle.get(CONTENT_TYPE.getKey()));
            }
            if (bundle.get(MESSAGE_TYPE.getKey()) != null) {
                data.put(MESSAGE_TYPE.getKey(), (String) bundle.get(MESSAGE_TYPE.getKey()));
            }
            if (bundle.get(CONTENT.getKey()) != null) {
                data.put(CONTENT.getKey(), (String) bundle.get(CONTENT.getKey()));
            }
        }

        if (!data.isEmpty()) {
            onNotificationReceive(data);
        }
    }

    public static void setRegistrationToken(String registrationToken) {
        if (RNSyneriseInitializer.isInitialized) {
            sendTokenToJS(registrationToken);
        } else {
            tokensToSend.add(registrationToken);
        }
    }

    public static void setPushListener(OnRegisterPushListener listener) {
        pushListener = listener;
    }

    public static void sendRegisterForPushRequiredInfo() {
        if (RNSyneriseInitializer.isInitialized) {
            WritableMap data = Arguments.createMap();
            sendEventToJs(REGISTRATION_REQUIRED_LISTENER_VALUE, data, reactApplicationContext);
        }
    }

    protected static void initializeNotifications() {
        sendHeldNotifications();
        flushToken();
    }

    protected static OnRegisterForPushListener getNativePushListener() {
        return registerNativeForPushListener;
    }

    private static void sendHeldNotifications() {
        Iterator<Map<String, String>> i = dataToSend.iterator();
        while (i.hasNext()) {
            Map<String, String> payload = i.next();
            sendNotificationsToJS(payload);
            i.remove();
        }
    }

    private static void sendTokenToJS(String registrationToken) {
            WritableMap tokenToSend = Arguments.createMap();
            tokenToSend.putString(TOKEN_KEY, registrationToken);
            sendEventToJs(REGISTRATION_TOKEN_LISTENER_VALUE, tokenToSend, reactApplicationContext);
    }

    private static void sendNotificationsToJS(Map<String, String> data) {
        HashMap<String, String> dataAsHashmap = new HashMap<>(data);
        WritableMap pushData = Arguments.createMap();
        pushData.putMap(PAYLOAD_KEY, MapUtil.stringMapToWritableMap(dataAsHashmap));
        sendEventToJs(NOTIFICATION_LISTENER_VALUE, pushData, reactApplicationContext);
    }

    private static void flushNotifications() {
        if (RNSyneriseInitializer.isInitialized) {
            sendHeldNotifications();
        }
    }

    private static void flushToken() {
        if (!tokensToSend.isEmpty()) {
            String token = tokensToSend.get(tokensToSend.size() - 1);
            sendTokenToJS(token);
        }
    }
}
