//
//  RNPromotions.m
//  react-native-synerise-sdk
//
//  Created by Synerise
//  Copyright © 2021 Synerise. All rights reserved.
//

#import "RNPromotions.h"

NS_ASSUME_NONNULL_BEGIN

@implementation RNPromotions

static RNPromotions *moduleInstance;

RCT_EXPORT_MODULE();

#pragma mark - Lifecycle

- (instancetype)init {
    if (moduleInstance != nil) {
        return moduleInstance;
    }
    
    self = [super init];
    
    if (self) {
        
    }
    
    moduleInstance = self;
    
    return self;
}

#pragma mark - SDK Mapping

- (SNRPromotionsApiQuery *)modelPromotionsApiQueryWithDictionary:(NSDictionary *)dictionary {
    SNRPromotionsApiQuery *model = [SNRPromotionsApiQuery new];
    
    if (dictionary != nil) {
        model.statuses = [dictionary getArrayForKey:@"statuses"];
        model.types = [dictionary getArrayForKey:@"types"];

        NSArray *sorting = [dictionary getArrayForKey:@"sorting"];
        if (sorting != nil && sorting.count > 0) {
            NSMutableArray *sortingNormalized = [@[] mutableCopy];
            for (NSDictionary *sortingItem in dictionary[@"sorting"]) {
                NSString *property = sortingItem[@"property"];
                NSString *order = sortingItem[@"order"];
                if (property != nil && order != nil) {
                    [sortingNormalized addObject:@{
                        property: order
                    }];
                }
            }
            
            model.sorting = sortingNormalized;
        }
        
        model.limit = [dictionary getIntegerForKey:@"limit"];
        model.page = [dictionary getIntegerForKey:@"page"];

        model.includeMeta = [dictionary getBoolForKey:@"includeMeta"];
    }
    
    return model;
}

- (NSArray<SNRPromotionIdentifier *> *)modelPromotionIdentifiersWithArray:(NSArray<NSDictionary *> *)array {
    NSMutableArray *promotionIdentifiers = [@[] mutableCopy];
    
    if (array != nil && array.count > 0) {
        for (NSDictionary *dictionary in array) {
            SNRPromotionIdentifier *promotionIdentifier = [self modelPromotionIdentifierWithDictionary:dictionary];
            if (promotionIdentifier != nil) {
                [promotionIdentifiers addObject:promotionIdentifier];
            }
        }
    }
        
    return promotionIdentifiers;
}

- (nullable SNRPromotionIdentifier *)modelPromotionIdentifierWithDictionary:(NSDictionary *)dictionary {
    if (dictionary != nil) {
        NSString *key = [dictionary getStringForKey:@"key"];
        NSString *value = [dictionary getStringForKey:@"value"];
        
        if ((key != nil && [key isKindOfClass:[NSString class]] == YES) && (value != nil && [value isKindOfClass:[NSString class]] == YES)) {
            if ([key isEqualToString:@"CODE"]) {
                return [[SNRPromotionIdentifier alloc] initWithCode:value];
            }
            
            if ([key isEqualToString:@"UUID"]) {
                return [[SNRPromotionIdentifier alloc] initWithUUID:value];
            }
        }
    }
    
    return nil;
}

#pragma mark - JS Mapping

- (nullable NSDictionary *)dictionaryWithPromotionResponse:(SNRPromotionResponse *)model {
    if (model != nil) {
        NSMutableDictionary *dictionary = [@{} mutableCopy];
        
        SNRPromotionResponseMetadata *metadata = model.metadata;
        if (metadata != nil) {
            [dictionary setInteger:metadata.totalCount forKey:@"totalCount"];
            [dictionary setInteger:metadata.totalPages forKey:@"totalPages"];
            [dictionary setInteger:metadata.page forKey:@"page"];
            [dictionary setInteger:metadata.limit forKey:@"limit"];
            [dictionary setInteger:metadata.code forKey:@"code"];
        }

        NSMutableArray *promotionsArray = [@[] mutableCopy];
        for (SNRPromotion *promotionModel in model.items) {
            [promotionsArray addObject:[self dictionaryWithPromotion:promotionModel]];
        }
        
        [dictionary setArray:promotionsArray forKey:@"items"];
        
        return dictionary;
    }
    
    return nil;
}

