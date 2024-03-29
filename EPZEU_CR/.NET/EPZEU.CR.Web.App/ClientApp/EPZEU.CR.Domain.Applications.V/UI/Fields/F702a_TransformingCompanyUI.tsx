﻿import { AsyncUIProps, withAsyncFrame } from "Cnsys.UI.React";
import { Country, EPZEUBaseComponent, Nomenclatures } from 'EPZEU.Core';
import { Address, ListRecordsContainerProps, PersonTypes, PersonUI, withFieldSingleListRecordsContainer, Person } from 'EPZEU.CR.Domain';
import { observer } from 'mobx-react';
import * as React from "react";
import { F702a0_TransformingCompany2 } from '../../Models/Fields/ModelsAutoGenerated';

interface F702a_TransformingCompanyProps extends ListRecordsContainerProps, AsyncUIProps {
    onUICChange?: (uic: string) => void;
}

@observer class F702a_TransformingCompanyUI extends EPZEUBaseComponent<F702a_TransformingCompanyProps, F702a0_TransformingCompany2> {

    constructor(props: F702a_TransformingCompanyProps) {
        super(props);

        this.onHasForeignTraderCheckChanged = this.onHasForeignTraderCheckChanged.bind(this);
    }

    componentDidMount() {
        // инициализира се тук, а не в manager-a, защото като се добави нов запис не се минава през manager-a.
        if (this.model.subject && !this.model.subject.countryName) {
            Nomenclatures.getBGCountry().then((bg: Country) => {
                this.model.subject.countryName = bg.name;
            });
        }
    }

    renderEdit(): JSX.Element {
        return (
            <>
                <PersonUI
                    {...this.bind(m => m.subject, 'transformingCompany')}
                    onHasForeignTraderCheckChanged={this.onHasForeignTraderCheckChanged}
                    PersonType={PersonTypes.TransformingCompany702a802a}
                    onUICChange={this.props.onUICChange}
                />
            </>
        )
    }

    renderDisplay(): JSX.Element {
        return (
            <>
                <PersonUI
                    {...this.bind(m => m.subject, 'transformingCompany')}
                    PersonType={PersonTypes.TransformingCompany702a802a} />
            </>
        );
    }

    private onHasForeignTraderCheckChanged(): void {
        this.model.subject.clearErrors();
        this.model.subject.foreignRegisterCode = null;
        this.model.subject.foreignLegalFormCode = null;
        this.model.subject.registrationNumber = null;
        this.model.subject.indent = null;
        this.model.subject.competentAuthorityForRegistration = null;
        this.model.subject.foreignLegalForm = null;
        this.model.subject.legalForm = null;
        this.model.subject.foreignRegister = null;
        this.model.subject.countryCode = null;
        this.model.subject.countryCodeBRIS = null;
        this.model.subject.countryID = null;
        this.model.subject.countryName = null;

        if (this.model.subject.isForeignTrader) {
            this.model.address = new Address();
        } else {
            this.model.address = null;
        }

        if (this.model.subject.isForeignTrader == false) {
            Nomenclatures.getBGCountry().then((bg: Country) => {
                this.model.subject.countryName = bg.name;
            });
        }
    }
}

export const F702a_TransformingCompanyFieldListUI = withFieldSingleListRecordsContainer(withAsyncFrame(F702a_TransformingCompanyUI), F702a0_TransformingCompany2, {
    listSelector: m => m.transformingCompany2List,
    addButtonLabelKey: 'CR_APP_ADD_COMPANY_L',
    fieldLabelTextKey: "CR_F_702a_L",
    hasAtLeastOneRecord: true,
    isMandatoryField: true,
    newRecordCtor: () => {
        return Nomenclatures.getBGCountry().then(bgCountry => {
            var obj = new F702a0_TransformingCompany2();

            obj.subject = new Person();
            obj.subject.countryCode = bgCountry.code;
            obj.subject.countryID = bgCountry.id;
            obj.subject.countryName = bgCountry.name;

            return obj;
        })
    }
});