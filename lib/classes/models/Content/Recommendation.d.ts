import { BaseModel } from '../BaseModel';
interface IRecommendation {
    itemID: string;
    attributes: Record<string, any>;
}
declare class Recommendation extends BaseModel {
    itemID: string;
    attributes: Record<string, any>;
    constructor(modelObject: IRecommendation);
}
export { IRecommendation, Recommendation };
