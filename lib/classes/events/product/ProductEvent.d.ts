import { Event } from '../Event';
declare class ProductEvent extends Event {
    constructor(type: string, label: string, productId: string, name: string, parameters?: Object);
    setCategory(category: string): void;
    setUrl(url: string): void;
}
export { ProductEvent };
