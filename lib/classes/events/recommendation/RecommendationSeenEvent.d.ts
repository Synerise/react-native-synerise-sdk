import { RecommendationEvent } from './RecommendationEvent';
declare class RecommendationSeenEvent extends RecommendationEvent {
    constructor(label: string, productId: string, name: string, campaignId: string, campaignHash: string, parameters?: object);
}
export { RecommendationSeenEvent };
