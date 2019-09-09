
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
  context : IWebPartContext;

 }

 export interface IHealthCheckContainerState
 {
  checkResult : boolean;
   searchValue : any;
  //  isSpinnerHidden: boolean;
 }
 