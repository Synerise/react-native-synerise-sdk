import { Event } from './../Event';
import { UnitPrice } from './UnitPrice';
declare class CartEvent extends Event {
    constructor(type: String, label: String, sku: String, finalPrice: UnitPrice, quantity: Number, parameters?: Object);
    setName(name: String): void;
    setCategory(category: String): void;
    setCategories(categories: String[]): void;
    setOffline(offline: boolean): void;
    setRegularPrice(regularPrice: UnitPrice): void;
    setDiscountedPrice(discountedPrice: UnitPrice): void;
    setUrl(url: String): void;
    setProducer(producer: String): void;
}
export { CartEvent };
