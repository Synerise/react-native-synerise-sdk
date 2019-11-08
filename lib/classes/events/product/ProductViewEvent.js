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
var ProductEvent_1 = require("./ProductEvent");
var PRODUCT_VIEW_EVENT_TYPE = 'product-view';
var ProductViewEvent = /** @class */ (function (_super) {
    __extends(ProductViewEvent, _super);
    function ProductViewEvent(label, productId, name, parameters) {
        return _super.call(this, PRODUCT_VIEW_EVENT_TYPE, label, productId, name, parameters || {}) || this;
    }
    return ProductViewEvent;
}(ProductEvent_1.ProductEvent));
exports.ProductViewEvent = ProductViewEvent;
