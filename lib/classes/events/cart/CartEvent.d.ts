import { CustomEvent } from './../CustomEvent';
import { UnitPrice } from './UnitPrice';
declare class CartEvent extends CustomEvent {
    constructor(label: string, action: string, sku: string, finalPrice: UnitPrice, quantity: number, parameters?: object);
    setName(name: string): void;
    setCategory(category: string): void;
    setCategories(categories: string[]): void;
    setOffline(offline: boolean): void;
    setRegularPrice(regularPrice: UnitPrice): void;
    setDiscountedPrice(discountedPrice: UnitPrice): void;
    setUrl(url: string): void;
    setProducer(producer: string): void;
}
export { CartEvent };
