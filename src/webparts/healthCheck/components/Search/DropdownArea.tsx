/*
 * @Author: Shazi.Rahim
 * @Date:   2016-07-29 15:57:29
 * @Company by: Cognizant
 * @Purpose: Dropdown component that holds health Check form dropdowns. Based on action in this file, Search Component will update its state.
 */
import * as React from 'react';
import styles from './HealthCheck.module.scss';
import { IHealthCheckProps } from './IHealthCheckProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { getId } from 'office-ui-fabric-react/lib/Utilities';
import { Dropdown, DropdownMenuItemType, IDropdownOption, IDropdownStyles } from 'office-ui-fabric-react/lib/Dropdown';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { IStackTokens, Stack, IStackProps } from 'office-ui-fabric-react/lib/Stack';
import { TextField, MaskedTextField, ITextFieldStyles } from 'office-ui-fabric-react/lib/TextField';
import { css, classNamesFunction, DefaultButton, IButtonProps, IStyle, PrimaryButton, fontFace, loadTheme } from 'office-ui-fabric-react';
import { SPListResultsService } from './SPListResultsService';
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { string } from 'prop-types';

export interface DropdownProps {  
  HealthCheckCustomLabel1: string;
  HealthCheckCustomLabel2: string;
  HealthCheckCustomLabel3: string;
  context: IWebPartContext;
  DDValues: any;
  _onApplicationDDLChanged: ((term?: any) => any);   
  _handleTextFieldChange: ((term?: any) => any);   
  _onEnvironmentDDLChanged: ((term?: any) => any);   
  errorMsg1: any;
  errorMsg2: any;
  errorMsg3: any;
  _onChkVerboseChange: ((term?: any) => any);
  HealthCheckSharepointUrl: string;
  HealthCheckSharepointListName: string;
 }
 const ApplicationOptions: IDropdownOption[] = [
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

export default class DropdownArea extends React.Component<DropdownProps, any> {
  private currContext: IWebPartContext;

  constructor(props: DropdownProps, context?: IWebPartContext) {
    super(props, context);
    this.currContext = props.context;
    this.state = {
      DDValues: [],
    },
    this._onApplicationDDLChanged = this._onApplicationDDLChanged.bind(this);
    this._onEnvironmentDDLChanged = this._onEnvironmentDDLChanged.bind(this);
    this._handleTextFieldChange = this._handleTextFieldChange.bind(this);
    this._onChkVerboseChange = this._onChkVerboseChange.bind(this);
  }

  /**
   * @function
   * Function called when the component did mount
   */

  // will make call to get application DD values that will populate Application Dropdown selections.
  public componentDidMount(): void {
    this.getApplicationDDValues();

  }
  private getApplicationDDValues(): void {
    //Replace webURL with this.props.HealthCheckSharepointURL
    //Replace listName with this.props.HealthCheckListName
    // https://atlcts.sharepoint.com/sites/GraingerTeams — WebURL
    var defaultArry = [];
    defaultArry.push({ key: 'Application', text: 'Application' });
    defaultArry.push({ key: 'Servers', text: 'Servers' });

    
    var webURL = this.props.HealthCheckSharepointUrl;
    var listName = this.props.HealthCheckSharepointListName;
    
    
    const listResultsService: SPListResultsService = new SPListResultsService(this.currContext);
    let serviceResults = listResultsService.getApplicationValue(webURL, listName);
    // ;
    // this.setState({ddResults: this.serviceResults});
    // console.log(this.state.ddResults, 'in health check');
    
    // this.serviceResults.
    serviceResults.then((responseJSON: any) =>  { 
      
      if (responseJSON != null) {

        let applnValues = [];

        //Code to get the column values from the sharepoint list with duplicate values to array.
        let itemsvalue: any[] = responseJSON.value;
        itemsvalue.forEach(c => {
            applnValues.push({
                key: c.Application,
                text: c.Application
            });
        });


        let FinalDDLValues = defaultArry.concat(applnValues);

        // return FinalDDLValues;
        this.setState({DDValues: FinalDDLValues});

        
      } 
    }).catch((err: any) => console.log(err));
    this.setState({DDValues: defaultArry});
  }
  
  //UI component that will be rendered on Browser.
  public render(): React.ReactElement<DropdownProps> {


    return (
              <div className="inputContainer">

                <Label className={styles.custLabel}>{escape(this.props.HealthCheckCustomLabel1)}</Label>
                <Dropdown placeholder="Select an option"
                  options={this.state.DDValues}
                  styles={dropdownStyles}
                  onChanged={this._onApplicationDDLChanged.bind(this)} />
                <p style={{ color: "red" }}>{this.props.errorMsg1}</p>
            

                <Label className={styles.custLabel}>{escape(this.props.HealthCheckCustomLabel2)}</Label>
                <TextField onChange={this._handleTextFieldChange}
                  styles={textFieldStyles} />
                <p style={{ color: "red" }}>{this.props.errorMsg2}</p>

                <Label className={styles.custLabel}>{escape(this.props.HealthCheckCustomLabel3)}</Label>
                <Dropdown placeholder="Select an option"
                  options={EnvironmentOptions}
                  styles={dropdownStyles}
                  onChanged={this._onEnvironmentDDLChanged.bind(this)} />
                <p style={{ color: "red" }}>{this.props.errorMsg3}</p>


                <div className={styles.custButton}>
                <Checkbox className="checkBox"
                  label="Verbose Mode"
                  onChange={e => this._onChkVerboseChange(e)}
                  defaultChecked={false}                />
                </div>
              </div>

    );
  }

    //Method to handle change for DDLApplication
    private _onApplicationDDLChanged(event?: any) {
      return this.props._onApplicationDDLChanged(event);
    }
    //Method to handle change for TxtServerName
    private _handleTextFieldChange(event? :any) {
      return this.props._handleTextFieldChange(event);
    }
    //Method to handle change for DDLEnvironment
    private _onEnvironmentDDLChanged(event? :any) {
      return this.props._onEnvironmentDDLChanged(event);
    }
    //Method to handle change for ChkVerbose
    public _onChkVerboseChange(event? :any) {
      return this.props._onChkVerboseChange(event);
    }
} 

