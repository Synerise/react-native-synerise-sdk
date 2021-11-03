"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseModule = void 0;
var Synerise_1 = require("./../Synerise");
var BaseModule = /** @class */ (function () {
    function BaseModule() {
        this.isActive = false;
        this.assertSyneriseInitialized();
    }
    BaseModule.prototype.configure = function (configuration) { };
    BaseModule.prototype.isAlwaysActive = function () {
        return false;
    };
    BaseModule.prototype.assertSyneriseInitialized = function () {
        if (this.isAlwaysActive() == true) {
            return;
        }
        if (Synerise_1.Synerise.isInitialized() === false) {
            console.error("Synerise is not initialized, please use Synerise.Initializer first.");
        }
    };
    return BaseModule;
}());
exports.BaseModule = BaseModule;
