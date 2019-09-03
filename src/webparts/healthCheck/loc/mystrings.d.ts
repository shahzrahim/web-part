declare interface IHealthCheckWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  ListNameFieldLabel: string;
  PageTitleFieldLabel:string;
  PageCustom1FieldLabel:string;
  PageCustom2FieldLabel:string;
  PageCustom3FieldLabel:string;
  PageCustom4FieldLabel:string;
  PageSubmitBtnFieldLabel:string;
  PageCancelBtnFieldLabel:string;
  resultMessage: string;
  loadingFeed: string;
}

declare module 'HealthCheckWebPartStrings' {
  const strings: IHealthCheckWebPartStrings;
  export = strings;
}
