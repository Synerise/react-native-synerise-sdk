declare class BaseModule {
    isActive: boolean;
    constructor();
    configure(configuration: object): void;
    private assertSyneriseInitialized;
}
export { BaseModule };
