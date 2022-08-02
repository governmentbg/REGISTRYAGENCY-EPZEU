import * as React from 'react';
import { EPZEUBaseComponent } from "EPZEU.Core";
import { BaseProps } from "Cnsys.UI.React";
import { ProcessStatuses } from '../Models/ProcessStatuses';


interface SendingUIProps extends BaseProps {
  processStatus: ProcessStatuses;
}

export class SendingUI extends EPZEUBaseComponent<SendingUIProps, any> {

  render(): JSX.Element {
    var styleCSS: any;

    if (this.props.processStatus == ProcessStatuses.ReadyForSending ||
      this.props.processStatus == ProcessStatuses.Sending) {
      styleCSS = { width: "30%" }
    }
    else {
      styleCSS = { width: "60%" }
    }


    return (
      <div className="page-wrapper">
        <section className="section-wrapper">
          <label className="field-title field-title--form">{this.getResource("GL_REGISTER_APPLICATION_L")}</label>
          <div className="progress progress--form">
            <div className="progress-bar progress-bar-striped progress-bar-animated bg-info" role="progressbar" aria-valuenow={30} aria-valuemin={0} aria-valuemax={100} style={styleCSS}></div>
          </div>
        </section>
      </div >);
  }
}
