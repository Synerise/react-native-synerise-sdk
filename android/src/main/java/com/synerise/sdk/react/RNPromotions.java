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
import com.synerise.sdk.core.listeners.DataActionListener;
import com.synerise.sdk.core.net.IApiCall;
import com.synerise.sdk.core.net.IDataApiCall;
import com.synerise.sdk.core.types.enums.ApiQuerySortingOrder;
import com.synerise.sdk.error.ApiError;
import com.synerise.sdk.promotions.Promotions;
import com.synerise.sdk.promotions.model.promotion.Promotion;
import com.synerise.sdk.promotions.model.promotion.PromotionImage;
import com.synerise.sdk.promotions.model.promotion.PromotionResponse;
import com.synerise.sdk.promotions.model.promotion.PromotionSortingKey;
import com.synerise.sdk.promotions.model.promotion.PromotionStatus;
import com.synerise.sdk.promotions.model.promotion.PromotionType;
import com.synerise.sdk.promotions.model.promotion.PromotionsApiQuery;
import com.synerise.sdk.promotions.model.promotion.SinglePromotionResponse;
import com.synerise.sdk.react.utils.ArrayUtil;
import com.synerise.sdk.react.utils.MapUtil;

import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.List;

import javax.annotation.Nonnull;

public class RNPromotions extends RNBaseModule {

    IDataApiCall<PromotionResponse> getPromotionsCall;
    IDataApiCall<SinglePromotionResponse> getSinglePromotionCall;
    IApiCall activatePromotionCall;
    IApiCall deactivatePromotionCall;

    public RNPromotions(ReactApplicationContext reactApplicationContext) {
        super(reactApplicationContext);
    }

    @Nonnull
    @Override
    public String getName() {
        return "RNPromotions";
    }

    //getAllPromotions(onSuccess: (promotionResponse: PromotionResponse) => void, onError: (error: Error) => void)
    @ReactMethod
    public void getAllPromotions(Callback callback) {
        if (getPromotionsCall != null) getPromotionsCall.cancel();
        getPromotionsCall = Promotions.getPromotions();
        getPromotionsCall.execute(new DataActionListener<PromotionResponse>() {
            @Override
            public void onDataAction(PromotionResponse promotionResponse) {
                WritableMap promotionMap = Arguments.createMap();

                if (promotionResponse.getPromotionMetadata() != null) {
                    promotionMap = insertMetaDataToMap(promotionMap, promotionResponse);
                }

                if (promotionResponse.getPromotions() != null) {
                    promotionMap.putArray("items", promotionsToWritableArray(promotionResponse.getPromotions()));
                }

                executeSuccessCallbackResponse(callback, promotionMap, null);
            }
        }, new DataActionListener<ApiError>() {
            @Override
            public void onDataAction(ApiError apiError) {
                executeFailureCallbackResponse(callback, null, apiError);
            }
        });
    }

    //getPromotions(apiQuery: PromotionsApiQuery, onSuccess: (promotionResponse: PromotionResponse) => void, onError: (error: Error) => void)
    @ReactMethod
    public void getPromotions(ReadableMap map, Callback callback) {
        PromotionsApiQuery promotionsApiQuery = new PromotionsApiQuery();
        ReadableArray statuses = map.getArray("statuses");
        promotionsApiQuery.setStatuses(map.hasKey("statuses") ? readableArrayToPromotionStatusList(map.getArray("statuses")) : null);
        promotionsApiQuery.setTypes(map.hasKey("types") ? readableArrayToPromotionTypesList(map.getArray("types")) : null);
        promotionsApiQuery.setLimit(map.hasKey("limit") ? map.getInt("limit") : 100);
        promotionsApiQuery.setPage(map.hasKey("page") ? map.getInt("page") : 1);
        promotionsApiQuery.setIncludeMeta(map.hasKey("includeMeta") ? map.getBoolean("includeMeta") : false);
        if (map.hasKey("sorting")) {
            promotionsApiQuery.setSortParameters(readableArrayToLinkedHashMapSorting(map.getArray("sorting")));
        }

        if (getPromotionsCall != null) getPromotionsCall.cancel();
        getPromotionsCall = Promotions.getPromotions(promotionsApiQuery);

        getPromotionsCall.execute(new DataActionListener<PromotionResponse>() {
            @Override
            public void onDataAction(PromotionResponse promotionResponse) {
                WritableMap promotionMap = Arguments.createMap();

                if (promotionResponse.getPromotionMetadata() != null) {
                    promotionMap = insertMetaDataToMap(promotionMap, promotionResponse);
                }

                if (promotionResponse.getPromotions() != null) {
                    promotionMap.putArray("items", promotionsToWritableArray(promotionResponse.getPromotions()));
                }

                executeSuccessCallbackResponse(callback, promotionMap, null);
            }
        }, new DataActionListener<ApiError>() {
            @Override
            public void onDataAction(ApiError apiError) {
                executeFailureCallbackResponse(callback, null, apiError);
            }
        });
    }

