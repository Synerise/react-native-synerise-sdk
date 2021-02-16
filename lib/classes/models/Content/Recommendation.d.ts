import { BaseModel } from '../BaseModel';
import { IRecommendationAttribute } from './RecommendationAttribute';
interface IRecommendation {
    productRetailerPartNo: string;
    title: string;
    brand: string;
    category: string;
    description: string;
    gender: string;
    color: string;
    effectivePrice: string;
    priceCurrency: string;
    priceValue: string;
    salePriceValue: string;
    imageLink: string;
    link: string;
    sizes?: Array<string>;
    additionalImageLinks?: Array<string>;
    customAttributes?: Array<IRecommendationAttribute>;
}
declare class Recommendation extends BaseModel {
    productRetailerPartNo: string;
    title: string;
    brand: string;
    category: string;
    description: string;
    gender: string;
    color: string;
    effectivePrice: string;
    priceCurrency: string;
    priceValue: string;
    salePriceValue: string;
    imageLink: string;
    link: string;
    sizes?: Array<string>;
    additionalImageLinks?: Array<string>;
    customAttributes?: Array<IRecommendationAttribute>;
    constructor(modelObject: IRecommendation);
}
export { IRecommendation, Recommendation };
