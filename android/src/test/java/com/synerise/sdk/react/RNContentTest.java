package com.synerise.sdk.react;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import com.facebook.react.bridge.JavaOnlyArray;
import com.facebook.react.bridge.JavaOnlyMap;
import com.google.gson.Gson;
import com.synerise.sdk.content.model.document.DocumentApiQuery;
import com.synerise.sdk.content.model.recommendation.FiltersJoinerRule;
import com.synerise.sdk.content.model.recommendation.RecommendationRequestBody;

import org.junit.Test;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

/**
 * Exercises the read-side ReadableMap/ReadableArray parsers of RNContent that build the SDK query
 * models. Uses JavaOnly* inputs so no native Arguments factory is involved. RecommendationRequestBody
 * has no getters and is minified in the published SDK, so it is read back through its stable Gson
 * serialized form (the @SerializedName contract survives minification).
 */
public class RNContentTest {

    @SuppressWarnings("unchecked")
    private static Map<String, Object> toSerializedMap(Object model) {
        return new Gson().fromJson(new Gson().toJson(model), Map.class);
    }

    @Test
    public void readableArrayToListOfStrings_givenStrings_shouldPreserveOrder() {
        JavaOnlyArray input = new JavaOnlyArray();
        input.pushString("first");
        input.pushString("second");

        List<String> result = RNContent.readableArrayToListOfStrings(input);

        assertEquals(Arrays.asList("first", "second"), result);
    }

    @Test
    public void readableArrayToListOfStrings_givenNonStringEntries_shouldSkipThem() {
        JavaOnlyArray input = new JavaOnlyArray();
        input.pushString("keep");
        input.pushInt(7);
        input.pushBoolean(true);

        List<String> result = RNContent.readableArrayToListOfStrings(input);

        assertEquals(Arrays.asList("keep"), result);
    }

    @Test
    public void readableArrayToListOfStrings_givenEmptyArray_shouldReturnEmptyList() {
        List<String> result = RNContent.readableArrayToListOfStrings(new JavaOnlyArray());

        assertTrue(result.isEmpty());
    }

    @Test
    public void readableMapToDocumentApiQuery_givenFullQuery_shouldCopyEveryFieldIntoPayload() {
        JavaOnlyArray itemsIds = new JavaOnlyArray();
        itemsIds.pushString("item-1");
        itemsIds.pushString("item-2");
        JavaOnlyMap params = new JavaOnlyMap();
        params.putString("customParam", "customValue");
        JavaOnlyMap input = new JavaOnlyMap();
        input.putString("slug", "recommended-products");
        input.putString("productId", "product-1");
        input.putArray("itemsIds", itemsIds);
        input.putString("additionalFilters", "price > 10");
        input.putString("filtersJoiner", "AND");
        input.putBoolean("includeContextItems", true);
        input.putMap("params", params);

        DocumentApiQuery result = RNContent.readableMapToDocumentApiQuery(input);

        Map<String, Object> payload = result.getPayload();
        assertEquals("recommended-products", result.getFeedSlug());
        assertEquals("product-1", payload.get("product:retailer_part_no"));
        assertEquals(Arrays.asList("item-1", "item-2"), payload.get("itemsIds"));
        assertEquals("price > 10", payload.get("additionalFilters"));
        assertEquals(FiltersJoinerRule.AND, payload.get("filtersJoiner"));
        assertEquals(Boolean.TRUE, payload.get("includeContextItems"));
        assertEquals("customValue", payload.get("customParam"));
    }

    @Test
    public void readableMapToDocumentApiQuery_givenElasticAndListFields_shouldCopyThemIntoPayload() {
        JavaOnlyArray itemsExcluded = new JavaOnlyArray();
        itemsExcluded.pushString("skip-1");
        JavaOnlyArray displayAttribute = new JavaOnlyArray();
        displayAttribute.pushString("price");
        JavaOnlyMap input = new JavaOnlyMap();
        input.putString("slug", "feed");
        input.putString("additionalElasticFilters", "color == red");
        input.putString("elasticFiltersJoiner", "OR");
        input.putArray("itemsExcluded", itemsExcluded);
        input.putArray("displayAttribute", displayAttribute);

        Map<String, Object> payload = RNContent.readableMapToDocumentApiQuery(input).getPayload();

        assertEquals("color == red", payload.get("additionalElasticFilters"));
        assertEquals(FiltersJoinerRule.OR, payload.get("elasticFiltersJoiner"));
        assertEquals(Arrays.asList("skip-1"), payload.get("itemIdExcluded"));
        assertEquals(Arrays.asList("price"), payload.get("displayAttribute"));
    }

