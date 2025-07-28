package com.synerise.sdk.react.utils;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.facebook.react.bridge.ReadableType;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

public class MapUtil {

    public static WritableMap toWritableMap(Map<String, Object> map) {
        WritableMap writableMap = Arguments.createMap();
        Iterator iterator = map.entrySet().iterator();

        while (iterator.hasNext()) {
            Map.Entry pair = (Map.Entry)iterator.next();
            Object value = pair.getValue();

            if (value == null) {
                writableMap.putNull((String) pair.getKey());
            } else if (value instanceof Boolean) {
                writableMap.putBoolean((String) pair.getKey(), (Boolean) value);
            } else if (value instanceof Double) {
                writableMap.putDouble((String) pair.getKey(), (Double) value);
            } else if (value instanceof Integer) {
                writableMap.putInt((String) pair.getKey(), (Integer) value);
            } else if (value instanceof String) {
                writableMap.putString((String) pair.getKey(), (String) value);
            } else if (value instanceof Map) {
                writableMap.putMap((String) pair.getKey(), MapUtil.toWritableMap((Map<String, Object>) value));
            } else if (value.getClass() != null && value.getClass().isArray()) {
                writableMap.putArray((String) pair.getKey(), ArrayUtil.toWritableArray((Object[]) value));
            }

            iterator.remove();
        }

        return writableMap;
    }

    public static WritableMap stringMapToWritableMap(Map<String, String> map) {
        WritableMap writableMap = Arguments.createMap();
        Iterator iterator = map.entrySet().iterator();

        while (iterator.hasNext()) {
            Map.Entry pair = (Map.Entry)iterator.next();
            Object value = pair.getValue();

            writableMap.putString((String) pair.getKey(), (String) value);

            iterator.remove();
        }

        return writableMap;
    }

    public static WritableMap objectMapToWritableMap(Map<String, Object> map) {
        WritableMap writableMap = Arguments.createMap();

        for (Map.Entry<String, Object> entry : map.entrySet()) {
            String key = entry.getKey();
            Object value = entry.getValue();

            if (value == null) {
                writableMap.putNull(key);
            } else if (value instanceof String) {
                writableMap.putString(key, (String) value);
            } else if (value instanceof Integer) {
                writableMap.putInt(key, (Integer) value);
            } else if (value instanceof Double) {
                writableMap.putDouble(key, (Double) value);
            } else if (value instanceof Float) {
                writableMap.putDouble(key, ((Float) value).doubleValue());
            } else if (value instanceof Boolean) {
                writableMap.putBoolean(key, (Boolean) value);
            } else if (value instanceof Map) {
                // Recursive mapping
                writableMap.putMap(key, objectMapToWritableMap((Map<String, Object>) value));
            } else if (value instanceof List) {
                writableMap.putArray(key, objectListToWritableArray((List<Object>) value));
            } else {
                writableMap.putString(key, value.toString());
            }
        }

        return writableMap;
    }

    @SuppressWarnings("unchecked")
    public static WritableArray objectListToWritableArray(List<Object> list) {
        WritableArray array = Arguments.createArray();

        for (Object item : list) {
            if (item == null) {
                array.pushNull();
            } else if (item instanceof String) {
                array.pushString((String) item);
            } else if (item instanceof Integer) {
                array.pushInt((Integer) item);
            } else if (item instanceof Double) {
                array.pushDouble((Double) item);
            } else if (item instanceof Float) {
                array.pushDouble(((Float) item).doubleValue());
            } else if (item instanceof Boolean) {
                array.pushBoolean((Boolean) item);
            } else if (item instanceof Map) {
                array.pushMap(objectMapToWritableMap((Map<String, Object>) item));
            } else if (item instanceof List) {
                array.pushArray(objectListToWritableArray((List<Object>) item));
            } else {
                array.pushString(item.toString());
            }
        }

        return array;
    }

    public static Map<String, Object> toMap(ReadableMap readableMap) {
        Map<String, Object> map = new HashMap<>();
        ReadableMapKeySetIterator iterator = readableMap.keySetIterator();

        while (iterator.hasNextKey()) {
            String key = iterator.nextKey();
            ReadableType type = readableMap.getType(key);

            switch (type) {
                case Null:
                    map.put(key, null);
                    break;
                case Boolean:
                    map.put(key, readableMap.getBoolean(key));
                    break;
                case Number:
                    map.put(key, readableMap.getDouble(key));
                    break;
                case String:
                    map.put(key, readableMap.getString(key));
                    break;
                case Map:
                    map.put(key, MapUtil.toMap(readableMap.getMap(key)));
                    break;
                case Array:
                    map.put(key, ArrayUtil.toArray(readableMap.getArray(key)));
                    break;
            }
        }

        return map;
    }

    public static Map<String, String> toStringMap(ReadableMap readableMap) {
        Map<String, String> map = new HashMap<>();
        ReadableMapKeySetIterator iterator = readableMap.keySetIterator();

        while (iterator.hasNextKey()) {
            String key = iterator.nextKey();
            ReadableType type = readableMap.getType(key);

            switch (type) {
                case Null:
                    map.put(key, null);
                    break;
                case String:
                    map.put(key, readableMap.getString(key));
                    break;
            }
        }

        return map;
    }
}
