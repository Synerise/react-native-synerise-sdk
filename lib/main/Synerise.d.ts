import { SettingsModule as Settings, ISettingsOptions } from './modules/SettingsModule';
import { ClientModule as Client } from './modules/ClientModule';
import { TrackerModule as Tracker } from './modules/TrackerModule';
declare class SyneriseInitializer {
    onSuccess?: () => void;
    private settings?;
    constructor();
    withClientApiKey(clientApiKey: string): this;
    withBaseUrl(baseUrl: string): this;
    withDebugModeEnabled(debugModeEnabled: boolean): this;
    withCrashHandlingEnabled(crashHandlingEnabled: boolean): this;
    withSettings(settings: ISettingsOptions): this;
    init(): void;
    private setupModules;
    private setSettings;
}
declare class Synerise {
    constructor();
    static Initializer: () => SyneriseInitializer;
    static isInitialized(): boolean;
    static get Settings(): Settings;
    static get Client(): Client;
    static get Tracker(): Tracker;
}
export { Synerise };
