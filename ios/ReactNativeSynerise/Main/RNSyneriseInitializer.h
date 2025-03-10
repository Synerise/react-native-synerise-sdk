//
//  RNSyneriseInitializer.h
//  react-native-synerise-sdk
//
//  Created by Synerise
//  Copyright © 2021 Synerise. All rights reserved.
//

#import "ReactNativeSynerise.h"

NS_ASSUME_NONNULL_BEGIN

@interface RNSyneriseInitializer : NSObject

@property (copy, nonatomic, nullable, readwrite) NSString *apiKey;
@property (copy, nonatomic, nullable, readwrite) NSString *baseURL;
@property (copy, nonatomic, nullable, readwrite) NSString *requestValidationSalt;
@property (assign, nonatomic, readwrite) BOOL debugModeEnabled;
@property (assign, nonatomic, readwrite) BOOL crashHandlingEnabled;

- (void)initializeSynerise;
- (void)syneriseInitialized;

@end

NS_ASSUME_NONNULL_END
