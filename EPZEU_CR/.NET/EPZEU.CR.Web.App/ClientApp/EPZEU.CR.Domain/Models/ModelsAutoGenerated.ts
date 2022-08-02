

// Auto Generated Object
import * as moment from 'moment'
import { observable, computed } from 'mobx'
import { TypeSystem, BaseDataModel } from 'Cnsys.Core'
import { moduleContext } from '../ModuleContext'
import { Person } from './Person'
import { Address } from './Address'
import { LegalForms, DeedStatuses, SubDeedStatuses, ApplicationFormTypes, SubUICTypes, ElementHolderAdditionFlags, CompanyNameSuffixFlags, FieldOperations, EraseOperations } from 'EPZEU.CR.Core'
import { AttachedDocument } from './AttachedDocument'



/**Типове статуси на пакета.*/
export enum ProcessStatuses { 
    
	/**В процес на подаване*/
    InProcess = 1,
    
	/**Впреоцес на подписване*/
    Signing = 2,
    
	/**С грешка при подписване*/
    ErrorInSignature = 3,
    
	/**Чака приключване на пререгистрация*/
    WaitPreregistrationCompletion = 4,
    
	/**Готово за изпращане*/
    ReadyForSending = 5,
    
	/**Изпраща се*/
    Sending = 6,
    
	/**Прието*/
    Accepted = 7,
    
	/**Грешка при приемане*/
    ErrorInAccepting = 8,
    
	/**Приключен*/
    Completed = 9,
 }
TypeSystem.registerEnumInfo(ProcessStatuses , 'ProcessStatuses' , moduleContext.moduleName)




export enum ProcessStates { 
    
    New = 0,
    
    ForChange = 1,
    
    Preregistration = 2,
 }
TypeSystem.registerEnumInfo(ProcessStates , 'ProcessStates' , moduleContext.moduleName)




export enum RecordOperations { 
    
    Add = 0,
    
    Erase = 1,
    
    Current = 2,
 }
TypeSystem.registerEnumInfo(RecordOperations , 'RecordOperations' , moduleContext.moduleName)


export enum IndentTypes { 
    
    Undefined = 0,
    
    EGN = 1,
    
    LNCH = 2,
    
    UIC = 3,
    
    Bulstat = 4,
    
    BirthDate = 5,
 }
TypeSystem.registerEnumInfo(IndentTypes , 'IndentTypes' , moduleContext.moduleName)


export enum PersonType { 
    
    Person = 0,
    
    Subject = 1,
 }
TypeSystem.registerEnumInfo(PersonType , 'PersonType' , moduleContext.moduleName)




export enum EuropeanEconomicInterestRepresenterTypes { 
    
    Undefined = 0,
    
    Regular = 1,
    
    Liquidator = 2,
    
    Trustee = 3,
 }
TypeSystem.registerEnumInfo(EuropeanEconomicInterestRepresenterTypes , 'EuropeanEconomicInterestRepresenterTypes' , moduleContext.moduleName)




@TypeSystem.typeDecorator('ApplicantExchange', moduleContext.moduleName)
export class ApplicantExchange extends BaseDataModel { 

    @observable private _agree: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set agree(val: boolean){
        this._agree = val;
    }
    
    public get agree(): boolean{
        return this._agree;
    }
     

    @observable private _notAgree: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set notAgree(val: boolean){
        this._notAgree = val;
    }
    
    public get notAgree(): boolean{
        return this._notAgree;
    }
     

    @observable private _nrA_Art_100_1: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set nrA_Art_100_1(val: boolean){
        this._nrA_Art_100_1 = val;
    }
    
    public get nrA_Art_100_1(): boolean{
        return this._nrA_Art_100_1;
    }
     

    @observable private _nrA_Art_100_2: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set nrA_Art_100_2(val: boolean){
        this._nrA_Art_100_2 = val;
    }
    
    public get nrA_Art_100_2(): boolean{
        return this._nrA_Art_100_2;
    }
     

    @observable private _addresseeGuid: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set addresseeGuid(val: string){
        this._addresseeGuid = val;
    }
    
    public get addresseeGuid(): string{
        return this._addresseeGuid;
    }
     

    @observable private _email: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set email(val: string){
        this._email = val;
    }
    
    public get email(): string{
        return this._email;
    }
     

    @observable private _address: Address = null;
    
    @TypeSystem.propertyDecorator(Address ? Address : moduleContext.moduleName + '.' + 'Address')
    public set address(val: Address){
        this._address = val;
    }
    
    public get address(): Address{
        return this._address;
    }
     

    @observable private _addressee: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set addressee(val: string){
        this._addressee = val;
    }
    
    public get addressee(): string{
        return this._addressee;
    }
     

    constructor(obj?: any){
        super(obj)
        
        this.copyFrom(obj);       
    }
}

@TypeSystem.typeDecorator('ApplicantInfo', moduleContext.moduleName)
export class ApplicantInfo extends BaseDataModel { 

    @observable private _applicants: Applicants = null;
    
