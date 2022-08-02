import { BaseProps } from 'Cnsys.UI.React';
import { EPZEUBaseComponent } from 'EPZEU.Core';
import { action } from 'mobx';
import { observer } from "mobx-react";
import * as React from "react";
import { ApplicationFormContextProps } from ".";
import { ApplicantExchange, SectionTitleUI } from '../../';

interface NRA100VatLawProps extends ApplicationFormContextProps, BaseProps {
    titleKey?: string;
    anchor?: string;
}

@observer export class NRA100VatLawUI extends EPZEUBaseComponent<NRA100VatLawProps, ApplicantExchange> {

    constructor(props?: NRA100VatLawProps) {
        super(props);

        this.onNRA_Art_100_1Selected = this.onNRA_Art_100_1Selected.bind(this);
        this.onNRA_Art_100_2Selected = this.onNRA_Art_100_2Selected.bind(this);
        this.onNothingSelected = this.onNothingSelected.bind(this);
    }

    renderEdit(): JSX.Element {
        return <>
            <SectionTitleUI anchor={this.props.anchor} titleKey={this.props.titleKey ? this.props.titleKey : 'CR_APP_00079_L'} />
            <div className="field-container">
                <div className="row">
                    <div className="col-12 form-group">
                        <div className="custom-control custom-radio">
                            <input className="custom-control-input" name="exampleRadiosA" id="exampleRadiosA1" onChange={this.onNothingSelected} value="option1" checked={!this.model.nrA_Art_100_1 && !this.model.nrA_Art_100_2} type="radio" />
                            <label className="custom-control-label" htmlFor="exampleRadiosA1">{this.getResource("CR_APP_00082_L")}</label>
                        </div>
                        <div className="custom-control custom-radio">
                            <input className="custom-control-input" name="exampleRadiosA" id="exampleRadiosA2" onChange={this.onNRA_Art_100_1Selected} value="option2" checked={!!this.model.nrA_Art_100_1} type="radio" />
                            <label className="custom-control-label" htmlFor="exampleRadiosA2">{this.getResource("CR_APP_00080_L")}</label>
                        </div>
                        <div className="custom-control custom-radio">
                            <input className="custom-control-input" name="exampleRadiosA" id="exampleRadiosA3" onChange={this.onNRA_Art_100_2Selected} value="option2" checked={!!this.model.nrA_Art_100_2} type="radio" />
                            <label className="custom-control-label" htmlFor="exampleRadiosA3">{this.getResource("CR_APP_00081_L")}</label>
                        </div>
                    </div>
                </div>
            </div>
        </>;
    }

    renderDisplay(): JSX.Element {
        return (
            <>
                {(this.model.nrA_Art_100_1 || this.model.nrA_Art_100_2) ?
                    <SectionTitleUI anchor={this.props.anchor} titleKey={this.props.titleKey ? this.props.titleKey : 'CR_APP_00079_L'} isForPreview /> :
                    <> <SectionTitleUI anchor={this.props.anchor} titleKey={this.props.titleKey ? this.props.titleKey : 'CR_APP_00079_L'} isForPreview />
                    <div className="field-container">
                        {this.getResource("CR_APP_00082_L")}
                    </div>
                </>}
                {!this.model.nrA_Art_100_1 && !this.model.nrA_Art_100_2 && (<div className="field-container"></div>)}
                {this.model.nrA_Art_100_1 && (<div className="field-container">{this.getResource("CR_APP_00080_L")}</div>)}
                {this.model.nrA_Art_100_2 && (<div className="field-container">{this.getResource("CR_APP_00081_L")}</div>)}
            </>);
    }

    @action onNothingSelected() {
        this.model.nrA_Art_100_1 = false;
        this.model.nrA_Art_100_2 = false;
    }

    @action onNRA_Art_100_1Selected() {
        this.model.nrA_Art_100_1 = true;
        this.model.nrA_Art_100_2 = false;
    }

    @action onNRA_Art_100_2Selected() {
        this.model.nrA_Art_100_1 = false;
        this.model.nrA_Art_100_2 = true;
    }
}