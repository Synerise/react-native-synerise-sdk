"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Error_1 = require("./../../classes/types/Error");
var SyneriseModuleMethodType;
(function (SyneriseModuleMethodType) {
    SyneriseModuleMethodType[SyneriseModuleMethodType["CALLBACK"] = 0] = "CALLBACK";
    SyneriseModuleMethodType[SyneriseModuleMethodType["RETURN_VALUE"] = 1] = "RETURN_VALUE";
    SyneriseModuleMethodType[SyneriseModuleMethodType["ONLY_EXECUTE"] = 2] = "ONLY_EXECUTE";
})(SyneriseModuleMethodType || (SyneriseModuleMethodType = {}));
var SyneriseModuleMethod = /** @class */ (function () {
    function SyneriseModuleMethod(method, args, type) {
        this.isFinish = false;
        this.isSuccess = false;
        this.isFailure = true;
        this.method = method;
        this.args = args || [];
        this.type = type;
    }
    SyneriseModuleMethod.prototype.invoke = function () {
        this.configure();
        try {
            var returnValue = this.method.apply(this, this.args);
            this.handleReturnValue(returnValue);
        }
        catch (error) {
            console.error(error);
        }
    };
    SyneriseModuleMethod.prototype.validateMethod = function (method) {
        return method && {}.toString.call(method) === '[object Function]';
    };
    SyneriseModuleMethod.prototype.handleReturnValue = function (returnValue) {
        if (this.type == SyneriseModuleMethodType.ONLY_EXECUTE || this.isFinish == true) {
            return;
        }
        if (this.type == SyneriseModuleMethodType.RETURN_VALUE) {
            this.handleSuccessData(returnValue);
            return;
        }
    };
    SyneriseModuleMethod.prototype.handleCallback = function (isSuccess, dataObject, errorObject) {
        if (isSuccess == true) {
            if (this.type == SyneriseModuleMethodType.ONLY_EXECUTE || this.isFinish == true) {
                return;
            }
            if (this.type == SyneriseModuleMethodType.CALLBACK) {
                this.handleSuccessData(dataObject);
                return;
            }
        }
        else {
            this.handleError(errorObject);
        }
    };
    SyneriseModuleMethod.prototype.getResponse = function () {
        return this.response;
    };
    SyneriseModuleMethod.prototype.configure = function () {
        this.addCallbackIfNeeded();
    };
    SyneriseModuleMethod.prototype.addCallbackIfNeeded = function () {
        if (this.type == SyneriseModuleMethodType.CALLBACK) {
            var thisObject_1 = this;
            var methodCompletionHandler = function (isSuccess, dataObject, errorObject) {
                thisObject_1.handleCallback(isSuccess, dataObject, errorObject);
            };
            this.args.push(methodCompletionHandler);
        }
    };
    SyneriseModuleMethod.prototype.handleSuccessData = function (data) {
        this.isFinish = true;
        this.isSuccess = true;
        var response = data == undefined || data == null ? true : data;
        this.response = response;
        if (this.onSuccess != null) {
            this.onSuccess(response);
        }
    };
    SyneriseModuleMethod.prototype.handleError = function (errorObject) {
        this.isFinish = true;
        this.isFailure = true;
        if (this.onFailure != null) {
            var syneriseError = Error_1.ErrorMapper.getErrorInstance(errorObject);
            this.onFailure(syneriseError);
        }
    };
    return SyneriseModuleMethod;
}());
var SyneriseModuleConnectorWorker = /** @class */ (function () {
    function SyneriseModuleConnectorWorker() {
        this.type = SyneriseModuleMethodType.ONLY_EXECUTE;
        this.args = [];
    }
    SyneriseModuleConnectorWorker.prototype.withMethod = function (method) {
        this.method = method;
        return this;
    };
    SyneriseModuleConnectorWorker.prototype.withArgs = function (args) {
        this.args = args || [];
        return this;
    };
    SyneriseModuleConnectorWorker.prototype.withType = function (type) {
        this.type = type;
        return this;
    };
    SyneriseModuleConnectorWorker.prototype.onSuccess = function (onSuccess) {
        this.successCallback = onSuccess;
        return this;
    };
    SyneriseModuleConnectorWorker.prototype.onFailure = function (onFailure) {
        this.failureCallback = onFailure;
        return this;
    };
    SyneriseModuleConnectorWorker.prototype.execute = function () {
        this.moduleMethodInstance = new SyneriseModuleMethod(this.method, this.args, this.type);
        var successCallback = this.successCallback;
        if (successCallback != null) {
            this.moduleMethodInstance.onSuccess = function (response) {
                successCallback(response);
            };
        }
        var failureCallback = this.failureCallback;
        if (failureCallback != null) {
            this.moduleMethodInstance.onFailure = function (error) {
                failureCallback(error);
            };
        }
        this.moduleMethodInstance.invoke();
        return this;
    };
    SyneriseModuleConnectorWorker.prototype.response = function () {
        return this.moduleMethodInstance.getResponse();
    };
    return SyneriseModuleConnectorWorker;
}());
var SyneriseModuleConnector = /** @class */ (function () {
    function SyneriseModuleConnector() {
    }
    SyneriseModuleConnector.invokeMethod = function (method, args) {
        var worker = new SyneriseModuleConnectorWorker()
            .withMethod(method)
            .withArgs(args)
            .withType(SyneriseModuleMethodType.ONLY_EXECUTE)
            .execute();
    };
    SyneriseModuleConnector.invokeMethodWithReturnValue = function (method, args, modelMapper) {
        var worker = new SyneriseModuleConnectorWorker()
            .withMethod(method)
            .withArgs(args)
            .withType(SyneriseModuleMethodType.RETURN_VALUE)
            .execute();
        var response = worker.response();
        if (response != null && response != undefined) {
            if (modelMapper != null) {
                return SyneriseModuleConnector.mapResponseObjectToModelClass(modelMapper, response);
            }
        }
        return response;
    };
    SyneriseModuleConnector.invokeMethodWithCallback = function (method, args, onSuccessCallback, onFailureCallback, modelMapper) {
        var worker = new SyneriseModuleConnectorWorker()
            .withMethod(method)
            .withArgs(args)
            .withType(SyneriseModuleMethodType.CALLBACK)
            .onSuccess(function (response) {
            if (onSuccessCallback != null) {
                var responseObject = response;
                if (modelMapper != null) {
                    responseObject = SyneriseModuleConnector.mapResponseObjectToModelClass(modelMapper, responseObject);
                }
                onSuccessCallback(responseObject);
            }
        })
            .onFailure(function (error) {
            if (onFailureCallback != null) {
                onFailureCallback(error);
            }
        })
            .execute();
    };
    SyneriseModuleConnector.mapResponseObjectToModelClass = function (modelMapper, responseObject) {
        return modelMapper.getModelInstance(responseObject);
    };
    return SyneriseModuleConnector;
}());
exports.SyneriseModuleConnector = SyneriseModuleConnector;