    @TypeSystem.propertyDecorator(Applicants ? Applicants : moduleContext.moduleName + '.' + 'Applicants')
    public set applicants(val: Applicants){
        this._applicants = val;
    }
    
    public get applicants(): Applicants{
        return this._applicants;
    }
     

    @observable private _applicantCapacity: ApplicantCapacity = null;
    
    @TypeSystem.propertyDecorator(ApplicantCapacity ? ApplicantCapacity : moduleContext.moduleName + '.' + 'ApplicantCapacity')
    public set applicantCapacity(val: ApplicantCapacity){
        this._applicantCapacity = val;
    }
    
    public get applicantCapacity(): ApplicantCapacity{
        return this._applicantCapacity;
    }
     

    @observable private _applicantRepresentative: ApplicantRepresentative = null;
    
    @TypeSystem.propertyDecorator(ApplicantRepresentative ? ApplicantRepresentative : moduleContext.moduleName + '.' + 'ApplicantRepresentative')
    public set applicantRepresentative(val: ApplicantRepresentative){
        this._applicantRepresentative = val;
    }
    
    public get applicantRepresentative(): ApplicantRepresentative{
        return this._applicantRepresentative;
    }
     

    constructor(obj?: any){
        super(obj)
        
        this.copyFrom(obj);       
    }
}

@TypeSystem.typeDecorator('Applicants', moduleContext.moduleName)
export class Applicants extends BaseDataModel { 

    @observable private _applicantsList: Applicant[] = null;
    
    @TypeSystem.propertyArrayDecorator(Applicant ? Applicant : moduleContext.moduleName + '.' + 'Applicant')
    public set applicantsList(val: Applicant[]){
        this._applicantsList = val;
    }
    
    public get applicantsList(): Applicant[]{
        return this._applicantsList;
    }
     

    constructor(obj?: any){
        super(obj)
        
        this.copyFrom(obj);       
    }
}

@TypeSystem.typeDecorator('Applicant', moduleContext.moduleName)
export class Applicant extends BaseDataModel { 

    @observable private _person: Person = null;
    
    @TypeSystem.propertyDecorator(Person ? Person : moduleContext.moduleName + '.' + 'Person')
    public set person(val: Person){
        this._person = val;
    }
    
    public get person(): Person{
        return this._person;
    }
     

    @observable private _birthPlace: BirthPlace = null;
    
    @TypeSystem.propertyDecorator(BirthPlace ? BirthPlace : moduleContext.moduleName + '.' + 'BirthPlace')
    public set birthPlace(val: BirthPlace){
        this._birthPlace = val;
    }
    
    public get birthPlace(): BirthPlace{
        return this._birthPlace;
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
     

    @observable private _deputy: Deputy = null;
    
    @TypeSystem.propertyDecorator(Deputy ? Deputy : moduleContext.moduleName + '.' + 'Deputy')
    public set deputy(val: Deputy){
        this._deputy = val;
    }
    
    public get deputy(): Deputy{
        return this._deputy;
    }
     

    @observable private _applicantGuid: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set applicantGuid(val: string){
        this._applicantGuid = val;
    }
    
    public get applicantGuid(): string{
        return this._applicantGuid;
    }
     

    constructor(obj?: any){
        super(obj)
        
        this.copyFrom(obj);       
    }
}

@TypeSystem.typeDecorator('ApplicantCapacity', moduleContext.moduleName)
export class ApplicantCapacity extends BaseDataModel { 

    @observable private _trader: boolean = null;
    
	/**Търговец*/
    @TypeSystem.propertyDecorator('boolean')
    public set trader(val: boolean){
        this._trader = val;
    }
    
	/**Търговец*/
    public get trader(): boolean{
        return this._trader;
    }
    
	/**Търговец*/ 

    @observable private _lawyerWithLetter: boolean = null;
    
	/**Адвокат и изрично пълномощно*/
    @TypeSystem.propertyDecorator('boolean')
    public set lawyerWithLetter(val: boolean){
        this._lawyerWithLetter = val;
    }
    
	/**Адвокат и изрично пълномощно*/
    public get lawyerWithLetter(): boolean{
        return this._lawyerWithLetter;
    }
    
	/**Адвокат и изрично пълномощно*/ 

    @observable private _anotherFace: boolean = null;
    
	/**Друго лице в предвидените от закона случаи*/
    @TypeSystem.propertyDecorator('boolean')
    public set anotherFace(val: boolean){
        this._anotherFace = val;
    }
    
	/**Друго лице в предвидените от закона случаи*/
    public get anotherFace(): boolean{
        return this._anotherFace;
    }
    
	/**Друго лице в предвидените от закона случаи*/ 

    @observable private _financialAccountCreator: boolean = null;
    
	/**Счетоводител, който подава годишен отчет*/
    @TypeSystem.propertyDecorator('boolean')
    public set financialAccountCreator(val: boolean){
        this._financialAccountCreator = val;
    }
    
	/**Счетоводител, който подава годишен отчет*/
    public get financialAccountCreator(): boolean{
        return this._financialAccountCreator;
    }
    
	/**Счетоводител, който подава годишен отчет*/ 

