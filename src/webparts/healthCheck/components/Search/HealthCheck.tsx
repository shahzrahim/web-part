import * as React from 'react';
import styles from './HealthCheck.module.scss';
import { IHealthCheckProps } from './IHealthCheckProps';
import { escape } from '@microsoft/sp-lodash-subset';
/*Custom Controls*/
//import { IHealthCheckState } from './IHealthCheckState';
//import { IListItem } from './IListItem'; 
import { IODataList } from '@microsoft/sp-odata-types';
import { SPHttpClient, SPHttpClientResponse, ISPHttpClientOptions, IHttpClientOptions } from '@microsoft/sp-http';

import { getId } from 'office-ui-fabric-react/lib/Utilities';
import { Dropdown, DropdownMenuItemType, IDropdownOption, IDropdownStyles } from 'office-ui-fabric-react/lib/Dropdown';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { IStackTokens, Stack, IStackProps } from 'office-ui-fabric-react/lib/Stack';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { TextField, MaskedTextField, ITextFieldStyles } from 'office-ui-fabric-react/lib/TextField';
import { css, classNamesFunction, DefaultButton, IButtonProps, IStyle, PrimaryButton, fontFace, loadTheme } from 'office-ui-fabric-react';
import { SPListResultsService } from './SPListResultsService';
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { string } from 'prop-types';
import DropdownArea from './DropdownArea';
const ApplicationOptions: IDropdownOption[] = [
  { key: 'Select an option', text: 'Select an option' },
  { key: 'Application', text: 'Application' },  
  { key: 'Server', text: 'Server' },
  { key: 'Focus', text: 'Focus' },
  { key: 'Focus', text: 'Focus' },
  { key: 'Focus', text: 'Focus' },
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
  field: { width: 384 }
};

const stackTokens: IStackTokens = { childrenGap: 20 };
/*End-Custom Controls*/
export default class HealthCheck extends React.Component<IHealthCheckProps, any> {
  private currContext: IWebPartContext;
  private serviceResults: any;
  constructor(props: IHealthCheckProps, context?: IWebPartContext) {
    super(props, context);
    this.currContext = props.context;
    this.state = {
      errorMsg1: "",
      errorMsg2: "",
      errorMsg3: "",
      ddResults: [],
      results: [],
      inputValue: "",
      customGroup: "",
      serverName: "",
      environment: "",
      verbose: false,
      bttnDisable: true,
      showDropDownArea: true
    },
      this.clearMsg = this.clearMsg.bind(this);
    this._btnHealthChkClicked = this._btnHealthChkClicked.bind(this);
    this._btnCancelClicked = this._btnCancelClicked.bind(this);
    this._onApplicationDDLChanged = this._onApplicationDDLChanged.bind(this);
    this._onEnvironmentDDLChanged = this._onEnvironmentDDLChanged.bind(this);
    this._handleTextFieldChange = this._handleTextFieldChange.bind(this);
    this._onChkVerboseChange = this._onChkVerboseChange.bind(this);
  }
  /**
   * @function
   * Function called when the component did mount
   */
  public componentDidMount(): void {
    this.getApplicationDDValues();
    this.setState({ showDropDownArea: true });
  }

  private getApplicationDDValues(): void {
    //Replace webURL with this.props.HealthCheckSharepointURL
    //Replace listName with this.props.HealthCheckListName
    var webURL = this.props.HealthCheckSharepointUrl;
    var listName = this.props.HealthCheckSharepointListName;
    const listResultsService: SPListResultsService = new SPListResultsService(this.props, this.currContext);
    var listvalues = [];
    listvalues.push({ key: 'Application', text: 'Application' });
    listvalues.push({ key: 'Servers', text: 'Servers' });
    this.setState({ ddResults: listvalues });
    this.serviceResults = listResultsService.getApplicationValue(webURL, listName);
    // .then((responseJSON: any) =>  
    // { 
    //   console.log(responseJSON, 'this is response from Health Check call');
    //   return responseJSON;
    // })
    // .catch((err) => err);
    // // this.setState({ddResults: serviceResults });
    console.log(this.serviceResults, 'this is the service results');

  }

