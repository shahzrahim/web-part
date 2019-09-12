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
import MockHttpClient from '../Search/MockHttpClient';
import { SPHealthCheckResultsService } from './SPHealthCheckResultsService';




export default class HealthCheckContainer extends React.Component<IHealthCheckContainerProps,IHealthCheckContainerState> {
  private _sessionStorageKey: string = "Deltanet_GroupWPFeed";
  private custStoragekey_Selectedgroupnames = "_SelGroupNamesWPFeed";
  private currContext: IWebPartContext;
  private _emailID: string;

  constructor(props :IHealthCheckContainerProps,context?: IWebPartContext) {
    super(props);
    this.state = { checkResult : false, searchValue : [], responseValue: [], requestValue: [],
    verbose: null,
    customGroup:"",
    serverType:"",
    environment:"",  
    };
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
    this.clickHealthChk = this.clickHealthChk.bind(this);
    this.getHeathCheckList = this.getHeathCheckList.bind(this);
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
                    <Healthsearch onSaveClick={this.clickHealthChk}  listName={this.props.listName} HealthCheckPageTitle={this.props.HealthCheckPageTitle} HealthCheckCustomLabel1={this.props.HealthCheckCustomLabel1}
                     HealthCheckCustomLabel2={this.props.HealthCheckCustomLabel2}  HealthCheckCustomLabel3={this.props.HealthCheckCustomLabel3}  HealthCheckCustomLabel4={this.props.HealthCheckCustomLabel4}  HealthCheckCustomButton1={this.props.HealthCheckCustomButton1}
                     HealthCheckCustomButton2={this.props.HealthCheckCustomButton2}  context={this.props.context}  />
                  </div>
                  <div>
                    <div className={styles["panel-Feedcontrol"]}>
                      <SearchResults 
                        Response={this.state.responseValue}
                        Request={this.state.requestValue}
                        HealthResult={this.state.checkResult}
                        customGroup={this.state.customGroup}
                        serverType={this.state.serverType}
                        environment={this.state.environment}
                        verbose={this.state.verbose}
                       />
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
        // this.setState({ searchValue: tempStateVal });
      }
    }
  }
  private getHeathCheckList(requestValue)
  {    
        const listResultsService: SPHealthCheckResultsService = new SPHealthCheckResultsService(this.props, this.currContext);
        var listvalues = [];
        var serviceResults = listResultsService.getHealthCheckList(requestValue);
        console.log(serviceResults, 'this is service results');
        
    //     .then((responseJSON: any) =>  
    //     { 
    //       console.log(responseJSON);
          
    //       this.setState({responseValue: listvalues});
        
    //     }).catch((err) => err);
    return serviceResults;

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

  private clickHealthChk(userSelectedData?: any) {
    var appValue = MockHttpClient.getHealthCheck(userSelectedData); 
    // .then((res) => res)
    // .catch((err)=>err);
                        // .try{
    
                        // }
    // var appValue = this.getHeathCheckList(userSelectedData);
                                // .then((data) => {return data;})
                                // .catch((err) => err); 
    var responseValue = appValue;
    // var serversValue = MockHttpClient.getAppServers;
    console.log(userSelectedData, 'inside the clickHealthChk');
    this.setState({
      customGroup: userSelectedData[0],
      serverType: userSelectedData[1],
      environment: userSelectedData[2],
      verbose: userSelectedData[3],
    });

    
    this.setState({ responseValue: appValue, requestValue: userSelectedData , checkResult : true});
    // console.log(this.state);
    // console.log(appValue);
    

  }


   
}