    //getPromotionByUUID(uuid: string, onSuccess: (promotion: Promotion) => void, onError: (error: Error) => void)
    @ReactMethod
    public void getPromotionByUUID(String uuid, Callback callback) {
        if (getSinglePromotionCall != null) getSinglePromotionCall.cancel();
        getSinglePromotionCall = Promotions.getPromotionByUuid(uuid);
        getSinglePromotionCall.execute(new DataActionListener<SinglePromotionResponse>() {
            @Override
            public void onDataAction(SinglePromotionResponse promotionResponse) {
                WritableMap promotionMap = promotionToWritableMap(promotionResponse.getPromotion());

                executeSuccessCallbackResponse(callback, promotionMap, null);
            }
        }, new DataActionListener<ApiError>() {
            @Override
            public void onDataAction(ApiError apiError) {
                executeFailureCallbackResponse(callback, null, apiError);
            }
        });
    }

    //getPromotionByCode(code: string, onSuccess: (promotion: Promotion) => void, onError: (error: Error) => void)
    @ReactMethod
    public void getPromotionByCode(String code, Callback callback) {
        if (getSinglePromotionCall != null) getSinglePromotionCall.cancel();
        getSinglePromotionCall = Promotions.getPromotionByCode(code);
        getSinglePromotionCall.execute(new DataActionListener<SinglePromotionResponse>() {
            @Override
            public void onDataAction(SinglePromotionResponse promotionResponse) {
                WritableMap promotionMap = promotionToWritableMap(promotionResponse.getPromotion());

                executeSuccessCallbackResponse(callback, promotionMap, null);
            }
        }, new DataActionListener<ApiError>() {
            @Override
            public void onDataAction(ApiError apiError) {
                executeFailureCallbackResponse(callback, null, apiError);
            }
        });
    }

    //activatePromotionByUUID(uuid: string, onSuccess: () => void, onError: (error: Error) => void)
    @ReactMethod
    public void activatePromotionByUUID(String uuid, Callback callback) {
        if (activatePromotionCall != null) activatePromotionCall.cancel();
        activatePromotionCall = Promotions.activatePromotionByUuid(uuid);
        activatePromotionCall.execute(() -> executeSuccessCallbackResponse(callback, null, null), new DataActionListener<ApiError>() {
            @Override
            public void onDataAction(ApiError apiError) {
                executeFailureCallbackResponse(callback, null, apiError);
            }
        });
    }

    //activatePromotionByCode(code: string, onSuccess: () => void, onError: (error: Error) => void)
    @ReactMethod
    public void activatePromotionByCode(String code, Callback callback) {
        if (activatePromotionCall != null) activatePromotionCall.cancel();
        activatePromotionCall = Promotions.activatePromotionByCode(code);
        activatePromotionCall.execute(() -> executeSuccessCallbackResponse(callback, null, null), new DataActionListener<ApiError>() {
            @Override
            public void onDataAction(ApiError apiError) {
                executeFailureCallbackResponse(callback, null, apiError);
            }
        });
    }

    //deactivatePromotionByUUID(uuid: string, onSuccess: () => void, onError: (error: Error) => void)
    @ReactMethod
    public void deactivatePromotionByUUID(String uuid, Callback callback) {
        if (deactivatePromotionCall != null) deactivatePromotionCall.cancel();
        deactivatePromotionCall = Promotions.deactivatePromotionByUuid(uuid);
        deactivatePromotionCall.execute(() -> executeSuccessCallbackResponse(callback, null, null), new DataActionListener<ApiError>() {
            @Override
            public void onDataAction(ApiError apiError) {
                executeFailureCallbackResponse(callback, null, apiError);
            }
        });
    }

