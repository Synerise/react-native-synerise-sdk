import { CustomEvent } from '../CustomEvent';
declare class ProductViewedEvent extends CustomEvent {
    constructor(label: string, productId: string, name: string, parameters?: object);
    setCategory(category: string): void;
    setUrl(url: string): void;
}
export { ProductViewedEvent };
