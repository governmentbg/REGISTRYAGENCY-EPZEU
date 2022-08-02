﻿import { BindableReference, ObjectHelper } from 'Cnsys.Core';
import { AsyncUIProps, withAsyncFrame } from 'Cnsys.UI.React';
import { attributesClassFormControl, Authority, AutoComplete, EPZEUBaseComponent, Nomenclatures } from 'EPZEU.Core';
import { FieldContainerProps, withFieldRecordContainer } from 'EPZEU.CR.Domain';
import { action, observable } from "mobx";
import { observer } from 'mobx-react';
import * as React from "react";
import { F221_DepozitarDistraintRemove } from '../../Models/Fields/ModelsAutoGenerated';

interface F221_DepozitarDistraintRemoveProps extends FieldContainerProps, AsyncUIProps {

}

@observer class F221_DepozitarDistraintRemoveUI extends EPZEUBaseComponent<F221_DepozitarDistraintRemoveProps, F221_DepozitarDistraintRemove> {

    @observable private courtName: string = "";
    private persistedCourt: string;

    constructor(props?: F221_DepozitarDistraintRemoveProps) {
        super(props);


        this.selectAuthority = this.selectAuthority.bind(this);
        this.showAuthorityValue = this.showAuthorityValue.bind(this);
        this.handleAuthorityChange = this.handleAuthorityChange.bind(this);
        this.handleAuthoritySelectOption = this.handleAuthoritySelectOption.bind(this);
        this.initCourtName = this.initCourtName.bind(this);

        this.initCourtName();
        this.initAuthorityName();
    }

    componentDidUpdate(prevProps: FieldContainerProps, prevState: any, snapshot?: never): void {
        if (super.componentDidUpdate) 
            super.componentDidUpdate(prevProps, prevState, snapshot);

        if (this.model.court != this.persistedCourt)
            this.initCourtName();
    }

    initCourtName() {
        if (this.model.court) {
            this.persistedCourt = this.model.court;

            this.props.registerAsyncOperation(Nomenclatures.getCourts().bind(this).then(authorities => {
                var corts = authorities.filter(authority => authority.authorityID == +this.model.court);

                if (corts && corts.length > 0) {
                    this.courtName = corts[0].authorityName;
                }
                else {
                    this.courtName = "";
                }
            }));
        }else {
            this.persistedCourt = null;
            this.courtName = "";
        }
    }


    renderEdit(): JSX.Element {
        return <div className="row">
            <div className="form-group col-lg-6">
                {this.labelFor(x => x.court, "GL_COURT_CODE_L")}
                <AutoComplete fullHtmlName="courtName"
                    modelReference={new BindableReference(this, "courtName")}
                    selector={this.selectAuthority}
                    showValue={this.showAuthorityValue}
                    handleSelectCallback={this.handleAuthoritySelectOption}
                    hasSelectedValue={this.model.court ? true : false}
                    handleChangeCallback={this.handleAuthorityChange}
                    triggerLength={1}
                    attributes={attributesClassFormControl}/>
            </div>
            <div className="form-group col-sm-6">
                {this.labelFor(x => x.caseNo, "CR_APP_COURT_NUMBER_L")}
                {this.textBoxFor(x => x.caseNo)}
            </div>
        </div>
    }

    renderDisplay(): JSX.Element {
        return <>
            {this.courtName && <>{this.getResource('GL_COURT_CODE_L') + ": " + this.courtName}</>}
            {(this.courtName && this.model.caseNo) && ', '}
            {this.model.caseNo && <>{this.getResource('CR_APP_COURT_NUMBER_L') + ": " + this.model.caseNo} </>}
        </>
    }


    //#region Authority

    selectAuthority(value: string): Promise<Authority[]> {
        var valueLowerCase = value.toLowerCase();

        if (valueLowerCase.trim() != "")
            return Nomenclatures.getCourts().then(s => {
                return s.filter(s => {
                    let authorityCheck: string = s.authorityID.toString().toLowerCase() + " - " + s.authorityName.toLowerCase();

                    return authorityCheck.indexOf(" " + valueLowerCase) > -1
                        || authorityCheck.indexOf("(" + valueLowerCase) > -1  // special case for (НАП).
                        || authorityCheck.indexOf(valueLowerCase) == 0;
                }
                );
            }
            );
        else
            return Promise.resolve([]);
    }

    showAuthorityValue(value: Authority): string {
        return value.authorityID.toString() + " - " + value.authorityName;
    }

    initAuthorityName() {
        if (!ObjectHelper.isStringNullOrEmpty(this.model.court)) {
            this.props.registerAsyncOperation(Nomenclatures.getCourts().then(authorities => {
                this.courtName = authorities.filter(authority => authority.authorityID == +this.model.court)[0].authorityName
            }));
        } else
            this.courtName = "";
    }

    @action handleAuthorityChange() {
        this.model.court = null;
    }

    @action handleAuthoritySelectOption(value?: Authority) {
        if (value) {
            this.model.court = value.authorityID.toString();
            this.courtName = value.authorityName;
        }
    }

    //#endregion
}

export const F221_DepozitarDistraintRemoveFieldUI = withAsyncFrame(withFieldRecordContainer(F221_DepozitarDistraintRemoveUI, {
    fieldLabelTextKey: "CR_F_221_L",
}));