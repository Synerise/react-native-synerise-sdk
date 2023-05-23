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
var CustomEvent_1 = require("./../CustomEvent");
var Params;
(function (Params) {
    Params["SKU"] = "sku";
    Params["NAME"] = "name";
    Params["CATEGORY"] = "category";
    Params["CATEGORIES"] = "categories";
    Params["OFFLINE"] = "offline";
    Params["REGULAR_UNIT_PRICE"] = "regularUnitPrice";
    Params["DISCOUNTED_UNIT_PRICE"] = "discountedUnitPrice";
    Params["FINAL_UNIT_PRICE"] = "finalUnitPrice";
    Params["URL"] = "url";
    Params["PRODUCER"] = "producer";
    Params["QUANTITY"] = "quantity";
})(Params || (Params = {}));
var CartEvent = /** @class */ (function (_super) {
    __extends(CartEvent, _super);
    function CartEvent(label, action, sku, finalPrice, quantity, parameters) {
        var _this = _super.call(this, label, action, parameters || {}) || this;
        // TODO: walidacja przed konfilktami kluczy
        _this.parameters[Params.SKU] = sku;
        _this.parameters[Params.QUANTITY] = quantity;
        _this.parameters[Params.FINAL_UNIT_PRICE] = finalPrice;
        return _this;
    }
    CartEvent.prototype.setName = function (name) {
        if (typeof name == 'string') {
            this.parameters[Params.NAME] = name;
        }
    };
    CartEvent.prototype.setCategory = function (category) {
        if (typeof category == 'string') {
            this.parameters[Params.CATEGORY] = category;
        }
    };
    CartEvent.prototype.setCategories = function (categories) {
        this.parameters[Params.CATEGORIES] = categories;
    };
    CartEvent.prototype.setOffline = function (offline) {
        if (typeof offline == 'boolean') {
            this.parameters[Params.OFFLINE] = offline;
        }
    };
    CartEvent.prototype.setRegularPrice = function (regularPrice) {
        this.parameters[Params.REGULAR_UNIT_PRICE] = regularPrice;
    };
    CartEvent.prototype.setDiscountedPrice = function (discountedPrice) {
        this.parameters[Params.DISCOUNTED_UNIT_PRICE] = discountedPrice;
    };
    CartEvent.prototype.setUrl = function (url) {
        if (typeof url == 'string') {
            this.parameters[Params.URL] = url;
        }
    };
    CartEvent.prototype.setProducer = function (producer) {
        if (typeof producer == 'string') {
            this.parameters[Params.PRODUCER] = producer;
        }
    };
    return CartEvent;
}(CustomEvent_1.CustomEvent));
exports.CartEvent = CartEvent;
