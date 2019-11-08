import { RecommendationEvent } from './RecommendationEvent';
declare class RecommendationClickEvent extends RecommendationEvent {
    constructor(label: String, productId: String, name: String, campaignId: String, campaignHash: String, parameters?: Object);
}
export { RecommendationClickEvent };
