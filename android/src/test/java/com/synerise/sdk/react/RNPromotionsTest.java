package com.synerise.sdk.react;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;

import com.facebook.react.bridge.JavaOnlyArray;
import com.facebook.react.bridge.JavaOnlyMap;
import com.synerise.sdk.core.types.enums.ApiQuerySortingOrder;
import com.synerise.sdk.promotions.model.promotion.PromotionActivationKey;
import com.synerise.sdk.promotions.model.promotion.PromotionIdentifier;
import com.synerise.sdk.promotions.model.promotion.PromotionSortingKey;
import com.synerise.sdk.promotions.model.promotion.PromotionStatus;
import com.synerise.sdk.promotions.model.promotion.PromotionType;

import org.junit.Test;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;

/**
 * Exercises the read-side ReadableArray parsers of RNPromotions that turn the JS query arguments
 * into SDK query models. Uses JavaOnlyArray/JavaOnlyMap so no native Arguments factory is involved.
 */
public class RNPromotionsTest {

    private static JavaOnlyMap mapWith(String key, String value) {
        JavaOnlyMap map = new JavaOnlyMap();
        map.putString(key, value);
        return map;
    }

    @Test
    public void readableArrayToPromotionStatusList_givenKnownStatuses_shouldMapEachToItsEnum() {
        JavaOnlyArray input = new JavaOnlyArray();
        input.pushMap(mapWith("PromotionStatus", "ACTIVE"));
        input.pushMap(mapWith("PromotionStatus", "REDEEMED"));

        List<PromotionStatus> result = RNPromotions.readableArrayToPromotionStatusList(input);

        assertEquals(2, result.size());
        assertEquals(PromotionStatus.ACTIVE, result.get(0));
        assertEquals(PromotionStatus.REDEEMED, result.get(1));
    }

    @Test
    public void readableArrayToPromotionStatusList_givenUnrecognizedStatus_shouldFallBackToUnknown() {
        JavaOnlyArray input = new JavaOnlyArray();
        input.pushMap(mapWith("PromotionStatus", "NOT_A_STATUS"));

        List<PromotionStatus> result = RNPromotions.readableArrayToPromotionStatusList(input);

        assertEquals(PromotionStatus.UNKNOWN, result.get(0));
    }

    @Test
    public void readableArrayToPromotionStatusList_givenEmptyArray_shouldReturnEmptyList() {
        List<PromotionStatus> result = RNPromotions.readableArrayToPromotionStatusList(new JavaOnlyArray());

        assertTrue(result.isEmpty());
    }

    @Test
    public void readableArrayToPromotionStatusList_givenNonMapEntry_shouldLeaveNullSlot() {
        JavaOnlyArray input = new JavaOnlyArray();
        input.pushString("not-a-map");

        List<PromotionStatus> result = RNPromotions.readableArrayToPromotionStatusList(input);

        assertEquals(1, result.size());
        assertNull(result.get(0));
    }

    @Test
    public void readableArrayToPromotionTypesList_givenKnownTypes_shouldMapEachToItsEnum() {
        JavaOnlyArray input = new JavaOnlyArray();
        input.pushMap(mapWith("PromotionType", "GENERAL"));
        input.pushMap(mapWith("PromotionType", "CUSTOM"));

        List<PromotionType> result = RNPromotions.readableArrayToPromotionTypesList(input);

        assertEquals(2, result.size());
        assertEquals(PromotionType.GENERAL, result.get(0));
        assertEquals(PromotionType.CUSTOM, result.get(1));
    }

    @Test
    public void readableArrayToPromotionTypesList_givenUnrecognizedType_shouldFallBackToUnknown() {
        JavaOnlyArray input = new JavaOnlyArray();
        input.pushMap(mapWith("PromotionType", "NOT_A_TYPE"));

        List<PromotionType> result = RNPromotions.readableArrayToPromotionTypesList(input);

        assertEquals(PromotionType.UNKNOWN, result.get(0));
    }

    @Test
    public void readableArrayToPromotionTypesList_givenNonMapEntry_shouldLeaveNullSlot() {
        JavaOnlyArray input = new JavaOnlyArray();
        input.pushString("not-a-map");

        List<PromotionType> result = RNPromotions.readableArrayToPromotionTypesList(input);

        assertEquals(1, result.size());
        assertNull(result.get(0));
    }

    @Test(expected = IllegalArgumentException.class)
    public void readableArrayToPromotionIdentifierList_givenUnrecognizedKey_shouldThrow() {
        JavaOnlyMap identifier = new JavaOnlyMap();
        identifier.putString("key", "NOT_A_KEY");
        identifier.putString("value", "whatever");
        JavaOnlyArray input = new JavaOnlyArray();
        input.pushMap(identifier);

        RNPromotions.readableArrayToPromotionIdentifierList(input);
    }

