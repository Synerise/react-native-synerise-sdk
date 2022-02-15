"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseModule = void 0;
var BaseModule = /** @class */ (function () {
    function BaseModule() {
        this.isActive = false;
    }
    BaseModule.prototype.configure = function (configuration) { };
    BaseModule.prototype.isAlwaysActive = function () {
        return false;
    };
    return BaseModule;
}());
exports.BaseModule = BaseModule;
