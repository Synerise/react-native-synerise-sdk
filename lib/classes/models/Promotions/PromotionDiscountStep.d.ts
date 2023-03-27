import { BaseModel } from '../BaseModel';
interface IPromotionDiscountStep {
    discountValue: number;
    usageThreshold: number;
}
declare class PromotionDiscountStep extends BaseModel {
    discountValue: number;
    usageThreshold: number;
    constructor(model: IPromotionDiscountStep);
}
export { IPromotionDiscountStep, PromotionDiscountStep };
