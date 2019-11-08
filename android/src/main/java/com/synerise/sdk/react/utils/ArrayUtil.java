package com.synerise.sdk.react.utils;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableType;
import com.facebook.react.bridge.WritableArray;

import java.util.List;
import java.util.Map;

public class ArrayUtil {

    public static WritableArray toWritableArray(Object[] array) {
        WritableArray writableArray = Arguments.createArray();

        for (int i = 0; i < array.length; i++) {
            Object value = array[i];

            if (value == null) {
                writableArray.pushNull();
            }
            if (value instanceof Boolean) {
                writableArray.pushBoolean((Boolean) value);
            }
            if (value instanceof Double) {
                writableArray.pushDouble((Double) value);
            }
            if (value instanceof Integer) {
                writableArray.pushInt((Integer) value);
            }
            if (value instanceof String) {
                writableArray.pushString((String) value);
            }
            if (value instanceof Map) {
                writableArray.pushMap(MapUtil.toWritableMap((Map<String, Object>) value));
            }
            if (value.getClass().isArray()) {
                writableArray.pushArray(ArrayUtil.toWritableArray((Object[]) value));
            }
        }

        return writableArray;
    }

    public static WritableArray toWritableArray(List<String> array) {
        WritableArray writableArray = Arguments.createArray();

        for (int i = 0; i < array.size(); i++) {
            Object value = array.get(i);
            writableArray.pushString((String) value);
        }

        return writableArray;
    }

    public static Object[] toArray(ReadableArray readableArray) {
        Object[] array = new Object[readableArray.size()];

        for (int i = 0; i < readableArray.size(); i++) {
            ReadableType type = readableArray.getType(i);

            switch (type) {
                case Null:
                    array[i] = null;
                    break;
                case Boolean:
                    array[i] = readableArray.getBoolean(i);
                    break;
                case Number:
                    array[i] = readableArray.getDouble(i);
                    break;
                case String:
                    array[i] = readableArray.getString(i);
                    break;
                case Map:
                    array[i] = MapUtil.toMap(readableArray.getMap(i));
                    break;
                case Array:
                    array[i] = ArrayUtil.toArray(readableArray.getArray(i));
                    break;
            }
        }

        return array;
    }
}
