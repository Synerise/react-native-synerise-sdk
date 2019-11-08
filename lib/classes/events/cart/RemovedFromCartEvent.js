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
var REMOVED_FROM_CART_EVENT_TYPE = 'removed-from-cart';
var RemovedFromCartEvent = /** @class */ (function (_super) {
    __extends(RemovedFromCartEvent, _super);
    function RemovedFromCartEvent(label, sku, finalPrice, quantity, parameters) {
        return _super.call(this, REMOVED_FROM_CART_EVENT_TYPE, label, sku, finalPrice, quantity, parameters || {}) || this;
    }
    return RemovedFromCartEvent;
}(CartEvent_1.CartEvent));
exports.RemovedFromCartEvent = RemovedFromCartEvent;
