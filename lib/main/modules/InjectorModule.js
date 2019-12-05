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
var BaseModule_1 = require("./BaseModule");
var SyneriseModuleEmitter_1 = require("./../communication/SyneriseModuleEmitter");
var RNInjector = react_native_1.NativeModules.RNInjector;
var InjectorModule = /** @class */ (function (_super) {
    __extends(InjectorModule, _super);
    function InjectorModule() {
        var _this = _super.call(this) || this;
        _this.onUrlAction = function (event) {
            if (_this.listener !== undefined) {
                _this.listener.onOpenUrl(event.url);
            }
        };
        _this.onDeepLinkAction = function (event) {
            if (_this.listener !== undefined) {
                _this.listener.onDeepLink(event.deepLink);
            }
        };
        _this.onPresentBanner = function () {
            if (_this.listener !== undefined && _this.listener.onPresentBanner != undefined) {
                _this.listener.onPresentBanner();
            }
        };
        _this.onHideBanner = function () {
            if (_this.listener !== undefined && _this.listener.onHideBanner != undefined) {
                _this.listener.onHideBanner();
            }
        };
        _this.configureListeners();
        return _this;
    }
    InjectorModule.instance = function () {
        if (this._instance === undefined) {
            this._instance = new InjectorModule();
        }
        return this._instance;
    };
    InjectorModule.prototype.configureListeners = function () {
        this.configureUrlActionListener();
        this.configureDeepLinkActionListener();
        this.configureBannerPresentedListener();
        this.configureBannerHiddenListener();
    };
    InjectorModule.prototype.configureUrlActionListener = function () {
        SyneriseModuleEmitter_1.SyneriseModuleEmitter.getEmitter().addListener(RNInjector.URL_ACTION_LISTENER_KEY, this.onUrlAction);
    };
    InjectorModule.prototype.configureDeepLinkActionListener = function () {
        SyneriseModuleEmitter_1.SyneriseModuleEmitter.getEmitter().addListener(RNInjector.DEEPLINK_ACTION_LISTENER_KEY, this.onDeepLinkAction);
    };
    InjectorModule.prototype.configureBannerPresentedListener = function () {
        SyneriseModuleEmitter_1.SyneriseModuleEmitter.getEmitter().addListener(RNInjector.BANNER_PRESENTED_LISTENER_KEY, this.onPresentBanner);
    };
    InjectorModule.prototype.configureBannerHiddenListener = function () {
        SyneriseModuleEmitter_1.SyneriseModuleEmitter.getEmitter().addListener(RNInjector.BANNER_HIDDEN_LISTENER_KEY, this.onHideBanner);
    };
    InjectorModule.prototype.setListener = function (listener) {
        this.listener = listener;
    };
    return InjectorModule;
}(BaseModule_1.BaseModule));
exports.InjectorModule = InjectorModule;
