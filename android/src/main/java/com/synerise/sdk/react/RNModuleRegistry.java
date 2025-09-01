package com.synerise.sdk.react;

import com.facebook.react.bridge.NativeModule;

import java.util.HashMap;
import java.util.Map;

public class RNModuleRegistry {
    private static final Map<Class<?>, NativeModule> modules = new HashMap<>();

    public static void register(NativeModule module) {
        modules.put(module.getClass(), module);
    }

    @SuppressWarnings("unchecked")
    public static <T extends NativeModule> T get(Class<T> clazz) {
        return (T) modules.get(clazz);
    }
}
