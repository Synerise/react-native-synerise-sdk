import { BaseModel } from '../BaseModel';
import { IPromotionDiscountTypeDetails, PromotionDiscountTypeDetails } from './PromotionDiscountTypeDetails';
interface IPromotionDetails {
    discountType?: IPromotionDiscountTypeDetails;
}
declare class PromotionDetails extends BaseModel {
    discountType?: PromotionDiscountTypeDetails;
    constructor(model: IPromotionDetails);
}
export { IPromotionDetails, PromotionDetails };
