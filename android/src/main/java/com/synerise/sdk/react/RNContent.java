package com.synerise.sdk.react;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.google.gson.Gson;
import com.synerise.sdk.content.Content;
import com.synerise.sdk.content.model.DocumentsApiQuery;
import com.synerise.sdk.content.model.DocumentsApiQueryType;
import com.synerise.sdk.content.model.recommendation.Recommendation;
import com.synerise.sdk.content.model.recommendation.RecommendationAtribute;
import com.synerise.sdk.content.model.recommendation.RecommendationRequestBody;
import com.synerise.sdk.content.model.recommendation.RecommendationResponse;
import com.synerise.sdk.core.listeners.DataActionListener;
import com.synerise.sdk.core.net.IDataApiCall;
import com.synerise.sdk.error.ApiError;

import org.json.JSONException;
import org.json.JSONObject;
import java.util.List;

import javax.annotation.Nonnull;


public class RNContent extends RNBaseModule {

    IDataApiCall<Object> getDocumentApiCall;
    IDataApiCall<List<Object>> getDocumentsApiCall;
    private IDataApiCall<RecommendationResponse> getRecommendationsApiCall;
    private Gson gson = new Gson();

    public RNContent(ReactApplicationContext reactApplicationContext) {
        super(reactApplicationContext);
    }

    @Nonnull
    @Override
    public String getName() {
        return "RNContent";
    }

    @ReactMethod
    public void getDocument(String slugName, Callback callback) {
        if (getDocumentApiCall != null) getDocumentApiCall.cancel();

        getDocumentApiCall = Content.getDocument(slugName);
        getDocumentApiCall.execute(new DataActionListener<Object>() {

            @Override
            public void onDataAction(Object document) {
                try {
                    String jsonObject = gson.toJson(document);
                    WritableMap objectMap = convertJsonToMap(new JSONObject(jsonObject));
                    executeSuccessCallbackResponse(callback, objectMap, null);
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        }, new DataActionListener<ApiError>() {
            @Override
            public void onDataAction(ApiError apiError) {
                executeFailureCallbackResponse(callback, null, apiError);
            }
        });
    }

    @ReactMethod
    public void getDocuments(ReadableMap documentApiQueryMap, Callback callback) {
        DocumentsApiQuery documentsApiQuery = new DocumentsApiQuery();
        DocumentsApiQueryType type = DocumentsApiQueryType.getByPathType(documentApiQueryMap.getString("type"));
        documentsApiQuery.setDocumentQueryParameters(type, documentApiQueryMap.getString("typeValue"));
        documentsApiQuery.setVersion(documentApiQueryMap.getString("version"));

        if (getDocumentsApiCall != null) getDocumentsApiCall.cancel();

        getDocumentsApiCall = Content.getDocuments(documentsApiQuery);
        getDocumentsApiCall.execute(new DataActionListener<List<Object>>() {
            @Override
            public void onDataAction(List<Object> documents) {
                WritableArray array = Arguments.createArray();
                for (Object object : documents) {
                    try {
                        String jsonObject = gson.toJson(object);
                        WritableMap objectMap = convertJsonToMap(new JSONObject(jsonObject));
                        array.pushMap(objectMap);
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                }
                executeSuccessCallbackResponse(callback, array, null);
            }
        }, new DataActionListener<ApiError>() {
            @Override
            public void onDataAction(ApiError apiError) {
                executeFailureCallbackResponse(callback, null, apiError);
            }
        });
    }

    @ReactMethod
    public void getRecommendations(ReadableMap recommendationsOptions, Callback callback) {
        String productId = recommendationsOptions.hasKey("productID") ? recommendationsOptions.getString("productID") : "";
        String slugName = recommendationsOptions.hasKey("slug") ? recommendationsOptions.getString("slug") : "";

        if (getRecommendationsApiCall != null) getRecommendationsApiCall.cancel();

        RecommendationRequestBody recommendationRequestBody = new RecommendationRequestBody();
        recommendationRequestBody.setProductId(productId);

        getRecommendationsApiCall = Content.getRecommendations(slugName, recommendationRequestBody);
        getRecommendationsApiCall.execute(new DataActionListener<RecommendationResponse>() {
            @Override
            public void onDataAction(RecommendationResponse responseBody) {
                WritableMap recommendationMap = Arguments.createMap();

                recommendationMap.putString("campaignHash", responseBody.getCampaignHash());
                recommendationMap.putString("campaignId", responseBody.getCampaignId());
                recommendationMap.putString("schema", responseBody.getSchema());
                recommendationMap.putString("slug", responseBody.getSlug());
                recommendationMap.putString("uuid", responseBody.getUuid());

                recommendationMap.putArray("items", recommendationToWritableArray(responseBody.getRecommendations()));
                executeSuccessCallbackResponse(callback, recommendationMap, null);
            }
        }, new DataActionListener<ApiError>() {
            @Override
            public void onDataAction(ApiError apiError) {
                executeFailureCallbackResponse(callback, null, apiError);
            }
        });

    }

    private WritableArray recommendationToWritableArray(List<Recommendation> array) {
        WritableArray writableArray = Arguments.createArray();

        for (int i = 0; i < array.size(); i++) {
            Recommendation recommendation = array.get(i);
            WritableMap recommendationMap = Arguments.createMap();
            recommendationMap.putString("productRetailerPartNo", recommendation.getProductRetailerPartNo());
            recommendationMap.putString("title", recommendation.getTitle());
            recommendationMap.putString("brand", recommendation.getBrand());
            recommendationMap.putString("category", recommendation.getCategory());
            recommendationMap.putString("description", recommendation.getDescription());
            recommendationMap.putString("gender", recommendation.getGender());
            recommendationMap.putString("color", recommendation.getColor());
            recommendationMap.putString("effectivePrice", recommendation.getEffectivePrice());
            recommendationMap.putString("priceCurrency", recommendation.getPriceCurrency());
            recommendationMap.putString("priceValue", recommendation.getPriceValue());
            recommendationMap.putString("salePriceValue", recommendation.getSalePriceValue());
            recommendationMap.putString("imageLink", recommendation.getImageLink());
            recommendationMap.putString("link", recommendation.getLink());

            recommendationMap.putArray("sizes", listOfStringsIntoWritableArray(recommendation.getSizes()));
            recommendationMap.putArray("additionalImageLinks", listOfStringsIntoWritableArray(recommendation.getAdditionalImageLinks()));
            recommendationMap.putArray("customAttributes", recommendationAttributesListIntoWritableArray(recommendation.getCustomAttributes()));

            writableArray.pushMap(recommendationMap);
        }

        return writableArray;
    }

    private WritableArray listOfStringsIntoWritableArray(List<String> array) {
        WritableArray writableArray = Arguments.createArray();
        for (int i = 0; i < array.size(); i++) {
            writableArray.pushString(array.get(i));
        }

        return writableArray;
    }

    private WritableArray recommendationAttributesListIntoWritableArray(List<RecommendationAtribute> array) {
        WritableArray writableArray = Arguments.createArray();
        for (int i = 0; i < array.size(); i++) {
            RecommendationAtribute attribute = array.get(i);

            WritableMap attributeMap = Arguments.createMap();
            attributeMap.putString("name", attribute.getName());
            attributeMap.putString("type", attribute.getType());
            attributeMap.putString("value", attribute.getValue());

            writableArray.pushMap(attributeMap);
        }

        return writableArray;
    }
}
