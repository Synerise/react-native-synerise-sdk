import { Event } from './../Event';
declare class AppearedInLocationEvent extends Event {
    constructor(label: string, lat: number, lon: number, parameters?: Object);
}
export { AppearedInLocationEvent };
