import { BaseModel } from "../BaseModel";
import { IRecommendation } from "./Recommendation";
interface IRecommendationResponse {
    campaignHash: String;
    campaignId: String;
    schema: String;
    slug: String;
    uuid: String;
    items: Array<IRecommendation>;
}
declare class RecommendationResponse extends BaseModel {
    campaignHash: String;
    campaignId: String;
    schema: String;
    slug: String;
    uuid: String;
    items: Array<IRecommendation>;
    constructor(modelObject: IRecommendationResponse);
}
export { IRecommendationResponse, RecommendationResponse };
