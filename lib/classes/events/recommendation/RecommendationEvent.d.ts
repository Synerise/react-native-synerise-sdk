import { Event } from '../Event';
declare class RecommendationEvent extends Event {
    constructor(type: string, label: string, productId: string, name: string, campaignId: string, campaignHash: string, parameters?: object);
    setCategory(category: string): void;
    setUrl(url: string): void;
}
export { RecommendationEvent };
