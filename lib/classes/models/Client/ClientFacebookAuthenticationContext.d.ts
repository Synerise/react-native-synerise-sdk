import { BaseModel } from './../BaseModel';
import { IClientAgreements, ClientAgreements } from './ClientAgreements';
interface IClientFacebookAuthenticationContext {
    authID?: string;
    agreements?: IClientAgreements;
    attributes?: object;
}
declare class ClientFacebookAuthenticationContext extends BaseModel {
    authID?: string;
    agreements: ClientAgreements;
    attributes?: object;
    constructor(modelObject?: IClientFacebookAuthenticationContext);
    toObject(): object;
}
export { IClientFacebookAuthenticationContext, ClientFacebookAuthenticationContext };
