package com.synerise.sdk.react.listeners;

import com.synerise.sdk.react.RNNotifications;

public interface OnRegisterPushListener {

    OnRegisterPushListener NULL = new OnRegisterPushListener() {

        @Override
        public void onRegisterPushRequired() {
            RNNotifications.sendRegisterForPushRequiredInfo();
        }
    };

    void onRegisterPushRequired();
}
