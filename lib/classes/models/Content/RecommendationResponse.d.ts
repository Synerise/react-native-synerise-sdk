import { BaseModel } from '../BaseModel';
import { IRecommendation } from './Recommendation';
interface IRecommendationResponse {
    campaignHash: string;
    campaignId: string;
    schema: string;
    slug: string;
    uuid: string;
    items: Array<IRecommendation>;
}
declare class RecommendationResponse extends BaseModel {
    campaignHash: string;
    campaignId: string;
    schema: string;
    slug: string;
    uuid: string;
    items: Array<IRecommendation>;
    constructor(modelObject: IRecommendationResponse);
}
export { IRecommendationResponse, RecommendationResponse };
