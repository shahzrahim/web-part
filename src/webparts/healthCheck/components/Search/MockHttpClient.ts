import { IWebPartContext } from "@microsoft/sp-webpart-base";
import { IHealthCheckProps } from "./IHealthCheckProps";
// import data from '../../data/data';
var data: any = require('../../data/data.json');
import { SPHttpClient, SPHttpClientResponse, SPHttpClientConfiguration, HttpClientResponse, HttpClient, IHttpClientOptions } from '@microsoft/sp-http'; 
import { IHealthCheckContainerProps } from "../Container/IHealthCheckContainerProps";

/**
 * @interface
 * Service interface definition
 */
export interface IMockService {

    /**
     * @function
     * Gets the feed from a Instagram
     */

    getHealthCheck(userSelectedData: any);
}

/**
 * @file
 * Implement a http client to request mock data to use the
 * web part with the local workbench
 *
 * Author: Olivier Carpentier
 */
// import { any, anyItem } from './any';

/**
 * @class
 * Defines a http client to request mock data to use the web part with the local workbench
 */

export default class MockHttpClient  {
    private static context: IWebPartContext;


    /**
     * @function
     * Service constructor
     */
 
    constructor(_props: IHealthCheckContainerProps, pageContext: IWebPartContext) {
        MockHttpClient.context = pageContext;
    }
    /**
     * @var
     * Mock SharePoint list sample
     */
    private static _app: any[] = [{"AppName": "appname", "Env": "PRD",}];

    /**
     * @var
     * Mock SharePoint list item sample
     */
    private static _servers: any[] = [{
        "Servers": {
            "Server1": "prlfocusapp.grainger.com",
            "Chk1": {"P": "14", "F": "0", "E": "15"},
            "Status1": "Green",
            "Color1": "#005566", 
            "Server2" : "prlfocusapp2.grainger.com", 
            "Chk2" : {"P" : "14", "F" : "0", "E" : "15"}, 
            "Status2": "Red", 
            "Color2" : "#009988"
            } }
    ];

    

    /**
     * @function
     * Mock get SharePoint list request
*/
// URL, sessionKey, userSelected Data will be passed
    public static getHealthCheck(AzureUrl, sessionKey, userSelectedData?: any) {
        const requestHeaders: Headers = new Headers();      
        requestHeaders.append("Access-Control-Max-Age", "86400");
        requestHeaders.append("Access-Control-Allow-Credentials" , "true");
        requestHeaders.append("Access-Control-Allow-Methods","GET");
        requestHeaders.append("Access-Control-Allow-Origin","https://atlcts.sharepoint.com");
        requestHeaders.append("Appname","test");
        requestHeaders.append("Status","finish");
        requestHeaders.append("servername","test");
        requestHeaders.append("verbose","on");

        requestHeaders.append("Session-Key", sessionKey);                           
         const httpClientOptions: IHttpClientOptions = {           
             headers: requestHeaders
           };
        //  return this.context.httpClient.get(AzureUrl, SPHttpClient.configurations.v1,httpClientOptions).then(this.processResponse);

        
        try {
            const response = new Promise((resolve, reject) => {
                resolve(data);
            });
            return new Promise((resolve, reject) => {
                //check if sessionKey matches sessionKey in localStorage
                //  then return based on truthy
                return response;
            });
        }
        catch (error_2) {
            return console.log(error_2);
        }
    }
}
