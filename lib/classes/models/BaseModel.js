"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseModel = exports.ModelMapper = void 0;
var BaseModel = /** @class */ (function () {
    function BaseModel(modelObject) {
    }
    BaseModel.prototype.toObject = function () {
        return {};
    };
    BaseModel.prototype.toObjectIfNotEmpty = function () {
        var object = this.toObject();
        var filteredObject = Object.entries(Object.entries(object)
            .filter(function (_a) {
            var key = _a[0], value = _a[1];
            return value !== undefined;
        }));
        if (Object.keys(filteredObject).length > 0) {
            return object;
        }
        else {
            return undefined;
        }
    };
    return BaseModel;
}());
exports.BaseModel = BaseModel;
var ModelMapper = /** @class */ (function () {
    function ModelMapper(mappingFunction) {
        this.mappingFunction = mappingFunction;
    }
    ModelMapper.make = function (modelClass) {
        var createModelFunction = function (modelClass, modelObject) {
            return new modelClass(modelObject);
        };
        var mappingFunction = function (modelObject) {
            return createModelFunction(modelClass, modelObject);
        };
        return new ModelMapper(mappingFunction);
    };
    ModelMapper.prototype.getModelInstance = function (modelObject) {
        return this.mappingFunction(modelObject);
    };
    return ModelMapper;
}());
exports.ModelMapper = ModelMapper;
