//
//  RNSyneriseInitializer.m
//  react-native-synerise-sdk
//
//  Created by Synerise
//  Copyright © 2021 Synerise. All rights reserved.
//

#import "RNSyneriseInitializer.h"

@implementation RNSyneriseInitializer

#pragma mark - Public

- (void)initialize {
    dispatch_sync(dispatch_get_main_queue(), ^{
        [self overwriteDefaultSettings];
        
        [SNRSynerise initializeWithClientApiKey:self.clientApiKey andBaseUrl:self.baseURL];
        [SNRSynerise setDebugModeEnabled:self.debugModeEnabled];
        [SNRSynerise setCrashHandlingEnabled:self.crashHandlingEnabled];
        [SNRSynerise setHostApplicationType:SNRHostApplicationTypeReactNative];
    });
}

- (void)initialized {
    [[NSNotificationCenter defaultCenter] postNotificationName:kRNSyneriseJavaScriptDidLoadNotification object:nil userInfo:@{}];
}

- (void)overwriteDefaultSettings {
    SNRSynerise.settings.tracker.autoTracking.enabled = NO;
    
}

@end
