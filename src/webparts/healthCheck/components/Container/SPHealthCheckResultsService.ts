
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { HttpClient, HttpClientConfiguration, IHttpClientOptions, HttpClientResponse, SPHttpClientResponse, SPHttpClient } from '@microsoft/sp-http';
import { IHealthCheckContainerProps } from './IHealthCheckContainerProps';


/**
 * @interface
 * Service interface definition
 */
export interface ISPListResultsService {

    /**
     * @function
     * Gets the feed from a Instagram
     */
    getHealthCheckList(userSelectedData?: any, sessionKey?: string , status?: any): any;

}

/**
 * @class
 * Service implementation to get feed from a Instagram
 */
export class SPHealthCheckResultsService implements ISPListResultsService {
    private context: IWebPartContext;

    // /**
    //  * @function
    //  * Service constructor
    //  */
    constructor(pageContext: IWebPartContext) {
        this.context = pageContext;
    }
    
    //send sessionKey and status
    public getHealthCheckList(userSelectedData?: any, sessionKey?: string , status?: any ): any {
        {
            var queryUrl="https://graingerhealthcheck.azurewebsites.net/api/Grainger/response";
            const requestHeaders: Headers = new Headers();       
            requestHeaders.append("Access-Control-Max-Age", "86400");
            requestHeaders.append("Access-Control-Allow-Credentials" , "true");
            requestHeaders.append("Access-Control-Allow-Methods","GET");
            requestHeaders.append("Access-Control-Allow-Origin","https://atlcts.sharepoint.com");
            requestHeaders.append("status", "Finish");      
            // requestHeaders.append("AppName", userSelectedData.AppName); 
            requestHeaders.append("AppName", "test"); 
            // requestHeaders.append("ServerName", userSelectedData.ServerName); 
            requestHeaders.append("ServerName", "test"); 
            // requestHeaders.append("Verbose", userSelectedData.Verbose); 
            requestHeaders.append("Verbose", "On"); 
            requestHeaders.append("Content-Type", "application/json");      
            requestHeaders.append("User-Input", userSelectedData);      
            requestHeaders.append("Session-Key", sessionKey);      
            // requestHeaders.append("Status", status);              
       
        const httpClientOptions: IHttpClientOptions = {           
            headers: requestHeaders,
        };

        
        return this.context.spHttpClient.get(queryUrl, SPHttpClient.configurations.v1,httpClientOptions).then((response: SPHttpClientResponse) => {
            return response.json();
        });
        // fetch(queryUrl, {
        //     method: "GET",
        //     headers: requestHeaders,
        //     credentials: "same-origin"
        // }).then((response) => {
        //     return response;
        // }, (error) => {
        //     console.log(error);
        // });
    }                       
    
    // body: JSON.stringify(userSelectedData),
}
}

