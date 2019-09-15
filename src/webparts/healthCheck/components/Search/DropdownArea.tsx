import * as React from 'react';
import styles from './HealthCheck.module.scss';
import { IHealthCheckProps } from './IHealthCheckProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { getId } from 'office-ui-fabric-react/lib/Utilities';
import { Dropdown, DropdownMenuItemType, IDropdownOption, IDropdownStyles } from 'office-ui-fabric-react/lib/Dropdown';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { IStackTokens, Stack,IStackProps } from 'office-ui-fabric-react/lib/Stack';
import { TextField, MaskedTextField, ITextFieldStyles } from 'office-ui-fabric-react/lib/TextField';
import { css, classNamesFunction, DefaultButton, IButtonProps, IStyle, PrimaryButton, fontFace, loadTheme } from 'office-ui-fabric-react';
import { SPListResultsService } from './SPListResultsService';
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { string } from 'prop-types';
// var ApplicationOptions: IDropdownOption[] = [  
//   // { key: 'Application', text: 'Application' },
//   // { key: 'Server', text: 'Server' },
//   // { key: 'Owners', text: 'Owners'},
//   // { key: 'Members', text: 'Members' },
    
// ];
const EnvironmentOptions: IDropdownOption[] = [  
   { key: 'Prd', text: 'PRD' },
   { key: 'Qa', text: 'QA' },
   { key: 'Dev', text: 'DEV' },
   { key: 'All', text: 'ALL' }    
];
const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 384 }
};
const textFieldStyles: Partial<ITextFieldStyles> = {
  field : { width: 384 }
};

const stackTokens: IStackTokens = { childrenGap: 20 };  
/*End-Custom Controls*/

export default class DropdownArea extends React.Component<IHealthCheckProps,any> { 
  private currContext: IWebPartContext;  
  private serviceResults: any;
  constructor(props: IHealthCheckProps, context?: IWebPartContext) {
    super(props, context);
    this.currContext = props.context;
    this.state = {
      ddResults: [],
      results: [],
      inputValue: "",
      customGroup:"",
      serverName:"",
      environment:"",
      verbose:false 
     },
     this.setDDValues=this.setDDValues.bind(this);
    this.getApplicationDDValues=this.getApplicationDDValues.bind(this);   
    this._btnHealthChkClicked=this._btnHealthChkClicked.bind(this);
    this._btnCancelClicked = this._btnCancelClicked.bind(this);
    this._onApplicationDDLChanged = this._onApplicationDDLChanged.bind(this);
    this._onEnvironmentDDLChanged = this._onEnvironmentDDLChanged.bind(this);
    this._handleTextFieldChange = this._handleTextFieldChange.bind(this);
    this._onChkVerboseChange=this._onChkVerboseChange.bind(this);
  } 
  /**
   * @function
   * Function called when the component did mount
   */
  public componentDidMount(): void 
  {    
   this.getApplicationDDValues(); 
   console.log(this.serviceResults, 'this is service results in mount');
    // this.setState({ddResults: this.serviceResults});
   console.log(this.state.ddResults, 'this is DDresults');

    console.log(EnvironmentOptions, 'this is how it should look');
    
  } 
  private setDDValues (serviceResults) {
    this.setState({
      ddResults: serviceResults
    });
  }
  
  private getApplicationDDValues(): any
  {    
        var webURL = "https://atlcts.sharepoint.com/sites/GraingerTeams";
        var listName = "AppConfigTestList";
        const listResultsService: SPListResultsService = new SPListResultsService(this.props, this.currContext);
        var listvalues = [];
        listvalues.push({key:'Application',text:'Application'});
        listvalues.push({key:'Servers',text:'Servers'}); 
        this.setState({ddResults: listvalues });
        // this.state.ddResults.push(listvalues);

        console.log(this.state.ddResults, 'right after list results');
        
        this.serviceResults = listResultsService.getApplicationValue(webURL,listName);
        console.log(this.serviceResults, 'response from service results length');
        this.setDDValues(this.serviceResults);
        var ApplicationOptions: IDropdownOption[] = this.serviceResults;
        console.log(ApplicationOptions, 'this is application options');
        // this.setState({ddResults: ApplicationOptions});
        // console.log(this.state.ddResults, 'why is this not setting?');

        return this.serviceResults;
        // .then((responseJSON: any) =>  
        // { 
        //   console.log(responseJSON, 'this is response from Health Check call');
        //   return responseJSON;
        // })
        // .catch((err) => err);
        // // this.setState({ddResults: serviceResults });
        console.log(this.serviceResults, 'this is the this.service results');
          //  console.log(this.state.ddResults, 'this is DDresults');  

        // return this.serviceResults;
        

    

          
//              let resultitem =responseJSON.map((object: any, i: number) => {  
              
//               console.log(responseJSON[object[i]]);
//               if (responseJSON!=undefined)
//                  {
//                   return listvalues;
//               }
//               else { 
//                 listvalues.push({key:object,text:object[i]});
//                 this.setState({ddResults: listvalues});
//               }
//             }
          
              
            // }});
// //         }).catch((err)=>err);
//         console.log(serviceResults,'getDDvalues');
        

  }


