declare abstract class Event {
    private label;
    private action;
    protected parameters: Record<string, any>;
    constructor(label: string, action: string | null, parameters: object);
    toObject(): {
        label: string;
        action: string | null;
        parameters: Record<string, any>;
    };
}
export { Event };
