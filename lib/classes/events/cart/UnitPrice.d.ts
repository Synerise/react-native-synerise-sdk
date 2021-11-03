declare class UnitPrice {
    private amount;
    private currency;
    constructor(amount: number, currency: string);
    toObject(): {
        amount: number;
        currency: String;
    };
}
export { UnitPrice };
