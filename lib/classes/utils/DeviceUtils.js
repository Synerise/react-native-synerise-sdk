"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceUtils = void 0;
var react_native_1 = require("react-native");
var DeviceUtils = /** @class */ (function () {
    function DeviceUtils() {
    }
    DeviceUtils.isPlatformIOS = function () {
        if (react_native_1.Platform.OS === 'ios') {
            return true;
        }
        else {
            return false;
        }
    };
    DeviceUtils.isPlatformAndroid = function () {
        if (react_native_1.Platform.OS === 'android') {
            return true;
        }
        else {
            return false;
        }
    };
    return DeviceUtils;
}());
exports.DeviceUtils = DeviceUtils;
