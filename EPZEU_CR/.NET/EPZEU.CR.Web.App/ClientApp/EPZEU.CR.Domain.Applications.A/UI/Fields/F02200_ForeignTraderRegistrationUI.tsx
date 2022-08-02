import { BindableReference, ObjectHelper } from 'Cnsys.Core';
import { AsyncUIProps, ViewMode, withAsyncFrame } from 'Cnsys.UI.React';
import { attributesClassFormControl, AutoComplete, EPZEUBaseComponent, ForeignCommercialRegister, ForeignLegalForm, Nomenclatures } from 'EPZEU.Core';
import { ApplicationFormContextProps, RecordContainerProps, withApplicationFormContext, withFieldRecordContainer } from 'EPZEU.CR.Domain';
import { action, observable, runInAction } from 'mobx';
import { observer } from "mobx-react";
import * as React from "react";
import { isIF22ApplicationFormManager } from '../../Common/A8FormManager';
import { F02200_ForeignTraderRegistration } from '../../Models/Fields/F02200_ForeignTraderRegistration';

interface F02200_ForeignTraderRegistrationProps extends ApplicationFormContextProps, RecordContainerProps, AsyncUIProps {
    hasForeignTraderSelectedCountryCode?: boolean;
    hasForeignTraderCountryLegalForms?: boolean;
    hasForeignTraderCountryRegistry?: boolean;
}

@observer class F02200_ForeignTraderRegistrationUIImpl extends EPZEUBaseComponent<F02200_ForeignTraderRegistrationProps, F02200_ForeignTraderRegistration> {

    @observable private isOtherRegistry: boolean;
    @observable private isOtherLegalForm: boolean;
    @observable private legalFormName: string = "";
    @observable private registryName: string = "";

    private persistedForeignLegalFormCode: string;
    private persistedForeignRegisterCode: string;

    constructor(props?: F02200_ForeignTraderRegistrationProps) {
        super(props);

        this.selectRegistry = this.selectRegistry.bind(this);
        this.selectLegalForm = this.selectLegalForm.bind(this);

        this.showRegisterValue = this.showRegisterValue.bind(this);
        this.showLegalFormValue = this.showLegalFormValue.bind(this);

        this.handleRegistrySelectOption = this.handleRegistrySelectOption.bind(this);
        this.handleLegalFormSelectOption = this.handleLegalFormSelectOption.bind(this);

        this.handleRegistryChange = this.handleRegistryChange.bind(this);
        this.handleLegalFormChange = this.handleLegalFormChange.bind(this);

        this.initRegestry();
        this.initLegalForm();
    }

    componentDidUpdate(prevProps: any, prevState: any, snapshot?: never): void {
        if (super.componentDidUpdate)
            super.componentDidUpdate(prevProps, prevState, snapshot);

        if (this.model.foreignLegalFormCode != this.persistedForeignLegalFormCode)
            this.initLegalForm();

        if (this.model.foreignRegisterCode != this.persistedForeignRegisterCode)
            this.initRegestry();
    }