    @observable private _assignmentApplicant: boolean = null;
    
	/**Заявител по първоначалното искане*/
    @TypeSystem.propertyDecorator('boolean')
    public set assignmentApplicant(val: boolean){
        this._assignmentApplicant = val;
    }
    
	/**Заявител по първоначалното искане*/
    public get assignmentApplicant(): boolean{
        return this._assignmentApplicant;
    }
    
	/**Заявител по първоначалното искане*/ 

    @observable private _assignedExpert: boolean = null;
    
	/**Назначено лице*/
    @TypeSystem.propertyDecorator('boolean')
    public set assignedExpert(val: boolean){
        this._assignedExpert = val;
    }
    
	/**Назначено лице*/
    public get assignedExpert(): boolean{
        return this._assignedExpert;
    }
    
	/**Назначено лице*/ 

    @observable private _applicantLawyerWithPower: boolean = null;
    
	/**Адвокат на заявителя с изрично пълномощно*/
    @TypeSystem.propertyDecorator('boolean')
    public set applicantLawyerWithPower(val: boolean){
        this._applicantLawyerWithPower = val;
    }
    
	/**Адвокат на заявителя с изрично пълномощно*/
    public get applicantLawyerWithPower(): boolean{
        return this._applicantLawyerWithPower;
    }
    
	/**Адвокат на заявителя с изрично пълномощно*/ 

    @observable private _procurator: boolean = null;
    
	/**Прокурист*/
    @TypeSystem.propertyDecorator('boolean')
    public set procurator(val: boolean){
        this._procurator = val;
    }
    
	/**Прокурист*/
    public get procurator(): boolean{
        return this._procurator;
    }
    
	/**Прокурист*/ 

    @observable private _personRepresentingTheFoundation: boolean = null;
    
	/**лице, представляващо фондацията*/
    @TypeSystem.propertyDecorator('boolean')
    public set personRepresentingTheFoundation(val: boolean){
        this._personRepresentingTheFoundation = val;
    }
    
	/**лице, представляващо фондацията*/
    public get personRepresentingTheFoundation(): boolean{
        return this._personRepresentingTheFoundation;
    }
    
	/**лице, представляващо фондацията*/ 

    @observable private _personRepresentingTheAssociation: boolean = null;
    
	/**лице, представляващо сдружението*/
    @TypeSystem.propertyDecorator('boolean')
    public set personRepresentingTheAssociation(val: boolean){
        this._personRepresentingTheAssociation = val;
    }
    
	/**лице, представляващо сдружението*/
    public get personRepresentingTheAssociation(): boolean{
        return this._personRepresentingTheAssociation;
    }
    
	/**лице, представляващо сдружението*/ 

    @observable private _personRepresentingCommunityCentrer: boolean = null;
    
	/**лице, представляващо читалището*/
    @TypeSystem.propertyDecorator('boolean')
    public set personRepresentingCommunityCentrer(val: boolean){
        this._personRepresentingCommunityCentrer = val;
    }
    
	/**лице, представляващо читалището*/
    public get personRepresentingCommunityCentrer(): boolean{
        return this._personRepresentingCommunityCentrer;
    }
    
	/**лице, представляващо читалището*/ 

    @observable private _personRepresentingBranchOfNonProfitForeignLegalEntity: boolean = null;
    
	/**лице, представляващо клон на чуждестранно юридическо лице с нестопанска цел*/
    @TypeSystem.propertyDecorator('boolean')
    public set personRepresentingBranchOfNonProfitForeignLegalEntity(val: boolean){
        this._personRepresentingBranchOfNonProfitForeignLegalEntity = val;
    }
    
	/**лице, представляващо клон на чуждестранно юридическо лице с нестопанска цел*/
    public get personRepresentingBranchOfNonProfitForeignLegalEntity(): boolean{
        return this._personRepresentingBranchOfNonProfitForeignLegalEntity;
    }
    
	/**лице, представляващо клон на чуждестранно юридическо лице с нестопанска цел*/ 

    constructor(obj?: any){
        super(obj)
        
        this.copyFrom(obj);       
    }
}

@TypeSystem.typeDecorator('ApplicantRepresentative', moduleContext.moduleName)
export class ApplicantRepresentative extends BaseDataModel { 

    @observable private _person: Person = null;
    
    @TypeSystem.propertyDecorator(Person ? Person : moduleContext.moduleName + '.' + 'Person')
    public set person(val: Person){
        this._person = val;
    }
    
    public get person(): Person{
        return this._person;
    }
     

    @observable private _birthPlace: BirthPlace = null;
    
    @TypeSystem.propertyDecorator(BirthPlace ? BirthPlace : moduleContext.moduleName + '.' + 'BirthPlace')
    public set birthPlace(val: BirthPlace){
        this._birthPlace = val;
    }
    
