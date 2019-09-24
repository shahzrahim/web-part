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

    getApplicationValue(webUrl: string, listName : string);

}

/**
 * @class
 * Service implementation to get feed from a Instagram
 */
export class SPListResultsService implements ISPListResultsService {
    private context: IWebPartContext;
    private props: IHealthCheckProps;   

    // /**
    //  * @function
    //  * Service constructor
    //  */
    constructor(_props: IHealthCheckProps, pageContext: IWebPartContext) {
        this.props = _props;
        this.context = pageContext;
    }
    public getApplicationValue(weburl: string,listname: string): any
    {
      var queryUrl="_api/web/lists/getByTitle('"+"AppConfigTestList"+"')/items?$select=Application";
      var FinalDDLValues=[];
      
    //   this.context.httpClient.get(queryUrl, HttpClient.configurations.v1)
    //   .then((response: HttpClientResponse) => {
    //       return response.json();
    //   });
        return this.context.spHttpClient.get(queryUrl, SPHttpClient.configurations.v1)       
      .then((response: SPHttpClientResponse) => 
        {  
          if (response.ok) 
          {  
              response.json().then((responseJSON) => 
              {                 
                 if (responseJSON!=null)
                    {      

                        let applnValues=[];
                        var defaultArry=[];    
                        defaultArry.push({key:'Application',text:'Application'});
                        defaultArry.push({key:'Servers',text:'Servers'});                                       
                        //Code to get the column values from the sharepoint list with duplicate values to array.
                        let itemsvalue:any[] = responseJSON.value;                
                        itemsvalue.forEach(c => {
                            applnValues.push({
                            key: c.Application,
                            text: c.Application
                            });
                        });                     
                        console.log(itemsvalue,'this is responseJSON value');
                        
                        console.log(applnValues,'this is appInValues');
                        FinalDDLValues.push(applnValues); 
                        let resultObj = {
                            'data' : applnValues
                        };    
                        console.log(resultObj, 'this is resultOBJ');
                                       
                    return applnValues; 
                    

                    }
            });
        }

      });
    //   .catch((err)=> console.log(err));
    }
}
