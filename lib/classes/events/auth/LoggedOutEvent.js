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
exports.LoggedOutEvent = void 0;
var CustomEvent_1 = require("./../CustomEvent");
var LoggedOutEvent = /** @class */ (function (_super) {
    __extends(LoggedOutEvent, _super);
    function LoggedOutEvent(label, parameters) {
        return _super.call(this, label, 'client.logout', parameters || {}) || this;
    }
    return LoggedOutEvent;
}(CustomEvent_1.CustomEvent));
exports.LoggedOutEvent = LoggedOutEvent;
