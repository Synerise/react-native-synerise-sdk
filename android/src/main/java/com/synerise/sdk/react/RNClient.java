package com.synerise.sdk.react;

import android.util.Log;

import androidx.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.google.gson.Gson;
import com.synerise.sdk.client.model.AuthConditions;
import com.synerise.sdk.client.model.ClientIdentityProvider;
import com.synerise.sdk.client.model.listener.OnClientStateChangeListener;
import com.synerise.sdk.core.listeners.ActionListener;
import com.synerise.sdk.core.types.enums.ClientSessionEndReason;
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

import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import javax.annotation.Nonnull;

public class RNClient extends RNBaseModule {

    private ReactApplicationContext reactApplicationContext;
    private IApiCall signInCall, signUpCall, confirmCall, activateCall, updateAccountCall, refreshTokenCall;
    private IApiCall passwordResetCall, deleteAccountByFacebookCall, deleteAccountByOAuthCall;
    private IDataApiCall<Token> getTokenCall;
    private IDataApiCall<GetAccountInformation> getAccountCall;
    private Gson gson = new Gson();
    private static OnClientStateChangeListener clientStateChangeListener;
    private final String CLIENT_SIGNED_IN_LISTENER_KEY = "CLIENT_SIGNED_IN_LISTENER_KEY";
    private final String CLIENT_SIGNED_OUT_LISTENER_KEY = "CLIENT_SIGNED_OUT_LISTENER_KEY";
    private final String CLIENT_SIGNED_IN_LISTENER_VALUE = "OnClientSignedIn";
    private final String CLIENT_SIGNED_OUT_LISTENER_VALUE = "OnClientSignedOut";
    private final String SESSION_END_REASON_KEY = "reason";

    public RNClient(ReactApplicationContext reactApplicationContext) {
        super(reactApplicationContext);

        this.reactApplicationContext = reactApplicationContext;

        clientStateChangeListener = new OnClientStateChangeListener() {
            @Override
            public void onClientSignedIn() {
                super.onClientSignedIn();
                sendUserSignedInEvent();
            }

            @Override
            public void onClientSignedOut(ClientSessionEndReason reason) {
                super.onClientSignedOut(reason);
                sendUserSignedOutEvent(reason);
            }
        };
    }

