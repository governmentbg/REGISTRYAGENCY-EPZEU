

// Auto Generated Object
import * as moment from 'moment'
import { observable } from 'mobx'
import { TypeSystem, BaseDataModel } from 'Cnsys.Core'
import { DeedSummary, ApplicationStatuses } from 'EPZEU.CR.Core'
import { ApplicationFormBase, Person, Address, Passport, OutgoingNumber, UIC, RecordField, ApplicationFormFieldsBase, F002_Company, F003_LegalForm, F004_Transliteration  } from 'EPZEU.CR.Domain'
import { moduleContext } from '../ModuleContext'
import { ContestationAct } from './ContestationAct'




export enum ActSenderType { 
    
    Undefined = 0,
    
    Officially = 1,
    
    PublicProsecutor = 2,
    
    InterestedPerson = 3,
 }
TypeSystem.registerEnumInfo(ActSenderType , 'ActSenderType' , moduleContext.moduleName)




export enum AppointingExpertType { 
    
    Undefined = 0,
    
	/**Вещо лице*/
    CognizantPerson = 1,
    
	/**Контрольор*/
    Controller = 2,
    
	/**Проверител*/
    Surveyor = 3,
    
	/**ликвидатор*/
    Liquidator = 4,
    
	/**Регистриран одитор*/
    Expert = 5,
    
	/**Въведен на ръка експерт (ликвидатор)*/
    SingleUseExpert = 6,
 }
TypeSystem.registerEnumInfo(AppointingExpertType , 'AppointingExpertType' , moduleContext.moduleName)


export enum AppointingApplicantType { 
    
    Undefined = 0,
    
	/**Вещо лице*/
    CognizantPerson = 1,
    
	/**Контрольор*/
    Controller = 2,
    
	/**Проверител*/
    Surveyor = 3,
    
	/**ликвидатор*/
    Liquidator = 4,
    
	/**Експерт счетоводител*/
    Expert = 5,
    
	/**Заявител по искане*/
    Applicant = 6,
    
	/**Трето лице*/
    ThirdPerson = 7,
    
	/**Назначеното лице*/
    AssignedExpert = 20,
 }
TypeSystem.registerEnumInfo(AppointingApplicantType , 'AppointingApplicantType' , moduleContext.moduleName)



@TypeSystem.typeDecorator('ActOfContestation', moduleContext.moduleName)
export class ActOfContestation extends ApplicationFormBase { 

    @observable private _contestationAct: ContestationAct = null;
    
    @TypeSystem.propertyDecorator(ContestationAct ? ContestationAct : moduleContext.moduleName + '.' + 'ContestationAct')
    public set contestationAct(val: ContestationAct){
        this._contestationAct = val;
    }
    
    public get contestationAct(): ContestationAct{
        return this._contestationAct;
    }
     

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('AppealRefusal', moduleContext.moduleName)
export class AppealRefusal extends ApplicationFormBase { 

    @observable private _uic: UIC = null;
    
    @TypeSystem.propertyDecorator(UIC ? UIC : moduleContext.moduleName + '.' + 'UIC')
    public set uic(val: UIC){
        this._uic = val;
    }
    
    public get uic(): UIC{
        return this._uic;
    }
     

    @observable private _complaintPersons: ComplaintPersons = null;
    
	/**Жалбоподатели*/
    @TypeSystem.propertyDecorator(ComplaintPersons ? ComplaintPersons : moduleContext.moduleName + '.' + 'ComplaintPersons')
    public set complaintPersons(val: ComplaintPersons){
        this._complaintPersons = val;
    }
    
	/**Жалбоподатели*/
    public get complaintPersons(): ComplaintPersons{
        return this._complaintPersons;
    }
    
	/**Жалбоподатели*/ 

    @observable private _refusal: Refusal = null;
    
	/**Заявление по което е отказа*/
    @TypeSystem.propertyDecorator(Refusal ? Refusal : moduleContext.moduleName + '.' + 'Refusal')
    public set refusal(val: Refusal){
        this._refusal = val;
    }
    
	/**Заявление по което е отказа*/
    public get refusal(): Refusal{
        return this._refusal;
    }
    
	/**Заявление по което е отказа*/ 

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('Refusal', moduleContext.moduleName)
export class Refusal extends BaseDataModel { 

    @observable private _incomingNo: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set incomingNo(val: string){
        this._incomingNo = val;
    }
    
    public get incomingNo(): string{
        return this._incomingNo;
    }
     

