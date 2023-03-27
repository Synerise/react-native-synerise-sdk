import { BaseModel } from './../BaseModel';
import { IClientAgreements, ClientAgreements } from './ClientAgreements';
interface IClientAppleSignInAuthenticationContext {
    authID?: string;
    agreements?: IClientAgreements;
    attributes?: object;
}
declare class ClientAppleSignInAuthenticationContext extends BaseModel {
    authID?: string;
    agreements: ClientAgreements;
    attributes?: object;
    constructor(modelObject?: IClientAppleSignInAuthenticationContext);
    toObject(): object;
}
export { IClientAppleSignInAuthenticationContext, ClientAppleSignInAuthenticationContext };
