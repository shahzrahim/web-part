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

    /**
     * @function
     * Service constructor
     */
    constructor(_props: IHealthCheckProps, pageContext: IWebPartContext) {
        this.props = _props;
        this.context = pageContext;
    }
    public getApplicationValue(weburl: string,listname: string): any
    {
      var queryUrl=weburl +"/_api/web/lists/getByTitle('"+listname+"')/items?$select=Application";
      var FinalDDLValues=[];
      this.context.spHttpClient.get(queryUrl, SPHttpClient.configurations.v1)       
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
                         // Text:c.Application
                          key: c.Application,
                          text: c.Application
                        });
                      });                     
                     var finalValues=defaultArry.concat(applnValues);//Assign array with duplicate values
                     console.log(finalValues);
                     FinalDDLValues.push(finalValues);                     
                     return (finalValues); 
                   
                     //  //Code to remove the duplicate values from the sharepoint list column and bind to array.
                    //   var formatedArray = applnValues.reduce((output, item) => {
                    //     if(!output.includes(item.Text)) {
                    //       output.push(item.Text)
                    //     }
                    //     return output
                    //   }, [])
                    //  var finalListItem = formatedArray;//Assign array without duplicate values
                    //  console.log(finalListItem);    
                    //  //              

                     //formatedArray.push(defaultLstValues);                      
                     // var userList=[];
                     //this.userList=JSON.stringify(applnValues);
                     //console.log(finalListItem) 
                     //console.log(items); 
                     //console.log(responseJSON.value)  
                     //console.log(applnValues['Application']);                    
                     //console.log(teamsFromApi); 
                    //  let firstArray:string[]
                    //  firstArray=FinalDDLValues[0];
                    //  console.log(firstArray)
                     //let teamsFromApi = applnValues.map((team: any) => { return {value: Text, display: Text} })
                     //let items:any =responseJSON.map((object: any, i: number) => { var app = object[i]["Application"]}) //responseJSON;
                     //responseJSON.map((object: any, i: number) => {  var app = object[i]["Application"]}
                  } 
              });  
              
          }  
      });  
        
      return (FinalDDLValues); 
      console.log(FinalDDLValues);                              
 
    }
}

