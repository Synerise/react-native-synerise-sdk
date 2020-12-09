//
//  RNClient.m
//  react-native-synerise-sdk
//
//  Created by Synerise
//  Copyright © 2018 Synerise. All rights reserved.
//

#import "RNClient.h"

NS_ASSUME_NONNULL_BEGIN

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
        
    }
    
    moduleInstance = self;
    
    return self;
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

- (nullable SNRClientOAuthAuthenticationContext *)modelClientOAuthAuthenticationContextWithDictionary:(nullable NSDictionary *)dictionary {
    if (dictionary != nil) {
        SNRClientOAuthAuthenticationContext *model = [SNRClientOAuthAuthenticationContext new];
        model.attributes = [dictionary getDictionaryForKey:@"attributes"];
        model.agreements = [self modelClientAgreementsWithDictionary:[dictionary getDictionaryForKey:@"agreements"]];
        
        return model;
    }
    
    return nil;
}

- (nullable SNRClientFacebookAuthenticationContext *)modelClientFacebookAuthenticationContextWithDictionary:(nullable NSDictionary *)dictionary {
    if (dictionary != nil) {
        SNRClientFacebookAuthenticationContext *model = [SNRClientFacebookAuthenticationContext new];
        model.attributes = [dictionary getDictionaryForKey:@"attributes"];
        model.agreements = [self modelClientAgreementsWithDictionary:[dictionary getDictionaryForKey:@"agreements"]];
        
        return model;
    }
    
    return nil;
}

- (nullable SNRClientAppleSignInAuthenticationContext *)modelClientAppleSignInAuthenticationContextWithDictionary:(nullable NSDictionary *)dictionary {
    if (dictionary != nil) {
        SNRClientAppleSignInAuthenticationContext *model = [SNRClientAppleSignInAuthenticationContext new];
        model.attributes = [dictionary getDictionaryForKey:@"attributes"];
        model.agreements = [self modelClientAgreementsWithDictionary:[dictionary getDictionaryForKey:@"agreements"]];
            
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
        model.email = [dictionary getBoolForKey:@"email"];
        model.sms = [dictionary getBoolForKey:@"sms"];
        model.push = [dictionary getBoolForKey:@"push"];
        model.bluetooth = [dictionary getBoolForKey:@"bluetooth"];
        model.rfid = [dictionary getBoolForKey:@"rfid"];
        model.wifi = [dictionary getBoolForKey:@"wifi"];
        
        return model;
    }
    
    return nil;
}

#pragma mark - JS Mapping

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
        [dictionary setString:SNR_TokenOriginToString(model.tokenOrigin) forKey:@"tokenOrigin"];
        [dictionary setDate:model.expirationDate forKey:@"expirationDate"];
    
        return dictionary;
    }
    
    return nil;
}

#pragma mark - JS Module

//registerAccount(context: ClientAccountRegisterContext, onSuccess: () => void, onError: (error: Error) => void)

RCT_EXPORT_METHOD(registerAccount:(NSDictionary *)dictionary response:(RCTResponseSenderBlock)response)
{
    SNRClientRegisterAccountContext *clientRegisterAccountContext = [self modelClientRegisterAccountContextWithDictionary:dictionary];
    if (clientRegisterAccountContext != nil) {
        [SNRClient registerAccount:clientRegisterAccountContext success:^(BOOL isSuccess) {
            [self executeSuccessCallbackResponse:response data:@1];
        } failure:^(NSError *error) {
            [self executeFailureCallbackResponse:response error:error];
        }];
    } else {
        [self executeDefaultFailureCallbackResponse:response];
    }
}

//confirmAccount(token: String, onSuccess: () => void, onError: (error: Error) => void)

RCT_EXPORT_METHOD(token:(NSString *)token response:(RCTResponseSenderBlock)response)
{
   [SNRClient confirmAccount:token success:^(BOOL isSuccess) {
       [self executeSuccessCallbackResponse:response data:@1];
   } failure:^(NSError *error) {
       [self executeFailureCallbackResponse:response error:error];
   }];
}

//activateAccount(email: String, onSuccess: () => void, onError: (error: Error) => void)

