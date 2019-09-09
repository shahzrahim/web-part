import * as React from 'react';
import styles from './HealthCheck.module.scss';
import { IHealthCheckProps } from './IHealthCheckProps';
import { escape } from '@microsoft/sp-lodash-subset';
/*Custom Controls*/
//import { IHealthCheckState } from './IHealthCheckState';
//import { IListItem } from './IListItem'; 
import { IODataList } from '@microsoft/sp-odata-types';
import { SPHttpClient, SPHttpClientResponse, ISPHttpClientOptions} from '@microsoft/sp-http'; 

import { getId } from 'office-ui-fabric-react/lib/Utilities';
import { Dropdown, DropdownMenuItemType, IDropdownOption, IDropdownStyles } from 'office-ui-fabric-react/lib/Dropdown';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { IStackTokens, Stack,IStackProps } from 'office-ui-fabric-react/lib/Stack';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { TextField, MaskedTextField, ITextFieldStyles } from 'office-ui-fabric-react/lib/TextField';
import { css, classNamesFunction, DefaultButton, IButtonProps, IStyle, PrimaryButton, fontFace, loadTheme } from 'office-ui-fabric-react';
import { SPListResultsService } from './SPListResultsService';
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { string } from 'prop-types';
const ApplicationOptions: IDropdownOption[] = [  
  { key: 'Application', text: 'Application' },
  { key: 'Server', text: 'Server' },
  { key: 'Owners', text: 'Owners'},
  { key: 'Members', text: 'Members' },
    
];
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

// const exampleStyles: IButtonBasicExampleStyles = {
//   twoup: [
//     'ms-BasicButtonsTwoUp',
//     {
//       display: 'flex',
//       selectors: {
//         '& > *': {
//           flexGrow: 1
//         },
//         '.ms-Label': {
//           marginBottom: '10px'
//         }
//       }
//     }
//   ]
// };
const stackTokens: IStackTokens = { childrenGap: 20 };  
/*End-Custom Controls*/
export default class HealthCheck extends React.Component<IHealthCheckProps,any> { 
  private currContext: IWebPartContext;  
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
   //options=this.createSelectItems(resultss)
   //console.log(options)
   // resultss.forEach(c => 
   //   {
   //   options.push({
    //    key: c.id,
     ///   text: c.title
   //   });
   // });    
  } 

  
  private getApplicationDDValues()
  {    
        var webURL = "https://atlcts.sharepoint.com/sites/GraingerTeams";
        var listName = "App Config Test List";
        const listResultsService: SPListResultsService = new SPListResultsService(this.props, this.currContext);
        var listvalues = [];
        listvalues.push({key:'Application',text:'Application'});
        listvalues.push({key:'Servers',text:'Servers'}); 
        var serviceResults = listResultsService.getApplicationValue(webURL,listName);
        // console.log(serviceResults);
        this.setState({ddResults: listvalues });

        
    // .then((responseJSON) =>  
    // { 
    //       var listvalues = [];
    //       listvalues.push({key:'Application',text:'Application'});
    //       listvalues.push({key:'Servers',text:'Servers'}); 
    //       
    //       if (responseJSON!=undefined)
    //                  {      
    //                   return listvalues;
    //                  }
    //       else { this.setState({ddResults: listvalues});}
    
    //     });
    //resultitem=responseJSON.map((object: any, i: number) => {  var app = object[i]["Application"]
    //listResultsService.getApplicationValue(webURL,listName).then((applicationResults) => 
    //{
    //this.setState({ results: applicationResults });
    //}); 
    // var listvalues = [];
    // listvalues.push({key:'Application',text:'Application'});
    // listvalues.push({key:'Servers',text:'Servers'});      
    // listvalues.push(resultsData); 
    // console.log(listvalues);
    //return FinalDDLValuess
  }


  public render(): React.ReactElement<IHealthCheckProps> 
  {   
  //  console.log(this.state.results);
   
    return (
      <div className={ styles.healthCheck }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }> 
            <div className="inputContainer">

              <Label className={styles.custLabel}>{escape(this.props.HealthCheckCustomLabel1)}</Label>                      
              <Dropdown placeholder="Select an option"  
                        options={this.state.ddResults} 
                        styles={dropdownStyles} 
                        onChange={ this._onApplicationDDLChanged.bind(this)}/>
              <p style={{color: "red"}}>{this.state.inputValue}</p>            
              
              <Label className={styles.custLabel}>{escape(this.props.HealthCheckCustomLabel2)}</Label>           
              <TextField onChange={this._handleTextFieldChange} 
                         styles={textFieldStyles}/>
              
              <Label className={styles.custLabel}>{escape(this.props.HealthCheckCustomLabel3)}</Label>
              <Dropdown placeholder="Select an option" 
                        options={EnvironmentOptions} 
                        styles={dropdownStyles} 
                        onChanged={ this._onEnvironmentDDLChanged.bind(this)} />
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
      //this.props.onSaveClick(selectedData);  
    }
  }
  else
  {
    this.setState({ inputValue: ''});
    //this.props.onSaveClick(selectedData);
  }
  
  var selectedData = [CurrApplnValue,currServerNameValue,currEnvnValue,currVerboseValue];//
  // selectedData.push("button clicked");
  console.log(selectedData);
  
 // this.props.onSaveClick(selectedData);
 this.props.onSaveClick(selectedData);
 }
//DDLApplication
private _onApplicationDDLChanged(event) 
{ 
  var DDlApplSelectedValue = event.key; 
  this.setState( { customGroup: event.key} ); 
  console.log('The Application dropdown value is :'+DDlApplSelectedValue);
  if(DDlApplSelectedValue=='Application' || DDlApplSelectedValue=='Server')
  {
    this.setState({
//inputValue: 'Text Field is Mandatory'
    });
    console.log('The entered Server name is : Application / Server')
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
  console.log('The entered Server name is :'+event.target.value);
  //this.setState({txtServer:event.target.value})
}
//DDLEnvironment
private _onEnvironmentDDLChanged(event) 
{ 
  var DDlEnvnSelectedValue = event.key; 
  this.setState( { environment: event.key} )
  console.log('The Environment dropdown value is :'+DDlEnvnSelectedValue); 
  //this.setState({txtServer:event.target.value})

}
//ChkVerbose
public _onChkVerboseChange(e) 
{
  var isChecked = e.target.checked;
  // this.setState( { verbose: this._flip(isChecked)} );
  console.log(this.state.verbose);
    this.setState( { verbose: isChecked} );
  console.log('The Verbose checkbox value is :'+isChecked);
  console.log(this.state.results);
  
  //this.setState({chkVerbosevalue :e.target.checked})
  // do whatever you want with isChecked value
}
} 