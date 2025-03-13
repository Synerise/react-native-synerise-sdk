import { BaseModel } from '../BaseModel';
interface IScreenViewAudience {
    IDs?: Array<string>;
    query?: string;
}
declare class ScreenViewAudience extends BaseModel {
    IDs?: Array<string>;
    query?: string;
    constructor(modelObject: IScreenViewAudience);
}
export { IScreenViewAudience, ScreenViewAudience };
