import { BaseModel } from './../BaseModel';
import { ClientSex } from './../Client/ClientSex';
import { IClientAgreements, ClientAgreements } from './../Client/ClientAgreements';
interface IClientAccountUpdateContext {
    email?: String;
    phone?: String;
    customId?: String;
    uuid?: String;
    firstName?: String;
    lastName?: String;
    displayName?: String;
    sex?: ClientSex;
    birthDate?: String;
    avatarUrl?: String;
    company?: String;
    address?: String;
    city?: String;
    province?: String;
    zipCode?: String;
    countryCode?: String;
    agreements?: IClientAgreements;
    attributes?: object;
}
declare class ClientAccountUpdateContext extends BaseModel {
    email?: String;
    phone?: String;
    customId?: String;
    uuid?: String;
    firstName?: String;
    lastName?: String;
    displayName?: String;
    sex?: ClientSex;
    birthDate?: String;
    avatarUrl?: String;
    company?: String;
    address?: String;
    city?: String;
    province?: String;
    zipCode?: String;
    countryCode?: String;
    agreements?: ClientAgreements;
    attributes?: object;
    constructor(modelObject?: IClientAccountUpdateContext);
    toObject(): object;
}
export { IClientAccountUpdateContext, ClientAccountUpdateContext };
