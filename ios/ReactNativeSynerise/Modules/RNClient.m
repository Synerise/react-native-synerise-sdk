//
//  RNClient.m
//  react-native-synerise-sdk
//
//  Created by Synerise
//  Copyright © 2021 Synerise. All rights reserved.
//

#import "RNClient.h"
#import "RNClient+Functions.h"

static NSString * const RNClientEventListenerClientIsSignedInKey = @"CLIENT_SIGNED_IN_LISTENER_KEY";
static NSString * const RNClientEventListenerClientIsSignedOutKey = @"CLIENT_SIGNED_OUT_LISTENER_KEY";

NS_ASSUME_NONNULL_BEGIN

@interface RNClient () <RNSyneriseManagerDelegate, SNRClientStateDelegate>

@end

@implementation RNClient

static RNClient *moduleInstance;

RCT_EXPORT_MODULE();

#pragma mark - Lifecycle

- (instancetype)init {
    if (moduleInstance != nil) {
        return moduleInstance;
    }
    
    self = [super init];
    
    if (self) {
        [[RNSyneriseManager sharedInstance] addDelegate:self];
    }
    
    moduleInstance = self;
    
    return self;
}

#pragma mark - Private

- (void)sendClientIsSignedInToJS {
    [[NSNotificationCenter defaultCenter] postNotificationName:kRNSyneriseClientIsSignedInEvent object:nil userInfo:nil];
}

- (void)sendClientIsSignedOutToJS:(SNRClientSessionEndReason)reason {
    NSDictionary *userInfo = @{
        @"reason": [self stringWithClientSessionEndReason:reason]
    };
    [[NSNotificationCenter defaultCenter] postNotificationName:kRNSyneriseClientIsSignedOutEvent object:nil userInfo:userInfo];
}

#pragma mark - RNSyneriseManagerDelegate

- (void)applicationJavaScriptDidLoad {
    // nothing for yet
}

- (void)syneriseJavaScriptDidLoad {
    [SNRClient setClientStateDelegate:self];
}

#pragma mark - SNRClientStateDelegate


- (void)SNR_clientIsSignedIn {
    [self sendClientIsSignedInToJS];
}

- (void)SNR_clientIsSignedOutWithReason:(SNRClientSessionEndReason)reason {
    [self sendClientIsSignedOutToJS:reason];
}

#pragma mark - SDK Mapping

- (nullable SNRClientRegisterAccountContext *)modelClientRegisterAccountContextWithDictionary:(nullable NSDictionary *)dictionary {
    if (dictionary != nil) {
        NSString *email = [dictionary getStringForKey:@"email"];
        NSString *password = [dictionary getStringForKey:@"password"];
        
        if (email != nil && password != nil) {
            SNRClientRegisterAccountContext *model = [[SNRClientRegisterAccountContext alloc] initWithEmail:email andPassword:password];
            model.phone = [dictionary getStringForKey:@"phone"];
            model.customId = [dictionary getStringForKey:@"customId"];

            model.firstName = [dictionary getStringForKey:@"firstName"];
            model.lastName = [dictionary getStringForKey:@"lastName"];
            model.sex = SNR_StringToClientSex([dictionary getStringForKey:@"sex"]);

            model.company = [dictionary getStringForKey:@"company"];
            model.address = [dictionary getStringForKey:@"address"];
            model.city = [dictionary getStringForKey:@"city"];
            model.province = [dictionary getStringForKey:@"province"];
            model.zipCode = [dictionary getStringForKey:@"zipCode"];
            model.countryCode = [dictionary getStringForKey:@"countryCode"];
            
            model.agreements = [self modelClientAgreementsWithDictionary:[dictionary getDictionaryForKey:@"agreements"]];

            model.attributes = [dictionary getDictionaryForKey:@"attributes"];
            
            return model;
        }
    }
    
    return nil;
}

- (nullable SNRClientAuthenticationContext *)modelClientAuthenticationContextWithDictionary:(nullable NSDictionary *)dictionary {
    if (dictionary != nil) {
        SNRClientAuthenticationContext *model = [SNRClientAuthenticationContext new];
        model.attributes = [dictionary getDictionaryForKey:@"attributes"];
        model.agreements = [self modelClientAgreementsWithDictionary:[dictionary getDictionaryForKey:@"agreements"]];
        
        return model;
    }
    
    return nil;
}

