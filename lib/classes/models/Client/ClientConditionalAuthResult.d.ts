import { BaseModel } from './../BaseModel';
import { ClientConditionalAuthStatus } from './ClientConditionalAuthStatus';
interface IClientConditionalAuthResult {
    status: ClientConditionalAuthStatus;
    conditions: Array<object>;
}
declare class ClientConditionalAuthResult extends BaseModel {
    status: ClientConditionalAuthStatus;
    conditions: Array<object>;
    constructor(model: IClientConditionalAuthResult);
}
export { IClientConditionalAuthResult, ClientConditionalAuthResult };
