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
        _this.onBannerPresent = function () {
            if (_this.bannerListener !== undefined && _this.bannerListener.onPresent != undefined) {
                _this.bannerListener.onPresent();
            }
        };
        _this.onBannerHide = function () {
            if (_this.bannerListener !== undefined && _this.bannerListener.onHide != undefined) {
                _this.bannerListener.onHide();
            }
        };
        _this.onWalkthroughLoad = function () {
            if (_this.walkthroughListener !== undefined && _this.walkthroughListener.onLoad != undefined) {
                _this.walkthroughListener.onLoad();
            }
        };
        _this.onWalkthroughLoadingError = function (errorObject) {
            if (_this.walkthroughListener !== undefined && _this.walkthroughListener.onLoadingError != undefined) {
                var error = Error_1.ErrorMapper.getErrorInstance(errorObject);
                _this.walkthroughListener.onLoadingError(error);
            }
        };
        _this.onWalkthroughPresent = function () {
            if (_this.walkthroughListener !== undefined && _this.walkthroughListener.onPresent != undefined) {
                _this.walkthroughListener.onPresent();
            }
        };
        _this.onWalkthroughHide = function () {
            if (_this.walkthroughListener !== undefined && _this.walkthroughListener.onHide != undefined) {
                _this.walkthroughListener.onHide();
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
        this.configureInAppMessageListener();
    };
    InjectorModule.prototype.configureMainListener = function () {
        SyneriseModuleEmitter_1.SyneriseModuleEmitter.getEmitter().addListener(RNInjector.URL_ACTION_LISTENER_KEY, this.onUrlAction);
        SyneriseModuleEmitter_1.SyneriseModuleEmitter.getEmitter().addListener(RNInjector.DEEPLINK_ACTION_LISTENER_KEY, this.onDeepLinkAction);
    };
    InjectorModule.prototype.configureBannerListener = function () {
        SyneriseModuleEmitter_1.SyneriseModuleEmitter.getEmitter().addListener(RNInjector.BANNER_PRESENTED_LISTENER_KEY, this.onBannerPresent);
        SyneriseModuleEmitter_1.SyneriseModuleEmitter.getEmitter().addListener(RNInjector.BANNER_HIDDEN_LISTENER_KEY, this.onBannerHide);
    };
    InjectorModule.prototype.configureWalkthroughListener = function () {
        SyneriseModuleEmitter_1.SyneriseModuleEmitter.getEmitter().addListener(RNInjector.WALKTHROUGH_LOADED_LISTENER_KEY, this.onWalkthroughLoad);
        SyneriseModuleEmitter_1.SyneriseModuleEmitter.getEmitter().addListener(RNInjector.WALKTHROUGH_LOADING_ERROR_LISTENER_KEY, this.onWalkthroughLoadingError);
        SyneriseModuleEmitter_1.SyneriseModuleEmitter.getEmitter().addListener(RNInjector.WALKTHROUGH_PRESENTED_LISTENER_KEY, this.onWalkthroughPresent);
        SyneriseModuleEmitter_1.SyneriseModuleEmitter.getEmitter().addListener(RNInjector.WALKTHROUGH_HIDDEN_LISTENER_KEY, this.onWalkthroughHide);
    };
    InjectorModule.prototype.configureInAppMessageListener = function () {
        SyneriseModuleEmitter_1.SyneriseModuleEmitter.getEmitter().addListener(RNInjector.IN_APP_MESSAGE_PRESENTED_LISTENER_KEY, this.onInAppMessagePresent);
        SyneriseModuleEmitter_1.SyneriseModuleEmitter.getEmitter().addListener(RNInjector.IN_APP_MESSAGE_HIDDEN_LISTENER_KEY, this.onInAppMessageHide);
        SyneriseModuleEmitter_1.SyneriseModuleEmitter.getEmitter().addListener(RNInjector.IN_APP_MESSAGE_URL_ACTION_LISTENER_KEY, this.onInAppMessageOpenUrlAction);
        SyneriseModuleEmitter_1.SyneriseModuleEmitter.getEmitter().addListener(RNInjector.IN_APP_MESSAGE_DEEPLINK_ACTION_LISTENER_KEY, this.onInAppMessageDeepLinkAction);
        SyneriseModuleEmitter_1.SyneriseModuleEmitter.getEmitter().addListener(RNInjector.IN_APP_MESSAGE_CUSTOM_ACTION_LISTENER_KEY, this.onInAppMessageCustomAction);
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
    InjectorModule.prototype.setWalkthroughListener = function (listener) {
        this.walkthroughListener = listener;
    };
    InjectorModule.prototype.setInAppMessageListener = function (listener) {
        this.inAppMessageListener = listener;
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
