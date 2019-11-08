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
var SyneriseModuleConnector_1 = require("./SyneriseModuleConnector");
var BaseModule_1 = require("./BaseModule");
var RNSettings = react_native_1.NativeModules.RNSettings;
function mapOptionsToObject(options) {
    var object = {
        SDK_ENABLED: options.sdk.enabled,
        SDK_MIN_TOKEN_REFRESH_INTERVAL: options.sdk.minTokenRefreshInterval,
        TRACKER_MIN_BATCH_SIZE: options.tracker.minBatchSize,
        TRACKER_MAX_BATCH_SIZE: options.tracker.maxBatchSize,
        TRACKER_AUTO_FLUSH_TIMEOUT: options.tracker.autoFlushTimeout,
    };
    return object;
}
function getOne(key) {
    return SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithReturnValue(RNSettings.getOne, [key]);
}
function setOne(key, value) {
    SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethod(RNSettings.setOne, [key, value]);
}
function setMany(settings) {
    SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethod(RNSettings.setMany, [settings]);
}
var SettingsModule = /** @class */ (function (_super) {
    __extends(SettingsModule, _super);
    function SettingsModule() {
        var _this = _super.call(this) || this;
        _this.sdk = {
            get enabled() {
                return getOne(RNSettings.SDK_ENABLED);
            },
            set enabled(value) {
                setOne(RNSettings.SDK_ENABLED, value);
            },
            get minTokenRefreshInterval() {
                return getOne(RNSettings.SDK_MIN_TOKEN_REFRESH_INTERVAL);
            },
            set minTokenRefreshInterval(value) {
                setOne(RNSettings.SDK_MIN_TOKEN_REFRESH_INTERVAL, value);
            },
        };
        _this.tracker = {
            get minBatchSize() {
                return getOne(RNSettings.TRACKER_MIN_BATCH_SIZE);
            },
            set minBatchSize(value) {
                setOne(RNSettings.TRACKER_MIN_BATCH_SIZE, value);
            },
            get maxBatchSize() {
                return getOne(RNSettings.TRACKER_MAX_BATCH_SIZE);
            },
            set maxBatchSize(value) {
                setOne(RNSettings.TRACKER_MAX_BATCH_SIZE, value);
            },
            get autoFlushTimeout() {
                return getOne(RNSettings.TRACKER_AUTO_FLUSH_TIMEOUT);
            },
            set autoFlushTimeout(value) {
                setOne(RNSettings.TRACKER_AUTO_FLUSH_TIMEOUT, value);
            },
        };
        return _this;
    }
    SettingsModule.instance = function () {
        if (this._instance === undefined) {
            this._instance = new SettingsModule();
        }
        return this._instance;
    };
    SettingsModule.prototype.set = function (settings) {
        var settingsObject = mapOptionsToObject(settings);
        setMany(settingsObject);
    };
    return SettingsModule;
}(BaseModule_1.BaseModule));
exports.SettingsModule = SettingsModule;
