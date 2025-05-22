package com.synerise.sdk.react;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableType;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.google.gson.Gson;
import com.synerise.sdk.client.model.simpleAuth.ClientData;
import com.synerise.sdk.content.Content;
import com.synerise.sdk.content.model.Audience;
import com.synerise.sdk.content.model.DocumentsApiQuery;
import com.synerise.sdk.content.model.DocumentsApiQueryType;
import com.synerise.sdk.content.model.ScreenViewResponse;
import com.synerise.sdk.content.model.document.Document;
import com.synerise.sdk.content.model.document.DocumentApiQuery;
import com.synerise.sdk.content.model.recommendation.FiltersJoinerRule;
import com.synerise.sdk.content.model.recommendation.RecommendationRequestBody;
import com.synerise.sdk.content.model.recommendation.RecommendationResponse;
import com.synerise.sdk.content.model.screenview.ScreenView;
import com.synerise.sdk.content.model.screenview.ScreenViewApiQuery;
import com.synerise.sdk.content.widgets.dataModel.Recommendation;
import com.synerise.sdk.core.listeners.DataActionListener;
import com.synerise.sdk.core.net.IDataApiCall;
import com.synerise.sdk.error.ApiError;
import com.synerise.sdk.promotions.model.promotion.PromotionStatus;

import org.json.JSONException;
import org.json.JSONObject;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import javax.annotation.Nonnull;


public class RNContent extends RNBaseModule {

    private IDataApiCall<Object> getDocumentApiCall;
    private IDataApiCall<List<Object>> getDocumentsApiCall;
    private IDataApiCall<Document> generateDocumentApiCall;
    private final String ISO8601_FORMAT = "yyyy-MM-dd'T'kk:mm:ss.SSS'Z'";
    private IDataApiCall<RecommendationResponse> getRecommendationsApiCall;
    private IDataApiCall<ScreenViewResponse> getScreenViewApiCall;
    private IDataApiCall<ScreenView> generateScreenViewApiCall;
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

