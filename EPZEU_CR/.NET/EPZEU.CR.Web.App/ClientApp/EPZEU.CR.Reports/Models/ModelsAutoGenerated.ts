

// Auto Generated Object
import * as moment from 'moment'
import { observable, computed } from 'mobx'
import { TypeSystem, BaseDataModel, BasePagedSearchCriteria } from 'Cnsys.Core'
import { TreeNodeCollection } from 'Cnsys.UI.React'
import { moduleContext } from '../ModuleContext'
import { DeedStatuses, LegalForms, CompanyNameSuffixFlags, ElementHolderAdditionFlags, FieldOperations, EraseOperations, SubUICTypes, SubDeedStatuses } from 'EPZEU.CR.Core'



@TypeSystem.typeDecorator('BulstatDeedsSearchCriteria', moduleContext.moduleName)
export class BulstatDeedsSearchCriteria extends BasePagedSearchCriteria { 
    
    @observable private _fromDate: moment.Moment = null;
    
	/**От дата.*/
    @TypeSystem.propertyDecorator('moment')
    public set fromDate(val: moment.Moment){
        this._fromDate = val;
    }
    
	/**От дата.*/
    public get fromDate(): moment.Moment{
        return this._fromDate;
    } 
    
    @observable private _toDate: moment.Moment = null;
    
	/**До Дата.*/
    @TypeSystem.propertyDecorator('moment')
    public set toDate(val: moment.Moment){
        this._toDate = val;
    }
    
	/**До Дата.*/
    public get toDate(): moment.Moment{
        return this._toDate;
    } 

    @observable private _courtNumber: number = null;
    
	/**Код на съд.*/
    @TypeSystem.propertyDecorator('number')
    public set courtNumber(val: number){
        this._courtNumber = val;
    }
    
	/**Код на съд.*/
    public get courtNumber(): number{
        return this._courtNumber;
    }
    
	/**Код на съд.*/ 

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('CompanyInfo', moduleContext.moduleName)
export class CompanyInfo extends BaseDataModel { 

    @observable private _companyName: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set companyName(val: string){
        this._companyName = val;
    }
    
    public get companyName(): string{
        return this._companyName;
    }
     

    @observable private _trasnliteration: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set trasnliteration(val: string){
        this._trasnliteration = val;
    }
    
    public get trasnliteration(): string{
        return this._trasnliteration;
    }
     

    @observable private _legalFormName: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set legalFormName(val: string){
        this._legalFormName = val;
    }
    
    public get legalFormName(): string{
        return this._legalFormName;
    }
     

    @observable private _interestedPerson: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set interestedPerson(val: string){
        this._interestedPerson = val;
    }
    
    public get interestedPerson(): string{
        return this._interestedPerson;
    }
     

    @observable private _interestedAs: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set interestedAs(val: string){
        this._interestedAs = val;
    }
    
    public get interestedAs(): string{
        return this._interestedAs;
    }
     
    
    @observable private _activeFrom: moment.Moment = null;
    
    @TypeSystem.propertyDecorator('moment')
    public set activeFrom(val: moment.Moment){
        this._activeFrom = val;
    }
    
    public get activeFrom(): moment.Moment{
        return this._activeFrom;
    } 
    
    @observable private _activeTo: moment.Moment = null;
    
    @TypeSystem.propertyDecorator('moment')
    public set activeTo(val: moment.Moment){
        this._activeTo = val;
    }
    
    public get activeTo(): moment.Moment{
        return this._activeTo;
    } 
    
    @observable private _erasedDate: moment.Moment = null;
    
    @TypeSystem.propertyDecorator('moment')
    public set erasedDate(val: moment.Moment){
        this._erasedDate = val;
    }
    
    public get erasedDate(): moment.Moment{
        return this._erasedDate;
    } 

    @observable private _personPosition: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set personPosition(val: string){
        this._personPosition = val;
    }
    
    public get personPosition(): string{
        return this._personPosition;
    }
     

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

/**Модел на партида.*/
@TypeSystem.typeDecorator('RDeed', moduleContext.moduleName)
export class RDeed extends BaseDataModel { 

    @observable private _deedStatus: DeedStatuses = null;
    
	/**Статус на партида.*/
    @TypeSystem.propertyDecorator(DeedStatuses ? DeedStatuses : moduleContext.moduleName + '.' + 'DeedStatuses')
    public set deedStatus(val: DeedStatuses){
        this._deedStatus = val;
    }
    
