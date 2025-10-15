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
exports.InjectorModule = void 0;
var react_native_1 = require("react-native");
var BaseModule_1 = require("./BaseModule");
var SyneriseModuleConnector_1 = require("./../communication/SyneriseModuleConnector");
var SyneriseModuleEmitter_1 = require("./../communication/SyneriseModuleEmitter");
var InAppMessageData_1 = require("./../../classes/models/Misc/InAppMessageData");
var SyneriseSource_1 = require("../../classes/models/Misc/SyneriseSource");
var RNInjector = react_native_1.NativeModules.RNInjector;
var InjectorModule = /** @class */ (function (_super) {
    __extends(InjectorModule, _super);
    function InjectorModule() {
        var _this = _super.call(this) || this;
        _this.onUrlAction = function (event) {
            if (_this.listener !== undefined) {
                var source = SyneriseSource_1.SyneriseSourceFromString(event.source);
                _this.listener.onOpenUrl(event.url, source);
            }
        };
        _this.onDeepLinkAction = function (event) {
            if (_this.listener !== undefined) {
                var source = SyneriseSource_1.SyneriseSourceFromString(event.source);
                _this.listener.onDeepLink(event.deepLink, source);
            }
        };
        _this.onInAppMessagePresent = function (event) {
            if (_this.inAppMessageListener !== undefined && _this.inAppMessageListener.onPresent != undefined) {
                var data = new InAppMessageData_1.InAppMessageData(event.data);
                _this.inAppMessageListener.onPresent(data);
            }
        };
        _this.onInAppMessageHide = function (event) {
            if (_this.inAppMessageListener !== undefined && _this.inAppMessageListener.onHide != undefined) {
                var data = new InAppMessageData_1.InAppMessageData(event.data);
                _this.inAppMessageListener.onHide(data);
            }
        };
        _this.onInAppMessageOpenUrlAction = function (event) {
            if (_this.inAppMessageListener !== undefined && _this.inAppMessageListener.onOpenUrl != undefined) {
                var data = new InAppMessageData_1.InAppMessageData(event.data);
                var url = event.url;
                _this.inAppMessageListener.onOpenUrl(data, url);
            }
        };
        _this.onInAppMessageDeepLinkAction = function (event) {
            if (_this.inAppMessageListener !== undefined && _this.inAppMessageListener.onDeepLink != undefined) {
                var data = new InAppMessageData_1.InAppMessageData(event.data);
                var deepLink = event.deepLink;
                _this.inAppMessageListener.onDeepLink(data, deepLink);
            }
        };
        _this.onInAppMessageCustomAction = function (event) {
            if (_this.inAppMessageListener !== undefined && _this.inAppMessageListener.onCustomAction != undefined) {
                var data = new InAppMessageData_1.InAppMessageData(event.data);
                var name_1 = event.name;
                var parameters = event.parameters;
                _this.inAppMessageListener.onCustomAction(data, name_1, parameters);
            }
        };
        _this.configureListeners();
        _this.setListener({
            onOpenUrl: function (url, source) {
                SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethod(RNInjector.handleOpenUrlBySDK, [url]);
            },
            onDeepLink: function (deepLink, source) {
                SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethod(RNInjector.handleDeepLinkBySDK, [deepLink]);
            }
        });
        return _this;
    }
    InjectorModule.instance = function () {
        if (this._instance === undefined) {
            this._instance = new InjectorModule();
        }
        return this._instance;
    };
    InjectorModule.prototype.configureListeners = function () {
        this.configureMainListener();
        this.configureInAppMessageListener();
    };
    InjectorModule.prototype.configureMainListener = function () {
        SyneriseModuleEmitter_1.SyneriseModuleEmitter.getEmitter().addListener(RNInjector.URL_ACTION_LISTENER_KEY, this.onUrlAction);
        SyneriseModuleEmitter_1.SyneriseModuleEmitter.getEmitter().addListener(RNInjector.DEEPLINK_ACTION_LISTENER_KEY, this.onDeepLinkAction);
    };
    InjectorModule.prototype.configureInAppMessageListener = function () {
        SyneriseModuleEmitter_1.SyneriseModuleEmitter.getEmitter().addListener(RNInjector.IN_APP_MESSAGE_PRESENTED_LISTENER_KEY, this.onInAppMessagePresent);
        SyneriseModuleEmitter_1.SyneriseModuleEmitter.getEmitter().addListener(RNInjector.IN_APP_MESSAGE_HIDDEN_LISTENER_KEY, this.onInAppMessageHide);
        SyneriseModuleEmitter_1.SyneriseModuleEmitter.getEmitter().addListener(RNInjector.IN_APP_MESSAGE_URL_ACTION_LISTENER_KEY, this.onInAppMessageOpenUrlAction);
        SyneriseModuleEmitter_1.SyneriseModuleEmitter.getEmitter().addListener(RNInjector.IN_APP_MESSAGE_DEEPLINK_ACTION_LISTENER_KEY, this.onInAppMessageDeepLinkAction);
        SyneriseModuleEmitter_1.SyneriseModuleEmitter.getEmitter().addListener(RNInjector.IN_APP_MESSAGE_CUSTOM_ACTION_LISTENER_KEY, this.onInAppMessageCustomAction);
    };
    /**
     * This method sets callbacks for an injector module.
     *
     * @param listener An object that implements the `IInjectorListener` interface
     *
     */
    InjectorModule.prototype.setListener = function (listener) {
        this.listener = listener;
    };
    /**
     * This method sets callbacks for in-app message campaigns.
     *
     * @param listener An object that implements the `IInjectorInAppMessageListener` interface
     *
     */
    InjectorModule.prototype.setInAppMessageListener = function (listener) {
        this.inAppMessageListener = listener;
    };
    /**
     * This method closes the current in-app message.
     *
     * @param campaignHash An identifier of the in-app message campaign that is currently opened
     *
     */
    InjectorModule.prototype.closeInAppMessage = function (campaignHash) {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethod(RNInjector.closeInAppMessage, [campaignHash]);
    };
    InjectorModule.prototype.handleOpenUrlBySDK = function (url) {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethod(RNInjector.handleOpenUrlBySDK, [url]);
    };
    InjectorModule.prototype.handleDeepLinkBySDK = function (deepLink) {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethod(RNInjector.handleDeepLinkBySDK, [deepLink]);
    };
    return InjectorModule;
}(BaseModule_1.BaseModule));
exports.InjectorModule = InjectorModule;