    renderEdit() {

        return (<><div className="row">
            <div className="form-group col-12">
                {this.labelFor(m => m.name, 'CR_GL_COMPANY_NAME_L')}
                {this.textBoxFor(m => m.name)}
            </div>
        </div>
            {this.props.hasForeignTraderSelectedCountryCode
                ? <div className="row">
                    {
                        this.props.hasForeignTraderCountryRegistry
                            ? <div className="form-group col-sm-12 col-xl-6">
                                {this.labelFor(m => m.foreignRegisterCode, 'CR_GL_COMPANY_TRADE_CENTRAL_REGISTER_L')}
                                <AutoComplete
                                    fullHtmlName="registryName"
                                    modelReference={new BindableReference(this, "registryName")}
                                    selector={this.selectRegistry}
                                    showValue={this.showRegisterValue}
                                    handleSelectCallback={this.handleRegistrySelectOption}
                                    hasSelectedValue={this.model.foreignRegisterCode ? true : false}
                                    handleChangeCallback={this.handleRegistryChange}
                                    triggerLength={0}
                                    attributes={attributesClassFormControl} />
                            </div>
                            : <div className="form-group col-sm-12 col-xl-6">
                                {this.labelFor(m => m.register, 'GL_REGISTER_L')}
                                {this.textBoxFor(m => m.register)}
                            </div>
                    }
                    <div className="form-group col-sm-12 col-xl-6">
                        {this.labelFor(m => m.entryNumber, 'CR_APP_ENTRY_NO_REGISTER_L')}
                        {this.textBoxFor(m => m.entryNumber)}
                    </div>
                    {
                        this.isOtherRegistry
                            ? <div className="form-group col-12">
                                {this.labelFor(m => m.register, 'GL_REGISTER_L')}
                                {this.textBoxFor(m => m.register)}
                            </div>
                            : null
                    }
                    {
                        this.props.hasForeignTraderCountryLegalForms
                            ? <div className="form-group col-12">
                                {this.labelFor(m => m.foreignLegalFormCode, 'GL_LEGAL_FORM_L')}
                                <AutoComplete
                                    fullHtmlName="legalFormName"
                                    modelReference={new BindableReference(this, "legalFormName")}
                                    selector={this.selectLegalForm}
                                    showValue={this.showLegalFormValue}
                                    handleSelectCallback={this.handleLegalFormSelectOption}
                                    hasSelectedValue={this.model.foreignLegalFormCode ? true : false}
                                    handleChangeCallback={this.handleLegalFormChange}
                                    triggerLength={0}
                                    attributes={attributesClassFormControl} />
                            </div>
                            : <div className="form-group col-12">
                                {this.labelFor(m => m.legalForm, 'GL_LEGAL_FORM_L')}
                                {this.textBoxFor(m => m.legalForm)}
                            </div>
                    }
                    {
                        this.isOtherLegalForm
                            ? <div className="form-group col-12">
                                {this.labelFor(m => m.legalForm, 'GL_LEGAL_FORM_L')}
                                {this.textBoxFor(m => m.legalForm)}
                            </div>
                            : null
                    }
                </div>
                : <div className="row">
                    <div className="form-group col-12">
                        {this.labelFor(m => m.legalForm, 'GL_LEGAL_FORM_L')}
                        {this.textBoxFor(m => m.legalForm)}
                    </div>
                </div>}
        </>);
    }

    renderDisplay() {
        return <div>
            {!ObjectHelper.isStringNullOrEmpty(this.model.name) ? <div>{this.getResource("CR_GL_COMPANY_NAME_L") + ": " + this.model.name}</div> : null}
            {!ObjectHelper.isStringNullOrEmpty(this.registryName) && ObjectHelper.isStringNullOrEmpty(this.model.register) ? <div>{this.getResource("CR_GL_COMPANY_TRADE_CENTRAL_REGISTER_L") + ": " + this.registryName}</div> : null}
            {!ObjectHelper.isStringNullOrEmpty(this.model.register) ? <div>{this.getResource("GL_REGISTER_L") + ": " + this.model.register}</div> : null}
            {!ObjectHelper.isStringNullOrEmpty(this.model.entryNumber) ? <div>{this.getResource("CR_APP_ENTRY_NO_REGISTER_L") + ": " + this.model.entryNumber}</div> : null}
            {!ObjectHelper.isStringNullOrEmpty(this.legalFormName) && ObjectHelper.isStringNullOrEmpty(this.model.legalForm) ? <div>{this.getResource("GL_LEGAL_FORM_L") + ": " + this.legalFormName}</div> : null}
            {!ObjectHelper.isStringNullOrEmpty(this.model.legalForm) ? <div>{this.getResource("GL_LEGAL_FORM_L") + ": " + this.model.legalForm}</div> : null}
        </div>
    }

    //#region helpers

    selectRegistry(value: string): Promise<ForeignCommercialRegister[]> {
        var valueLowerCase = value.toLowerCase();

        if (isIF22ApplicationFormManager(this.props.applicationManager)) {
            let isForeignTraderSelectedCountryCodeBRISEqualTo = this.props.applicationManager.isForeignTraderSelectedCountryCodeBRISEqualTo;

            return Nomenclatures.getForeignComRegistersCache()
                .then(s => s.filter(s =>
                    s.isActive == true
                    && s.nameOriginal.toLowerCase().indexOf(valueLowerCase) > -1
                    && isForeignTraderSelectedCountryCodeBRISEqualTo(s.countryCode)));
        }
        else
            return Promise.resolve([]);
    }

