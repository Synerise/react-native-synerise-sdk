import { RecommendationEvent } from './RecommendationEvent';
declare class RecommendationViewEvent extends RecommendationEvent {
    constructor(label: string, items: Array<string> | null, campaignId: string, campaignHash: string, correlationId: string, parameters?: object);
    setItems(items: Array<string>): void;
}
export { RecommendationViewEvent };
