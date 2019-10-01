/*
 * @Author: Shazi.Rahim
 * @Date:   2016-07-29 15:57:29
 * @Company by: Cognizant
 * @Purpose: States all the property types in Search Component TSX files.
 */
import { IWebPartContext } from '@microsoft/sp-webpart-base';
export interface IHealthCheckProps {  // description: string;
  listName: string;
  HealthCheckPageTitle: string;
  HealthCheckCustomLabel1: string;
  HealthCheckCustomLabel2: string;
  HealthCheckCustomLabel3: string;
  HealthCheckCustomLabel4: string;
  HealthCheckCustomButton1: string;
  HealthCheckCustomButton2: string;
  onSaveClick: ((term?: any) => void);   
  onCancelClick: ((term?: any) => void);   
  context: IWebPartContext;
  HealthCheckSharepointUrl: string;
  HealthCheckSharepointListName: string;
 }
 