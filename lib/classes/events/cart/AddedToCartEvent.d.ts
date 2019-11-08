import { CartEvent } from './CartEvent';
import { UnitPrice } from './UnitPrice';
declare class AddedToCartEvent extends CartEvent {
    constructor(label: String, sku: String, finalPrice: UnitPrice, quantity: Number, parameters?: Object);
}
export { AddedToCartEvent };
