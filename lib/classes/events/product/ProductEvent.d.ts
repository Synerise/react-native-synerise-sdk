import { Event } from '../Event';
declare class ProductEvent extends Event {
    constructor(type: String, label: String, productId: String, name: String, parameters?: Object);
    setCategory(category: String): void;
    setUrl(url: String): void;
}
export { ProductEvent };
