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
    static instance(): SettingsModule;
    private constructor();
    set(settings: ISettingsOptions): void;
}
export { ISettingsOptions, SettingsModule };
