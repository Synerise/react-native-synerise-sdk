declare class Error {
    code: number;
    message: string;
    constructor(code: number, message: string);
}
interface ErrorObject {
    code: number;
    message: string;
}
declare class ErrorMapper {
    static getErrorInstance(errorObject: ErrorObject): Error;
}
declare class ErrorProvider {
    static getUnknownError(): Error;
}
export { Error, ErrorMapper, ErrorProvider };