    @Test
    public void readableArrayToPromotionIdentifierList_givenKeyValueMaps_shouldBuildIdentifiers() {
        JavaOnlyMap codeIdentifier = new JavaOnlyMap();
        codeIdentifier.putString("key", "CODE");
        codeIdentifier.putString("value", "PROMO-123");
        JavaOnlyMap uuidIdentifier = new JavaOnlyMap();
        uuidIdentifier.putString("key", "UUID");
        uuidIdentifier.putString("value", "abc-uuid");
        JavaOnlyArray input = new JavaOnlyArray();
        input.pushMap(codeIdentifier);
        input.pushMap(uuidIdentifier);

        List<PromotionIdentifier> result = RNPromotions.readableArrayToPromotionIdentifierList(input);

        assertEquals(2, result.size());
        assertEquals(PromotionActivationKey.CODE, result.get(0).getKey());
        assertEquals("PROMO-123", result.get(0).getValue());
        assertEquals(PromotionActivationKey.UUID, result.get(1).getKey());
        assertEquals("abc-uuid", result.get(1).getValue());
    }

    @Test
    public void readableArrayToPromotionIdentifierList_givenNonMapEntry_shouldSkipIt() {
        JavaOnlyArray input = new JavaOnlyArray();
        input.pushString("ignored");

        List<PromotionIdentifier> result = RNPromotions.readableArrayToPromotionIdentifierList(input);

        assertTrue(result.isEmpty());
    }

    @Test
    public void readableArrayToLinkedHashMapSorting_givenSortingEntries_shouldMapPropertyToOrderInInsertionOrder() {
        JavaOnlyMap firstSorting = new JavaOnlyMap();
        firstSorting.putString("property", "expireAt");
        firstSorting.putString("order", "asc");
        JavaOnlyMap secondSorting = new JavaOnlyMap();
        secondSorting.putString("property", "priority");
        secondSorting.putString("order", "desc");
        JavaOnlyArray input = new JavaOnlyArray();
        input.pushMap(firstSorting);
        input.pushMap(secondSorting);

        LinkedHashMap<PromotionSortingKey, ApiQuerySortingOrder> result =
                RNPromotions.readableArrayToLinkedHashMapSorting(input);

        assertEquals(2, result.size());
        assertEquals(ApiQuerySortingOrder.ASCENDING, result.get(PromotionSortingKey.EXPIRE_AT));
        assertEquals(ApiQuerySortingOrder.DESCENDING, result.get(PromotionSortingKey.PRIORITY));
        ArrayList<PromotionSortingKey> keysInOrder = new ArrayList<>(result.keySet());
        assertEquals(PromotionSortingKey.EXPIRE_AT, keysInOrder.get(0));
        assertEquals(PromotionSortingKey.PRIORITY, keysInOrder.get(1));
    }

    @Test
    public void readableArrayToLinkedHashMapSorting_givenUnknownOrder_shouldMapKnownKeyToNullOrder() {
        JavaOnlyMap sorting = new JavaOnlyMap();
        sorting.putString("property", "expireAt");
        sorting.putString("order", "sideways");
        JavaOnlyArray input = new JavaOnlyArray();
        input.pushMap(sorting);

        LinkedHashMap<PromotionSortingKey, ApiQuerySortingOrder> result =
                RNPromotions.readableArrayToLinkedHashMapSorting(input);

        assertEquals(1, result.size());
        assertTrue(result.containsKey(PromotionSortingKey.EXPIRE_AT));
        assertNull(result.get(PromotionSortingKey.EXPIRE_AT));
    }

    @Test
    public void readableArrayToLinkedHashMapSorting_givenDuplicateProperty_shouldKeepLastOrder() {
        JavaOnlyMap firstSorting = new JavaOnlyMap();
        firstSorting.putString("property", "priority");
        firstSorting.putString("order", "asc");
        JavaOnlyMap secondSorting = new JavaOnlyMap();
        secondSorting.putString("property", "priority");
        secondSorting.putString("order", "desc");
        JavaOnlyArray input = new JavaOnlyArray();
        input.pushMap(firstSorting);
        input.pushMap(secondSorting);

        LinkedHashMap<PromotionSortingKey, ApiQuerySortingOrder> result =
                RNPromotions.readableArrayToLinkedHashMapSorting(input);

        assertEquals(1, result.size());
        assertEquals(ApiQuerySortingOrder.DESCENDING, result.get(PromotionSortingKey.PRIORITY));
    }

    @Test
    public void readableArrayToLinkedHashMapSorting_givenEmptyArray_shouldReturnEmptyMap() {
        LinkedHashMap<PromotionSortingKey, ApiQuerySortingOrder> result =
                RNPromotions.readableArrayToLinkedHashMapSorting(new JavaOnlyArray());

        assertTrue(result.isEmpty());
    }
}
