package com.synerise.sdk.react;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableType;
import com.synerise.sdk.event.Tracker;
import com.synerise.sdk.event.TrackerParams;
import com.synerise.sdk.event.model.CustomEvent;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import javax.annotation.Nonnull;

public class RNTracker extends RNBaseModule {

    public RNTracker(ReactApplicationContext reactApplicationContext) {
        super(reactApplicationContext);
    }

    @Nonnull
    @Override
    public String getName() {
        return "RNTracker";
    }

    //setCustomIdentifier(identifier: String)
    @ReactMethod
    public void setCustomIdentifier(String identifier) {
        Tracker.setCustomIdentifier(identifier);
    }

    //setCustomEmail(email: String)
    @ReactMethod
    public void setCustomEmail(String email) {
        Tracker.setCustomEmail(email);
    }

    //send(event: Event)
    @ReactMethod
    public void send(ReadableMap map) {
        String type = map.getString("type");
        String action = null;
        if (map.getType("action") != ReadableType.Null) {
            action = map.getString("action");
        }
        String label = map.getString("label");
        TrackerParams params = trackerParamsMapper(map.getMap("parameters").toHashMap());
        CustomEvent event = new CustomEvent(type, action, label, params);
        Tracker.send(event);
    }

    //flushEvents(onSuccess: () => void)
    @ReactMethod
    public void flushEvents(Callback callback) {
        Tracker.flush();
        executeSuccessCallbackResponse(callback, null, null);
    }

    private TrackerParams trackerParamsMapper(HashMap<String, Object> map) {
        if (map != null) {
            TrackerParams.Builder params = new TrackerParams.Builder();
            Iterator it = map.entrySet().iterator();
            while (it.hasNext()) {
                Map.Entry pair = (Map.Entry) it.next();
                params.add(pair.getKey().toString(), pair.getValue());
                it.remove(); // avoids a ConcurrentModificationException
            }

            return params.build();
        } else {
            return null;
        }
    }
}
