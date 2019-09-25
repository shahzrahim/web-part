
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
    getHealthCheckList(userSelectedData?: any);

}

/**
 * @class
 * Service implementation to get feed from a Instagram
 */
export class SPHealthCheckResultsService implements ISPListResultsService {
    private context: IWebPartContext;
    private props: IHealthCheckContainerProps;   

    // /**
    //  * @function
    //  * Service constructor
    //  */
    constructor(_props: IHealthCheckContainerProps, pageContext: IWebPartContext) {
        this.props = _props;
        this.context = pageContext;
    }
    
    //send sessionKey and status
    public getHealthCheckList(userSelectedData?: any, ): any {
        {
            var queryUrl="https://graingerhealthcheck.azurewebsites.net/api/Grainger/response";
            const requestHeaders: Headers = new Headers();       
            requestHeaders.append("Access-Control-Max-Age", "86400");
            requestHeaders.append("Access-Control-Allow-Credentials" , "true");
            requestHeaders.append("Access-Control-Allow-Methods","GET");
            requestHeaders.append("Access-Control-Allow-Origin","https://atlcts.sharepoint.com");
            requestHeaders.append("status", "continue ");      
            requestHeaders.append("AppName", userSelectedData.AppName); 
            requestHeaders.append("ServerName", userSelectedData.ServerName); 
            requestHeaders.append("Verbose", userSelectedData.Verbose); 
            requestHeaders.append("Content-Type", "application/json");      
            requestHeaders.append("User-Input", userSelectedData);      

            // text/plain; charset=utf-8
            // //requestHeaders.append("FeedType", dataType);
            // requestHeaders.append("Secure_Token", secureCode);             
       
        const httpClientOptions: IHttpClientOptions = {           
            headers: requestHeaders,
            body: userSelectedData
        };

        // return this.context.spHttpClient.get(queryUrl, SPHttpClient.configurations.v1,httpClientOptions)
        // .then((response: HttpClientResponse) => {
        //     return response.json();
        // });
        fetch(queryUrl, {
            method: "GET",
            headers: requestHeaders,
            credentials: "same-origin"
        }).then((response) => {
            return response;
        }, (error) => {
            console.log(error);
        });
    }                       
    
    // body: JSON.stringify(userSelectedData),
}
}

