//
//  RNTracker.m
//  react-native-synerise-sdk
//
//  Created by Synerise
//  Copyright © 2018 Synerise. All rights reserved.
//

#import "RNTracker.h"

static NSString * const RNTrackerEventTypeKey = @"type";
static NSString * const RNTrackerEventLabelKey = @"label";
static NSString * const RNTrackerEventActionKey = @"action";
static NSString * const RNTrackerEventParametersKey = @"parameters";

@implementation RNTracker

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(setCustomIdentifier:(NSString *)customIdentifier)
{
    [SNRTracker setCustomIdentifier:customIdentifier];
}

RCT_EXPORT_METHOD(setCustomEmail:(NSString *)customEmail)
{
    [SNRTracker setCustomEmail:customEmail];
}

RCT_EXPORT_METHOD(send:(NSDictionary *)eventDictionary)
{
    NSDictionary *normalizedEventDictionary = [RNReactCommunicationUtils normalizeDictionary:eventDictionary];
    SNREvent *event = [self eventWithEventDictionary:normalizedEventDictionary];
    if (event != nil) {
        [SNRTracker send:event];
    }
}

RCT_REMAP_METHOD(flushEvents, flushEventsWithResponse:(RCTResponseSenderBlock)response)
{
    [SNRTracker flushEventsWithCompletionHandler:^() {
        [self executeSuccessCallbackResponse:response data:@{}];
    }];
}

#pragma mark - Private

- (SNRCustomEvent *)eventWithEventDictionary:(NSDictionary *)eventDictionary {
    NSString *type = eventDictionary[RNTrackerEventTypeKey];
    NSString *label = eventDictionary[RNTrackerEventLabelKey];
    NSString *action = eventDictionary[RNTrackerEventActionKey];
    NSDictionary *parameters = eventDictionary[RNTrackerEventParametersKey];
    
    if (type != nil && label != nil) {
        SNRTrackerParams *params = [SNRTrackerParams makeWithBuilder:^(SNRTrackerParamsBuilder *builder) {
            if (parameters != nil && [parameters count] > 0) {
                for (NSString *paramKey in parameters) {
                    id paramValue = parameters[paramKey];
                    
                    if ([paramValue isKindOfClass:[NSString class]] == YES) {
                        [builder setString:paramValue forKey:paramKey];
                        continue;
                    }
                    
                    if ([paramValue isKindOfClass:[NSNumber class]] == YES) {
                        if ([self isBoolNumber:paramValue] == YES) {
                            [builder setBool:[paramValue boolValue] forKey:paramKey];
                            continue;
                        }
                        
                        if ([self isDoubleNumber:paramValue] == YES) {
                            [builder setDouble:[paramValue doubleValue] forKey:paramKey];
                            continue;
                        }
                        
                        [builder setInt:[paramValue integerValue] forKey:paramKey];
                        continue;
                    }
                    
                    if ([paramValue isKindOfClass:[NSDictionary class]] == YES) {
                        [builder setObject:((NSDictionary *)paramValue) forKey:paramKey];
                        continue;
                    }
                }
            }
        }];
        
        SNRCustomEvent *event = [[SNRCustomEvent alloc] initWithType:type label:label action:action andParams:params];
        
        return event;
    }
    
    return nil;
}

- (BOOL)isDoubleNumber:(NSNumber *)number {
    CFNumberType numberType = CFNumberGetType((CFNumberRef)number);
    
    return (numberType == kCFNumberFloat32Type || numberType == kCFNumberFloat64Type || numberType == kCFNumberFloatType || numberType == kCFNumberDoubleType);
}

- (BOOL)isBoolNumber:(NSNumber *)number {
    CFNumberType numberType = CFNumberGetType((CFNumberRef)number);
    
    return (numberType == kCFNumberCharType);
}

@end
