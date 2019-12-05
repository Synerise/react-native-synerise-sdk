//
//  RNSyneriseInitializer.m
//  react-native-synerise-sdk
//
//  Created by Synerise
//  Copyright © 2018 Synerise. All rights reserved.
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
    });
}

- (void)initialized {
    [[NSNotificationCenter defaultCenter] postNotificationName:kRNSyneriseJavaScriptDidLoadNotification object:nil userInfo:@{}];
}

- (void)overwriteDefaultSettings {
    SNRSynerise.settings.sdk.enabled = YES;
    
    SNRSynerise.settings.notifications.enabled = YES;
    SNRSynerise.settings.notifications.disableInAppAlerts = NO;
    SNRSynerise.settings.notifications.appGroupIdentifier = nil;
    
    SNRSynerise.settings.tracker.locationAutomatic = NO;
    
    SNRSynerise.settings.tracker.autoTracking.enabled = NO;
    
    SNRSynerise.settings.tracker.tracking.enabled = YES;
    
    SNRSynerise.settings.injector.automatic = NO;
}

@end
