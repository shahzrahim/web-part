import * as React from 'react';
import styles from './HealthResult.module.scss';
import { IHealthResultProps } from './IHealthResultProps';
import { escape } from '@microsoft/sp-lodash-subset';
import * as strings from 'HealthCheckWebPartStrings';
import { Spinner } from "office-ui-fabric-react";
var data: any = require('../../data/data.json');


export interface IHealthResultState {
    isLoading: boolean;
    count: number;
    groupselectedValues: any;
    customGroup:string;
    serverType:string;
    environment:string;
    verbose: boolean; 
    resultData: any;
  }

export default class HealthResultControl extends React.Component<IHealthResultProps, IHealthResultState> {
  private sTimeout: any;

  constructor(props: IHealthResultProps) {
      super(props);
      // this.sTimeout = setTimeout(() => this.loadingBlock(), 250);
      this.state = {
        isLoading: false,
        count: 0,
        groupselectedValues : this.props.Request,
        customGroup:"",
        serverType:"",
        environment:"",
        verbose:null,
        resultData: data['Data'][0].Servers
      };
      this.showResults = this.showResults.bind(this);
  }

public componentDidMount(): void {
    console.log("inside didMount");
    console.log('retrieve data', this.state.resultData);
    
 
    
    this.setState({isLoading:false, groupselectedValues: this.props.Request});

  
}
  //   componentWillReceiveProps is 
  public componentWillReceiveProps(nextProps: IHealthResultProps): void { 
      if(this.props.HealthResult === true ) {
        this.setState({isLoading : true, count: 1, groupselectedValues: this.props.Request});
      }  
  
      console.log('inside will receive props',this.props.Request);
      if (nextProps.Request != this.props.Request) {
        this.setState({groupselectedValues: nextProps.Request});
        this.updateInputs(this.state.groupselectedValues);
      }

      
      this.raiseCount();
      this.showLoader();
      
  }

  private showLoader(): any {
    this.setState({isLoading: true});
    console.log('Outside the showLoader function',this.state.isLoading);
    setTimeout(()=> {
      this.setState({isLoading: !this.state.isLoading});
      console.log('within the showLoader function',this.state.isLoading);
    },4000);


  }

  private raiseCount(): any {
    this.setState({ count : (this.state.count + 1)});
  }

  private updateInputs(groupselectedValues): any {
    this.setState({
      customGroup: groupselectedValues[0],
      serverType: groupselectedValues[1],
      environment: groupselectedValues[2],
      verbose: groupselectedValues[3],

    });
  }

  private showResults(): any {

    var listItems = this.state.resultData.map((server) => {
      console.log(server.Server, 'inside showResults');
      return (
        <li key="{server.Server['Name']}">
          {server.Server['Name']} <br/>
          {server.Server['Color']} <br/>
          {server.Server['Status']} <br/>
        </li>
      );
    });

    return (
        <ul>
          {listItems}
        </ul>
    );
  }

  
  public render(): React.ReactElement<IHealthResultProps> {
    //const resultStyle = this.props.HealthResult ? { display: 'block' } : { display: 'none' };
    let check = (this.state.verbose) ? "On" : "Off";
    var loadingBlock = 
                      // tslint:disable-next-line: no-unused-expression
                      (<div> 
                        <div className={styles["spinner.large"]}>
                          <Spinner label={strings.loadingFeed} />
                        </div>
                      </div>); 
    var headerBlock = (<div>
                        <p>
                        Running Health Check <br/>
                        Server/Group: "{this.state.customGroup}" Type: "{this.state.serverType}" ENV: "{this.state.environment}" Verbose Mode:"{check}"
                        </p>
                      </div>);
    var resultBlock = this.showResults();
    
    if(this.state.count === 0) {
      resultBlock = (<div>
         <div className={styles["result-message"]}>Please complete form to check for Health Status</div>
        {/* // <div>{strings.initalFeed}</div> */} 
      </div>);
    }

    if(this.state.count !== 0 && this.state.isLoading) {
        resultBlock = (<div>
          {headerBlock} 
          {loadingBlock}
        </div>
        );
    }
    if(this.state.count !== 0 && !this.state.isLoading) { 
      return (
        <div>
          {headerBlock} 
          {resultBlock}
          {/* {this.showResults()} */}
        </div>
        );
    }
    // if(this.state.count !== 0 && !this.state.isLoading) {
    //     return (<div>
    //       {headerBlock} 
    //       {/* {resultBlock} */}
    //     </div>);
    // }




    const resultStyle =  { display: 'block' };
      return (
      <div className="results-contain">
        <div className={styles["results-contain"]}>
          <div className={styles["accountstatus"]}>
              <div className={styles["claim-account"]} style={resultStyle}>
                  <div>
                      {/* <div className={styles["result-message"]}>{strings.initalFeed}</div>
                      <div>{strings.initalFeed}</div> */}
                      {resultBlock}
                  </div>
              </div>
          </div>
        </div> 
      </div>
        
      );


  }

}
  //   componentWillReceiveProps is 
  // public componentWillReceiveProps(nextProps: IHealthResultProps): void {   
    //     if (this.props.groupselectedValues !== nextProps.groupselectedValues && nextProps.groupselectedValues.length > 0) {   
    //     if (this.CheckGroupValueExists(nextProps.groupselectedValues)) {
    //       this.setState({ groupresults: [], myresults: [], isLoading: true });
    //       if (this.props.groupselectedValues != undefined) {
    //         if (this.props.groupselectedValues.length > 0) {
    //           const commonService: common = new common();
    //           commonService._clearCache(this._sessionStorageKey + this.custStoragekey_getNewsFeed + this.groupFeed);
    //           commonService._clearCache(this._sessionStorageKey + this.custStoragekey_getNewsFeed + this.myFeed);
    //         }       
    //       this.GetFeedDataFromGraphAPI(nextProps.groupselectedValues);
    //       //this.GetMyFeedDataFromGraphAPI();
    //       this.setState({ hasGrp: true });
    //     }
    //     else {
    //       this.setState({ hasGrp: false, isLoading: false });
    //     }
    //   }
    // } 
        // console.log('inside the will Receive Props');
        // console.log(this.props);
        
        // var newProps = this.nextProps;
        // // console.log(newProps);
        // this.setState({isLoading:false});
    
    
        // if(this.nextProps.HealthResult !== true ) {return this.setState({isLoading : true});}