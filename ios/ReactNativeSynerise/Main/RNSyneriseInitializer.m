//
//  RNSyneriseInitializer.m
//  react-native-synerise-sdk
//
//  Created by Synerise
//  Copyright © 2021 Synerise. All rights reserved.
//

#import "RNSyneriseInitializer.h"

NSString * const SNRSyneriseSDKPluginVersion = @"1.3.3";

@implementation RNSyneriseInitializer

#pragma mark - Public

- (void)initializeSynerise {
    dispatch_async(dispatch_get_main_queue(), ^{
        [self overwriteDefaultSettings];
        
        SNRInitializationConfig *initializationConfig = [SNRInitializationConfig new];
        if (self.requestValidationSalt != nil) {
            initializationConfig.requestValidationSalt = self.requestValidationSalt;
        }
        if (self.initialDoNotTrack != nil) {
            initializationConfig.initialDoNotTrack = [self.initialDoNotTrack boolValue];
        }

        [SNRSynerise initializeWithApiKey:self.apiKey andBaseUrl:self.baseURL config:initializationConfig];
        [SNRSynerise setDebugModeEnabled:self.debugModeEnabled];
        [SNRSynerise setCrashHandlingEnabled:self.crashHandlingEnabled];
        [SNRSynerise setHostApplicationType:SNRHostApplicationTypeReactNative];
        [SNRSynerise setHostApplicationSDKPluginVersion:SNRSyneriseSDKPluginVersion];
    });
}

- (void)syneriseInitialized {
    [[NSNotificationCenter defaultCenter] postNotificationName:kRNSyneriseJavaScriptDidLoadNotification object:nil userInfo:@{}];
}

- (void)overwriteDefaultSettings {
    SNRSynerise.settings.tracker.autoTracking.enabled = NO;
    
}

@end