  public render(): React.ReactElement<IHealthCheckProps> 
  {   
    
   
    return (
      <div className={ styles.healthCheck }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }> 
            <div className="inputContainer">

              <Label className={styles.custLabel}>{escape(this.props.HealthCheckCustomLabel1)}</Label>                      
              <Dropdown placeholder="Select an option"  
                        options={this.serviceResults} 
                        styles={dropdownStyles} 
                        onChange={ this._onApplicationDDLChanged.bind(this)}/>
              
              <Label className={styles.custLabel}>{escape(this.props.HealthCheckCustomLabel2)}</Label>           
              <TextField onChange={this._handleTextFieldChange} 
                         placeholder={this.state.inputValue}
                         styles={textFieldStyles}/>
              
              <Label className={styles.custLabel}>{escape(this.props.HealthCheckCustomLabel3)}</Label>
              <Dropdown placeholder="Select an option" 
                        options={EnvironmentOptions} 
                        styles={dropdownStyles} 
                        onChange={ this._onEnvironmentDDLChanged.bind(this)} />
                        <div className={styles["hideDiv"]}>

              </div>                  
            </div>
          
          <div className={styles.custButton}>
          <Checkbox className="checkBox" label="Verbose Mode" onChange={e => this._onChkVerboseChange(e)}/>
          <table>            
            <tr><td><b></b></td>
            <td> 
               <DefaultButton className={styles["addButton"]} 
                              data-automation-id="btnCancel" 
                              title="Cancel" 
                              onClick={this._btnCancelClicked}>  
              <b>{escape(this.props.HealthCheckCustomButton1)} </b>  
              </DefaultButton> </td>
            <td>
            <DefaultButton
                        className={styles["addButton"]}
                        ariaLabel='Health Check'
                        onClick={this._btnHealthChkClicked}                       
                    > {escape(this.props.HealthCheckCustomButton2)} </DefaultButton>
            </td></tr>
          </table>      
            </div>       
            </div>
          </div>
        </div>
      </div>
      
    );
  }

//btnCancel
private _btnCancelClicked(): void 
{  
  console.log('should clear the form');
  
} 
//btnHealthChk
private _btnHealthChkClicked():void
{

  var CurrApplnValue=this.state.customGroup;
  var currServerNameValue=this.state.serverName;
  var currEnvnValue=this.state.environment;
  var currVerboseValue=this.state.verbose;
  var selectData=[];

  if(this.state.customGroup!=="" || this.state.customGroup !== null)
     selectData.push(this.state.customGroup);
  if(this.state.serverName!=="" || this.state.serverName !== null)
     selectData.push(this.state.serverName);
  if(this.state.environment!=="" || this.state.environment !== null)
     selectData.push(this.state.environment);
  if(this.state.verbose!=="" || this.state.verbose !== null)
     selectData.push(this.state.verbose);
  
  if(this.state.customGroup==='Application' || this.state.customGroup==='Server')
  {
    if(this.state.serverName==="" || this.state.serverName === null)
    {
      this.setState({
        inputValue: 'Text Field is Mandatory'
      });
    }
    else
    {
      this.setState({ inputValue: ''});
    }
  }
  else
  {
    this.setState({ inputValue: ''});
  }
  
  var selectedData = [CurrApplnValue,currServerNameValue,currEnvnValue,currVerboseValue];//
  this.props.onSaveClick(selectedData);
 }
//DDLApplication
private _onApplicationDDLChanged(event) 
{ 
  var DDlApplSelectedValue = event.key; 
  this.setState( { customGroup: event.key} ); 
  // console.log('The Application dropdown value is :'+event.key);
  if(DDlApplSelectedValue=='Application' || DDlApplSelectedValue=='Server')
  {
    this.setState({
      inputValue: 'Text Field is Mandatory'
    });
    // console.log('The entered Server name is : Application / Server');
  } 
  else
  {
    this.setState({
      //inputValue: ''
    });
  } 
}
//TxtServerName
private _handleTextFieldChange(event) {
  this.setState( { serverName: event.target.value} ); 
  //this.state={serverName: event.target.value};
  // console.log('The entered Server name is :'+event.target.value);
  //this.setState({txtServer:event.target.value})
}
//DDLEnvironment
private _onEnvironmentDDLChanged(event) 
{ 
  var DDlEnvnSelectedValue = event.key; 
  this.setState( { environment: event.key} );
  // console.log('The Environment dropdown value is :'+DDlEnvnSelectedValue); 
  //this.setState({txtServer:event.target.value})

}
//ChkVerbose
public _onChkVerboseChange(e) 
{
  var isChecked = e.target.checked;
  // this.setState( { verbose: this._flip(isChecked)} );
  console.log(this.state.verbose);
    this.setState( { verbose: isChecked} );
  // console.log('The Verbose checkbox value is :'+isChecked);
  // console.log(this.state.results);
  
  //this.setState({chkVerbosevalue :e.target.checked})
  // do whatever you want with isChecked value
}
} 