declare abstract class Event {
    private type;
    private label;
    private action;
    protected parameters: Record<string, any>;
    constructor(type: string, label: string, action: string | null, parameters: object);
    toObject(): {
        type: string;
        label: string;
        action: string | null;
        parameters: Record<string, any>;
    };
}
export { Event };
