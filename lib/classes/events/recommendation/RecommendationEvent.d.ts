import { CustomEvent } from '../CustomEvent';
declare class RecommendationEvent extends CustomEvent {
    constructor(label: string, action: string, productId: string, name: string, campaignId: string, campaignHash: string, parameters?: object);
    setCategory(category: string): void;
    setUrl(url: string): void;
}
export { RecommendationEvent };