    @ReactMethod
    public void getRecommendationsV2(ReadableMap recommendationsOptions, Callback callback) {
        String slugName = recommendationsOptions.hasKey("slug") ? recommendationsOptions.getString("slug") : "";

        if (getRecommendationsApiCall != null) getRecommendationsApiCall.cancel();

        RecommendationRequestBody recommendationRequestBody = readableMapToRecommendationRequestBody(recommendationsOptions);

        getRecommendationsApiCall = Content.getRecommendationsV2(slugName, recommendationRequestBody);
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
    public void generateDocument(String slug, Callback callback) {
        if (generateDocumentApiCall != null) generateDocumentApiCall.cancel();

        generateDocumentApiCall = Content.generateDocument(slug);
        generateDocumentApiCall.execute(new DataActionListener<Document>() {

            @Override
            public void onDataAction(Document document) {
                WritableMap documentMap = Arguments.createMap();
                documentMap.putString("uuid", document.getUuid());
                documentMap.putString("slug", document.getSlug());
                documentMap.putString("schema", document.getSchema());
                try {
                    String jsonObject = gson.toJson(document);
                    WritableMap objectMap = convertJsonToMap(new JSONObject(jsonObject));
                    documentMap.putMap("content", objectMap);
                    executeSuccessCallbackResponse(callback, documentMap, null);
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
    public void generateDocumentWithApiQuery(ReadableMap documentApiQueryMap, Callback callback) {
        if (generateDocumentApiCall != null) generateDocumentApiCall.cancel();

        DocumentApiQuery documentApiQuery = readableMapToDocumentApiQuery(documentApiQueryMap);
        generateDocumentApiCall = Content.generateDocument(documentApiQuery);
        generateDocumentApiCall.execute(new DataActionListener<Document>() {

            @Override
            public void onDataAction(Document document) {
                WritableMap documentMap = Arguments.createMap();
                documentMap.putString("uuid", document.getUuid());
                documentMap.putString("slug", document.getSlug());
                documentMap.putString("schema", document.getSchema());
                try {
                    String jsonObject = gson.toJson(document);
                    WritableMap objectMap = convertJsonToMap(new JSONObject(jsonObject));
                    documentMap.putMap("content", objectMap);
                    executeSuccessCallbackResponse(callback, documentMap, null);
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
    public void generateScreenView(String feedSlug, Callback callback) {
        if (generateScreenViewApiCall != null) generateScreenViewApiCall.cancel();
        generateScreenViewApiCall = Content.generateScreenView(feedSlug);
        generateScreenViewApiCall.execute(
                new DataActionListener<ScreenView>() {
                    @Override
                    public void onDataAction(ScreenView data) {
                        WritableMap screenViewMap = Arguments.createMap();
                        screenViewMap.putMap("audience", audienceNewScreenViewsToWritableMap(data.getAudience()));
                        screenViewMap.putString("identifier", data.getId());
                        screenViewMap.putString("hash", data.getHash());
                        screenViewMap.putString("path", data.getPath());
                        screenViewMap.putString("name", data.getName());
                        screenViewMap.putInt("priority", data.getPriority());
                        screenViewMap.putMap("data", screenViewDataToWritableMap(data.getData()));

                        try {
                            Date createdAtDate = new SimpleDateFormat(ISO8601_FORMAT, Locale.getDefault()).parse(data.getCreatedAt());
                            Date updatedAtDate = new SimpleDateFormat(ISO8601_FORMAT, Locale.getDefault()).parse(data.getUpdatedAt());

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
                }
        );
    }

    @ReactMethod
    public void generateScreenViewWithApiQuery(ReadableMap screenViewApiQueryMap, Callback callback) {
        String feedSlug = screenViewApiQueryMap.hasKey("feedSlug") ? screenViewApiQueryMap.getString("feedSlug") : "";
        String productId = screenViewApiQueryMap.hasKey("productId") ? screenViewApiQueryMap.getString("productId") : "";
        ScreenViewApiQuery screenViewApiQuery = new ScreenViewApiQuery(feedSlug, productId);
        if (generateScreenViewApiCall != null) generateScreenViewApiCall.cancel();
        generateScreenViewApiCall = Content.generateScreenView(screenViewApiQuery);
        generateScreenViewApiCall.execute(
                new DataActionListener<ScreenView>() {
                    @Override
                    public void onDataAction(ScreenView data) {
                        WritableMap screenViewMap = Arguments.createMap();
                        screenViewMap.putMap("audience", audienceNewScreenViewsToWritableMap(data.getAudience()));
                        screenViewMap.putString("identifier", data.getId());
                        screenViewMap.putString("hash", data.getHash());
                        screenViewMap.putString("path", data.getPath());
                        screenViewMap.putString("name", data.getName());
                        screenViewMap.putInt("priority", data.getPriority());
                        screenViewMap.putMap("data", screenViewDataToWritableMap(data.getData()));

                        try {
                            Date createdAtDate = new SimpleDateFormat(ISO8601_FORMAT, Locale.getDefault()).parse(data.getCreatedAt());
                            Date updatedAtDate = new SimpleDateFormat(ISO8601_FORMAT, Locale.getDefault()).parse(data.getUpdatedAt());

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
                }
        );
    }

    private DocumentApiQuery readableMapToDocumentApiQuery(ReadableMap map) {
        String slugName = map.hasKey("feedSlug") ? map.getString("feedSlug") : "";
        DocumentApiQuery documentApiQuery = new DocumentApiQuery(slugName);
        documentApiQuery.setProductId(map.hasKey("productId") ? map.getString("productId") : null);
        documentApiQuery.setItemsIds(map.hasKey("itemsIds") ? readableArrayToListOfStrings(map.getArray("itemsIds")) : null);
        documentApiQuery.setItemsExcluded(map.hasKey("itemsExcluded") ? readableArrayToListOfStrings(map.getArray("itemsExcluded")) : null);
        documentApiQuery.setAdditionalFilters(map.hasKey("additionalFilters") ? map.getString("additionalFilters") : null);
        documentApiQuery.setAdditionalElasticFilters(map.hasKey("additionalElasticFilters") ? map.getString("additionalElasticFilters") : null);
        documentApiQuery.setDisplayAttributes(map.hasKey("displayAttribute") ? readableArrayToListOfStrings(map.getArray("displayAttribute")) : null);
        documentApiQuery.setIncludeContextItems(map.hasKey("includeContextItems") ? map.getBoolean("includeContextItems") : null);
        if (map.hasKey("filtersJoiner")) {
            documentApiQuery.setFiltersJoiner(FiltersJoinerRule.valueOf(map.getString("filtersJoiner")));
        }
        if (map.hasKey("elasticFiltersJoiner")) {
            documentApiQuery.setElasticFiltersJoiner(FiltersJoinerRule.valueOf(map.getString("elasticFiltersJoiner")));
        }

        return documentApiQuery;
    }

    private RecommendationRequestBody readableMapToRecommendationRequestBody(ReadableMap map) {
        RecommendationRequestBody recommendationRequestBody = new RecommendationRequestBody();
        recommendationRequestBody.setProductId(map.hasKey("productID") ? map.getString("productID") : null);
        recommendationRequestBody.setItemsIds(map.hasKey("itemsIds") ? readableArrayToListOfStrings(map.getArray("itemsIds")) : null);
        recommendationRequestBody.setItemsExcluded(map.hasKey("itemsExcluded") ? readableArrayToListOfStrings(map.getArray("itemsExcluded")) : null);
        recommendationRequestBody.setAdditionalFilters(map.hasKey("additionalFilters") ? map.getString("additionalFilters") : null);
        recommendationRequestBody.setAdditionalElasticFilters(map.hasKey("additionalElasticFilters") ? map.getString("additionalElasticFilters") : null);
        recommendationRequestBody.setDisplayAttributes(map.hasKey("displayAttribute") ? readableArrayToListOfStrings(map.getArray("displayAttribute")) : null);
        recommendationRequestBody.setIncludeContextItems(map.hasKey("includeContextItems") ? map.getBoolean("includeContextItems") : null);
        if (map.hasKey("filtersJoiner")) {
            recommendationRequestBody.setFiltersJoiner(FiltersJoinerRule.valueOf(map.getString("filtersJoiner")));
        }
        if (map.hasKey("elasticFiltersJoiner")) {
            recommendationRequestBody.setElasticFiltersJoiner(FiltersJoinerRule.valueOf(map.getString("elasticFiltersJoiner")));
        }

        return recommendationRequestBody;
    }

    private static ArrayList<String> readableArrayToListOfStrings(ReadableArray readableArray) {
        ArrayList<String> list = new ArrayList<>();

        for (int i = 0; i < readableArray.size(); i++) {
            ReadableType type = readableArray.getType(i);
            if (type == ReadableType.String) {
                list.add(readableArray.getString(i));
            }
        }

        return list;
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

    private WritableMap audienceNewScreenViewsToWritableMap(com.synerise.sdk.content.model.screenview.Audience audience) {
        WritableMap audienceMap = Arguments.createMap();
        List<String> segments = audience.getSegments();
        audienceMap.putArray("segments", segments != null ? listOfStringsIntoWritableArray(segments) : null);
        audienceMap.putString("targetType", audience.getTargetType());
        audienceMap.putString("query", audience.getQuery());

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