    selectLegalForm(value: string): Promise<ForeignLegalForm[]> {
        var valueLowerCase = value.toLowerCase();

        if (isIF22ApplicationFormManager(this.props.applicationManager)) {
            let isForeignTraderSelectedCountryCodeBRISEqualTo = this.props.applicationManager.isForeignTraderSelectedCountryCodeBRISEqualTo;
            return Nomenclatures.getForeignLegalForms()
                .then(s => s.filter(s =>
                    s.isActive == true
                    && s.name.toLowerCase().indexOf(valueLowerCase) > -1
                    && isForeignTraderSelectedCountryCodeBRISEqualTo(s.countryCode)));
        }
        else
            return Promise.resolve([]);

    }

    showRegisterValue(value: ForeignCommercialRegister): string {
        return value.nameOriginal;
    }

    showLegalFormValue(value: ForeignLegalForm): string {
        return value.name;
    }

    @action handleRegistryChange() {
        this.model.foreignRegisterCode = null;
        this.model.register = null;
        this.isOtherRegistry = false;
    }

    @action handleLegalFormChange() {
        this.model.foreignLegalFormCode = null;
        this.model.legalForm = null;
        this.isOtherLegalForm = false;
    }

    @action handleRegistrySelectOption(value?: ForeignCommercialRegister) {
        if (value) {
            this.model.foreignRegisterCode = value.code;
            this.isOtherRegistry = value.isOther;
        }
    }

    @action handleLegalFormSelectOption(value?: ForeignLegalForm) {
        if (value) {
            this.model.foreignLegalFormCode = value.code;
            this.isOtherLegalForm = value.isOther;
        }
    }

    initRegestry() {

        if (!ObjectHelper.isStringNullOrEmpty(this.model.foreignRegisterCode)) {
            if (this.props.viewMode == ViewMode.Edit) {
                this.props.registerAsyncOperation(Nomenclatures.getForeignComRegistersCache(s => s.code == this.model.foreignRegisterCode && s.isActive == true).then(registries => {
                    if (registries && registries.length > 0) {
                        runInAction(() => {
                            this.registryName = registries[0].nameOriginal;
                            this.isOtherRegistry = registries[0].isOther;
                            this.persistedForeignRegisterCode = this.model.foreignRegisterCode;
                        });
                    } else {
                        runInAction(() => {
                            this.persistedForeignRegisterCode = null;
                            this.registryName = "";
                            this.model.foreignRegisterCode = null;
                        });
                    }
                }));
            } else {
                this.persistedForeignRegisterCode = this.model.foreignRegisterCode;

                this.props.registerAsyncOperation(Nomenclatures.getForeignComRegistersCache(s => s.code == this.model.foreignRegisterCode).then(registries => {
                    if (registries && registries.length > 0) {
                        runInAction(() => {
                            this.registryName = registries[0].nameOriginal;
                            this.isOtherRegistry = registries[0].isOther;
                        });
                    }
                }));
            }
        } else {
            this.persistedForeignRegisterCode = null;
            this.registryName = "";
        }
    }

    initLegalForm() {

        if (!ObjectHelper.isStringNullOrEmpty(this.model.foreignLegalFormCode)) {
            if (this.props.viewMode == ViewMode.Edit) {
                this.props.registerAsyncOperation(Nomenclatures.getForeignLegalForms(s => s.code == this.model.foreignLegalFormCode && s.isActive == true).then(legalForms => {
                    if (legalForms && legalForms.length > 0) {
                        runInAction(() => {
                            this.legalFormName = legalForms[0].name;
                            this.isOtherLegalForm = legalForms[0].isOther;
                            this.persistedForeignLegalFormCode = this.model.foreignLegalFormCode;
                        });
                    } else {
                        runInAction(() => {
                            this.persistedForeignLegalFormCode = null;
                            this.legalFormName = "";
                            this.model.foreignLegalFormCode = null;
                        });
                    }
                }));
            } else {
                this.persistedForeignLegalFormCode = this.model.foreignLegalFormCode;

                this.props.registerAsyncOperation(Nomenclatures.getForeignLegalForms(s => s.code == this.model.foreignLegalFormCode).then(legalForms => {
                    if (legalForms && legalForms.length > 0) {
                        runInAction(() => {
                            this.legalFormName = legalForms[0].name;
                            this.isOtherLegalForm = legalForms[0].isOther;
                        });
                    }
                }));
            }
        } else {
            this.persistedForeignLegalFormCode = null;
            this.legalFormName = "";
        }
    }

    //#endregion}

export const F02200_ForeignTraderRegistrationUI = withFieldRecordContainer(withApplicationFormContext(withAsyncFrame(F02200_ForeignTraderRegistrationUIImpl)), {});