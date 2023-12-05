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
exports.ScreenView = void 0;
var BaseModel_1 = require("../BaseModel");
var ScreenViewAudienceInfo_1 = require("./ScreenViewAudienceInfo");
var ScreenView = /** @class */ (function (_super) {
    __extends(ScreenView, _super);
    function ScreenView(modelObject) {
        var _this = _super.call(this, modelObject) || this;
        _this.identifier = modelObject.identifier;
        _this.name = modelObject.name;
        _this.hash = modelObject.hash;
        _this.path = modelObject.path;
        _this.priority = modelObject.priority;
        _this.audience = new ScreenViewAudienceInfo_1.ScreenViewAudienceInfo(modelObject.audience);
        _this.data = modelObject.data;
        _this.createdAt = new Date(modelObject.createdAt * 1000);
        _this.updatedAt = new Date(modelObject.updatedAt * 1000);
        return _this;
    }
    return ScreenView;
}(BaseModel_1.BaseModel));
exports.ScreenView = ScreenView;
