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

- (SNRDocumentApiQuery *)modelDocumentApiQueryWithDictionary:(NSDictionary *)dictionary {
    if (dictionary != nil) {
        NSString *slug = [dictionary getStringForKey:@"slug"];
        if (slug != nil) {
            SNRDocumentApiQuery *model = [[SNRDocumentApiQuery alloc] initWithSlug:slug];
            model.productId = [dictionary getStringForKey:@"productId"];
            model.itemsIds = [dictionary getArrayForKey:@"itemsIds"];
            model.itemsExcluded = [dictionary getArrayForKey:@"itemsExcluded"];

            model.additionalFilters = [dictionary getStringForKey:@"additionalFilters"];
            if (dictionary[@"filtersJoiner"] != nil) {
                model.filtersJoiner =  ([self modelFiltersJoiner:[dictionary getStringForKey:@"filtersJoiner"]]);
            }
            
            model.additionalElasticFilters = [dictionary getStringForKey:@"additionalElasticFilters"];
            if (dictionary[@"elasticFiltersJoiner"] != nil) {
                model.elasticFiltersJoiner = ([self modelFiltersJoiner:[dictionary getStringForKey:@"elasticFiltersJoiner"]]);
            }
            
            model.displayAttribute = [dictionary getArrayForKey:@"displayAttribute"];
            model.includeContextItems = [dictionary getBoolForKey:@"includeContextItems"];
            
            return model;
        }
    }
    
    return nil;
}

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
    if (dictionary != nil) {
        NSString *slug = [dictionary getStringForKey:@"slug"];
        if (slug != nil) {
            SNRRecommendationOptions *model = [[SNRRecommendationOptions alloc] initWithSlug:slug];
            model.productID = [dictionary getStringForKey:@"productID"];
            model.productIDs = [dictionary getArrayForKey:@"itemsIds"];
            model.itemsExcluded = [dictionary getArrayForKey:@"itemsExcluded"];
            
            model.additionalFilters = [dictionary getStringForKey:@"additionalFilters"];
            if (dictionary[@"filtersJoiner"] != nil) {
                model.filtersJoiner =  ([self modelFiltersJoiner:[dictionary getStringForKey:@"filtersJoiner"]]);
            }
            
            model.additionalElasticFilters = [dictionary getStringForKey:@"additionalElasticFilters"];
            if (dictionary[@"elasticFiltersJoiner"] != nil) {
                model.elasticFiltersJoiner = ([self modelFiltersJoiner:[dictionary getStringForKey:@"elasticFiltersJoiner"]]);
            }
            
            model.displayAttribute = [dictionary getArrayForKey:@"displayAttribute"];
            model.includeContextItems = [dictionary getBoolForKey:@"includeContextItems"];
            
            return model;
        }
    }
    
    return nil;
}

- (SNRScreenViewApiQuery *)modelScreenViewApiQueryWithDictionary:(NSDictionary *)dictionary {
    if (dictionary != nil) {
        NSString *feedSlug = [dictionary getStringForKey:@"feedSlug"];
        if (feedSlug != nil) {
            SNRScreenViewApiQuery *model = [[SNRScreenViewApiQuery alloc] initWithFeedSlug:feedSlug productID:nil];
            model.productID = [dictionary getStringForKey:@"productId"];
            
            return model;
        }
    }
    
    return nil;
}

- (SNRRecommendationFiltersJoinerRule)modelFiltersJoiner:(NSString *)string {
    if ([string isEqualToString:@"AND"]) {
        return SNRRecommendationFiltersJoinerRuleAnd;
    } else if ([string isEqualToString:@"OR"]) {
        return SNRRecommendationFiltersJoinerRuleOr;
    } else if ([string isEqualToString:@"REPLACE"]) {
        return SNRRecommendationFiltersJoinerRuleReplace;
    } else {
        return -1;
    }
}

#pragma mark - JS Mapping

- (nullable NSDictionary *)dictionaryWithDocument:(SNRDocument *)model {
    if (model != nil) {
        NSMutableDictionary *dictionary = [@{} mutableCopy];
        
        [dictionary setString:model.identifier forKey:@"uuid"];
        [dictionary setString:model.slug forKey:@"slug"];
        [dictionary setString:model.schema forKey:@"schema"];
        [dictionary setDictionary:model.content forKey:@"content"];
        
        return dictionary;
    }
    
    return nil;
}