	/**Статус на партида.*/
    public get deedStatus(): DeedStatuses{
        return this._deedStatus;
    }
    
	/**Статус на партида.*/ 

    @observable private _companyName: string = null;
    
	/**Име на фирма.*/
    @TypeSystem.propertyDecorator('string')
    public set companyName(val: string){
        this._companyName = val;
    }
    
	/**Име на фирма.*/
    public get companyName(): string{
        return this._companyName;
    }
    
	/**Име на фирма.*/ 

    @observable private _guid: string = null;
    
	/**Уникален идентификатор.*/
    @TypeSystem.propertyDecorator('string')
    public set guid(val: string){
        this._guid = val;
    }
    
	/**Уникален идентификатор.*/
    public get guid(): string{
        return this._guid;
    }
    
	/**Уникален идентификатор.*/ 

    @observable private _uic: string = null;
    
	/**ЕИК.*/
    @TypeSystem.propertyDecorator('string')
    public set uic(val: string){
        this._uic = val;
    }
    
	/**ЕИК.*/
    public get uic(): string{
        return this._uic;
    }
    
	/**ЕИК.*/ 

    @observable private _uicWithCtx: string = null;
    
	/**ЕИК с контекстна информация.*/
    @TypeSystem.propertyDecorator('string')
    public set uicWithCtx(val: string){
        this._uicWithCtx = val;
    }
    
	/**ЕИК с контекстна информация.*/
    public get uicWithCtx(): string{
        return this._uicWithCtx;
    }
    
	/**ЕИК с контекстна информация.*/ 

    @observable private _legalForm: LegalForms = null;
    
	/**Правна форма.*/
    @TypeSystem.propertyDecorator(LegalForms ? LegalForms : moduleContext.moduleName + '.' + 'LegalForms')
    public set legalForm(val: LegalForms){
        this._legalForm = val;
    }
    
	/**Правна форма.*/
    public get legalForm(): LegalForms{
        return this._legalForm;
    }
    
	/**Правна форма.*/ 

    @observable private _companyNameSuffixFlag: CompanyNameSuffixFlags = null;
    
	/**Наставка след името на компанията, указваща дали компанията е в ликвидация, несъстоятелност или нито едното.*/
    @TypeSystem.propertyDecorator(CompanyNameSuffixFlags ? CompanyNameSuffixFlags : moduleContext.moduleName + '.' + 'CompanyNameSuffixFlags')
    public set companyNameSuffixFlag(val: CompanyNameSuffixFlags){
        this._companyNameSuffixFlag = val;
    }
    
	/**Наставка след името на компанията, указваща дали компанията е в ликвидация, несъстоятелност или нито едното.*/
    public get companyNameSuffixFlag(): CompanyNameSuffixFlags{
        return this._companyNameSuffixFlag;
    }
    
	/**Наставка след името на компанията, указваща дали компанията е в ликвидация, несъстоятелност или нито едното.*/ 

    @observable private _elementHolderAdditionFlag: ElementHolderAdditionFlags = null;
    
	/**Флаг, указващ дали полетата от заявлението, за които се отнася, са с прекратени правомощия или лишени от разпоредителна власт.*/
    @TypeSystem.propertyDecorator(ElementHolderAdditionFlags ? ElementHolderAdditionFlags : moduleContext.moduleName + '.' + 'ElementHolderAdditionFlags')
    public set elementHolderAdditionFlag(val: ElementHolderAdditionFlags){
        this._elementHolderAdditionFlag = val;
    }
    
	/**Флаг, указващ дали полетата от заявлението, за които се отнася, са с прекратени правомощия или лишени от разпоредителна власт.*/
    public get elementHolderAdditionFlag(): ElementHolderAdditionFlags{
        return this._elementHolderAdditionFlag;
    }
    
	/**Флаг, указващ дали полетата от заявлението, за които се отнася, са с прекратени правомощия или лишени от разпоредителна власт.*/ 

    @observable private _sections: RSection[] = null;
    
	/**Секции.*/
    @TypeSystem.propertyArrayDecorator(RSection ? RSection : moduleContext.moduleName + '.' + 'RSection')
    public set sections(val: RSection[]){
        this._sections = val;
    }
    
	/**Секции.*/
    public get sections(): RSection[]{
        return this._sections;
    }
    
