package com.synerise.sdk.react;

import android.app.Application;
import android.content.Context;
import android.content.pm.ApplicationInfo;
import com.synerise.sdk.core.Synerise;
import com.synerise.sdk.core.types.enums.HostApplicationType;

public class RNSyneriseInitializer {

    public String clientApiKey;
    public String baseUrl = null;
    public Boolean isDebugModeEnabled;
    public Boolean isCrashHandlingEnabled;
    public static volatile boolean isInitialized = false;

    public void initialize(Application app) {
        if (isInitialized == false) {
            prepareDefaultSettings();

            Synerise.Builder.with(app, clientApiKey, getApplicationName(app))
                    .baseUrl(baseUrl)
                    .syneriseDebugMode(isDebugModeEnabled)
                    .crashHandlingEnabled(isCrashHandlingEnabled)
                    .pushRegistrationRequired(RNNotifications.getNativePushListener())
                    .hostApplicationType(HostApplicationType.REACT_NATIVE)
                    .build();

            isInitialized = true;
        }
    }

    private void prepareDefaultSettings() {
        Synerise.settings.tracker.autoTracking.enabled = false;
    }

    private static String getApplicationName(Context context) {
        ApplicationInfo applicationInfo = context.getApplicationInfo();
        int stringId = applicationInfo.labelRes;
        return stringId == 0 ? applicationInfo.nonLocalizedLabel.toString() : context.getString(stringId);
    }

    protected void notifyModules() {
        RNNotifications.initializeNotifications();
        RNInjector.initializeInjector();
        RNClient.initializeClient();
    }
}