RCT_EXPORT_METHOD(email:(NSString *)email response:(RCTResponseSenderBlock)response)
{
   [SNRClient activateAccount:email success:^(BOOL isSuccess) {
       [self executeSuccessCallbackResponse:response data:@1];
   } failure:^(NSError *error) {
       [self executeFailureCallbackResponse:response error:error];
   }];
}

//signIn(email: string, password: string, onSuccess: () => void, onError: (error: Error) => void)

RCT_EXPORT_METHOD(signIn:(NSString *)email password:(NSString *)password response:(RCTResponseSenderBlock)response)
{
    [SNRClient signInWithEmail:email password:password success:^(BOOL isSuccess) {
        [self executeSuccessCallbackResponse:response data:@1];
    } failure:^(NSError *error) {
        [self executeFailureCallbackResponse:response error:error];
    }];
}

//authenticateByOAuth(accessToken: string, context: ClientOAuthAuthenticationContext, onSuccess: () => void, onError: (error: Error) => void)

RCT_EXPORT_METHOD(authenticateByOAuth:(NSString *)accessToken context:(NSDictionary *)contextDictionary response:(RCTResponseSenderBlock)response)
{
    NSString *authID = contextDictionary[@"authID"];
    SNRClientOAuthAuthenticationContext *context = [self modelClientOAuthAuthenticationContextWithDictionary:contextDictionary];
    
    [SNRClient authenticateByOAuthWithAccessToken:accessToken authID:authID context:context success:^(BOOL isSuccess) {
        [self executeSuccessCallbackResponse:response data:@1];
    } failure:^(NSError *error) {
        [self executeFailureCallbackResponse:response error:error];
    }];
}

//authenticateByOAuthIfRegistered(accessToken: string, authID: string, onSuccess: () => void, onError: (error: Error) => void)

RCT_EXPORT_METHOD(authenticateByOAuthIfRegistered:(NSString *)accessToken authID:(NSString *)authID response:(RCTResponseSenderBlock)response)
{
    [SNRClient authenticateByOAuthIfRegisteredWithAccessToken:accessToken authID:authID success:^(BOOL isSuccess) {
        [self executeSuccessCallbackResponse:response data:@1];
    } failure:^(NSError *error) {
        [self executeFailureCallbackResponse:response error:error];
    }];
}

//authenticateByFacebook(facebookToken: string, context: ClientFacebookAuthenticationContext, onSuccess: () => void, onError: (error: Error) => void)

RCT_EXPORT_METHOD(authenticateByFacebook:(NSString *)facebookToken context:(NSDictionary *)contextDictionary response:(RCTResponseSenderBlock)response)
{
    NSString *authID = contextDictionary[@"authID"];
    SNRClientFacebookAuthenticationContext *context = [self modelClientFacebookAuthenticationContextWithDictionary:contextDictionary];
    
    [SNRClient authenticateByFacebookWithFacebookToken:facebookToken authID:authID context:context success:^(BOOL isSuccess) {
        [self executeSuccessCallbackResponse:response data:@1];
    } failure:^(NSError *error) {
        [self executeFailureCallbackResponse:response error:error];
    }];
}

//authenticateByFacebookIfRegistered(facebookToken: string, authID: string, onSuccess: () => void, onError: (error: Error) => void)

RCT_EXPORT_METHOD(authenticateByFacebookIfRegistered:(NSString *)facebookToken authID:(NSString *)authID response:(RCTResponseSenderBlock)response)
{
    [SNRClient authenticateByFacebookIfRegisteredWithFacebookToken:facebookToken authID:authID success:^(BOOL isSuccess) {
        [self executeSuccessCallbackResponse:response data:@1];
    } failure:^(NSError *error) {
        [self executeFailureCallbackResponse:response error:error];
    }];
}

//authenticateByAppleSignIn(identityToken: string, context: AppleSignInAuthenticationContext, onSuccess: () => void, onError: (error: Error) => void)

