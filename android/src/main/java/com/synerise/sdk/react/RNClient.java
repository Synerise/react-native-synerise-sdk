package com.synerise.sdk.react;

import androidx.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.synerise.sdk.react.utils.ArrayUtil;
import com.synerise.sdk.react.utils.MapUtil;
import com.synerise.sdk.client.Client;
import com.synerise.sdk.client.model.GetAccountInformation;
import com.synerise.sdk.client.model.UpdateAccountInformation;
import com.synerise.sdk.client.model.client.Agreements;
import com.synerise.sdk.client.model.client.Attributes;
import com.synerise.sdk.client.model.client.RegisterClient;
import com.synerise.sdk.client.model.password.PasswordResetConfirmation;
import com.synerise.sdk.client.model.password.PasswordResetRequest;
import com.synerise.sdk.core.listeners.DataActionListener;
import com.synerise.sdk.core.net.IApiCall;
import com.synerise.sdk.core.net.IDataApiCall;
import com.synerise.sdk.core.types.model.Sex;
import com.synerise.sdk.core.types.model.Token;
import com.synerise.sdk.error.ApiError;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import javax.annotation.Nonnull;

public class RNClient extends RNBaseModule {

    private IApiCall signInCall, signUpCall, confirmCall, activateCall, updateAccountCall;
    private IApiCall passwordResetCall;
    private IDataApiCall<Token> getTokenCall;
    private IDataApiCall<GetAccountInformation> getAccountCall;

    public RNClient(ReactApplicationContext reactApplicationContext) {
        super(reactApplicationContext);
    }

    @Nonnull
    @Override
    public String getName() {
        return "RNClient";
    }

    //signIn(email: string, password: string, onSuccess: () => void, onError: (error: Error) => void)
    @ReactMethod
    public void signIn(String email, String password, Callback callback) {
        signInCall = Client.signIn(email, password);
        signInCall.execute(() -> executeSuccessCallbackResponse(callback, null, null), new DataActionListener<ApiError>() {
            @Override
            public void onDataAction(ApiError apiError) {
                executeFailureCallbackResponse(callback, null, apiError);
            }
        });
    }

    //isSignedIn()
    @ReactMethod(isBlockingSynchronousMethod = true)
    public boolean isSignedIn() {
        return Client.isSignedIn();
    }

    //signOut()
    @ReactMethod(isBlockingSynchronousMethod = true)
    public boolean signOut() {
        Client.signOut();
        return true;
    }

    //authenticateByOAuth(accessToken: string, context: ClientOAuthAuthenticationContext, onSuccess: () => void, onError: (error: Error) => void)
    @ReactMethod
    public void authenticateByOAuth(String accessToken, ReadableMap authenticateByOAuthMap, Callback callback) {
        Agreements agreements = null;
        Attributes attributes = null;
        String authID = null;
        if (authenticateByOAuthMap.hasKey("agreements")) {
            agreements = agreementsMapper(authenticateByOAuthMap.getMap("agreements"));
        }

        if (authenticateByOAuthMap.hasKey("attributes")) {
            attributes = attributesMapper(authenticateByOAuthMap.getMap("attributes").toHashMap());
        }

        if (authenticateByOAuthMap.hasKey("authID")) {
            authID = authenticateByOAuthMap.getString("authID");
        }

        IApiCall authenticateByOAuthCall = Client.authenticateByOAuth(accessToken, agreements, attributes, authID);
        authenticateByOAuthCall.execute(() -> executeSuccessCallbackResponse(callback, null, null), new DataActionListener<ApiError>() {
            @Override
            public void onDataAction(ApiError apiError) {
                executeFailureCallbackResponse(callback, null, apiError);
            }
        });
    }

    //authenticateByFacebook(facebookToken: string, context: ClientFacebookAuthenticationContext, onSuccess: () => void, onError: (error: Error) => void)
    @ReactMethod
    public void authenticateByFacebook(String facebookToken, ReadableMap authenticateByFacebookMap, Callback callback) {
        Agreements agreements = null;
        Attributes attributes = null;
        String authID = null;
        if (authenticateByFacebookMap.hasKey("agreements")) {
            agreements = agreementsMapper(authenticateByFacebookMap.getMap("agreements"));
        }

        if (authenticateByFacebookMap.hasKey("attributes")) {
            attributes = attributesMapper(authenticateByFacebookMap.getMap("attributes").toHashMap());
        }

        if (authenticateByFacebookMap.hasKey("authID")) {
            authID = authenticateByFacebookMap.getString("authID");
        }
        IApiCall authenticateByFacebookCall = Client.authenticateByFacebook(facebookToken, agreements, attributes, authID);
        authenticateByFacebookCall.execute(() -> executeSuccessCallbackResponse(callback, null, null), new DataActionListener<ApiError>() {
            @Override
            public void onDataAction(ApiError apiError) {
                executeFailureCallbackResponse(callback, null, apiError);
            }
        });
    }

