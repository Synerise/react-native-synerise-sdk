import { Event } from '../Event';
declare class RecommendationEvent extends Event {
    constructor(type: String, label: String, productId: String, name: String, campaignId: String, campaignHash: String, parameters?: Object);
    setCategory(category: String): void;
    setUrl(url: String): void;
}
export { RecommendationEvent };
