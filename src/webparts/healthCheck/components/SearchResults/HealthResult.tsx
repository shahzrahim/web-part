import * as React from 'react';
import styles from './HealthResult.module.scss';
import { IHealthResultProps } from './IHealthResultProps';
import { escape } from '@microsoft/sp-lodash-subset';
import * as strings from 'HealthCheckWebPartStrings';
import { Spinner } from "office-ui-fabric-react";
var data: any = require('../../data/data.json');
var resultStyles = {
  color: "Red",
};


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
        resultData: data['Data'][0],
      };
      this.showResults = this.showResults.bind(this);
  }

public componentDidMount(): void {
    this.setState({groupselectedValues: this.props.Request, isLoading:false });

}
  //   componentWillReceiveProps is 
  public componentWillReceiveProps(nextProps: IHealthResultProps): void { 
    console.log(nextProps, 'this is the updated props');
    this.setState({groupselectedValues: nextProps.Request});
    this.updateInputs(nextProps);
    console.log(this.state, 'this is the state after updated Props');

      if(this.props.HealthResult === true ) {
        this.setState({groupselectedValues: nextProps.Request, isLoading : true });
      }  

      this.raiseCount();
      this.showLoader();
      
  }

  private showLoader(): any {
    this.setState({isLoading: true});
    // console.log('Outside the showLoader function',this.state.isLoading);
    setTimeout(()=> {
      this.setState({isLoading: false});
    },3000);


  }

  private raiseCount(): any {
    this.setState({ count : (this.state.count + 1)});
  }

  private updateInputs(nextProps): any {
    this.setState({
      customGroup: nextProps.customGroup,
      serverType: nextProps.serverType,
      environment: nextProps.environment,
      verbose: nextProps.verbose,

    });
  }

 

  private showResults(): any {
    let showData = this.state.resultData.Servers;
    var chkP: any;
    var chkF: any;
    var chkE: any;
    var checkBlock: any;


    var listItems = showData.map((server, i) => {
      resultStyles.color = server.Server.Color;
      
      if(this.state.verbose) {
        chkP = server.Server.Chk.P;
        chkF = server.Server.Chk.F;
        chkE = server.Server.Chk.E;
        checkBlock = (<div>(Chks: P:{chkP} F:{chkF} E:{chkE} )</div>);
      }

          return (
            <li key='server[i]'>
            {server.Server.DateTime}  <br/>
            {server.Server.Name} <br/> 
            (App:{this.state.resultData.AppName}) <br/>
            {checkBlock} 
            <div style={resultStyles}>{server.Server.Status} </div> <br/>
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
    const resultStyle =  { display: 'block', padding: '0 20px' };

    let check = (this.state.verbose) ? "On" : "Off";
    var loadingBlock = 
                      // tslint:disable-next-line: no-unused-expression
                      (<div> 
                        <div className={styles["spinner.large"]}>
                          <Spinner label={strings.loadingFeed} />
                        </div>
                      </div>); 
    var headerBlock = (<div className="headerBlock">
                        <p>
                        Running Health Check <br/>
                        Server/Group: {this.state.customGroup} Type: {this.state.serverType} ENV: {this.state.environment} Verbose Mode:{check}
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
    return (<div style={resultStyle}>
          {headerBlock} 
          {resultBlock}
        </div>
        );
    }
    // if(this.state.count !== 0 && !this.state.isLoading) {
    //     return (<div>
    //       {headerBlock} 
    //       {/* {resultBlock} */}
    //     </div>);
    // }




    
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