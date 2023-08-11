import { BaseModel } from './../BaseModel';
import { ClientSex } from './../Client/ClientSex';
import { IClientAgreements, ClientAgreements } from './../Client/ClientAgreements';
interface IClientSimpleAuthenticationData {
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
declare class ClientSimpleAuthenticationData extends BaseModel {
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
    agreements: ClientAgreements;
    attributes?: object;
    constructor(modelObject?: IClientSimpleAuthenticationData);
    toObject(): object;
}
export { IClientSimpleAuthenticationData, ClientSimpleAuthenticationData };
