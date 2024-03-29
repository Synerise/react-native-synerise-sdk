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
exports.SearchedEvent = void 0;
var CustomEvent_1 = require("./../CustomEvent");
var SearchedEvent = /** @class */ (function (_super) {
    __extends(SearchedEvent, _super);
    function SearchedEvent(label, parameters) {
        return _super.call(this, label, 'client.search', parameters || {}) || this;
    }
    return SearchedEvent;
}(CustomEvent_1.CustomEvent));
exports.SearchedEvent = SearchedEvent;