- (nullable SNRClientConditionalAuthenticationContext *)modelClientConditionalAuthenticationContextWithDictionary:(nullable NSDictionary *)dictionary {
    if (dictionary != nil) {
        SNRClientConditionalAuthenticationContext *model = [SNRClientConditionalAuthenticationContext new];
        model.attributes = [dictionary getDictionaryForKey:@"attributes"];
        model.agreements = [self modelClientAgreementsWithDictionary:[dictionary getDictionaryForKey:@"agreements"]];
        
        return model;
    }
    
    return nil;
}

- (nullable SNRClientSimpleAuthenticationData *)modelClientSimpleAuthenticationDataWithDictionary:(nullable NSDictionary *)dictionary {
    if (dictionary != nil) {
        SNRClientSimpleAuthenticationData *model = [SNRClientSimpleAuthenticationData new];
        model.email = [[dictionary getStringForKey:@"email"] lowercaseString];
        model.phone = [dictionary getStringForKey:@"phone"];
        model.customId = [dictionary getStringForKey:@"customId"];
        model.uuid = [dictionary getStringForKey:@"uuid"];
                                                
        model.firstName = [dictionary getStringForKey:@"firstName"];
        model.lastName = [dictionary getStringForKey:@"lastName"];
        model.displayName = [dictionary getStringForKey:@"displayName"];
        model.sex = SNR_StringToClientSex([dictionary getStringForKey:@"sex"]);
        model.birthDate = [dictionary getStringForKey:@"birthDate"];
        model.avatarUrl = [dictionary getStringForKey:@"avatarUrl"];
                                                
        model.company = [dictionary getStringForKey:@"company"];
        model.address = [dictionary getStringForKey:@"address"];
        model.city = [dictionary getStringForKey:@"city"];
        model.province = [dictionary getStringForKey:@"province"];
        model.zipCode = [dictionary getStringForKey:@"zipCode"];
        model.countryCode = [dictionary getStringForKey:@"countryCode"];
        
        model.agreements = [self modelClientAgreementsWithDictionary:[dictionary getDictionaryForKey:@"agreements"]];

        model.attributes = [dictionary getDictionaryForKey:@"attributes"];
        
        return model;
    }
    
    return nil;
}

- (nullable SNRClientUpdateAccountBasicInformationContext *)modelClientUpdateAccountBasicInformationContextWithDictionary:(nullable NSDictionary *)dictionary {
    if (dictionary != nil) {
        SNRClientUpdateAccountBasicInformationContext *model = [SNRClientUpdateAccountBasicInformationContext new];
        model.firstName = [dictionary getStringForKey:@"firstName"];
        model.lastName = [dictionary getStringForKey:@"lastName"];
        model.displayName = [dictionary getStringForKey:@"displayName"];
        model.sex = SNR_StringToClientSex([dictionary getStringForKey:@"sex"]);
        model.phone = [dictionary getStringForKey:@"phone"];
        model.birthDate = [dictionary getStringForKey:@"birthDate"];
        model.avatarUrl = [dictionary getStringForKey:@"avatarUrl"];
                                                
        model.company = [dictionary getStringForKey:@"company"];
        model.address = [dictionary getStringForKey:@"address"];
        model.city = [dictionary getStringForKey:@"city"];
        model.province = [dictionary getStringForKey:@"province"];
        model.zipCode = [dictionary getStringForKey:@"zipCode"];
        model.countryCode = [dictionary getStringForKey:@"countryCode"];
        
        model.agreements = [self modelClientAgreementsWithDictionary:[dictionary getDictionaryForKey:@"agreements"]];

        model.attributes = [dictionary getDictionaryForKey:@"attributes"];
        
        return model;
    }
    
    return nil;
}

