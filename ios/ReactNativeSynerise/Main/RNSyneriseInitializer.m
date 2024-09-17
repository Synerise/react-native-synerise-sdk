//
//  RNSyneriseInitializer.m
//  react-native-synerise-sdk
//
//  Created by Synerise
//  Copyright © 2021 Synerise. All rights reserved.
//

#import "RNSyneriseInitializer.h"

NSString * const SNRSyneriseSDKPluginVersion = @"0.23.1";

@implementation RNSyneriseInitializer

#pragma mark - Public

- (void)initializeSynerise {
    dispatch_async(dispatch_get_main_queue(), ^{
        [self overwriteDefaultSettings];
        
        [SNRSynerise initializeWithClientApiKey:self.clientApiKey andBaseUrl:self.baseURL];
        
        if (self.requestValidationSalt != nil) {
            [SNRSynerise setRequestValidationSalt:self.requestValidationSalt];
        }
        
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
