import { DocumentTemplateFields, Nomenclatures } from 'EPZEU.Core';
import { A18 } from '../Models/ApplicationForms/ApplicationFormsA';
import { IF22ApplicationFormManager } from './A8FormManager';
import { ApplicationFormABaseManager } from './ApplicationFormABaseManager';

export class A18FormManager extends ApplicationFormABaseManager<A18> implements IF22ApplicationFormManager {

    constructor() {
        super()

        this.isForeignTraderSelectedCountryCodeBRISEqualTo = this.isForeignTraderSelectedCountryCodeBRISEqualTo.bind(this);
        this.prepareForSave = this.prepareForSave.bind(this);
    }

    protected createApplication(obj: any): A18 {
        return new A18(obj);
    }

    public hasForeignTraderCountryRegistry(): Promise<boolean> {

        if (this.application.fields.foreignTraders && this.application.fields.foreignTraders.foreignTraderCountry) {
            let brisCountryCode = this.application.fields.foreignTraders.foreignTraderCountry.countryCodeBRIS

            return Nomenclatures.getForeignComRegistersCache().then(fcr => {
                if (fcr.filter(x => x.countryCode == brisCountryCode).length > 0)
                    return true;
                else
                    return false;
            });
        } else
            return Promise.resolve(false);
    }

    public hasForeignTraderCountryLegalForms(): Promise<boolean> {
        if (this.application.fields.foreignTraders && this.application.fields.foreignTraders.foreignTraderCountry) {
            let brisCountryCode = this.application.fields.foreignTraders.foreignTraderCountry.countryCodeBRIS

            return Nomenclatures.getForeignLegalForms().then(lf => {
                if (lf.filter(x => x.countryCode == brisCountryCode).length > 0)
                    return true;
                else
                    return false;
            });
        } else
            return Promise.resolve(false);
    }

    public hasForeignTraderSelectedCountryCode(): boolean {

        return (this.application.fields.foreignTraders
            && this.application.fields.foreignTraders.foreignTraderCountry
            && this.application.fields.foreignTraders.foreignTraderCountry.countryCode) ? true : false;
    }

    public isForeignTraderSelectedCountryCodeBRISEqualTo(codeBRIS: string): boolean {

        return (this.application.fields.foreignTraders
            && this.application.fields.foreignTraders.foreignTraderCountry
            && this.application.fields.foreignTraders.foreignTraderCountry.countryCodeBRIS == codeBRIS) ? true : false;
    }

    public prepareForSave(): Promise<void> {

        //Преди запазване на данните се проверява регистъра и правната форма от какъв тип са, и се нулират ненужните данни. Това се прави защото, когато се пусне
        //заяление за промяна, промени има избрана държава с възможни регистри за избиране и след това се върне първоначалното състояние на регистъра и на правната форма.
        var that = this;

        if (this.application.fields.foreignTraders.foreignTraderRegistration.foreignLegalFormCode) {
            return Nomenclatures.getForeignLegalForms(x => x.code == this.application.fields.foreignTraders.foreignTraderRegistration.foreignLegalFormCode)
                .then(legalForms => {
                    let isOther = legalForms && legalForms.length > 0 && (legalForms[0].isOther === true);

                    if (!isOther) {
                        that.hasForeignTraderCountryLegalForms().then(has => {
                            if (has)
                                that.application.fields.foreignTraders.foreignTraderRegistration.legalForm = "";
                            else
                                that.application.fields.foreignTraders.foreignTraderRegistration.foreignLegalFormCode = "";
                        })
                    }

                    if (this.application.fields.foreignTraders.foreignTraderRegistration.foreignRegisterCode) {
                        return Nomenclatures.getForeignComRegistersCache(x => x.code == this.application.fields.foreignTraders.foreignTraderRegistration.foreignRegisterCode)
                            .then(registers => {
                                let isOther = registers && registers.length > 0 && (registers[0].isOther === true);

                                if (!isOther) {
                                    that.hasForeignTraderCountryRegistry().then(has => {
                                        if (has)
                                            that.application.fields.foreignTraders.foreignTraderRegistration.register = "";
                                        else
                                            that.application.fields.foreignTraders.foreignTraderRegistration.foreignRegisterCode = "";
                                    })
                                }
                                return Promise.resolve();
                            });
                    }
                    else {
                        return Promise.resolve();
                    }
                });
        }
        else if (this.application.fields.foreignTraders.foreignTraderRegistration.foreignRegisterCode) {
            return Nomenclatures.getForeignComRegistersCache(x => x.code == this.application.fields.foreignTraders.foreignTraderRegistration.foreignRegisterCode)
                .then(registers => {
                    let isOther = registers && registers.length > 0 && (registers[0].isOther === true);

                    if (!isOther) {
                        that.hasForeignTraderCountryRegistry().then(has => {
                            if (has)
                                that.application.fields.foreignTraders.foreignTraderRegistration.register = "";
                            else
                                that.application.fields.foreignTraders.foreignTraderRegistration.foreignRegisterCode = "";
                        })
                    }

                    return Promise.resolve();
                });
        }
        else {
            return Promise.resolve();
        }
    }

    public getTemplateFieldData(templateFields: DocumentTemplateFields): string {

        if (templateFields == DocumentTemplateFields.NRA_CORRESPONDENCE_ADDRESS) {
            if (this.application.fields.seatForCorrespondence && this.application.fields.seatForCorrespondence.address) {
                return this.convertAddressToString(this.application.fields.seatForCorrespondence.address);
            }
        }

        return super.getTemplateFieldData(templateFields);
    }
}