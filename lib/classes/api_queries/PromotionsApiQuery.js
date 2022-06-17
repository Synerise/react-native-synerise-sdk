"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromotionsApiQuery = void 0;
var BaseApiQuery_1 = require("./BaseApiQuery");
var PromotionsApiQuery = /** @class */ (function (_super) {
    __extends(PromotionsApiQuery, _super);
    function PromotionsApiQuery() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.statuses = [];
        _this.types = [];
        return _this;
    }
    PromotionsApiQuery.prototype.toObject = function () {
        return {
            statuses: this.statuses,
            types: this.types,
            sorting: this.sorting,
            limit: this.limit,
            page: this.page,
            includeMeta: this.includeMeta,
        };
    };
    return PromotionsApiQuery;
}(BaseApiQuery_1.BaseApiQuery));
exports.PromotionsApiQuery = PromotionsApiQuery;
