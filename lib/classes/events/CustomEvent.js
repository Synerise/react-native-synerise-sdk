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
exports.CustomEvent = void 0;
var Event_1 = require("./Event");
var CustomEvent = /** @class */ (function (_super) {
    __extends(CustomEvent, _super);
    function CustomEvent(label, action, parameters) {
        return _super.call(this, label, action, parameters || {}) || this;
    }
    CustomEvent.prototype.setString = function (key, string) {
        if (typeof key == 'string' && typeof string == 'string') {
            this.parameters[key] = string;
        }
    };
    CustomEvent.prototype.setNumber = function (key, number) {
        if (typeof key == 'string' && typeof number == 'number') {
            this.parameters[key] = number;
        }
    };
    CustomEvent.prototype.setBool = function (key, bool) {
        if (typeof key == 'string' && typeof bool == 'boolean') {
            this.parameters[key] = bool;
        }
    };
    CustomEvent.prototype.setObject = function (key, object) {
        //TODO: add object validation
        if (typeof key == 'string' && typeof object == 'object') {
            this.parameters[key] = object;
        }
    };
    return CustomEvent;
}(Event_1.Event));
exports.CustomEvent = CustomEvent;
