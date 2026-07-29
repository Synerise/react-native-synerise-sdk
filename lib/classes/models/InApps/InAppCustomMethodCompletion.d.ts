declare type InAppCustomMethodSuccessHandler = (result: any | null) => void;
declare type InAppCustomMethodFailureHandler = (errorMessage: string) => void;
declare class InAppCustomMethodCompletion {
    private onSuccess;
    private onFailure;
    private isDone;
    constructor(onSuccess: InAppCustomMethodSuccessHandler, onFailure: InAppCustomMethodFailureHandler);
    success: (result?: any | null) => void;
    failure: (errorMessage: string) => void;
    private claim;
}
export { InAppCustomMethodCompletion };