    @observable private _outgoingNo: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set outgoingNo(val: string){
        this._outgoingNo = val;
    }
    
    public get outgoingNo(): string{
        return this._outgoingNo;
    }
     

    @observable private _refusalID: number = null;
    
    @TypeSystem.propertyDecorator('number')
    public set refusalID(val: number){
        this._refusalID = val;
    }
    
    public get refusalID(): number{
        return this._refusalID;
    }
     

    @observable private _indent: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set indent(val: string){
        this._indent = val;
    }
    
    public get indent(): string{
        return this._indent;
    }
     

    @observable private _name: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set name(val: string){
        this._name = val;
    }
    
    public get name(): string{
        return this._name;
    }
     

    @observable private _description: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set description(val: string){
        this._description = val;
    }
    
    public get description(): string{
        return this._description;
    }
     

    @observable private _address: Address = null;
    
    @TypeSystem.propertyDecorator(Address ? Address : moduleContext.moduleName + '.' + 'Address')
    public set address(val: Address){
        this._address = val;
    }
    
    public get address(): Address{
        return this._address;
    }
     

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('ComplaintPersons', moduleContext.moduleName)
export class ComplaintPersons extends BaseDataModel { 

    @observable private _complaintPersonsList: ComplaintPerson[] = null;
    
    @TypeSystem.propertyArrayDecorator(ComplaintPerson ? ComplaintPerson : moduleContext.moduleName + '.' + 'ComplaintPerson')
    public set complaintPersonsList(val: ComplaintPerson[]){
        this._complaintPersonsList = val;
    }
    
    public get complaintPersonsList(): ComplaintPerson[]{
        return this._complaintPersonsList;
    }
     

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('ComplaintPerson', moduleContext.moduleName)
export class ComplaintPerson extends BaseDataModel { 

    @observable private _person: Person = null;
    
    @TypeSystem.propertyDecorator(Person ? Person : moduleContext.moduleName + '.' + 'Person')
    public set person(val: Person){
        this._person = val;
    }
    
    public get person(): Person{
        return this._person;
    }
     

    @observable private _address: Address = null;
    
    @TypeSystem.propertyDecorator(Address ? Address : moduleContext.moduleName + '.' + 'Address')
    public set address(val: Address){
        this._address = val;
    }
    
    public get address(): Address{
        return this._address;
    }
     

    @observable private _passport: Passport = null;
    
    @TypeSystem.propertyDecorator(Passport ? Passport : moduleContext.moduleName + '.' + 'Passport')
    public set passport(val: Passport){
        this._passport = val;
    }
    
    public get passport(): Passport{
        return this._passport;
    }
     

    @observable private _birthCountry: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set birthCountry(val: string){
        this._birthCountry = val;
    }
    
    public get birthCountry(): string{
        return this._birthCountry;
    }
     

    @observable private _birthPlace: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set birthPlace(val: string){
        this._birthPlace = val;
    }
    
    public get birthPlace(): string{
        return this._birthPlace;
    }
     

    @observable private _includeApplicant: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set includeApplicant(val: boolean){
        this._includeApplicant = val;
    }
    
    public get includeApplicant(): boolean{
        return this._includeApplicant;
    }
     

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('AppointingDemandDocuments', moduleContext.moduleName)
export class AppointingDemandDocuments extends ApplicationFormBase { 

    @observable private _assignmentID: number = null;
    
    @TypeSystem.propertyDecorator('number')
    public set assignmentID(val: number){
        this._assignmentID = val;
    }
    
    public get assignmentID(): number{
        return this._assignmentID;
    }
     

    @observable private _uic: UIC = null;
    
    @TypeSystem.propertyDecorator(UIC ? UIC : moduleContext.moduleName + '.' + 'UIC')
    public set uic(val: UIC){
        this._uic = val;
    }
    
    public get uic(): UIC{
        return this._uic;
    }
     

    @observable private _outgoingNumberX108: OutgoingNumberX108 = null;
    
    @TypeSystem.propertyDecorator(OutgoingNumberX108 ? OutgoingNumberX108 : moduleContext.moduleName + '.' + 'OutgoingNumberX108')
    public set outgoingNumberX108(val: OutgoingNumberX108){
        this._outgoingNumberX108 = val;
    }
    
    public get outgoingNumberX108(): OutgoingNumberX108{
        return this._outgoingNumberX108;
    }
     

    @observable private _assignedExperts: AssignedExperts = null;
    
