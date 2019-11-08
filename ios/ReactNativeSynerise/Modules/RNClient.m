//
//  RNClient.m
//  react-native-synerise-sdk
//
//  Created by Synerise
//  Copyright © 2018 Synerise. All rights reserved.
//

#import "RNClient.h"

@implementation RNClient

RCT_EXPORT_MODULE();

#pragma mark - Module

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

RCT_EXPORT_METHOD(confirmEmailChange:(NSString *)token newsletterAgreement:(NSNumber *)newsletterAgreement response:(RCTResponseSenderBlock)response)
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

RCT_EXPORT_METHOD(confirmPhoneUpdate:(NSString *)phone confirmationCode:(NSString *)confirmationCode smsAgreement:(NSNumber *)smsAgreement response:(RCTResponseSenderBlock)response)
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

//recognizeAnonymous(email: String, customIdentify: String, parameters: Record<string, any>)

RCT_EXPORT_METHOD(recognizeAnonymous:(nullable NSString *)email customIdentify:(nullable NSString *)customIdentify parameters:(nullable NSDictionary *)parameters)
{
    [SNRClient recognizeAnonymousWithEmail:email customIdentify:customIdentify parameters:parameters];
}

#pragma mark - SDK Mapping

- (nullable SNRClientRegisterAccountContext *)modelClientRegisterAccountContextWithDictionary:(nullable NSDictionary *)dictionary {
    if (dictionary != nil) {
        NSString *email = dictionary[@"email"];
        NSString *password = dictionary[@"password"];
        
        if (email != nil && password != nil) {
            SNRClientRegisterAccountContext *model = [[SNRClientRegisterAccountContext alloc] initWithEmail:email andPassword:password];
            model.phone = dictionary[@"phone"];
            model.customId = dictionary[@"customId"];

            model.firstName = dictionary[@"firstName"];
            model.lastName = dictionary[@"lastName"];
            model.sex = SNR_StringToClientSex(dictionary[@"sex"]);

            model.company = dictionary[@"company"];
            model.address = dictionary[@"address"];
            model.city = dictionary[@"city"];
            model.province = dictionary[@"province"];
            model.zipCode = dictionary[@"zipCode"];
            model.countryCode = dictionary[@"countryCode"];
            
            model.agreements = [self modelClientAgreementsWithDictionary:dictionary[@"agreements"]];

            model.attributes = dictionary[@"attributes"];
            model.tags = dictionary[@"tags"];
            
            return model;
        }
    }
    
    return nil;
}

- (nullable SNRClientUpdateAccountContext *)modelClientUpdateAccountContextWithDictionary:(nullable NSDictionary *)dictionary {
    if (dictionary != nil) {
        SNRClientUpdateAccountContext *model = [SNRClientUpdateAccountContext new];
        model.email = dictionary[@"email"];
        model.phone = dictionary[@"phone"];
        model.customId = dictionary[@"customId"];
        model.uuid = dictionary[@"uuid"];
                                                
        model.firstName = dictionary[@"firstName"];
        model.lastName = dictionary[@"lastName"];
        model.displayName = dictionary[@"displayName"];
        model.sex = SNR_StringToClientSex(dictionary[@"sex"]);
        model.birthDate = dictionary[@"birthDate"];
        model.avatarUrl = dictionary[@"avatarUrl"];
                                                
        model.company = dictionary[@"company"];
        model.address = dictionary[@"address"];
        model.city = dictionary[@"city"];
        model.province = dictionary[@"province"];
        model.zipCode = dictionary[@"zipCode"];
        model.countryCode = dictionary[@"countryCode"];
        
        model.agreements = [self modelClientAgreementsWithDictionary:dictionary[@"agreements"]];

        model.attributes = dictionary[@"attributes"];
        model.tags = dictionary[@"tags"];
        
        return model;
    }
    
    return nil;
}

