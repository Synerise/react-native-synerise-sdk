import { BaseModel } from "../BaseModel";
import { IRecommendationAttribute } from "./RecommendationAttribute";
interface IRecommendation {
    productRetailerPartNo: String;
    title: String;
    brand: String;
    category: String;
    description: String;
    gender: String;
    color: String;
    effectivePrice: String;
    priceCurrency: String;
    priceValue: String;
    salePriceValue: String;
    imageLink: String;
    link: String;
    sizes?: Array<String>;
    additionalImageLinks?: Array<String>;
    customAttributes?: Array<IRecommendationAttribute>;
}
declare class Recommendation extends BaseModel {
    productRetailerPartNo: String;
    title: String;
    brand: String;
    category: String;
    description: String;
    gender: String;
    color: String;
    effectivePrice: String;
    priceCurrency: String;
    priceValue: String;
    salePriceValue: String;
    imageLink: String;
    link: String;
    sizes?: Array<String>;
    additionalImageLinks?: Array<String>;
    customAttributes?: Array<IRecommendationAttribute>;
    constructor(modelObject: IRecommendation);
}
export { IRecommendation, Recommendation };
