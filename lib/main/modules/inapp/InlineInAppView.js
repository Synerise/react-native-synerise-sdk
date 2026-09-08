"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InlineInAppView = void 0;
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var InlineInAppMessageData_1 = require("../../../classes/models/Misc/InlineInAppMessageData");
var InlineInAppSize_1 = require("../../../classes/models/Misc/InlineInAppSize");
var SyneriseModuleConnector_1 = require("./../../communication/SyneriseModuleConnector");
var RNInjector = react_native_1.NativeModules.RNInjector;
var NATIVE_COMPONENT_NAME = 'RNInlineInAppView';
var RNInlineInAppViewNative = react_native_1.requireNativeComponent(NATIVE_COMPONENT_NAME);
/**
 * The shared connector turns a null native payload into `true`, so "no campaign" arrives as a boolean
 * rather than null; this method never returns a boolean payload, which makes that unambiguous.
 */
function isEmptyDataResponse(response) {
    return response == null || typeof response !== 'object';
}
function resolveCommandId(commandName) {
    var config = react_native_1.UIManager.getViewManagerConfig(NATIVE_COMPONENT_NAME);
    if (config != null && config.Commands != null && config.Commands[commandName] != null) {
        return config.Commands[commandName];
    }
    return commandName;
}
var InlineInAppView = react_1.forwardRef(function (props, ref) {
    var nativeRef = react_1.useRef(null);
    react_1.useImperativeHandle(ref, function () { return ({
        render: function () {
            dispatchViewCommand('render');
        },
        release: function () {
            dispatchViewCommand('release');
        },
        isRendered: function () {
            return queryIsRendered();
        },
        getData: function () {
            return queryData();
        },
    }); });
    function queryData() {
        var node = react_native_1.findNodeHandle(nativeRef.current);
        if (node == null) {
            return Promise.resolve(null);
        }
        return new Promise(function (resolve) {
            SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNInjector.getInlineInAppData, [node], function (response) { return resolve(isEmptyDataResponse(response) ? null : new InlineInAppMessageData_1.InlineInAppMessageData(response)); }, function () { return resolve(null); });
        });
    }
    function queryIsRendered() {
        var node = react_native_1.findNodeHandle(nativeRef.current);
        if (node == null) {
            return Promise.resolve(false);
        }
        return new Promise(function (resolve) {
            SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNInjector.isInlineInAppRendered, [node], function (response) { return resolve(response === true); }, function () { return resolve(false); });
        });
    }
    function dispatchViewCommand(commandName) {
        var node = react_native_1.findNodeHandle(nativeRef.current);
        if (node != null) {
            react_native_1.UIManager.dispatchViewManagerCommand(node, resolveCommandId(commandName), []);
        }
    }
    function toMessageData(nativeData) {
        return new InlineInAppMessageData_1.InlineInAppMessageData(nativeData);
    }
    function handleLoaded(event) {
        if (props.onLoaded != null) {
            props.onLoaded(toMessageData(event.nativeEvent.data));
        }
    }
    function handleUpdated(event) {
        if (props.onUpdated != null) {
            props.onUpdated(toMessageData(event.nativeEvent.data));
        }
    }
    function handleFailed(event) {
        if (props.onFailed != null) {
            props.onFailed(toMessageData(event.nativeEvent.data), event.nativeEvent.error);
        }
    }
    function handleRemove(event) {
        if (props.onRemove != null) {
            props.onRemove(toMessageData(event.nativeEvent.data));
        }
    }
    function handleSizeChanged(event) {
        if (props.onSizeChanged != null) {
            props.onSizeChanged(toMessageData(event.nativeEvent.data), new InlineInAppSize_1.InlineInAppSize(event.nativeEvent));
        }
    }
    function handleProcessingStarted() {
        if (props.onProcessingStarted != null) {
            props.onProcessingStarted();
        }
    }
    return (react_1.default.createElement(RNInlineInAppViewNative, { ref: nativeRef, placementKey: props.placementKey, identifier: props.identifier, adoptViewId: props.adoptViewId, style: props.style, onLoaded: handleLoaded, onUpdated: handleUpdated, onFailed: handleFailed, onRemove: handleRemove, onSizeChanged: handleSizeChanged, onProcessingStarted: handleProcessingStarted }));
});
exports.InlineInAppView = InlineInAppView;
