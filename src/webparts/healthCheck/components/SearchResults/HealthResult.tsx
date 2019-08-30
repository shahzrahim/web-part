import * as React from 'react';
import styles from './HealthResult.module.scss';
import { IHealthResultProps } from './IHealthResultProps';
import { escape } from '@microsoft/sp-lodash-subset';
import * as strings from 'HealthCheckWebPartStrings';

export default class HealthResultControl extends React.Component<IHealthResultProps, {}> {

  constructor(props: IHealthResultProps) {
      super(props);
  }

  public render(): React.ReactElement<IHealthResultProps> {
    //const resultStyle = this.props.HealthResult ? { display: 'block' } : { display: 'none' };
    const resultStyle =  { display: 'block' }
      return (
       
        
          <div className={styles["accountstatus"]}>
              <div className={styles["claim-account"]} style={resultStyle}>
                  <div>
                      <div className={styles["result-message"]}>{strings.resultMessage}</div>
                  </div>
              </div>
          </div>
        
      );
  }
}