    @TypeSystem.propertyDecorator(AssignedExperts ? AssignedExperts : moduleContext.moduleName + '.' + 'AssignedExperts')
    public set assignedExperts(val: AssignedExperts){
        this._assignedExperts = val;
    }
    
    public get assignedExperts(): AssignedExperts{
        return this._assignedExperts;
    }
     

    @observable private _releaseReaseonsX110: ReleaseReaseonsX110 = null;
    
    @TypeSystem.propertyDecorator(ReleaseReaseonsX110 ? ReleaseReaseonsX110 : moduleContext.moduleName + '.' + 'ReleaseReaseonsX110')
    public set releaseReaseonsX110(val: ReleaseReaseonsX110){
        this._releaseReaseonsX110 = val;
    }
    
    public get releaseReaseonsX110(): ReleaseReaseonsX110{
        return this._releaseReaseonsX110;
    }
     

    @observable private _assignmentCorrectionNumber: AssignmentCorrectionNumber = null;
    
    @TypeSystem.propertyDecorator(AssignmentCorrectionNumber ? AssignmentCorrectionNumber : moduleContext.moduleName + '.' + 'AssignmentCorrectionNumber')
    public set assignmentCorrectionNumber(val: AssignmentCorrectionNumber){
        this._assignmentCorrectionNumber = val;
    }
    
    public get assignmentCorrectionNumber(): AssignmentCorrectionNumber{
        return this._assignmentCorrectionNumber;
    }
     

    @observable private _applicantsTypeX109: ApplicantsTypeX109 = null;
    
    @TypeSystem.propertyDecorator(ApplicantsTypeX109 ? ApplicantsTypeX109 : moduleContext.moduleName + '.' + 'ApplicantsTypeX109')
    public set applicantsTypeX109(val: ApplicantsTypeX109){
        this._applicantsTypeX109 = val;
    }
    
    public get applicantsTypeX109(): ApplicantsTypeX109{
        return this._applicantsTypeX109;
    }
     

    @observable private _renewAssignmentExchange: RenewAssignmentExchange = null;
    
    @TypeSystem.propertyDecorator(RenewAssignmentExchange ? RenewAssignmentExchange : moduleContext.moduleName + '.' + 'RenewAssignmentExchange')
    public set renewAssignmentExchange(val: RenewAssignmentExchange){
        this._renewAssignmentExchange = val;
    }
    
    public get renewAssignmentExchange(): RenewAssignmentExchange{
        return this._renewAssignmentExchange;
    }
     

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('AppointingDemand', moduleContext.moduleName)
export class AppointingDemand extends ApplicationFormBase { 

    @observable private _uic: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set uic(val: string){
        this._uic = val;
    }
    
    public get uic(): string{
        return this._uic;
    }
     

    @observable private _uicElement: UIC = null;
    
    @TypeSystem.propertyDecorator(UIC ? UIC : moduleContext.moduleName + '.' + 'UIC')
    public set uicElement(val: UIC){
        this._uicElement = val;
    }
    
    public get uicElement(): UIC{
        return this._uicElement;
    }
     

    @observable private _appointingFirms: AppointingFirms = null;
    
    @TypeSystem.propertyDecorator(AppointingFirms ? AppointingFirms : moduleContext.moduleName + '.' + 'AppointingFirms')
    public set appointingFirms(val: AppointingFirms){
        this._appointingFirms = val;
    }
    
    public get appointingFirms(): AppointingFirms{
        return this._appointingFirms;
    }
     

    @observable private _appointingType: AppointingType = null;
    
    @TypeSystem.propertyDecorator(AppointingType ? AppointingType : moduleContext.moduleName + '.' + 'AppointingType')
    public set appointingType(val: AppointingType){
        this._appointingType = val;
    }
    
    public get appointingType(): AppointingType{
        return this._appointingType;
    }
     

    @observable private _notes: Notes = null;
    
    @TypeSystem.propertyDecorator(Notes ? Notes : moduleContext.moduleName + '.' + 'Notes')
    public set notes(val: Notes){
        this._notes = val;
    }
    
    public get notes(): Notes{
        return this._notes;
    }
     

    @observable private _applicantsTypeX109: ApplicantsTypeX109 = null;
    
    @TypeSystem.propertyDecorator(ApplicantsTypeX109 ? ApplicantsTypeX109 : moduleContext.moduleName + '.' + 'ApplicantsTypeX109')
    public set applicantsTypeX109(val: ApplicantsTypeX109){
        this._applicantsTypeX109 = val;
    }
    
