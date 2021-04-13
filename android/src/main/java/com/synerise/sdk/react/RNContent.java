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
import com.synerise.sdk.content.model.Audience;
import com.synerise.sdk.content.model.DocumentsApiQuery;
import com.synerise.sdk.content.model.DocumentsApiQueryType;
import com.synerise.sdk.content.model.ScreenViewResponse;
import com.synerise.sdk.content.model.recommendation.RecommendationRequestBody;
import com.synerise.sdk.content.model.recommendation.RecommendationResponse;
import com.synerise.sdk.content.widgets.dataModel.Recommendation;
import com.synerise.sdk.core.listeners.DataActionListener;
import com.synerise.sdk.core.net.IDataApiCall;
import com.synerise.sdk.error.ApiError;

import org.json.JSONException;
import org.json.JSONObject;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import javax.annotation.Nonnull;


public class RNContent extends RNBaseModule {

    IDataApiCall<Object> getDocumentApiCall;
    IDataApiCall<List<Object>> getDocumentsApiCall;
    private final String ISO8601_FORMAT = "yyyy-MM-dd'T'kk:mm:ss.SSS'Z'";
    private IDataApiCall<RecommendationResponse> getRecommendationsApiCall;
    private IDataApiCall<ScreenViewResponse> getScreenViewApiCall;
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

    @ReactMethod
    public void getScreenView(Callback callback) {
        getScreenViewApiCall = Content.getScreenView();
        getScreenViewApiCall.execute(new DataActionListener<ScreenViewResponse>() {
            @Override
            public void onDataAction(ScreenViewResponse response) {
                WritableMap screenViewMap = Arguments.createMap();

                screenViewMap.putMap("audience", audienceToWritableMap(response.getAudience()));
                screenViewMap.putString("identifier", response.getId());
                screenViewMap.putString("hashString", response.getHash());
                screenViewMap.putString("path", response.getPath());
                screenViewMap.putString("name", response.getName());
                screenViewMap.putInt("priority", response.getPriority());
                screenViewMap.putMap("data", screenViewDataToWritableMap(response.getData()));
                screenViewMap.putString("version", response.getVersion());
                screenViewMap.putString("parentVersion", response.getParentVersion());

                try {
                    Date createdAtDate = new SimpleDateFormat(ISO8601_FORMAT, Locale.getDefault()).parse(response.getCreatedAt());
                    Date updatedAtDate = new SimpleDateFormat(ISO8601_FORMAT, Locale.getDefault()).parse(response.getUpdatedAt());

                    if (createdAtDate != null) {
                        screenViewMap.putDouble("createdAt", createdAtDate.getTime());
                    }
                    if (updatedAtDate != null) {
                        screenViewMap.putDouble("updatedAt", updatedAtDate.getTime());
                    }
                } catch (ParseException e) {
                    e.printStackTrace();
                }

                executeSuccessCallbackResponse(callback, screenViewMap, null);
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
            WritableMap objectMap = Arguments.createMap();

            try {
                String jsonObject = gson.toJson(recommendation.getFeed());
                objectMap = convertJsonToMap(new JSONObject(jsonObject));
            } catch (JSONException e) {
                e.printStackTrace();
            }

            recommendationMap.putString("itemID", recommendation.getItemId());
            recommendationMap.putMap("attributes", objectMap);

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

    private WritableMap audienceToWritableMap(Audience audience) {
        WritableMap audienceMap = Arguments.createMap();
        List<String> idsList = audience.getIds();
        audienceMap.putString("query", audience.getQuery());
        audienceMap.putArray("IDs", idsList != null ? listOfStringsIntoWritableArray(idsList) : null);

        return audienceMap;
    }

    private WritableMap screenViewDataToWritableMap(Object data) {
        WritableMap screenViewData = Arguments.createMap();

        String jsonObject = gson.toJson(data);
        try {
            screenViewData = convertJsonToMap(new JSONObject(jsonObject));
        } catch (JSONException e) {
            e.printStackTrace();
        }

        return screenViewData;
    }
}