    public get birthPlace(): BirthPlace{
        return this._birthPlace;
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
     

    @observable private _deputy: Deputy = null;
    
    @TypeSystem.propertyDecorator(Deputy ? Deputy : moduleContext.moduleName + '.' + 'Deputy')
    public set deputy(val: Deputy){
        this._deputy = val;
    }
    
    public get deputy(): Deputy{
        return this._deputy;
    }
     

    constructor(obj?: any){
        super(obj)
        
        this.copyFrom(obj);       
    }
}


@TypeSystem.typeDecorator('Record', moduleContext.moduleName)
export class Record extends BaseDataModel { 

    @observable private _fieldIdent: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set fieldIdent(val: string){
        this._fieldIdent = val;
    }
    
    public get fieldIdent(): string{
        return this._fieldIdent;
    }
     

    @observable private _recordOperation: RecordOperations = null;
    
    @TypeSystem.propertyDecorator(RecordOperations ? RecordOperations : moduleContext.moduleName + '.' + 'RecordOperations')
    public set recordOperation(val: RecordOperations){
        this._recordOperation = val;
    }
    
    public get recordOperation(): RecordOperations{
        return this._recordOperation;
    }
     
    
    @observable private _recordMinActionDate: moment.Moment = null;
    
    @TypeSystem.propertyDecorator('moment')
    public set recordMinActionDate(val: moment.Moment){
        this._recordMinActionDate = val;
    }
    
    public get recordMinActionDate(): moment.Moment{
        return this._recordMinActionDate;
    } 

    @observable private _recordID: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set recordID(val: string){
        this._recordID = val;
    }
    
    public get recordID(): string{
        return this._recordID;
    }
     

    @observable private _eraseOperation: EraseOperations = null;
    
    @TypeSystem.propertyDecorator(EraseOperations ? EraseOperations : moduleContext.moduleName + '.' + 'EraseOperations')
    public set eraseOperation(val: EraseOperations){
        this._eraseOperation = val;
    }
    
    public get eraseOperation(): EraseOperations{
        return this._eraseOperation;
    }
     
                
    @observable private _initialState: any = null;
    
    @TypeSystem.propertyDecorator('any')
    public set initialState(val: any){
        this._initialState = val;
    }
    
    public get initialState(): any{
        return this._initialState;
    } 

    constructor(obj?: any){
        super(obj)
        
        this.copyFrom(obj);       
    }
}

@TypeSystem.typeDecorator('RecordField', moduleContext.moduleName)
export class RecordField extends Record { 

    @observable private _fieldEntryNumber: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set fieldEntryNumber(val: string){
        this._fieldEntryNumber = val;
    }
    
    public get fieldEntryNumber(): string{
        return this._fieldEntryNumber;
    }
     
    
    @observable private _fieldEntryDate: moment.Moment = null;
    
    @TypeSystem.propertyDecorator('moment')
    public set fieldEntryDate(val: moment.Moment){
        this._fieldEntryDate = val;
    }
    
    public get fieldEntryDate(): moment.Moment{
        return this._fieldEntryDate;
    } 
    
    @observable private _fieldActionDate: moment.Moment = null;
    
    @TypeSystem.propertyDecorator('moment')
    public set fieldActionDate(val: moment.Moment){
        this._fieldActionDate = val;
    }
    
    public get fieldActionDate(): moment.Moment{
        return this._fieldActionDate;
    } 

    @observable private _fieldOperation: FieldOperations = null;
    
    @TypeSystem.propertyDecorator(FieldOperations ? FieldOperations : moduleContext.moduleName + '.' + 'FieldOperations')
    public set fieldOperation(val: FieldOperations){
        this._fieldOperation = val;
    }
    
    public get fieldOperation(): FieldOperations{
        return this._fieldOperation;
    }
     

    @observable private _entryApplicationType: ApplicationFormTypes = null;
    
    @TypeSystem.propertyDecorator(ApplicationFormTypes ? ApplicationFormTypes : moduleContext.moduleName + '.' + 'ApplicationFormTypes')
    public set entryApplicationType(val: ApplicationFormTypes){
        this._entryApplicationType = val;
    }
    
    public get entryApplicationType(): ApplicationFormTypes{
        return this._entryApplicationType;
    }
     

    constructor(obj?: any){
        super(obj)
        
        this.copyFrom(obj);       
    }
}

@TypeSystem.typeDecorator('ActivityNKIDField', moduleContext.moduleName)
export class ActivityNKIDField extends RecordField { 

    @observable private _codeNkid: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set codeNkid(val: string){
        this._codeNkid = val;
    }
    
    public get codeNkid(): string{
        return this._codeNkid;
    }
     

    @observable private _textNkid: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set textNkid(val: string){
        this._textNkid = val;
    }
    
    public get textNkid(): string{
        return this._textNkid;
    }
     

    @observable private _idNkid: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set idNkid(val: string){
        this._idNkid = val;
    }
    
    public get idNkid(): string{
        return this._idNkid;
    }
     

    constructor(obj?: any){
        super(obj)
        
        this.copyFrom(obj);       
    }
}

@TypeSystem.typeDecorator('CompositeField', moduleContext.moduleName)
export class CompositeField extends BaseDataModel { 

    @observable private _fieldIdent: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set fieldIdent(val: string){
        this._fieldIdent = val;
    }
    
