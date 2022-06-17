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
exports.ProductRemovedFromCartEvent = void 0;
var CartEvent_1 = require("../cart/CartEvent");
var PRODUCT_REMOVED_FROM_CART_EVENT_TYPE = 'removed-from-cart';
var ProductRemovedFromCartEvent = /** @class */ (function (_super) {
    __extends(ProductRemovedFromCartEvent, _super);
    function ProductRemovedFromCartEvent(label, sku, finalPrice, quantity, parameters) {
        return _super.call(this, PRODUCT_REMOVED_FROM_CART_EVENT_TYPE, label, sku, finalPrice, quantity, parameters || {}) || this;
    }
    return ProductRemovedFromCartEvent;
}(CartEvent_1.CartEvent));
exports.ProductRemovedFromCartEvent = ProductRemovedFromCartEvent;
