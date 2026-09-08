"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InlineInAppSize = void 0;
var InlineInAppSize = /** @class */ (function () {
    function InlineInAppSize(modelObject) {
        var _a, _b, _c, _d, _e, _f;
        this.widthPx = (_a = modelObject.widthPx) !== null && _a !== void 0 ? _a : 0;
        this.heightPx = (_b = modelObject.heightPx) !== null && _b !== void 0 ? _b : 0;
        this.width = (_c = modelObject.width) !== null && _c !== void 0 ? _c : 0;
        this.height = (_d = modelObject.height) !== null && _d !== void 0 ? _d : 0;
        this.widthScreenRatio = (_e = modelObject.widthScreenRatio) !== null && _e !== void 0 ? _e : 0;
        this.heightScreenRatio = (_f = modelObject.heightScreenRatio) !== null && _f !== void 0 ? _f : 0;
    }
    return InlineInAppSize;
}());
exports.InlineInAppSize = InlineInAppSize;
