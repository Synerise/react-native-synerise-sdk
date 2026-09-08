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
var SyneriseSource_1 = require("../../classes/models/Misc/SyneriseSource");
var InAppManager_1 = require("./inapp/InAppManager");
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
        _this.inAppManager = new InAppManager_1.InAppManager();
        _this.configureMainListener();
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
    Object.defineProperty(InjectorModule.prototype, "inAppContext", {
        get: function () {
            return this.inAppManager.inAppContext;
        },
        set: function (context) {
            this.inAppManager.inAppContext = context;
        },
        enumerable: false,
        configurable: true
    });
    InjectorModule.instance = function () {
        if (this._instance === undefined) {
            this._instance = new InjectorModule();
        }
        return this._instance;
    };
    InjectorModule.prototype.configureMainListener = function () {
        SyneriseModuleEmitter_1.SyneriseModuleEmitter.getEmitter().addListener(RNInjector.URL_ACTION_LISTENER_KEY, this.onUrlAction);
        SyneriseModuleEmitter_1.SyneriseModuleEmitter.getEmitter().addListener(RNInjector.DEEPLINK_ACTION_LISTENER_KEY, this.onDeepLinkAction);
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
        this.inAppManager.setInAppMessageListener(listener);
    };
    /**
     * This method sets callbacks for inline in-app message campaigns.
     *
     * @param listener An object that implements the `IInlineInAppMessageListener` interface
     *
     */
    InjectorModule.prototype.setInlineInAppMessageListener = function (listener) {
        this.inAppManager.setInlineInAppMessageListener(listener);
    };
    /**
     * This method notifies current in-app messages that context from the app was changed.
     */
    InjectorModule.prototype.notifyInAppContextChange = function () {
        this.inAppManager.notifyInAppContextChange();
    };
    /**
     * This method closes the current in-app message.
     *
     * @param campaignHash An identifier of the in-app message campaign that is currently opened
     *
     */
    InjectorModule.prototype.closeInAppMessage = function (campaignHash) {
        this.inAppManager.closeInAppMessage(campaignHash);
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