	/**Секции.*/ 
    
    @observable private _entryDate: moment.Moment = null;
    
	/**Дата на справката.*/
    @TypeSystem.propertyDecorator('moment')
    public set entryDate(val: moment.Moment){
        this._entryDate = val;
    }
    
	/**Дата на справката.*/
    public get entryDate(): moment.Moment{
        return this._entryDate;
    } 

    @observable private _fullName: string = null;
    
	/**Пълно име.*/
    @TypeSystem.propertyDecorator('string')
    public set fullName(val: string){
        this._fullName = val;
    }
    
	/**Пълно име.*/
    public get fullName(): string{
        return this._fullName;
    }
    
	/**Пълно име.*/ 

    @observable private _hasInstructions: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set hasInstructions(val: boolean){
        this._hasInstructions = val;
    }
    
    public get hasInstructions(): boolean{
        return this._hasInstructions;
    }
     

    @observable private _hasAssignments: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set hasAssignments(val: boolean){
        this._hasAssignments = val;
    }
    
    public get hasAssignments(): boolean{
        return this._hasAssignments;
    }
     

    @observable private _hasCompanyCasees: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set hasCompanyCasees(val: boolean){
        this._hasCompanyCasees = val;
    }
    
    public get hasCompanyCasees(): boolean{
        return this._hasCompanyCasees;
    }
     

    @observable private _hasLegalFormChange: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set hasLegalFormChange(val: boolean){
        this._hasLegalFormChange = val;
    }
    
    public get hasLegalFormChange(): boolean{
        return this._hasLegalFormChange;
    }

    @observable private _hasNotifications: boolean = null;

    @TypeSystem.propertyDecorator('boolean')
    public set hasNotifications(val: boolean) {
        this._hasNotifications = val;
    }

    public get hasNotifications(): boolean {
        return this._hasNotifications;
    }    

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

/**Модел на документ.*/
@TypeSystem.typeDecorator('RDocument', moduleContext.moduleName)
export class RDocument extends BaseDataModel { 

    @observable private _docGuid: string = null;
    
	/**Уникален идентификатор на документа.*/
    @TypeSystem.propertyDecorator('string')
    public set docGuid(val: string){
        this._docGuid = val;
    }
    
	/**Уникален идентификатор на документа.*/
    public get docGuid(): string{
        return this._docGuid;
    }
    
	/**Уникален идентификатор на документа.*/ 

    @observable private _description: string = null;
    
	/**Описание*/
    @TypeSystem.propertyDecorator('string')
    public set description(val: string){
        this._description = val;
    }
    
	/**Описание*/
    public get description(): string{
        return this._description;
    }
    
	/**Описание*/ 

    @observable private _original: boolean = null;
    
	/**Оригинал*/
    @TypeSystem.propertyDecorator('boolean')
    public set original(val: boolean){
        this._original = val;
    }
    
	/**Оригинал*/
    public get original(): boolean{
        return this._original;
    }
    
	/**Оригинал*/ 

    @observable private _pagesCount: string = null;
    
	/**Брой станици.*/
    @TypeSystem.propertyDecorator('string')
    public set pagesCount(val: string){
        this._pagesCount = val;
    }
    
	/**Брой станици.*/
    public get pagesCount(): string{
        return this._pagesCount;
    }
    
	/**Брой станици.*/ 

    @observable private _docSize: string = null;
    
	/**Размер на документа.*/
    @TypeSystem.propertyDecorator('string')
    public set docSize(val: string){
        this._docSize = val;
    }
    
	/**Размер на документа.*/
    public get docSize(): string{
        return this._docSize;
    }
    
	/**Размер на документа.*/ 

    @observable private _fileName: string = null;
    
	/**Име на файл.*/
    @TypeSystem.propertyDecorator('string')
    public set fileName(val: string){
        this._fileName = val;
    }
    
	/**Име на файл.*/
    public get fileName(): string{
        return this._fileName;
    }
    
	/**Име на файл.*/ 

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

/**Модел на поле.*/
@TypeSystem.typeDecorator('RField', moduleContext.moduleName)
export class RField extends BaseDataModel { 

    @observable private _nameCode: string = null;
    
	/**Код на ресурс за името на полето.*/
    @TypeSystem.propertyDecorator('string')
    public set nameCode(val: string){
        this._nameCode = val;
    }
    
