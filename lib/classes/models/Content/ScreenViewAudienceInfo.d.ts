import { BaseModel } from '../BaseModel';
interface IScreenViewAudienceInfo {
    segments?: Array<string>;
    query?: string;
    targetType?: string;
}
declare class ScreenViewAudienceInfo extends BaseModel {
    segments?: Array<string>;
    query?: string;
    targetType?: string;
    constructor(modelObject: IScreenViewAudienceInfo);
}
export { IScreenViewAudienceInfo, ScreenViewAudienceInfo };
