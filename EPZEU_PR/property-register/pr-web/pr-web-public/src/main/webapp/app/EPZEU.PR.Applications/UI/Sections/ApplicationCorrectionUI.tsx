import * as React from 'react';
import { BaseProps } from 'Cnsys.UI.React';
import { EPZEUBaseComponent } from 'EPZEU.Core';
import { observer } from "mobx-react";
import { SectionTitleUI } from "EPZEU.PR.ApplicationBase";
import { InitialApplicationData } from "../../Models/Sections/InitialApplicationData";

@observer export class ApplicationCorrectionUI extends EPZEUBaseComponent<BaseProps, InitialApplicationData> {

  constructor(props?: any) {
    super(props);
  }

  renderEdit(): JSX.Element {
    return (
      <>
        <SectionTitleUI titleKey={'PR_APPLICATION_CORRECTION_L'} anchor="applicationCorrection"/>
        {this.getInfo()}
      </>);
  }

  renderDisplay(): JSX.Element {

    return (<>
      <h2 className="section-title section-title--preview">{this.getResource("PR_APPLICATION_CORRECTION_L")}</h2>

      {this.getInfo()}
    </>);
  }

  private getInfo() {
    return (
      <div className="alert alert-info">
        <p>
          {this.getResource("PR_ON_INITIAL_APPLICATION_NO_L") + " " +
          this.model.incomingReauNumber + " " +
          this.getResource("PR_INITIAL_APPLICATION_REGNUM_L") + " " +
          this.model.registerNumber + "/" + this.model.registerDate.format("DD-MM-YYYY") + " " +
          this.getResource('GL_YEAR_ABBREVIATION_L') + " " +
          this.getResource('PR_INITIAL_APPLICATION_REGISTER_L') + " " +
          this.model.registerType.name + " " + this.getResource("PR_INITIAL_APPLICATION_REGISTRATION_OFFICE_L") + " " +
          this.model.registryOffice.name}
        </p>
      </div>);
  }
}