	/**Код на ресурс за името на полето.*/
    public get nameCode(): string{
        return this._nameCode;
    }
    
	/**Код на ресурс за името на полето.*/ 

    @observable private _htmlData: string = null;
    
	/**HTML данни.*/
    @TypeSystem.propertyDecorator('string')
    public set htmlData(val: string){
        this._htmlData = val;
    }
    
	/**HTML данни.*/
    public get htmlData(): string{
        return this._htmlData;
    }
    
	/**HTML данни.*/ 

    @observable private _fieldEntryNumber: string = null;
    
	/**Номер на вписване, с който е вписано полето.*/
    @TypeSystem.propertyDecorator('string')
    public set fieldEntryNumber(val: string){
        this._fieldEntryNumber = val;
    }
    
	/**Номер на вписване, с който е вписано полето.*/
    public get fieldEntryNumber(): string{
        return this._fieldEntryNumber;
    }
    
	/**Номер на вписване, с който е вписано полето.*/ 
    
    @observable private _recordMinActionDate: moment.Moment = null;
    
	/**Дата на първоначално вписване.*/
    @TypeSystem.propertyDecorator('moment')
    public set recordMinActionDate(val: moment.Moment){
        this._recordMinActionDate = val;
    }
    
	/**Дата на първоначално вписване.*/
    public get recordMinActionDate(): moment.Moment{
        return this._recordMinActionDate;
    } 
    
    @observable private _fieldEntryDate: moment.Moment = null;
    
	/**Дата на последно вписване.*/
    @TypeSystem.propertyDecorator('moment')
    public set fieldEntryDate(val: moment.Moment){
        this._fieldEntryDate = val;
    }
    
	/**Дата на последно вписване.*/
    public get fieldEntryDate(): moment.Moment{
        return this._fieldEntryDate;
    } 
    
    @observable private _fieldActionDate: moment.Moment = null;
    
	/**Дата на*/
    @TypeSystem.propertyDecorator('moment')
    public set fieldActionDate(val: moment.Moment){
        this._fieldActionDate = val;
    }
    
	/**Дата на*/
    public get fieldActionDate(): moment.Moment{
        return this._fieldActionDate;
    } 

    @observable private _fieldIdent: string = null;
    
	/**Идентификатор на полета.*/
    @TypeSystem.propertyDecorator('string')
    public set fieldIdent(val: string){
        this._fieldIdent = val;
    }
    
	/**Идентификатор на полета.*/
    public get fieldIdent(): string{
        return this._fieldIdent;
    }
    
	/**Идентификатор на полета.*/ 

    @observable private _fieldOperation: FieldOperations = null;
    
	/**Операция на полето.*/
    @TypeSystem.propertyDecorator(FieldOperations ? FieldOperations : moduleContext.moduleName + '.' + 'FieldOperations')
    public set fieldOperation(val: FieldOperations){
        this._fieldOperation = val;
    }
    
	/**Операция на полето.*/
    public get fieldOperation(): FieldOperations{
        return this._fieldOperation;
    }
    
	/**Операция на полето.*/ 

    @observable private _order: string = null;
    
	/**Поредност.*/
    @TypeSystem.propertyDecorator('string')
    public set order(val: string){
        this._order = val;
    }
    
	/**Поредност.*/
    public get order(): string{
        return this._order;
    }
    
	/**Поредност.*/ 

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

/**Модел на група.*/
@TypeSystem.typeDecorator('RGroup', moduleContext.moduleName)
export class RGroup extends BaseDataModel { 

    @observable private _groupID: number = null;
    
	/**Идентификатор на групата.*/
    @TypeSystem.propertyDecorator('number')
    public set groupID(val: number){
        this._groupID = val;
    }
    
	/**Идентификатор на групата.*/
    public get groupID(): number{
        return this._groupID;
    }
    
	/**Идентификатор на групата.*/ 

    @observable private _nameCode: string = null;
    
	/**Код на ресурс за името на групата.*/
    @TypeSystem.propertyDecorator('string')
    public set nameCode(val: string){
        this._nameCode = val;
    }
    
	/**Код на ресурс за името на групата.*/
    public get nameCode(): string{
        return this._nameCode;
    }
    
	/**Код на ресурс за името на групата.*/ 

    @observable private _order: string = null;
    
	/**Поредност.*/
    @TypeSystem.propertyDecorator('string')
    public set order(val: string){
        this._order = val;
    }
    