- (nullable NSDictionary *)dictionaryWithPromotion:(SNRPromotion *)model {
    if (model != nil) {
        NSMutableDictionary *dictionary = [@{} mutableCopy];
        
        [dictionary setString:model.uuid forKey:@"uuid"];
        [dictionary setString:model.code forKey:@"code"];
        [dictionary setString:SNR_PromotionStatusToString(model.status) forKey:@"status"];
        [dictionary setString:SNR_PromotionTypeToString(model.type) forKey:@"type"];
        [dictionary setDictionary:[self dictionaryWithPromotionDetails:model.details] forKey:@"details"];
        
        [dictionary setNumber:model.redeemLimitPerClient forKey:@"redeemLimitPerClient"];
        [dictionary setNumber:model.redeemQuantityPerActivation forKey:@"redeemQuantityPerActivation"];
        [dictionary setNumber:model.currentRedeemedQuantity forKey:@"currentRedeemedQuantity"];
        [dictionary setNumber:model.currentRedeemLimit forKey:@"currentRedeemLimit"];
        [dictionary setNumber:model.activationCounter forKey:@"activationCounter"];
        [dictionary setNumber:model.possibleRedeems forKey:@"possibleRedeems"];
        [dictionary setNumber:model.requireRedeemedPoints forKey:@"requireRedeemedPoints"];
        
        [dictionary setString:SNR_PromotionDiscountTypeToString(model.discountType) forKey:@"discountType"];
        [dictionary setNumber:model.discountValue forKey:@"discountValue"];
        [dictionary setString:SNR_PromotionDiscountModeToString(model.discountMode) forKey:@"discountMode"];
        [dictionary setDictionary:[self dictionaryWithPromotionDiscountModeDetails:model.discountModeDetails] forKey:@"discountModeDetails"];
        
        [dictionary setNumber:model.priority forKey:@"priority"];
        [dictionary setNumber:model.price forKey:@"price"];
        [dictionary setString:SNR_PromotionItemScopeToString(model.itemScope) forKey:@"itemScope"];
        [dictionary setNumber:model.minBasketValue forKey:@"minBasketValue"];
        [dictionary setNumber:model.maxBasketValue forKey:@"maxBasketValue"];
        
        [dictionary setString:model.name forKey:@"name"];
        [dictionary setString:model.headline forKey:@"headline"];
        [dictionary setString:model.descriptionText forKey:@"descriptionText"];
        [dictionary setArray:model.images forKey:@"images"];

        [dictionary setDate:model.startAt forKey:@"startAt"];
        [dictionary setDate:model.expireAt forKey:@"expireAt"];
        [dictionary setDate:model.lastingAt forKey:@"lastingAt"];
        [dictionary setNumber:model.lastingTime forKey:@"lastingTime"];
        [dictionary setString:model.displayFrom forKey:@"displayFrom"];
        [dictionary setString:model.displayTo forKey:@"displayTo"];
        
        [dictionary setDictionary:model.params forKey:@"params"];
        [dictionary setArray:model.catalogIndexItems forKey:@"catalogIndexItems"];
        [dictionary setArray:model.tags forKey:@"tags"];
        
        return dictionary;
    }
    
    return nil;
}

- (nullable NSDictionary *)dictionaryWithPromotionDetails:(SNRPromotionDetails *)model {
    if (model != nil) {
        NSMutableDictionary *dictionary = [@{} mutableCopy];
        
        [dictionary setDictionary:[self dictionaryWithPromotionDiscountTypeDetails:model.discountType] forKey:@"discountType"];
        
        return dictionary;
    }

    return nil;
}

- (nullable NSDictionary *)dictionaryWithPromotionDiscountTypeDetails:(SNRPromotionDiscountTypeDetails *)model {
    if (model != nil) {
        NSMutableDictionary *dictionary = [@{} mutableCopy];
        
        [dictionary setString:model.name forKey:@"name"];
        [dictionary setBool:model.outerScope forKey:@"outerScope"];
        [dictionary setInteger:model.requiredItemsCount forKey:@"requiredItemsCount"];
        [dictionary setInteger:model.discountedItemsCount forKey:@"discountedItemsCount"];
        
        return dictionary;
    }

    return nil;
}

