/*
 * @Author: Shazi.Rahim
 * @Date:   2016-07-29 15:57:29
 * @Company by: Cognizant
 * @Purpose: Service Call for Health Check in Main Container .
 */
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
    private IHealthCheckContainerProps: IHealthCheckContainerProps;

    // /**
    //  * @function
    //  * Service constructor
    //  */
    constructor(pageContext: IWebPartContext, pageProps: IHealthCheckContainerProps) {
        this.context = pageContext;
        this.IHealthCheckContainerProps = pageProps;
    }
    
    //send sessionKey and status
    public getHealthCheckList(userSelectedData?: any, sessionKey?: string , status?: any, queryURL?: any): any {
        {

            // var queryUrl="https://graingerhealthcheck.azurewebsites.net/api/Grainger/response";
            var queryUrl = queryURL;
            const requestHeaders: Headers = new Headers();       
            requestHeaders.append("Access-Control-Max-Age", "86400");
            requestHeaders.append("Access-Control-Allow-Credentials" , "true");
            requestHeaders.append("Access-Control-Allow-Methods","GET");
            requestHeaders.append("Access-Control-Allow-Origin","https://atlcts.sharepoint.com");
            requestHeaders.append("status", status);      
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

