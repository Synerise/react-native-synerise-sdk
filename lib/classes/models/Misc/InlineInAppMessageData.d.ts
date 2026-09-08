import { BaseModel } from './../BaseModel';
interface IInlineInAppMessageData {
    campaignHash: string;
    variantIdentifier: string;
    placementKey: string;
    additionalParameters?: object;
    isTest: boolean;
}
declare class InlineInAppMessageData extends BaseModel {
    campaignHash: string;
    variantIdentifier: string;
    placementKey: string;
    additionalParameters?: object;
    isTest: boolean;
    constructor(modelObject: IInlineInAppMessageData);
}
export { IInlineInAppMessageData, InlineInAppMessageData };
