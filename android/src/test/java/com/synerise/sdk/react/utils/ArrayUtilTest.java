package com.synerise.sdk.react.utils;

import static org.junit.Assert.assertArrayEquals;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;

import com.facebook.react.bridge.JavaOnlyArray;
import com.facebook.react.bridge.JavaOnlyMap;

import org.junit.Test;

import java.util.Map;

/**
 * Exercises ArrayUtil.toArray, the read side that turns a native-agnostic ReadableArray into a
 * plain Object[]. Uses JavaOnlyArray so no native Arguments factory is involved.
 */
public class ArrayUtilTest {

    @Test
    public void toArray_givenPrimitiveEntries_shouldPreserveOrderAndType() {
        JavaOnlyArray input = new JavaOnlyArray();
        input.pushString("a");
        input.pushBoolean(true);
        input.pushDouble(2.5);
        input.pushNull();

        Object[] result = ArrayUtil.toArray(input);

        assertEquals(4, result.length);
        assertEquals("a", result[0]);
        assertEquals(Boolean.TRUE, result[1]);
        assertEquals(2.5, result[2]);
        assertNull(result[3]);
    }

    @Test
    public void toArray_givenIntegerEntry_shouldStoreItAsDoubleBecauseReadableTypeIsNumber() {
        JavaOnlyArray input = new JavaOnlyArray();
        input.pushInt(9);

        Object[] result = ArrayUtil.toArray(input);

        assertEquals(9.0, result[0]);
    }

    @Test
    public void toArray_givenNestedMap_shouldConvertItToAPlainMap() {
        JavaOnlyMap nested = new JavaOnlyMap();
        nested.putString("key", "value");
        JavaOnlyArray input = new JavaOnlyArray();
        input.pushMap(nested);

        Object[] result = ArrayUtil.toArray(input);

        assertTrue(result[0] instanceof Map);
        assertEquals("value", ((Map<?, ?>) result[0]).get("key"));
    }

    @Test
    public void toArray_givenNestedArray_shouldRecurseIntoAnotherObjectArray() {
        JavaOnlyArray inner = new JavaOnlyArray();
        inner.pushString("deep");
        JavaOnlyArray input = new JavaOnlyArray();
        input.pushArray(inner);

        Object[] result = ArrayUtil.toArray(input);

        assertTrue(result[0] instanceof Object[]);
        assertArrayEquals(new Object[]{"deep"}, (Object[]) result[0]);
    }

    @Test
    public void toArray_givenEmptyArray_shouldReturnEmptyObjectArray() {
        Object[] result = ArrayUtil.toArray(new JavaOnlyArray());

        assertEquals(0, result.length);
    }
}
