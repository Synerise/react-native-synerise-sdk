import { BaseModel } from '../BaseModel';
import { PromotionImageType } from './PromotionImageType';
interface IPromotionImage {
    url: string;
    type: string;
}
declare class PromotionImage extends BaseModel {
    url: string;
    type: PromotionImageType;
    constructor(model: IPromotionImage);
}
export { IPromotionImage, PromotionImage };
