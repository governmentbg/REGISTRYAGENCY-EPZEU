import { ClientError, ObjectHelper, TypeSystem } from 'Cnsys.Core';
import { ApplicationDocumentType, DocumentTemplateFields, Nomenclatures, Registers } from 'EPZEU.Core';
import * as moment from 'moment';
import { Address, ApplicantCapacityType, ApplicationFormBase, ApplicationFormFieldsBase, ApplicationWithFieldsFormBase, AttachedDocument, IApplicationProcessContext, ProcessStates } from '../';
import { moduleContext } from '../ModuleContext';
import {ApplicantCapacityHelper } from '../ApplicantCapacityHelper'

export interface ApplicationManagerInitParams {
    processContext: IApplicationProcessContext,
    uiMode: UIModes,
    additionalData?: any
}

export enum UIModes {
    Preview = 1,
    Edit = 2
}
TypeSystem.registerEnumInfo(UIModes, 'UIModes', moduleContext.moduleName)

export interface IApplicationFormManager {
    application: ApplicationFormBase,
    processContext: IApplicationProcessContext,
    processState: ProcessStates;
    additionalData: any

    init: (applJson: any, initParams: ApplicationManagerInitParams) => Promise<ApplicationFormBase>,

    prepareForSave: () => Promise<void>;

    addAttachedDocument: (applAttDocument: AttachedDocument) => void;
    deleteAttachedDocument: (applAttDocument: AttachedDocument) => void;

    getPossibleAttachedDocumentTypes: () => Promise<{ documentTypeID: string, documentTypeName: string, minOccurs: number, maxOccurs: number }[]>;
    getTemplateFieldData: (templateFields: DocumentTemplateFields) => string;

    canFillAppExchangeAddress: boolean;
    getSeatAddress: () => Promise<Address>;
    getSeatAddressByUIC: (uic: string) => Promise<Address>;

    possibleApplicantCapacities: () => ApplicantCapacityType[];
    isMainApplication: boolean;
}

export abstract class ApplicationFormBaseManager<TAppl extends ApplicationFormBase> implements IApplicationFormManager {

    //#region Properties

    private _application: TAppl;

    protected initParams: ApplicationManagerInitParams;

    public get isMainApplication(): boolean {
        return this.initParams.processContext.applicationItems.filter(ai => ai.applicationManager === this)[0].isMainAppl;
    }

    //#endregion

    constructor() {
        this.getPossibleAttachedDocumentTypes = this.getPossibleAttachedDocumentTypes.bind(this);
        this.getTemplateFieldData = this.getTemplateFieldData.bind(this);
    }

    //#region Abstract

    protected abstract createApplication(obj: any): TAppl;

    //#endregion

    //#region Virtual Methods

    public get canFillAppExchangeAddress(): boolean {
        return false;
    }

    public getSeatAddress(): Promise<Address> {
        throw new ClientError("getSeatAddress is not supported");
    }

    public getSeatAddressByUIC(uic: string): Promise<Address> {
        throw new ClientError("getSeatAddressByUIC is not supported");
    }

    /**Инициялизира данните на документа*/
    protected initApplicationData(): Promise<void> {
        return Promise.resolve();
    }

    protected addAttachedDocumentInternal(applAttDocument: AttachedDocument): void {
        if (!this.application.documents) {
            this.application.documents = [];
        }

        this.application.documents.push(applAttDocument);
    }

    protected deleteAttachedDocumentInternal(applAttDocument: AttachedDocument): void {
        let applAttDocumentIndex = this.application.documents.indexOf(applAttDocument);

        if (applAttDocumentIndex > -1) {
            this.application.documents.splice(applAttDocumentIndex, 1);
        }
    }

    protected filterPossibleApplicationDocumentType(appDocTypes: ApplicationDocumentType[]): ApplicationDocumentType[] {
        let filteredItems: ApplicationDocumentType[] = appDocTypes.filter(value =>
            (this.processState == undefined
                || this.processState == null
                || (this.processState == ProcessStates.New && value.isNew == true)
                || (this.processState == ProcessStates.ForChange && value.isForChange == true)
                || (this.processState == ProcessStates.Preregistration && value.isForPreregistration == true))
        );

        return filteredItems;
    }

    public possibleApplicantCapacities(): ApplicantCapacityType[] {

        return ApplicantCapacityHelper.getApplicantCapacitiesByAppType(this._application.appType);
    }

    //#endregion

    //#region IApplicationFormManager

    public get application(): TAppl {
        return this._application;
    }

    public get processContext(): IApplicationProcessContext {
        return this.initParams.processContext;
    }

    public get processState(): ProcessStates {
        var app: ApplicationWithFieldsFormBase<ApplicationFormFieldsBase> = <any>this.application;

        return app.applicationState;
    }

    public get additionalData(): any {
        return this.initParams.additionalData;
    }

    public init(applJson: any, initParams: ApplicationManagerInitParams): Promise<TAppl> {

        this.initParams = initParams;
        this._application = this.createApplication(applJson);

        if (this.initParams.uiMode == UIModes.Edit) {
            return this.initApplicationData().bind(this).then((appl) => {
                return this.application;
            });
        }
        else {
            return Promise.resolve(this.application);
        }
    }

    public prepareForSave(): Promise<void> {
        return Promise.resolve();
    }

    public addAttachedDocument(applAttDocument: AttachedDocument): void {
        this.addAttachedDocumentInternal(applAttDocument);
    }

