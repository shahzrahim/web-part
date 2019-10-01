/*
 * @Author: Shazi.Rahim
 * @Date:   2016-07-29 15:57:29
 * @Company by: Cognizant
 * @Purpose: Helper file for Search Results container that states all expected property types.
 */
export interface IHealthResultProps {  // description: string;
 HealthResult : boolean;
 Response : any;
 Request : any;
 verbose: boolean;
 customGroup:string;
 serverType:string;
 environment:string;
 count: any;
 status: any;
 onStatusUpdate: ((term?: any) => void); 
}
 