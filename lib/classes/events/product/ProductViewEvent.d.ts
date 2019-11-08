import { ProductEvent } from './ProductEvent';
declare class ProductViewEvent extends ProductEvent {
    constructor(label: String, productId: String, name: String, parameters?: Object);
}
export { ProductViewEvent };
