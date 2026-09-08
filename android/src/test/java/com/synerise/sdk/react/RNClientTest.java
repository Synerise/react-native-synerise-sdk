package com.synerise.sdk.react;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;

import com.facebook.react.bridge.JavaOnlyMap;
import com.synerise.sdk.client.model.client.Agreements;
import com.synerise.sdk.client.model.client.Attributes;

import org.junit.Test;

import java.util.HashMap;
import java.util.Map;

/**
 * Exercises the read-side argument mappers of RNClient that build the SDK client models. attributesMapper
 * works on a plain HashMap; agreementsMapper reads a JavaOnlyMap so no native Arguments factory is involved.
 */
public class RNClientTest {

    @Test
    public void attributesMapper_givenMixedValues_shouldCopyEachEntry() {
        HashMap<String, Object> input = new HashMap<>();
        input.put("firstName", "Mietek");
        input.put("age", 42);
        input.put("member", true);

        Attributes result = RNClient.attributesMapper(input);

        Map<String, Object> properties = result.getProperties();
        assertEquals(3, properties.size());
        assertEquals("Mietek", properties.get("firstName"));
        assertEquals(42, properties.get("age"));
        assertEquals(Boolean.TRUE, properties.get("member"));
    }

    @Test
    public void attributesMapper_givenEmptyMap_shouldProduceEmptyAttributes() {
        Attributes result = RNClient.attributesMapper(new HashMap<>());

        assertEquals(0, result.getProperties().size());
    }

    @Test
    public void attributesMapper_givenNullValue_shouldKeepTheKeyWithNullValue() {
        HashMap<String, Object> input = new HashMap<>();
        input.put("nickname", null);

        Attributes result = RNClient.attributesMapper(input);

        Map<String, Object> properties = result.getProperties();
        assertEquals(1, properties.size());
        assertTrue(properties.containsKey("nickname"));
        assertNull(properties.get("nickname"));
    }

    @Test
    public void agreementsMapper_givenNull_shouldReturnNull() {
        assertNull(RNClient.agreementsMapper(null));
    }

    @Test
    public void agreementsMapper_givenEmptyMap_shouldReturnAgreementsWithEveryConsentUnset() {
        Agreements result = RNClient.agreementsMapper(new JavaOnlyMap());

        assertNull(result.getEmail());
        assertNull(result.getSms());
        assertNull(result.getPush());
        assertNull(result.getBluetooth());
        assertNull(result.getRfid());
        assertNull(result.getWifi());
    }

    @Test
    public void agreementsMapper_givenPartialMap_shouldSetOnlyPresentKeys() {
        JavaOnlyMap input = new JavaOnlyMap();
        input.putBoolean("email", true);
        input.putBoolean("sms", false);

        Agreements result = RNClient.agreementsMapper(input);

        assertEquals(Boolean.TRUE, result.getEmail());
        assertEquals(Boolean.FALSE, result.getSms());
        assertNull(result.getPush());
        assertNull(result.getBluetooth());
        assertNull(result.getRfid());
        assertNull(result.getWifi());
    }

    @Test
    public void agreementsMapper_givenAllKeys_shouldSetEveryConsent() {
        JavaOnlyMap input = new JavaOnlyMap();
        input.putBoolean("email", true);
        input.putBoolean("sms", true);
        input.putBoolean("push", true);
        input.putBoolean("bluetooth", true);
        input.putBoolean("rfid", true);
        input.putBoolean("wifi", true);

        Agreements result = RNClient.agreementsMapper(input);

        assertEquals(Boolean.TRUE, result.getEmail());
        assertEquals(Boolean.TRUE, result.getSms());
        assertEquals(Boolean.TRUE, result.getPush());
        assertEquals(Boolean.TRUE, result.getBluetooth());
        assertEquals(Boolean.TRUE, result.getRfid());
        assertEquals(Boolean.TRUE, result.getWifi());
    }
}
