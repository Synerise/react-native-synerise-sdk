import { BaseModule as Module } from './BaseModule';
import { DocumentsApiQuery } from '../../classes/api_queries/DocumentsApiQuery';
import { RecommendationOptions } from '../../classes/models/Content/RecommendationOptions';
import { RecommendationResponse } from '../../classes/models/Content/RecommendationResponse';
import { Error } from '../..';
import { ScreenViewResponse } from '../../config/import_models';
declare class ContentModule extends Module {
    private static _instance;
    static instance(): ContentModule;
    private constructor();
    /**
     * This method gets the document that is defined for the provided slug.
     *
     * @param slug Identifies a specific document
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     *
     */
    getDocument(slug: string, onSuccess: (document: object) => void, onError: (error: Error) => void): void;
    /**
     * This method gets documents that are defined for parameters provided in the query object.
     *
     * @param apiQuery `DocumentsApiQuery` object responsible for storing all query parameters
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     *
     */
    getDocuments(apiQuery: DocumentsApiQuery, onSuccess: (documents: Array<object>) => void, onError: (error: Error) => void): void;
    /**
     * This method gets recommendations that are defined for the options provided.
     *
     * @param options `RecommendationOptions` object providing parameters for recommendations
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     *
     */
    getRecommendations(options: RecommendationOptions, onSuccess: (recommendationResponse: RecommendationResponse) => void, onError: (error: Error) => void): void;
    /**
     * This method gets customer's highest-priority screen view campaign.
     *
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     *
     */
    getScreenView(onSuccess: (screenViewResponse: ScreenViewResponse) => void, onError: (error: Error) => void): void;
}
export { ContentModule };
