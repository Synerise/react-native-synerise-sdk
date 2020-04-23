//
//  RNContent.m
//  ReactNativeSynerise
//
//  Created by Krzysztof Kurzawa on 17/04/2020.
//  Copyright © 2020 Facebook. All rights reserved.
//

#import "RNContent.h"

NS_ASSUME_NONNULL_BEGIN

@implementation RNContent

static RNContent *moduleInstance;

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

- (SNRDocumentsApiQuery *)modelDocumentsApiQueryWithDictionary:(NSDictionary *)dictionary {
    if (dictionary != nil) {
        SNRDocumentsApiQueryType type = SNRDocumentsApiQueryTypeBySchema;
        NSString *typeValue = [dictionary getStringForKey:@"typeValue"];
        
        if (typeValue != nil) {
            SNRDocumentsApiQuery *model = [[SNRDocumentsApiQuery alloc] initWithType:type typeValue:typeValue];
            
            model.version = [dictionary getStringForKey:@"version"];
            
            return model;
        }
    }
    
    return nil;
}

- (SNRRecommendationOptions *)modelRecommendationOptionsWithDictionary:(NSDictionary *)dictionary {
    SNRRecommendationOptions *model = [SNRRecommendationOptions new];
    
    if (dictionary != nil) {
        model.slug = [dictionary getStringForKey:@"slug"];
        model.productID = [dictionary getStringForKey:@"productID"];
    }
    
    return model;
}

#pragma mark - JS Mapping

- (nullable NSDictionary *)dictionaryWithRecommendationResponse:(SNRRecommendationResponse *)model {
    if (model != nil) {
        NSMutableDictionary *dictionary = [@{} mutableCopy];
        
        [dictionary setString:model.name forKey:@"name"];
        [dictionary setString:model.campaignHash forKey:@"campaignHash"];
        [dictionary setString:model.campaignID forKey:@"campaignID"];
        
        NSMutableArray *recommendationsArray = [@[] mutableCopy];
        for (SNRRecommendation *recommendationModel in model.items) {
            [recommendationsArray addObject:[self dictionaryWithRecommendation:recommendationModel]];
        }
        
        [dictionary setArray:recommendationsArray forKey:@"items"];
        
        return dictionary;
    }
    
    return nil;
}

- (nullable NSDictionary *)dictionaryWithRecommendation:(SNRRecommendation *)model {
    if (model != nil) {
        NSMutableDictionary *dictionary = [@{} mutableCopy];
        
        [dictionary setString:model.gtin forKey:@"gtin"];
        [dictionary setString:model.productRetailerPartNo forKey:@"productRetailerPartNo"];
        
        [dictionary setString:model.title forKey:@"title"];
        [dictionary setString:model.brand forKey:@"brand"];
        [dictionary setString:model.category forKey:@"category"];
        [dictionary setString:model.descriptionText forKey:@"descriptionText"];
        
        [dictionary setString:model.gender forKey:@"gender"];
        [dictionary setString:model.color forKey:@"color"];
        [dictionary setArray:model.sizes forKey:@"sizes"];
        
        [dictionary setString:model.priceValue forKey:@"priceValue"];
        [dictionary setString:model.effectivePriceValue forKey:@"effectivePriceValue"];
        [dictionary setString:model.salePriceValue forKey:@"salePriceValue"];
        [dictionary setString:model.priceCurrency forKey:@"priceCurrency"];
        
        [dictionary setString:model.link forKey:@"link"];
        [dictionary setString:model.imageLink forKey:@"imageLink"];
        [dictionary setArray:model.additionalImageLinks forKey:@"additionalImageLinks"];
        [dictionary setDictionary:model.customAttributes forKey:@"customAttributes"];
        
        return dictionary;
    }
    
    return nil;
}

#pragma mark - JS Module

//getDocument(slug: String, onSuccess: (documentResponse: Object) => void, onError: (error: Error) => void)

RCT_EXPORT_METHOD(getDocument:(NSString *)slug response:(RCTResponseSenderBlock)response)
{
    [SNRContent getDocument:slug success:^(NSDictionary *document) {
        if (document != nil) {
            [self executeSuccessCallbackResponse:response data:document];
        } else {
            [self executeDefaultFailureCallbackResponse:response];
        }
    } failure:^(NSError *error) {
        [self executeFailureCallbackResponse:response error:error];
    }];
}

//getDocuments(documentsApiQuery: DocumentsApiQuery, onSuccess: (documentResponse: Object) => void, onError: (error: Error) => void)

RCT_EXPORT_METHOD(getDocuments:(NSDictionary *)dictionary response:(RCTResponseSenderBlock)response)
{
    SNRDocumentsApiQuery *documentsApiQuery = [self modelDocumentsApiQueryWithDictionary:dictionary];
    if (documentsApiQuery != nil) {
        [SNRContent getDocumentsWithApiQuery:documentsApiQuery success:^(NSArray *documents) {
            if (documents != nil) {
                [self executeSuccessCallbackResponse:response data:documents];
            } else {
                [self executeDefaultFailureCallbackResponse:response];
            }
        } failure:^(NSError *error) {
            [self executeFailureCallbackResponse:response error:error];
        }];
    }
}

//getRecommendations(recommendationOptions: RecommendationOptions, onSuccess: (recommendationResponse: RecommendationResponse) => void, onError: (error: Error) => void)

RCT_EXPORT_METHOD(getRecommendations:(NSDictionary *)dictionary response:(RCTResponseSenderBlock)response)
{
    SNRRecommendationOptions *recommendationOptions = [self modelRecommendationOptionsWithDictionary:dictionary];
    if (recommendationOptions != nil) {
        [SNRContent getRecommendations:recommendationOptions success:^(SNRRecommendationResponse *recommendationResponse) {
            if (recommendationResponse != nil) {
                NSDictionary *recommendationResponseDictionary = [self dictionaryWithRecommendationResponse:recommendationResponse];
                if (recommendationResponseDictionary != nil) {
                    [self executeSuccessCallbackResponse:response data:recommendationResponseDictionary];
                } else {
                    [self executeDefaultFailureCallbackResponse:response];
                }
            } else {
                [self executeDefaultFailureCallbackResponse:response];
            }
        } failure:^(NSError *error) {
            [self executeFailureCallbackResponse:response error:error];
        }];
    }
}

@end

NS_ASSUME_NONNULL_END
