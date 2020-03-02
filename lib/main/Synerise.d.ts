import { SettingsModule as Settings, ISettingsOptions } from './modules/SettingsModule';
import { ClientModule as Client } from './modules/ClientModule';
import { TrackerModule as Tracker } from './modules/TrackerModule';
import { NotificationsModule as Notifications } from './modules/NotificationsModule';
import { InjectorModule as Injector } from './modules/InjectorModule';
import { PromotionsModule as Promotions } from './modules/PromotionsModule';
import { Error } from './../classes/types/Error';
declare class SyneriseInitializer {
    private settings?;
    constructor();
    withClientApiKey(clientApiKey: string): this;
    withBaseUrl(baseUrl: string): this;
    withDebugModeEnabled(debugModeEnabled: boolean): this;
    withCrashHandlingEnabled(crashHandlingEnabled: boolean): this;
    withSettings(settings: ISettingsOptions): this;
    init(): void;
    private setupModules;
    private enableModules;
}
declare class Synerise {
    constructor();
    static Initializer: () => SyneriseInitializer;
    static onReady(callback: () => void): void;
    static onError(callback: (error: Error) => void): void;
    static isInitialized(): boolean;
    static changeClientApiKey(clientApiKey: string): void;
    static get Settings(): Settings;
    static get Client(): Client;
    static get Tracker(): Tracker;
    static get Notifications(): Notifications;
    static get Injector(): Injector;
    static get Promotions(): Promotions;
}
export { Synerise };
