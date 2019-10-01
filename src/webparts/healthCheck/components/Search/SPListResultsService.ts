/*
 * @Author: Shazi.Rahim
 * @Date:   2016-07-29 15:57:29
 * @Company by: Cognizant
 * @Purpose: Service File in which we make HTTP Request call to Azure Web Endpoint for Dropdown Values.
 */
import { IHealthCheckProps } from './IHealthCheckProps';
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { HttpClient, HttpClientConfiguration, IHttpClientOptions, HttpClientResponse, SPHttpClientResponse, SPHttpClient } from '@microsoft/sp-http';


/**
 * @interface
 * Service interface definition
 */
export interface ISPListResultsService {

    /**
     * @function>
     * Gets the feed from a Instagram
     */

    getApplicationValue(webUrl: string, listName: string);

}

/**
 * @class
 * Service implementation to get feed from a Instagram
 */
export class SPListResultsService implements ISPListResultsService {
    private context: IWebPartContext;

    // /**
    //  * @function
    //  * Service constructor
    //  */
    constructor(pageContext: IWebPartContext) {
        this.context = pageContext;
    }

    //we call getApplicationValue in Dropdown component in order to populate Dropdown List selection values.
    public getApplicationValue(weburl: string, listname: string): any {
        var queryUrl = "/_api/web/lists/getByTitle('AppConfigTestList')/items?$select=Application";

        return this.context.spHttpClient.get(weburl + queryUrl, SPHttpClient.configurations.v1).then((response: SPHttpClientResponse) => {
            return response.json();
        });

    }
}
