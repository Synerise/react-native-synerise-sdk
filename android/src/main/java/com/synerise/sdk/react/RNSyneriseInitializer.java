package com.synerise.sdk.react;

import android.app.Application;
import android.content.Context;
import android.content.pm.ApplicationInfo;
import com.synerise.sdk.core.Synerise;

public class RNSyneriseInitializer {

    public String clientApiKey;
    public String baseUrl;
    public Boolean isDebugModeEnabled;
    public Boolean isCrashHandlingEnabled;

    public void initialize(Application app) {
        prepareDefaultSettings();

        Synerise.Builder.with(app, clientApiKey, getApplicationName(app))
                .baseUrl(null)
                .syneriseDebugMode(isDebugModeEnabled)
                .crashHandlingEnabled(isCrashHandlingEnabled)
                .build();
    }

    private void prepareDefaultSettings() {
        Synerise.settings.notifications.enabled = false;
        Synerise.settings.tracker.autoTracking.enabled = false;
        Synerise.settings.tracker.tracking.enabled = true;
    }

    private static String getApplicationName(Context context) {
        ApplicationInfo applicationInfo = context.getApplicationInfo();
        int stringId = applicationInfo.labelRes;
        return stringId == 0 ? applicationInfo.nonLocalizedLabel.toString() : context.getString(stringId);
    }
}
