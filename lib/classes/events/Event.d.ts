declare abstract class Event {
    private type;
    private label;
    private action;
    protected parameters: Record<string, any>;
    constructor(type: String, label: String, action: string | null, parameters: object);
    toObject(): {
        type: String;
        label: String;
        action: string | null;
        parameters: Record<string, any>;
    };
}
export { Event };
