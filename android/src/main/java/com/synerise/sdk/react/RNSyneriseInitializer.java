package com.synerise.sdk.react;

import android.app.Application;
import android.content.Context;
import android.content.pm.ApplicationInfo;
import android.util.Log;

import com.synerise.sdk.core.Synerise;
import com.synerise.sdk.core.types.enums.HostApplicationType;

public class RNSyneriseInitializer {

    public String apiKey;
    public String baseUrl = null;
    public String requestValidationSalt = null;
    public Boolean isDebugModeEnabled;
    public Boolean isCrashHandlingEnabled;
    public Boolean initialDoNotTrack;
    public static volatile boolean isInitialized = false;

    public static final String SDK_PLUGIN_VERSION = "1.3.1";

    public void initialize(Application app) {
        if (isInitialized == false) {
            prepareDefaultSettings();
            RNInjector.initializeActionInjectorListener();
            Synerise.Builder builder = Synerise.Builder.with(app, apiKey, getApplicationName(app))
                    .baseUrl(baseUrl)
                    .syneriseDebugMode(isDebugModeEnabled)
                    .crashHandlingEnabled(isCrashHandlingEnabled)
                    .pushRegistrationRequired(RNSyneriseNotifications.getNativePushListener())
                    .setRequestValidationSalt(requestValidationSalt)
                    .hostApplicationType(HostApplicationType.REACT_NATIVE)
                    .hostApplicationSDKPluginVersion(SDK_PLUGIN_VERSION);

            if (initialDoNotTrack != null) {
                builder.initialDoNotTrack(initialDoNotTrack);
            }
            builder.build();
//            Client.registerForPushCallback(RNNotifications.getNativePushListener());
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
        RNSyneriseNotifications.initializeNotifications();
        RNInjector.initializeInjector();
        RNClient.initializeClient();
    }
}
