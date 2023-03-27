import { BaseModel } from '../BaseModel';
interface IPromotionDiscountTypeDetails {
    name: string;
    outerScope: boolean;
    requiredItemsCount: number;
    discountedItemsCount: number;
}
declare class PromotionDiscountTypeDetails extends BaseModel {
    name: string;
    outerScope: boolean;
    requiredItemsCount: number;
    discountedItemsCount: number;
    constructor(model: IPromotionDiscountTypeDetails);
}
export { IPromotionDiscountTypeDetails, PromotionDiscountTypeDetails };