    public get applicantsTypeX109(): ApplicantsTypeX109{
        return this._applicantsTypeX109;
    }
     

    @observable private _renewAssignmentExchange: RenewAssignmentExchange = null;
    
    @TypeSystem.propertyDecorator(RenewAssignmentExchange ? RenewAssignmentExchange : moduleContext.moduleName + '.' + 'RenewAssignmentExchange')
    public set renewAssignmentExchange(val: RenewAssignmentExchange){
        this._renewAssignmentExchange = val;
    }
    
    public get renewAssignmentExchange(): RenewAssignmentExchange{
        return this._renewAssignmentExchange;
    }
     

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('D1Fields', moduleContext.moduleName)
export class D1Fields extends ApplicationFormFieldsBase { 

    @observable private _company: F002_Company = null;
    
    @TypeSystem.propertyDecorator(F002_Company ? F002_Company : moduleContext.moduleName + '.' + 'F002_Company')
    public set company(val: F002_Company){
        this._company = val;
    }
    
    public get company(): F002_Company{
        return this._company;
    }
     

    @observable private _legalForm: F003_LegalForm = null;
    
    @TypeSystem.propertyDecorator(F003_LegalForm ? F003_LegalForm : moduleContext.moduleName + '.' + 'F003_LegalForm')
    public set legalForm(val: F003_LegalForm){
        this._legalForm = val;
    }
    
    public get legalForm(): F003_LegalForm{
        return this._legalForm;
    }
     

    @observable private _transliteration: F004_Transliteration = null;
    
    @TypeSystem.propertyDecorator(F004_Transliteration ? F004_Transliteration : moduleContext.moduleName + '.' + 'F004_Transliteration')
    public set transliteration(val: F004_Transliteration){
        this._transliteration = val;
    }
    
    public get transliteration(): F004_Transliteration{
        return this._transliteration;
    }
     

    @observable private _personConcerned: F029_PersonConcerned = null;
    
    @TypeSystem.propertyDecorator(F029_PersonConcerned ? F029_PersonConcerned : moduleContext.moduleName + '.' + 'F029_PersonConcerned')
    public set personConcerned(val: F029_PersonConcerned){
        this._personConcerned = val;
    }
    
    public get personConcerned(): F029_PersonConcerned{
        return this._personConcerned;
    }
     

    @observable private _eraseReservation: F027b_EraseReservation = null;
    
    @TypeSystem.propertyDecorator(F027b_EraseReservation ? F027b_EraseReservation : moduleContext.moduleName + '.' + 'F027b_EraseReservation')
    public set eraseReservation(val: F027b_EraseReservation){
        this._eraseReservation = val;
    }
    
    public get eraseReservation(): F027b_EraseReservation{
        return this._eraseReservation;
    }
     

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('E1', moduleContext.moduleName)
export class E1 extends ApplicationFormBase { 

    @observable private _uic: UIC = null;
    
    @TypeSystem.propertyDecorator(UIC ? UIC : moduleContext.moduleName + '.' + 'UIC')
    public set uic(val: UIC){
        this._uic = val;
    }
    
    public get uic(): UIC{
        return this._uic;
    }
     

    @observable private _conformityWithLawReason: ConformityWithLawReason = null;
    
    @TypeSystem.propertyDecorator(ConformityWithLawReason ? ConformityWithLawReason : moduleContext.moduleName + '.' + 'ConformityWithLawReason')
    public set conformityWithLawReason(val: ConformityWithLawReason){
        this._conformityWithLawReason = val;
    }
    
    public get conformityWithLawReason(): ConformityWithLawReason{
        return this._conformityWithLawReason;
    }
     

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('ConformityWithLawReason', moduleContext.moduleName)
export class ConformityWithLawReason extends BaseDataModel { 

    @observable private _euContryCompanyFusion: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set euContryCompanyFusion(val: boolean){
        this._euContryCompanyFusion = val;
    }
    
    public get euContryCompanyFusion(): boolean{
        return this._euContryCompanyFusion;
    }
     

    @observable private _euCountryCompanyEstablishing: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set euCountryCompanyEstablishing(val: boolean){
        this._euCountryCompanyEstablishing = val;
    }
    
    public get euCountryCompanyEstablishing(): boolean{
        return this._euCountryCompanyEstablishing;
    }
     

    @observable private _euCompanySeatShifting: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set euCompanySeatShifting(val: boolean){
        this._euCompanySeatShifting = val;
    }
    