    public deleteAttachedDocument(applAttDocument: AttachedDocument): void {
        this.deleteAttachedDocumentInternal(applAttDocument);
    }

    public getPossibleAttachedDocumentTypes(): Promise<{ documentTypeID: string, documentTypeName: string, minOccurs: number, maxOccurs: number }[]> {
        return Nomenclatures.getApplicationDocumentTypes(Registers.CR, this.application.appType.toString()).bind(this)
            .then(appDocTypes => {
                return this.filterPossibleApplicationDocumentType(appDocTypes)
                    .map(appDocType => {
                        return {
                            documentTypeID: appDocType.documentTypeID,
                            documentTypeName: !ObjectHelper.isStringNullOrEmpty(appDocType.documentName) ? appDocType.documentName : appDocType.documentType.name,
                            minOccurs: appDocType.minOccurs,
                            maxOccurs: appDocType.maxOccurs,
                        }

                    }).sort((a, b) => { return a.documentTypeName > b.documentTypeName ? 1 : -1 })
            });
    }

    public getTemplateFieldData(templateFields: DocumentTemplateFields): string {
        var applicantInfo = this.processContext.applicationItems.filter(ap => ap.isMainAppl)[0].applicationManager.application.applicantInfo;

        switch (templateFields) {
            case DocumentTemplateFields.APPLICANT_EGN_LNCH: {
                return this.application.applicantInfo && this.application.applicantInfo.applicants && this.application.applicantInfo.applicants.applicantsList && this.application.applicantInfo.applicants.applicantsList.length > 0 && this.application.applicantInfo.applicants.applicantsList[0].person ?
                    this.application.applicantInfo.applicants.applicantsList[0].person.indent : null;
            }
            case DocumentTemplateFields.APPLICANT_PERSON_NAME: {
                return this.application.applicantInfo && this.application.applicantInfo.applicants && this.application.applicantInfo.applicants.applicantsList && this.application.applicantInfo.applicants.applicantsList.length > 0 && this.application.applicantInfo.applicants.applicantsList[0].person ?
                    this.application.applicantInfo.applicants.applicantsList[0].person.name : null;
            }
            case DocumentTemplateFields.CURRENT_DATE: {
                return moment().format("l")
            }
            case DocumentTemplateFields.LEGAL_FORM: {
                return applicantInfo && applicantInfo.applicants && applicantInfo.applicants.applicantsList && applicantInfo.applicants.applicantsList.length > 0 && applicantInfo.applicants.applicantsList[0].person ?
                    applicantInfo.applicants.applicantsList[0].person.legalForm : null;
            }

            case DocumentTemplateFields.PERMANENT_ADDRESS: {
                if (applicantInfo && applicantInfo.applicants && applicantInfo.applicants.applicantsList && applicantInfo.applicants.applicantsList.length > 0 && applicantInfo.applicants.applicantsList[0].address) {
                    return this.convertAddressToString(applicantInfo.applicants.applicantsList[0].address);
                }
                break;
            }
        }

        return null;
    }

    //#endregion 

    //#region Helpers

    protected convertAddressToString(address: Address): string {
        var addressStr = "";

        if (address.country) {
            addressStr += address.country + ", ";
        }

        if (address.foreignPlace) {
            addressStr += address.foreignPlace + ", ";
        }

        if (address.settlement) {
            addressStr += address.settlement;

            if (address.postCode) {
                addressStr += " " + address.postCode;
            }

            addressStr += ", ";
        }

        if (address.district) {
            addressStr += moduleContext.resourceManager.getResourceByKey('GL_REGION_L').toLocaleLowerCase() + " " + address.district + ", ";
        }

        if (address.municipality) {
            addressStr += moduleContext.resourceManager.getResourceByKey('GL_MUNICIPALITY_L').toLocaleLowerCase() + " " + address.municipality;

            if (address.area) {
                addressStr += " " + address.area;
            }

            if (address.housingEstate) {
                addressStr += " " + address.housingEstate;
            }

            addressStr += ", ";
        }

        if (address.street) {
            addressStr += moduleContext.resourceManager.getResourceByKey('GL_STREET_ABBREVATION_L').toLocaleLowerCase() + " " + address.street;

            if (address.streetNumber) {
                addressStr += " №" + address.streetNumber;
            }

            addressStr += ", ";
        }

        if (address.block) {
            addressStr += moduleContext.resourceManager.getResourceByKey('GL_BUILDING_ABBREVATION_L').toLocaleLowerCase() + " " + address.block + ", ";
        }

        if (address.entrance) {
            addressStr += moduleContext.resourceManager.getResourceByKey('GL_ENTRANCE_ABBREVATION_L').toLocaleLowerCase() + " " + address.entrance + ", ";
        }

        if (address.floor) {
            addressStr += moduleContext.resourceManager.getResourceByKey('GL_FLOOR_ABBREVATION_L').toLocaleLowerCase() + " " + address.floor + ", ";
        }

        if (address.apartment) {
            addressStr += moduleContext.resourceManager.getResourceByKey('GL_FLAT_ABBREVATION_L').toLocaleLowerCase() + " " + address.apartment + ", ";
        }

        addressStr = addressStr.length > 0 ? addressStr.substr(0, addressStr.length - 2) : addressStr;

        return addressStr;
    }

    //#endregion

}

export function isApplicationFormManager(obj: IApplicationFormManager | any): obj is IApplicationFormManager {
    return obj && ObjectHelper.isSubClassOf(obj, ApplicationFormBaseManager);
}