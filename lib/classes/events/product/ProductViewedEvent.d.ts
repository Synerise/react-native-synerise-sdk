import { Event } from '../Event';
declare class ProductViewedEvent extends Event {
    constructor(label: string, productId: string, name: string, parameters?: object);
    setCategory(category: string): void;
    setUrl(url: string): void;
}
export { ProductViewedEvent };
