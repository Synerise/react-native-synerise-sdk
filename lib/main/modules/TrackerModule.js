"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackerModule = void 0;
var react_native_1 = require("react-native");
var SyneriseModuleConnector_1 = require("./../communication/SyneriseModuleConnector");
var BaseModule_1 = require("./BaseModule");
var RNTracker = react_native_1.NativeModules.RNTracker;
var TrackerModule = /** @class */ (function (_super) {
    __extends(TrackerModule, _super);
    function TrackerModule() {
        return _super.call(this) || this;
    }
    TrackerModule.instance = function () {
        if (this._instance === undefined) {
            this._instance = new TrackerModule();
        }
        return this._instance;
    };
    TrackerModule.prototype.setCustomIdentifier = function (identifier) {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethod(RNTracker.setCustomIdentifier, [identifier]);
    };
    TrackerModule.prototype.setCustomEmail = function (email) {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethod(RNTracker.setCustomEmail, [email]);
    };
    TrackerModule.prototype.send = function (event) {
        var eventObject = event.toObject();
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethod(RNTracker.send, [eventObject]);
    };
    TrackerModule.prototype.flushEvents = function (onSuccess) {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNTracker.flushEvents, [], onSuccess, function (error) { });
    };
    return TrackerModule;
}(BaseModule_1.BaseModule));
exports.TrackerModule = TrackerModule;
