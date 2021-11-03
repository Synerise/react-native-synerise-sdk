import { Event } from '../Event';
declare class ProductAddedToFavouritesEvent extends Event {
    constructor(label: string, parameters?: object);
}
export { ProductAddedToFavouritesEvent };
