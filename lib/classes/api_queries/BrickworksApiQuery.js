"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrickworksApiQuery = void 0;
var BrickworksApiQuery = /** @class */ (function () {
    function BrickworksApiQuery(schemaSlug) {
        this.schemaSlug = schemaSlug;
    }
    BrickworksApiQuery.byRecordSlug = function (schemaSlug, recordSlug) {
        var instance = new BrickworksApiQuery(schemaSlug);
        instance.recordSlug = recordSlug;
        return instance;
    };
    BrickworksApiQuery.byRecordId = function (schemaSlug, recordId) {
        var instance = new BrickworksApiQuery(schemaSlug);
        instance.recordId = recordId;
        return instance;
    };
    BrickworksApiQuery.prototype.toObject = function () {
        return {
            schemaSlug: this.schemaSlug,
            recordSlug: this.recordSlug,
            recordId: this.recordId,
            context: this.context,
            fieldContext: this.fieldContext
        };
    };
    return BrickworksApiQuery;
}());
exports.BrickworksApiQuery = BrickworksApiQuery;
