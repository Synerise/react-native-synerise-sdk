interface IError {
    code: number;
    message: string;
}
declare class Error {
    code: number;
    message: string;
    constructor(code: number, message: string);
}
declare class ErrorMapper {
    static getErrorInstance(errorObject: IError): Error;
}
declare class ErrorProvider {
    static getUnknownError(): Error;
    static getModuleConnectorBadParametersError(): Error;
}
export { IError, Error, ErrorMapper, ErrorProvider };