- (nullable SNRClientUpdateAccountContext *)modelClientUpdateAccountContextWithDictionary:(nullable NSDictionary *)dictionary {
    if (dictionary != nil) {
        SNRClientUpdateAccountContext *model = [SNRClientUpdateAccountContext new];
        model.email = [dictionary getStringForKey:@"email"];
        model.phone = [dictionary getStringForKey:@"phone"];
        model.customId = [dictionary getStringForKey:@"customId"];
        model.uuid = [dictionary getStringForKey:@"uuid"];
                                                
        model.firstName = [dictionary getStringForKey:@"firstName"];
        model.lastName = [dictionary getStringForKey:@"lastName"];
        model.displayName = [dictionary getStringForKey:@"displayName"];
        model.sex = SNR_StringToClientSex([dictionary getStringForKey:@"sex"]);
        model.birthDate = [dictionary getStringForKey:@"birthDate"];
        model.avatarUrl = [dictionary getStringForKey:@"avatarUrl"];
                                                
        model.company = [dictionary getStringForKey:@"company"];
        model.address = [dictionary getStringForKey:@"address"];
        model.city = [dictionary getStringForKey:@"city"];
        model.province = [dictionary getStringForKey:@"province"];
        model.zipCode = [dictionary getStringForKey:@"zipCode"];
        model.countryCode = [dictionary getStringForKey:@"countryCode"];
        
        model.agreements = [self modelClientAgreementsWithDictionary:[dictionary getDictionaryForKey:@"agreements"]];

        model.attributes = [dictionary getDictionaryForKey:@"attributes"];
        
        return model;
    }
    
    return nil;
}

- (nullable SNRClientAgreements *)modelClientAgreementsWithDictionary:(nullable NSDictionary *)dictionary {
    if (dictionary != nil) {
        SNRClientAgreements *model = [SNRClientAgreements new];
        
        if ([dictionary isValueNotNilForKey:@"email"] == YES) {
            model.email = [dictionary getBoolForKey:@"email"];
        }
        
        if ([dictionary isValueNotNilForKey:@"sms"] == YES) {
            model.sms = [dictionary getBoolForKey:@"sms"];
        }
        
        if ([dictionary isValueNotNilForKey:@"push"] == YES) {
            model.push = [dictionary getBoolForKey:@"push"];
        }
        
        if ([dictionary isValueNotNilForKey:@"bluetooth"] == YES) {
            model.bluetooth = [dictionary getBoolForKey:@"bluetooth"];
        }
        
        if ([dictionary isValueNotNilForKey:@"rfid"] == YES) {
            model.rfid = [dictionary getBoolForKey:@"rfid"];
        }
        
        if ([dictionary isValueNotNilForKey:@"wifi"] == YES) {
            model.wifi = [dictionary getBoolForKey:@"wifi"];
        }
        
        return model;
    }
    
    return nil;
}

- (SNRClientSignOutMode)enumClientSignOutModeWithString:(nullable NSString *)string {
    if (string != nil && [string isKindOfClass:NSString.class] == YES) {
        if ([string isEqualToString:@"SIGN_OUT"] == YES) {
            return SNRClientSignOutModeSignOut;
        }
        
        if ([string isEqualToString:@"SIGN_OUT_WITH_SESSION_DESTROY"] == YES) {
            return SNRClientSignOutModeSignOutWithSessionDestroy;
        }
    }
    
    return SNRClientSignOutModeSignOut;
}

#pragma mark - JS Mapping

- (nullable NSDictionary *)dictionaryWithClientConditionalAuthResult:(nullable SNRClientConditionalAuthResult *)model {
    if (model != nil) {
        NSMutableDictionary *dictionary = [@{} mutableCopy];
        [dictionary setString:SNR_ClientConditionalAuthStatusToString(model.status) forKey:@"status"];
        [dictionary setArray:model.conditions forKey:@"conditions"];
        
        return dictionary;
    }
    
    return nil;
}

- (nullable NSDictionary *)dictionaryWithClientAccountInformation:(nullable SNRClientAccountInformation *)model {
    if (model != nil) {
        NSMutableDictionary *dictionary = [@{} mutableCopy];
        
        [dictionary setInteger:model.clientId forKey:@"clientId"];
        [dictionary setString:model.email forKey:@"email"];
        [dictionary setString:model.phone forKey:@"phone"];
        [dictionary setString:model.customId forKey:@"customId"];
        [dictionary setString:model.uuid forKey:@"uuid"];
        
        [dictionary setString:model.firstName forKey:@"firstName"];
        [dictionary setString:model.lastName forKey:@"lastName"];
        [dictionary setString:model.displayName forKey:@"displayName"];
        [dictionary setString:SNR_ClientSexToString(model.sex) forKey:@"sex"];
        [dictionary setString:model.birthDate forKey:@"birthDate"];
        [dictionary setString:model.avatarUrl forKey:@"avatarUrl"];
        
        [dictionary setString:model.company forKey:@"company"];
        [dictionary setString:model.address forKey:@"address"];
        [dictionary setString:model.city forKey:@"city"];
        [dictionary setString:model.province forKey:@"province"];
        [dictionary setString:model.zipCode forKey:@"zipCode"];
        [dictionary setString:model.countryCode forKey:@"countryCode"];

        [dictionary setBool:model.anonymous forKey:@"anonymous"];
        [dictionary setDate:model.lastActivityDate forKey:@"lastActivityDate"];
        
        [dictionary setDictionary:[self dictionaryWithClientAgreements:model.agreements] forKey:@"agreements"];
        
        [dictionary setDictionary:model.attributes forKey:@"attributes"];
        [dictionary setArray:model.tags forKey:@"tags"];
        
        return dictionary;
    }
    
    return nil;
}

