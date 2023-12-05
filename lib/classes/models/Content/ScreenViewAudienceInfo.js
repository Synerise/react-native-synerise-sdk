"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScreenViewAudienceInfo = void 0;
var BaseModel_1 = require("../BaseModel");
var ScreenViewAudienceInfo = /** @class */ (function (_super) {
    __extends(ScreenViewAudienceInfo, _super);
    function ScreenViewAudienceInfo(modelObject) {
        var _this = _super.call(this, modelObject) || this;
        if (modelObject.segments !== undefined && modelObject.segments !== null) {
            _this.segments = modelObject.segments;
        }
        if (modelObject.query !== undefined && modelObject.query !== null) {
            _this.query = modelObject.query;
        }
        if (modelObject.targetType !== undefined && modelObject.targetType !== null) {
            _this.targetType = modelObject.targetType;
        }
        return _this;
    }
    return ScreenViewAudienceInfo;
}(BaseModel_1.BaseModel));
exports.ScreenViewAudienceInfo = ScreenViewAudienceInfo;
