import * as React from 'react';
import styles from './HealthResult.module.scss';
import { IHealthResultProps } from './IHealthResultProps';
import { escape } from '@microsoft/sp-lodash-subset';
import * as strings from 'HealthCheckWebPartStrings';
import { Spinner } from "office-ui-fabric-react";

export interface IHealthResultState {
    isLoading: boolean;
    count: number;
  }

export default class HealthResultControl extends React.Component<IHealthResultProps, IHealthResultState> {
  private sTimeout: any;

  constructor(props: IHealthResultProps) {
      super(props);
      this.sTimeout = setTimeout(() => this.loadingBlock(), 250);
      this.state = {
        isLoading: true,
        count: 0,
        
      };
  }

public componentDidMount(): void {
    console.log("inside didMount");
    
    this.setState({isLoading:false});
    if(this.props.HealthResult === true ) {return this.setState({isLoading : true, count: 1});}
  
  }
  //   componentWillReceiveProps is 
  public componentWillReceiveProps(nextProps: IHealthResultProps): void {   
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
      console.log('inside will receive props');
  
      
      
  
  }
  private raiseCount(): any {
    this.setState({ count : (this.state.count + 1)});
  }
  
  public render(): React.ReactElement<IHealthResultProps> {
    //const resultStyle = this.props.HealthResult ? { display: 'block' } : { display: 'none' };
    var loadingBlock = (<div className={styles["spinner.large"]}><Spinner label={strings.loadingFeed} /></div>);
    if (this.state.isLoading) {
        // we're currently loading
        // return setTimeout(() => loadingBlock, 2000);
        return loadingBlock;
      }
    if (this.props.HealthResult === true){ 
      console.log(this.state.count);
      {this.setState({isLoading:true});}
      this.raiseCount();
    }
    if(this.state.count !== 1) {
      return loadingBlock;
    }
  
    const resultStyle =  { display: 'block' };
      return (
      <div className="results-contain">
        <div className={styles["results-contain"]}>
          <div className={styles["accountstatus"]}>
              <div className={styles["claim-account"]} style={resultStyle}>
                  <div>
                      <div className={styles["result-message"]}>{strings.resultMessage}</div>
                  </div>
              </div>
          </div>
        </div> 
      </div>
        
      );


  }
}