    //authenticateByFacebookIfRegistered(facebookToken: string, authID: string, onSuccess: () => void, onError: (error: Error) => void)
    @ReactMethod
    public void authenticateByFacebookIfRegistered(String facebookToken, String authID, Callback callback) {
        IApiCall authenticateByFacebookIfRegisteredCall = Client.authenticateByFacebookRegistered(facebookToken, authID);
        authenticateByFacebookIfRegisteredCall.execute(() -> executeSuccessCallbackResponse(callback, null, null), new DataActionListener<ApiError>() {
            @Override
            public void onDataAction(ApiError apiError) {
                executeFailureCallbackResponse(callback, null, apiError);
            }
        });
    }

    //registerAccount(context: ClientAccountRegisterContext, onSuccess: () => void, onError: (error: Error) => void)
    @ReactMethod
    public void registerAccount(ReadableMap map, Callback callback) {
        RegisterClient registerClient = new RegisterClient();
        registerClient.setAddress(map.hasKey("address") ? map.getString("address") : null);
        registerClient.setCity(map.hasKey("city") ? map.getString("city") : null);
        registerClient.setCompany(map.hasKey("company") ? map.getString("company") : null);
        registerClient.setCountryCode(map.hasKey("countryCode") ? map.getString("countryCode") : null);
        registerClient.setCustomId(map.hasKey("customId") ? map.getString("customId") : null);
        registerClient.setEmail(map.getString("email"));
        registerClient.setPassword(map.getString("password"));
        registerClient.setFirstName(map.hasKey("firstName") ? map.getString("firstName") : null);
        registerClient.setLastName(map.hasKey("lastName") ? map.getString("lastName") : null);
        registerClient.setPhone(map.hasKey("phone") ? map.getString("phone") : null);
        registerClient.setProvince(map.hasKey("province") ? map.getString("province") : null);
        if (map.hasKey("sex")) {
            registerClient.setSex(Sex.getSex(map.getString("sex")));
        }
        registerClient.setUuid(map.hasKey("uuid") ? map.getString("uuid") : null);
        registerClient.setZipCode(map.hasKey("zipCode") ? map.getString("zipCode") : null);
        if (map.hasKey("attributes")) {
            Attributes attributes = attributesMapper(map.getMap("attributes").toHashMap());
            registerClient.setAttributes(attributes);
        }
        if (map.hasKey("agreements")) {
            Agreements agreements = agreementsMapper(map.getMap("agreements"));
            registerClient.setAgreements(agreements);
        }

        signUpCall = Client.registerAccount(registerClient);
        signUpCall.execute(() -> executeSuccessCallbackResponse(callback, null, null), new DataActionListener<ApiError>() {
            @Override
            public void onDataAction(ApiError apiError) {
                executeFailureCallbackResponse(callback, null, apiError);
            }
        });
    }

    //confirmAccount(token: String, onSuccess: () => void, onError: (error: Error) => void)
    @ReactMethod
    public void confirmAccount(String token, Callback callback) {
        confirmCall = Client.confirmAccount(token);
        confirmCall.execute(() -> executeSuccessCallbackResponse(callback, null, null), new DataActionListener<ApiError>() {
            @Override
            public void onDataAction(ApiError apiError) {
                executeFailureCallbackResponse(callback, null, apiError);
            }
        });
    }

    //activateAccount(email: String, onSuccess: () => void, onError: (error: Error) => void)
    @ReactMethod
    public void activateAccount(String email, Callback callback) {
        activateCall = Client.activateAccount(email);
        activateCall.execute(() -> executeSuccessCallbackResponse(callback, null, null), new DataActionListener<ApiError>() {
            @Override
            public void onDataAction(ApiError apiError) {
                executeFailureCallbackResponse(callback, null, apiError);
            }
        });
    }