    //deactivatePromotionByCode(code: string, onSuccess: () => void, onError: (error: Error) => void)
    @ReactMethod
    public void deactivatePromotionByCode(String code, Callback callback) {
        if (deactivatePromotionCall != null) deactivatePromotionCall.cancel();
        deactivatePromotionCall = Promotions.deactivatePromotionByCode(code);
        deactivatePromotionCall.execute(() -> executeSuccessCallbackResponse(callback, null, null), new DataActionListener<ApiError>() {
            @Override
            public void onDataAction(ApiError apiError) {
                executeFailureCallbackResponse(callback, null, apiError);
            }
        });
    }

    private WritableArray promotionsToWritableArray(List<Promotion> array) {
        WritableArray writableArray = Arguments.createArray();

        for (int i = 0; i < array.size(); i++) {
            Promotion promotion = array.get(i);
            WritableMap promotionMap = Arguments.createMap();
            promotionMap.putString("uuid", promotion.getUuid());
            promotionMap.putString("code", promotion.getCode());
            promotionMap.putString("status", promotion.getStatus().getStatus());
            promotionMap.putString("type", promotion.getType().getType());
            promotionMap.putInt("redeemLimitPerClient", promotion.getRedeemLimitPerClient());
            promotionMap.putInt("redeemQuantityPerActivation", promotion.getRedeemQuantityPerActivation());
            promotionMap.putInt("currentRedeemedQuantity", promotion.getCurrentRedeemedQuantity());
            promotionMap.putInt("currentRedeemLimit", promotion.getCurrentRedeemLimit());
            promotionMap.putInt("activationCounter", promotion.getActivationCounter());
            promotionMap.putString("discountType", promotion.getDiscountType().getApiName());
            promotionMap.putInt("discountValue", promotion.getDiscountValue());
            promotionMap.putInt("requireRedeemedPoints", promotion.getRequireRedeemedPoints());
            promotionMap.putString("name", promotion.getName());
            promotionMap.putString("headline", promotion.getHeadline());
            promotionMap.putString("description", promotion.getDescription());
            promotionMap.putDouble("price", promotion.getPrice());
            if (promotion.getStartAt() != null) {
                promotionMap.putDouble("startAt", promotion.getStartAt().getTime());
            }
            if (promotion.getLastingAt() != null) {
                promotionMap.putDouble("lastingAt", promotion.getLastingAt().getTime());
            }
            if (promotion.getExpireAt() != null) {
                promotionMap.putDouble("expireAt", promotion.getExpireAt().getTime());
            }
            if (promotion.getImages() != null) {
                promotionMap.putArray("images", promotionImageToWritableArray(promotion.getImages()));
            }
            if (promotion.getCatalogIndexItems() != null) {
                promotionMap.putArray("catalogIndexItems", ArrayUtil.toWritableArray(promotion.getCatalogIndexItems()));
            }
            if (promotion.getParams() != null) {
                promotionMap.putMap("params", MapUtil.hashMaptoWritableMap(promotion.getParams()));
            }

            writableArray.pushMap(promotionMap);
        }

        return writableArray;
    }

