"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiQuerySortingOrder = exports.BaseApiQuery = void 0;
var ApiQuerySortingOrder;
(function (ApiQuerySortingOrder) {
    ApiQuerySortingOrder["Ascending"] = "asc";
    ApiQuerySortingOrder["Descending"] = "desc";
})(ApiQuerySortingOrder || (ApiQuerySortingOrder = {}));
exports.ApiQuerySortingOrder = ApiQuerySortingOrder;
var BaseApiQuery = /** @class */ (function () {
    function BaseApiQuery() {
        this.limit = 100;
        this.page = 1;
        this.sorting = [];
        this.includeMeta = false;
    }
    return BaseApiQuery;
}());
exports.BaseApiQuery = BaseApiQuery;
