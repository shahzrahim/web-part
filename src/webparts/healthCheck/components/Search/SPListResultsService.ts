import { IHealthCheckProps } from './IHealthCheckProps';
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { HttpClient, HttpClientConfiguration, IHttpClientOptions, HttpClientResponse } from '@microsoft/sp-http';

import { CamlQuery } from "@pnp/sp";
import * as pnp from '@pnp/pnpjs';

/**
 * @interface
 * Service interface definition
 */
export interface ISPListResultsService {

    /**
     * @function
     * Gets the feed from a Instagram
     */

    getApplicationValue(webUrl: string, listName : string);
}

/**
 * @class
 * Service implementation to get feed from a Instagram
 */
export class SPListResultsService implements ISPListResultsService {
    private context: IWebPartContext;
    private props: IHealthCheckProps;

    /**
     * @function
     * Service constructor
     */
    constructor(_props: IHealthCheckProps, pageContext: IWebPartContext) {
        this.props = _props;
        this.context = pageContext;
    }

    public getApplicationValue(weburl: string,listname: string) {
      var queryUrl=weburl +"/_api/web/lists/getByTitle('"+listname+"')/items?$select=Id,LinkTitle,BannerImage,BannerURL,BannerText,IsActive&$filter=(IsActive eq 1)";
          
      var web = new pnp.Web(weburl);              
      const list = web.lists.getByTitle(listname);             
      var viewFields = "<ViewFields><FieldRef Name='BannerImage'/><FieldRef Name='BannerURL'/><FieldRef Name='BannerText'/></ViewFields>";
      var camlQry = "<View>" + viewFields + "<Query><Where><Eq><FieldRef Name='IsActive' /><Value Type='Boolean'>1</Value></Eq></Where>" + "</Query></View>";
      const q: CamlQuery = {
          ViewXml: camlQry,
      };            
      return list.getItemsByCAMLQuery(q).then(r => {
          return r;
      });                                   
 
    }
}


