package com.synerise.sdk.react.utils;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;

import com.facebook.react.bridge.JavaOnlyArray;
import com.facebook.react.bridge.JavaOnlyMap;

import org.junit.Test;

import java.util.List;
import java.util.Map;

/**
 * Exercises the read side of MapUtil that converts native-agnostic ReadableMap inputs into plain
 * JVM collections. JavaOnlyMap is the pure-Java ReadableMap/WritableMap RN ships for exactly this,
 * so these paths never touch the native Arguments factory and run on a plain JVM.
 */
public class MapUtilTest {

    @Test
    public void toMap_givenPrimitiveValues_shouldCopyEachEntryWithMatchingType() {
        JavaOnlyMap input = new JavaOnlyMap();
        input.putString("name", "Mietek");
        input.putBoolean("active", true);
        input.putInt("count", 7);
        input.putDouble("ratio", 1.5);
        input.putNull("missing");

        Map<String, Object> result = MapUtil.toMap(input);

        assertEquals(5, result.size());
        assertEquals("Mietek", result.get("name"));
        assertEquals(Boolean.TRUE, result.get("active"));
        assertEquals(1.5, result.get("ratio"));
        assertTrue(result.containsKey("missing"));
        assertNull(result.get("missing"));
    }

    @Test
    public void toMap_givenIntegerValue_shouldStoreItAsDoubleBecauseReadableTypeIsNumber() {
        JavaOnlyMap input = new JavaOnlyMap();
        input.putInt("count", 7);

        Map<String, Object> result = MapUtil.toMap(input);

        assertEquals(7.0, result.get("count"));
    }

    @Test
    public void toMap_givenNestedMap_shouldRecurseIntoAPlainMap() {
        JavaOnlyMap nested = new JavaOnlyMap();
        nested.putString("inner", "value");
        JavaOnlyMap input = new JavaOnlyMap();
        input.putMap("child", nested);

        Map<String, Object> result = MapUtil.toMap(input);

        Object child = result.get("child");
        assertTrue(child instanceof Map);
        assertEquals("value", ((Map<?, ?>) child).get("inner"));
    }

    @Test
    public void toMap_givenNestedArray_shouldConvertItToAnObjectArray() {
        JavaOnlyArray array = new JavaOnlyArray();
        array.pushString("a");
        array.pushBoolean(false);
        JavaOnlyMap input = new JavaOnlyMap();
        input.putArray("items", array);

        Map<String, Object> result = MapUtil.toMap(input);

        Object items = result.get("items");
        assertTrue(items instanceof Object[]);
        Object[] converted = (Object[]) items;
        assertEquals(2, converted.length);
        assertEquals("a", converted[0]);
        assertEquals(Boolean.FALSE, converted[1]);
    }

    @Test
    public void toMap_givenEmptyMap_shouldReturnAnEmptyMap() {
        Map<String, Object> result = MapUtil.toMap(new JavaOnlyMap());

        assertTrue(result.isEmpty());
    }

    @Test
    public void toStringMap_givenMixedTypes_shouldKeepOnlyStringAndNullEntries() {
        JavaOnlyMap input = new JavaOnlyMap();
        input.putString("label", "text");
        input.putNull("empty");
        input.putInt("ignoredNumber", 3);
        input.putBoolean("ignoredBoolean", true);

        Map<String, String> result = MapUtil.toStringMap(input);

        assertEquals(2, result.size());
        assertEquals("text", result.get("label"));
        assertTrue(result.containsKey("empty"));
        assertNull(result.get("empty"));
    }
}
