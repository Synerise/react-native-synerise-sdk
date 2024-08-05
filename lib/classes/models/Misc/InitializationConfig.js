"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitializationConfig = void 0;
var InitializationConfig = /** @class */ (function () {
    function InitializationConfig() {
    }
    InitializationConfig.prototype.toObject = function () {
        return {
            requestValidationSalt: this.requestValidationSalt,
        };
    };
    return InitializationConfig;
}());
exports.InitializationConfig = InitializationConfig;
