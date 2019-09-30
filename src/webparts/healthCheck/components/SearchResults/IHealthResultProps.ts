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
 