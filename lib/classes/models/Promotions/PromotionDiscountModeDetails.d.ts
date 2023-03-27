import { BaseModel } from '../BaseModel';
import { IPromotionDiscountStep, PromotionDiscountStep } from './PromotionDiscountStep';
import { PromotionDiscountUsageTrigger } from './PromotionDiscountUsageTrigger';
interface IPromotionDiscountModeDetails {
    discountSteps: Array<IPromotionDiscountStep>;
    discountUsageTrigger: string;
}
declare class PromotionDiscountModeDetails extends BaseModel {
    discountSteps: Array<PromotionDiscountStep>;
    discountUsageTrigger: PromotionDiscountUsageTrigger;
    constructor(model: IPromotionDiscountModeDetails);
}
export { IPromotionDiscountModeDetails, PromotionDiscountModeDetails };