- (nullable NSDictionary *)dictionaryWithClientAgreements:(nullable SNRClientAgreements *)model {
    if (model != nil) {
        NSMutableDictionary *dictionary = [@{} mutableCopy];
        
        [dictionary setBool:model.email forKey:@"email"];
        [dictionary setBool:model.sms forKey:@"sms"];
        [dictionary setBool:model.push forKey:@"push"];
        [dictionary setBool:model.bluetooth forKey:@"bluetooth"];
        [dictionary setBool:model.rfid forKey:@"rfid"];
        [dictionary setBool:model.wifi forKey:@"wifi"];
        
        return dictionary;
    }
    
    return nil;
}

- (nullable NSDictionary *)dictionaryWithToken:(nullable SNRToken *)model {
    if (model != nil) {
        NSMutableDictionary *dictionary = [@{} mutableCopy];
        
        [dictionary setString:model.tokenString forKey:@"tokenString"];
        [dictionary setDate:model.expirationDate forKey:@"expirationDate"];
        
        [dictionary setString:model.rlm forKey:@"rlm"];
        [dictionary setString:SNR_TokenOriginToString(model.origin) forKey:@"origin"];
        [dictionary setString:model.clientId forKey:@"clientId"];
        [dictionary setString:model.customId forKey:@"customId"];
    
        return dictionary;
    }
    
    return nil;
}

- (NSString *)stringWithClientSessionEndReason:(SNRClientSessionEndReason)reason {
    if (reason == SNRClientSessionEndReasonUserSignOut) {
        return @"USER_SIGN_OUT";
    } else if (reason == SNRClientSessionEndReasonSystemSignOut) {
        return @"SYSTEM_SIGN_OUT";
    } else if (reason == SNRClientSessionEndReasonSessionExpiration) {
        return @"SESSION_EXPIRATION";
    } else if (reason == SNRClientSessionEndReasonSessionDestroyed) {
        return @"SESSION_DESTROYED";
    } else if (reason == SNRClientSessionEndReasonSecurityException) {
        return @"SECURITY_EXCEPTION";
    } else if (reason == SNRClientSessionEndReasonClientRejected) {
        return @"CLIENT_REJECTED";
    } else if (reason == SNRClientSessionEndReasonUserAccountDeleted) {
        return @"USER_ACCOUNT_DELETED";
    } else {
        return @"NOT_SPECIFIED";
    }
}

#pragma mark - JS Module

- (NSDictionary *)constantsToExport
{
  return @{
      RNClientEventListenerClientIsSignedInKey: kRNSyneriseClientIsSignedInEvent,
      RNClientEventListenerClientIsSignedOutKey: kRNSyneriseClientIsSignedOutEvent
  };
}

//registerAccount(context: ClientAccountRegisterContext, onSuccess: () => void, onError: (error: Error) => void)

RCT_EXPORT_METHOD(registerAccount:(NSDictionary *)dictionary response:(RCTResponseSenderBlock)response)
{
    SNRClientRegisterAccountContext *clientRegisterAccountContext = [self modelClientRegisterAccountContextWithDictionary:dictionary];
    if (clientRegisterAccountContext != nil) {
        [SNRClient registerAccount:clientRegisterAccountContext success:^() {
            [self executeSuccessCallbackResponse:response data:@1];
        } failure:^(NSError *error) {
            [self executeFailureCallbackResponse:response error:error];
        }];
    } else {
        [self executeDefaultFailureCallbackResponse:response];
    }
}

