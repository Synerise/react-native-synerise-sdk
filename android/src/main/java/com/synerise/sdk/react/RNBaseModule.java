package com.synerise.sdk.react;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.synerise.sdk.error.ApiError;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.Iterator;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

public class RNBaseModule extends ReactContextBaseJavaModule {

    private static final String CODE = "code";
    private static final String MESSAGE = "message";

    public RNBaseModule(ReactApplicationContext reactApplicationContext) {
        super(reactApplicationContext);
    }

    public void executeSuccessCallbackResponse(Callback callback, Object data, Object error) {
        callback.invoke(true, data, error);
    }

    public void executeFailureCallbackResponse(Callback callback, Object data, ApiError apiError) {
        WritableMap errorMap = apiErrorToJsError(apiError);

        callback.invoke(false, data, errorMap);
    }

    @Nonnull
    @Override
    public String getName() {
        return "RNBaseModule";
    }

    protected WritableMap convertJsonToMap(JSONObject jsonObject) throws JSONException {
        WritableMap map = Arguments.createMap();
        Iterator<String> iterator = jsonObject.keys();
        while (iterator.hasNext()) {
            String key = iterator.next();
            Object value = jsonObject.get(key);
            if (value instanceof JSONObject) {
                map.putMap(key, convertJsonToMap((JSONObject) value));
            } else if (value instanceof JSONArray) {
                map.putArray(key, convertJsonToArray((JSONArray) value));
            } else if (value instanceof  Boolean) {
                map.putBoolean(key, (Boolean) value);
            } else if (value instanceof  Integer) {
                map.putInt(key, (Integer) value);
            } else if (value instanceof  Double) {
                map.putDouble(key, (Double) value);
            } else if (value instanceof String)  {
                map.putString(key, (String) value);
            } else {
                map.putString(key, value.toString());
            }
        }
        return map;
    }

    protected WritableArray convertJsonToArray(JSONArray jsonArray) throws JSONException {
        WritableArray array = Arguments.createArray();

        for (int i = 0; i < jsonArray.length(); i++) {
            Object value = jsonArray.get(i);
            if (value instanceof JSONObject) {
                array.pushMap(convertJsonToMap((JSONObject) value));
            } else if (value instanceof  JSONArray) {
                array.pushArray(convertJsonToArray((JSONArray) value));
            } else if (value instanceof  Boolean) {
                array.pushBoolean((Boolean) value);
            } else if (value instanceof  Integer) {
                array.pushInt((Integer) value);
            } else if (value instanceof  Double) {
                array.pushDouble((Double) value);
            } else if (value instanceof String)  {
                array.pushString((String) value);
            } else {
                array.pushString(value.toString());
            }
        }
        return array;
    }

    protected static void sendEventToJs(String eventName, @Nullable WritableMap data, ReactApplicationContext context) {
        context
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, data);
    }

    protected static WritableMap apiErrorToJsError(ApiError apiError) {
        WritableMap errorMap = Arguments.createMap();

        errorMap.putInt(CODE, apiError.getErrorBody() != null ? apiError.getErrorBody().getStatus() : apiError.getHttpCode());
        errorMap.putString(MESSAGE, apiError.getErrorBody() != null ? apiError.getErrorBody().getMessage() : apiError.getHttpErrorCategory().name());

        return errorMap;
    }
}
