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
var Error_1 = require("./../../classes/types/Error");
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
            if (_this.bannerListener !== undefined && _this.bannerListener.onPresent != undefined) {
                _this.bannerListener.onPresent();
            }
        };
        _this.onHideBanner = function () {
            if (_this.bannerListener !== undefined && _this.bannerListener.onHide != undefined) {
                _this.bannerListener.onHide();
            }
        };
        _this.onLoadWalkthrough = function () {
            if (_this.walkthroughListener !== undefined && _this.walkthroughListener.onLoad != undefined) {
                _this.walkthroughListener.onLoad();
            }
        };
        _this.onLoadingErrorWalkthrough = function (errorObject) {
            if (_this.walkthroughListener !== undefined && _this.walkthroughListener.onLoadingError != undefined) {
                var error = Error_1.ErrorMapper.getErrorInstance(errorObject);
                _this.walkthroughListener.onLoadingError(error);
            }
        };
        _this.onPresentWalkthrough = function () {
            if (_this.walkthroughListener !== undefined && _this.walkthroughListener.onPresent != undefined) {
                _this.walkthroughListener.onPresent();
            }
        };
        _this.onHideWalkthrough = function () {
            if (_this.walkthroughListener !== undefined && _this.walkthroughListener.onHide != undefined) {
                _this.walkthroughListener.onHide();
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
        this.configureMainListener();
        this.configureBannerListener();
        this.configureWalkthroughListener();
    };
    InjectorModule.prototype.configureMainListener = function () {
        this.configureUrlActionListener();
        this.configureDeepLinkActionListener();
    };
    InjectorModule.prototype.configureBannerListener = function () {
        this.configureBannerPresentedListener();
        this.configureBannerHiddenListener();
    };
    InjectorModule.prototype.configureWalkthroughListener = function () {
        this.configureWalkthroughLoadedListener();
        this.configureWalkthroughLoadingErrorListener();
        this.configureWalkthroughPresentedListener();
        this.configureWalkthroughHiddenListener();
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
    InjectorModule.prototype.configureWalkthroughLoadedListener = function () {
        SyneriseModuleEmitter_1.SyneriseModuleEmitter.getEmitter().addListener(RNInjector.WALKTHROUGH_LOADED_LISTENER_KEY, this.onLoadWalkthrough);
    };
    InjectorModule.prototype.configureWalkthroughLoadingErrorListener = function () {
        SyneriseModuleEmitter_1.SyneriseModuleEmitter.getEmitter().addListener(RNInjector.WALKTHROUGH_LOADING_ERROR_LISTENER_KEY, this.onLoadingErrorWalkthrough);
    };
    InjectorModule.prototype.configureWalkthroughPresentedListener = function () {
        SyneriseModuleEmitter_1.SyneriseModuleEmitter.getEmitter().addListener(RNInjector.WALKTHROUGH_PRESENTED_LISTENER_KEY, this.onPresentWalkthrough);
    };
    InjectorModule.prototype.configureWalkthroughHiddenListener = function () {
        SyneriseModuleEmitter_1.SyneriseModuleEmitter.getEmitter().addListener(RNInjector.WALKTHROUGH_HIDDEN_LISTENER_KEY, this.onHideWalkthrough);
    };
    InjectorModule.prototype.setListener = function (listener) {
        this.listener = listener;
    };
    InjectorModule.prototype.setBannerListener = function (listener) {
        this.bannerListener = listener;
    };
    InjectorModule.prototype.setShouldBannerPresentFlag = function (shouldPresentBanner) {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethod(RNInjector.setShouldBannerPresentFlag, [shouldPresentBanner]);
    };
    InjectorModule.prototype.fetchBanners = function (onSuccess, onError) {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNInjector.fetchBanners, [], onSuccess, onError);
    };
    InjectorModule.prototype.getBanners = function () {
        return SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithReturnValue(RNInjector.getBanners, []);
    };
    InjectorModule.prototype.showBanner = function (banner, markPresented) {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethod(RNInjector.showBanner, [banner, markPresented]);
    };
    InjectorModule.prototype.setWalkthroughListener = function (listener) {
        this.walkthroughListener = listener;
    };
    InjectorModule.prototype.getWalkthrough = function () {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethod(RNInjector.getWalkthrough, []);
    };
    InjectorModule.prototype.showWalkthrough = function () {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethod(RNInjector.showWalkthrough, []);
    };
    InjectorModule.prototype.isWalkthroughLoaded = function () {
        return SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithReturnValue(RNInjector.isWalkthroughLoaded, []);
    };
    InjectorModule.prototype.isLoadedWalkthroughUnique = function () {
        return SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithReturnValue(RNInjector.isLoadedWalkthroughUnique, []);
    };
    return InjectorModule;
}(BaseModule_1.BaseModule));
exports.InjectorModule = InjectorModule;