//requestAccountActivation(email: String, onSuccess: () => void, onError: (error: Error) => void)

RCT_EXPORT_METHOD(requestAccountActivation:(NSString *)email response:(RCTResponseSenderBlock)response)
{
   [SNRClient requestAccountActivationWithEmail:email success:^() {
       [self executeSuccessCallbackResponse:response data:@1];
   } failure:^(NSError *error) {
       [self executeFailureCallbackResponse:response error:error];
   }];
}

//confirmAccountActivation(token: String, onSuccess: () => void, onError: (error: Error) => void)

RCT_EXPORT_METHOD(confirmAccountActivation:(NSString *)token response:(RCTResponseSenderBlock)response)
{
   [SNRClient confirmAccountActivationByToken:token success:^() {
       [self executeSuccessCallbackResponse:response data:@1];
   } failure:^(NSError *error) {
       [self executeFailureCallbackResponse:response error:error];
   }];
}

//requestAccountActivationByPin(email: string, onSuccess: () => void, onError: (error: Error) => void)

RCT_EXPORT_METHOD(requestAccountActivationByPin:(NSString *)email response:(RCTResponseSenderBlock)response)
{
    [SNRClient requestAccountActivationByPinWithEmail:email success:^() {
        [self executeSuccessCallbackResponse:response data:@1];
    } failure:^(NSError *error) {
        [self executeFailureCallbackResponse:response error:error];
    }];
}

//confirmAccountActivationByPin(pinCode: string, email: string, onSuccess: () => void, onError: (error: Error) => void)

RCT_EXPORT_METHOD(confirmAccountActivationByPin:(NSString *)pinCode email:(NSString *)email response:(RCTResponseSenderBlock)response)
{
    [SNRClient confirmAccountActivationByPin:pinCode email:email success:^() {
        [self executeSuccessCallbackResponse:response data:@1];
    } failure:^(NSError *error) {
        [self executeFailureCallbackResponse:response error:error];
    }];
}

//signIn(email: string, password: string, onSuccess: () => void, onError: (error: Error) => void)

RCT_EXPORT_METHOD(signIn:(NSString *)email password:(NSString *)password response:(RCTResponseSenderBlock)response)
{
    [SNRClient signInWithEmail:email password:password success:^() {
        [self executeSuccessCallbackResponse:response data:@1];
    } failure:^(NSError *error) {
        [self executeFailureCallbackResponse:response error:error];
    }];
}

//signInConditionally(email: string, password: string, onSuccess: (result: ClientConditionalAuthResult) => void, onError: (error: Error) => void)

RCT_EXPORT_METHOD(signInConditionally:(NSString *)email password:(NSString *)password response:(RCTResponseSenderBlock)response)
{
    [SNRClient signInConditionallyWithEmail:email password:password success:^(SNRClientConditionalAuthResult *authResult) {
        NSDictionary *authResultDictionary = [self dictionaryWithClientConditionalAuthResult:authResult];
        if (authResultDictionary != nil) {
            [self executeSuccessCallbackResponse:response data:authResultDictionary];
        } else {
            [self executeDefaultFailureCallbackResponse:response];
        }
    } failure:^(NSError *error) {
        [self executeFailureCallbackResponse:response error:error];
    }];
}


//authenticate(token: string, provider: ClientIdentityProvider, context: ClientConditionalAuthContext, onSuccess: () => void, onError: (error: Error) => void)

RCT_EXPORT_METHOD(authenticate:(NSString *)token provider:(NSString *)provider context:(NSDictionary *)contextDictionary response:(RCTResponseSenderBlock)response)
{
    NSString *authID = contextDictionary[@"authID"];
    SNRClientIdentityProvider clientIdentityProvider = SNR_StringToClientIdentityProvider(provider);
    SNRClientAuthenticationContext *context = [self modelClientAuthenticationContextWithDictionary:contextDictionary];
    
    [SNRClient authenticateWithToken:token clientIdentityProvider:clientIdentityProvider authID:authID context:context success:^() {
        [self executeSuccessCallbackResponse:response data:@1];
    } failure:^(NSError *error) {
        [self executeFailureCallbackResponse:response error:error];
    }];
}
    
//authenticateConditionally(token: string, provider: ClientIdentityProvider, context: ClientConditionalAuthContext, onSuccess: (result: ClientConditionalAuthResult) => void, onError: (error: Error) => void)

