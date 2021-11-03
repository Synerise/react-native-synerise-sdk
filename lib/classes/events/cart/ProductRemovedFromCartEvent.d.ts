import { CartEvent } from '../cart/CartEvent';
import { UnitPrice } from '../cart/UnitPrice';
declare class ProductRemovedFromCartEvent extends CartEvent {
    constructor(label: string, sku: string, finalPrice: UnitPrice, quantity: number, parameters?: object);
}
export { ProductRemovedFromCartEvent };
