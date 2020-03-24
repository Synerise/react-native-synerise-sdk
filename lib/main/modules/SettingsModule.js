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
var BaseModule_1 = require("./BaseModule");
var RNSettings = react_native_1.NativeModules.RNSettings;
function mapSettingsKeyAndValueForNativeModule(key, value) {
    return {
        key: key,
        value: value,
    };
}
function mapSettingsOptionsForNativeModule(settingsOptions) {
    return {
        SDK_ENABLED: settingsOptions.sdk && settingsOptions.sdk.enabled,
        SDK_MIN_TOKEN_REFRESH_INTERVAL: settingsOptions.sdk && settingsOptions.sdk.minTokenRefreshInterval,
        TRACKER_MIN_BATCH_SIZE: settingsOptions.tracker && settingsOptions.tracker.minBatchSize,
        TRACKER_MAX_BATCH_SIZE: settingsOptions.tracker && settingsOptions.tracker.maxBatchSize,
        TRACKER_AUTO_FLUSH_TIMEOUT: settingsOptions.tracker && settingsOptions.tracker.autoFlushTimeout,
        NOTIFICATIONS_ENABLED: settingsOptions.notifications && settingsOptions.notifications.enabled,
        NOTIFICATIONS_DISABLE_IN_APP_ALERTS: settingsOptions.notifications && settingsOptions.notifications.disableInAppAlerts,
        NOTIFICATIONS_APP_GROUP_IDENTIFIER: settingsOptions.notifications && settingsOptions.notifications.appGroupIdentifier,
        INJECTOR_AUTOMATIC: settingsOptions.injector && settingsOptions.injector.automatic,
    };
}
function getOne(key) {
    return SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithReturnValue(RNSettings.getOne, [key]);
}
function setOne(key, value) {
    var settingsOneOption = mapSettingsKeyAndValueForNativeModule(key, value);
    SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethod(RNSettings.setOne, [settingsOneOption]);
}
function setMany(settingsOptions) {
    var settingsManyOptions = mapSettingsOptionsForNativeModule(settingsOptions);
    SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethod(RNSettings.setMany, [settingsManyOptions]);
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
        _this.notifications = {
            get enabled() {
                return getOne(RNSettings.NOTIFICATIONS_ENABLED);
            },
            set enabled(value) {
                setOne(RNSettings.NOTIFICATIONS_ENABLED, value);
            },
            get disableInAppAlerts() {
                return getOne(RNSettings.NOTIFICATIONS_DISABLE_IN_APP_ALERTS);
            },
            set disableInAppAlerts(value) {
                setOne(RNSettings.NOTIFICATIONS_DISABLE_IN_APP_ALERTS, value);
            },
            get appGroupIdentifier() {
                return getOne(RNSettings.NOTIFICATIONS_APP_GROUP_IDENTIFIER);
            },
            set appGroupIdentifier(value) {
                setOne(RNSettings.NOTIFICATIONS_APP_GROUP_IDENTIFIER, value);
            },
        };
        _this.injector = {
            get automatic() {
                return getOne(RNSettings.INJECTOR_AUTOMATIC);
            },
            set automatic(value) {
                setOne(RNSettings.INJECTOR_AUTOMATIC, value);
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
    SettingsModule.prototype.isAlwaysActive = function () {
        return true;
    };
    SettingsModule.prototype.set = function (settingsOptions) {
        setMany(settingsOptions);
    };
    return SettingsModule;
}(BaseModule_1.BaseModule));
exports.SettingsModule = SettingsModule;
