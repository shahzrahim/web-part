import { IHealthCheckProps } from './IHealthCheckProps';
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { HttpClient, HttpClientConfiguration, IHttpClientOptions, HttpClientResponse, SPHttpClientResponse, SPHttpClient } from '@microsoft/sp-http';

import { CamlQuery } from "@pnp/sp";
import * as pnp from '@pnp/pnpjs';
import { string } from 'prop-types';

/**
 * @interface
 * Service interface definition
 */
export interface ISPListResultsService {

    /**
     * @function
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
    public getApplicationValue(weburl: string, listname: string): any {
        // _api/web/lists/getByTitle('AppConfigTestList')/items?$select=Application
        var queryUrl = "/_api/web/lists/getByTitle('AppConfigTestList')/items?$select=Application";
        var FinalDDLValues = [];

        //   this.context.httpClient.get(queryUrl, HttpClient.configurations.v1)
        //   .then((response: HttpClientResponse) => {
        //       return response.json();
        //   });
        // this.context.httpClient.get(weburl + queryUrl,
        // SPHttpClientConfigurations.v1)
        //   .then((response: Response): Promise<{ value: IListItem[] }> => {
        //     debugger;
        //     return response.json();
        //   });
        console.log(this.context); 
        return this.context.spHttpClient.get(weburl + queryUrl, SPHttpClient.configurations.v1).then((response: SPHttpClientResponse) => {
            return response.json();
        });

    }
}
