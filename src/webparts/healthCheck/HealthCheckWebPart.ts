import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as microsoftTeams from '@microsoft/teams-js';
import { SPHttpClient } from '@microsoft/sp-http'; 
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';

import * as strings from 'HealthCheckWebPartStrings';
import HealthCheck from './components/HealthCheck';
import { IHealthCheckProps } from './components/IHealthCheckProps';

//export interface IHealthCheckWebPartProps {
//  description: string;
//}
export interface IHealthCheckWebPartProps {
listName: string;
HealthCheckPageTitle: string;
 HealthCheckCustomLabel1: string;
 HealthCheckCustomLabel2: string;
 HealthCheckCustomLabel3: string;
 HealthCheckCustomLabel4: string;
 HealthCheckCustomButton1: string;
 HealthCheckCustomButton2: string;
}
export default class HealthCheckWebPart extends BaseClientSideWebPart<IHealthCheckWebPartProps> {
// This variable has been added
private _teamsContext: microsoftTeams.Context;
  public render(): void {
    
    const element: React.ReactElement<IHealthCheckProps > = React.createElement(
      HealthCheck,
      {
        //description: this.properties.description
        listName: this.properties.listName,
        HealthCheckPageTitle:this.properties.HealthCheckPageTitle,
        HealthCheckCustomLabel1:this.properties.HealthCheckCustomLabel1,
        HealthCheckCustomLabel2:this.properties.HealthCheckCustomLabel2,
        HealthCheckCustomLabel3:this.properties.HealthCheckCustomLabel3,
        HealthCheckCustomLabel4:this.properties.HealthCheckCustomLabel4,
        HealthCheckCustomButton1:this.properties.HealthCheckCustomButton1,
        HealthCheckCustomButton2:this.properties.HealthCheckCustomButton2
        //spHttpClient: this.context.spHttpClient,  
        //siteUrl: this.context.pageContext.web.absoluteUrl
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

        /**
   * We're disabling reactive property panes here because we don't want the web part to try to update events as
   * people are typing in the properties.
   */
  protected get disableReactivePropertyChanges(): boolean {
    // require an apply button on the property pane
    
    return true;
  }


  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
           // description: strings.PropertyPaneDescription
           description: "Health Check Menu – Custom Labels"
          },
          groups: [
            {
              groupName: "Health Check Menu Labels",//strings.BasicGroupName,
              groupFields: [
              //  PropertyPaneTextField('listName', {  
              //    label: strings.ListNameFieldLabel  
               // }) ,
                PropertyPaneTextField('HealthCheckPageTitle', {  
                  label: strings.PageTitleFieldLabel  
                }) ,
                PropertyPaneTextField('HealthCheckCustomLabel1', {  
                  label: strings.PageCustom1FieldLabel  
                }) ,
                PropertyPaneTextField('HealthCheckCustomLabel2', {  
                  label: strings.PageCustom2FieldLabel  
                }) ,
                PropertyPaneTextField('HealthCheckCustomLabel3', {  
                  label: strings.PageCustom3FieldLabel  
                }) ,
                PropertyPaneTextField('HealthCheckCustomLabel4', {  
                  label: strings.PageCustom4FieldLabel  
                }) ,
                PropertyPaneTextField('HealthCheckCustomButton1', {  
                  label: strings.PageSubmitBtnFieldLabel  
                }) ,
                PropertyPaneTextField('HealthCheckCustomButton2', {  
                  label: strings.PageCancelBtnFieldLabel  
                }) 

               // PropertyPaneTextField('description', {
               //   label: strings.DescriptionFieldLabel
               // })

              ]
            }
          ]
        }
      ]
    };
  }
}
