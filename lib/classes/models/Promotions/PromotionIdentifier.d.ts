import { PromotionIdentifierKey } from './PromotionIdentifierKey';
declare class PromotionIdentifier {
    key: string;
    value: string;
    constructor(key: PromotionIdentifierKey, value: string);
    toObject(): {
        key: string;
        value: string;
    };
}
export { PromotionIdentifier };
