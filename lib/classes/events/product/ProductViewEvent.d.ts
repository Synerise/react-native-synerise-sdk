import { ProductEvent } from './ProductEvent';
declare class ProductViewEvent extends ProductEvent {
    constructor(label: string, productId: string, name: string, parameters?: Object);
}
export { ProductViewEvent };
