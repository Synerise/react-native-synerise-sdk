"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalizableStringKeyCancel = exports.LocalizableStringKeyOK = exports.Constants = void 0;
var react_native_1 = require("react-native");
var RNConstants = react_native_1.NativeModules.RNConstants;
var Constants = {};
exports.Constants = Constants;
var SettingsModule_1 = require("./../main/modules/SettingsModule");
Object.defineProperty(exports, "LocalizableStringKeyOK", { enumerable: true, get: function () { return SettingsModule_1.LocalizableStringKeyOK; } });
Object.defineProperty(exports, "LocalizableStringKeyCancel", { enumerable: true, get: function () { return SettingsModule_1.LocalizableStringKeyCancel; } });
