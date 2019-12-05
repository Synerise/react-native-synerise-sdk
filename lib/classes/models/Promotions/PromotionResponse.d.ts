import { BaseModel } from '../BaseModel';
import { IPromotion, Promotion } from './../Promotions/Promotion';
interface IPromotionResponse {
    totalCount: number;
    totalPages: number;
    page: number;
    limit: number;
    code: number;
    items: Array<IPromotion>;
}
declare class PromotionResponse extends BaseModel {
    totalCount: number;
    totalPages: number;
    page: number;
    limit: number;
    code: number;
    items: Array<Promotion>;
    constructor(modelObject: IPromotionResponse);
}
export { IPromotionResponse, PromotionResponse };