    //retrieveToken(onSuccess: (token: Token) => void, onError: (error: Error) => void)
    @ReactMethod
    public void retrieveToken(Callback callback) {
        if (getTokenCall != null) getTokenCall.cancel();
        getTokenCall = Client.getToken();
        getTokenCall.execute(new DataActionListener<Token>() {
            @Override
            public void onDataAction(Token token) {
                WritableMap tokenMap = Arguments.createMap();
                //tokenMap.putString("signKey", token.getSignKey());
                tokenMap.putString("tokenString", token.getRawJwt());
                tokenMap.putDouble("expirationDate", token.getExpirationUnixTime());
                //tokenMap.putString("rlm", token.getTokenRLM().getRlm());
                tokenMap.putString("tokenOrigin", token.getOrigin().getOrigin());
                tokenMap.putDouble("expirationDate", token.getExpirationUnixTime());

                executeSuccessCallbackResponse(callback, tokenMap, null);
            }
        }, new DataActionListener<ApiError>() {
            @Override
            public void onDataAction(ApiError apiError) {
                executeFailureCallbackResponse(callback, null, apiError);
            }
        });
    }

    //getUUID()
    @ReactMethod(isBlockingSynchronousMethod = true)
    public String getUUID() {
        return Client.getUuid();
    }

    //regenerateUUID()
    @ReactMethod
    public void regenerateUUID() {
        Client.regenerateUuid();
    }

    //getAccount(onSuccess: (clientAccountInformation: ClientAccountInformation) => void, onError: (error: Error) => void)
    @ReactMethod
    public void getAccount(Callback callback) {
        if (getAccountCall != null) getAccountCall.cancel();
        getAccountCall = Client.getAccount();
        getAccountCall.execute(new DataActionListener<GetAccountInformation>() {
            @Override
            public void onDataAction(GetAccountInformation getAccountInformation) {
                WritableMap agreements = Arguments.createMap();
                agreements.putBoolean("email", getAccountInformation.getAgreements().getEmail());
                agreements.putBoolean("sms", getAccountInformation.getAgreements().getSms());
                agreements.putBoolean("push", getAccountInformation.getAgreements().getPush());
                agreements.putBoolean("bluetooth", getAccountInformation.getAgreements().getBluetooth());
                agreements.putBoolean("rfid", getAccountInformation.getAgreements().getRfid());
                agreements.putBoolean("wifi", getAccountInformation.getAgreements().getWifi());
                WritableMap accountMap = Arguments.createMap();
                accountMap.putDouble("clientId", getAccountInformation.getClientId());
                accountMap.putString("email", getAccountInformation.getEmail());
                accountMap.putString("phone", getAccountInformation.getPhone());
                accountMap.putString("customId", getAccountInformation.getCustomId());
                accountMap.putString("uuid", getAccountInformation.getUuid());
                accountMap.putString("firstName", getAccountInformation.getFirstName());
                accountMap.putString("lastName", getAccountInformation.getLastName());
                accountMap.putString("displayName", getAccountInformation.getDisplayName());
                accountMap.putString("company", getAccountInformation.getCompany());
                accountMap.putString("address", getAccountInformation.getAddress());
                accountMap.putString("city", getAccountInformation.getCity());
                accountMap.putString("province", getAccountInformation.getProvince());
                accountMap.putString("zipCode", getAccountInformation.getZipCode());
                accountMap.putString("countryCode", getAccountInformation.getCountryCode());
                accountMap.putString("birthDate", getAccountInformation.getBirthDate());
                accountMap.putString("sex", getAccountInformation.getSex().getSex());
                accountMap.putString("avatarUrl", getAccountInformation.getAvatarUrl());
                accountMap.putBoolean("anonymus", getAccountInformation.getAnonymous());
                accountMap.putMap("agreements", agreements);
                accountMap.putMap("attributes", MapUtil.stringMapToWritableMap(getAccountInformation.getAttributes()));
                accountMap.putArray("tags", ArrayUtil.toWritableArray(getAccountInformation.getTags()));
                if (getAccountInformation.getLastActivityDate() != null) {
                    accountMap.putDouble("lastActivityDate", getAccountInformation.getLastActivityDate().getTime());
                }

                executeSuccessCallbackResponse(callback, accountMap, null);
            }
        }, new DataActionListener<ApiError>() {
            @Override
            public void onDataAction(ApiError apiError) {
                executeFailureCallbackResponse(callback, null, apiError);
            }
        });
    }

