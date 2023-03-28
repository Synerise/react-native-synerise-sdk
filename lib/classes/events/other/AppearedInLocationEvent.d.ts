import { CustomEvent } from './../CustomEvent';
declare class AppearedInLocationEvent extends CustomEvent {
    constructor(label: string, lat: number, lon: number, parameters?: object);
}
export { AppearedInLocationEvent };
