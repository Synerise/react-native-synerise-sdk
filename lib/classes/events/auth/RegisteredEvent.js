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
var Event_1 = require("./../Event");
var REGISTERED_EVENT_TYPE = 'registered';
var RegisteredEvent = /** @class */ (function (_super) {
    __extends(RegisteredEvent, _super);
    function RegisteredEvent(label, parameters) {
        return _super.call(this, REGISTERED_EVENT_TYPE, label, null, parameters || {}) || this;
    }
    return RegisteredEvent;
}(Event_1.Event));
exports.RegisteredEvent = RegisteredEvent;
