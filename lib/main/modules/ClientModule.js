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
var Token_1 = require("./../../classes/models/Token/Token");
var RNClient = react_native_1.NativeModules.RNClient;
var ClientModule = /** @class */ (function (_super) {
    __extends(ClientModule, _super);
    function ClientModule() {
        return _super.call(this) || this;
    }
    ClientModule.instance = function () {
        if (this._instance === undefined) {
            this._instance = new ClientModule();
        }
        return this._instance;
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
    ClientModule.prototype.isSignedIn = function () {
        return SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithReturnValue(RNClient.isSignedIn, []);
    };
    ClientModule.prototype.signOut = function () {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithReturnValue(RNClient.signOut, []);
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
    ClientModule.prototype.requestEmailChange = function (email, password, onSuccess, onError) {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNClient.requestEmailChange, [email, password], onSuccess, onError);
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
    ClientModule.prototype.deleteAccount = function (password, onSuccess, onError) {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNClient.deleteAccount, [password], onSuccess, onError);
    };
    ClientModule.prototype.recognizeAnonymous = function (email, customIdentify, parameters) {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethod(RNClient.recognizeAnonymous, [email, customIdentify, parameters]);
    };
    return ClientModule;
}(BaseModule_1.BaseModule));
exports.ClientModule = ClientModule;
