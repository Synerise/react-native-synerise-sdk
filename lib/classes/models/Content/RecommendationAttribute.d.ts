import { BaseModel } from "../BaseModel";
interface IRecommendationAttribute {
    name: String;
    type: String;
    value: String;
}
declare class RecommendationAttribute extends BaseModel {
    name: String;
    type: String;
    value: String;
    constructor(modelObject: IRecommendationAttribute);
}
export { IRecommendationAttribute, RecommendationAttribute };
