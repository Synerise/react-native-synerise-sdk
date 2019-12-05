"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Error = /** @class */ (function () {
    function Error(code, message) {
        this.code = code;
        this.message = message;
    }
    return Error;
}());
exports.Error = Error;
var ErrorMapper = /** @class */ (function () {
    function ErrorMapper() {
    }
    ErrorMapper.getErrorInstance = function (errorObject) {
        try {
            var code = errorObject.code;
            var message = errorObject.message;
            return new Error(code, message);
        }
        catch (err) {
            return ErrorProvider.getUnknownError();
        }
    };
    return ErrorMapper;
}());
exports.ErrorMapper = ErrorMapper;
var ErrorProvider = /** @class */ (function () {
    function ErrorProvider() {
    }
    ErrorProvider.getUnknownError = function () {
        return new Error(0, 'Unknown error has occured');
    };
    return ErrorProvider;
}());
exports.ErrorProvider = ErrorProvider;