- (nullable SNRClientAgreements *)modelClientAgreementsWithDictionary:(nullable NSDictionary *)dictionary {
    if (dictionary != nil) {
        SNRClientAgreements *model = [SNRClientAgreements new];
        model.email = [dictionary[@"email"] boolValue];
        model.sms = [dictionary[@"sms"] boolValue];
        model.push = [dictionary[@"push"] boolValue];
        model.bluetooth = [dictionary[@"bluetooth"] boolValue];
        model.rfid = [dictionary[@"rfid"] boolValue];
        model.wifi = [dictionary[@"wifi"] boolValue];
        
        return model;
    }
    
    return nil;
}

#pragma mark - JS Mapping

- (nullable NSDictionary *)dictionaryWithClientAccountInformation:(nullable SNRClientAccountInformation *)clientAccountInformation {
    if (clientAccountInformation != nil) {
        NSMutableDictionary *dictionary = [@{} mutableCopy];
        dictionary[@"clientId"] = [NSNumber numberWithInteger:clientAccountInformation.clientId];
        dictionary[@"email"] = clientAccountInformation.email;
        dictionary[@"phone"] = clientAccountInformation.phone;
        dictionary[@"customId"] = clientAccountInformation.customId;
        dictionary[@"uuid"] = clientAccountInformation.uuid;

        dictionary[@"firstName"] = clientAccountInformation.firstName;
        dictionary[@"lastName"] = clientAccountInformation.lastName;
        dictionary[@"displayName"] = clientAccountInformation.displayName;
        dictionary[@"sex"] = SNR_ClientSexToString(clientAccountInformation.sex);
        dictionary[@"birthDate"] = clientAccountInformation.birthDate;
        dictionary[@"avatarUrl"] = clientAccountInformation.avatarUrl;

        dictionary[@"company"] = clientAccountInformation.company;
        dictionary[@"address"] = clientAccountInformation.address;
        dictionary[@"city"] = clientAccountInformation.city;
        dictionary[@"province"] = clientAccountInformation.province;
        dictionary[@"zipCode"] = clientAccountInformation.zipCode;
        dictionary[@"countryCode"] = clientAccountInformation.countryCode;

        //TODO:
        //dictionary[@"lastActivityDate"] = clientAccountInformation.bu;
        dictionary[@"anonymous"] = [NSNumber numberWithBool:clientAccountInformation.anonymous];
        
        dictionary[@"agreements"] = [self dictionaryWithClientAgreements:clientAccountInformation.agreements];
        
        dictionary[@"attributes"] = clientAccountInformation.attributes;
        dictionary[@"tags"] = clientAccountInformation.tags;
        
        return dictionary;
    }
    
    return nil;
}

- (nullable NSDictionary *)dictionaryWithClientAgreements:(nullable SNRClientAgreements *)clientAgreements {
    if (clientAgreements != nil) {
        NSMutableDictionary *dictionary = [@{} mutableCopy];
        dictionary[@"email"] = [NSNumber numberWithBool:clientAgreements.email];
        dictionary[@"sms"] = [NSNumber numberWithBool:clientAgreements.sms];
        dictionary[@"push"] = [NSNumber numberWithBool:clientAgreements.push];
        dictionary[@"bluetooth"] = [NSNumber numberWithBool:clientAgreements.bluetooth];
        dictionary[@"rfid"] = [NSNumber numberWithBool:clientAgreements.rfid];
        dictionary[@"wifi"] = [NSNumber numberWithBool:clientAgreements.wifi];
    
        return dictionary;
    }
    
    return nil;
}

- (nullable NSDictionary *)dictionaryWithToken:(nullable SNRToken *)token {
    if (token != nil) {
        NSMutableDictionary *dictionary = [@{} mutableCopy];
        dictionary[@"tokenString"] = token.tokenString;
        dictionary[@"tokenOrigin"] = SNR_TokenOriginToString(token.tokenOrigin);
        //TODO:
        //dictionary[@"expirationDate"] = token.expirationDate;
    
        return dictionary;
    }
    
    return nil;
}

@end
