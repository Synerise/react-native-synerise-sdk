import { SettingsModule as Settings, ISettingsOptions } from './modules/SettingsModule';
import { ClientModule as Client } from './modules/ClientModule';
import { TrackerModule as Tracker } from './modules/TrackerModule';
import { NotificationsModule as Notifications } from './modules/NotificationsModule';
import { InjectorModule as Injector } from './modules/InjectorModule';
import { PromotionsModule as Promotions } from './modules/PromotionsModule';
import { ContentModule as Content } from './modules/ContentModule';
import { InitializationConfig } from './../classes/models/Misc/InitializationConfig';
import { IError, Error } from './../classes/types/Error';
declare class SyneriseInitializer {
    private settings?;
    constructor();
    static isSyneriseInitialized(): boolean;
    static invokeOnReadyCallback(): void;
    static invokeOnErrorCallback(errorObject: IError): void;
    withClientApiKey(clientApiKey: string): this;
    withBaseUrl(baseUrl: string): this;
    withRequestValidationSalt(requestValidationSalt: string): this;
    withDebugModeEnabled(debugModeEnabled: boolean): this;
    withCrashHandlingEnabled(crashHandlingEnabled: boolean): this;
    withSettings(settings: ISettingsOptions): this;
    init(): void;
    private setupModules;
    private setup;
}
declare class Synerise {
    constructor();
    static Initializer: () => SyneriseInitializer;
    static isInitialized(): Boolean;
    static onReady(callback: () => void): void;
    static onError(callback: (error: Error) => void): void;
    static changeClientApiKey(clientApiKey: string, config?: InitializationConfig | undefined): void;
    static get Settings(): Settings;
    static get Client(): Client;
    static get Tracker(): Tracker;
    static get Notifications(): Notifications;
    static get Injector(): Injector;
    static get Promotions(): Promotions;
    static get Content(): Content;
}
export { Synerise, SyneriseInitializer };