    @Test(expected = IllegalArgumentException.class)
    public void readableMapToDocumentApiQuery_givenInvalidFiltersJoiner_shouldThrow() {
        JavaOnlyMap input = new JavaOnlyMap();
        input.putString("slug", "feed");
        input.putString("filtersJoiner", "MAYBE");

        RNContent.readableMapToDocumentApiQuery(input);
    }

    @Test
    public void readableMapToDocumentApiQuery_givenNoSlug_shouldUseEmptyFeedSlug() {
        DocumentApiQuery result = RNContent.readableMapToDocumentApiQuery(new JavaOnlyMap());

        assertEquals("", result.getFeedSlug());
    }

    @Test
    public void readableMapToRecommendationRequestBody_givenFullQuery_shouldCopyEveryField() {
        JavaOnlyArray itemsExcluded = new JavaOnlyArray();
        itemsExcluded.pushString("excluded-1");
        JavaOnlyMap input = new JavaOnlyMap();
        input.putString("productID", "product-9");
        input.putArray("itemsExcluded", itemsExcluded);
        input.putString("additionalFilters", "brand == synerise");
        input.putString("filtersJoiner", "OR");
        input.putBoolean("includeContextItems", false);

        RecommendationRequestBody result = RNContent.readableMapToRecommendationRequestBody(input);

        Map<String, Object> serialized = toSerializedMap(result);
        assertEquals("product-9", serialized.get("product:retailer_part_no"));
        assertEquals(Arrays.asList("excluded-1"), serialized.get("itemIdExcluded"));
        assertEquals("brand == synerise", serialized.get("additionalFilters"));
        assertEquals("OR", serialized.get("filtersJoiner"));
        assertEquals(Boolean.FALSE, serialized.get("includeContextItems"));
    }

    @Test
    public void readableMapToRecommendationRequestBody_givenItemsAndElasticFields_shouldCopyThem() {
        JavaOnlyArray itemsIds = new JavaOnlyArray();
        itemsIds.pushString("keep-1");
        itemsIds.pushString("keep-2");
        JavaOnlyArray displayAttribute = new JavaOnlyArray();
        displayAttribute.pushString("title");
        JavaOnlyMap input = new JavaOnlyMap();
        input.putArray("itemsIds", itemsIds);
        input.putArray("displayAttribute", displayAttribute);
        input.putString("additionalElasticFilters", "size == L");
        input.putString("elasticFiltersJoiner", "AND");

        Map<String, Object> serialized = toSerializedMap(RNContent.readableMapToRecommendationRequestBody(input));

        assertEquals(Arrays.asList("keep-1", "keep-2"), serialized.get("itemsIds"));
        assertEquals(Arrays.asList("title"), serialized.get("displayAttribute"));
        assertEquals("size == L", serialized.get("additionalElasticFilters"));
        assertEquals("AND", serialized.get("elasticFiltersJoiner"));
    }

    @Test(expected = IllegalArgumentException.class)
    public void readableMapToRecommendationRequestBody_givenInvalidFiltersJoiner_shouldThrow() {
        JavaOnlyMap input = new JavaOnlyMap();
        input.putString("filtersJoiner", "MAYBE");

        RNContent.readableMapToRecommendationRequestBody(input);
    }

    @Test
    public void readableMapToRecommendationRequestBody_givenEmptyQuery_shouldLeaveEveryFieldUnset() {
        RecommendationRequestBody result = RNContent.readableMapToRecommendationRequestBody(new JavaOnlyMap());

        assertTrue(toSerializedMap(result).isEmpty());
    }
}