  //DDLApplication
  private _onApplicationDDLChanged(event?: any) {
    var DDlApplSelectedValue = event.key;
    console.log(event, 'line 107, healthCheck');

    this.setState({ customGroup: event.key });
    if (this.state.customGroup !== 'Application' || this.state.customGroup !== 'Server') {
      this.setState({
        errorMsg2: ''
      });
    }
    if (this.state.customGroup !== '') {
      this.setState({
        errorMsg1: ''
      });
    }
    console.log(this.state.customGroup, 'inside ddl change');

    // console.log('The Application dropdown value is :'+event.key);
  }
  //TxtServerName
  private _handleTextFieldChange(event?: any) {
    if (this.state.customGroup == 'Application' || this.state.customGroup == 'Server') {
      this.setState({
        errorMsg2: 'Text Field is Mandatory'
      });
    }
    this.setState({ serverName: event.target.value });
    this.setState({ errorMsg2: "" });
    //this.state={serverName: event.target.value};
    // console.log('The entered Server name is :'+event.target.value);
    //this.setState({txtServer:event.target.value})
  }
  //DDLEnvironment
  private _onEnvironmentDDLChanged(event?: any) {
    var DDlEnvnSelectedValue = event.key;
    this.setState({ environment: event.key });
    if ((this.state.customGroup == 'Application' || this.state.customGroup == 'Server') && this.state.serverName == '') {
      this.setState({
        errorMsg2: 'Text Field is Mandatory'
      });
    }
    if (this.state.environment !== '') {
      this.setState({
        errorMsg3: ''
      });
    }

  }
  //ChkVerbose
  public _onChkVerboseChange(e) {
    var isChecked = e.target.checked;
    // this.setState( { verbose: this._flip(isChecked)} );
    console.log(this.state.verbose);
    this.setState({ verbose: isChecked });
    // console.log('The Verbose checkbox value is :'+isChecked);
    // console.log(this.state.results);

    //this.setState({chkVerbosevalue :e.target.checked})
    // do whatever you want with isChecked value
  }
  public enableBttn() {
    this.setState({ bttnDisable: !this.state.bttnDisable });
  }
  public render(): React.ReactElement<IHealthCheckProps> {
    //  console.log(this.state.results);
    if (this.state.showDropDownArea == false) this.setState({ showDropDownArea: true });

    // {/* className="inputContainer" */}

    return (
      <div className={styles.healthCheck}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <div >
                {(this.state.showDropDownArea !== true) ? ""
                  : <DropdownArea
                    HealthCheckCustomLabel1={this.props.HealthCheckCustomLabel1}
                    HealthCheckCustomLabel2={this.props.HealthCheckCustomLabel2}
                    HealthCheckCustomLabel3={this.props.HealthCheckCustomLabel3}
                    context={this.props.context}
                    DDValues={this.state.DDresults}
                    _onApplicationDDLChanged={this._onApplicationDDLChanged.bind(this)}
                    _handleTextFieldChange={this._handleTextFieldChange}
                    _onEnvironmentDDLChanged={this._onEnvironmentDDLChanged}
                    _onChkVerboseChange={this._onChkVerboseChange}
                    errorMsg1={this.state.errorMsg1}
                    errorMsg2={this.state.errorMsg2}
                    errorMsg3={this.state.errorMsg3}
                  />}

              </div>

              <div className={styles.custButton}>
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
  private _btnCancelClicked(): void {
    this.props.onCancelClick();
    console.log('should clear the form');
    this.setState({
      customGroup: "",
      serverName: "",
      environment: "",
      verbose: false,
      showDropDownArea: false,
    });
    this.clearMsg();

  }

  private clearMsg(): void {
    this.setState({
      errorMsg1: "",
      errorMsg2: "",
      errorMsg3: "",
    });
  }
  //btnHealthChk
  private _btnHealthChkClicked(): void {
    var currApplnValue = this.state.customGroup;
    var currServerNameValue = this.state.serverName;
    var currEnvnValue = this.state.environment;
    var currVerboseValue = this.state.verbose;
    var selectData = [];

    if (this.state.customGroup == "") {
      this.setState({
        errorMsg1: 'Application is Mandatory'
      });
    }
    (this.state.customGroup == "") ? this.setState({ errorMsg1: 'Selection is Mandatory' }) : this.setState({ errorMsg1: '' });


    if (this.state.customGroup === 'Application' || this.state.customGroup === 'Server') {
      this.setState({
        errorMsg2: 'Text Field is Mandatory'
      });
    }

    (this.state.environment == "") ? this.setState({ errorMsg3: 'Selection is Mandatory' }) : this.setState({ errorMsg3: '' });


    // if(this.state.environment==""){
    //   {
    //     this.setState({
    //       errorMsg3: 'Environment is Mandatory'
    //     });
    //   }
    // }



    if (this.state.customGroup !== "" || this.state.customGroup !== null)
      selectData.push(this.state.customGroup);
    if (this.state.serverName !== "" || this.state.serverName !== null)
      selectData.push(this.state.serverName);
    if (this.state.environment !== "" || this.state.environment !== null)
      selectData.push(this.state.environment);
    if (this.state.verbose !== "" || this.state.verbose !== null)
      selectData.push(this.state.verbose);


    // else
    // {
    //   this.setState({ inputValue: ''});
    // }

    console.log(currApplnValue, 'this is server type value');
    console.log(selectData, 'this is selected Data at 1');


    var selectedData = [currApplnValue, currServerNameValue, currEnvnValue, currVerboseValue];
    console.log(selectedData, 'this is selected Data at 1');

    // currApplnValue !=="" || currEnvnValue !=="") && this.state.errorMsg2 == ""
    // if() {
    //   this.setState({bttnDisable:false});
    // }        this.props.onSaveClick(selectedData);
    if ((currApplnValue != "" && currEnvnValue != "") && (this.state.errorMsg2 == "")) {
      if (this.state.customGroup != "Application" || this.state.customGroup != "Server") {
        this.props.onSaveClick(selectedData);
        this.clearMsg();
      }
      if (this.state.customGroup == "Application" || this.state.customGroup == "Server") {
        if (selectData.length === 4) {
          this.props.onSaveClick(selectedData);
          this.clearMsg();
        }
      }

    }

  }
  public static getHealthCheck(AzureUrl, sessionKey, userSelectedData?: any) {
    const requestHeaders: Headers = new Headers();
    requestHeaders.append("Access-Control-Max-Age", "86400");
    requestHeaders.append("Access-Control-Allow-Credentials", "true");
    requestHeaders.append("Access-Control-Allow-Methods", "GET");
    requestHeaders.append("Access-Control-Allow-Origin", "https://atlcts.sharepoint.com");
    requestHeaders.append("Appname", "test");
    requestHeaders.append("Status", "finish");
    requestHeaders.append("servername", "test");
    requestHeaders.append("verbose", "on");

    requestHeaders.append("Session-Key", sessionKey);
    const httpClientOptions: IHttpClientOptions = {
      headers: requestHeaders
    };
    //  return this.context.httpClient.get(AzureUrl, SPHttpClient.configurations.v1,httpClientOptions).then(this.processResponse);


    // try {
    //     const response = new Promise((resolve, reject) => {
    //         resolve(data);
    //     });
    //     return new Promise((resolve, reject) => {
    //         //check if sessionKey matches sessionKey in localStorage
    //         //  then return based on truthy
    //         return response;
    //     });
    // }
    // catch (error_2) {
    //     return console.log(error_2);
    // }
  }


}

// create a clear form function -check
// set state for bttnDisabled = true; - check
// if all values are selected then bttn can be selected.
// create enableBttn function, call it in didMount



//Select an option as a value, 

{/* <Label className={styles.custLabel}>{escape(this.props.HealthCheckCustomLabel1)}</Label>
<Dropdown placeholder="Select an option"
  options={ApplicationOptions}
  styles={dropdownStyles}
  onChanged={this._onApplicationDDLChanged.bind(this)} />
<p style={{ color: "red" }}>{this.state.errorMsg1}</p>


<Label className={styles.custLabel}>{escape(this.props.HealthCheckCustomLabel2)}</Label>
<TextField onChange={this._handleTextFieldChange}
  //  placeholder={this.state.inputValue}
  value={this.state.serverName}
  styles={textFieldStyles} />
<p style={{ color: "red" }}>{this.state.errorMsg2}</p>

<Label className={styles.custLabel}>{escape(this.props.HealthCheckCustomLabel3)}</Label>
<Dropdown placeholder="Select an option"
  options={EnvironmentOptions}
  styles={dropdownStyles}
  onChanged={this._onEnvironmentDDLChanged.bind(this)} />
<div className={styles["hideDiv"]}>
  <p style={{ color: "red" }}>{this.state.errorMsg3}</p> */}