    public get fieldIdent(): string{
        return this._fieldIdent;
    }
     

    @observable private _fieldEntryNumber: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set fieldEntryNumber(val: string){
        this._fieldEntryNumber = val;
    }
    
    public get fieldEntryNumber(): string{
        return this._fieldEntryNumber;
    }
     
    
    @observable private _recordMinActionDate: moment.Moment = null;
    
    @TypeSystem.propertyDecorator('moment')
    public set recordMinActionDate(val: moment.Moment){
        this._recordMinActionDate = val;
    }
    
    public get recordMinActionDate(): moment.Moment{
        return this._recordMinActionDate;
    } 
    
    @observable private _fieldEntryDate: moment.Moment = null;
    
    @TypeSystem.propertyDecorator('moment')
    public set fieldEntryDate(val: moment.Moment){
        this._fieldEntryDate = val;
    }
    
    public get fieldEntryDate(): moment.Moment{
        return this._fieldEntryDate;
    } 
    
    @observable private _fieldActionDate: moment.Moment = null;
    
    @TypeSystem.propertyDecorator('moment')
    public set fieldActionDate(val: moment.Moment){
        this._fieldActionDate = val;
    }
    
    public get fieldActionDate(): moment.Moment{
        return this._fieldActionDate;
    } 

    @observable private _fieldOperation: FieldOperations = null;
    
    @TypeSystem.propertyDecorator(FieldOperations ? FieldOperations : moduleContext.moduleName + '.' + 'FieldOperations')
    public set fieldOperation(val: FieldOperations){
        this._fieldOperation = val;
    }
    
    public get fieldOperation(): FieldOperations{
        return this._fieldOperation;
    }
     

    @observable private _entryApplicationType: ApplicationFormTypes = null;
    
    @TypeSystem.propertyDecorator(ApplicationFormTypes ? ApplicationFormTypes : moduleContext.moduleName + '.' + 'ApplicationFormTypes')
    public set entryApplicationType(val: ApplicationFormTypes){
        this._entryApplicationType = val;
    }
    
    public get entryApplicationType(): ApplicationFormTypes{
        return this._entryApplicationType;
    }
     

    constructor(obj?: any){
        super(obj)
        
        this.copyFrom(obj);       
    }
}

@TypeSystem.typeDecorator('BirthPlace', moduleContext.moduleName)
export class BirthPlace extends BaseDataModel { 

    @observable private _country: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set country(val: string){
        this._country = val;
    }
    
    public get country(): string{
        return this._country;
    }
     

    @observable private _place: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set place(val: string){
        this._place = val;
    }
    
    public get place(): string{
        return this._place;
    }
     

    constructor(obj?: any){
        super(obj)
        
        this.copyFrom(obj);       
    }
}

@TypeSystem.typeDecorator('Branch', moduleContext.moduleName)
export class Branch extends BaseDataModel { 

    @observable private _firmName: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set firmName(val: string){
        this._firmName = val;
    }
    
    public get firmName(): string{
        return this._firmName;
    }
     

    @observable private _branchCode: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set branchCode(val: string){
        this._branchCode = val;
    }
    
    public get branchCode(): string{
        return this._branchCode;
    }
     

    constructor(obj?: any){
        super(obj)
        
        this.copyFrom(obj);       
    }
}

@TypeSystem.typeDecorator('BulstatDeed', moduleContext.moduleName)
export class BulstatDeed extends BaseDataModel { 

    @observable private _deed: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set deed(val: string){
        this._deed = val;
    }
    
    public get deed(): string{
        return this._deed;
    }
     

    @observable private _year: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set year(val: string){
        this._year = val;
    }
    
    public get year(): string{
        return this._year;
    }
     

    @observable private _courtCode: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set courtCode(val: string){
        this._courtCode = val;
    }
    
    public get courtCode(): string{
        return this._courtCode;
    }
     

    constructor(obj?: any){
        super(obj)
        
        this.copyFrom(obj);       
    }
}

@TypeSystem.typeDecorator('CheckRecordField', moduleContext.moduleName)
export class CheckRecordField extends RecordField { 

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

@TypeSystem.typeDecorator('Contacts', moduleContext.moduleName)
export class Contacts extends BaseDataModel { 

    @observable private _phone: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set phone(val: string){
        this._phone = val;
    }
    
    public get phone(): string{
        return this._phone;
    }
     

    @observable private _fax: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set fax(val: string){
        this._fax = val;
    }
    
    public get fax(): string{
        return this._fax;
    }
     

    @observable private _eMail: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set eMail(val: string){
        this._eMail = val;
    }
    
    public get eMail(): string{
        return this._eMail;
    }
     

    @observable private _url: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set url(val: string){
        this._url = val;
    }
    
    public get url(): string{
        return this._url;
    }
     

    constructor(obj?: any){
        super(obj)
        
        this.copyFrom(obj);       
    }
}

@TypeSystem.typeDecorator('Deputy', moduleContext.moduleName)
export class Deputy extends BaseDataModel { 

    @observable private _source: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set source(val: string){
        this._source = val;
    }
    
