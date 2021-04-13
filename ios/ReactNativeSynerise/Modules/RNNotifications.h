//
//  RNNotifications.h
//  react-native-synerise-sdk
//
//  Created by Synerise
//  Copyright © 2021 Synerise. All rights reserved.
//

#import "RNBaseModule.h"

NS_ASSUME_NONNULL_BEGIN

@interface RNNotifications : RNBaseModule <RCTBridgeModule>

+ (void)didChangeRegistrationToken:(NSString *)registrationToken;
+ (void)didReceiveNotification:(NSDictionary *)userInfo;

- (void)executeRegistrationRequired;

@end

NS_ASSUME_NONNULL_END
