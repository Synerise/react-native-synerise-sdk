import { BaseModel } from './../BaseModel';
import { IClientAgreements, ClientAgreements } from './ClientAgreements';
interface IClientOAuthAuthenticationContext {
    authID?: string;
    agreements?: IClientAgreements;
    attributes?: object;
}
declare class ClientOAuthAuthenticationContext extends BaseModel {
    authID?: string;
    agreements: ClientAgreements;
    attributes?: object;
    constructor(modelObject?: IClientOAuthAuthenticationContext);
    toObject(): object;
}
export { IClientOAuthAuthenticationContext, ClientOAuthAuthenticationContext };