    public get source(): string{
        return this._source;
    }
     

    @observable private _sourceDate: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set sourceDate(val: string){
        this._sourceDate = val;
    }
    
    public get sourceDate(): string{
        return this._sourceDate;
    }
     

    constructor(obj?: any){
        super(obj)
        
        this.copyFrom(obj);       
    }
}

@TypeSystem.typeDecorator('ForeignAuthority', moduleContext.moduleName)
export class ForeignAuthority extends BaseDataModel { 

    @observable private _competentAuthorityForRegistration: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set competentAuthorityForRegistration(val: string){
        this._competentAuthorityForRegistration = val;
    }
    
    public get competentAuthorityForRegistration(): string{
        return this._competentAuthorityForRegistration;
    }
     

    @observable private _registrationNumber: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set registrationNumber(val: string){
        this._registrationNumber = val;
    }
    
    public get registrationNumber(): string{
        return this._registrationNumber;
    }
     

    constructor(obj?: any){
        super(obj)
        
        this.copyFrom(obj);       
    }
}

@TypeSystem.typeDecorator('ForeignCompanyBaseData', moduleContext.moduleName)
export class ForeignCompanyBaseData extends ForeignAuthority { 

    @observable private _companyName: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set companyName(val: string){
        this._companyName = val;
    }
    
    public get companyName(): string{
        return this._companyName;
    }
     

    constructor(obj?: any){
        super(obj)
        
        this.copyFrom(obj);       
    }
}

@TypeSystem.typeDecorator('Mandate', moduleContext.moduleName)
export class Mandate extends Record { 
    
    @observable private _date: moment.Moment = null;
    
    @TypeSystem.propertyDecorator('moment')
    public set date(val: moment.Moment){
        this._date = val;
    }
    
    public get date(): moment.Moment{
        return this._date;
    } 

    @observable private _mandateTypeText: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set mandateTypeText(val: string){
        this._mandateTypeText = val;
    }
    
    public get mandateTypeText(): string{
        return this._mandateTypeText;
    }
     

    constructor(obj?: any){
        super(obj)
        
        this.copyFrom(obj);       
    }
}
    
@TypeSystem.typeDecorator('TextRecordField', moduleContext.moduleName)
export class TextRecordField extends RecordField { 

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

@TypeSystem.typeDecorator('MannerRecordHolder', moduleContext.moduleName)
export class MannerRecordHolder extends TextRecordField { 

    @observable private _jointly: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set jointly(val: boolean){
        this._jointly = val;
    }
    
    public get jointly(): boolean{
        return this._jointly;
    }
     

    @observable private _severally: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set severally(val: boolean){
        this._severally = val;
    }
    
    public get severally(): boolean{
        return this._severally;
    }
     

    @observable private _otherWay: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set otherWay(val: boolean){
        this._otherWay = val;
    }
    
    public get otherWay(): boolean{
        return this._otherWay;
    }
     

    constructor(obj?: any){
        super(obj)
        
        this.copyFrom(obj);       
    }
}

@TypeSystem.typeDecorator('Passport', moduleContext.moduleName)
export class Passport extends BaseDataModel { 
    
    @observable private _issuedDate: moment.Moment = null;
    
    @TypeSystem.propertyDecorator('moment')
    public set issuedDate(val: moment.Moment){
        this._issuedDate = val;
    }
    
    public get issuedDate(): moment.Moment{
        return this._issuedDate;
    } 

    @observable private _number: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set number(val: string){
        this._number = val;
    }
    
    public get number(): string{
        return this._number;
    }
     

    @observable private _issuedFrom: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set issuedFrom(val: string){
        this._issuedFrom = val;
    }
    
    public get issuedFrom(): string{
        return this._issuedFrom;
    }
     

    constructor(obj?: any){
        super(obj)
        
        this.copyFrom(obj);       
    }
}

@TypeSystem.typeDecorator('Price', moduleContext.moduleName)
export class Price extends BaseDataModel { 

    @observable private _amount: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set amount(val: string){
        this._amount = val;
    }
    
    public get amount(): string{
        return this._amount;
    }
     

    @observable private _units: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set units(val: string){
        this._units = val;
    }
    
    public get units(): string{
        return this._units;
    }
     

    constructor(obj?: any){
        super(obj)
        
        this.copyFrom(obj);       
    }
}

@TypeSystem.typeDecorator('SeatRecordField', moduleContext.moduleName)
export class SeatRecordField extends RecordField { 

    @observable private _address: Address = null;
    
    @TypeSystem.propertyDecorator(Address ? Address : moduleContext.moduleName + '.' + 'Address')
    public set address(val: Address){
        this._address = val;
    }
    
    public get address(): Address{
        return this._address;
    }
     

    @observable private _contacts: Contacts = null;
    
    @TypeSystem.propertyDecorator(Contacts ? Contacts : moduleContext.moduleName + '.' + 'Contacts')
    public set contacts(val: Contacts){
        this._contacts = val;
    }
    
    public get contacts(): Contacts{
        return this._contacts;
    }
     

