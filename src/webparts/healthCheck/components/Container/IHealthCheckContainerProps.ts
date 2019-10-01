/*
 * @Author: Shazi.Rahim
 * @Date:   2016-07-29 15:57:29
 * @Company by: Cognizant
 * @Purpose: Main Container Property type check.
 */
import { IWebPartContext } from '@microsoft/sp-webpart-base';
export interface IHealthCheckContainerProps {  // description: string;
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
}

export interface IHealthCheckContainerState {
  checkResult: boolean;
  searchValue: any;
  responseValue: any;
  requestValue: any;
  verbose: boolean;
  customGroup: string;
  serverType: string;
  environment: string;
  sessionKey: any;
  count: any;
  status: any;
  //  isSpinnerHidden: boolean;
}