- (nullable NSDictionary *)dictionaryWithPromotionDiscountModeDetails:(SNRPromotionDiscountModeDetails *)model {
    if (model != nil) {
        NSMutableDictionary *dictionary = [@{} mutableCopy];
        
        NSMutableArray *promotionDiscountSteps = [@[] mutableCopy];
        for (SNRPromotionDiscountStep *promotionDiscountStep in model.discountSteps) {
            NSDictionary *promotionDiscountStepDictionary = [self dictionaryWithPromotionDiscountStep:promotionDiscountStep];
            if (promotionDiscountStepDictionary != nil) {
                [promotionDiscountSteps addObject:promotionDiscountStepDictionary];
            }
        }
        
        [dictionary setArray:promotionDiscountSteps forKey:@"discountSteps"];
        [dictionary setString:SNR_PromotionDiscountUsageTriggerToString(model.discountUsageTrigger) forKey:@"discountUsageTrigger"];
        
        return dictionary;
    }

    return nil;
}

- (nullable NSDictionary *)dictionaryWithPromotionDiscountStep:(SNRPromotionDiscountStep *)model {
    if (model != nil) {
        NSMutableDictionary *dictionary = [@{} mutableCopy];
        
        [dictionary setNumber:model.discountValue forKey:@"discountValue"];
        [dictionary setNumber:model.usageThreshold forKey:@"usageThreshold"];
        
        return dictionary;
    }

    return nil;
}

- (nullable NSDictionary *)dictionaryWithAssignVoucherResponse:(SNRAssignVoucherResponse *)model {
    if (model != nil) {
        NSMutableDictionary *dictionary = [@{} mutableCopy];
        
        [dictionary setString:model.message forKey:@"message"];
        [dictionary setDictionary:[self dictionaryWithAssignVoucherData:model.assignVoucherData] forKey:@"assignVoucherData"];
        
        return dictionary;
    }
    
    return nil;
}

- (nullable NSDictionary *)dictionaryWithVoucherCodesResponse:(SNRVoucherCodesResponse *)model {
    if (model != nil) {
        NSMutableDictionary *dictionary = [@{} mutableCopy];
        
        NSMutableArray *voucherCodesArray = [@[] mutableCopy];
        for (SNRVoucherCodesData *voucherCodesDataModel in model.items) {
            [voucherCodesArray addObject:[self dictionaryWithVoucherCodesData:voucherCodesDataModel]];
        }
        
        [dictionary setArray:voucherCodesArray forKey:@"items"];
        
        return dictionary;
    }
    
    return nil;
}

- (nullable NSDictionary *)dictionaryWithAssignVoucherData:(SNRAssignVoucherData *)model {
    if (model != nil) {
        NSMutableDictionary *dictionary = [@{} mutableCopy];
        
        [dictionary setString:model.code forKey:@"code"];
        [dictionary setDate:model.expireIn forKey:@"expireIn"];
        [dictionary setDate:model.redeemAt forKey:@"redeemAt"];
        [dictionary setDate:model.assignedAt forKey:@"assignedAt"];
        [dictionary setDate:model.createdAt forKey:@"createdAt"];
        [dictionary setDate:model.updatedAt forKey:@"updatedAt"];
        
        return dictionary;
    }
    
    return nil;
}

- (nullable NSDictionary *)dictionaryWithVoucherCodesData:(SNRVoucherCodesData *)model {
    if (model != nil) {
        NSMutableDictionary *dictionary = [@{} mutableCopy];
        
        [dictionary setString:model.code forKey:@"code"];
        [dictionary setString:SNR_VoucherCodeStatusToString(model.status) forKey:@"status"];
        [dictionary setString:model.clientId forKey:@"clientId"];
        [dictionary setString:model.clientUuid forKey:@"clientUuid"];
        [dictionary setString:model.poolUuid forKey:@"poolUuid"];
        [dictionary setDate:model.expireIn forKey:@"expireIn"];
        [dictionary setDate:model.redeemAt forKey:@"redeemAt"];
        [dictionary setDate:model.assignedAt forKey:@"assignedAt"];
        [dictionary setDate:model.createdAt forKey:@"createdAt"];
        [dictionary setDate:model.updatedAt forKey:@"updatedAt"];
        
        return dictionary;
    }
    
    return nil;
}

#pragma mark - JS Module

//getAllPromotions(onSuccess: (promotionResponse: PromotionResponse) => void, onError: (error: Error) => void)

RCT_REMAP_METHOD(getAllPromotions, getAllPromotionsWithResponse:(RCTResponseSenderBlock)response)
{
    [SNRPromotions getPromotionsWithSuccess:^(SNRPromotionResponse *promotionResponse) {
        NSDictionary *promotionResponseDictionary = [self dictionaryWithPromotionResponse:promotionResponse];
        if (promotionResponseDictionary != nil) {
            [self executeSuccessCallbackResponse:response data:promotionResponseDictionary];
        } else {
            [self executeDefaultFailureCallbackResponse:response];
        }
    } failure:^(NSError *error) {
        [self executeFailureCallbackResponse:response error:error];
    }];
}

