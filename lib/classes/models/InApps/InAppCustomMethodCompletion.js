"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InAppCustomMethodCompletion = void 0;
var InAppCustomMethodCompletion = /** @class */ (function () {
    function InAppCustomMethodCompletion(onSuccess, onFailure) {
        var _this = this;
        this.isDone = false;
        this.success = function (result) {
            if (_this.claim() === false) {
                return;
            }
            _this.onSuccess(result !== undefined ? result : null);
        };
        this.failure = function (errorMessage) {
            if (_this.claim() === false) {
                return;
            }
            _this.onFailure(errorMessage);
        };
        this.onSuccess = onSuccess;
        this.onFailure = onFailure;
    }
    InAppCustomMethodCompletion.prototype.claim = function () {
        if (this.isDone) {
            return false;
        }
        this.isDone = true;
        return true;
    };
    return InAppCustomMethodCompletion;
}());
exports.InAppCustomMethodCompletion = InAppCustomMethodCompletion;