    private WritableMap promotionToWritableMap(Promotion promotion) {
        WritableMap promotionMap = Arguments.createMap();

        promotionMap.putString("uuid", promotion.getUuid());
        promotionMap.putString("code", promotion.getCode());
        promotionMap.putString("status", promotion.getStatus().getStatus());
        promotionMap.putString("type", promotion.getType().getType());
        promotionMap.putInt("redeemLimitPerClient", promotion.getRedeemLimitPerClient());
        promotionMap.putInt("redeemQuantityPerActivation", promotion.getRedeemQuantityPerActivation());
        promotionMap.putInt("currentRedeemedQuantity", promotion.getCurrentRedeemedQuantity());
        promotionMap.putInt("currentRedeemLimit", promotion.getCurrentRedeemLimit());
        promotionMap.putInt("activationCounter", promotion.getActivationCounter());
        promotionMap.putString("discountType", promotion.getDiscountType().getApiName());
        promotionMap.putInt("discountValue", promotion.getDiscountValue());
        promotionMap.putInt("requireRedeemedPoints", promotion.getRequireRedeemedPoints());
        promotionMap.putString("name", promotion.getName());
        promotionMap.putString("headline", promotion.getHeadline());
        promotionMap.putString("description", promotion.getDescription());
        promotionMap.putDouble("price", promotion.getPrice());
        if (promotion.getImages() != null) {
            promotionMap.putArray("images", promotionImageToWritableArray(promotion.getImages()));
        }
        if (promotion.getParams() != null) {
            promotionMap.putMap("params", MapUtil.hashMaptoWritableMap(promotion.getParams()));
        }
        if (promotion.getCatalogIndexItems() != null) {
            promotionMap.putArray("catalogIndexItems", ArrayUtil.toWritableArray(promotion.getCatalogIndexItems()));
        }
        if (promotion.getStartAt() != null) {
            promotionMap.putDouble("startAt", promotion.getStartAt().getTime());
        }
        if (promotion.getLastingAt() != null) {
            promotionMap.putDouble("lastingAt", promotion.getLastingAt().getTime());
        }
        if (promotion.getExpireAt() != null) {
            promotionMap.putDouble("expireAt", promotion.getExpireAt().getTime());
        }

        return promotionMap;
    }

    private static List<PromotionStatus> readableArrayToPromotionStatusList(ReadableArray readableArray) {
        PromotionStatus[] array = new PromotionStatus[readableArray.size()];

        for (int i = 0; i < readableArray.size(); i++) {
            ReadableType type = readableArray.getType(i);
            if (type == ReadableType.Map) {
                PromotionStatus status = PromotionStatus.getByPromotionStatus(readableArray.getMap(i).getString("PromotionStatus"));
                array[i] = status;
            }
        }

        List<PromotionStatus> list = Arrays.asList(array);
        return list;
    }

    private static List<PromotionType> readableArrayToPromotionTypesList(ReadableArray readableArray) {
        PromotionType[] array = new PromotionType[readableArray.size()];

        for (int i = 0; i < readableArray.size(); i++) {
            ReadableType type = readableArray.getType(i);
            if (type == ReadableType.Map) {
                PromotionType types = PromotionType.getByPromotionType(readableArray.getMap(i).getString("PromotionType"));
                array[i] = types;
            }
        }

        List<PromotionType> list = Arrays.asList(array);
        return list;
    }

    private static LinkedHashMap<PromotionSortingKey, ApiQuerySortingOrder> readableArrayToLinkedHashMapSorting(ReadableArray readableArray) {
        LinkedHashMap<PromotionSortingKey, ApiQuerySortingOrder> sorting = new LinkedHashMap<>();

        for (int i = 0; i < readableArray.size(); i++) {
            ReadableType type = readableArray.getType(i);
            if (type == ReadableType.Map) {
                    PromotionSortingKey key = PromotionSortingKey.getByPromotionSortingKey(readableArray.getMap(i).getString("property"));
                    ApiQuerySortingOrder order = ApiQuerySortingOrder.getBySortingOrder(readableArray.getMap(i).getString("order"));
                    sorting.put(key, order);
                }
        }
        return null;
    }

    private WritableArray promotionImageToWritableArray(List<PromotionImage> array) {
        WritableArray writableArray = Arguments.createArray();
        for (int i = 0; i < array.size(); i++) {
            PromotionImage image = array.get(i);
            WritableMap imageMap = Arguments.createMap();
            imageMap.putString("url", image.getUrl());
            imageMap.putString("type", image.getType().getApiName());

            writableArray.pushMap(imageMap);
        }

        return writableArray;
    }

    private WritableMap insertMetaDataToMap(WritableMap promotionMap, PromotionResponse promotionResponse) {
        promotionMap.putInt("totalCount", promotionResponse.getPromotionMetadata().getTotalCount());
        promotionMap.putInt("totalPages", promotionResponse.getPromotionMetadata().getTotalPages());
        promotionMap.putInt("page", promotionResponse.getPromotionMetadata().getPage());
        promotionMap.putInt("limit", promotionResponse.getPromotionMetadata().getLimit());
        promotionMap.putInt("code", promotionResponse.getPromotionMetadata().getCode());

        return promotionMap;
    }
}
