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
exports.SharedEvent = void 0;
var Event_1 = require("./../Event");
var SHARED_EVENT_TYPE = 'shared';
var SharedEvent = /** @class */ (function (_super) {
    __extends(SharedEvent, _super);
    function SharedEvent(label, parameters) {
        return _super.call(this, SHARED_EVENT_TYPE, label, null, parameters || {}) || this;
    }
    return SharedEvent;
}(Event_1.Event));
exports.SharedEvent = SharedEvent;
