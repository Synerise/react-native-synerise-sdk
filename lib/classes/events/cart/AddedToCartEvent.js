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
var CartEvent_1 = require("./CartEvent");
var ADDED_TO_CART_EVENT_TYPE = 'added-to-cart';
var AddedToCartEvent = /** @class */ (function (_super) {
    __extends(AddedToCartEvent, _super);
    function AddedToCartEvent(label, sku, finalPrice, quantity, parameters) {
        return _super.call(this, ADDED_TO_CART_EVENT_TYPE, label, sku, finalPrice, quantity, parameters || {}) || this;
    }
    return AddedToCartEvent;
}(CartEvent_1.CartEvent));
exports.AddedToCartEvent = AddedToCartEvent;
