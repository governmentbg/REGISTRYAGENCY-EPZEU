import { observable } from 'mobx'
import { TypeSystem, BaseDataModel } from 'Cnsys.Core'
import { moduleContext } from '../ModuleContext'

@TypeSystem.typeDecorator('DocumentTemplate', moduleContext.moduleName)
export class DocumentTemplate extends BaseDataModel {

    @observable private _documentTemplateID: number = null;

    @TypeSystem.propertyDecorator('number')
    public set documentTemplateID(val: number) {
        this._documentTemplateID = val;
    }

    public get documentTemplateID(): number {
        return this._documentTemplateID;
    }

    @observable private _documentTemplateVerID: number = null;

    @TypeSystem.propertyDecorator('number')
    public set documentTemplateVerID(val: number) {
        this._documentTemplateVerID = val;
    }

    public get documentTemplateVerID(): number {
        return this._documentTemplateVerID;
    }

    @observable private _documentTypeID: string = null;

    @TypeSystem.propertyDecorator('string')
    public set documentTypeID(val: string) {
        this._documentTypeID = val;
    }

    public get documentTypeID(): string {
        return this._documentTypeID;
    }

    constructor(obj?: any) {
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('DocumentTemplateField', moduleContext.moduleName)
export class DocumentTemplateField extends BaseDataModel {
      
    @observable private _key: string = null;

    @TypeSystem.propertyDecorator('string')
    public set key(val: string) {
        this._key = val;
    }

    public get key(): string {
        return this._key;
    }

    @observable private _description: string = null;

    @TypeSystem.propertyDecorator('string')
    public set description(val: string) {
        this._description = val;
    }

    public get description(): string {
        return this._description;
    }

    constructor(obj?: any) {
        super(obj)

        this.copyFrom(obj);
    }
}

export enum DocumentTemplateFields {
    /**Идентификатор на физическо лице - заявител*/
    APPLICANT_EGN_LNCH = 1,

    /**Име,презиме,фамилия на физическо лице - заявител*/
    APPLICANT_PERSON_NAME = 2,

    /**Празно поле за попълване*/
    BLANK = 3,

    /**Наименование на търговец/ЮЛНЦ или друго Юридическо лице  на което е партидата*/
    COMPANY_NAME = 4,

    /**Текуща дата на подаване на декларация*/
    CURRENT_DATE = 5,

    /**Идентификатор на търговец/ЮЛНЦ или друго юридическо лице на което е партидата*/
    EIK_BULSTAT_PIK = 6,

    /**Име,презиме,фамилия на физическо лице или наименование на фирма/ЮЛНЦ и правна форма- Учередител*/
    FOUNDER_NAME = 7,

    /**Правна форма на търговец/ЮЛНЦ или друго юридическо лице на което е партидата*/
    LEGAL_FORM = 8,

    /**Идентификатор на физическо лице -  член на настоятелство на читалище*/
    MBT_EGN_LNCH = 9,

    /**Име,презиме,фамилия на физическо лице - член на настоятелство на читалище*/
    MBT_PERSON_NAME = 10,

    /**Идентификатор на физическо лице - член на проверителна комисия*/
    MCC_EGN_LNCH = 11,

    /**Име,презиме,фамилия на физическо лице - член на проверителна комисия*/
    MCC_PERSON_NAME = 12,

    /**Седалище и адрес на управление*/
    MNG_ADDRESS = 13,

    /**Идентификатор на физическо лице - управител */
    MNG_EGN_LNCH = 14,

    /**Име,презиме,фамилия на физическо лице - управител*/
    MNG_PERSON_NAME = 15,

    /**Адрес с кореспонденция с НАП*/
    NRA_CORRESPONDENCE_ADDRESS = 16,

    /**Идентификатор на фирма/ЮЛНЦ и правна форма - Съдружник*/
    PARTNER_EGN_LNCH = 17,

    /**Име,презиме,фамилия на физическо лице или наименование на фирма/ЮЛНЦ и правна форма - Съдружник*/
    PARTNER_NАМЕ = 18,

    /**Постоянен адрес*/
    PERMANENT_ADDRESS = 19,

    /**Идентификатор на физическо лице - секретар на читалище*/
    SECRETARY_EGN_LNCH = 20,

    /**Име,презиме,фамилия на физическо лице - секретар на читалище*/
    SECRETARY_PERSON_NAME = 21,
}
TypeSystem.registerEnumInfo(DocumentTemplateFields, 'DocumentTemplateFields', moduleContext.moduleName)
