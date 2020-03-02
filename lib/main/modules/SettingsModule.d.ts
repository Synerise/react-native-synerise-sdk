import { BaseModule as Module } from './BaseModule';
interface ISettingsOptions {
    sdk?: {
        enabled?: boolean;
        minTokenRefreshInterval?: number;
    };
    tracker?: {
        minBatchSize?: number;
        maxBatchSize?: number;
        autoFlushTimeout?: number;
    };
    notifications?: {
        enabled?: boolean;
        disableInAppAlerts?: boolean;
        appGroupIdentifier?: string;
    };
    injector?: {
        automatic?: boolean;
    };
}
declare class SettingsModule extends Module {
    private static _instance;
    sdk: {
        enabled: any;
        minTokenRefreshInterval: any;
    };
    tracker: {
        minBatchSize: any;
        maxBatchSize: any;
        autoFlushTimeout: any;
    };
    notifications: {
        enabled: any;
        disableInAppAlerts: any;
        appGroupIdentifier: any;
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
