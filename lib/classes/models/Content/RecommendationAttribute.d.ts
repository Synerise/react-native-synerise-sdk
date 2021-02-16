import { BaseModel } from '../BaseModel';
interface IRecommendationAttribute {
    name: string;
    type: string;
    value: string;
}
declare class RecommendationAttribute extends BaseModel {
    name: string;
    type: string;
    value: string;
    constructor(modelObject: IRecommendationAttribute);
}
export { IRecommendationAttribute, RecommendationAttribute };
