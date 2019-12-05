//
//  RNPromotions.m
//  react-native-synerise-sdk
//
//  Created by Synerise
//  Copyright © 2018 Synerise. All rights reserved.
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
        
        [dictionary setNumber:model.redeemLimitPerClient forKey:@"redeemLimitPerClient"];
        [dictionary setNumber:model.redeemQuantityPerActivation forKey:@"redeemQuantityPerActivation"];
        [dictionary setNumber:model.currentRedeemedQuantity forKey:@"currentRedeemedQuantity"];
        [dictionary setNumber:model.currentRedeemLimit forKey:@"currentRedeemLimit"];
        [dictionary setNumber:model.activationCounter forKey:@"activationCounter"];
        [dictionary setString:SNR_PromotionDiscountTypeToString(model.discountType) forKey:@"discountType"];
        [dictionary setNumber:model.discountValue forKey:@"discountValue"];
        [dictionary setNumber:model.requireRedeemedPoints forKey:@"requireRedeemedPoints"];
        [dictionary setNumber:model.price forKey:@"price"];
        
        [dictionary setString:model.name forKey:@"name"];
        [dictionary setString:model.headline forKey:@"headline"];
        [dictionary setString:model.descriptionText forKey:@"descriptionText"];
        [dictionary setArray:model.images forKey:@"images"];

        [dictionary setDate:model.startAt forKey:@"startAt"];
        [dictionary setDate:model.expireAt forKey:@"expireAt"];
        [dictionary setDate:model.lastingAt forKey:@"lastingAt"];
        
        [dictionary setDictionary:model.params forKey:@"params"];
        [dictionary setArray:model.catalogIndexItems forKey:@"catalogIndexItems"];
        
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

@end

NS_ASSUME_NONNULL_END
