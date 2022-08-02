import * as React from 'react';
import { observer } from 'mobx-react';
import { observable, runInAction } from 'mobx';
import * as moment from 'moment';
import { BaseProps, ViewMode } from 'Cnsys.UI.React';
import { EPZEUBaseComponent, Nomenclatures, ForeignCommercialRegister } from 'EPZEU.Core';
import { BRISMesageDetails } from '../Models/BRISModels';

@observer export class BRISMesageDetailsUI extends EPZEUBaseComponent<BaseProps, BRISMesageDetails> {
    @observable private foreignRegister: ForeignCommercialRegister;
    @observable private foreignRegNotFound: boolean;

    constructor(props?: BaseProps) {
        super(props);

        //Init
        if (this.props.viewMode == ViewMode.Display) {
            this.foreignRegNotFound = false;
            let that = this;

            Nomenclatures.getForeignComRegistersCache(el => el.code == this.model.foreignRegisterCode).then(frs => {
                if (frs && frs.length == 1) {
                    runInAction(() => {
                        that.foreignRegister = frs[0];
                        that.foreignRegNotFound = false;
                    });
                } else {
                    runInAction(() => {
                        that.foreignRegNotFound = true;
                    });
                }
            });
        }
    }

    renderEdit(): JSX.Element {
        return null;
    }

    renderDisplay(): JSX.Element {

        if (this.foreignRegister) {
            return (
                <>
                    <div className="field-container">
                        <h3 className="field-title field-title--preview">{this.getResource('GL_DATE_TIME_L')}</h3>
                        <p className="field-text">{this.dateDisplayFor(moment(this.model.messageTime), `DD.MM.YYYY ${this.getResource('GL_YEAR_ABBREVIATION_L')} HH:mm:ss`)}</p>
                    </div>
                    <h2 className="section-title section-title--preview">{this.getResource('GL_ISSUING_ORGANISATION_L')}</h2>
                    <div className="field-container">
                        <h3 className="field-title field-title--preview">{this.getResource('GL_COUNTRY_L')}</h3>
                        <p className="field-text">{this.model.countryName}</p>
                    </div>
                    <div className="field-container">
                        <h3 className="field-title field-title--preview">{this.getResource('GL_REGISTER_L')}</h3>
                        <p className="field-text">{this.foreignRegister.nameOriginal}</p>
                    </div>
                </>);
        }

        if (this.foreignRegNotFound) {
            return (<div className="alert-danger alert">{this.getResource('GL_ERROR_L')}</div>);
        }

        return null;
    }
}