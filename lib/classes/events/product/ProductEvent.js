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
var Event_1 = require("../Event");
var Params;
(function (Params) {
    Params["PRODUCT_ID"] = "productId";
    Params["NAME"] = "name";
    Params["CATEGORY"] = "category";
    Params["URL"] = "url";
})(Params || (Params = {}));
var ProductEvent = /** @class */ (function (_super) {
    __extends(ProductEvent, _super);
    function ProductEvent(type, label, productId, name, parameters) {
        var _this = _super.call(this, type, label, null, parameters || {}) || this;
        _this.parameters[Params.PRODUCT_ID] = productId;
        _this.parameters[Params.NAME] = name;
        return _this;
    }
    ProductEvent.prototype.setCategory = function (category) {
        if (typeof category == 'string') {
            this.parameters[Params.CATEGORY] = category;
        }
    };
    ProductEvent.prototype.setUrl = function (url) {
        if (typeof url == 'string') {
            this.parameters[Params.URL] = url;
        }
    };
    return ProductEvent;
}(Event_1.Event));
exports.ProductEvent = ProductEvent;
