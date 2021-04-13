//
//  RNContent.m
//  react-native-synerise-sdk
//
//  Created by Synerise
//  Copyright © 2021 Synerise. All rights reserved.
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
    NSString *slug = [dictionary getStringForKey:@"slug"];
    SNRRecommendationOptions *model = [[SNRRecommendationOptions alloc] initWithSlug:slug];
    
    if (dictionary != nil) {
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
        
        [dictionary setString:model.itemID forKey:@"itemID"];
        [dictionary setDictionary:model.attributes forKey:@"attributes"];
        
        return dictionary;
    }
    
    return nil;
}

- (nullable NSDictionary *)dictionaryWithScreenViewResponse:(SNRScreenViewResponse *)model {
    if (model != nil) {
        NSMutableDictionary *dictionary = [@{} mutableCopy];
        
        [dictionary setDictionary:[self dictionaryWithScreenViewAudience:model.audience] forKey:@"audience"];
        
        [dictionary setString:model.identifier forKey:@"identifier"];
        [dictionary setString:model.hashString forKey:@"hashString"];
        [dictionary setString:model.path forKey:@"path"];
        [dictionary setString:model.name forKey:@"name"];
        [dictionary setInteger:model.priority.integerValue forKey:@"priority"];
        [dictionary setString:model.descriptionText forKey:@"descriptionText"];
        
        [dictionary setGenericObject:model.data forKey:@"data"];
        
        [dictionary setString:model.version forKey:@"version"];
        [dictionary setString:model.parentVersion forKey:@"parentVersion"];
        
        [dictionary setDate:model.createdAt forKey:@"createdAt"];
        [dictionary setDate:model.updatedAt forKey:@"updatedAt"];
        [dictionary setDate:model.deletedAt forKey:@"deletedAt"];
        
        return dictionary;
    }
    
    return nil;
}

- (nullable NSDictionary *)dictionaryWithScreenViewAudience:(SNRScreenViewAudience *)model {
    if (model != nil) {
        NSMutableDictionary *dictionary = [@{} mutableCopy];
        
        [dictionary setArray:model.IDs forKey:@"IDs"];
        [dictionary setString:model.query forKey:@"query"];
        
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

//getScreenView(onSuccess: (screenViewResponse: ScreenViewResponse) => void, onError: (error: Error) => void)

RCT_REMAP_METHOD(getScreenView, getScreenViewWithResponse:(RCTResponseSenderBlock)response)
{
    [SNRContent getScreenViewWithSuccess:^(SNRScreenViewResponse *screenViewResponse) {
        if (screenViewResponse != nil) {
            NSDictionary *screenViewResponseDictionary = [self dictionaryWithScreenViewResponse:screenViewResponse];
            if (screenViewResponseDictionary != nil) {
                [self executeSuccessCallbackResponse:response data:screenViewResponseDictionary];
            } else {
                [self executeDefaultFailureCallbackResponse:response];
            }
        }
    } failure:^(NSError *error) {
        [self executeFailureCallbackResponse:response error:error];
    }];
}

@end

NS_ASSUME_NONNULL_END
