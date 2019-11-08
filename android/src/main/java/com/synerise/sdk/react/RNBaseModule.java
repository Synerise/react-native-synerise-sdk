package com.synerise.sdk.react;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.WritableMap;
import com.synerise.sdk.error.ApiError;

import javax.annotation.Nonnull;

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
        WritableMap errorMap = Arguments.createMap();
        errorMap.putInt(CODE, apiError.getErrorBody().getStatus());
        errorMap.putString(MESSAGE, apiError.getErrorBody().getMessage());

        callback.invoke(false, data, errorMap);
    }

    @Nonnull
    @Override
    public String getName() {
        return "RNBaseModule";
    }
}
