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
export default class MockHttpClient {

    /**
     * @var
     * Mock SharePoint list sample
     */
    private static _apps: any[] = [{"AppName": "appname", "Env": "PRD",}];

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
    public static getApp(restUrl: string, options?: any): Promise<any[]> {
      return new Promise<any[]>((resolve) => {
            resolve(MockHttpClient._apps);
        });
    }

    /**
     * @function
     * Mock get SharePoint list items request
     */
    public static getAppServers(restUrl: string, options?: any): Promise<any[]> {
      return new Promise<any[]>((resolve) => {
            resolve(MockHttpClient._servers);
        });
    }
}