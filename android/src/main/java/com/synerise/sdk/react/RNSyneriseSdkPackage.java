package com.synerise.sdk.react;

import android.app.Application;

import java.util.Collections;
import java.util.List;
import java.util.ArrayList;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.facebook.react.bridge.JavaScriptModule;

public class RNSyneriseSdkPackage implements ReactPackage {

    private Application app;

    public RNSyneriseSdkPackage(Application app) {
        this.app = app;
    }

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
      List<NativeModule> modules = new ArrayList<NativeModule>();
      modules.add(new RNSynerise(reactContext, app));
      modules.add(new RNClient(reactContext));
      modules.add(new RNTracker(reactContext));
      modules.add(new RNSettings(reactContext));
      return modules;
    }

    // Deprecated from RN 0.47
    public List<Class<? extends JavaScriptModule>> createJSModules() {
      return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
      return Collections.emptyList();
    }
}