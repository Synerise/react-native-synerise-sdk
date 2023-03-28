import { CustomEvent } from '../CustomEvent';
declare class ProductAddedToFavouritesEvent extends CustomEvent {
    constructor(label: string, parameters?: object);
}
export { ProductAddedToFavouritesEvent };