//getPromotions(apiQuery: PromotionsApiQuery, onSuccess: (promotionResponse: PromotionResponse) => void, onError: (error: Error) => void)

RCT_EXPORT_METHOD(getPromotions:(NSDictionary *)dictionary response:(RCTResponseSenderBlock)response)
{
    SNRPromotionsApiQuery *promotionsApiQuery = [self modelPromotionsApiQueryWithDictionary:dictionary];
    if (promotionsApiQuery != nil) {
        [SNRPromotions getPromotionsWithApiQuery:promotionsApiQuery success:^(SNRPromotionResponse *promotionResponse) {
            NSDictionary *promotionResponseDictionary = [self dictionaryWithPromotionResponse:promotionResponse];
            if (promotionResponseDictionary != nil) {
                [self executeSuccessCallbackResponse:response data:promotionResponseDictionary];
            } else {
                [self executeDefaultFailureCallbackResponse:response];
            }
        } failure:^(NSError *error) {
            [self executeFailureCallbackResponse:response error:error];
        }];
    }
}

//getPromotionByUUID(uuid: string, onSuccess: (promotion: Promotion) => void, onError: (error: Error) => void)

RCT_EXPORT_METHOD(getPromotionByUUID:(NSString *)UUID response:(RCTResponseSenderBlock)response)
{
    [SNRPromotions getPromotionByUuid:UUID success:^(SNRPromotion *promotion) {
        NSDictionary *promotionDictionary = [self dictionaryWithPromotion:promotion];
        if (promotionDictionary != nil) {
            [self executeSuccessCallbackResponse:response data:promotionDictionary];
        } else {
            [self executeDefaultFailureCallbackResponse:response];
        }
    } failure:^(NSError *error) {
        [self executeFailureCallbackResponse:response error:error];
    }];
}

//getPromotionByCode(code: string, onSuccess: (promotion: Promotion) => void, onError: (error: Error) => void)

RCT_EXPORT_METHOD(getPromotionByCode:(NSString *)code response:(RCTResponseSenderBlock)response)
{
    [SNRPromotions getPromotionByCode:code success:^(SNRPromotion *promotion) {
        NSDictionary *promotionDictionary = [self dictionaryWithPromotion:promotion];
        if (promotionDictionary != nil) {
            [self executeSuccessCallbackResponse:response data:promotionDictionary];
        } else {
            [self executeDefaultFailureCallbackResponse:response];
        }
    } failure:^(NSError *error) {
        [self executeFailureCallbackResponse:response error:error];
    }];
}

//activatePromotionByUUID(uuid: string, onSuccess: () => void, onError: (error: Error) => void)

RCT_EXPORT_METHOD(activatePromotionByUUID:(NSString *)UUID response:(RCTResponseSenderBlock)response)
{
    [SNRPromotions activatePromotionByUuid:UUID success:^(BOOL isSuccess) {
        [self executeSuccessCallbackResponse:response data:@1];
    } failure:^(NSError *error) {
        [self executeFailureCallbackResponse:response error:error];
    }];
}

//activatePromotionByCode(code: string, onSuccess: () => void, onError: (error: Error) => void)

RCT_EXPORT_METHOD(activatePromotionByCode:(NSString *)code response:(RCTResponseSenderBlock)response)
{
    [SNRPromotions activatePromotionByCode:code success:^(BOOL isSuccess) {
        [self executeSuccessCallbackResponse:response data:@1];
    } failure:^(NSError *error) {
        [self executeFailureCallbackResponse:response error:error];
    }];
}

//activatePromotionsBatch(promotionsToActivate: Array<PromotionIdentifier>, onSuccess: () => void, onError: (error: Error) => void)

RCT_EXPORT_METHOD(activatePromotionsBatch:(NSArray *)array response:(RCTResponseSenderBlock)response)
{
    NSArray *promotionIdentifiers = [self modelPromotionIdentifiersWithArray:array];
    [SNRPromotions activatePromotionsWithIdentifiers:promotionIdentifiers success:^(BOOL isSuccess) {
        [self executeSuccessCallbackResponse:response data:@1];
    } failure:^(NSError *error) {
        [self executeFailureCallbackResponse:response error:error];
    }];
}

//deactivatePromotionByUUID(uuid: string, onSuccess: () => void, onError: (error: Error) => void)

