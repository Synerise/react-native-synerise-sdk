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
var BaseModel_1 = require("./../BaseModel");
var TokenOrigin_1 = require("./TokenOrigin");
var Token = /** @class */ (function (_super) {
    __extends(Token, _super);
    function Token(modelObject) {
        var _this = _super.call(this, modelObject) || this;
        _this.tokenString = modelObject.tokenString;
        _this.tokenOrigin = TokenOrigin_1.TokenOriginFromString(modelObject.tokenOrigin);
        _this.expirationDate = new Date(modelObject.expirationDate * 1000);
        return _this;
    }
    return Token;
}(BaseModel_1.BaseModel));
exports.Token = Token;
