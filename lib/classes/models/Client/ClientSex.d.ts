declare enum ClientSex {
    NotSpecified = "NOT_SPECIFIED",
    Male = "MALE",
    Female = "FEMALE",
    Other = "OTHER"
}
declare function ClientSexFromString(string: string): ClientSex;
declare function ClientSexToString(clientSex: ClientSex): string;
export { ClientSex, ClientSexFromString, ClientSexToString };
