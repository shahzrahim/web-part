import * as React from 'react';
import styles from './HealthCheck.module.scss';
import { IHealthCheckProps } from './IHealthCheckProps';
import { escape } from '@microsoft/sp-lodash-subset';
/*Custom Controls*/

//import { IHealthCheckState } from './IHealthCheckState';
//import { IListItem } from './IListItem'; 
import { IODataList } from '@microsoft/sp-odata-types';
import { SPHttpClient, SPHttpClientResponse, ISPHttpClientOptions} from '@microsoft/sp-http'; 
//import { Text } from 'office-ui-fabric-react/lib/Text';
import { getId } from 'office-ui-fabric-react/lib/Utilities';
//import Divider from 'react-native-divider';
import { Dropdown, DropdownMenuItemType, IDropdownOption, IDropdownStyles } from 'office-ui-fabric-react/lib/Dropdown';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { IStackTokens, Stack,IStackProps } from 'office-ui-fabric-react/lib/Stack';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { TextField, MaskedTextField } from 'office-ui-fabric-react/lib/TextField';
import { css, classNamesFunction, DefaultButton, IButtonProps, IStyle, PrimaryButton, fontFace } from 'office-ui-fabric-react';
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
  public render(): React.ReactElement<IHealthCheckProps> 
  { 
    
    this._onCheckboxChange = this._onCheckboxChange.bind(this);    
    return (
      <div className={ styles.healthCheck }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>                   
            <h1><Label className={styles.custTitle}><MyIcon/>{escape(this.props.HealthCheckPageTitle)}</Label></h1>
            <Stack tokens={stackTokens}> 
            <Label className={styles.custLabel}>{escape(this.props.HealthCheckCustomLabel1)}</Label>           
            <Dropdown placeholder="Select an option"  
            options={options} defaultSelectedKey="Designers" styles={dropdownStyles} onChange={this.onChangeFunc} />
            <Stack {...columnProps}>
            <Label className={styles.custLabel}>{escape(this.props.HealthCheckCustomLabel2)}</Label>
            <TextField //label="Enter Server/App/Group (Optional)" 
            />
            </Stack>
            <Label className={styles.custLabel}>{escape(this.props.HealthCheckCustomLabel3)}</Label>
            <Dropdown placeholder="Select an option" 
            options={[ { key: 'prd', text: 'PRD' },
                       { key: 'qa', text: 'QA' },
                       { key: 'dev', text: 'DEV' },
                       { key: 'all', text: 'ALL' }]} defaultSelectedKey="dev" styles={dropdownStyles} />
            <Label className={styles.custLabel}>{escape(this.props.HealthCheckCustomLabel4)}</Label>           
            <Dropdown placeholder="Select an option"  
               options={[ { key: 'on', text: 'ON' },{ key: 'off', text: 'OFF' }]} defaultSelectedKey="off" styles={dropdownStyles} />

              <Label className={styles.custLabel}>{escape(this.props.HealthCheckCustomLabel3)}</Label> 
          <div className={styles.custButton}>
          <table>
            
            <tr><td><b><Checkbox label="Check validity"  onChange={this._onCheckboxChange} /></b></td>
            <td>     
                      
              <DefaultButton data-automation-id="btnCancel" className={styles.button} target="_blank" title="Cancel" onClick={this._btnCancelClicked}>  
              <b><span className={styles.label}>{escape(this.props.HealthCheckCustomButton1)}</span></b>  
              </DefaultButton></td>
            <td><DefaultButton data-automation-id="btnHealthChk" className={styles.button} target="_blank" title="HealthCheck" onClick={this._btnHealthChkClicked}>  
                 <b><span className={styles.label}>{escape(this.props.HealthCheckCustomButton2)}</span></b>  
              </DefaultButton></td></tr>
          </table>      </div>       
           </Stack>
            </div>
          </div>
        </div>
        <div>
       
          <TextField
            label="05-30-19 10:20:10: pr1focap002.us.grainger.com: (App:Focus): (Chks: P:14 F:0 E:9): GREEN
            05-30-19 10:20:10: pr1focap002.us.grainger.com: (App:Focus): (Chks: P:14 F:0 E:9): GREEN
            05-30-19 10:20:10: pr1focap002.us.grainger.com: (App:Focus): (Chks: P:14 F:0 E:9): GREEN
            05-30-19 10:20:10: pr1focap002.us.grainger.com: (App:Focus): (Chks: P:14 F:0 E:9): GREEN
            05-30-19 10:20:10: pr1focap002.us.grainger.com: (App:Focus): (Chks: P:14 F:0 E:9): GREEN
            05-30-19 10:20:10: pr1focap002.us.grainger.com: (App:Focus): (Chks: P:14 F:0 E:9): GREEN
            05-30-19 10:20:10: pr1focap002.us.grainger.com: (App:Focus): (Chks: P:14 F:0 E:9): GREEN
            05-30-19 10:20:10: pr1focap002.us.grainger.com: (App:Focus): (Chks: P:14 F:0 E:9): GREEN
            05-30-19 10:20:10: pr1focap002.us.grainger.com: (App:Focus): (Chks: P:14 F:0 E:9): GREEN
            05-30-19 10:20:10: pr1focap002.us.grainger.com: (App:Focus): (Chks: P:0 F:0 E:0): InComplete"
            
          /></div>    
        

      </div>
      
    );
  }

//ValidlityCheck 
  private _onCheckboxChange(ev: React.FormEvent<HTMLElement>, isChecked: boolean): void {
    console.log('The option has been changed to ${isChecked}.');
  }
//
onChangeFunc(optionSelected) {
  //const name = this
  const value = optionSelected.value;
  const label = optionSelected.label;
}

private _btnCancelClicked(): void {  
  //alert('Cancel Button is Clicked');  
  
} 
private _btnHealthChkClicked():void{
  alert('HealthCheck Button is Clicked');
  
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

