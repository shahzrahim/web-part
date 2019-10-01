/*
 * @Author: Shazi.Rahim
 * @Date:   2016-07-29 15:57:29
 * @Company by: Cognizant
 * @Purpose: Sharepoint Container helper file that states all the properties of HealthCheckWebPart
 */
import { IWebPartContext } from '@microsoft/sp-webpart-base';
/**
 * Web part properties stored in web part configuration
 */
export interface IHealthCheckWebProps {
    listName: string;
    HealthCheckPageTitle: string;
    HealthCheckCustomLabel1: string;
    HealthCheckCustomLabel2: string;
    HealthCheckCustomLabel3: string;
    HealthCheckCustomLabel4: string;
    HealthCheckCustomButton1: string;
    HealthCheckCustomButton2: string;
    context: IWebPartContext;
    HealthCheckAzureUrl: string;
    HealthCheckSharepointListName: string;
    HealthCheckSharepointURL: string;


// define Azure URL, sharepoint URL, Sharepoint ListName
  }