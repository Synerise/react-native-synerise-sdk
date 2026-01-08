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
import com.synerise.sdk.promotions.model.AssignVoucherData;
import com.synerise.sdk.promotions.model.AssignVoucherResponse;
import com.synerise.sdk.promotions.model.PromotionVoucherData;
import com.synerise.sdk.promotions.model.VoucherCodesData;
import com.synerise.sdk.promotions.model.VoucherCodesResponse;
import com.synerise.sdk.promotions.model.promotion.DiscountModeDetails;
import com.synerise.sdk.promotions.model.promotion.DiscountStep;
import com.synerise.sdk.promotions.model.promotion.Promotion;
import com.synerise.sdk.promotions.model.promotion.PromotionActivationKey;
import com.synerise.sdk.promotions.model.promotion.PromotionActivationOptions;
import com.synerise.sdk.promotions.model.promotion.PromotionDetails;
import com.synerise.sdk.promotions.model.promotion.PromotionIdentifier;
import com.synerise.sdk.promotions.model.promotion.PromotionImage;
import com.synerise.sdk.promotions.model.promotion.PromotionResponse;
import com.synerise.sdk.promotions.model.promotion.PromotionSortingKey;
import com.synerise.sdk.promotions.model.promotion.PromotionStatus;
import com.synerise.sdk.promotions.model.promotion.PromotionType;
import com.synerise.sdk.promotions.model.promotion.PromotionsApiQuery;
import com.synerise.sdk.promotions.model.promotion.SinglePromotionResponse;
import com.synerise.sdk.react.utils.ArrayUtil;
import com.synerise.sdk.react.utils.MapUtil;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Nonnull;

public class RNPromotions extends RNBaseModule {

    IDataApiCall<PromotionResponse> getPromotionsCall;
    IDataApiCall<SinglePromotionResponse> getSinglePromotionCall, activatePromotionWithDataCall;
    IDataApiCall<AssignVoucherResponse> getOrAssignVoucherCall;
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
        promotionsApiQuery.setIncludeVouchers(map.hasKey("includeVouchers") ? map.getBoolean("includeVouchers") : false);
        promotionsApiQuery.setCheckGlobalActivationLimits(map.hasKey("checkGlobalActivationLimits") ? map.getBoolean("checkGlobalActivationLimits") : true);
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