    public get euCompanySeatShifting(): boolean{
        return this._euCompanySeatShifting;
    }
     

    @observable private _euCountryCoOperativeCompanyEstablishing: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set euCountryCoOperativeCompanyEstablishing(val: boolean){
        this._euCountryCoOperativeCompanyEstablishing = val;
    }
    
    public get euCountryCoOperativeCompanyEstablishing(): boolean{
        return this._euCountryCoOperativeCompanyEstablishing;
    }
     

    @observable private _euCoOperativeCompanySeatShifting: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set euCoOperativeCompanySeatShifting(val: boolean){
        this._euCoOperativeCompanySeatShifting = val;
    }
    
    public get euCoOperativeCompanySeatShifting(): boolean{
        return this._euCoOperativeCompanySeatShifting;
    }
     

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('IncomingRequestForCorrection', moduleContext.moduleName)
export class IncomingRequestForCorrection extends ApplicationFormBase { 

    @observable private _uic: UIC = null;
    
    @TypeSystem.propertyDecorator(UIC ? UIC : moduleContext.moduleName + '.' + 'UIC')
    public set uic(val: UIC){
        this._uic = val;
    }
    
    public get uic(): UIC{
        return this._uic;
    }
     

    @observable private _requestForCorrection: RequestForCorrection = null;
    
    @TypeSystem.propertyDecorator(RequestForCorrection ? RequestForCorrection : moduleContext.moduleName + '.' + 'RequestForCorrection')
    public set requestForCorrection(val: RequestForCorrection){
        this._requestForCorrection = val;
    }
    
    public get requestForCorrection(): RequestForCorrection{
        return this._requestForCorrection;
    }
     

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('RequestForCorrection', moduleContext.moduleName)
export class RequestForCorrection extends BaseDataModel { 

    @observable private _subject: Person = null;
    
    @TypeSystem.propertyDecorator(Person ? Person : moduleContext.moduleName + '.' + 'Person')
    public set subject(val: Person){
        this._subject = val;
    }
    
    public get subject(): Person{
        return this._subject;
    }
     

    @observable private _incomingNumber: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set incomingNumber(val: string){
        this._incomingNumber = val;
    }
    
    public get incomingNumber(): string{
        return this._incomingNumber;
    }
     

    @observable private _regNumber: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set regNumber(val: string){
        this._regNumber = val;
    }
    
    public get regNumber(): string{
        return this._regNumber;
    }
     

    @observable private _outgoingNumber: OutgoingNumber = null;
    
    @TypeSystem.propertyDecorator(OutgoingNumber ? OutgoingNumber : moduleContext.moduleName + '.' + 'OutgoingNumber')
    public set outgoingNumber(val: OutgoingNumber){
        this._outgoingNumber = val;
    }
    
    public get outgoingNumber(): OutgoingNumber{
        return this._outgoingNumber;
    }
     

    @observable private _description: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set description(val: string){
        this._description = val;
    }
    
    public get description(): string{
        return this._description;
    }
     

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('J1', moduleContext.moduleName)
export class J1 extends ApplicationFormBase { 

    @observable private _uic: UIC = null;
    
    @TypeSystem.propertyDecorator(UIC ? UIC : moduleContext.moduleName + '.' + 'UIC')
    public set uic(val: UIC){
        this._uic = val;
    }
    
    public get uic(): UIC{
        return this._uic;
    }
     

    @observable private _incomingNumber: IncomingNumber = null;
    
    @TypeSystem.propertyDecorator(IncomingNumber ? IncomingNumber : moduleContext.moduleName + '.' + 'IncomingNumber')
    public set incomingNumber(val: IncomingNumber){
        this._incomingNumber = val;
    }
    
    public get incomingNumber(): IncomingNumber{
        return this._incomingNumber;
    }
     

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('IncomingNumber', moduleContext.moduleName)
export class IncomingNumber extends BaseDataModel { 

    @observable private _incomingNo: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set incomingNo(val: string){
        this._incomingNo = val;
    }
    
    public get incomingNo(): string{
        return this._incomingNo;
    }
     

    @observable private _outgoingNo: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set outgoingNo(val: string){
        this._outgoingNo = val;
    }
    
    public get outgoingNo(): string{
        return this._outgoingNo;
    }
     

    @observable private _outgoingNoAB: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set outgoingNoAB(val: string){
        this._outgoingNoAB = val;
    }
    
