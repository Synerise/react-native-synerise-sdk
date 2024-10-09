"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientModule = void 0;
var react_native_1 = require("react-native");
var SyneriseModuleConnector_1 = require("./../communication/SyneriseModuleConnector");
var BaseModel_1 = require("./../../classes/models/BaseModel");
var BaseModule_1 = require("./BaseModule");
var ClientAccountInformation_1 = require("./../../classes/models/Client/ClientAccountInformation");
var ClientConditionalAuthResult_1 = require("../../classes/models/Client/ClientConditionalAuthResult");
var ClientSessionEndReason_1 = require("../../classes/models/Client/ClientSessionEndReason");
var ClientSignOutMode_1 = require("../../classes/models/Client/ClientSignOutMode");
var Token_1 = require("./../../classes/models/Token/Token");
var SyneriseModuleEmitter_1 = require("./../communication/SyneriseModuleEmitter");
var RNClient = react_native_1.NativeModules.RNClient;
var ClientModule = /** @class */ (function (_super) {
    __extends(ClientModule, _super);
    function ClientModule() {
        var _this = _super.call(this) || this;
        _this.onClientSignedIn = function () {
            if (_this.listener !== undefined && _this.listener.onClientSignedIn != undefined) {
                _this.listener.onClientSignedIn();
            }
        };
        _this.onClientSignedOut = function (event) {
            if (_this.listener !== undefined && _this.listener.onClientSignedOut != undefined) {
                var reason = ClientSessionEndReason_1.ClientSessionEndReasonFromString(event.reason);
                _this.listener.onClientSignedOut(reason);
            }
        };
        _this.configureListeners();
        return _this;
    }
    ClientModule.instance = function () {
        if (this._instance === undefined) {
            this._instance = new ClientModule();
        }
        return this._instance;
    };
    ClientModule.prototype.configureListeners = function () {
        this.configureClientSignedInListener();
        this.configureClientSignedOutListener();
    };
    ClientModule.prototype.configureClientSignedInListener = function () {
        SyneriseModuleEmitter_1.SyneriseModuleEmitter.getEmitter().addListener(RNClient.CLIENT_SIGNED_IN_LISTENER_KEY, this.onClientSignedIn);
    };
    ClientModule.prototype.configureClientSignedOutListener = function () {
        SyneriseModuleEmitter_1.SyneriseModuleEmitter.getEmitter().addListener(RNClient.CLIENT_SIGNED_OUT_LISTENER_KEY, this.onClientSignedOut);
    };
    /**
     * This method sets callbacks for a customer’s state changes.
     *
     * @param listener An object that implements the `IClientStateChangeListener` interface
     */
    ClientModule.prototype.setClientStateChangeListener = function (listener) {
        this.listener = listener;
    };
    /**
     * This method registers a new customer with an email, password, and optional data.
     *
     * @param context `ClientAccountRegisterContext` object with client's email, password, and other optional data. Fields that are not provided are not modified
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     */
    ClientModule.prototype.registerAccount = function (context, onSuccess, onError) {
        var contextObject = context.toObject();
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNClient.registerAccount, [contextObject], onSuccess, onError);
    };
    /**
     * This method confirms a customer account with the confirmation token.
     *
     * @param token Customer’s token provided by email
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     */
    ClientModule.prototype.confirmAccount = function (token, onSuccess, onError) {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNClient.confirmAccount, [token], onSuccess, onError);
    };
    /**
     * This method activates a customer with email.
     *
     * @param email Customer’s email
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     */
    ClientModule.prototype.activateAccount = function (email, onSuccess, onError) {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNClient.activateAccount, [email], onSuccess, onError);
    };
    /**
     * This method requests a customer’s account registration process with the PIN code.
     *
     * @param email Customer’s email
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     */
    ClientModule.prototype.requestAccountActivationByPin = function (email, onSuccess, onError) {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNClient.requestAccountActivationByPin, [email], onSuccess, onError);
    };
    /**
     * This method confirms a customer’s account registration process with the PIN code.
     *
     * @param pinCode Code sent to a customer’s email
     * @param email Customer’s email
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     */
    ClientModule.prototype.confirmAccountActivationByPin = function (pinCode, email, onSuccess, onError) {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNClient.confirmAccountActivationByPin, [pinCode, email], onSuccess, onError);
    };
    /**
     * This method signs a customer in to obtain a JSON Web Token (JWT) which can be used in subsequent requests.
     *
     * @param email Customer’s email
     * @param password Customer’s password
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     */
    ClientModule.prototype.signIn = function (email, password, onSuccess, onError) {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNClient.signIn, [email, password], onSuccess, onError);
    };
    /**
     * This method signs a customer in to obtain a JSON Web Token (JWT) which can be used in subsequent requests.
     *
     * @param email Customer’s email
     * @param password Customer’s password
     * @param onError Function to be executed when the operation finishes unsuccessfully
     */
    ClientModule.prototype.signInConditionally = function (email, password, onSuccess, onError) {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNClient.signInConditionally, [email, password], onSuccess, onError, BaseModel_1.ModelMapper.make(ClientConditionalAuthResult_1.ClientConditionalAuthResult));
    };
    /**
     * This method authenticates a customer with OAuth, Facebook, Google, Apple, or Synerise.
     *
     * @param token Token retrieved from provider
     * @param provider Provider of your token
     * @param context `ClientAuthContext` object with agreements and optional attributes
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     */
    ClientModule.prototype.authenticate = function (token, provider, context, onSuccess, onError) {
        var contextObject = context.toObject();
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNClient.authenticate, [token, provider, contextObject], onSuccess, onError);
    };
    /**
     * This method authenticates a customer with OAuth, Facebook, Google, Apple, or Synerise.
     *
     * @param token Token retrieved from provider
     * @param provider Provider of your token
     * @param context `ClientAuthContext` object with agreements and optional attributes
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     */
    ClientModule.prototype.authenticateConditionally = function (token, provider, context, onSuccess, onError) {
        var contextObject = context.toObject();
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNClient.authenticateConditionally, [token, provider, contextObject], onSuccess, onError, BaseModel_1.ModelMapper.make(ClientConditionalAuthResult_1.ClientConditionalAuthResult));
    };
    /**
     * This method authenticates a customer with OAuth.
     *
     * @param accessToken OAuth Access Token
     * @param context `ClientOAuthAuthenticationContext` object with agreements and optional attributes
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     *
     * @deprecated Use the new `Client.authenticate(token:provider:context:onSuccess:onError)` method with `OAuth` provider instead.
     */
    ClientModule.prototype.authenticateByOAuth = function (accessToken, context, onSuccess, onError) {
        var contextObject = context.toObject();
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNClient.authenticateByOAuth, [accessToken, contextObject], onSuccess, onError);
    };
    /**
     * This method authenticates a customer with OAuth.
     *
     * @param accessToken OAuth Access Token
     * @param authID Optional identifier of authorization
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     *
     * @deprecated Use the new `Client.authenticateConditionally(token:provider:context:onSuccess:onError)` method with `OAuth` provider instead.
     */
    ClientModule.prototype.authenticateByOAuthIfRegistered = function (accessToken, authID, onSuccess, onError) {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNClient.authenticateByOAuthIfRegistered, [accessToken, authID], onSuccess, onError);
    };
    /**
     * This method authenticates a customer with OAuth.
     *
     * @param facebookToken Facebook Access Token
     * @param context `ClientFacebookAuthenticationContext` object with agreements and optional attributes
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     *
     * @deprecated Use the new `Client.authenticate(token:provider:context:onSuccess:onError)` method with `Facebook` provider instead.
     */
    ClientModule.prototype.authenticateByFacebook = function (facebookToken, context, onSuccess, onError) {
        var contextObject = context.toObject();
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNClient.authenticateByFacebook, [facebookToken, contextObject], onSuccess, onError);
    };
    /**
     * This method authenticates a customer with OAuth.
     *
     * @param facebookToken Facebook Access Token
     * @param authID Optional identifier of authorization
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     *
     * @deprecated Use the new `Client.authenticateConditionally(token:provider:context:onSuccess:onError)` method with `Facebook` provider instead.
     */
    ClientModule.prototype.authenticateByFacebookIfRegistered = function (facebookToken, authID, onSuccess, onError) {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNClient.authenticateByFacebookIfRegistered, [facebookToken, authID], onSuccess, onError);
    };
    /**
     * This method authenticates a customer with OAuth.
     *
     * @param identityToken Apple Identity Token
     * @param context `ClientAppleSignInAuthenticationContext` object with agreements and optional attributes
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     *
     * @deprecated Use the new `Client.authenticate(token:provider:context:onSuccess:onError)` method with `Apple` provider instead.
     */
    ClientModule.prototype.authenticateByAppleSignIn = function (identityToken, context, onSuccess, onError) {
        if (react_native_1.Platform.OS !== 'ios') {
            console.error('Synerise.Client.authenticateByAppleSignIn method works on iOS platform only!');
            return;
        }
        var contextObject = context.toObject();
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNClient.authenticateByAppleSignIn, [identityToken, contextObject], onSuccess, onError);
    };
    /**
     * This method authenticates a customer with OAuth.
     *
     * @param identityToken Apple Identity Token
     * @param authID Optional identifier of authorization
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     *
     * @deprecated Use the new `Client.authenticateConditionally(token:provider:context:onSuccess:onError)` method with `Apple` provider instead.
     */
    ClientModule.prototype.authenticateByAppleSignInIfRegistered = function (identityToken, authID, onSuccess, onError) {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNClient.authenticateByAppleSignInIfRegistered, [identityToken, authID], onSuccess, onError);
    };
    /**
     * This method signs in a customer with Simple Authentication.
     *
     * @param data Apple `ClientSimpleAuthenticationData` object with client's data information to be modified. Fields that are not provided are not modified.
     * @param authID Optional identifier of authorization
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     */
    ClientModule.prototype.simpleAuthentication = function (data, authID, onSuccess, onError) {
        var dataObject = data.toObject();
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNClient.simpleAuthentication, [dataObject, authID], onSuccess, onError);
    };
    /**
     * This method checks if a customer is signed in via Synerise, External Provider or OAuth (if client's token is not expired).
     *
     * @returns `true` if the customer is signed in, otherwise returns `false`
     */
    ClientModule.prototype.isSignedIn = function () {
        return SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithReturnValue(RNClient.isSignedIn, []);
    };
    /**
     * This method checks if a customer is signed in via Simple Authentication (if anonymous's token is not expired and its origin is TokenOrigin.SimpleAuth)
     *
     * @returns `true` if the customer is signed in, otherwise returns `false`
     */
    ClientModule.prototype.isSignedInViaSimpleAuthentication = function () {
        return SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithReturnValue(RNClient.isSignedInViaSimpleAuthentication, []);
    };
    /**
     * This method signs out a customer and clears the customer’s JWT token.
     */
    ClientModule.prototype.signOut = function () {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithReturnValue(RNClient.signOut, []);
    };
    /**
     * This method signs out a customer and clears the customer’s JWT token.
     *
     * @param mode Logout mode
     * @param fromAllDevices Determines whether it should sign out all devices
     */
    ClientModule.prototype.signOutWithMode = function (mode, fromAllDevices, onSuccess, onError) {
        var modeObject = ClientSignOutMode_1.ClientSignOutModeToString(mode);
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNClient.signOutWithMode, [modeObject, fromAllDevices], onSuccess, onError);
    };
    /**
     * This method refreshes the customer’s current token.
     *
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     */
    ClientModule.prototype.refreshToken = function (onSuccess, onError) {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNClient.refreshToken, [], onSuccess, onError);
    };
    /**
     * This method retrieves the customer’s current, active token.
     *
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     */
    ClientModule.prototype.retrieveToken = function (onSuccess, onError) {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNClient.retrieveToken, [], onSuccess, onError, BaseModel_1.ModelMapper.make(Token_1.Token));
    };
    /**
     * This method retrieves the customer’s current UUID.
     *
     * @returns the customer’s UUID as string.
     */
    ClientModule.prototype.getUUID = function () {
        return SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithReturnValue(RNClient.getUUID, []);
    };
    /**
     * This method regenerates the UUID and clears the authentication token, login session, custom email, and custom identifier.
     */
    ClientModule.prototype.regenerateUUID = function () {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethod(RNClient.regenerateUUID, []);
    };
    /**
     * This method regenerates the UUID and clears the authentication token, login session, custom email, and custom identifier.
     *
     * @param clientIdentifier A seed for UUID generation
     */
    ClientModule.prototype.regenerateUUIDWithClientIdentifier = function (clientIdentifier) {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethod(RNClient.regenerateUUIDWithClientIdentifier, [clientIdentifier]);
    };
    /**
     * This method destroys the whole session completely.
     */
    ClientModule.prototype.destroySession = function () {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethod(RNClient.destroySession, []);
    };
    /**
     * This method gets a customer’s account information.
     *
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     */
    ClientModule.prototype.getAccount = function (onSuccess, onError) {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNClient.getAccount, [], onSuccess, onError, BaseModel_1.ModelMapper.make(ClientAccountInformation_1.ClientAccountInformation));
    };
    /**
     * This method updates a customer’s account basic information.
     *
     * @param context Object with customer’s first name, phone, and other optional data
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     */
    ClientModule.prototype.updateAccountBasicInformation = function (context, onSuccess, onError) {
        var contextObject = context.toObject();
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNClient.updateAccountBasicInformation, [contextObject], onSuccess, onError);
    };
    /**
     * This method updates a customer’s account information.
     *
     * @param context Object with customer’s email, password, and other optional data
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     */
    ClientModule.prototype.updateAccount = function (context, onSuccess, onError) {
        var contextObject = context.toObject();
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNClient.updateAccount, [contextObject], onSuccess, onError);
    };
    /**
     * This method requests a customer’s password reset with email.
     *
     * @param email Customer’s email
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     */
    ClientModule.prototype.requestPasswordReset = function (email, onSuccess, onError) {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNClient.requestPasswordReset, [email], onSuccess, onError);
    };
    /**
     * This method confirm a customer’s password reset with the new password and token provided by password reset request.
     *
     * @param password Customer’s new password
     * @param token Customer’s token provided in an email
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     */
    ClientModule.prototype.confirmPasswordReset = function (password, token, onSuccess, onError) {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNClient.confirmPasswordReset, [password, token], onSuccess, onError);
    };
    /**
     * This method changes a customer’s password.
     *
     * @param oldPassword Customer’s new password
     * @param newPassword Customer’s old password
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     */
    ClientModule.prototype.changePassword = function (oldPassword, newPassword, onSuccess, onError) {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNClient.changePassword, [oldPassword, newPassword], onSuccess, onError);
    };
    /**
     * This method requests a customer’s email change.
     *
     * @param email Customer’s new email
     * @param password Customer’s password
     * @param externalToken Token retrieved from provider
     * @param authID Optional identifier of authorization
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     */
    ClientModule.prototype.requestEmailChange = function (email, password, externalToken, authID, onSuccess, onError) {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNClient.requestEmailChange, [email, password, externalToken, authID], onSuccess, onError);
    };
    /**
     * This method confirms an email change.
     *
     * @param token Customer’s token provided in an email
     * @param newsletterAgreement Agreement for sending newsletters to the provided email
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     */
    ClientModule.prototype.confirmEmailChange = function (token, newsletterAgreement, onSuccess, onError) {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNClient.confirmEmailChange, [token, newsletterAgreement], onSuccess, onError);
    };
    /**
     * Requests a customer’s phone update. A confirmation code is sent to the phone number.
     *
     * @param phone Customer’s new phone number
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     */
    ClientModule.prototype.requestPhoneUpdate = function (phone, onSuccess, onError) {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNClient.requestPhoneUpdate, [phone], onSuccess, onError);
    };
    /**
     * This method confirms a phone number update. This action requires the new phone number and confirmation code as parameters.
     *
     * @param phone New phone number
     * @param confirmationCode A confirmation code received by a text message
     * @param smsAgreement Agreement for sending SMS to the provided number
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     */
    ClientModule.prototype.confirmPhoneUpdate = function (phone, confirmationCode, smsAgreement, onSuccess, onError) {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNClient.confirmPhoneUpdate, [phone, confirmationCode, smsAgreement], onSuccess, onError);
    };
    /**
     * This method deletes a customer’s account.
     *
     * @param clientAuthFactor Token retrieved from provider
     * @param clientIdentityProvider Provider of your token
     * @param authID Optional identifier of authorization
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     */
    ClientModule.prototype.deleteAccountByIdentityProvider = function (clientAuthFactor, clientIdentityProvider, authID, onSuccess, onError) {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNClient.deleteAccountByIdentityProvider, [clientAuthFactor, clientIdentityProvider, authID], onSuccess, onError);
    };
    /**
     * This method deletes a customer’s account.
     *
     * @param password Customer’s password
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     *
     * @deprecated Use the new `Client.deleteAccountByIdentityProvider(clientAuthFactor:clientIdentityProvider:authID:onSuccess:onError)` with `Synerise` provider method instead.
     */
    ClientModule.prototype.deleteAccount = function (password, onSuccess, onError) {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNClient.deleteAccount, [password], onSuccess, onError);
    };
    /**
     * This method deletes a customer’s account by OAuth.
     *
     * @param accessToken OAuth Access Token
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     *
     * @deprecated Use the new `Client.deleteAccountByIdentityProvider(clientAuthFactor:clientIdentityProvider:authID:onSuccess:onError)` method instead.
     */
    ClientModule.prototype.deleteAccountByOAuth = function (accessToken, onSuccess, onError) {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNClient.deleteAccountByOAuth, [accessToken], onSuccess, onError);
    };
    /**
     * This method deletes a customer’s account by Facebook.
     *
     * @param facebookToken Facebook Access Token
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     *
     * @deprecated Use the new `Client.deleteAccountByIdentityProvider(clientAuthFactor:clientIdentityProvider:authID:onSuccess:onError)` method instead.
     */
    ClientModule.prototype.deleteAccountByFacebook = function (facebookToken, onSuccess, onError) {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNClient.deleteAccountByFacebook, [facebookToken], onSuccess, onError);
    };
    /**
     * This method recognizes anonymous users and save personal information from their CRM entries.
     *
     * @param email Customer's email
     * @param customIdentify Customer's custom identifier
     * @param parameters Customer's custom parameters
     */
    ClientModule.prototype.recognizeAnonymous = function (email, customIdentify, parameters) {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethod(RNClient.recognizeAnonymous, [email, customIdentify, parameters]);
    };
    return ClientModule;
}(BaseModule_1.BaseModule));
exports.ClientModule = ClientModule;
