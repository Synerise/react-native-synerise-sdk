//
//  RNSyneriseManager.h
//  react-native-synerise-sdk
//
//  Created by Synerise
//  Copyright © 2021 Synerise. All rights reserved.
//

#import "ReactNativeSynerise.h"

@class RNInjector;
@class RNNotifications;

NS_ASSUME_NONNULL_BEGIN

@protocol RNSyneriseManagerDelegate <NSObject>

@optional
- (void)applicationJavaScriptDidLoad;
- (void)syneriseJavaScriptDidLoad;

@end

@interface RNSyneriseManager : NSObject

@property (weak, nonatomic, nullable, readwrite) RNInjector *injector;
@property (weak, nonatomic, nullable, readwrite) RNNotifications *notifications;

+ (instancetype)sharedInstance;

- (void)addDelegate:(id<RNSyneriseManagerDelegate>)delegate;

- (BOOL)isApplicationJavaScriptLoaded;
- (BOOL)isSyneriseJavaScriptLoaded;

@end

NS_ASSUME_NONNULL_END