	/**Поредност.*/
    public get order(): string{
        return this._order;
    }
    
	/**Поредност.*/ 

    @observable private _fields: RField[] = null;
    
	/**Полета.*/
    @TypeSystem.propertyArrayDecorator(RField ? RField : moduleContext.moduleName + '.' + 'RField')
    public set fields(val: RField[]){
        this._fields = val;
    }
    
	/**Полета.*/
    public get fields(): RField[]{
        return this._fields;
    }
    
	/**Полета.*/ 

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('PhysicalOrCompanyObj', moduleContext.moduleName)
export class PhysicalOrCompanyObj extends BaseDataModel { 

    @observable private _isPhysical: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set isPhysical(val: boolean){
        this._isPhysical = val;
    }
    
    public get isPhysical(): boolean{
        return this._isPhysical;
    }
     

    @observable private _ident: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set ident(val: string){
        this._ident = val;
    }
    
    public get ident(): string{
        return this._ident;
    }
     

    @observable private _name: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set name(val: string){
        this._name = val;
    }
    
    public get name(): string{
        return this._name;
    }
     

    @observable private _companyFullName: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set companyFullName(val: string){
        this._companyFullName = val;
    }
    
    public get companyFullName(): string{
        return this._companyFullName;
    }
     

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('ProtectedRightsCompanyInfo', moduleContext.moduleName)
export class ProtectedRightsCompanyInfo extends CompanyInfo { 

    @observable private _foundIn: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set foundIn(val: string){
        this._foundIn = val;
    }
    
    public get foundIn(): string{
        return this._foundIn;
    }
     

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

/**Модел на секция.*/
@TypeSystem.typeDecorator('RSection', moduleContext.moduleName)
export class RSection extends BaseDataModel { 

    @observable private _subUICType: SubUICTypes = null;
    
	/**Тип раздел.*/
    @TypeSystem.propertyDecorator(SubUICTypes ? SubUICTypes : moduleContext.moduleName + '.' + 'SubUICTypes')
    public set subUICType(val: SubUICTypes){
        this._subUICType = val;
    }
    
	/**Тип раздел.*/
    public get subUICType(): SubUICTypes{
        return this._subUICType;
    }
    
	/**Тип раздел.*/ 

    @observable private _nameCode: string = null;
    
	/**Код на име на раздел.*/
    @TypeSystem.propertyDecorator('string')
    public set nameCode(val: string){
        this._nameCode = val;
    }
    
	/**Код на име на раздел.*/
    public get nameCode(): string{
        return this._nameCode;
    }
    
	/**Код на име на раздел.*/ 

    @observable private _order: string = null;
    
	/**Поредност на секцията.*/
    @TypeSystem.propertyDecorator('string')
    public set order(val: string){
        this._order = val;
    }
    
	/**Поредност на секцията.*/
    public get order(): string{
        return this._order;
    }
    
	/**Поредност на секцията.*/ 

    @observable private _subDeeds: RSubDeed[] = null;
    
	/**Раздели.*/
    @TypeSystem.propertyArrayDecorator(RSubDeed ? RSubDeed : moduleContext.moduleName + '.' + 'RSubDeed')
    public set subDeeds(val: RSubDeed[]){
        this._subDeeds = val;
    }
    
	/**Раздели.*/
    public get subDeeds(): RSubDeed[]{
        return this._subDeeds;
    }
    
	/**Раздели.*/ 

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

/**Модел на раздел.*/
@TypeSystem.typeDecorator('RSubDeed', moduleContext.moduleName)
export class RSubDeed extends BaseDataModel { 

    @observable private _subUIC: string = null;
    
	/**Идентификатор на раздел.*/
    @TypeSystem.propertyDecorator('string')
    public set subUIC(val: string){
        this._subUIC = val;
    }
    
	/**Идентификатор на раздел.*/
    public get subUIC(): string{
        return this._subUIC;
    }
    
	/**Идентификатор на раздел.*/ 

    @observable private _subUICType: SubUICTypes = null;
    
	/**Тип раздел.*/
    @TypeSystem.propertyDecorator(SubUICTypes ? SubUICTypes : moduleContext.moduleName + '.' + 'SubUICTypes')
    public set subUICType(val: SubUICTypes){
        this._subUICType = val;
    }
    
	/**Тип раздел.*/
    public get subUICType(): SubUICTypes{
        return this._subUICType;
    }
    