    @javax.annotation.Nullable
    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put(CLIENT_SIGNED_IN_LISTENER_KEY, CLIENT_SIGNED_IN_LISTENER_VALUE);
        constants.put(CLIENT_SIGNED_OUT_LISTENER_KEY, CLIENT_SIGNED_OUT_LISTENER_VALUE);
        return constants;
    }

    @Nonnull
    @Override
    public String getName() {
        return "RNClient";
    }

    //signIn(email: string, password: string, onSuccess: () => void, onError: (error: Error) => void)
    @ReactMethod
    public void signIn(String email, String password, Callback callback) {
        if (signInCall != null) signInCall.cancel();
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

    //destroySession()
    @ReactMethod
    public void destroySession() {
        Client.destroySession();
    }

    //refreshToken(onSuccess: () => void, onError: (error: Error) => void)
    @ReactMethod
    public void refreshToken(Callback callback) {
        if (refreshTokenCall != null) refreshTokenCall.cancel();
        refreshTokenCall = Client.refreshToken();
        refreshTokenCall.execute(() -> executeSuccessCallbackResponse(callback, null, null), new DataActionListener<ApiError>() {
            @Override
            public void onDataAction(ApiError apiError) {
                executeFailureCallbackResponse(callback, null, apiError);
            }
        });
    }

    //authenticate(token: string, provider: ClientIdentityProvider, context: ClientAuthContext, onSuccess: () => void, onError: (error: Error) => void)
    @ReactMethod
    public void authenticate(String token, String clientIdentityProvider, ReadableMap contextMap, Callback callback) {
        Agreements agreements = null;
        Attributes attributes = null;
        String authID = null;
        if (contextMap.hasKey("agreements")) {
            agreements = agreementsMapper(contextMap.getMap("agreements"));
        }

        if (contextMap.hasKey("attributes") && contextMap.getMap("attributes") != null) {
            attributes = attributesMapper(contextMap.getMap("attributes").toHashMap());
        }

        if (contextMap.hasKey("authID")) {
            authID = contextMap.getString("authID");
        }

        IApiCall authenticateCall = Client.authenticate(token, ClientIdentityProvider.getByProvider(clientIdentityProvider), agreements, attributes, authID);
        authenticateCall.execute(() -> executeSuccessCallbackResponse(callback, null, null), new DataActionListener<ApiError>() {
            @Override
            public void onDataAction(ApiError apiError) {
                executeFailureCallbackResponse(callback, null, apiError);
            }
        });
    }

    //signInConditionally(email: string, password: string, onSuccess: (authResult: ClientConditionalAuthResult) => void, onError: (error: Error) => void)
    @ReactMethod
    public void signInConditionally(String email, String password, Callback callback) {
        IDataApiCall<AuthConditions> apiDataCallConditional = Client.signInConditionally(email, password);
        apiDataCallConditional.execute(new DataActionListener<AuthConditions>() {
            @Override
            public void onDataAction(AuthConditions response) {
                WritableMap authMap = Arguments.createMap();

                if (response.getStatus() != null) {
                    authMap.putString("status", response.getStatus().toString());
                }

                ArrayList<Object> conditions = response.getConditions();
                if (conditions != null) {
                    WritableArray array = Arguments.createArray();
                    for (Object object : conditions) {
                        try {
                            String jsonObject = gson.toJson(object);
                            WritableMap objectMap = convertJsonToMap(new JSONObject(jsonObject));
                            array.pushMap(objectMap);
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                    }
                    authMap.putArray("conditions", array);
                }

                executeSuccessCallbackResponse(callback, authMap, null);
            }
        }, new DataActionListener<ApiError>() {
            @Override
            public void onDataAction(ApiError apiError) {
                executeFailureCallbackResponse(callback, null, apiError);
            }
        });
    }

    //authenticateConditionally(token: string, provider: ClientIdentityProvider, context: ClientAuthContext, onSuccess: (authResult: ClientConditionalAuthResult) => void, onError: (error: Error) => void)
    @ReactMethod
    public void authenticateConditionally(String token, String provider, ReadableMap contextMap, Callback callback) {
        Agreements agreements = null;
        Attributes attributes = null;
        String authID = null;
        if (contextMap.hasKey("agreements")) {
            agreements = agreementsMapper(contextMap.getMap("agreements"));
        }

        if (contextMap.hasKey("attributes") && contextMap.getMap("attributes") != null) {
            attributes = attributesMapper(contextMap.getMap("attributes").toHashMap());
        }

        if (contextMap.hasKey("authID")) {
            authID = contextMap.getString("authID");
        }

        IDataApiCall<AuthConditions> apiDataCallConditional = Client.authenticateConditionally(token, ClientIdentityProvider.getByProvider(provider), agreements, attributes, authID);
        apiDataCallConditional.execute(new DataActionListener<AuthConditions>() {
            @Override
            public void onDataAction(AuthConditions response) {
                WritableMap authMap = Arguments.createMap();

                if (response.getStatus() != null) {
                    authMap.putString("status", response.getStatus().toString());
                }

                ArrayList<Object> conditions = response.getConditions();
                if (conditions != null) {
                    WritableArray array = Arguments.createArray();
                    for (Object object : conditions) {
                        try {
                            String jsonObject = gson.toJson(object);
                            WritableMap objectMap = convertJsonToMap(new JSONObject(jsonObject));
                            array.pushMap(objectMap);
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                    }
                    authMap.putArray("conditions", array);
                }

                executeSuccessCallbackResponse(callback, authMap, null);
            }
        }, new DataActionListener<ApiError>() {
            @Override
            public void onDataAction(ApiError apiError) {
                executeFailureCallbackResponse(callback, null, apiError);
            }
        });
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

    @ReactMethod
    public void authenticateByOAuthIfRegistered(String accessToken, String authID, Callback callback) {
        IApiCall authenticateByOAuthIfRegisteredCall = Client.authenticateByOAuthIfRegistered(accessToken, authID);
        authenticateByOAuthIfRegisteredCall.execute(() -> executeSuccessCallbackResponse(callback, null, null), new DataActionListener<ApiError>() {
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
        IApiCall authenticateByFacebookIfRegisteredCall = Client.authenticateByFacebookIfRegistered(facebookToken, authID);
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

        if (signUpCall != null) signUpCall.cancel();
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
        if (confirmCall != null) confirmCall.cancel();
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
        if (activateCall != null) activateCall.cancel();
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

    @ReactMethod
    public void regenerateUUID(String clientIdentifier) {
        Client.regenerateUuid(clientIdentifier);
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
                accountMap.putBoolean("anonymous", getAccountInformation.getAnonymous());
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

        if (updateAccountCall != null) updateAccountCall.cancel();
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
        if (passwordResetCall != null) passwordResetCall.cancel();
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

    //requestEmailChange(email: String, password: String, externalToken: String, authId: String, onSuccess: () => void, onError: (error: Error) => void)
    @ReactMethod
    public void requestEmailChange(String email, String password, @Nullable String externalToken, @Nullable String authId, Callback callback) {
        IApiCall emailChangeCall = Client.requestEmailChange(email, password, externalToken, authId);
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

    @ReactMethod
    public void requestAccountActivationByPin(String email, Callback callback) {
        IApiCall requestAccountActivationCall = Client.requestAccountActivationByPin(email);
        requestAccountActivationCall.execute(() -> executeSuccessCallbackResponse(callback, null, null), new DataActionListener<ApiError>() {
            @Override
            public void onDataAction(ApiError apiError) {
                executeFailureCallbackResponse(callback, null, apiError);
            }
        });
    }

    @ReactMethod
    public void confirmAccountActivationByPin(String pinCode, String email, Callback callback) {
        IApiCall confirmAccountActivationCall = Client.confirmAccountActivationByPin(pinCode, email);
        confirmAccountActivationCall.execute(() -> executeSuccessCallbackResponse(callback, null, null), new DataActionListener<ApiError>() {
            @Override
            public void onDataAction(ApiError apiError) {
                executeFailureCallbackResponse(callback, null, apiError);
            }
        });
    }

    @ReactMethod
    public void deleteAccountByIdentityProvider(String clientAuthFactor, String clientIdentityProvider, String authId, Callback callback) {
        IApiCall deleteAccountCall = Client.deleteAccount(clientAuthFactor, ClientIdentityProvider.getByProvider(clientIdentityProvider), authId);
        deleteAccountCall.execute(() -> executeSuccessCallbackResponse(callback, null, null), new DataActionListener<ApiError>() {
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

    @ReactMethod
    public void deleteAccountByFacebook(String facebookToken, Callback callback) {
        if (deleteAccountByFacebookCall != null) deleteAccountByFacebookCall.cancel();
        deleteAccountByFacebookCall = Client.deleteAccountByFacebook(facebookToken, null);
        deleteAccountByFacebookCall.execute(() -> executeSuccessCallbackResponse(callback, null, null), new DataActionListener<ApiError>() {
            @Override
            public void onDataAction(ApiError apiError) {
                executeFailureCallbackResponse(callback, null, apiError);
            }
        });
    }

    @ReactMethod
    public void deleteAccountByOAuth(String accessToken, Callback callback) {
        if (deleteAccountByOAuthCall != null) deleteAccountByOAuthCall.cancel();
        deleteAccountByOAuthCall = Client.deleteAccountByOAuth(accessToken, null);
        deleteAccountByOAuthCall.execute(() -> executeSuccessCallbackResponse(callback, null, null), new DataActionListener<ApiError>() {
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
            if (map.hasKey("bluetooth")) agreements.setBluetooth(map.getBoolean("bluetooth"));
            if (map.hasKey("email")) agreements.setEmail(map.getBoolean("email"));
            if (map.hasKey("push")) agreements.setPush(map.getBoolean("push"));
            if (map.hasKey("rfid")) agreements.setRfid(map.getBoolean("rfid"));
            if (map.hasKey("wifi")) agreements.setWifi(map.getBoolean("wifi"));
            if (map.hasKey("sms")) agreements.setSms(map.getBoolean("sms"));

            return agreements;
        } else {
            return null;
        }
    }

    protected static void initializeClient() {
        registerClientStateListener();
    }

    private static void registerClientStateListener() {
        Client.setOnClientStateChangeListener(clientStateChangeListener);
    }

    private void sendUserSignedInEvent() {
        if (RNSyneriseInitializer.isInitialized) {
            WritableMap data = Arguments.createMap();
            sendEventToJs(CLIENT_SIGNED_IN_LISTENER_VALUE, data, reactApplicationContext);
        }
    }

    private void sendUserSignedOutEvent(ClientSessionEndReason reason) {
        if (RNSyneriseInitializer.isInitialized) {
            WritableMap data = Arguments.createMap();
            data.putString(SESSION_END_REASON_KEY, reason.toString());
            sendEventToJs(CLIENT_SIGNED_OUT_LISTENER_VALUE, data, reactApplicationContext);
        }
    }
}
