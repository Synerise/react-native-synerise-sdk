import { BaseModule as Module } from './BaseModule';
import { DocumentApiQuery } from '../../classes/api_queries/DocumentApiQuery';
import { RecommendationOptions } from '../../classes/models/Content/RecommendationOptions';
import { RecommendationResponse } from '../../classes/models/Content/RecommendationResponse';
import { ScreenViewApiQuery } from '../../classes/api_queries/ScreenViewApiQuery';
import { ScreenView } from '../../classes/models/Content/ScreenView';
import { Document } from '../../classes/models/Content/Document';
import { Error } from '../..';
declare class ContentModule extends Module {
    private static _instance;
    static instance(): ContentModule;
    private constructor();
    /**
     * This method generates the document that is defined for the provided slug.
     *
     * @param slug Identifies a specific document
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     *
     */
    generateDocument(slug: string, onSuccess: (document: Document) => void, onError: (error: Error) => void): void;
    /**
     * This method generates the document that is defined for parameters provided in the query object.
     *
     * @param apiQuery `DocumentApiQuery` object responsible for storing all query parameters.
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     *
     */
    generateDocumentWithApiQuery(apiQuery: DocumentApiQuery, onSuccess: (document: Document) => void, onError: (error: Error) => void): void;
    /**
     * This method gets recommendations that are defined for the options provided.
     *
     * @param options `RecommendationOptions` object providing parameters for recommendations
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     */
    getRecommendationsV2(options: RecommendationOptions, onSuccess: (recommendationResponse: RecommendationResponse) => void, onError: (error: Error) => void): void;
    /**
     * This method generates customer's highest-priority screen view campaign that is defined for the provided slug.
     *
     * @param feedSlug Identifies a specific screen view.
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     *
     */
    generateScreenView(feedSlug: string, onSuccess: (screenView: ScreenView) => void, onError: (error: Error) => void): void;
    /**
     * This method generates customer's highest-priority screen view campaign that is defined for parameters provided in the query object.
     *
     * @param apiQuery `ScreenViewApiQuery` object responsible for storing all query parameters.
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     *
     */
    generateScreenViewWithApiQuery(apiQuery: ScreenViewApiQuery, onSuccess: (screenView: ScreenView) => void, onError: (error: Error) => void): void;
}
export { ContentModule };
