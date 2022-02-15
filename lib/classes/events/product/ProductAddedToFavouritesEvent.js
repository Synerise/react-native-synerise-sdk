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
exports.ProductAddedToFavouritesEvent = void 0;
var Event_1 = require("../Event");
var PRODUCT_DDED_TO_FAVOURITES_EVENT_TYPE = 'added-to-favorites';
var ProductAddedToFavouritesEvent = /** @class */ (function (_super) {
    __extends(ProductAddedToFavouritesEvent, _super);
    function ProductAddedToFavouritesEvent(label, parameters) {
        return _super.call(this, PRODUCT_DDED_TO_FAVOURITES_EVENT_TYPE, label, null, parameters || {}) || this;
    }
    return ProductAddedToFavouritesEvent;
}(Event_1.Event));
exports.ProductAddedToFavouritesEvent = ProductAddedToFavouritesEvent;
