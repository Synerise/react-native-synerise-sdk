declare class BaseModule {
    isActive: boolean;
    constructor();
    configure(configuration: object): void;
    isAlwaysActive(): boolean;
    private assertSyneriseInitialized;
}
export { BaseModule };