RCT_EXPORT_METHOD(deactivatePromotionByUUID:(NSString *)UUID response:(RCTResponseSenderBlock)response)
{
    [SNRPromotions deactivatePromotionByUuid:UUID success:^(BOOL isSuccess) {
        [self executeSuccessCallbackResponse:response data:@1];
    } failure:^(NSError *error) {
        [self executeFailureCallbackResponse:response error:error];
    }];
}

//deactivatePromotionByCode(code: string, onSuccess: () => void, onError: (error: Error) => void)

RCT_EXPORT_METHOD(deactivatePromotionByCode:(NSString *)code response:(RCTResponseSenderBlock)response)
{
    [SNRPromotions deactivatePromotionByCode:code success:^(BOOL isSuccess) {
        [self executeSuccessCallbackResponse:response data:@1];
    } failure:^(NSError *error) {
        [self executeFailureCallbackResponse:response error:error];
    }];
}

//deactivatePromotionsBatch(promotionsToDeactivate: Array<PromotionIdentifier>, onSuccess: () => void, onError: (error: Error) => void)

RCT_EXPORT_METHOD(deactivatePromotionsBatch:(NSArray *)array response:(RCTResponseSenderBlock)response)
{
    NSArray *promotionIdentifiers = [self modelPromotionIdentifiersWithArray:array];
    [SNRPromotions deactivatePromotionsWithIdentifiers:promotionIdentifiers success:^(BOOL isSuccess) {
        [self executeSuccessCallbackResponse:response data:@1];
    } failure:^(NSError *error) {
        [self executeFailureCallbackResponse:response error:error];
    }];
}

//getOrAssignVoucher(poolUuid: string, onSuccess: (assignVoucherRespone: AssignVoucherResponse) => void, onError: (error: Error) => void)

RCT_EXPORT_METHOD(getOrAssignVoucher:(NSString *)poolUUID response:(RCTResponseSenderBlock)response)
{
    [SNRPromotions getOrAssignVoucherWithPoolUUID:poolUUID success:^(SNRAssignVoucherResponse *assignVoucherResponse) {
        NSDictionary *assignVoucherResponseDictionary = [self dictionaryWithAssignVoucherResponse:assignVoucherResponse];
        if (assignVoucherResponseDictionary != nil) {
            [self executeSuccessCallbackResponse:response data:assignVoucherResponseDictionary];
        } else {
            [self executeDefaultFailureCallbackResponse:response];
        }
    } failure:^(NSError *error) {
        [self executeFailureCallbackResponse:response error:error];
    }];
}


//assignVoucherCode(poolUuid: string, onSuccess: (assignVoucherRespone: AssignVoucherResponse) => void, onError: (error: Error) => void)

RCT_EXPORT_METHOD(assignVoucherCode:(NSString *)poolUUID response:(RCTResponseSenderBlock)response)
{
    [SNRPromotions assignVoucherCodeWithPoolUUID:poolUUID success:^(SNRAssignVoucherResponse *assignVoucherResponse) {
        NSDictionary *assignVoucherResponseDictionary = [self dictionaryWithAssignVoucherResponse:assignVoucherResponse];
        if (assignVoucherResponseDictionary != nil) {
            [self executeSuccessCallbackResponse:response data:assignVoucherResponseDictionary];
        } else {
            [self executeDefaultFailureCallbackResponse:response];
        }
    } failure:^(NSError *error) {
        [self executeFailureCallbackResponse:response error:error];
    }];
}

//getAssignedVoucherCodes(onSuccess: (voucherCodesResponse: VoucherCodesResponse) => void, onError: (error: Error) => void)

RCT_REMAP_METHOD(getAssignedVoucherCodes, getAssignedVoucherCodesWithResponse:(RCTResponseSenderBlock)response)
{
    [SNRPromotions getAssignedVoucherCodesWithSuccess:^(SNRVoucherCodesResponse *voucherCodesResponse) {
        NSDictionary *voucherCodesResponseDictionary = [self dictionaryWithVoucherCodesResponse:voucherCodesResponse];
        if (voucherCodesResponseDictionary != nil) {
            [self executeSuccessCallbackResponse:response data:voucherCodesResponseDictionary];
        } else {
            [self executeDefaultFailureCallbackResponse:response];
        }
    } failure:^(NSError *error) {
        [self executeFailureCallbackResponse:response error:error];
    }];
}

@end

NS_ASSUME_NONNULL_END
