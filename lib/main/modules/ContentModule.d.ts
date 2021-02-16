import { BaseModule as Module } from './BaseModule';
import { DocumentsApiQuery } from '../../classes/api_queries/DocumentsApiQuery';
import { RecommendationOptions } from '../../classes/models/Content/RecommendationOptions';
import { RecommendationResponse } from '../../classes/models/Content/RecommendationResponse';
import { Error } from '../..';
declare class ContentModule extends Module {
    private static _instance;
    static instance(): ContentModule;
    private constructor();
    getDocument(slug: string, onSuccess: (document: Object) => void, onError: (error: Error) => void): void;
    getDocuments(apiQuery: DocumentsApiQuery, onSuccess: (documents: Array<Object>) => void, onError: (error: Error) => void): void;
    getRecommendations(options: RecommendationOptions, onSuccess: (recommendationResponse: RecommendationResponse) => void, onError: (error: Error) => void): void;
}
export { ContentModule };
