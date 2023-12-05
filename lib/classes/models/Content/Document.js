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
exports.Document = void 0;
var BaseModel_1 = require("../BaseModel");
var Document = /** @class */ (function (_super) {
    __extends(Document, _super);
    function Document(modelObject) {
        var _this = _super.call(this, modelObject) || this;
        _this.uuid = modelObject.uuid;
        _this.slug = modelObject.slug;
        _this.schema = modelObject.schema;
        _this.content = modelObject.content;
        return _this;
    }
    return Document;
}(BaseModel_1.BaseModel));
exports.Document = Document;
