"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Synerise_1 = require("./../Synerise");
var BaseModule = /** @class */ (function () {
    function BaseModule() {
        this.assertSyneriseInitialized();
        this.isActive = false;
    }
    BaseModule.prototype.configure = function (configuration) { };
    BaseModule.prototype.assertSyneriseInitialized = function () {
        if (Synerise_1.Synerise.isInitialized() === false) {
            console.error("Synerise is not initialized, please use Synerise.Initializer first.");
        }
    };
    return BaseModule;
}());
exports.BaseModule = BaseModule;
