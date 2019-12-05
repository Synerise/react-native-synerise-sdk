import { Error } from './../../classes/types/Error';
import { ModelMapper } from './../../classes/models/BaseModel';
declare type SyneriseModuleMethodSuccessCallback = (response: any) => void;
declare type SyneriseModuleMethodFailureCallback = (error: Error) => void;
declare class SyneriseModuleConnector {
    static invokeMethod(method: object, args: Array<any>): void;
    static invokeMethodWithReturnValue(method: object, args: Array<any>, modelMapper?: ModelMapper): any;
    static invokeMethodWithCallback(method: object, args: Array<any>, onSuccessCallback: SyneriseModuleMethodSuccessCallback, onFailureCallback: SyneriseModuleMethodFailureCallback, modelMapper?: ModelMapper): void;
    static mapResponseObjectToModelClass(modelMapper: ModelMapper, responseObject: object): any;
}
export { SyneriseModuleConnector };