    public get outgoingNoAB(): string{
        return this._outgoingNoAB;
    }
     

    @observable private _indent: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set indent(val: string){
        this._indent = val;
    }
    
    public get indent(): string{
        return this._indent;
    }
     

    @observable private _name: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set name(val: string){
        this._name = val;
    }
    
    public get name(): string{
        return this._name;
    }
     

    @observable private _deeds: DeedSummary[] = null;
    
    @TypeSystem.propertyArrayDecorator(DeedSummary ? DeedSummary : moduleContext.moduleName + '.' + 'DeedSummary')
    public set deeds(val: DeedSummary[]){
        this._deeds = val;
    }
    
    public get deeds(): DeedSummary[]{
        return this._deeds;
    }
     

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('CertificateForReservedCompany', moduleContext.moduleName)
export class CertificateForReservedCompany extends BaseDataModel { 

    @observable private _firm: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set firm(val: string){
        this._firm = val;
    }
    
    public get firm(): string{
        return this._firm;
    }
     

    @observable private _personConcernedName: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set personConcernedName(val: string){
        this._personConcernedName = val;
    }
    
    public get personConcernedName(): string{
        return this._personConcernedName;
    }
     

    @observable private _personConcernedQuality: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set personConcernedQuality(val: string){
        this._personConcernedQuality = val;
    }
    
    public get personConcernedQuality(): string{
        return this._personConcernedQuality;
    }
     

    @observable private _endDate: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set endDate(val: string){
        this._endDate = val;
    }
    
    public get endDate(): string{
        return this._endDate;
    }
     

    @observable private _fromDate: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set fromDate(val: string){
        this._fromDate = val;
    }
    
    public get fromDate(): string{
        return this._fromDate;
    }
     

    @observable private _applicantName: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set applicantName(val: string){
        this._applicantName = val;
    }
    
    public get applicantName(): string{
        return this._applicantName;
    }
     

    @observable private _translit: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set translit(val: string){
        this._translit = val;
    }
    
    public get translit(): string{
        return this._translit;
    }
     

    @observable private _number: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set number(val: string){
        this._number = val;
    }
    
    public get number(): string{
        return this._number;
    }
     

    @observable private _date: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set date(val: string){
        this._date = val;
    }
    
    public get date(): string{
        return this._date;
    }
     

    @observable private _period: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set period(val: string){
        this._period = val;
    }
    
    public get period(): string{
        return this._period;
    }
     

    @observable private _email: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set email(val: string){
        this._email = val;
    }
    
    public get email(): string{
        return this._email;
    }
     

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('ApplicantsTypeX109', moduleContext.moduleName)
export class ApplicantsTypeX109 extends BaseDataModel { 

    @observable private _appointingApplicantType: AppointingApplicantType = null;
    
    @TypeSystem.propertyDecorator(AppointingApplicantType ? AppointingApplicantType : moduleContext.moduleName + '.' + 'AppointingApplicantType')
    public set appointingApplicantType(val: AppointingApplicantType){
        this._appointingApplicantType = val;
    }
    
    public get appointingApplicantType(): AppointingApplicantType{
        return this._appointingApplicantType;
    }
     

    @observable private _appointingApplicantTypeText: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set appointingApplicantTypeText(val: string){
        this._appointingApplicantTypeText = val;
    }
    
    public get appointingApplicantTypeText(): string{
        return this._appointingApplicantTypeText;
    }
     

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('AppointingFirm', moduleContext.moduleName)
export class AppointingFirm extends BaseDataModel { 

    @observable private _firm: Person = null;
    
    @TypeSystem.propertyDecorator(Person ? Person : moduleContext.moduleName + '.' + 'Person')
    public set firm(val: Person){
        this._firm = val;
    }
    
    public get firm(): Person{
        return this._firm;
    }
     

    @observable private _address: Address = null;
    
    @TypeSystem.propertyDecorator(Address ? Address : moduleContext.moduleName + '.' + 'Address')
    public set address(val: Address){
        this._address = val;
    }
    
    public get address(): Address{
        return this._address;
    }
     

    @observable private _firmGuid: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set firmGuid(val: string){
        this._firmGuid = val;
    }
    
    public get firmGuid(): string{
        return this._firmGuid;
    }
     

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('AppointingFirms', moduleContext.moduleName)
export class AppointingFirms extends BaseDataModel { 

    @observable private _appointingFirmList: AppointingFirm[] = null;
    
