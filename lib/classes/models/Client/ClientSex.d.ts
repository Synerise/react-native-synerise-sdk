declare enum ClientSex {
    NotSpecified = "NOT_SPECIFIED",
    Male = "MALE",
    Female = "FEMALE",
    Other = "OTHER"
}
declare function ClientSexFromString(string: String): ClientSex;
declare function ClientSexToString(clientSex: ClientSex): String;
export { ClientSex, ClientSexFromString, ClientSexToString };
