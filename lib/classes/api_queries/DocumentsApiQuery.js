"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DocumentsApiQuery = /** @class */ (function () {
    function DocumentsApiQuery(type, typeValue, version) {
        this.type = type;
        this.typeValue = typeValue;
        this.version = version;
    }
    DocumentsApiQuery.prototype.toObject = function () {
        return {
            type: this.type,
            typeValue: this.typeValue,
            version: this.version,
        };
    };
    return DocumentsApiQuery;
}());
exports.DocumentsApiQuery = DocumentsApiQuery;
