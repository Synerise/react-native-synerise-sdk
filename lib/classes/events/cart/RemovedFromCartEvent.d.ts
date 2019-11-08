import { CartEvent } from './CartEvent';
import { UnitPrice } from './UnitPrice';
declare class RemovedFromCartEvent extends CartEvent {
    constructor(label: String, sku: String, finalPrice: UnitPrice, quantity: Number, parameters?: Object);
}
export { RemovedFromCartEvent };
