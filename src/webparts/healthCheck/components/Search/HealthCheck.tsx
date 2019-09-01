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
import { TextField, MaskedTextField } from 'office-ui-fabric-react/lib/TextField';
import { css, classNamesFunction, DefaultButton, IButtonProps, IStyle, PrimaryButton, fontFace } from 'office-ui-fabric-react';
import { SPListResultsService } from './SPListResultsService';
import { IWebPartContext } from '@microsoft/sp-webpart-base';

type IButtonBasicExampleStyleProps = {};
interface IButtonBasicExampleStyles {
  twoup?: IStyle;
}
const getClassNames = classNamesFunction<IButtonBasicExampleStyleProps, IButtonBasicExampleStyles>();
//const classNames = getClassNames(exampleStyles, {});
export interface IDropdownControlledMultiExampleState {
  selectedItems: string[];
}
export interface ICheckboxBasicExampleState {
  isChecked: boolean;
}
const MyIcon = () => <Icon iconName="Contact" className="ms-IconExample" />;
const MyTitle = <h1>Health Check Menu</h1>;
const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 300 }
};
const options: IDropdownOption[] = [  
  { key: 'Approvers', text: 'Approvers' },
  { key: 'Designers', text: 'Designers' },
  { key: 'Owners', text: 'Owners'},
  { key: 'Members', text: 'Members' },
    
];
const columnProps: Partial<IStackProps> = {  
  styles: { root: { width: 300 } }
};
const exampleStyles: IButtonBasicExampleStyles = {
  twoup: [
    'ms-BasicButtonsTwoUp',
    {
      display: 'flex',
      selectors: {
        '& > *': {
          flexGrow: 1
        },
        '.ms-Label': {
          marginBottom: '10px'
        }
      }
    }
  ]
};
const stackTokens: IStackTokens = { childrenGap: 20 };  
/*End-Custom Controls*/




export default class HealthCheck extends React.Component<IHealthCheckProps> 
{ 

  private currContext: IWebPartContext;

  constructor(props: IHealthCheckProps, context?: IWebPartContext) {
    super(props, context);
    this.currContext = props.context;
    this.state = {
      results: []  
    }
  };

  /**
   * @function
   * Function called when the component did mount
   */
  public componentDidMount(): void {
    this.getApplicationDDValues();

  }

  private getApplicationDDValues()
  {
    var webURL = "https://atlcts.sharepoint.com/sites/GraingerTeams";
    var listName = "Applications";
    const listResultsService: SPListResultsService = new SPListResultsService(this.props, this.currContext);
    listResultsService.getApplicationValue(webURL,listName).then((applicationResults) => {
      this.setState({ results: applicationResults });
    });

  }


  public render(): React.ReactElement<IHealthCheckProps> 
  {   
    this._onCheckboxChange = this._onCheckboxChange.bind(this);    
    return (
      <div className={ styles.healthCheck }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>                  
         
            <Label className={styles.custLabel}>{escape(this.props.HealthCheckCustomLabel1)}</Label>           
            <Dropdown placeholder="Select an option"  
                      options={options} 
                      defaultSelectedKey="Designers" 
                      styles={dropdownStyles} 
                      onChange={this.onChangeFunc} />
           
            <Label className={styles.custLabel}>{escape(this.props.HealthCheckCustomLabel2)}</Label>
            <TextField label="Enter Server/App/Group (Optional)" 
            />
           
            <Label className={styles.custLabel}>{escape(this.props.HealthCheckCustomLabel3)}</Label>
            <Dropdown placeholder="Select an option" 
            options={[ { key: 'prd', text: 'PRD' },
                       { key: 'qa', text: 'QA' },
                       { key: 'dev', text: 'DEV' },
                       { key: 'all', text: 'ALL' }]} 
                      //  defaultSelectedKey="dev" 
                       styles={dropdownStyles} />
            <Label className={styles.custLabel}>{escape(this.props.HealthCheckCustomLabel4)}</Label>           
            <Dropdown 
                      placeholder="Select an option"  
                      options={[ 
                        { key: 'on', text: 'ON' },
                        { key: 'off', text: 'OFF' }]} 
                        // defaultSelectedKey="off" 
                        styles={dropdownStyles} />
          <div className={styles.custButton}>
          <table>
            
            <tr><td><b><Checkbox label="Check validity"  onChange={this._onCheckboxChange} /></b></td>
            <td>     
                      
              <DefaultButton 
                        className={styles["addButton"]} 
                        data-automation-id="btnCancel" 
                        target="_blank" title="Cancel" 
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
          </table>      </div>       
         
            </div>
          </div>
        </div>
      </div>
      
    );
  }
//ValidlityCheck 
  private _onCheckboxChange(ev: React.FormEvent<HTMLElement>, isChecked: boolean): void {
    console.log('The option has been changed to ${isChecked}.');
  }
//
  private onChangeFunc(optionSelected: any) {
  //const name = this
  const value = optionSelected.values;
  const label = optionSelected.label;
}

private _btnCancelClicked(): void {  
  // alert('Cancel Button is Clicked');  
} 
private _btnHealthChkClicked():void{
  var selectedData = [];
  selectedData.push("button clicked");
  this.props.onSaveClick(selectedData);  
}
//  
  private _onChange = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => 
  {
    //const newSelectedItems = [this.state.selectedItems];
   // if (item.selected) {
      // add the option if it's checked
  //    newSelectedItems.push(item.key as string);
  //  } else {
      // remove the option if it's unchecked
  //    const currIndex = newSelectedItems.indexOf(item.key as string);
  //    if (currIndex > -1) {
  //      newSelectedItems.splice(currIndex, 1);
  //    }
  //  }
  //  this.setState({
  //    selectedItems: newSelectedItems
   // });
  }
}
