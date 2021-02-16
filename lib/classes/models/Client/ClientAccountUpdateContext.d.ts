import { BaseModel } from './../BaseModel';
import { ClientSex } from './../Client/ClientSex';
import { IClientAgreements, ClientAgreements } from './../Client/ClientAgreements';
interface IClientAccountUpdateContext {
    email?: string;
    phone?: string;
    customId?: string;
    uuid?: string;
    firstName?: string;
    lastName?: string;
    displayName?: string;
    sex?: ClientSex;
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
declare class ClientAccountUpdateContext extends BaseModel {
    email?: string;
    phone?: string;
    customId?: string;
    uuid?: string;
    firstName?: string;
    lastName?: string;
    displayName?: string;
    sex?: ClientSex;
    birthDate?: string;
    avatarUrl?: string;
    company?: string;
    address?: string;
    city?: string;
    province?: string;
    zipCode?: string;
    countryCode?: string;
    agreements?: ClientAgreements;
    attributes?: object;
    constructor(modelObject?: IClientAccountUpdateContext);
    toObject(): object;
}
export { IClientAccountUpdateContext, ClientAccountUpdateContext };
