import { BaseModule as Module } from './BaseModule';
interface ISettingsOptions {
    sdk?: {
        enabled?: boolean;
        appGroupIdentifier?: string;
        keychainGroupIdentifier?: string;
        minTokenRefreshInterval?: number;
        shouldDestroySessionOnApiKeyChange?: boolean;
    };
    tracker?: {
        isBackendTimeSyncRequired?: boolean;
        minBatchSize?: number;
        maxBatchSize?: number;
        autoFlushTimeout?: number;
    };
    notifications?: {
        enabled?: boolean;
        encryption?: boolean;
        disableInAppAlerts?: boolean;
    };
    inAppMessaging?: {
        maxDefinitionUpdateIntervalLimit?: number;
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
        appGroupIdentifier: any;
        keychainGroupIdentifier: any;
        minTokenRefreshInterval: any;
        shouldDestroySessionOnApiKeyChange: any;
    };
    tracker: {
        isBackendTimeSyncRequired: any;
        minBatchSize: any;
        maxBatchSize: any;
        autoFlushTimeout: any;
    };
    notifications: {
        enabled: any;
        encryption: any;
        disableInAppAlerts: any;
    };
    inAppMessaging: {
        maxDefinitionUpdateIntervalLimit: any;
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
export { ISettingsOptions, SettingsModule };