RCT_EXPORT_METHOD(authenticateByAppleSignIn:(NSString *)identityToken context:(NSDictionary *)contextDictionary response:(RCTResponseSenderBlock)response)
{
    NSData *identityTokenData = [identityToken dataUsingEncoding:NSUTF8StringEncoding];
    
    NSString *authID = contextDictionary[@"authID"];
    SNRClientAppleSignInAuthenticationContext *context = [self modelClientAppleSignInAuthenticationContextWithDictionary:contextDictionary];
    
    [SNRClient authenticateByAppleSignInWithIdentityToken:identityTokenData authID:authID context:context success:^(BOOL isSuccess) {
        [self executeSuccessCallbackResponse:response data:@1];
    } failure:^(NSError *error) {
        [self executeFailureCallbackResponse:response error:error];
    }];
}

//authenticateByAppleSignInIfRegistered(identityToken: string, authID: string, onSuccess: () => void, onError: (error: Error) => void)

RCT_EXPORT_METHOD(authenticateByAppleSignInIfRegistered:(NSString *)identityToken authID:(NSString *)authID response:(RCTResponseSenderBlock)response)
{
    NSData *identityTokenData = [identityToken dataUsingEncoding:NSUTF8StringEncoding];
    
    [SNRClient authenticateByAppleSignInIfRegisteredWithIdentityToken:identityTokenData authID:authID success:^(BOOL isSuccess) {
        [self executeSuccessCallbackResponse:response data:@1];
    } failure:^(NSError *error) {
        [self executeFailureCallbackResponse:response error:error];
    }];
}

//isSignedIn()

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(isSignedIn)
{
    return [NSNumber numberWithBool:[SNRClient isSignedIn]];
}