    @TypeSystem.propertyArrayDecorator(AppointingFirm ? AppointingFirm : moduleContext.moduleName + '.' + 'AppointingFirm')
    public set appointingFirmList(val: AppointingFirm[]){
        this._appointingFirmList = val;
    }
    
    public get appointingFirmList(): AppointingFirm[]{
        return this._appointingFirmList;
    }
     

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('AppointingType', moduleContext.moduleName)
export class AppointingType extends BaseDataModel { 

    @observable private _appointingExpertType: AppointingExpertType = null;
    
    @TypeSystem.propertyDecorator(AppointingExpertType ? AppointingExpertType : moduleContext.moduleName + '.' + 'AppointingExpertType')
    public set appointingExpertType(val: AppointingExpertType){
        this._appointingExpertType = val;
    }
    
    public get appointingExpertType(): AppointingExpertType{
        return this._appointingExpertType;
    }
     

    @observable private _appointingExpertTypeText: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set appointingExpertTypeText(val: string){
        this._appointingExpertTypeText = val;
    }
    
    public get appointingExpertTypeText(): string{
        return this._appointingExpertTypeText;
    }
     

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('AssignedExpert', moduleContext.moduleName)
export class AssignedExpert extends BaseDataModel { 

    @observable private _name: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set name(val: string){
        this._name = val;
    }
    
    public get name(): string{
        return this._name;
    }
     

    @observable private _egn: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set egn(val: string){
        this._egn = val;
    }
    
    public get egn(): string{
        return this._egn;
    }
     

    @observable private _address: Address = null;
    
    @TypeSystem.propertyDecorator(Address ? Address : moduleContext.moduleName + '.' + 'Address')
    public set address(val: Address){
        this._address = val;
    }
    
    public get address(): Address{
        return this._address;
    }
     

    @observable private _email: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set email(val: string){
        this._email = val;
    }
    
    public get email(): string{
        return this._email;
    }
     

    @observable private _agreementForMail: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set agreementForMail(val: boolean){
        this._agreementForMail = val;
    }
    
    public get agreementForMail(): boolean{
        return this._agreementForMail;
    }
     

    @observable private _specialty: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set specialty(val: string){
        this._specialty = val;
    }
    
    public get specialty(): string{
        return this._specialty;
    }
     

    @observable private _abilities: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set abilities(val: string){
        this._abilities = val;
    }
    
    public get abilities(): string{
        return this._abilities;
    }
     

    @observable private _phone: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set phone(val: string){
        this._phone = val;
    }
    
    public get phone(): string{
        return this._phone;
    }
     

    @observable private _expertID: number = null;
    
    @TypeSystem.propertyDecorator('number')
    public set expertID(val: number){
        this._expertID = val;
    }
    
    public get expertID(): number{
        return this._expertID;
    }
     

    @observable private _expertGuid: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set expertGuid(val: string){
        this._expertGuid = val;
    }
    
    public get expertGuid(): string{
        return this._expertGuid;
    }
     

    @observable private _preferedChanel: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set preferedChanel(val: string){
        this._preferedChanel = val;
    }
    
    public get preferedChanel(): string{
        return this._preferedChanel;
    }
     

    @observable private _individualNumber: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set individualNumber(val: string){
        this._individualNumber = val;
    }
    
    public get individualNumber(): string{
        return this._individualNumber;
    }
     

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('AssignedExperts', moduleContext.moduleName)
export class AssignedExperts extends BaseDataModel { 

    @observable private _assignedExpertList: AssignedExpert[] = null;
    
    @TypeSystem.propertyArrayDecorator(AssignedExpert ? AssignedExpert : moduleContext.moduleName + '.' + 'AssignedExpert')
    public set assignedExpertList(val: AssignedExpert[]){
        this._assignedExpertList = val;
    }
    
    public get assignedExpertList(): AssignedExpert[]{
        return this._assignedExpertList;
    }
     

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('AssignmentCorrectionNumber', moduleContext.moduleName)
export class AssignmentCorrectionNumber extends BaseDataModel { 

    @observable private _value: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set value(val: string){
        this._value = val;
    }
    
    public get value(): string{
        return this._value;
    }
     

    @observable private _applicationStatuses: ApplicationStatuses = null;
    
    @TypeSystem.propertyDecorator(ApplicationStatuses ? ApplicationStatuses : moduleContext.moduleName + '.' + 'ApplicationStatuses')
    public set applicationStatuses(val: ApplicationStatuses){
        this._applicationStatuses = val;
    }
    
