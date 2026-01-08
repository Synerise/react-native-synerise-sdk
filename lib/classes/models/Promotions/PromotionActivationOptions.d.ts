import { PromotionIdentifier } from "./PromotionIdentifier";
declare class PromotionActivationOptions {
    identifier: PromotionIdentifier;
    pointsToUse?: number | null;
    constructor(identifier: PromotionIdentifier);
    toObject(): {
        identifier: {
            key: string;
            value: string;
        };
        pointsToUse: number | null | undefined;
    };
}
export { PromotionActivationOptions };
