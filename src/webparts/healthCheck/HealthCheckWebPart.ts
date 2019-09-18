import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  IWebPartContext
} from '@microsoft/sp-webpart-base';
//import { PropertyFieldColorPicker, PropertyFieldColorPickerStyle } from '@pnp/spfx-property-controls/lib/PropertyFieldColorPicker';
import * as strings from 'HealthCheckWebPartStrings';
import HealthCheck from './components/Container/HealthCheckContainer';
import { IHealthCheckWebProps } from './IHealthCheckWebPartProps';



export interface IHealthCheckWebPartProps {
  listName: string;
  HealthCheckPageTitle: string;
   HealthCheckCustomLabel1: string;
   HealthCheckCustomLabel2: string;
   HealthCheckCustomLabel3: string;
   HealthCheckCustomLabel4: string;
   HealthCheckCustomButton1: string;
   HealthCheckCustomButton2: string;
   HealthCheckAzureUrl: string;
   HealthCheckSharepointURL: string;
   HealthCheckSharepointListName: string;
   //add color picker
}

export default class HealthCheckWebPart extends BaseClientSideWebPart<IHealthCheckWebPartProps> {


  public constructor(context?: IWebPartContext) {
    super();

    this.onPropertyPaneFieldChanged = this.onPropertyPaneFieldChanged.bind(this);
  }
  public render(): void {
    const element: React.ReactElement<IHealthCheckWebPartProps > = React.createElement(
      HealthCheck,
      {
          //description: this.properties.description
          listName: this.properties.listName,
          HealthCheckPageTitle : this.properties.HealthCheckPageTitle,
          HealthCheckCustomLabel1:this.properties.HealthCheckCustomLabel1,
          HealthCheckCustomLabel2:this.properties.HealthCheckCustomLabel2,
          HealthCheckCustomLabel3:this.properties.HealthCheckCustomLabel3,
          HealthCheckCustomLabel4:this.properties.HealthCheckCustomLabel4,
          HealthCheckCustomButton1:this.properties.HealthCheckCustomButton1,
          HealthCheckCustomButton2:this.properties.HealthCheckCustomButton2,
          context: this.context,   
          HealthCheckAzureUrl: this.properties.HealthCheckAzureUrl,
          HealthCheckSharepointListName: this.properties.HealthCheckSharepointListName,
          HealthCheckSharepointURL: this.properties.HealthCheckSharepointURL
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  
       /**
   * We're disabling reactive property panes here because we don't want the web part to try to update events as
   * people are typing in the feed URL.
   */
  protected get disableReactivePropertyChanges(): boolean {
    // require an apply button on the property pane
    return true;
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
                }) ,

                // define Azure URL, sharepoint URL, Sharepoint ListName
                //property textPaneField1
                //property textPaneField2
                //property textPaneField3
                PropertyPaneTextField('HealthCheckAzureUrl', {  
                  label: strings.HealthCheckAzureUrl  
                }), 
                PropertyPaneTextField('HealthCheckSharepointURL', {  
                  label: strings.HealthCheckSharepointUrl
                }), 
                PropertyPaneTextField('HealthCheckSharepointListName', {  
                  label: strings.HealthCheckSharepointListName  
                }) 

                // PropertyFieldColorPicker('color', {
                //   label: 'Color',
                //   selectedColor: this.properties.color,
                //   onPropertyChange: this.onPropertyPaneFieldChanged,
                //   properties: this.properties,
                //   disabled: false,
                //   isHidden: false,
                //   alphaSliderHidden: false,
                //   style: PropertyFieldColorPickerStyle.Full,
                //   iconName: 'Precipitation',
                //   key: 'colorFieldId'
                // })

              
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