	/**Тип раздел.*/ 

    @observable private _subDeedStatus: SubDeedStatuses = null;
    
	/**Статус на раздела.*/
    @TypeSystem.propertyDecorator(SubDeedStatuses ? SubDeedStatuses : moduleContext.moduleName + '.' + 'SubDeedStatuses')
    public set subDeedStatus(val: SubDeedStatuses){
        this._subDeedStatus = val;
    }
    
	/**Статус на раздела.*/
    public get subDeedStatus(): SubDeedStatuses{
        return this._subDeedStatus;
    }
    
	/**Статус на раздела.*/ 

    @observable private _colapsableLinkName: string = null;
    
	/**Име за линк, който след натискане се разгъва и показва допълнителна информация.*/
    @TypeSystem.propertyDecorator('string')
    public set colapsableLinkName(val: string){
        this._colapsableLinkName = val;
    }
    
	/**Име за линк, който след натискане се разгъва и показва допълнителна информация.*/
    public get colapsableLinkName(): string{
        return this._colapsableLinkName;
    }
    
	/**Име за линк, който след натискане се разгъва и показва допълнителна информация.*/ 

    @observable private _sectionName: string = null;
    
	/**Име на секция.*/
    @TypeSystem.propertyDecorator('string')
    public set sectionName(val: string){
        this._sectionName = val;
    }
    
	/**Име на секция.*/
    public get sectionName(): string{
        return this._sectionName;
    }
    
	/**Име на секция.*/ 

    @observable private _subDeedIsClosed: boolean = null;
    
	/**Флаг, указващ дали раздела е затворен.*/
    @TypeSystem.propertyDecorator('boolean')
    public set subDeedIsClosed(val: boolean){
        this._subDeedIsClosed = val;
    }
    
	/**Флаг, указващ дали раздела е затворен.*/
    public get subDeedIsClosed(): boolean{
        return this._subDeedIsClosed;
    }
    
	/**Флаг, указващ дали раздела е затворен.*/ 

    @observable private _groups: RGroup[] = null;
    
	/**Групи.*/
    @TypeSystem.propertyArrayDecorator(RGroup ? RGroup : moduleContext.moduleName + '.' + 'RGroup')
    public set groups(val: RGroup[]){
        this._groups = val;
    }
    
	/**Групи.*/
    public get groups(): RGroup[]{
        return this._groups;
    }
    
	/**Групи.*/ 

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('SubjectInFieldItem', moduleContext.moduleName)
export class SubjectInFieldItem extends BaseDataModel { 

    @observable private _companyFullName: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set companyFullName(val: string){
        this._companyFullName = val;
    }
    
    public get companyFullName(): string{
        return this._companyFullName;
    }
     

    @observable private _companyNameSuffixFlag: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set companyNameSuffixFlag(val: string){
        this._companyNameSuffixFlag = val;
    }
    
    public get companyNameSuffixFlag(): string{
        return this._companyNameSuffixFlag;
    }
     

    @observable private _uic: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set uic(val: string){
        this._uic = val;
    }
    
    public get uic(): string{
        return this._uic;
    }
     

    @observable private _fieldName: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set fieldName(val: string){
        this._fieldName = val;
    }
    
    public get fieldName(): string{
        return this._fieldName;
    }
     

    @observable private _mandateText: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set mandateText(val: string){
        this._mandateText = val;
    }
    
    public get mandateText(): string{
        return this._mandateText;
    }
     

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('VerificationActsSubSearchCriteriaResult', moduleContext.moduleName)
export class VerificationActsSubSearchCriteriaResult extends BaseDataModel { 

    @observable private _uic: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set uic(val: string){
        this._uic = val;
    }
    
    public get uic(): string{
        return this._uic;
    }
     

    @observable private _companyFullName: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set companyFullName(val: string){
        this._companyFullName = val;
    }
    
    public get companyFullName(): string{
        return this._companyFullName;
    }
     

    @observable private _nodes: TreeNodeCollection = null;
    
    @TypeSystem.propertyDecorator(TreeNodeCollection ? TreeNodeCollection : moduleContext.moduleName + '.' + 'TreeNodeCollection')
    public set nodes(val: TreeNodeCollection){
        this._nodes = val;
    }
    
    public get nodes(): TreeNodeCollection{
        return this._nodes;
    }
     

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}