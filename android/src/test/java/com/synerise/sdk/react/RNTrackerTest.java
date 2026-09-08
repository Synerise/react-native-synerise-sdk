package com.synerise.sdk.react;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;

import com.google.gson.Gson;
import com.synerise.sdk.event.TrackerParams;

import org.junit.Test;

import java.util.HashMap;
import java.util.Map;

/**
 * Exercises RNTracker.trackerParamsMapper, which copies a plain parameters map into an SDK
 * TrackerParams. TrackerParams is minified in the published SDK and exposes no stable getter, so the
 * copied entries are verified through its Gson serialized form (the parameter keys and values are
 * literal map contents, unaffected by field minification).
 */
public class RNTrackerTest {

    @SuppressWarnings("unchecked")
    private static Map<String, Object> serializedParams(TrackerParams trackerParams) {
        Map<String, Object> wrapper = new Gson().fromJson(new Gson().toJson(trackerParams), Map.class);
        for (Object value : wrapper.values()) {
            if (value instanceof Map) {
                return (Map<String, Object>) value;
            }
        }
        return new HashMap<>();
    }

    @Test
    public void trackerParamsMapper_givenNull_shouldReturnNull() {
        assertNull(RNTracker.trackerParamsMapper(null));
    }

    @Test
    public void trackerParamsMapper_givenValues_shouldCopyEachEntry() {
        HashMap<String, Object> input = new HashMap<>();
        input.put("orderId", "order-7");
        input.put("total", 199.99);
        input.put("paid", true);

        TrackerParams result = RNTracker.trackerParamsMapper(input);

        assertNotNull(result);
        Map<String, Object> params = serializedParams(result);
        assertEquals(3, params.size());
        assertEquals("order-7", params.get("orderId"));
        assertEquals(199.99, params.get("total"));
        assertEquals(Boolean.TRUE, params.get("paid"));
    }

    @Test
    public void trackerParamsMapper_givenEmptyMap_shouldProduceEmptyParams() {
        TrackerParams result = RNTracker.trackerParamsMapper(new HashMap<>());

        assertNotNull(result);
        assertEquals(0, serializedParams(result).size());
    }
}
