import { Event } from './../Event';
declare class AppearedInLocationEvent extends Event {
    constructor(label: String, lat: Number, lon: Number, parameters?: Object);
}
export { AppearedInLocationEvent };