RCT_EXPORT_METHOD(authenticateConditionally:(NSString *)token provider:(NSString *)provider context:(NSDictionary *)contextDictionary response:(RCTResponseSenderBlock)response)
{
    NSString *authID = contextDictionary[@"authID"];
    SNRClientIdentityProvider clientIdentityProvider = SNR_StringToClientIdentityProvider(provider);
    SNRClientConditionalAuthenticationContext *context = [self modelClientConditionalAuthenticationContextWithDictionary:contextDictionary];
    
    [SNRClient authenticateConditionallyWithToken:token clientIdentityProvider:clientIdentityProvider authID:authID context:context success:^(SNRClientConditionalAuthResult *authResult) {
        NSDictionary *authResultDictionary = [self dictionaryWithClientConditionalAuthResult:authResult];
        if (authResultDictionary != nil) {
            [self executeSuccessCallbackResponse:response data:authResultDictionary];
        } else {
            [self executeDefaultFailureCallbackResponse:response];
        }
    } failure:^(NSError *error) {
        [self executeFailureCallbackResponse:response error:error];
    }];
}

//simpleAuthentication(data: ClientSimpleAuthenticationData, authID: string, onSuccess: () => void, onError: (error: Error) => void)

RCT_EXPORT_METHOD(simpleAuthentication:(NSDictionary *)dictionary authID:(NSString *)authID response:(RCTResponseSenderBlock)response)
{
    SNRClientSimpleAuthenticationData *clientSimpleAuthenticationData = [self modelClientSimpleAuthenticationDataWithDictionary:dictionary];
    if (clientSimpleAuthenticationData != nil) {
        [SNRClient simpleAuthentication:clientSimpleAuthenticationData authID:authID success:^() {
            [self executeSuccessCallbackResponse:response data:@1];
        } failure:^(NSError *error) {
            [self executeFailureCallbackResponse:response error:error];
        }];
    } else {
        [self executeDefaultFailureCallbackResponse:response];
    }
}

//isSignedIn()

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(isSignedIn)
{
    return [NSNumber numberWithBool:[SNRClient isSignedIn]];
}

//isSignedInViaSimpleAuthentication()

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(isSignedInViaSimpleAuthentication)
{
    return [NSNumber numberWithBool:[SNRClient isSignedInViaSimpleAuthentication]];
}

//signOut()

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(signOut)
{
    [SNRClient signOut];
    
    return @YES;
}

//signOutWithMode(mode: ClientSignOutMode, fromAllDevices: boolean, onSuccess: () => void, onError: (error: Error) => void)

RCT_EXPORT_METHOD(signOutWithMode:(NSString *)modeString fromAllDevices:(nonnull NSNumber *)fromAllDevices response:(RCTResponseSenderBlock)response)
{
    SNRClientSignOutMode mode = [self enumClientSignOutModeWithString:modeString];
    
    [SNRClient signOutWithMode:mode fromAllDevices:[fromAllDevices boolValue] success:^() {
        [self executeSuccessCallbackResponse:response data:@1];
    } failure:^(NSError *error) {
        [self executeFailureCallbackResponse:response error:error];
    }];
}

//destroySession()

RCT_EXPORT_METHOD(destroySession)
{
    [SNRClient destroySession];
}

//refreshToken(onSuccess: () => void, onError: (error: Error) => void)

RCT_REMAP_METHOD(refreshToken, refreshTokenWithResponse:(RCTResponseSenderBlock)response)
{
    [SNRClient refreshTokenWithSuccess:^() {
        [self executeSuccessCallbackResponse:response data:@YES];
    } failure:^(NSError *error) {
        [self executeFailureCallbackResponse:response error:error];
    }];
}

//retrieveToken(onSuccess: (token: Token) => void, onError: (error: Error) => void)

RCT_REMAP_METHOD(retrieveToken, retrieveTokenWithResponse:(RCTResponseSenderBlock)response)
{
    [SNRClient retrieveTokenWithSuccess:^(SNRToken *token) {
        NSDictionary *tokenDictionary = [self dictionaryWithToken:token];
        if (tokenDictionary != nil) {
            [self executeSuccessCallbackResponse:response data:tokenDictionary];
        } else {
            [self executeDefaultFailureCallbackResponse:response];
        }
    } failure:^(NSError *error) {
        [self executeFailureCallbackResponse:response error:error];
    }];
}