    public get applicationStatuses(): ApplicationStatuses{
        return this._applicationStatuses;
    }
     

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('Note', moduleContext.moduleName)
export class Note extends BaseDataModel { 

    @observable private _text: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set text(val: string){
        this._text = val;
    }
    
    public get text(): string{
        return this._text;
    }
     

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('Notes', moduleContext.moduleName)
export class Notes extends BaseDataModel { 

    @observable private _noteList: Note[] = null;
    
    @TypeSystem.propertyArrayDecorator(Note ? Note : moduleContext.moduleName + '.' + 'Note')
    public set noteList(val: Note[]){
        this._noteList = val;
    }
    
    public get noteList(): Note[]{
        return this._noteList;
    }
     

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('OutgoingNumberX108', moduleContext.moduleName)
export class OutgoingNumberX108 extends BaseDataModel { 

    @observable private _parts: OutgoingNumber = null;
    
    @TypeSystem.propertyDecorator(OutgoingNumber ? OutgoingNumber : moduleContext.moduleName + '.' + 'OutgoingNumber')
    public set parts(val: OutgoingNumber){
        this._parts = val;
    }
    
    public get parts(): OutgoingNumber{
        return this._parts;
    }
     

    @observable private _appointingExpertType: AppointingExpertType = null;
    
    @TypeSystem.propertyDecorator(AppointingExpertType ? AppointingExpertType : moduleContext.moduleName + '.' + 'AppointingExpertType')
    public set appointingExpertType(val: AppointingExpertType){
        this._appointingExpertType = val;
    }
    
    public get appointingExpertType(): AppointingExpertType{
        return this._appointingExpertType;
    }
     

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('ReleaseReaseonsX110', moduleContext.moduleName)
export class ReleaseReaseonsX110 extends BaseDataModel { 

    @observable private _releaseReasonText: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set releaseReasonText(val: string){
        this._releaseReasonText = val;
    }
    
    public get releaseReasonText(): string{
        return this._releaseReasonText;
    }
     

    @observable private _releaseReasonID: number = null;
    
    @TypeSystem.propertyDecorator('number')
    public set releaseReasonID(val: number){
        this._releaseReasonID = val;
    }
    
    public get releaseReasonID(): number{
        return this._releaseReasonID;
    }
     

    @observable private _releaseReasonNote: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set releaseReasonNote(val: string){
        this._releaseReasonNote = val;
    }
    
    public get releaseReasonNote(): string{
        return this._releaseReasonNote;
    }
     

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('RenewAssignmentExchange', moduleContext.moduleName)
export class RenewAssignmentExchange extends BaseDataModel { 

    @observable private _cheked: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set cheked(val: boolean){
        this._cheked = val;
    }
    
    public get cheked(): boolean{
        return this._cheked;
    }
     

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F027b_EraseReservation', moduleContext.moduleName)
export class F027b_EraseReservation extends RecordField { 

    @observable private _reservedFirmIncomingNumber: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set reservedFirmIncomingNumber(val: string){
        this._reservedFirmIncomingNumber = val;
    }
    
    public get reservedFirmIncomingNumber(): string{
        return this._reservedFirmIncomingNumber;
    }
     

    @observable private _reservedFirmIncomingID: number = null;
    
    @TypeSystem.propertyDecorator('number')
    public set reservedFirmIncomingID(val: number){
        this._reservedFirmIncomingID = val;
    }
    
    public get reservedFirmIncomingID(): number{
        return this._reservedFirmIncomingID;
    }
     

    @observable private _cheked: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set cheked(val: boolean){
        this._cheked = val;
    }
    
    public get cheked(): boolean{
        return this._cheked;
    }
     

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F029_PersonConcerned', moduleContext.moduleName)
export class F029_PersonConcerned extends RecordField { 

    @observable private _subject: Person = null;
    
    @TypeSystem.propertyDecorator(Person ? Person : moduleContext.moduleName + '.' + 'Person')
    public set subject(val: Person){
        this._subject = val;
    }
    
    public get subject(): Person{
        return this._subject;
    }
     

    @observable private _address: Address = null;
    
    @TypeSystem.propertyDecorator(Address ? Address : moduleContext.moduleName + '.' + 'Address')
    public set address(val: Address){
        this._address = val;
    }
    
    public get address(): Address{
        return this._address;
    }
     

    @observable private _quality: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set quality(val: string){
        this._quality = val;
    }
    
    public get quality(): string{
        return this._quality;
    }
     

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}