    constructor(obj?: any){
        super(obj)
        
        this.copyFrom(obj);       
    }
}



@TypeSystem.typeDecorator('F001_UIC', moduleContext.moduleName)
export class F001_UIC extends RecordField { 

    @observable private _text: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set text(val: string){
        this._text = val;
    }
    
    public get text(): string{
        return this._text;
    }
     

    @observable private _isNew: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set isNew(val: boolean){
        this._isNew = val;
    }
    
    public get isNew(): boolean{
        return this._isNew;
    }
     

    @observable private _companyControl: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set companyControl(val: string){
        this._companyControl = val;
    }
    
    public get companyControl(): string{
        return this._companyControl;
    }
     

    @observable private _bulstatDeed: BulstatDeed = null;
    
    @TypeSystem.propertyDecorator(BulstatDeed ? BulstatDeed : moduleContext.moduleName + '.' + 'BulstatDeed')
    public set bulstatDeed(val: BulstatDeed){
        this._bulstatDeed = val;
    }
    
    public get bulstatDeed(): BulstatDeed{
        return this._bulstatDeed;
    }
     

    constructor(obj?: any){
        super(obj)
        
        this.copyFrom(obj);
		this.fieldIdent = '00010';       
    }
}

@TypeSystem.typeDecorator('UIC', moduleContext.moduleName)
export class UIC extends BaseDataModel { 

    @observable private _text: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set text(val: string){
        this._text = val;
    }
    
    public get text(): string{
        return this._text;
    }
     

    @observable private _isNew: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set isNew(val: boolean){
        this._isNew = val;
    }
    
    public get isNew(): boolean{
        return this._isNew;
    }
     

    @observable private _companyControl: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set companyControl(val: string){
        this._companyControl = val;
    }
    
    public get companyControl(): string{
        return this._companyControl;
    }
     

    @observable private _bulstatDeed: BulstatDeed = null;
    
    @TypeSystem.propertyDecorator(BulstatDeed ? BulstatDeed : moduleContext.moduleName + '.' + 'BulstatDeed')
    public set bulstatDeed(val: BulstatDeed){
        this._bulstatDeed = val;
    }
    
    public get bulstatDeed(): BulstatDeed{
        return this._bulstatDeed;
    }
     

    constructor(obj?: any){
        super(obj)
        
        this.copyFrom(obj);       
    }
}

@TypeSystem.typeDecorator('F002_Company', moduleContext.moduleName)
export class F002_Company extends TextRecordField { 

    constructor(obj?: any){
        super(obj)
        
        this.copyFrom(obj);
		this.fieldIdent = '00020';       
    }
}

@TypeSystem.typeDecorator('F003_LegalForm', moduleContext.moduleName)
export class F003_LegalForm extends RecordField { 

    @observable private _text: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set text(val: string){
        this._text = val;
    }
    
    public get text(): string{
        return this._text;
    }
     

    @observable private _code: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set code(val: string){
        this._code = val;
    }
    
    public get code(): string{
        return this._code;
    }
     

    constructor(obj?: any){
        super(obj)
        
        this.copyFrom(obj);
		this.fieldIdent = '00030';       
    }
}

@TypeSystem.typeDecorator('F004_Transliteration', moduleContext.moduleName)
export class F004_Transliteration extends TextRecordField { 

    constructor(obj?: any){
        super(obj)
        
        this.copyFrom(obj);
		this.fieldIdent = '00040';       
    }
}

@TypeSystem.typeDecorator('F005_Seat', moduleContext.moduleName)
export class F005_Seat extends SeatRecordField { 

    constructor(obj?: any){
        super(obj)
        
        this.copyFrom(obj);
		this.fieldIdent = '00050';       
    }
}

@TypeSystem.typeDecorator('F051a_BranchFirm', moduleContext.moduleName)
export class F051a_BranchFirm extends TextRecordField { 

    constructor(obj?: any){
        super(obj)
        
        this.copyFrom(obj);
		this.fieldIdent = '00511';       
    }
}

@TypeSystem.typeDecorator('GDPRAgreement', moduleContext.moduleName)
export class GDPRAgreement extends BaseDataModel {

    constructor(obj?: any) {
        super(obj)

        this.copyFrom(obj);
    }

    @observable private _gdprAgreementText: string = null;

    @TypeSystem.propertyDecorator('string')
    public set gdprAgreementText(val: string) {
        this._gdprAgreementText = val;
    }

    public get gdprAgreementText(): string {
        return this._gdprAgreementText;
    }

    @observable private _isGDPRAgreementAccepted: boolean = null;

    @TypeSystem.propertyDecorator('boolean')
    public set isGDPRAgreementAccepted(val: boolean) {
        this._isGDPRAgreementAccepted = val;
    }

    public get isGDPRAgreementAccepted(): boolean {
        return this._isGDPRAgreementAccepted;
    }
}


@TypeSystem.typeDecorator('ApplicationFormBase', moduleContext.moduleName)
export class ApplicationFormBase extends BaseDataModel { 

    @observable private _appType: ApplicationFormTypes = null;
    
