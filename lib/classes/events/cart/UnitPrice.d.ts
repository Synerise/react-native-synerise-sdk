declare class UnitPrice {
    private amount;
    private currency;
    constructor(amount: Number, currency: String);
    toObject(): {
        amount: Number;
        currency: String;
    };
}
export { UnitPrice };
