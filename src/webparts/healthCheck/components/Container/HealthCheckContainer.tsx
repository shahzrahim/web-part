import * as React from 'react';
import styles from './HealthCheckContainer.module.scss';
import { IHealthCheckContainerProps } from './IHealthCheckContainerProps';
import { IHealthCheckContainerState } from './IHealthCheckContainerProps';
import Healthsearch from '../Search/HealthCheck';
import SearchResults from '../SearchResults/HealthResult';
import {
  IWebPartContext
} from '@microsoft/sp-webpart-base';
import * as strings from 'HealthCheckWebPartStrings';
import MockHttpClient from '../Search/MockHttpClient';
import { SPHealthCheckResultsService } from './SPHealthCheckResultsService';
import ls from 'local-storage';




export default class HealthCheckContainer extends React.Component<IHealthCheckContainerProps, IHealthCheckContainerState> {
  private _sessionStorageKey: string = "Deltanet_GroupWPFeed";
  private custStoragekey_Selectedgroupnames = "_SelGroupNamesWPFeed";
  private currContext: IWebPartContext;
  private _emailID: string;
  private listResultsService: SPHealthCheckResultsService;

  constructor(props: IHealthCheckContainerProps, context?: IWebPartContext) {
    super(props);
    this.currContext = props.context;
    this.listResultsService = new SPHealthCheckResultsService(this.currContext);
    this.state = {
      checkResult: false, searchValue: [], responseValue: [], requestValue: [],
      verbose: null,
      customGroup: "",
      serverType: "",
      environment: "",
      sessionKey: String(Math.floor(Math.random() * 10)),
      count: 0,
      status: "Finish",
    };

    this.clickHealthChk = this.clickHealthChk.bind(this);
    this.clickCancelbttn = this.clickCancelbttn.bind(this);
    this.getHeathCheckList = this.getHeathCheckList.bind(this);
  }

  public componentDidMount() {
    localStorage.setItem('session-key', this.state.sessionKey);
    if (this.state.status.toLowerCase() === 'continue') { this.clickHealthChk(this.state.requestValue); }
  }


  public clickCancelbttn() {
    this.setState({ count: 0, checkResult: false });
    console.log(this.state, 'within container, cancel is checked');

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
                  <Healthsearch onSaveClick={this.clickHealthChk}
                    onCancelClick={this.clickCancelbttn} listName={this.props.listName} HealthCheckPageTitle={this.props.HealthCheckPageTitle} HealthCheckCustomLabel1={this.props.HealthCheckCustomLabel1}
                    HealthCheckCustomLabel2={this.props.HealthCheckCustomLabel2} HealthCheckCustomLabel3={this.props.HealthCheckCustomLabel3} HealthCheckCustomLabel4={this.props.HealthCheckCustomLabel4} HealthCheckCustomButton1={this.props.HealthCheckCustomButton1}
                    HealthCheckCustomButton2={this.props.HealthCheckCustomButton2} context={this.props.context} HealthCheckSharepointListName={this.props.HealthCheckSharepointListName} HealthCheckSharepointUrl={this.props.HealthCheckSharepointURL} />
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
                      count={this.state.count}
                      status={this.state.status}
                      onStatusUpdate={this.getHeathCheckList}
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

  // private updateStatevalue(statevalue?: any) {
  //   if (statevalue !== undefined || statevalue !== null) {
  //     if (statevalue.dataType !== undefined) {
  //       var tempStateVal = statevalue.dataValue;
  //       // this.setState({ searchValue: tempStateVal });
  //     }
  //   }
  // }

  // //hardcoded function to recall after status has been set to Continue
  private getHeathCheckList(requestValue: any) {
    console.log('second call getting hit');

    this.setState({ status: "Finish" });
    var serviceResults = this.listResultsService.getHealthCheckList(requestValue, this.state.sessionKey, this.state.status);
    serviceResults.then((responseJSON: any) => {
      if (responseJSON != null) {

        for (let key in responseJSON.Data) {
          console.log(responseJSON.Data[key].Status, 'this is the status from returned JSON');
          var data = responseJSON.Data[key];
          this.setState({ status: "Finish" });
          var tempData = this.state.responseValue;

          var newServs = tempData.Servers;

          console.log(data.Servers, 'list of current servers');
          for (let key2 in data.Servers) {

            newServs.push(data.Servers[key2]);
            
            // this.setState({responseValue: newServs.push(data.Servers[key2])});
          }
          console.log(newServs, 'this is updated server list');
        }



      }
    }).catch((err: any) => console.log(err));


  }

  private clickHealthChk(userSelectedData?: any) {
    // var AzureUrl = this.props.HealthCheckAzureUrl;
    // var appValue = MockHttpClient.getHealthCheck(AzureUrl, this.state.sessionKey, userSelectedData);
    // AppValue should return data.response and headers.
    // we check for headers of sessionKeyRes in getHealthCheck 
    // and compare it to localStorage.getItem('session-key')
    let data: any;
    var serviceResults = this.listResultsService.getHealthCheckList(userSelectedData, this.state.sessionKey, "Continue");
    serviceResults.then((responseJSON: any) => {
      if (responseJSON != null) {

        for (let key in responseJSON.Data) {
          console.log(responseJSON.Data[key].Status, 'this is the status from returned JSON');
          data = responseJSON.Data[key];
          this.setState({ status: responseJSON.Data[key].Status });
          console.log(data, 'this is data');

        }
        console.log(data, 'this is data');
        // this.setState({responseValue: data});

        if (data.Status === "Finish") {
          console.log(this.state.status, 'is working');
          this.setState({ responseValue: data });
          console.log(this.state.responseValue, 'this is what is being sent');
        }
        if (data.Status === "Continue") {
          console.log(this.state.status, 'is working');
          this.setState({ responseValue: data });
          console.log(this.state.responseValue, 'this is what is being sent');

          this.getHeathCheckList(userSelectedData);
        }

      }
    }).catch((err: any) => console.log(err));

    // serviceResults.then
    //bind finish scenario
    //continue scenario, display result and call service results again with the expectation of finish status. -


    var countAdd = this.state.count + 1;
    this.setState({
      customGroup: userSelectedData[0],
      serverType: userSelectedData[1],
      environment: userSelectedData[2],
      verbose: userSelectedData[3],
      count: countAdd,
    });


    this.setState({ requestValue: userSelectedData, checkResult: true });
    console.log(this.state.status.toLowerCase());

  }

}