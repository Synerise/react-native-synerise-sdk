import { CartEvent } from './CartEvent';
import { UnitPrice } from './UnitPrice';
declare class AddedToCartEvent extends CartEvent {
    constructor(label: string, sku: string, finalPrice: UnitPrice, quantity: number, parameters?: Object);
}
export { AddedToCartEvent };
