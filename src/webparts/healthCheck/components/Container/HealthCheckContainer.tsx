import * as React from 'react';
import styles from './HealthCheckContainer.module.scss';
import { IHealthCheckContainerProps } from './IHealthCheckContainerProps';
import {IHealthCheckContainerState} from './IHealthCheckContainerProps';
import Healthsearch  from '../Search/HealthCheck';
import SearchResults from '../SearchResults/HealthResult';
import {
  IWebPartContext
} from '@microsoft/sp-webpart-base';
import * as strings from 'HealthCheckWebPartStrings';



export default class HealthCheckContainer extends React.Component<IHealthCheckContainerProps,IHealthCheckContainerState> {
  private _sessionStorageKey: string = "Deltanet_GroupWPFeed";
  private custStoragekey_Selectedgroupnames = "_SelGroupNamesWPFeed";
  private currContext: IWebPartContext;
  private _emailID: string;

  constructor(props :IHealthCheckContainerProps,context?: IWebPartContext) {
    super(props);
    this.state = { checkResult : false, searchValue : []};
    //this.currContext = props.context;
    // this.state = {
    //   accountClaimed: true,
    //   searchValue: [],
    //   showContent: true,
    //   showSearchGrp: false,
    //   divisionMatch: false,
    //   showFeed: false,
    //   claimUrl: "",
    //   userExists: true
    // };
    this._createTodoItem = this._createTodoItem.bind(this);

  }


  public render(): React.ReactElement<IHealthCheckContainerProps> {  
        return (
        <div className={styles.healthCheckContainer} >
          <div className='panel' id='SearchResults'>
            <div className='panel panel-default clearfix' id='PersonalFeed'>

              <div className={styles["panel-heading"]}>
                <h3 className={styles["panel-title"]}>
                  {this.props.HealthCheckPageTitle}
                </h3>
              </div>
              <div className='panel-body'>
                <div className='panel-container'>
                  <div className='panel-search'>
                    <Healthsearch onSaveClick={this._createTodoItem}  listName={this.props.listName} HealthCheckPageTitle={this.props.HealthCheckPageTitle} HealthCheckCustomLabel1={this.props.HealthCheckCustomLabel1}
                     HealthCheckCustomLabel2={this.props.HealthCheckCustomLabel2}  HealthCheckCustomLabel3={this.props.HealthCheckCustomLabel3}  HealthCheckCustomLabel4={this.props.HealthCheckCustomLabel4}  HealthCheckCustomButton1={this.props.HealthCheckCustomButton1}
                     HealthCheckCustomButton2={this.props.HealthCheckCustomButton2}  context={this.props.context}  />
                  </div>
                  <div>
                    <div className={styles["panel-Feedcontrol"]}>
                      <SearchResults HealthResult={this.state.checkResult} />
                    </div>
                  </div>
                </div>
            
              </div>
            </div>
          </div>
        </div>
      );    
  }

  private updateStatevalue(statevalue?: any) {
    if (statevalue !== undefined || statevalue !== null) {
      if (statevalue.dataType !== undefined) {
        var tempStateVal = statevalue.dataValue;
        this.setState({ searchValue: tempStateVal });
      }
    }
  }

  // should have all data
  private _createTodoItem(userSelectedData?: any) {
   
    this.setState({ searchValue: userSelectedData, checkResult : true});
  }


   
}