//getUUID()

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(getUUID)
{
    return [SNRClient getUUID];
}

//regenerateUUID()

RCT_EXPORT_METHOD(regenerateUUID)
{
    [SNRClient regenerateUUID];
}

//regenerateUUIDWithClientIdentifier(clientIdentifier: String)

RCT_EXPORT_METHOD(regenerateUUIDWithClientIdentifier:(NSString *)clientIdentifier)
{
    [SNRClient regenerateUUIDWithClientIdentifier:clientIdentifier];
}

//getAccount(onSuccess: (clientAccountInformation: ClientAccountInformation) => void, onError: (error: Error) => void)

RCT_REMAP_METHOD(getAccount, getAccountWithResponse:(RCTResponseSenderBlock)response)
{
    [SNRClient getAccountWithSuccess:^(SNRClientAccountInformation *clientAccountInformation) {
        NSDictionary *clientAccountInformationDictionary = [self dictionaryWithClientAccountInformation:clientAccountInformation];
        if (clientAccountInformationDictionary != nil) {
            [self executeSuccessCallbackResponse:response data:clientAccountInformationDictionary];
        } else {
            [self executeDefaultFailureCallbackResponse:response];
        }
    } failure:^(NSError *error) {
        [self executeFailureCallbackResponse:response error:error];
    }];
}

//updateAccountBasicInformation(context: ClientAccountUpdateBasicInformationContext, onSuccess: () => void, onError: (error: Error) => void)

RCT_EXPORT_METHOD(updateAccountBasicInformation:(NSDictionary *)dictionary response:(RCTResponseSenderBlock)response)
{
    SNRClientUpdateAccountBasicInformationContext *context = [self modelClientUpdateAccountBasicInformationContextWithDictionary:dictionary];
    if (context != nil) {
        [SNRClient updateAccountBasicInformation:context success:^() {
            [self executeSuccessCallbackResponse:response data:@1];
        } failure:^(NSError *error) {
            [self executeFailureCallbackResponse:response error:error];
        }];
    } else {
        [self executeDefaultFailureCallbackResponse:response];
    }
}

//updateAccount(context: ClientAccountUpdateContext, onSuccess: () => void, onError: (error: Error) => void)

RCT_EXPORT_METHOD(updateAccount:(NSDictionary *)dictionary response:(RCTResponseSenderBlock)response)
{
    SNRClientUpdateAccountContext *context = [self modelClientUpdateAccountContextWithDictionary:dictionary];
    if (context != nil) {
        [SNRClient updateAccount:context success:^() {
            [self executeSuccessCallbackResponse:response data:@1];
        } failure:^(NSError *error) {
            [self executeFailureCallbackResponse:response error:error];
        }];
    } else {
        [self executeDefaultFailureCallbackResponse:response];
    }
}

//requestPasswordReset(email: String, onSuccess: () => void, onError: (error: Error) => void)

RCT_EXPORT_METHOD(requestPasswordReset:(NSString *)email response:(RCTResponseSenderBlock)response)
{
    SNRClientPasswordResetRequestContext *clientPasswordResetRequestContext = [[SNRClientPasswordResetRequestContext alloc] initWithEmail:email];

    [SNRClient requestPasswordReset:clientPasswordResetRequestContext success:^() {
        [self executeSuccessCallbackResponse:response data:@1];
    } failure:^(NSError *error) {
        [self executeFailureCallbackResponse:response error:error];
    }];
}

//confirmPasswordReset(password: String, token: String, onSuccess: () => void, onError: (error: Error) => void)

RCT_EXPORT_METHOD(confirmPasswordReset:(NSString *)password token:(NSString *)token response:(RCTResponseSenderBlock)response)
{
    SNRClientPasswordResetConfirmationContext *clientPasswordResetConfirmationContext = [[SNRClientPasswordResetConfirmationContext alloc] initWithPassword:password andToken:token];
    
    [SNRClient confirmResetPassword:clientPasswordResetConfirmationContext success:^() {
        [self executeSuccessCallbackResponse:response data:@1];
    } failure:^(NSError *error) {
        [self executeFailureCallbackResponse:response error:error];
    }];
}

