//
//  RNSyneriseDispatcher.m
//  react-native-synerise-sdk
//
//  Created by Synerise
//  Copyright © 2021 Synerise. All rights reserved.
//

#import "RNSyneriseEventEmitter.h"

@implementation RNSyneriseEventEmitter

RCT_EXPORT_MODULE();

- (NSArray<NSString *> *)supportedEvents {
    return @[
        kRNSyneriseInitializationSuccessEvent,
        kRNSyneriseInitializationFailureEvent,
        kRNSyneriseRegistrationTokenEvent,
        kRNSyneriseRegistrationRequiredEvent,
        kRNSyneriseNotificationEvent,
        kRNSyneriseUrlActionEvent,
        kRNSyneriseDeepLinkActionEvent,
        kRNSyneriseBannerPresentedEvent,
        kRNSyneriseBannerHiddenEvent,
        kRNSyneriseWalkthroughLoadedEvent,
        kRNSyneriseWalkthroughLoadingErrorEvent,
        kRNSyneriseWalkthroughPresentedEvent,
        kRNSyneriseWalkthroughHiddenEvent

    ];
}

- (void)startObserving {
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(sendEventToJSWithNotification:) name:kRNSyneriseInitializationSuccessEvent object:nil];
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(sendEventToJSWithNotification:) name:kRNSyneriseInitializationFailureEvent object:nil];
    
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(sendEventToJSWithNotification:) name:kRNSyneriseRegistrationTokenEvent object:nil];
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(sendEventToJSWithNotification:) name:kRNSyneriseRegistrationRequiredEvent object:nil];
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(sendEventToJSWithNotification:) name:kRNSyneriseNotificationEvent object:nil];
    
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(sendEventToJSWithNotification:) name:kRNSyneriseUrlActionEvent object:nil];
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(sendEventToJSWithNotification:) name:kRNSyneriseDeepLinkActionEvent object:nil];
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(sendEventToJSWithNotification:) name:kRNSyneriseBannerPresentedEvent object:nil];
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(sendEventToJSWithNotification:) name:kRNSyneriseBannerHiddenEvent object:nil];
    
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(sendEventToJSWithNotification:) name:kRNSyneriseWalkthroughLoadedEvent object:nil];
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(sendEventToJSWithNotification:) name:kRNSyneriseWalkthroughLoadingErrorEvent object:nil];
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(sendEventToJSWithNotification:) name:kRNSyneriseWalkthroughPresentedEvent object:nil];
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(sendEventToJSWithNotification:) name:kRNSyneriseWalkthroughHiddenEvent object:nil];
}

- (void)stopObserving {
    [[NSNotificationCenter defaultCenter] removeObserver:self];
}

- (void)sendEventToJSWithNotification:(NSNotification *)notification {
    [self sendEventWithName:notification.name body:notification.userInfo];
}

@end
