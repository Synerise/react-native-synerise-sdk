"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BaseModel = /** @class */ (function () {
    function BaseModel(modelObject) {
    }
    BaseModel.prototype.toObject = function () {
        return {};
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
