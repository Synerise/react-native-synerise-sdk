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
exports.ScreenViewResponse = void 0;
var BaseModel_1 = require("../BaseModel");
var ScreenViewAudience_1 = require("./ScreenViewAudience");
var ScreenViewResponse = /** @class */ (function (_super) {
    __extends(ScreenViewResponse, _super);
    function ScreenViewResponse(modelObject) {
        var _this = _super.call(this, modelObject) || this;
        _this.audience = new ScreenViewAudience_1.ScreenViewAudience(modelObject.audience);
        _this.identifier = modelObject.identifier;
        _this.hashString = modelObject.hashString;
        _this.path = modelObject.path;
        _this.name = modelObject.name;
        _this.priority = modelObject.priority;
        if (modelObject.descriptionText !== undefined) {
            _this.descriptionText = modelObject.descriptionText;
        }
        _this.data = modelObject.data;
        _this.version = modelObject.version;
        if (modelObject.parentVersion !== undefined) {
            _this.parentVersion = modelObject.parentVersion;
        }
        _this.createdAt = new Date(modelObject.createdAt * 1000);
        _this.updatedAt = new Date(modelObject.updatedAt * 1000);
        if (modelObject.deletedAt !== undefined) {
            _this.deletedAt = new Date(modelObject.deletedAt * 1000);
        }
        return _this;
    }
    return ScreenViewResponse;
}(BaseModel_1.BaseModel));
exports.ScreenViewResponse = ScreenViewResponse;
