import { BaseModel } from '../BaseModel';
interface IScreenViewAudience {
    IDs?: Array<String>;
    query?: string;
}
declare class ScreenViewAudience extends BaseModel {
    IDs?: Array<String>;
    query?: string;
    constructor(modelObject: IScreenViewAudience);
}
export { IScreenViewAudience, ScreenViewAudience };
