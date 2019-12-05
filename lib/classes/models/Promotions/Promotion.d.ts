import { BaseModel } from '../BaseModel';
declare const PromotionSortingKey: {
    ExpireAt: string;
    CreatedAt: string;
    LastingAt: string;
    RequireRedeemPoints: string;
    UpdatedAt: string;
    Type: string;
};
interface IPromotion {
    uuid: string;
    code: string;
    status: string;
    type: string;
    redeemLimitPerClient?: number;
    redeemQuantityPerActivation?: number;
    currentRedeemedQuantity: number;
    currentRedeemLimit?: number;
    activationCounter: number;
    discountType: string;
    discountValue: number;
    requireRedeemedPoints?: number;
    price: number;
    name?: string;
    headline?: string;
    descriptionText?: string;
    images?: Array<object>;
    startAt: number;
    expireAt: number;
    lastingAt: number;
    params?: object;
    catalogIndexItems?: Array<string>;
}
declare class Promotion extends BaseModel {
    uuid: string;
    code: string;
    status: string;
    type: string;
    redeemLimitPerClient?: number;
    redeemQuantityPerActivation?: number;
    currentRedeemedQuantity: number;
    currentRedeemLimit?: number;
    activationCounter: number;
    discountType: string;
    discountValue: number;
    requireRedeemedPoints?: number;
    price: number;
    name?: string;
    headline?: string;
    descriptionText?: string;
    images?: Array<object>;
    startAt: Date;
    expireAt: Date;
    lastingAt: Date;
    params?: object;
    catalogIndexItems?: Array<string>;
    constructor(modelObject: IPromotion);
}
export { IPromotion, Promotion, PromotionSortingKey };
