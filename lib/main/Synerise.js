"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
var SettingsModule_1 = require("./modules/SettingsModule");
var ClientModule_1 = require("./modules/ClientModule");
var TrackerModule_1 = require("./modules/TrackerModule");
var RNSynerise = react_native_1.NativeModules.RNSynerise;
var SyneriseModule;
(function (SyneriseModule) {
    SyneriseModule[SyneriseModule["SETTINGS"] = 0] = "SETTINGS";
    SyneriseModule[SyneriseModule["CLIENT"] = 1] = "CLIENT";
    SyneriseModule[SyneriseModule["TRACKER"] = 2] = "TRACKER";
})(SyneriseModule || (SyneriseModule = {}));
function getModuleInstance(module) {
    if (module == SyneriseModule.SETTINGS) {
        return SettingsModule_1.SettingsModule.instance();
    }
    if (module == SyneriseModule.CLIENT) {
        return ClientModule_1.ClientModule.instance();
    }
    if (module == SyneriseModule.TRACKER) {
        return TrackerModule_1.TrackerModule.instance();
    }
}
var modulesToCreate = [SyneriseModule.SETTINGS, SyneriseModule.CLIENT, SyneriseModule.TRACKER];
var SyneriseModuleController = /** @class */ (function () {
    function SyneriseModuleController() {
    }
    SyneriseModuleController.prototype.setupModules = function () {
        for (var _i = 0, modulesToCreate_1 = modulesToCreate; _i < modulesToCreate_1.length; _i++) {
            var module = modulesToCreate_1[_i];
            var moduleInstance = getModuleInstance(module);
            this.configureModule(module);
            this.enableModule(module);
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
    SyneriseModuleController.prototype.getModule = function (module) {
        if (syneriseInitialized == false) {
            console.error("Synerise is not initialized, please use Synerise.Initializer first.");
        }
        var moduleInstance = getModuleInstance(module);
        if (moduleInstance && moduleInstance.isActive == true) {
            return moduleInstance;
        }
    };
    return SyneriseModuleController;
}());
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
        if (syneriseInitCalled == true) {
            console.error("Synerise.Initializer.init: already called");
            return;
        }
        syneriseInitCalled = true;
        //TODO: callbacks
        RNSynerise.initialize();
        syneriseInitialized = true;
        this.setupModules();
        this.setSettings();
        if (this.onSuccess !== undefined) {
            this.onSuccess();
        }
    };
    SyneriseInitializer.prototype.setupModules = function () {
        syneriseModuleController.setupModules();
    };
    SyneriseInitializer.prototype.setSettings = function () {
        if (this.settings !== undefined) {
            Synerise.Settings.set(this.settings);
        }
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
    Synerise.isInitialized = function () {
        return syneriseInitialized;
    };
    Object.defineProperty(Synerise, "Settings", {
        get: function () {
            return syneriseModuleController.getModule(SyneriseModule.SETTINGS);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Synerise, "Client", {
        get: function () {
            return syneriseModuleController.getModule(SyneriseModule.CLIENT);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Synerise, "Tracker", {
        get: function () {
            return syneriseModuleController.getModule(SyneriseModule.TRACKER);
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
