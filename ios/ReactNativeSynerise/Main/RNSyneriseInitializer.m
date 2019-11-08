//
//  RNSyneriseInitializer.m
//  react-native-synerise-sdk
//
//  Created by Synerise
//  Copyright © 2018 Synerise. All rights reserved.
//

#import "RNSyneriseInitializer.h"

@implementation RNSyneriseInitializer

- (void)initialize {
    dispatch_async(dispatch_get_main_queue(), ^{
        [self overwriteDefaultSettings];
        
        [SNRSynerise initializeWithClientApiKey:self.clientApiKey andBaseUrl:self.baseURL];
        [SNRSynerise setDebugModeEnabled:self.debugModeEnabled];
        [SNRSynerise setCrashHandlingEnabled:self.crashHandlingEnabled];
    });
}

- (void)overwriteDefaultSettings {
    SNRSynerise.settings.notifications.enabled = NO;
    SNRSynerise.settings.tracker.autoTracking.enabled = NO;
    SNRSynerise.settings.tracker.tracking.enabled = YES;
}

- (void)setApplicationOrigin {
    //TODO: pomyśleć co zrobić ze stałymi
//    NSUserDefaults *userDefaults = [[NSUserDefaults alloc] initWithSuiteName:@"com.synerise.sdk"];
//    [userDefaults setObject:@"REACT_NATIVE" forKey:@"app.origin"];
//    [userDefaults synchronize];
}

@end