    @ReactMethod
    public void activatePromotion(ReadableMap map, Callback callback) {
        PromotionIdentifier promotionIdentifier = null;
        if (map.hasKey("identifier")) {
            Map<String, Object> promotionIdentifierMap = map.getMap("identifier").toHashMap();
            PromotionActivationKey key = PromotionActivationKey.valueOf((String) promotionIdentifierMap.get("key"));
            String value = (String) promotionIdentifierMap.get("value");
            promotionIdentifier = new PromotionIdentifier(key, value);
        }

        if (promotionIdentifier != null) {
            PromotionActivationOptions promotionActivationOptions = new PromotionActivationOptions(promotionIdentifier);
            if (map.hasKey("pointsToUse")) {
                Integer pointsToUse = map.getInt("pointsToUse");
                promotionActivationOptions.setPointsToUse(pointsToUse);
            }
            if (activatePromotionWithDataCall != null) activatePromotionWithDataCall.cancel();
            activatePromotionWithDataCall = Promotions.activatePromotion(promotionActivationOptions);
            activatePromotionWithDataCall.execute(new DataActionListener<SinglePromotionResponse>() {
                @Override
                public void onDataAction(SinglePromotionResponse response) {
                    WritableMap promotionMap = promotionToWritableMap(response.getPromotion());
                    executeSuccessCallbackResponse(callback, promotionMap, null);
                }
            }, new DataActionListener<ApiError>() {
                @Override
                public void onDataAction(ApiError apiError) {
                    executeFailureCallbackResponse(callback, null, apiError);
                }
            });
        } else {
            ApiError apiError = new ApiError(new Throwable("Promotion identifier must be specified"));
            executeFailureCallbackResponse(callback, null, apiError);
        }
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

    @ReactMethod
    public void activatePromotionsBatch(ReadableArray array, Callback callback) {
        if (activatePromotionCall != null) activatePromotionCall.cancel();
        activatePromotionCall = Promotions.activatePromotionsBatch(readableArrayToPromotionIdentifierList(array));
        activatePromotionCall.execute(() -> executeSuccessCallbackResponse(callback, null, null), new DataActionListener<ApiError>() {
            @Override
            public void onDataAction(ApiError apiError) {
                executeFailureCallbackResponse(callback, null, apiError);
            }
        });
    }

    @ReactMethod
    public void deactivatePromotionsBatch(ReadableArray array, Callback callback) {
        if (deactivatePromotionCall != null) deactivatePromotionCall.cancel();
        deactivatePromotionCall = Promotions.deactivatePromotionsBatch(readableArrayToPromotionIdentifierList(array));
        deactivatePromotionCall.execute(() -> executeSuccessCallbackResponse(callback, null, null), new DataActionListener<ApiError>() {
            @Override
            public void onDataAction(ApiError apiError) {
                executeFailureCallbackResponse(callback, null, apiError);
            }
        });
    }

    @ReactMethod
    public void getOrAssignVoucher(String poolUuid, Callback callback) {
        if (getOrAssignVoucherCall != null) getOrAssignVoucherCall.cancel();
        getOrAssignVoucherCall = Promotions.getOrAssignVoucher(poolUuid);
        getOrAssignVoucherCall.execute(new DataActionListener<AssignVoucherResponse>() {
            @Override
            public void onDataAction(AssignVoucherResponse assignVoucherResponse) {
                WritableMap voucherMap = Arguments.createMap();

                if (assignVoucherResponse.getMessage() != null) {
                    voucherMap.putString("message", assignVoucherResponse.getMessage());
                }

                if (assignVoucherResponse.getData() != null) {
                    voucherMap.putMap("data", assignVoucherDataToMap(assignVoucherResponse.getData()));
                }

                executeSuccessCallbackResponse(callback, voucherMap, null);
            }
        }, new DataActionListener<ApiError>() {
            @Override
            public void onDataAction(ApiError apiError) {
                executeFailureCallbackResponse(callback, null, apiError);
            }
        });
    }

    @ReactMethod
    public void assignVoucherCode(String poolUuid, Callback callback) {
        if (getOrAssignVoucherCall != null) getOrAssignVoucherCall.cancel();
        getOrAssignVoucherCall = Promotions.assignVoucherCode(poolUuid);
        getOrAssignVoucherCall.execute(new DataActionListener<AssignVoucherResponse>() {
            @Override
            public void onDataAction(AssignVoucherResponse assignVoucherResponse) {
                WritableMap voucherMap = Arguments.createMap();

                if (assignVoucherResponse.getMessage() != null) {
                    voucherMap.putString("message", assignVoucherResponse.getMessage());
                }

                if (assignVoucherResponse.getData() != null) {
                    voucherMap.putMap("data", assignVoucherDataToMap(assignVoucherResponse.getData()));
                }

                executeSuccessCallbackResponse(callback, voucherMap, null);
            }
        }, new DataActionListener<ApiError>() {
            @Override
            public void onDataAction(ApiError apiError) {
                executeFailureCallbackResponse(callback, null, apiError);
            }
        });
    }

    @ReactMethod
    public void getAssignedVoucherCodes(Callback callback) {
        IDataApiCall<VoucherCodesResponse> getVoucherCodesCall = Promotions.getAssignedVoucherCodes();
        getVoucherCodesCall.execute(new DataActionListener<VoucherCodesResponse>() {
            @Override
            public void onDataAction(VoucherCodesResponse voucherCodesResponse) {
                WritableMap voucherCodesMap = Arguments.createMap();

                if (voucherCodesResponse.getData() != null) {
                    voucherCodesMap.putArray("data", voucherDataToWritableArray(voucherCodesResponse.getData()));
                }

                executeSuccessCallbackResponse(callback, voucherCodesMap, null);
            }
        }, new DataActionListener<ApiError>() {
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
            promotionMap.putInt("possibleRedeems", promotion.getPossibleRedeems());
            promotionMap.putString("discountType", promotion.getDiscountType().getApiName());
            promotionMap.putInt("discountValue", promotion.getDiscountValue());
            promotionMap.putString("discountMode", promotion.getDiscountMode());
            promotionMap.putInt("requireRedeemedPoints", promotion.getRequireRedeemedPoints());
            promotionMap.putString("name", promotion.getName());
            promotionMap.putString("headline", promotion.getHeadline());
            promotionMap.putString("descriptionText", promotion.getDescription());
            promotionMap.putDouble("price", promotion.getPrice());
            promotionMap.putInt("priority", promotion.getPriority());
            promotionMap.putString("itemScope", promotion.getItermScope());
            promotionMap.putString("displayFrom", promotion.getDisplayFrom());
            promotionMap.putString("displayTo", promotion.getDisplayTo());
            if (promotion.getLastingTime() != null) {
                promotionMap.putInt("lastingTime", promotion.getLastingTime());
            }
            if (promotion.getMinBasketValue() != null) {
                promotionMap.putInt("minBasketValue", promotion.getMinBasketValue());
            }
            if (promotion.getMaxBasketValue() != null) {
                promotionMap.putInt("maxBasketValue", promotion.getMaxBasketValue());
            }
            if (promotion.getAssignedAt() != null) {
                promotionMap.putDouble("assignedAt", promotion.getAssignedAt().getTime());
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
            if (promotion.getImages() != null) {
                promotionMap.putArray("images", promotionImageToWritableArray(promotion.getImages()));
            }
            if (promotion.getCatalogIndexItems() != null) {
                promotionMap.putArray("catalogIndexItems", ArrayUtil.toWritableArray(promotion.getCatalogIndexItems()));
            }
            if (promotion.getParams() != null) {
                promotionMap.putMap("params", MapUtil.toWritableMap(promotion.getParams()));
            }
            if (promotion.getDetails() != null) {
                promotionMap.putMap("details", promotionDetailsToWritableMap(promotion.getDetails()));
            }
            if (promotion.getDiscountModeDetails() != null) {
                promotionMap.putMap("discountModeDetails", discountModeDetailsToWritableMap(promotion.getDiscountModeDetails()));
            }
            if (promotion.getVouchers() != null) {
                promotionMap.putArray("vouchers", promotionVoucherDatasToWritableArray(promotion.getVouchers()));
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
        promotionMap.putInt("possibleRedeems", promotion.getPossibleRedeems());
        promotionMap.putString("discountType", promotion.getDiscountType().getApiName());
        promotionMap.putInt("discountValue", promotion.getDiscountValue());
        promotionMap.putString("discountMode", promotion.getDiscountMode());
        promotionMap.putInt("requireRedeemedPoints", promotion.getRequireRedeemedPoints());
        promotionMap.putString("name", promotion.getName());
        promotionMap.putString("headline", promotion.getHeadline());
        promotionMap.putString("descriptionText", promotion.getDescription());
        promotionMap.putDouble("price", promotion.getPrice());
        promotionMap.putInt("priority", promotion.getPriority());
        promotionMap.putString("itemScope", promotion.getItermScope());
        promotionMap.putString("displayFrom", promotion.getDisplayFrom());
        promotionMap.putString("displayTo", promotion.getDisplayTo());

        if (promotion.getLastingTime() != null) {
            promotionMap.putInt("lastingTime", promotion.getLastingTime());
        }
        if (promotion.getMinBasketValue() != null) {
            promotionMap.putInt("minBasketValue", promotion.getMinBasketValue());
        }
        if (promotion.getMaxBasketValue() != null) {
            promotionMap.putInt("maxBasketValue", promotion.getMaxBasketValue());
        }
        if (promotion.getAssignedAt() != null) {
            promotionMap.putDouble("assignedAt", promotion.getAssignedAt().getTime());
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
        if (promotion.getImages() != null) {
            promotionMap.putArray("images", promotionImageToWritableArray(promotion.getImages()));
        }
        if (promotion.getCatalogIndexItems() != null) {
            promotionMap.putArray("catalogIndexItems", ArrayUtil.toWritableArray(promotion.getCatalogIndexItems()));
        }
        if (promotion.getParams() != null) {
            promotionMap.putMap("params", MapUtil.toWritableMap(promotion.getParams()));
        }
        if (promotion.getDetails() != null) {
            promotionMap.putMap("details", promotionDetailsToWritableMap(promotion.getDetails()));
        }
        if (promotion.getDiscountModeDetails() != null) {
            promotionMap.putMap("discountModeDetails", discountModeDetailsToWritableMap(promotion.getDiscountModeDetails()));
        }
        if (promotion.getVouchers() != null) {
            promotionMap.putArray("vouchers", promotionVoucherDatasToWritableArray(promotion.getVouchers()));
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

    private List<PromotionIdentifier> readableArrayToPromotionIdentifierList(ReadableArray readableArray) {
        List<PromotionIdentifier> list = new ArrayList<>(readableArray.size());
        for (int i = 0; i < readableArray.size(); i++) {
            ReadableType type = readableArray.getType(i);
            if (type == ReadableType.Map) {
                PromotionActivationKey key = PromotionActivationKey.valueOf(readableArray.getMap(i).getString("key"));
                String value = readableArray.getMap(i).getString("value");
                list.add(new PromotionIdentifier(key, value));
            }
        }

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

    private WritableArray promotionVoucherDatasToWritableArray(List<PromotionVoucherData> array) {
        WritableArray writableArray = Arguments.createArray();
        for (int i = 0; i < array.size(); i++) {
            PromotionVoucherData voucher = array.get(i);
            WritableMap voucherMap = Arguments.createMap();
            voucherMap.putString("code", voucher.getCode());
            voucherMap.putBoolean("autoGenerated", voucher.getAutoGenerated());
            voucherMap.putString("status", voucher.getStatus().getStatus());
            if (voucher.getLastingAt() != null) {
                voucherMap.putDouble("lastingAt", voucher.getLastingAt().getTime());
            }
            if (voucher.getRedeemedAt() != null) {
                voucherMap.putDouble("redeemedAt", voucher.getRedeemedAt().getTime());
            }
            if (voucher.getAssignedAt() != null) {
                voucherMap.putDouble("assignedAt", voucher.getAssignedAt().getTime());
            }

            writableArray.pushMap(voucherMap);
        }

        return writableArray;
    }

    private WritableMap promotionDetailsToWritableMap(PromotionDetails details) {
        WritableMap promotionDetailsMap = Arguments.createMap();
        WritableMap promotionDiscountType = Arguments.createMap();

        if (details.getDiscountType() != null) {
            promotionDiscountType.putString("name", details.getDiscountType().getName());
            promotionDiscountType.putBoolean("outerScope", details.getDiscountType().getOuterScope());
            promotionDiscountType.putInt("requiredItemsCount", details.getDiscountType().getRequiredItemsCount());
            promotionDiscountType.putInt("discountedItemsCount", details.getDiscountType().getDiscountedItemsCount());

        }

        promotionDetailsMap.putMap("discountType", promotionDiscountType);

        return promotionDetailsMap;
    }

    private WritableMap discountModeDetailsToWritableMap(DiscountModeDetails discountModeDetails) {
        WritableMap discountModeDetailsMap = Arguments.createMap();
        discountModeDetailsMap.putString("discountUsageTrigger", discountModeDetails.getDiscountUsageTrigger());

        WritableArray discountStepsArray = Arguments.createArray();
        List<DiscountStep> discountSteps = discountModeDetails.getDiscountSteps();
        for (int i = 0; i < discountSteps.size(); i++) {
            DiscountStep step = discountSteps.get(i);
            WritableMap discountStepMap = Arguments.createMap();
            discountStepMap.putInt("discountValue", step.getDiscountValue());
            discountStepMap.putInt("usageThreshold", step.getUsageThreshold());

            discountStepsArray.pushMap(discountStepMap);
        }

        discountModeDetailsMap.putArray("discountSteps", discountStepsArray);

        return discountModeDetailsMap;
    }

    private WritableMap insertMetaDataToMap(WritableMap promotionMap, PromotionResponse promotionResponse) {
        promotionMap.putInt("totalCount", promotionResponse.getPromotionMetadata().getTotalCount());
        promotionMap.putInt("totalPages", promotionResponse.getPromotionMetadata().getTotalPages());
        promotionMap.putInt("page", promotionResponse.getPromotionMetadata().getPage());
        promotionMap.putInt("limit", promotionResponse.getPromotionMetadata().getLimit());
        promotionMap.putInt("code", promotionResponse.getPromotionMetadata().getCode());

        return promotionMap;
    }

    private WritableMap assignVoucherDataToMap(AssignVoucherData voucherData) {
        WritableMap voucherDataMap = Arguments.createMap();

        if (voucherData.getCode() != null) {
            voucherDataMap.putString("code", voucherData.getCode());
        }
        if (voucherData.getExpireIn() != null) {
            voucherDataMap.putDouble("expireIn", voucherData.getExpireIn().getTime());
        }
        if (voucherData.getRedeemAt() != null) {
            voucherDataMap.putDouble("redeemAt", voucherData.getRedeemAt().getTime());
        }
        if (voucherData.getAssignedAt() != null) {
            voucherDataMap.putDouble("assignedAt", voucherData.getAssignedAt().getTime());
        }
        if (voucherData.getCreatedAt() != null) {
            voucherDataMap.putDouble("createdAt", voucherData.getCreatedAt().getTime());
        }
        if (voucherData.getUpdatedAt() != null) {
            voucherDataMap.putDouble("updatedAt", voucherData.getUpdatedAt().getTime());
        }

        return voucherDataMap;
    }

    private WritableArray voucherDataToWritableArray(List<VoucherCodesData> array) {
        WritableArray writableArray = Arguments.createArray();

        for (int i = 0; i < array.size(); i++) {
            VoucherCodesData voucherCodesData = array.get(i);
            WritableMap voucherMap = Arguments.createMap();
            voucherMap.putString("code", voucherCodesData.getCode());
            voucherMap.putString("status", voucherCodesData.getStatus().getStatus());
            voucherMap.putString("clientUuid", voucherCodesData.getClientUuid());
            voucherMap.putString("poolUuid", voucherCodesData.getPoolUuid());
            if (voucherCodesData.getExpireIn() != null) {
                voucherMap.putDouble("expireIn", voucherCodesData.getExpireIn().getTime());
            }
            if (voucherCodesData.getRedeemAt() != null) {
                voucherMap.putDouble("redeemAt", voucherCodesData.getRedeemAt().getTime());
            }
            if (voucherCodesData.getAssignedAt() != null) {
                voucherMap.putDouble("assignedAt", voucherCodesData.getAssignedAt().getTime());
            }
            if (voucherCodesData.getCreatedAt() != null) {
                voucherMap.putDouble("createdAt", voucherCodesData.getCreatedAt().getTime());
            }
            if (voucherCodesData.getUpdatedAt() != null) {
                voucherMap.putDouble("updatedAt", voucherCodesData.getUpdatedAt().getTime());
            }

            writableArray.pushMap(voucherMap);
        }

        return writableArray;
    }
}
