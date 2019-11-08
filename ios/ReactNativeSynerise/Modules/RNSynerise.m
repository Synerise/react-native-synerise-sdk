//
//  RNSynerise.m
//  react-native-synerise-sdk
//
//  Created by Synerise
//  Copyright © 2018 Synerise. All rights reserved.
//

#import "RNSynerise.h"
#import "RNConstants.h"
#import "RNSyneriseInitializer.h"

@interface RNSynerise ()

@property (strong, nonatomic, nullable, readwrite) RNSyneriseInitializer *initializer;

@end

@implementation RNSynerise

RCT_EXPORT_MODULE();

#pragma mark - Synerise Initializer

RCT_EXPORT_METHOD(createInitializer) {
    if (self.initializer == nil) {
        self.initializer = [RNSyneriseInitializer new];
    }
}

RCT_EXPORT_METHOD(withClientApiKey:(NSString *)clientApiKey) {
    if (clientApiKey == nil) {
        return;
    }
    
    self.initializer.clientApiKey = clientApiKey;
}

RCT_EXPORT_METHOD(withBaseUrl:(NSString *)baseUrl) {
    if (baseUrl == nil) {
        return;
    }
    
    self.initializer.baseURL = baseUrl;
}

RCT_EXPORT_METHOD(withDebugModeEnabled:(BOOL)debugModeEnabled) {
    self.initializer.debugModeEnabled = debugModeEnabled;
}

RCT_EXPORT_METHOD(withCrashHandlingEnabled:(BOOL)crashHandlingEnabled) {
    self.initializer.crashHandlingEnabled = crashHandlingEnabled;
}

RCT_EXPORT_METHOD(initialize) {
    if (self.initializer != nil) {
        [self.initializer initialize];
    }
}

@end