    //updateAccount(context: ClientAccountUpdateContext, onSuccess: () => void, onError: (error: Error) => void)
    @ReactMethod
    public void updateAccount(ReadableMap map, Callback callback) {
        UpdateAccountInformation updateAccountInformation = new UpdateAccountInformation();
        updateAccountInformation.setEmail(map.hasKey("email") ? map.getString("email") : null);
        updateAccountInformation.setPhoneNumber(map.hasKey("phone") ? map.getString("phone") : null);
        updateAccountInformation.setCustomId(map.hasKey("customId") ? map.getString("customId") : null);
        updateAccountInformation.setUuid(map.hasKey("uuid") ? map.getString("uuid") : null);
        updateAccountInformation.setFirstName(map.hasKey("firstName") ? map.getString("firstName") : null);
        updateAccountInformation.setLastName(map.hasKey("lastName") ? map.getString("lastName") : null);
        updateAccountInformation.setDisplayName(map.hasKey("displayName") ? map.getString("displayName") : null);
        if (map.hasKey("sex")) {
            updateAccountInformation.setSex(Sex.getSex(map.getString("sex")));
        }
        updateAccountInformation.setBirthDate(map.hasKey("birthDate") ? map.getString("birthDate") : null);
        updateAccountInformation.setAvatarUrl(map.hasKey("avatarUrl") ? map.getString("avatarUrl") : null);
        updateAccountInformation.setCompany(map.hasKey("company") ? map.getString("company") : null);
        updateAccountInformation.setAddress(map.hasKey("address") ? map.getString("address") : null);
        updateAccountInformation.setCity(map.hasKey("city") ? map.getString("city") : null);
        updateAccountInformation.setProvince(map.hasKey("province") ? map.getString("province") : null);
        updateAccountInformation.setZipCode(map.hasKey("zipCode") ? map.getString("zipCode") : null);
        updateAccountInformation.setCountryCode(map.hasKey("countryCode") ? map.getString("countryCode") : null);

        if (map.hasKey("attributes")) {
            Attributes attributes = attributesMapper(map.getMap("attributes").toHashMap());
            updateAccountInformation.setAttributes(attributes);
        }

        if (map.hasKey("agreements")) {
            Agreements agreements = agreementsMapper(map.getMap("agreements"));
            updateAccountInformation.setAgreements(agreements);
        }

        updateAccountCall = Client.updateAccount(updateAccountInformation);
        updateAccountCall.execute(() -> executeSuccessCallbackResponse(callback, null, null), new DataActionListener<ApiError>() {
            @Override
            public void onDataAction(ApiError apiError) {
                executeFailureCallbackResponse(callback, null, apiError);
            }
        });
    }

    //requestPasswordReset(email: String, onSuccess: () => void, onError: (error: Error) => void)
    @ReactMethod
    public void requestPasswordReset(String email, Callback callback) {
        PasswordResetRequest passwordResetRequest = new PasswordResetRequest(email);
        passwordResetCall = Client.requestPasswordReset(passwordResetRequest);
        passwordResetCall.execute(() -> executeSuccessCallbackResponse(callback, null, null), new DataActionListener<ApiError>() {
            @Override
            public void onDataAction(ApiError apiError) {
                executeFailureCallbackResponse(callback, null, apiError);
            }
        });
    }

    //confirmPasswordReset(password: String, token: String, onSuccess: () => void, onError: (error: Error) => void)
    @ReactMethod
    public void confirmPasswordReset(String password, String token, Callback callback) {
        PasswordResetConfirmation passwordResetConfirmation = new PasswordResetConfirmation(password, token);
        IApiCall confirmPasswordReset = Client.confirmPasswordReset(passwordResetConfirmation);
        confirmPasswordReset.execute(() -> executeSuccessCallbackResponse(callback, null, null), new DataActionListener<ApiError>() {
            @Override
            public void onDataAction(ApiError apiError) {
                executeFailureCallbackResponse(callback, null, apiError);
            }
        });
    }

    //changePassword(oldPassword: String, newPassword: String, onSuccess: () => void, onError: (error: Error) => void)
    @ReactMethod
    public void changePassword(String oldPassword, String password, Callback callback) {
        IApiCall changePasswordCall = Client.changePassword(oldPassword, password);
        changePasswordCall.execute(() -> executeSuccessCallbackResponse(callback, null, null), new DataActionListener<ApiError>() {
            @Override
            public void onDataAction(ApiError apiError) {
                executeFailureCallbackResponse(callback, null, apiError);
            }
        });
    }

