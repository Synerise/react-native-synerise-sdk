import { Event } from './../Event';
declare class AddedToFavouritesEvent extends Event {
    constructor(label: string, parameters?: Object);
}
export { AddedToFavouritesEvent };
