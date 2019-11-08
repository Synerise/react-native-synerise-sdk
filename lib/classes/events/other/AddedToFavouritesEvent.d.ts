import { Event } from './../Event';
declare class AddedToFavouritesEvent extends Event {
    constructor(label: String, parameters?: Object);
}
export { AddedToFavouritesEvent };
