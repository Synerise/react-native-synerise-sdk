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
var ClientConditionalAuthResult = /** @class */ (function (_super) {
    __extends(ClientConditionalAuthResult, _super);
    function ClientConditionalAuthResult(model) {
        var _this = _super.call(this, model) || this;
        _this.status = model.status;
        _this.conditions = model.conditions;
        return _this;
    }
    return ClientConditionalAuthResult;
}(BaseModel_1.BaseModel));
exports.ClientConditionalAuthResult = ClientConditionalAuthResult;
