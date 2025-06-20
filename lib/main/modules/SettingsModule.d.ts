import { BaseModule as Module } from './BaseModule';
declare const LocalizableStringKeyOK = "LocalizableStringKeyOK";
declare const LocalizableStringKeyCancel = "LocalizableStringKeyCancel";
interface ISettingsOptions {
    sdk?: {
        enabled?: boolean;
        doNotTrack?: boolean;
        appGroupIdentifier?: string;
        keychainGroupIdentifier?: string;
        minTokenRefreshInterval?: number;
        shouldDestroySessionOnApiKeyChange?: boolean;
        localizable?: object;
    };
    tracker?: {
        isBackendTimeSyncRequired?: boolean;
        minBatchSize?: number;
        maxBatchSize?: number;
        autoFlushTimeout?: number;
        eventsTriggeringFlush?: Array<string>;
    };
    notifications?: {
        enabled?: boolean;
        encryption?: boolean;
        disableInAppAlerts?: boolean;
    };
    inAppMessaging?: {
        checkGlobalControlGroupsOnDefinitionsFetch?: boolean;
        maxDefinitionUpdateIntervalLimit?: number;
        contentBaseUrl?: string;
        renderingTimeout?: number;
        shouldSendInAppCappingEvent?: boolean;
    };
    injector?: {
        automatic?: boolean;
    };
}
declare class SettingsModule extends Module {
    private static _instance;
    sdk: {
        enabled: any;
        doNotTrack: any;
        appGroupIdentifier: any;
        keychainGroupIdentifier: any;
        minTokenRefreshInterval: any;
        shouldDestroySessionOnApiKeyChange: any;
        localizable: any;
    };
    tracker: {
        isBackendTimeSyncRequired: any;
        minBatchSize: any;
        maxBatchSize: any;
        autoFlushTimeout: any;
        eventsTriggeringFlush: any;
    };
    notifications: {
        enabled: any;
        encryption: any;
        disableInAppAlerts: any;
    };
    inAppMessaging: {
        checkGlobalControlGroupsOnDefinitionsFetch: any;
        maxDefinitionUpdateIntervalLimit: any;
        contentBaseUrl: any;
        renderingTimeout: any;
        shouldSendInAppCappingEvent: any;
    };
    injector: {
        automatic: any;
    };
    static instance(): SettingsModule;
    private constructor();
    isAlwaysActive(): boolean;
    set(settingsOptions: ISettingsOptions): void;
}
export { ISettingsOptions, SettingsModule, LocalizableStringKeyOK, LocalizableStringKeyCancel };