//changePassword(oldPassword: String, newPassword: String, onSuccess: () => void, onError: (error: Error) => void)

RCT_EXPORT_METHOD(changePassword:(NSString *)oldPassword newPassword:(NSString *)newPassword response:(RCTResponseSenderBlock)response)
{
    [SNRClient changePassword:newPassword oldPassword:oldPassword success:^() {
        [self executeSuccessCallbackResponse:response data:@1];
    } failure:^(NSError *error) {
        [self executeFailureCallbackResponse:response error:error];
    }];
}

//  requestEmailChange(email: string, password: string | null, externalToken: string | null, authID: string | null, onSuccess: () => void, onError: (error: Error) => void)

RCT_EXPORT_METHOD(requestEmailChange:(NSString *)email password:(nullable NSString *)password externalToken:(nullable NSString *)externalToken authID:(nullable NSString *)authID response:(RCTResponseSenderBlock)response)
{
    [SNRClient requestEmailChange:email password:password externalToken:externalToken authID:authID success:^() {
        [self executeSuccessCallbackResponse:response data:@1];
    } failure:^(NSError *error) {
        [self executeFailureCallbackResponse:response error:error];
    }];
}

//confirmEmailChange(token: String, newsletterAgreement: Boolean, onSuccess: () => void, onError: (error: Error) => void)

RCT_EXPORT_METHOD(confirmEmailChange:(NSString *)token newsletterAgreement:(nonnull NSNumber *)newsletterAgreement response:(RCTResponseSenderBlock)response)
{
    [SNRClient confirmEmailChange:token newsletterAgreement:[newsletterAgreement boolValue] success:^() {
        [self executeSuccessCallbackResponse:response data:@1];
    } failure:^(NSError *error) {
        [self executeFailureCallbackResponse:response error:error];
    }];
}

//requestPhoneUpdate(phone: String, onSuccess: () => void, onError: (error: Error) => void)

RCT_EXPORT_METHOD(requestPhoneUpdate:(NSString *)phone response:(RCTResponseSenderBlock)response)
{
    [SNRClient requestPhoneUpdate:phone success:^() {
        [self executeSuccessCallbackResponse:response data:@1];
    } failure:^(NSError *error) {
        [self executeFailureCallbackResponse:response error:error];
    }];
}

//confirmPhoneUpdate(phone: String, confirmationCode: String, smsAgreement: Boolean, onSuccess: () => void, onError: (error: Error) => void)

RCT_EXPORT_METHOD(confirmPhoneUpdate:(NSString *)phone confirmationCode:(NSString *)confirmationCode smsAgreement:(nonnull NSNumber *)smsAgreement response:(RCTResponseSenderBlock)response)
{
    [SNRClient confirmPhoneUpdate:phone confirmationCode:confirmationCode smsAgreement:[smsAgreement boolValue] success:^() {
        [self executeSuccessCallbackResponse:response data:@1];
    } failure:^(NSError *error) {
        [self executeFailureCallbackResponse:response error:error];
    }];
}

//deleteAccountByIdentityProvider(clientAuthFactor: string, clientIdentityProvider: ClientIdentityProvider, authID: string | null, onSuccess: () => void, onError: (error: Error) => void)

RCT_EXPORT_METHOD(deleteAccountByIdentityProvider:(id)clientAuthFactor clientIdentityProvider:(NSString *)clientIdentityProviderString authID:(nullable NSString *)authID response:(RCTResponseSenderBlock)response)
{
    SNRClientIdentityProvider clientIdentityProvider = SNR_StringToClientIdentityProvider(clientIdentityProviderString);
    
    [SNRClient deleteAccount:clientAuthFactor clientIdentityProvider:clientIdentityProvider authID:authID success:^() {
        [self executeSuccessCallbackResponse:response data:@1];
    } failure:^(NSError *error) {
        [self executeFailureCallbackResponse:response error:error];
    }];
}

//recognizeAnonymous(email: String, customIdentify: String, parameters: Record<string, any>)

RCT_EXPORT_METHOD(recognizeAnonymous:(nullable NSString *)email customIdentify:(nullable NSString *)customIdentify parameters:(nullable NSDictionary *)parameters)
{
    [SNRClient recognizeAnonymousWithEmail:email customIdentify:customIdentify parameters:parameters];
}

@end

NS_ASSUME_NONNULL_END
