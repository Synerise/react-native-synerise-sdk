"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyneriseModuleEmitter = void 0;
var react_native_1 = require("react-native");
var SyneriseModuleEmitter = /** @class */ (function () {
    function SyneriseModuleEmitter() {
    }
    SyneriseModuleEmitter.getEmitter = function () {
        if (react_native_1.Platform.OS === 'ios') {
            return new react_native_1.NativeEventEmitter(react_native_1.NativeModules.RNSyneriseEventEmitter);
        }
        return react_native_1.DeviceEventEmitter;
    };
    return SyneriseModuleEmitter;
}());
exports.SyneriseModuleEmitter = SyneriseModuleEmitter;
