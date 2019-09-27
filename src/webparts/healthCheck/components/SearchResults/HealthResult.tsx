import * as React from 'react';
import styles from './HealthResult.module.scss';
import { IHealthResultProps } from './IHealthResultProps';
import { escape } from '@microsoft/sp-lodash-subset';
import * as strings from 'HealthCheckWebPartStrings';
import { Spinner } from "office-ui-fabric-react";
import { any } from 'prop-types';
var data: any = require('../../data/data.json');
var resultStyles = {
  color: "Red",
};


export interface IHealthResultState {
  isLoading: boolean;
  count: number;
  groupselectedValues: any;
  customGroup: string;
  serverType: string;
  environment: string;
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
      groupselectedValues: this.props.Request,
      customGroup: "",
      serverType: "",
      environment: "",
      verbose: null,
      resultData: data['Data'][0],
    };
    this.showResults = this.showResults.bind(this);
  }

  public componentDidMount(): void {
    this.setState({ groupselectedValues: this.props.Request, isLoading: false });

  }


  //   componentWillReceiveProps is 
  public componentWillReceiveProps(nextProps: IHealthResultProps): void {
    this.setState({ groupselectedValues: nextProps.Request });


    
    // for (let key in newData) {
    //   console.log(nextProps,'this is within will recieve');
    // }

    this.setState({ resultData: nextProps.Response });

    console.log(nextProps.Response,'this is within will recieve');

    
    this.updateInputs(nextProps);



    if (this.props.HealthResult === true) {
      this.setState({ groupselectedValues: nextProps.Request, isLoading: true });
    }

    this.raiseCount();
    this.showLoader();

    if (nextProps.count === 0) {
      this.setState({ count: 0 });
    }

  }

  private showLoader(): any {
    // this.setState({})
    this.setState({ isLoading: true });
    // console.log('Outside the showLoader function',this.state.isLoading);
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 3000);


  }

  private raiseCount(): any {
    this.setState({ count: (this.state.count + 1) });
  }

  private updateInputs(nextProps): any {
    this.setState({
      customGroup: nextProps.customGroup,
      serverType: nextProps.serverType,
      environment: nextProps.environment,
      verbose: nextProps.verbose,

    });
  }



  // the function that is called to map response and check for errors
  private showResults(): any {

    // update below variables with response from API using this.props.Request
    if (this.state.resultData) {
      let status = this.state.resultData.Status;
      let showData = this.state.resultData.Servers;
      console.log(this.state.resultData, 'this is showData');
      
      var chkP: any;
      var chkF: any;
      var chkE: any;
      var checkBlock: any;
      let ulStyles = {
        backgroundColor: "#ecebeb",
        listStyleType: "none",
        fontWeight: 'bold' as 'bold',
        height: 315,
        overflow: "auto"
      };

      var listItems = showData.map((server, i) => {
        resultStyles.color = server.Server.Color;

        //if verbose is checked, will iterate through Chks and display
        if (this.state.verbose) {
          chkP = server.Server.Chk.P;
          chkF = server.Server.Chk.F;
          chkE = server.Server.Chk.E;
          checkBlock = (<div>(Chks: P:{chkP} &nbsp; F:{chkF} &nbsp; E:{chkE} )</div>);
        }


        return (
          <div key='server[i]' style={resultStyles}>
            {server.Server.DateTime} &nbsp;
            {server.Server.Name} &nbsp;
            (App:{this.state.resultData.AppName}) &nbsp;
            {checkBlock}
          </div>
        );

      });

      let resultList = (<div style={ulStyles}>

        <ul className={styles["dataList"]} >
          {listItems}
        </ul>
      </div>
      );
      
          //Handling of JSON statuses
          if (!showData || status === "error" || status === "failure") {
            return (<div>
              There was an error when attempting to collect Health Check Data.<br />
              Please try again later.
            </div>);
          }
      
          if (status.toLowerCase() === "finish") {
            return resultList;
          }
      
          if (status.toLowerCase() === 'continue') {
            return (
              <div>
      
                <div style={ulStyles}>
      
                  <ul className={styles["dataList"]} >
                    {listItems}
                  </ul>
                </div>
                <div className={styles["spinner.large"]}>
                  <Spinner />
                </div>
      
              </div>
            );
          }
    }



  }


  public render(): React.ReactElement<IHealthResultProps> {
    //const resultStyle = this.props.HealthResult ? { display: 'block' } : { display: 'none' };
    const resultStyle = { display: 'block', padding: '0 20px' };
    var headerBlock;
    let check = (this.state.verbose) ? "On" : "Off";
    var loadingBlock =
      // tslint:disable-next-line: no-unused-expression
      (<div>
        <div className={styles["spinner.large"]}>
          <Spinner label={strings.loadingFeed} />
        </div>
      </div>);
    if (this.state.serverType !== "") {
      headerBlock = (<div className="headerBlock">
        <p>
          Running Health Check <br />
          Server/Group: {this.state.customGroup}  &nbsp; Type: {this.state.serverType}  &nbsp; ENV: {this.state.environment} &nbsp; Verbose Mode:{check}
        </p>
      </div>);
    } else {
      headerBlock = (<div className="headerBlock">
        <p>
          Running Health Check <br />
          Server/Group: {this.state.customGroup} &nbsp; ENV: {this.state.environment}  &nbsp; Verbose Mode:{check}
        </p>
      </div>);
    }
    // var resultBlock = this.showResults();
    var resultBlock:any;


    if (this.state.count === 0) {
      resultBlock = (<div>
        <div className={styles["result-message"]}>Please complete form to check for Health Status</div>
      </div>);
    }

    if (this.state.count !== 0 && this.state.isLoading) {
      resultBlock = (<div>
        {headerBlock}
        {loadingBlock}
      </div>
      );
    }
    if (this.state.count !== 0 && !this.state.isLoading) {
      resultBlock = this.showResults();
      return (<div style={resultStyle}>
        {headerBlock}
        {resultBlock}
      </div>
      );
    }

    return (
      <div className="results-contain">
        <div className={styles["results-contain"]}>
          <div className={styles["accountstatus"]}>
            <div className={styles["claim-account"]} ref='myscroll' style={resultStyle}>
              <div>
                {resultBlock}
              </div>
            </div>
          </div>
        </div>
      </div>

    );


  }

}