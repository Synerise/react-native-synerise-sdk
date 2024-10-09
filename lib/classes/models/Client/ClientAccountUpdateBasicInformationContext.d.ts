import { BaseModel } from './../BaseModel';
import { ClientSex } from './../Client/ClientSex';
import { IClientAgreements, ClientAgreements } from './../Client/ClientAgreements';
interface IClientAccountUpdateBasicInformationContext {
    firstName?: string;
    lastName?: string;
    displayName?: string;
    sex?: ClientSex;
    phone?: string;
    birthDate?: string;
    avatarUrl?: string;
    company?: string;
    address?: string;
    city?: string;
    province?: string;
    zipCode?: string;
    countryCode?: string;
    agreements?: IClientAgreements;
    attributes?: object;
}
declare class ClientAccountUpdateBasicInformationContext extends BaseModel {
    firstName?: string;
    lastName?: string;
    displayName?: string;
    sex?: ClientSex;
    phone?: string;
    birthDate?: string;
    avatarUrl?: string;
    company?: string;
    address?: string;
    city?: string;
    province?: string;
    zipCode?: string;
    countryCode?: string;
    agreements: ClientAgreements;
    attributes?: object;
    constructor(modelObject?: IClientAccountUpdateBasicInformationContext);
    toObject(): object;
}
export { IClientAccountUpdateBasicInformationContext, ClientAccountUpdateBasicInformationContext };
