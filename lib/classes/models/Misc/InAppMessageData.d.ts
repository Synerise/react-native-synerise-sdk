import { BaseModel } from './../BaseModel';
interface IInAppMessageData {
    campaignHash: string;
    variantIdentifier: string;
    additionalParameters?: object;
    isTest: boolean;
}
declare class InAppMessageData extends BaseModel {
    campaignHash: string;
    variantIdentifier: string;
    additionalParameters?: object;
    isTest: boolean;
    constructor(modelObject: IInAppMessageData);
}
export { IInAppMessageData, InAppMessageData };