- (nullable NSDictionary *)dictionaryWithRecommendationResponse:(SNRRecommendationResponse *)model {
    if (model != nil) {
        NSMutableDictionary *dictionary = [@{} mutableCopy];
        
        [dictionary setString:model.name forKey:@"name"];
        [dictionary setString:model.campaignHash forKey:@"campaignHash"];
        [dictionary setString:model.campaignID forKey:@"campaignId"];
        [dictionary setString:model.correlationID forKey:@"correlationId"];
        [dictionary setString:model.schema forKey:@"schema"];
        [dictionary setString:model.slug forKey:@"slug"];
        [dictionary setString:model.UUID forKey:@"uuid"];

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

- (nullable NSDictionary *)dictionaryWithScreenView:(SNRScreenView *)model {
    if (model != nil) {
        NSMutableDictionary *dictionary = [@{} mutableCopy];
        
        [dictionary setString:model.identifier forKey:@"identifier"];
        [dictionary setString:model.name forKey:@"name"];
        [dictionary setString:model.hashString forKey:@"hashString"];
        [dictionary setString:model.path forKey:@"path"];
        [dictionary setInteger:model.priority forKey:@"priority"];
        [dictionary setDictionary:[self dictionaryWithScreenViewAudienceInfo:model.audience] forKey:@"audience"];
        
        [dictionary setGenericObject:model.data forKey:@"data"];
        
        [dictionary setDate:model.createdAt forKey:@"createdAt"];
        [dictionary setDate:model.updatedAt forKey:@"updatedAt"];
        
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

- (nullable NSDictionary *)dictionaryWithScreenViewAudienceInfo:(SNRScreenViewAudienceInfo *)model {
    if (model != nil) {
        NSMutableDictionary *dictionary = [@{} mutableCopy];
        
        [dictionary setArray:model.segments forKey:@"segments"];
        [dictionary setString:model.query forKey:@"query"];
        [dictionary setString:model.targetType forKey:@"targetType"];
        
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

//generateDocument(slug: string, onSuccess: (document: Document) => void, onError: (error: Error) => void)

RCT_EXPORT_METHOD(generateDocument:(NSString *)slug response:(RCTResponseSenderBlock)response)
{
    [SNRContent generateDocument:slug success:^(SNRDocument *document) {
        NSDictionary *documentDictionary = [self dictionaryWithDocument:document];
        if (documentDictionary != nil) {
            [self executeSuccessCallbackResponse:response data:documentDictionary];
        } else {
            [self executeDefaultFailureCallbackResponse:response];
        }
    } failure:^(NSError *error) {
        [self executeFailureCallbackResponse:response error:error];
    }];
}

//generateDocumentWithApiQuery(apiQuery: DocumentApiQuery, onSuccess: (document: Document) => void, onError: (error: Error) => void)

RCT_EXPORT_METHOD(generateDocumentWithApiQuery:(NSDictionary *)dictionary response:(RCTResponseSenderBlock)response)
{
    SNRDocumentApiQuery *documentApiQuery = [self modelDocumentApiQueryWithDictionary:dictionary];
    if (documentApiQuery != nil) {
        [SNRContent generateDocumentWithApiQuery:documentApiQuery success:^(SNRDocument *document) {
            NSDictionary *documentDictionary = [self dictionaryWithDocument:document];
            if (documentDictionary != nil) {
                [self executeSuccessCallbackResponse:response data:documentDictionary];
            } else {
                [self executeDefaultFailureCallbackResponse:response];
            }
        } failure:^(NSError *error) {
            [self executeFailureCallbackResponse:response error:error];
        }];
    }
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

//getRecommendations(options: RecommendationOptions, onSuccess: (recommendationResponse: RecommendationResponse) => void, onError: (error: Error) => void)

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

//getRecommendationsV2(options: RecommendationOptions, onSuccess: (recommendationResponse: RecommendationResponse)

RCT_EXPORT_METHOD(getRecommendationsV2:(NSDictionary *)dictionary response:(RCTResponseSenderBlock)response)
{
    SNRRecommendationOptions *recommendationOptions = [self modelRecommendationOptionsWithDictionary:dictionary];
    if (recommendationOptions != nil) {
        [SNRContent getRecommendationsV2:recommendationOptions success:^(SNRRecommendationResponse *recommendationResponse) {
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

//generateScreenView(feedSlug: string, onSuccess: (screenView: ScreenView) => void, onError: (error: Error) => void)

RCT_EXPORT_METHOD(generateScreenView:(NSString *)feedSlug response:(RCTResponseSenderBlock)response)
{
    [SNRContent generateScreenView:feedSlug success:^(SNRScreenView *screenView) {
        if (screenView != nil) {
            NSDictionary *screenViewDictionary = [self dictionaryWithScreenView:screenView];
            if (screenViewDictionary != nil) {
                [self executeSuccessCallbackResponse:response data:screenViewDictionary];
            } else {
                [self executeDefaultFailureCallbackResponse:response];
            }
        }
    } failure:^(NSError *error) {
        [self executeFailureCallbackResponse:response error:error];
    }];
}

//generateScreenViewWithApiQuery(apiQuery: ScreenViewApiQuery, onSuccess: (screenView: ScreenView) => void, onError: (error: Error) => void)

RCT_EXPORT_METHOD(generateScreenViewWithApiQuery:(NSDictionary *)dictionary response:(RCTResponseSenderBlock)response)
{
    SNRScreenViewApiQuery *screenViewApiQuery = [self modelScreenViewApiQueryWithDictionary:dictionary];
    if (screenViewApiQuery != nil) {
        [SNRContent generateScreenViewWithApiQuery:screenViewApiQuery success:^(SNRScreenView *screenView) {
            if (screenView != nil) {
                NSDictionary *screenViewDictionary = [self dictionaryWithScreenView:screenView];
                if (screenViewDictionary != nil) {
                    [self executeSuccessCallbackResponse:response data:screenViewDictionary];
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
