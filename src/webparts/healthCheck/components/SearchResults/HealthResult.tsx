import * as React from 'react';
import styles from './HealthResult.module.scss';
import { IHealthResultProps } from './IHealthResultProps';
import { escape } from '@microsoft/sp-lodash-subset';
import * as strings from 'HealthCheckWebPartStrings';
import { Spinner } from "office-ui-fabric-react";

export interface IHealthResultState {
    isLoading: boolean;
  }

export default class HealthResultControl extends React.Component<IHealthResultProps, IHealthResultState> {

  constructor(props: IHealthResultProps) {
      super(props);
      this.state = {
        isLoading: true
      };
  }

//   componentWillReceiveProps is 
public componentDidMount(): void {   
//     if (this.props.groupselectedValues !== nextProps.groupselectedValues && nextProps.groupselectedValues.length > 0) {   
//     if (this.CheckGroupValueExists(nextProps.groupselectedValues)) {
//       this.setState({ groupresults: [], myresults: [], isLoading: true });
//       if (this.props.groupselectedValues != undefined) {
//         if (this.props.groupselectedValues.length > 0) {
//           const commonService: common = new common();
//           commonService._clearCache(this._sessionStorageKey + this.custStoragekey_getNewsFeed + this.groupFeed);
//           commonService._clearCache(this._sessionStorageKey + this.custStoragekey_getNewsFeed + this.myFeed);
//         }       
//       this.GetFeedDataFromGraphAPI(nextProps.groupselectedValues);
//       //this.GetMyFeedDataFromGraphAPI();
//       this.setState({ hasGrp: true });
//     }
//     else {
//       this.setState({ hasGrp: false, isLoading: false });
//     }
//   }
// } 
    this.setState({isLoading:false});
    if(this.props.HealthResult === true) {return this.setState({isLoading : true});}
    
    // console.log('inside the will Receive Props');

}
  public render(): React.ReactElement<IHealthResultProps> {
    //const resultStyle = this.props.HealthResult ? { display: 'block' } : { display: 'none' };
    if (this.state.isLoading) {
        // we're currently loading
        return (<div className={styles["spinner.large"]}><Spinner label={strings.loadingFeed} />{strings.loadingFeed}</div>);
      }
    if (this.props.HealthResult === true){ 
      {this.setState({isLoading:true});}
    }
      
  
    const resultStyle =  { display: 'block' };
      return (
      <div className="results-contain">
        <div className={styles["results-contain"]}>
          <div className={styles["accountstatus"]}>
              <div className={styles["claim-account"]} style={resultStyle}>
                  <div>
                      <div className={styles["result-message"]}>{strings.resultMessage}</div>
                      <div className={styles["result-message"]}>{strings.resultMessage}</div>
                      <div className={styles["result-message"]}>{strings.resultMessage}</div>

                      <div className="message">{this.props.HealthResult}</div>
                  </div>
              </div>
          </div>
        </div> 
      </div>
        
      );
  }
}