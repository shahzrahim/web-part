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
import { string, any } from 'prop-types';
import DropdownArea from './DropdownArea';


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
    // this.getApplicationDDValues();
    this.setState({ showDropDownArea: true });
  }

  // private getApplicationDDValues(): void {
  //   //Replace webURL with this.props.HealthCheckSharepointURL
  //   //Replace listName with this.props.HealthCheckListName
  //   // https://atlcts.sharepoint.com/sites/GraingerTeams — WebURL


  //   var webURL = 'https://atlcts.sharepoint.com/sites/GraingerTeams';
  //   var listName = this.props.HealthCheckSharepointListName;
  //   const listResultsService: SPListResultsService = new SPListResultsService(this.props, this.currContext);
  //   this.serviceResults = listResultsService.getApplicationValue(webURL, listName);
  //   // ;
  //   // this.setState({ddResults: this.serviceResults});
  //   // console.log(this.state.ddResults, 'in health check');
    
  //   // this.serviceResults.
  //   this.serviceResults.then((responseJSON: any) =>  { 
  //     if (responseJSON != null) {

  //       let applnValues = [];
  //       var defaultArry = [];
  //       defaultArry.push({ key: 'Application', text: 'Application' });
  //       defaultArry.push({ key: 'Servers', text: 'Servers' });
  //       //Code to get the column values from the sharepoint list with duplicate values to array.
  //       let itemsvalue: any[] = responseJSON.value;
  //       itemsvalue.forEach(c => {
  //           applnValues.push({
  //               key: c.Application,
  //               text: c.Application
  //           });
  //       });
  //       console.log(itemsvalue, 'this is responseJSON value');

  //       let FinalDDLValues = defaultArry.concat(applnValues);

  //       // return FinalDDLValues;
  //       this.setState({ddResults: FinalDDLValues});
  //       console.log();
        
  //     } 
  //   });
  // }

  //DDLApplication
  private _onApplicationDDLChanged(event?: any) {
    var DDlApplSelectedValue = event.key;


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

    this.setState({ verbose: isChecked });
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


    if (this.state.customGroup !== "" || this.state.customGroup !== null)
      selectData.push(this.state.customGroup);
    if (this.state.serverName !== "" || this.state.serverName !== null)
      selectData.push(this.state.serverName);
    if (this.state.environment !== "" || this.state.environment !== null)
      selectData.push(this.state.environment);
    if (this.state.verbose !== "" || this.state.verbose !== null)
      selectData.push(this.state.verbose);


    var selectedData = [currApplnValue, currServerNameValue, currEnvnValue, currVerboseValue];


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
