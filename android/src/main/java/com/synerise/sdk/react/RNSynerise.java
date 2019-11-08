package com.synerise.sdk.react;

import android.app.Application;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class RNSynerise extends ReactContextBaseJavaModule {

  private final ReactApplicationContext reactContext;
  private RNSyneriseInitializer initializer;
  private Application app;

  public RNSynerise(ReactApplicationContext reactContext, Application app) {
    super(reactContext);
     this.reactContext = reactContext;
     this.app = app;
  }

  @Override
  public String getName() {
    return "RNSynerise";
  }

  @ReactMethod
  public void createInitializer() {
    if (initializer == null) {
      initializer = new RNSyneriseInitializer();
    }
  }

  @ReactMethod
  public void withClientApiKey(@NonNull String clientApiKey) {
    initializer.clientApiKey = clientApiKey;
  }

  @ReactMethod
  public void withBaseUrl(String url) {
    initializer.baseUrl = url;
  }

  @ReactMethod
  public void withDebugModeEnabled(boolean debugModeEnabled) {
    initializer.isDebugModeEnabled = debugModeEnabled;
  }

  @ReactMethod
  public void withCrashHandlingEnabled(boolean crashHandlingEnabled) {
    initializer.isCrashHandlingEnabled = crashHandlingEnabled;
  }

  @ReactMethod
  public void initialize() {
    if (initializer != null) {
      initializer.initialize(app);
    }
  }
}