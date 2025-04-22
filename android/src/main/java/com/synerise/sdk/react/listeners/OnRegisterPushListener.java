package com.synerise.sdk.react.listeners;

import com.synerise.sdk.react.RNSyneriseNotifications;

public interface OnRegisterPushListener {

    OnRegisterPushListener NULL = new OnRegisterPushListener() {

        @Override
        public void onRegisterPushRequired() {
            RNSyneriseNotifications.sendRegisterForPushRequiredInfo();
        }
    };

    void onRegisterPushRequired();
}