    //requestEmailChange(email: String, password: String, onSuccess: () => void, onError: (error: Error) => void)
    @ReactMethod
    public void requestEmailChange(String email, String password, Callback callback) {
        IApiCall emailChangeCall = Client.requestEmailChange(email, password, null);
        emailChangeCall.execute(() -> executeSuccessCallbackResponse(callback, null, null), new DataActionListener<ApiError>() {
            @Override
            public void onDataAction(ApiError apiError) {
                executeFailureCallbackResponse(callback, null, apiError);
            }
        });
    }

    //confirmEmailChange(token: String, newsletterAgreement: Boolean, onSuccess: () => void, onError: (error: Error) => void)
    @ReactMethod
    public void confirmEmailChange(String token, boolean newsletterAgreement, Callback callback) {
        IApiCall confirmEmailChange = Client.confirmEmailChange(token, newsletterAgreement);
        confirmEmailChange.execute(() -> executeSuccessCallbackResponse(callback, null, null), new DataActionListener<ApiError>() {
            @Override
            public void onDataAction(ApiError apiError) {
                executeFailureCallbackResponse(callback, null, apiError);
            }
        });
    }

    //requestPhoneUpdate(phone: String, onSuccess: () => void, onError: (error: Error) => void)
    @ReactMethod
    public void requestPhoneUpdate(String phone, Callback callback) {
        IApiCall requestPhoneUpdateCall = Client.requestPhoneUpdate(phone);
        requestPhoneUpdateCall.execute(() -> executeSuccessCallbackResponse(callback, null, null), new DataActionListener<ApiError>() {
            @Override
            public void onDataAction(ApiError apiError) {
                executeFailureCallbackResponse(callback, null, apiError);
            }
        });
    }

    //confirmPhoneUpdate(phone: String, confirmationCode: String, smsAgreement: Boolean, onSuccess: () => void, onError: (error: Error) => void)
    @ReactMethod
    public void confirmPhoneUpdate(String phone, String confirmationCode, @Nullable Boolean smsAgreement, Callback callback) {
        IApiCall confirmPhoneUpdateCall = Client.confirmPhoneUpdate(phone, confirmationCode, smsAgreement);
        confirmPhoneUpdateCall.execute(() -> executeSuccessCallbackResponse(callback, null, null), new DataActionListener<ApiError>() {
            @Override
            public void onDataAction(ApiError apiError) {
                executeFailureCallbackResponse(callback, null, apiError);
            }
        });
    }

    //deleteAccount(password: String, onSuccess: () => void, onError: (error: Error) => void)
    @ReactMethod
    public void deleteAccount(String password, Callback callback) {
        IApiCall deleteAccountCall = Client.deleteAccount(password);
        deleteAccountCall.execute(() -> executeSuccessCallbackResponse(callback, null, null), new DataActionListener<ApiError>() {
            @Override
            public void onDataAction(ApiError apiError) {
                executeFailureCallbackResponse(callback, null, apiError);
            }
        });
    }

    //recognizeAnonymous(email: String | null, customIdentify: String | null, parameters: Record<string, any> | null)
    @ReactMethod
    public void recognizeAnonymous(String email, String customIdentify, ReadableMap map) {
        HashMap<String, Object> parameters = new HashMap<>(MapUtil.toMap(map));
        Client.recognizeAnonymous(email, customIdentify, parameters);
    }

    private Attributes attributesMapper(HashMap<String, Object> map) {
           Attributes attributes = new Attributes();
            Iterator it = map.entrySet().iterator();
            while (it.hasNext()) {
                Map.Entry pair = (Map.Entry) it.next();
                if (pair.getValue() instanceof String) {
                    attributes.add(pair.getKey().toString(), pair.getValue().toString());
                }
                it.remove(); // avoids a ConcurrentModificationException
            }
            return attributes;
    }

    private Agreements agreementsMapper(ReadableMap map) {
        if (map != null) {
            Agreements agreements = new Agreements();
            agreements.setBluetooth(map.getBoolean("bluetooth"));
            agreements.setEmail(map.getBoolean("email"));
            agreements.setPush(map.getBoolean("push"));
            agreements.setRfid(map.getBoolean("rfid"));
            agreements.setWifi(map.getBoolean("wifi"));
            agreements.setSms(map.getBoolean("sms"));

            return agreements;
        } else {
            return null;
        }
    }
}
