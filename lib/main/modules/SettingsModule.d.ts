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
        minBatchSize?: number;
        maxBatchSize?: number;
        autoFlushTimeout?: number;
    };
    notifications?: {
        enabled?: boolean;
        encryption?: boolean;
        disableInAppAlerts?: boolean;
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
        minBatchSize: any;
        maxBatchSize: any;
        autoFlushTimeout: any;
    };
    notifications: {
        enabled: any;
        encryption: any;
        disableInAppAlerts: any;
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