    @TypeSystem.propertyDecorator(ApplicationFormTypes ? ApplicationFormTypes : moduleContext.moduleName + '.' + 'ApplicationFormTypes')
    public set appType(val: ApplicationFormTypes){
        this._appType = val;
    }
    
    public get appType(): ApplicationFormTypes{
        return this._appType;
    }
     

    @observable private _applicantInfo: ApplicantInfo = null;
    
    @TypeSystem.propertyDecorator(ApplicantInfo ? ApplicantInfo : moduleContext.moduleName + '.' + 'ApplicantInfo')
    public set applicantInfo(val: ApplicantInfo){
        this._applicantInfo = val;
    }
    
    public get applicantInfo(): ApplicantInfo{
        return this._applicantInfo;
    }
     

    @observable private _applicantExchange: ApplicantExchange = null;
    
    @TypeSystem.propertyDecorator(ApplicantExchange ? ApplicantExchange : moduleContext.moduleName + '.' + 'ApplicantExchange')
    public set applicantExchange(val: ApplicantExchange){
        this._applicantExchange = val;
    }
    
    public get applicantExchange(): ApplicantExchange{
        return this._applicantExchange;
    }
     

    @observable private _gdprAgreement: GDPRAgreement = null;

    @TypeSystem.propertyDecorator(GDPRAgreement ? GDPRAgreement : moduleContext.moduleName + '.' + 'GDPRAgreement')
    public set gdprAgreement(val: GDPRAgreement) {
        this._gdprAgreement = val;
    }

    public get gdprAgreement(): GDPRAgreement {
        return this._gdprAgreement;
    }

    @observable private _documents: AttachedDocument[] = null;
    
    @TypeSystem.propertyArrayDecorator(AttachedDocument ? AttachedDocument : moduleContext.moduleName + '.' + 'AttachedDocument')
    public set documents(val: AttachedDocument[]){
        this._documents = val;
    }
    
    public get documents(): AttachedDocument[]{
        return this._documents;
    }
     

    constructor(obj?: any){
        super(obj)
        
        this.copyFrom(obj);       
    }
}

@TypeSystem.typeDecorator('ApplicationWithFieldsForm', moduleContext.moduleName)
export class ApplicationWithFieldsForm extends ApplicationFormBase { 

    @observable private _applicationState: ProcessStates = null;
    
    @TypeSystem.propertyDecorator(ProcessStates ? ProcessStates : moduleContext.moduleName + '.' + 'ProcessStates')
    public set applicationState(val: ProcessStates){
        this._applicationState = val;
    }
    
    public get applicationState(): ProcessStates{
        return this._applicationState;
    }
     

    @observable private _subUICType: SubUICTypes = null;
    
    @TypeSystem.propertyDecorator(SubUICTypes ? SubUICTypes : moduleContext.moduleName + '.' + 'SubUICTypes')
    public set subUICType(val: SubUICTypes){
        this._subUICType = val;
    }
    
    public get subUICType(): SubUICTypes{
        return this._subUICType;
    }
     

    @observable private _subUIC: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set subUIC(val: string){
        this._subUIC = val;
    }
    
    public get subUIC(): string{
        return this._subUIC;
    }
     

    @observable private _applications: ApplicationWithFieldsForm[] = null;
    
    @TypeSystem.propertyArrayDecorator(ApplicationWithFieldsForm ? ApplicationWithFieldsForm : moduleContext.moduleName + '.' + 'ApplicationWithFieldsForm')
    public set applications(val: ApplicationWithFieldsForm[]){
        this._applications = val;
    }
    
    public get applications(): ApplicationWithFieldsForm[]{
        return this._applications;
    }
     

    constructor(obj?: any){
        super(obj)
        
        this.copyFrom(obj);       
    }
}

@TypeSystem.typeDecorator('ApplicationWithFieldsFormBase', moduleContext.moduleName)
export class ApplicationWithFieldsFormBase<T extends ApplicationFormFieldsBase> extends ApplicationWithFieldsForm { 

    @observable private _fields: T = null;
    
    @TypeSystem.propertyDecorator(ApplicationFormFieldsBase ? ApplicationFormFieldsBase : moduleContext.moduleName + '.' + 'ApplicationFormFieldsBase')
    public set fields(val: T){
        this._fields = val;
    }
    
    public get fields(): T{
        return this._fields;
    }
     

    constructor(obj?: any){
        super(obj)
        
        this.copyFrom(obj);       
    }
}

@TypeSystem.typeDecorator('ApplicationFormFieldsBase', moduleContext.moduleName)
export class ApplicationFormFieldsBase extends BaseDataModel { 

    @observable private _uic: F001_UIC = null;
    
    @TypeSystem.propertyDecorator(F001_UIC ? F001_UIC : moduleContext.moduleName + '.' + 'F001_UIC')
    public set uic(val: F001_UIC){
        this._uic = val;
    }
    
    public get uic(): F001_UIC{
        return this._uic;
    }
     

    constructor(obj?: any){
        super(obj)
        
        this.copyFrom(obj);       
    }
    }
