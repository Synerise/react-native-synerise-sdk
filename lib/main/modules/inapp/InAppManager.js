"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InAppManager = void 0;
var react_1 = __importDefault(require("react"));
var react_native_1 = require("react-native");
var SyneriseModuleConnector_1 = require("./../../communication/SyneriseModuleConnector");
var SyneriseModuleEmitter_1 = require("./../../communication/SyneriseModuleEmitter");
var InAppMessageData_1 = require("./../../../classes/models/Misc/InAppMessageData");
var InAppCustomMethodCompletion_1 = require("./../../../classes/models/InApps/InAppCustomMethodCompletion");
var InlineInAppMessageData_1 = require("./../../../classes/models/Misc/InlineInAppMessageData");
var InlineInAppView_1 = require("./InlineInAppView");
var RNInjector = react_native_1.NativeModules.RNInjector;
/**
 * Owns the in-app messaging bridge (overlay + inline). Reached through `InjectorModule`, which keeps
 * the public API and delegates here; the native module (`RNInjector`) and event names are unchanged.
 */
var InAppManager = /** @class */ (function () {
    function InAppManager() {
        var _this = this;
        this.inAppContextTarget = {};
        this.onInAppMessagePresent = function (event) {
            if (_this.inAppMessageListener !== undefined && _this.inAppMessageListener.onPresent != undefined) {
                var data = new InAppMessageData_1.InAppMessageData(event.data);
                _this.inAppMessageListener.onPresent(data);
            }
        };
        this.onInAppMessageHide = function (event) {
            if (_this.inAppMessageListener !== undefined && _this.inAppMessageListener.onHide != undefined) {
                var data = new InAppMessageData_1.InAppMessageData(event.data);
                _this.inAppMessageListener.onHide(data);
            }
        };
        this.onInAppMessageOpenUrlAction = function (event) {
            if (_this.inAppMessageListener !== undefined && _this.inAppMessageListener.onOpenUrl != undefined) {
                var data = new InAppMessageData_1.InAppMessageData(event.data);
                var url = event.url;
                _this.inAppMessageListener.onOpenUrl(data, url);
            }
        };
        this.onInAppMessageDeepLinkAction = function (event) {
            if (_this.inAppMessageListener !== undefined && _this.inAppMessageListener.onDeepLink != undefined) {
                var data = new InAppMessageData_1.InAppMessageData(event.data);
                var deepLink = event.deepLink;
                _this.inAppMessageListener.onDeepLink(data, deepLink);
            }
        };
        this.onInAppMessageCustomAction = function (event) {
            if (_this.inAppMessageListener !== undefined && _this.inAppMessageListener.onCustomAction != undefined) {
                var data = new InAppMessageData_1.InAppMessageData(event.data);
                var name_1 = event.name;
                var parameters = event.parameters;
                _this.inAppMessageListener.onCustomAction(data, name_1, parameters);
            }
        };
        this.onInAppMessageCustomMethod = function (event) {
            if (_this.inAppMessageListener !== undefined && _this.inAppMessageListener.onCustomMethod != undefined) {
                var data = new InAppMessageData_1.InAppMessageData(event.data);
                var callId_1 = event.callId;
                var completion = new InAppCustomMethodCompletion_1.InAppCustomMethodCompletion(function (result) {
                    SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethod(RNInjector.resolveInAppCustomMethod, [callId_1, true, result, null]);
                }, function (errorMessage) {
                    SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethod(RNInjector.resolveInAppCustomMethod, [callId_1, false, null, errorMessage]);
                });
                _this.inAppMessageListener.onCustomMethod(data, event.name, event.parameters, completion);
            }
        };
        this.onInlineInAppMessageAvailable = function (event) {
            if (_this.inlineInAppMessageListener !== undefined) {
                var data = new InlineInAppMessageData_1.InlineInAppMessageData(event.data);
                var view = react_1.default.createElement(InlineInAppView_1.InlineInAppView, {
                    placementKey: data.placementKey,
                    adoptViewId: event.viewId,
                    style: { width: '100%', height: '100%' },
                });
                _this.inlineInAppMessageListener.onInlineInAppAvailable(view, data);
            }
        };
        this.onInlineInAppMessageOpenUrlAction = function (event) {
            if (_this.inlineInAppMessageListener !== undefined && _this.inlineInAppMessageListener.onOpenUrl != undefined) {
                var data = new InlineInAppMessageData_1.InlineInAppMessageData(event.data);
                _this.inlineInAppMessageListener.onOpenUrl(data, event.url);
            }
        };
        this.onInlineInAppMessageDeepLinkAction = function (event) {
            if (_this.inlineInAppMessageListener !== undefined && _this.inlineInAppMessageListener.onDeepLink != undefined) {
                var data = new InlineInAppMessageData_1.InlineInAppMessageData(event.data);
                _this.inlineInAppMessageListener.onDeepLink(data, event.deepLink);
            }
        };
        this.onInlineInAppMessageCustomAction = function (event) {
            if (_this.inlineInAppMessageListener !== undefined && _this.inlineInAppMessageListener.onCustomAction != undefined) {
                var data = new InlineInAppMessageData_1.InlineInAppMessageData(event.data);
                _this.inlineInAppMessageListener.onCustomAction(data, event.name, event.parameters);
            }
        };
        this.onInlineInAppMessageCustomMethod = function (event) {
            if (_this.inlineInAppMessageListener !== undefined && _this.inlineInAppMessageListener.onCustomMethod != undefined) {
                var data = new InlineInAppMessageData_1.InlineInAppMessageData(event.data);
                var callId_2 = event.callId;
                var completion = new InAppCustomMethodCompletion_1.InAppCustomMethodCompletion(function (result) {
                    SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethod(RNInjector.resolveInlineCustomMethod, [callId_2, true, result, null]);
                }, function (errorMessage) {
                    SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethod(RNInjector.resolveInlineCustomMethod, [callId_2, false, null, errorMessage]);
                });
                _this.inlineInAppMessageListener.onCustomMethod(data, event.name, event.parameters, completion);
            }
        };
        this.inAppContextProxy = this.createInAppContextProxy();
        this.configureListeners();
    }
    Object.defineProperty(InAppManager.prototype, "inAppContext", {
        get: function () {
            return this.inAppContextProxy;
        },
        set: function (context) {
            var _this = this;
            Object.keys(this.inAppContextTarget).forEach(function (key) {
                delete _this.inAppContextTarget[key];
            });
            Object.assign(this.inAppContextTarget, context);
            this.pushInAppContext();
        },
        enumerable: false,
        configurable: true
    });
    InAppManager.prototype.createInAppContextProxy = function () {
        var _this = this;
        return new Proxy(this.inAppContextTarget, {
            set: function (target, key, value) {
                target[key] = value;
                _this.pushInAppContext();
                return true;
            },
            deleteProperty: function (target, key) {
                delete target[key];
                _this.pushInAppContext();
                return true;
            },
        });
    };
    InAppManager.prototype.pushInAppContext = function () {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethod(RNInjector.setInAppContext, [__assign({}, this.inAppContextTarget)]);
    };
    InAppManager.prototype.notifyInAppContextChange = function () {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethod(RNInjector.notifyInAppContextChange, []);
    };
    InAppManager.prototype.configureListeners = function () {
        this.configureInAppMessageListener();
        this.configureInlineInAppMessageListener();
    };
    InAppManager.prototype.configureInAppMessageListener = function () {
        SyneriseModuleEmitter_1.SyneriseModuleEmitter.getEmitter().addListener(RNInjector.IN_APP_MESSAGE_PRESENTED_LISTENER_KEY, this.onInAppMessagePresent);
        SyneriseModuleEmitter_1.SyneriseModuleEmitter.getEmitter().addListener(RNInjector.IN_APP_MESSAGE_HIDDEN_LISTENER_KEY, this.onInAppMessageHide);
        SyneriseModuleEmitter_1.SyneriseModuleEmitter.getEmitter().addListener(RNInjector.IN_APP_MESSAGE_URL_ACTION_LISTENER_KEY, this.onInAppMessageOpenUrlAction);
        SyneriseModuleEmitter_1.SyneriseModuleEmitter.getEmitter().addListener(RNInjector.IN_APP_MESSAGE_DEEPLINK_ACTION_LISTENER_KEY, this.onInAppMessageDeepLinkAction);
        SyneriseModuleEmitter_1.SyneriseModuleEmitter.getEmitter().addListener(RNInjector.IN_APP_MESSAGE_CUSTOM_ACTION_LISTENER_KEY, this.onInAppMessageCustomAction);
        SyneriseModuleEmitter_1.SyneriseModuleEmitter.getEmitter().addListener(RNInjector.IN_APP_MESSAGE_CUSTOM_METHOD_LISTENER_KEY, this.onInAppMessageCustomMethod);
    };
    InAppManager.prototype.configureInlineInAppMessageListener = function () {
        SyneriseModuleEmitter_1.SyneriseModuleEmitter.getEmitter().addListener(RNInjector.INLINE_IN_APP_MESSAGE_AVAILABLE_LISTENER_KEY, this.onInlineInAppMessageAvailable);
        SyneriseModuleEmitter_1.SyneriseModuleEmitter.getEmitter().addListener(RNInjector.INLINE_IN_APP_MESSAGE_URL_ACTION_LISTENER_KEY, this.onInlineInAppMessageOpenUrlAction);
        SyneriseModuleEmitter_1.SyneriseModuleEmitter.getEmitter().addListener(RNInjector.INLINE_IN_APP_MESSAGE_DEEPLINK_ACTION_LISTENER_KEY, this.onInlineInAppMessageDeepLinkAction);
        SyneriseModuleEmitter_1.SyneriseModuleEmitter.getEmitter().addListener(RNInjector.INLINE_IN_APP_MESSAGE_CUSTOM_ACTION_LISTENER_KEY, this.onInlineInAppMessageCustomAction);
        SyneriseModuleEmitter_1.SyneriseModuleEmitter.getEmitter().addListener(RNInjector.INLINE_IN_APP_MESSAGE_CUSTOM_METHOD_LISTENER_KEY, this.onInlineInAppMessageCustomMethod);
    };
    InAppManager.prototype.setInAppMessageListener = function (listener) {
        this.inAppMessageListener = listener;
    };
    InAppManager.prototype.setInlineInAppMessageListener = function (listener) {
        this.inlineInAppMessageListener = listener;
    };
    InAppManager.prototype.closeInAppMessage = function (campaignHash) {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethod(RNInjector.closeInAppMessage, [campaignHash]);
    };
    return InAppManager;
}());
exports.InAppManager = InAppManager;
