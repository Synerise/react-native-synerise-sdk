//
//  ReactNativeSynerise.h
//  react-native-synerise-sdk
//
//  Created by Synerise
//  Copyright © 2018 Synerise. All rights reserved.
//

#import <Foundation/Foundation.h>

#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

#import <SyneriseSDK/SyneriseSDK.h>

#import "NSDictionary+ReactNative.h"
#import "NSMutableDictionary+ReactNative.h"

#import "RNSyneriseManager.h"

static NSString * const kRNSyneriseJavaScriptDidLoadNotification = @"kRNSyneriseJavaScriptDidLoadNotification";

static NSString * const kRNSyneriseInitializationSuccessEvent = @"kRNSyneriseInitializationSuccessEvent";
static NSString * const kRNSyneriseInitializationFailureEvent = @"kRNSyneriseInitializationFailureEvent";

static NSString * const kRNSyneriseRegistrationTokenEvent = @"kRNSyneriseRegistrationTokenEvent";
static NSString * const kRNSyneriseRegistrationRequiredEvent = @"kRNSyneriseRegistrationRequiredEvent";
static NSString * const kRNSyneriseNotificationEvent = @"kRNSyneriseNotificationEvent";

static NSString * const kRNSyneriseUrlActionEvent = @"kRNSyneriseUrlActionEvent";
static NSString * const kRNSyneriseDeepLinkActionEvent = @"kRNSyneriseDeepLinkActionEvent";

static NSString * const kRNSyneriseBannerPresentedEvent = @"kRNSyneriseBannerPresentedEvent";
static NSString * const kRNSyneriseBannerHiddenEvent = @"kRNSyneriseBannerHiddenEvent";

static NSString * const kRNSyneriseWalkthroughLoadedEvent = @"kRNSyneriseWalkthroughLoadedEvent";
static NSString * const kRNSyneriseWalkthroughLoadingErrorEvent = @"kRNSyneriseWalkthroughLoadingErrorEvent";
static NSString * const kRNSyneriseWalkthroughPresentedEvent = @"kRNSyneriseWalkthroughPresentedEvent";
static NSString * const kRNSyneriseWalkthroughHiddenEvent = @"kRNSyneriseWalkthroughHiddenEvent";
