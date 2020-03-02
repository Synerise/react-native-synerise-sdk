"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
var SyneriseModuleConnector_1 = require("./communication/SyneriseModuleConnector");
var SyneriseModuleEmitter_1 = require("./communication/SyneriseModuleEmitter");
var SettingsModule_1 = require("./modules/SettingsModule");
var ClientModule_1 = require("./modules/ClientModule");
var TrackerModule_1 = require("./modules/TrackerModule");
var NotificationsModule_1 = require("./modules/NotificationsModule");
var InjectorModule_1 = require("./modules/InjectorModule");
var PromotionsModule_1 = require("./modules/PromotionsModule");
var Error_1 = require("./../classes/types/Error");
var RNSynerise = react_native_1.NativeModules.RNSynerise;
var ModuleIdentifier;
(function (ModuleIdentifier) {
    ModuleIdentifier[ModuleIdentifier["SETTINGS"] = 0] = "SETTINGS";
    ModuleIdentifier[ModuleIdentifier["CLIENT"] = 1] = "CLIENT";
    ModuleIdentifier[ModuleIdentifier["TRACKER"] = 2] = "TRACKER";
    ModuleIdentifier[ModuleIdentifier["NOTIFICATIONS"] = 3] = "NOTIFICATIONS";
    ModuleIdentifier[ModuleIdentifier["INJECTOR"] = 4] = "INJECTOR";
    ModuleIdentifier[ModuleIdentifier["PROMOTIONS"] = 5] = "PROMOTIONS";
})(ModuleIdentifier || (ModuleIdentifier = {}));
function getModuleInstance(module) {
    if (module == ModuleIdentifier.SETTINGS) {
        return SettingsModule_1.SettingsModule.instance();
    }
    if (module == ModuleIdentifier.CLIENT) {
        return ClientModule_1.ClientModule.instance();
    }
    if (module == ModuleIdentifier.TRACKER) {
        return TrackerModule_1.TrackerModule.instance();
    }
    if (module == ModuleIdentifier.NOTIFICATIONS) {
        return NotificationsModule_1.NotificationsModule.instance();
    }
    if (module == ModuleIdentifier.INJECTOR) {
        return InjectorModule_1.InjectorModule.instance();
    }
    if (module == ModuleIdentifier.PROMOTIONS) {
        return PromotionsModule_1.PromotionsModule.instance();
    }
}
var modulesToCreate = [
    ModuleIdentifier.SETTINGS,
    ModuleIdentifier.CLIENT,
    ModuleIdentifier.TRACKER,
    ModuleIdentifier.NOTIFICATIONS,
    ModuleIdentifier.INJECTOR,
    ModuleIdentifier.PROMOTIONS,
];
var SyneriseModuleController = /** @class */ (function () {
    function SyneriseModuleController() {
    }
    SyneriseModuleController.prototype.setupModules = function () {
        for (var _i = 0, modulesToCreate_1 = modulesToCreate; _i < modulesToCreate_1.length; _i++) {
            var module = modulesToCreate_1[_i];
            var moduleInstance = getModuleInstance(module);
            this.enableModule(module);
            this.configureModule(module);
        }
    };
    SyneriseModuleController.prototype.configureModule = function (module) {
        this.injectModuleConfiguration({}, module);
    };
    SyneriseModuleController.prototype.enableModule = function (module) {
        var moduleInstance = getModuleInstance(module);
        if (moduleInstance) {
            moduleInstance.isActive = true;
        }
    };
    SyneriseModuleController.prototype.disableModule = function (module) {
        var moduleInstance = getModuleInstance(module);
        if (moduleInstance) {
            moduleInstance.isActive = false;
        }
    };
    SyneriseModuleController.prototype.injectModuleConfiguration = function (configuration, module) {
        var moduleInstance = getModuleInstance(module);
        if (moduleInstance) {
            moduleInstance.configure(configuration);
        }
    };
    SyneriseModuleController.prototype.getModuleName = function (moduleIdentifier) {
        var moduleName = ModuleIdentifier[moduleIdentifier];
        var moduleNameLowercased = moduleName.toLowerCase();
        var moduleNameNormalized = moduleNameLowercased.charAt(0).toUpperCase() + moduleNameLowercased.slice(1);
        return moduleNameNormalized;
    };
    SyneriseModuleController.prototype.getModule = function (moduleIdentifier) {
        var moduleInstance = getModuleInstance(moduleIdentifier);
        if (moduleInstance != undefined && moduleInstance.isAlwaysActive() == true) {
            return moduleInstance;
        }
        if (syneriseInitialized == false) {
            console.error("Synerise is not initialized, please use Synerise.Initializer first.");
        }
        if (moduleInstance != undefined && moduleInstance.isActive == true) {
            return moduleInstance;
        }
        else {
            console.error("Synerise " + this.getModuleName(moduleIdentifier) + " module is not available now.");
        }
    };
    return SyneriseModuleController;
}());
var onSyneriseReady;
var onSyneriseError;
var SyneriseInitializer = /** @class */ (function () {
    function SyneriseInitializer() {
        RNSynerise.createInitializer();
    }
    SyneriseInitializer.prototype.withClientApiKey = function (clientApiKey) {
        RNSynerise.withClientApiKey(clientApiKey);
        return this;
    };
    SyneriseInitializer.prototype.withBaseUrl = function (baseUrl) {
        RNSynerise.withBaseUrl(baseUrl);
        return this;
    };
    SyneriseInitializer.prototype.withDebugModeEnabled = function (debugModeEnabled) {
        RNSynerise.withDebugModeEnabled(debugModeEnabled);
        return this;
    };
    SyneriseInitializer.prototype.withCrashHandlingEnabled = function (crashHandlingEnabled) {
        RNSynerise.withCrashHandlingEnabled(crashHandlingEnabled);
        return this;
    };
    SyneriseInitializer.prototype.withSettings = function (settings) {
        this.settings = settings;
        return this;
    };
    SyneriseInitializer.prototype.init = function () {
        var _this = this;
        if (syneriseInitCalled == true) {
            console.error("Synerise.Initializer.init: already called");
            return;
        }
        syneriseInitCalled = true;
        if (this.settings !== undefined) {
            Synerise.Settings.set(this.settings);
        }
        SyneriseModuleEmitter_1.SyneriseModuleEmitter.getEmitter().addListener(RNSynerise.INITIALIZATION_SUCCESS_LISTENER_KEY, function () {
            syneriseInitialized = true;
            _this.setupModules();
            RNSynerise.initialized();
            if (onSyneriseReady !== undefined) {
                onSyneriseReady();
            }
        });
        SyneriseModuleEmitter_1.SyneriseModuleEmitter.getEmitter().addListener(RNSynerise.INITIALIZATION_FAILURE_LISTENER_KEY, function (errorObject) {
            if (onSyneriseError !== undefined) {
                var error = Error_1.ErrorMapper.getErrorInstance(errorObject);
                onSyneriseError(error);
            }
        });
        RNSynerise.initialize();
    };
    SyneriseInitializer.prototype.setupModules = function () {
        syneriseModuleController.setupModules();
    };
    SyneriseInitializer.prototype.enableModules = function () {
        syneriseModuleController.enableModules();
    };
    return SyneriseInitializer;
}());
var syneriseModuleController = new SyneriseModuleController();
var syneriseInitCalled = false;
var syneriseInitialized = false;
var Synerise = /** @class */ (function () {
    function Synerise() {
        console.warn("Synerise.constructor is not allowed, please use Synerise.Initializer instead.");
    }
    Synerise.onReady = function (callback) {
        onSyneriseReady = callback;
    };
    Synerise.onError = function (callback) {
        onSyneriseError = callback;
    };
    Synerise.isInitialized = function () {
        return syneriseInitialized;
    };
    Synerise.changeClientApiKey = function (clientApiKey) {
        if (this.isInitialized()) {
            SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethod(RNSynerise.changeClientApiKey, [clientApiKey]);
        }
    };
    Object.defineProperty(Synerise, "Settings", {
        get: function () {
            return syneriseModuleController.getModule(ModuleIdentifier.SETTINGS);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Synerise, "Client", {
        get: function () {
            return syneriseModuleController.getModule(ModuleIdentifier.CLIENT);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Synerise, "Tracker", {
        get: function () {
            return syneriseModuleController.getModule(ModuleIdentifier.TRACKER);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Synerise, "Notifications", {
        get: function () {
            return syneriseModuleController.getModule(ModuleIdentifier.NOTIFICATIONS);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Synerise, "Injector", {
        get: function () {
            return syneriseModuleController.getModule(ModuleIdentifier.INJECTOR);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Synerise, "Promotions", {
        get: function () {
            return syneriseModuleController.getModule(ModuleIdentifier.PROMOTIONS);
        },
        enumerable: true,
        configurable: true
    });
    Synerise.Initializer = function () {
        var initializer = new SyneriseInitializer();
        return initializer;
    };
    return Synerise;
}());
exports.Synerise = Synerise;
