declare class BaseModule {
    isActive: boolean;
    constructor();
    configure(configuration: object): void;
    isAlwaysActive(): boolean;
}
export { BaseModule };
