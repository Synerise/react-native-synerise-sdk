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
var react_native_1 = require("react-native");
var SyneriseModuleConnector_1 = require("./../communication/SyneriseModuleConnector");
var BaseModel_1 = require("./../../classes/models/BaseModel");
var BaseModule_1 = require("./BaseModule");
var ClientAccountInformation_1 = require("./../../classes/models/Client/ClientAccountInformation");
var ClientSessionEndReason_1 = require("../../classes/models/Client/ClientSessionEndReason");
var ClientConditionalAuthResult_1 = require("../../classes/models/Client/ClientConditionalAuthResult");
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
    ClientModule.prototype.setClientStateChangeListener = function (listener) {
        this.listener = listener;
    };
    ClientModule.prototype.registerAccount = function (context, onSuccess, onError) {
        var contextObject = context.toObject();
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNClient.registerAccount, [contextObject], onSuccess, onError);
    };
    ClientModule.prototype.confirmAccount = function (token, onSuccess, onError) {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNClient.confirmAccount, [token], onSuccess, onError);
    };
    ClientModule.prototype.activateAccount = function (email, onSuccess, onError) {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNClient.activateAccount, [email], onSuccess, onError);
    };
    ClientModule.prototype.signIn = function (email, password, onSuccess, onError) {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNClient.signIn, [email, password], onSuccess, onError);
    };
    ClientModule.prototype.signInConditionally = function (email, password, onSuccess, onError) {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNClient.signInConditionally, [email, password], onSuccess, onError, BaseModel_1.ModelMapper.make(ClientConditionalAuthResult_1.ClientConditionalAuthResult));
    };
    ClientModule.prototype.authenticate = function (token, provider, context, onSuccess, onError) {
        var contextObject = context.toObject();
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNClient.authenticate, [token, provider, contextObject], onSuccess, onError);
    };
    ClientModule.prototype.authenticateConditionally = function (token, provider, context, onSuccess, onError) {
        var contextObject = context.toObject();
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNClient.authenticateConditionally, [token, provider, contextObject], onSuccess, onError, BaseModel_1.ModelMapper.make(ClientConditionalAuthResult_1.ClientConditionalAuthResult));
    };
    /**
     * @deprecated please use authenticate method with OAuth provider instead
     */
    ClientModule.prototype.authenticateByOAuth = function (accessToken, context, onSuccess, onError) {
        var contextObject = context.toObject();
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNClient.authenticateByOAuth, [accessToken, contextObject], onSuccess, onError);
    };
    /**
     * @deprecated please use authenticateConditionally method with OAuth provider instead
     */
    ClientModule.prototype.authenticateByOAuthIfRegistered = function (accessToken, authID, onSuccess, onError) {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNClient.authenticateByOAuthIfRegistered, [accessToken, authID], onSuccess, onError);
    };
    /**
     * @deprecated please use authenticate method with Facebook provider instead
     */
    ClientModule.prototype.authenticateByFacebook = function (facebookToken, context, onSuccess, onError) {
        var contextObject = context.toObject();
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNClient.authenticateByFacebook, [facebookToken, contextObject], onSuccess, onError);
    };
    /**
     * @deprecated please use authenticateConditionally method with Facebook provider instead
     */
    ClientModule.prototype.authenticateByFacebookIfRegistered = function (facebookToken, authID, onSuccess, onError) {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNClient.authenticateByFacebookIfRegistered, [facebookToken, authID], onSuccess, onError);
    };
    ClientModule.prototype.authenticateByAppleSignIn = function (identityToken, context, onSuccess, onError) {
        if (react_native_1.Platform.OS !== 'ios') {
            console.error('Synerise.Client.authenticateByAppleSignIn method works on iOS platform only!');
            return;
        }
        var contextObject = context.toObject();
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNClient.authenticateByAppleSignIn, [identityToken, contextObject], onSuccess, onError);
    };
    ClientModule.prototype.authenticateByAppleSignInIfRegistered = function (identityToken, authID, onSuccess, onError) {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNClient.authenticateByAppleSignInIfRegistered, [identityToken, authID], onSuccess, onError);
    };
    ClientModule.prototype.isSignedIn = function () {
        return SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithReturnValue(RNClient.isSignedIn, []);
    };
    ClientModule.prototype.signOut = function () {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithReturnValue(RNClient.signOut, []);
    };
    ClientModule.prototype.refreshToken = function (onSuccess, onError) {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNClient.refreshToken, [], onSuccess, onError);
    };
    ClientModule.prototype.retrieveToken = function (onSuccess, onError) {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNClient.retrieveToken, [], onSuccess, onError, BaseModel_1.ModelMapper.make(Token_1.Token));
    };
    ClientModule.prototype.getUUID = function () {
        return SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithReturnValue(RNClient.getUUID, []);
    };
    ClientModule.prototype.regenerateUUID = function () {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethod(RNClient.regenerateUUID, []);
    };
    ClientModule.prototype.regenerateUUIDWithClientIdentifier = function (clientIdentifier) {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethod(RNClient.regenerateUUIDWithClientIdentifier, [clientIdentifier]);
    };
    ClientModule.prototype.destroySession = function () {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethod(RNClient.destroySession, []);
    };
    ClientModule.prototype.getAccount = function (onSuccess, onError) {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNClient.getAccount, [], onSuccess, onError, BaseModel_1.ModelMapper.make(ClientAccountInformation_1.ClientAccountInformation));
    };
    ClientModule.prototype.updateAccount = function (context, onSuccess, onError) {
        var contextObject = context.toObject();
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNClient.updateAccount, [contextObject], onSuccess, onError);
    };
    ClientModule.prototype.requestPasswordReset = function (email, onSuccess, onError) {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNClient.requestPasswordReset, [email], onSuccess, onError);
    };
    ClientModule.prototype.confirmPasswordReset = function (password, token, onSuccess, onError) {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNClient.confirmPasswordReset, [password, token], onSuccess, onError);
    };
    ClientModule.prototype.changePassword = function (oldPassword, newPassword, onSuccess, onError) {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNClient.changePassword, [oldPassword, newPassword], onSuccess, onError);
    };
    ClientModule.prototype.requestEmailChange = function (email, password, externalToken, authID, onSuccess, onError) {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNClient.requestEmailChange, [email, password, externalToken, authID], onSuccess, onError);
    };
    ClientModule.prototype.confirmEmailChange = function (token, newsletterAgreement, onSuccess, onError) {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNClient.confirmEmailChange, [token, newsletterAgreement], onSuccess, onError);
    };
    ClientModule.prototype.requestPhoneUpdate = function (phone, onSuccess, onError) {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNClient.requestPhoneUpdate, [phone], onSuccess, onError);
    };
    ClientModule.prototype.confirmPhoneUpdate = function (phone, confirmationCode, smsAgreement, onSuccess, onError) {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNClient.confirmPhoneUpdate, [phone, confirmationCode, smsAgreement], onSuccess, onError);
    };
    ClientModule.prototype.requestAccountActivationByPin = function (email, onSuccess, onError) {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNClient.requestAccountActivationByPin, [email], onSuccess, onError);
    };
    ClientModule.prototype.confirmAccountActivationByPin = function (pinCode, email, onSuccess, onError) {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNClient.confirmAccountActivationByPin, [pinCode, email], onSuccess, onError);
    };
    ClientModule.prototype.deleteAccountByIdentityProvider = function (clientAuthFactor, clientIdentityProvider, authID, onSuccess, onError) {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNClient.deleteAccountByIdentityProvider, [clientAuthFactor, clientIdentityProvider, authID], onSuccess, onError);
    };
    ClientModule.prototype.deleteAccount = function (password, onSuccess, onError) {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNClient.deleteAccount, [password], onSuccess, onError);
    };
    ClientModule.prototype.deleteAccountByOAuth = function (accessToken, onSuccess, onError) {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNClient.deleteAccountByOAuth, [accessToken], onSuccess, onError);
    };
    ClientModule.prototype.deleteAccountByFacebook = function (facebookToken, onSuccess, onError) {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNClient.deleteAccountByFacebook, [facebookToken], onSuccess, onError);
    };
    ClientModule.prototype.recognizeAnonymous = function (email, customIdentify, parameters) {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethod(RNClient.recognizeAnonymous, [email, customIdentify, parameters]);
    };
    return ClientModule;
}(BaseModule_1.BaseModule));
exports.ClientModule = ClientModule;
