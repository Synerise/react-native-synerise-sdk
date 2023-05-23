import { RecommendationEvent } from './RecommendationEvent';
declare class RecommendationSeenEvent extends RecommendationEvent {
    constructor(label: string, productId: string, productName: string, campaignId: string, campaignHash: string, parameters?: object);
    setCategory(category: string): void;
    setUrl(url: string): void;
}
export { RecommendationSeenEvent };