//signOut()

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(signOut)
{
    [SNRClient signOut];
    
    return @YES;
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

//updateAccount(context: ClientAccountUpdateContext, onSuccess: () => void, onError: (error: Error) => void)

RCT_EXPORT_METHOD(updateAccount:(NSDictionary *)dictionary response:(RCTResponseSenderBlock)response)
{
    SNRClientUpdateAccountContext *clientUpdateAccountContext = [self modelClientUpdateAccountContextWithDictionary:dictionary];
    if (clientUpdateAccountContext != nil) {
        [SNRClient updateAccount:clientUpdateAccountContext success:^(BOOL isSuccess) {
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

    [SNRClient requestPasswordReset:clientPasswordResetRequestContext success:^(BOOL isSuccess) {
        [self executeSuccessCallbackResponse:response data:@1];
    } failure:^(NSError *error) {
        [self executeFailureCallbackResponse:response error:error];
    }];
}

//confirmPasswordReset(password: String, token: String, onSuccess: () => void, onError: (error: Error) => void)

RCT_EXPORT_METHOD(confirmPasswordReset:(NSString *)password token:(NSString *)token response:(RCTResponseSenderBlock)response)
{
    SNRClientPasswordResetConfirmationContext *clientPasswordResetConfirmationContext = [[SNRClientPasswordResetConfirmationContext alloc] initWithPassword:password andToken:token];
    
    [SNRClient confirmResetPassword:clientPasswordResetConfirmationContext success:^(BOOL isSuccess) {
        [self executeSuccessCallbackResponse:response data:@1];
    } failure:^(NSError *error) {
        [self executeFailureCallbackResponse:response error:error];
    }];
}

//changePassword(oldPassword: String, newPassword: String, onSuccess: () => void, onError: (error: Error) => void)

RCT_EXPORT_METHOD(changePassword:(NSString *)oldPassword newPassword:(NSString *)newPassword response:(RCTResponseSenderBlock)response)
{
    [SNRClient changePassword:newPassword oldPassword:oldPassword success:^(BOOL isSuccess) {
        [self executeSuccessCallbackResponse:response data:@1];
    } failure:^(NSError *error) {
        [self executeFailureCallbackResponse:response error:error];
    }];
}

//requestEmailChange(email: String, password: String, onSuccess: () => void, onError: (error: Error) => void)

RCT_EXPORT_METHOD(requestEmailChange:(NSString *)email password:(NSString *)password response:(RCTResponseSenderBlock)response)
{
    [SNRClient requestEmailChange:email password:password success:^(BOOL isSuccess) {
        [self executeSuccessCallbackResponse:response data:@1];
    } failure:^(NSError *error) {
        [self executeFailureCallbackResponse:response error:error];
    }];
}

//confirmEmailChange(token: String, newsletterAgreement: Boolean, onSuccess: () => void, onError: (error: Error) => void)

RCT_EXPORT_METHOD(confirmEmailChange:(NSString *)token newsletterAgreement:(nonnull NSNumber *)newsletterAgreement response:(RCTResponseSenderBlock)response)
{
    [SNRClient confirmEmailChange:token newsletterAgreement:[newsletterAgreement boolValue] success:^(BOOL isSuccess) {
        [self executeSuccessCallbackResponse:response data:@1];
    } failure:^(NSError *error) {
        [self executeFailureCallbackResponse:response error:error];
    }];
}

//requestPhoneUpdate(phone: String, onSuccess: () => void, onError: (error: Error) => void)

RCT_EXPORT_METHOD(requestPhoneUpdate:(NSString *)phone response:(RCTResponseSenderBlock)response)
{
    [SNRClient requestPhoneUpdate:phone success:^(BOOL isSuccess) {
        [self executeSuccessCallbackResponse:response data:@1];
    } failure:^(NSError *error) {
        [self executeFailureCallbackResponse:response error:error];
    }];
}

//confirmPhoneUpdate(phone: String, confirmationCode: String, smsAgreement: Boolean, onSuccess: () => void, onError: (error: Error) => void)

RCT_EXPORT_METHOD(confirmPhoneUpdate:(NSString *)phone confirmationCode:(NSString *)confirmationCode smsAgreement:(nonnull NSNumber *)smsAgreement response:(RCTResponseSenderBlock)response)
{
    [SNRClient confirmPhoneUpdate:phone confirmationCode:confirmationCode smsAgreement:[smsAgreement boolValue] success:^(BOOL isSuccess) {
        [self executeSuccessCallbackResponse:response data:@1];
    } failure:^(NSError *error) {
        [self executeFailureCallbackResponse:response error:error];
    }];
}

//deleteAccount(password: String, onSuccess: () => void, onError: (error: Error) => void)

RCT_EXPORT_METHOD(deleteAccount:(NSString *)password response:(RCTResponseSenderBlock)response)
{
    [SNRClient deleteAccount:password success:^(BOOL isSuccess) {
        [self executeSuccessCallbackResponse:response data:@1];
    } failure:^(NSError *error) {
        [self executeFailureCallbackResponse:response error:error];
    }];
}

//deleteAccountByIdentityProvider(clientAuthFactor: string, clientIdentityProvider: ClientIdentityProvider, authID: string | null, onSuccess: () => void, onError: (error: Error) => void)

RCT_EXPORT_METHOD(deleteAccountByIdentityProvider:(id)clientAuthFactor clientIdentityProvider:(NSString *)clientIdentityProviderString authID:(nullable NSString *)authID response:(RCTResponseSenderBlock)response)
{
    SNRClientIdentityProvider clientIdentityProvider = SNR_StringToClientIdentityProvider(clientIdentityProviderString);
    
    [SNRClient deleteAccount:clientAuthFactor clientIdentityProvider:clientIdentityProvider authID:authID success:^(BOOL isSuccess) {
        [self executeSuccessCallbackResponse:response data:@1];
    } failure:^(NSError *error) {
        [self executeFailureCallbackResponse:response error:error];
    }];
}

//deleteAccountByOAuth(password: String, onSuccess: () => void, onError: (error: Error) => void)

RCT_EXPORT_METHOD(deleteAccountByOAuth:(NSString *)accessToken response:(RCTResponseSenderBlock)response)
{
    [SNRClient deleteAccountByOAuth:accessToken success:^(BOOL isSuccess) {
        [self executeSuccessCallbackResponse:response data:@1];
    } failure:^(NSError *error) {
        [self executeFailureCallbackResponse:response error:error];
    }];
}

//deleteAccountByFacebook(facebookToken: String, onSuccess: () => void, onError: (error: Error) => void)

RCT_EXPORT_METHOD(deleteAccountByFacebook:(NSString *)facebookToken response:(RCTResponseSenderBlock)response)
{
    [SNRClient deleteAccountByFacebook:facebookToken success:^(BOOL isSuccess) {
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
