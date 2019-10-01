/*
 * @Author: Shazi.Rahim
 * @Date:   2016-07-29 15:57:29
 * @Company by: Cognizant
 * @Purpose: Search Container that has methods from main container that essentially watch events(Click events) that will trigger action in main component.
 */
import * as React from 'react';
import styles from './HealthCheck.module.scss';
import { IHealthCheckProps } from './IHealthCheckProps';
import { escape } from '@microsoft/sp-lodash-subset';
/*Custom Controls*/
//import { IHealthCheckState } from './IHealthCheckState';
//import { IListItem } from './IListItem'; 
import { css, classNamesFunction, DefaultButton, IButtonProps, IStyle, PrimaryButton, fontFace, loadTheme } from 'office-ui-fabric-react';
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import DropdownArea from './DropdownArea';
import { IHttpClientOptions } from '@microsoft/sp-http';


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
    this.setState({ showDropDownArea: true });
  }

  //Error Handling methods for DDLApplication that are passed as props to Dropdown Component
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
  //Error Handling methods for TxtServerName that are passed as props to Dropdown Component
  private _handleTextFieldChange(event?: any) {
    if (this.state.customGroup == 'Application' || this.state.customGroup == 'Server') {
      this.setState({
        errorMsg2: 'Text Field is Mandatory'
      });
    }
    this.setState({ serverName: event.target.value });
    this.setState({ errorMsg2: "" });
  }

  //Error Handling methods for DDLEnvironment that are passed as props to Dropdown Component
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
  //Error Handling methods for ChkVerbose that are passed as props to Dropdown Component
  public _onChkVerboseChange(e) {
    var isChecked = e.target.checked;

    this.setState({ verbose: isChecked });
  }
  public enableBttn() {
    this.setState({ bttnDisable: !this.state.bttnDisable });
  }

  //UI Component to be rendered.
  public render(): React.ReactElement<IHealthCheckProps> {

    // Will insure that dropdown area shows, always.
    if (this.state.showDropDownArea == false) this.setState({ showDropDownArea: true });


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

  //this method btnCancel will let parent container know to reset state of application by calling this.props.onCancelClick();

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

  //Clears all error messages on form
  private clearMsg(): void {
    this.setState({
      errorMsg1: "",
      errorMsg2: "",
      errorMsg3: "",
    });
  }

  //This method btnHealthChk will let to update Form inputs into parent component state which will trigger load in results section
  //by calling this.props.onCancelClick();
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

}
