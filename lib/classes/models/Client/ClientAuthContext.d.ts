import { BaseModel } from '../BaseModel';
import { IClientAgreements, ClientAgreements } from './ClientAgreements';
interface IClientAuthContext {
    authID?: string;
    agreements?: IClientAgreements;
    attributes?: object;
}
declare class ClientAuthContext extends BaseModel {
    authID?: string;
    agreements?: ClientAgreements;
    attributes?: object;
    constructor(modelObject?: IClientAuthContext);
    toObject(): object;
}
export { IClientAuthContext, ClientAuthContext };
