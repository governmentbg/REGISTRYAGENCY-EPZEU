

// Auto Generated Object
import * as moment from 'moment'
import { observable, computed } from 'mobx'
import { TypeSystem, BaseDataModel } from 'Cnsys.Core'
import { TextRecordField, RecordField, SeatRecordField, CompositeField, Record, Address, Person, OutgoingNumber, ActivityNKIDField, Mandate, ForeignAuthority, MannerRecordHolder, ForeignCompanyBaseData, CheckRecordField } from 'EPZEU.CR.Domain'
import { moduleContext } from '../../ModuleContext'
import { F02200_ForeignTraderRegistration } from './F02200_ForeignTraderRegistration'



@TypeSystem.typeDecorator('F001a_NumberNationalRegister', moduleContext.moduleName)
export class F001a_NumberNationalRegister extends TextRecordField {  

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F005_Seat', moduleContext.moduleName)
export class F005_Seat extends SeatRecordField {  

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F005a_SeatForCorrespondence', moduleContext.moduleName)
export class F005a_SeatForCorrespondence extends RecordField { 

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

@TypeSystem.typeDecorator('F006_SubjectOfActivity', moduleContext.moduleName)
export class F006_SubjectOfActivity extends TextRecordField { 

    @observable private _isBank: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set isBank(val: boolean){
        this._isBank = val;
    }
    
    public get isBank(): boolean{
        return this._isBank;
    }
     

    @observable private _isBankText: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set isBankText(val: string){
        this._isBankText = val;
    }
    
    public get isBankText(): string{
        return this._isBankText;
    }
     

    @observable private _isInsurer: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set isInsurer(val: boolean){
        this._isInsurer = val;
    }
    
    public get isInsurer(): boolean{
        return this._isInsurer;
    }
     

    @observable private _isInsurerText: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set isInsurerText(val: string){
        this._isInsurerText = val;
    }
    
    public get isInsurerText(): string{
        return this._isInsurerText;
    }
      

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F006a_SubjectOfActivityNKID', moduleContext.moduleName)
export class F006a_SubjectOfActivityNKID extends ActivityNKIDField {  

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F006b_Objectives', moduleContext.moduleName)
export class F006b_Objectives extends RecordField { 

    @observable private _isBFLE: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set isBFLE(val: boolean){
        this._isBFLE = val;
    }
    
    public get isBFLE(): boolean{
        return this._isBFLE;
    }
     

    @observable private _text: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set text(val: string){
        this._text = val;
    }
    
    public get text(): string{
        return this._text;
    }
     

    @observable private _textExt: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set textExt(val: string){
        this._textExt = val;
    }
    
    public get textExt(): string{
        return this._textExt;
    }
      

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F006g_SubjectToAdditionalBusinessActivity', moduleContext.moduleName)
export class F006g_SubjectToAdditionalBusinessActivity extends TextRecordField {  

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F006v_MeansOfAchievingTheObjectives', moduleContext.moduleName)
export class F006v_MeansOfAchievingTheObjectives extends TextRecordField {  

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F0070_Manager', moduleContext.moduleName)
export class F0070_Manager extends Record { 

    @observable private _person: Person = null;
    
    @TypeSystem.propertyDecorator(Person ? Person : moduleContext.moduleName + '.' + 'Person')
    public set person(val: Person){
        this._person = val;
    }
    
    public get person(): Person{
        return this._person;
    }
      

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F007_Managers', moduleContext.moduleName)
export class F007_Managers extends CompositeField { 

    @observable private _managersList: F0070_Manager[] = null;
    
    @TypeSystem.propertyArrayDecorator(F0070_Manager ? F0070_Manager : moduleContext.moduleName + '.' + 'F0070_Manager')
    public set managersList(val: F0070_Manager[]){
        this._managersList = val;
    }
    
    public get managersList(): F0070_Manager[]{
        return this._managersList;
    }
      

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F007a0_AssignedManager', moduleContext.moduleName)
export class F007a0_AssignedManager extends Record { 

    @observable private _subject: Person = null;
    
    @TypeSystem.propertyDecorator(Person ? Person : moduleContext.moduleName + '.' + 'Person')
    public set subject(val: Person){
        this._subject = val;
    }
    
    public get subject(): Person{
        return this._subject;
    }
      

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F007a_AssignedManagers', moduleContext.moduleName)
export class F007a_AssignedManagers extends CompositeField { 

    @observable private _assignedManageList: F007a0_AssignedManager[] = null;
    
    @TypeSystem.propertyArrayDecorator(F007a0_AssignedManager ? F007a0_AssignedManager : moduleContext.moduleName + '.' + 'F007a0_AssignedManager')
    public set assignedManageList(val: F007a0_AssignedManager[]){
        this._assignedManageList = val;
    }
    
    public get assignedManageList(): F007a0_AssignedManager[]{
        return this._assignedManageList;
    }
      

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F008_WayOfManagement', moduleContext.moduleName)
export class F008_WayOfManagement extends MannerRecordHolder {  

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F009_ChairMan', moduleContext.moduleName)
export class F009_ChairMan extends RecordField { 

    @observable private _person: Person = null;
    
    @TypeSystem.propertyDecorator(Person ? Person : moduleContext.moduleName + '.' + 'Person')
    public set person(val: Person){
        this._person = val;
    }
    
    public get person(): Person{
        return this._person;
    }
      

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F0100_Representative', moduleContext.moduleName)
export class F0100_Representative extends Record { 

    @observable private _subject: Person = null;
    
    @TypeSystem.propertyDecorator(Person ? Person : moduleContext.moduleName + '.' + 'Person')
    public set subject(val: Person){
        this._subject = val;
    }
    
    public get subject(): Person{
        return this._subject;
    }
     

    @observable private _person: Person = null;
    
    @TypeSystem.propertyDecorator(Person ? Person : moduleContext.moduleName + '.' + 'Person')
    public set person(val: Person){
        this._person = val;
    }
    
    public get person(): Person{
        return this._person;
    }
      

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F010_Representatives', moduleContext.moduleName)
export class F010_Representatives extends CompositeField { 

    @observable private _representativeList: F0100_Representative[] = null;
    
    @TypeSystem.propertyArrayDecorator(F0100_Representative ? F0100_Representative : moduleContext.moduleName + '.' + 'F0100_Representative')
    public set representativeList(val: F0100_Representative[]){
        this._representativeList = val;
    }
    
    public get representativeList(): F0100_Representative[]{
        return this._representativeList;
    }
      

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F01010_Representative101', moduleContext.moduleName)
export class F01010_Representative101 extends Record { 

    @observable private _subject: Person = null;
    
    @TypeSystem.propertyDecorator(Person ? Person : moduleContext.moduleName + '.' + 'Person')
    public set subject(val: Person){
        this._subject = val;
    }
    
    public get subject(): Person{
        return this._subject;
    }
      

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F0101_Representatives101', moduleContext.moduleName)
export class F0101_Representatives101 extends CompositeField { 

    @observable private _representativeList: F01010_Representative101[] = null;
    
    @TypeSystem.propertyArrayDecorator(F01010_Representative101 ? F01010_Representative101 : moduleContext.moduleName + '.' + 'F01010_Representative101')
    public set representativeList(val: F01010_Representative101[]){
        this._representativeList = val;
    }
    
    public get representativeList(): F01010_Representative101[]{
        return this._representativeList;
    }
      

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F01020_Representative102', moduleContext.moduleName)
export class F01020_Representative102 extends Record { 

    @observable private _person: Person = null;
    
    @TypeSystem.propertyDecorator(Person ? Person : moduleContext.moduleName + '.' + 'Person')
    public set person(val: Person){
        this._person = val;
    }
    
    public get person(): Person{
        return this._person;
    }
      

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F0102_Representatives102', moduleContext.moduleName)
export class F0102_Representatives102 extends CompositeField { 

    @observable private _representativeList: F01020_Representative102[] = null;
    
    @TypeSystem.propertyArrayDecorator(F01020_Representative102 ? F01020_Representative102 : moduleContext.moduleName + '.' + 'F01020_Representative102')
    public set representativeList(val: F01020_Representative102[]){
        this._representativeList = val;
    }
    
    public get representativeList(): F01020_Representative102[]{
        return this._representativeList;
    }
      

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F0103_Representative103', moduleContext.moduleName)
export class F0103_Representative103 extends Record { 

    @observable private _person: Person = null;
    
    @TypeSystem.propertyDecorator(Person ? Person : moduleContext.moduleName + '.' + 'Person')
    public set person(val: Person){
        this._person = val;
    }
    
    public get person(): Person{
        return this._person;
    }
      

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F0103_Representatives103', moduleContext.moduleName)
export class F0103_Representatives103 extends CompositeField { 

    @observable private _representativeList: F0103_Representative103[] = null;
    
    @TypeSystem.propertyArrayDecorator(F0103_Representative103 ? F0103_Representative103 : moduleContext.moduleName + '.' + 'F0103_Representative103')
    public set representativeList(val: F0103_Representative103[]){
        this._representativeList = val;
    }
    
    public get representativeList(): F0103_Representative103[]{
        return this._representativeList;
    }
      

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F011_WayOfRepresentation', moduleContext.moduleName)
export class F011_WayOfRepresentation extends MannerRecordHolder {  

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F01201_Director', moduleContext.moduleName)
export class F01201_Director extends Record { 

    @observable private _subject: Person = null;
    
    @TypeSystem.propertyDecorator(Person ? Person : moduleContext.moduleName + '.' + 'Person')
    public set subject(val: Person){
        this._subject = val;
    }
    
    public get subject(): Person{
        return this._subject;
    }
      

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F01200_BoardOfDirectorsMandate', moduleContext.moduleName)
export class F01200_BoardOfDirectorsMandate extends Mandate {  

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F012_BoardOfDirectors', moduleContext.moduleName)
export class F012_BoardOfDirectors extends CompositeField { 

    @observable private _boardOfDirectorsMandate: F01200_BoardOfDirectorsMandate = null;
    
    @TypeSystem.propertyDecorator(F01200_BoardOfDirectorsMandate ? F01200_BoardOfDirectorsMandate : moduleContext.moduleName + '.' + 'F01200_BoardOfDirectorsMandate')
    public set boardOfDirectorsMandate(val: F01200_BoardOfDirectorsMandate){
        this._boardOfDirectorsMandate = val;
    }
    
    public get boardOfDirectorsMandate(): F01200_BoardOfDirectorsMandate{
        return this._boardOfDirectorsMandate;
    }
     

    @observable private _directorList: F01201_Director[] = null;
    
    @TypeSystem.propertyArrayDecorator(F01201_Director ? F01201_Director : moduleContext.moduleName + '.' + 'F01201_Director')
    public set directorList(val: F01201_Director[]){
        this._directorList = val;
    }
    
    public get directorList(): F01201_Director[]{
        return this._directorList;
    }
      

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F01211_BoardManager3', moduleContext.moduleName)
export class F01211_BoardManager3 extends Record { 

    @observable private _subject: Person = null;
    
    @TypeSystem.propertyDecorator(Person ? Person : moduleContext.moduleName + '.' + 'Person')
    public set subject(val: Person){
        this._subject = val;
    }
    
    public get subject(): Person{
        return this._subject;
    }
      

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F01210_ManagerMandate3', moduleContext.moduleName)
export class F01210_ManagerMandate3 extends Mandate {  

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F012a_BoardOfManagers3', moduleContext.moduleName)
export class F012a_BoardOfManagers3 extends CompositeField { 

    @observable private _managerMandate3: F01210_ManagerMandate3 = null;
    
    @TypeSystem.propertyDecorator(F01210_ManagerMandate3 ? F01210_ManagerMandate3 : moduleContext.moduleName + '.' + 'F01210_ManagerMandate3')
    public set managerMandate3(val: F01210_ManagerMandate3){
        this._managerMandate3 = val;
    }
    
    public get managerMandate3(): F01210_ManagerMandate3{
        return this._managerMandate3;
    }
     

    @observable private _boardManagersList: F01211_BoardManager3[] = null;
    
    @TypeSystem.propertyArrayDecorator(F01211_BoardManager3 ? F01211_BoardManager3 : moduleContext.moduleName + '.' + 'F01211_BoardManager3')
    public set boardManagersList(val: F01211_BoardManager3[]){
        this._boardManagersList = val;
    }
    
    public get boardManagersList(): F01211_BoardManager3[]{
        return this._boardManagersList;
    }
      

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F01221_AdministrativeBody', moduleContext.moduleName)
export class F01221_AdministrativeBody extends Record { 

    @observable private _subject: Person = null;
    
    @TypeSystem.propertyDecorator(Person ? Person : moduleContext.moduleName + '.' + 'Person')
    public set subject(val: Person){
        this._subject = val;
    }
    
    public get subject(): Person{
        return this._subject;
    }
      

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F01220_AdministrativeBoardMandate', moduleContext.moduleName)
export class F01220_AdministrativeBoardMandate extends Mandate {  

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F012b_AdministrativeBoard', moduleContext.moduleName)
export class F012b_AdministrativeBoard extends CompositeField { 

    @observable private _administrativeBoardMandate: F01220_AdministrativeBoardMandate = null;
    
    @TypeSystem.propertyDecorator(F01220_AdministrativeBoardMandate ? F01220_AdministrativeBoardMandate : moduleContext.moduleName + '.' + 'F01220_AdministrativeBoardMandate')
    public set administrativeBoardMandate(val: F01220_AdministrativeBoardMandate){
        this._administrativeBoardMandate = val;
    }
    
    public get administrativeBoardMandate(): F01220_AdministrativeBoardMandate{
        return this._administrativeBoardMandate;
    }
     

    @observable private _administrativeBodyList: F01221_AdministrativeBody[] = null;
    
    @TypeSystem.propertyArrayDecorator(F01221_AdministrativeBody ? F01221_AdministrativeBody : moduleContext.moduleName + '.' + 'F01221_AdministrativeBody')
    public set administrativeBodyList(val: F01221_AdministrativeBody[]){
        this._administrativeBodyList = val;
    }
    
    public get administrativeBodyList(): F01221_AdministrativeBody[]{
        return this._administrativeBodyList;
    }
      

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F012d_ManagementBody12d', moduleContext.moduleName)
export class F012d_ManagementBody12d extends Record { 

    @observable private _subject: Person = null;
    
    @TypeSystem.propertyDecorator(Person ? Person : moduleContext.moduleName + '.' + 'Person')
    public set subject(val: Person){
        this._subject = val;
    }
    
    public get subject(): Person{
        return this._subject;
    }
      

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F012d_ManagementBody12dMandate', moduleContext.moduleName)
export class F012d_ManagementBody12dMandate extends Mandate { 

    @observable private _managementAuthority: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set managementAuthority(val: string){
        this._managementAuthority = val;
    }
    
    public get managementAuthority(): string{
        return this._managementAuthority;
    }
      

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F012d_ManagementBodies12d', moduleContext.moduleName)
export class F012d_ManagementBodies12d extends CompositeField { 

    @observable private _managementBodies12dList: F012d_ManagementBody12d[] = null;
    
    @TypeSystem.propertyArrayDecorator(F012d_ManagementBody12d ? F012d_ManagementBody12d : moduleContext.moduleName + '.' + 'F012d_ManagementBody12d')
    public set managementBodies12dList(val: F012d_ManagementBody12d[]){
        this._managementBodies12dList = val;
    }
    
    public get managementBodies12dList(): F012d_ManagementBody12d[]{
        return this._managementBodies12dList;
    }
     

    @observable private _managementBody12dMandate: F012d_ManagementBody12dMandate = null;
    
    @TypeSystem.propertyDecorator(F012d_ManagementBody12dMandate ? F012d_ManagementBody12dMandate : moduleContext.moduleName + '.' + 'F012d_ManagementBody12dMandate')
    public set managementBody12dMandate(val: F012d_ManagementBody12dMandate){
        this._managementBody12dMandate = val;
    }
    
    public get managementBody12dMandate(): F012d_ManagementBody12dMandate{
        return this._managementBody12dMandate;
    }
      

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F012g_Authority12g', moduleContext.moduleName)
export class F012g_Authority12g extends Record { 

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

@TypeSystem.typeDecorator('F012g_Authorities12g', moduleContext.moduleName)
export class F012g_Authorities12g extends CompositeField { 

    @observable private _authorities12gList: F012g_Authority12g[] = null;
    
    @TypeSystem.propertyArrayDecorator(F012g_Authority12g ? F012g_Authority12g : moduleContext.moduleName + '.' + 'F012g_Authority12g')
    public set authorities12gList(val: F012g_Authority12g[]){
        this._authorities12gList = val;
    }
    
    public get authorities12gList(): F012g_Authority12g[]{
        return this._authorities12gList;
    }
      

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F01230_AdministrativeBoardSupporter', moduleContext.moduleName)
export class F01230_AdministrativeBoardSupporter extends Record { 

    @observable private _subject: Person = null;
    
    @TypeSystem.propertyDecorator(Person ? Person : moduleContext.moduleName + '.' + 'Person')
    public set subject(val: Person){
        this._subject = val;
    }
    
    public get subject(): Person{
        return this._subject;
    }
      

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F012v_AdministrativeBoardSupporters', moduleContext.moduleName)
export class F012v_AdministrativeBoardSupporters extends CompositeField { 

    @observable private _administrativeBoardSupporterList: F01230_AdministrativeBoardSupporter[] = null;
    
    @TypeSystem.propertyArrayDecorator(F01230_AdministrativeBoardSupporter ? F01230_AdministrativeBoardSupporter : moduleContext.moduleName + '.' + 'F01230_AdministrativeBoardSupporter')
    public set administrativeBoardSupporterList(val: F01230_AdministrativeBoardSupporter[]){
        this._administrativeBoardSupporterList = val;
    }
    
    public get administrativeBoardSupporterList(): F01230_AdministrativeBoardSupporter[]{
        return this._administrativeBoardSupporterList;
    }
      

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F01301_BoardManager', moduleContext.moduleName)
export class F01301_BoardManager extends Record { 

    @observable private _person: Person = null;
    
    @TypeSystem.propertyDecorator(Person ? Person : moduleContext.moduleName + '.' + 'Person')
    public set person(val: Person){
        this._person = val;
    }
    
    public get person(): Person{
        return this._person;
    }
      

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F0130_ManagerMandate', moduleContext.moduleName)
export class F0130_ManagerMandate extends Mandate {  

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F013_BoardOfManagers', moduleContext.moduleName)
export class F013_BoardOfManagers extends CompositeField { 

    @observable private _managerMandate: F0130_ManagerMandate = null;
    
    @TypeSystem.propertyDecorator(F0130_ManagerMandate ? F0130_ManagerMandate : moduleContext.moduleName + '.' + 'F0130_ManagerMandate')
    public set managerMandate(val: F0130_ManagerMandate){
        this._managerMandate = val;
    }
    
    public get managerMandate(): F0130_ManagerMandate{
        return this._managerMandate;
    }
     

    @observable private _boardManagerList: F01301_BoardManager[] = null;
    
    @TypeSystem.propertyArrayDecorator(F01301_BoardManager ? F01301_BoardManager : moduleContext.moduleName + '.' + 'F01301_BoardManager')
    public set boardManagerList(val: F01301_BoardManager[]){
        this._boardManagerList = val;
    }
    
    public get boardManagerList(): F01301_BoardManager[]{
        return this._boardManagerList;
    }
      

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F01321_BoardManager2', moduleContext.moduleName)
export class F01321_BoardManager2 extends Record { 

    @observable private _subject: Person = null;
    
    @TypeSystem.propertyDecorator(Person ? Person : moduleContext.moduleName + '.' + 'Person')
    public set subject(val: Person){
        this._subject = val;
    }
    
    public get subject(): Person{
        return this._subject;
    }
      

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F01320_ManagerMandate2', moduleContext.moduleName)
export class F01320_ManagerMandate2 extends Mandate {  

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F013_BoardOfManagers2', moduleContext.moduleName)
export class F013_BoardOfManagers2 extends CompositeField { 

    @observable private _managerMandate2: F01320_ManagerMandate2 = null;
    
    @TypeSystem.propertyDecorator(F01320_ManagerMandate2 ? F01320_ManagerMandate2 : moduleContext.moduleName + '.' + 'F01320_ManagerMandate2')
    public set managerMandate2(val: F01320_ManagerMandate2){
        this._managerMandate2 = val;
    }
    
    public get managerMandate2(): F01320_ManagerMandate2{
        return this._managerMandate2;
    }
     

    @observable private _boardManager2List: F01321_BoardManager2[] = null;
    
    @TypeSystem.propertyArrayDecorator(F01321_BoardManager2 ? F01321_BoardManager2 : moduleContext.moduleName + '.' + 'F01321_BoardManager2')
    public set boardManager2List(val: F01321_BoardManager2[]){
        this._boardManager2List = val;
    }
    
    public get boardManager2List(): F01321_BoardManager2[]{
        return this._boardManager2List;
    }
      

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F01310_BoardOfManagersSupportersPerson', moduleContext.moduleName)
export class F01310_BoardOfManagersSupportersPerson extends Record { 

    @observable private _person: Person = null;
    
    @TypeSystem.propertyDecorator(Person ? Person : moduleContext.moduleName + '.' + 'Person')
    public set person(val: Person){
        this._person = val;
    }
    
    public get person(): Person{
        return this._person;
    }
      

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F013a_BoardOfManagersSupporters', moduleContext.moduleName)
export class F013a_BoardOfManagersSupporters extends CompositeField { 

    @observable private _boardOfManagersSupportersPersonList: F01310_BoardOfManagersSupportersPerson[] = null;
    
    @TypeSystem.propertyArrayDecorator(F01310_BoardOfManagersSupportersPerson ? F01310_BoardOfManagersSupportersPerson : moduleContext.moduleName + '.' + 'F01310_BoardOfManagersSupportersPerson')
    public set boardOfManagersSupportersPersonList(val: F01310_BoardOfManagersSupportersPerson[]){
        this._boardOfManagersSupportersPersonList = val;
    }
    
    public get boardOfManagersSupportersPersonList(): F01310_BoardOfManagersSupportersPerson[]{
        return this._boardOfManagersSupportersPersonList;
    }
      

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F01331_Leader', moduleContext.moduleName)
export class F01331_Leader extends Record { 

    @observable private _subject: Person = null;
    
    @TypeSystem.propertyDecorator(Person ? Person : moduleContext.moduleName + '.' + 'Person')
    public set subject(val: Person){
        this._subject = val;
    }
    
    public get subject(): Person{
        return this._subject;
    }
      

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F01330_LeadingBoardMandate', moduleContext.moduleName)
export class F01330_LeadingBoardMandate extends Mandate {  

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F013b_LeadingBoard', moduleContext.moduleName)
export class F013b_LeadingBoard extends CompositeField { 

    @observable private _leadingBoardMandate: F01330_LeadingBoardMandate = null;
    
    @TypeSystem.propertyDecorator(F01330_LeadingBoardMandate ? F01330_LeadingBoardMandate : moduleContext.moduleName + '.' + 'F01330_LeadingBoardMandate')
    public set leadingBoardMandate(val: F01330_LeadingBoardMandate){
        this._leadingBoardMandate = val;
    }
    
    public get leadingBoardMandate(): F01330_LeadingBoardMandate{
        return this._leadingBoardMandate;
    }
     

    @observable private _leaderList: F01331_Leader[] = null;
    
    @TypeSystem.propertyArrayDecorator(F01331_Leader ? F01331_Leader : moduleContext.moduleName + '.' + 'F01331_Leader')
    public set leaderList(val: F01331_Leader[]){
        this._leaderList = val;
    }
    
    public get leaderList(): F01331_Leader[]{
        return this._leaderList;
    }
      

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F013g_Trustee13g', moduleContext.moduleName)
export class F013g_Trustee13g extends Record { 

    @observable private _person: Person = null;
    
    @TypeSystem.propertyDecorator(Person ? Person : moduleContext.moduleName + '.' + 'Person')
    public set person(val: Person){
        this._person = val;
    }
    
    public get person(): Person{
        return this._person;
    }
      

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F013g_BoardOfTrusties13gMandate', moduleContext.moduleName)
export class F013g_BoardOfTrusties13gMandate extends Mandate {  

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F013g_BoardOfTrusties13g', moduleContext.moduleName)
export class F013g_BoardOfTrusties13g extends CompositeField { 

    @observable private _trustees13gList: F013g_Trustee13g[] = null;
    
    @TypeSystem.propertyArrayDecorator(F013g_Trustee13g ? F013g_Trustee13g : moduleContext.moduleName + '.' + 'F013g_Trustee13g')
    public set trustees13gList(val: F013g_Trustee13g[]){
        this._trustees13gList = val;
    }
    
    public get trustees13gList(): F013g_Trustee13g[]{
        return this._trustees13gList;
    }
     

    @observable private _boardOfTrusties13gMandate: F013g_BoardOfTrusties13gMandate = null;
    
    @TypeSystem.propertyDecorator(F013g_BoardOfTrusties13gMandate ? F013g_BoardOfTrusties13gMandate : moduleContext.moduleName + '.' + 'F013g_BoardOfTrusties13gMandate')
    public set boardOfTrusties13gMandate(val: F013g_BoardOfTrusties13gMandate){
        this._boardOfTrusties13gMandate = val;
    }
    
    public get boardOfTrusties13gMandate(): F013g_BoardOfTrusties13gMandate{
        return this._boardOfTrusties13gMandate;
    }
      

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F01340_BoardManagersSupporter2', moduleContext.moduleName)
export class F01340_BoardManagersSupporter2 extends Record { 

    @observable private _subject: Person = null;
    
    @TypeSystem.propertyDecorator(Person ? Person : moduleContext.moduleName + '.' + 'Person')
    public set subject(val: Person){
        this._subject = val;
    }
    
    public get subject(): Person{
        return this._subject;
    }
      

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F013v_BoardOfManagersSupporters2', moduleContext.moduleName)
export class F013v_BoardOfManagersSupporters2 extends CompositeField { 

    @observable private _f01340_BoardManagersSupporter2List: F01340_BoardManagersSupporter2[] = null;
    
    @TypeSystem.propertyArrayDecorator(F01340_BoardManagersSupporter2 ? F01340_BoardManagersSupporter2 : moduleContext.moduleName + '.' + 'F01340_BoardManagersSupporter2')
    public set f01340_BoardManagersSupporter2List(val: F01340_BoardManagersSupporter2[]){
        this._f01340_BoardManagersSupporter2List = val;
    }
    
    public get f01340_BoardManagersSupporter2List(): F01340_BoardManagersSupporter2[]{
        return this._f01340_BoardManagersSupporter2List;
    }
      

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F01401_Supervisor', moduleContext.moduleName)
export class F01401_Supervisor extends Record { 

    @observable private _subject: Person = null;
    
    @TypeSystem.propertyDecorator(Person ? Person : moduleContext.moduleName + '.' + 'Person')
    public set subject(val: Person){
        this._subject = val;
    }
    
    public get subject(): Person{
        return this._subject;
    }
      

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F0140_SupervisingBoardMandate', moduleContext.moduleName)
export class F0140_SupervisingBoardMandate extends Mandate {  

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F014_SupervisingBoard', moduleContext.moduleName)
export class F014_SupervisingBoard extends CompositeField { 

    @observable private _supervisingBoardMandate: F0140_SupervisingBoardMandate = null;
    
    @TypeSystem.propertyDecorator(F0140_SupervisingBoardMandate ? F0140_SupervisingBoardMandate : moduleContext.moduleName + '.' + 'F0140_SupervisingBoardMandate')
    public set supervisingBoardMandate(val: F0140_SupervisingBoardMandate){
        this._supervisingBoardMandate = val;
    }
    
    public get supervisingBoardMandate(): F0140_SupervisingBoardMandate{
        return this._supervisingBoardMandate;
    }
     

    @observable private _supervisorList: F01401_Supervisor[] = null;
    
    @TypeSystem.propertyArrayDecorator(F01401_Supervisor ? F01401_Supervisor : moduleContext.moduleName + '.' + 'F01401_Supervisor')
    public set supervisorList(val: F01401_Supervisor[]){
        this._supervisorList = val;
    }
    
    public get supervisorList(): F01401_Supervisor[]{
        return this._supervisorList;
    }
      

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F01421_Supervisor2', moduleContext.moduleName)
export class F01421_Supervisor2 extends Record { 

    @observable private _subject: Person = null;
    
    @TypeSystem.propertyDecorator(Person ? Person : moduleContext.moduleName + '.' + 'Person')
    public set subject(val: Person){
        this._subject = val;
    }
    
    public get subject(): Person{
        return this._subject;
    }
      

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F01420_SupervisingBoardMandate2', moduleContext.moduleName)
export class F01420_SupervisingBoardMandate2 extends Mandate {  

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F014b_SupervisingBoard2', moduleContext.moduleName)
export class F014b_SupervisingBoard2 extends CompositeField { 

    @observable private _supervisingBoard2Mandate: F01420_SupervisingBoardMandate2 = null;
    
    @TypeSystem.propertyDecorator(F01420_SupervisingBoardMandate2 ? F01420_SupervisingBoardMandate2 : moduleContext.moduleName + '.' + 'F01420_SupervisingBoardMandate2')
    public set supervisingBoard2Mandate(val: F01420_SupervisingBoardMandate2){
        this._supervisingBoard2Mandate = val;
    }
    
    public get supervisingBoard2Mandate(): F01420_SupervisingBoardMandate2{
        return this._supervisingBoard2Mandate;
    }
     

    @observable private _supervisor2List: F01421_Supervisor2[] = null;
    
    @TypeSystem.propertyArrayDecorator(F01421_Supervisor2 ? F01421_Supervisor2 : moduleContext.moduleName + '.' + 'F01421_Supervisor2')
    public set supervisor2List(val: F01421_Supervisor2[]){
        this._supervisor2List = val;
    }
    
    public get supervisor2List(): F01421_Supervisor2[]{
        return this._supervisor2List;
    }
      

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F01430_SupervisingBoardSupporter', moduleContext.moduleName)
export class F01430_SupervisingBoardSupporter extends Record { 

    @observable private _subject: Person = null;
    
    @TypeSystem.propertyDecorator(Person ? Person : moduleContext.moduleName + '.' + 'Person')
    public set subject(val: Person){
        this._subject = val;
    }
    
    public get subject(): Person{
        return this._subject;
    }
      

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F014v_SupervisingBoardSupporters', moduleContext.moduleName)
export class F014v_SupervisingBoardSupporters extends CompositeField { 

    @observable private _supervisingBoardSupporterList: F01430_SupervisingBoardSupporter[] = null;
    
    @TypeSystem.propertyArrayDecorator(F01430_SupervisingBoardSupporter ? F01430_SupervisingBoardSupporter : moduleContext.moduleName + '.' + 'F01430_SupervisingBoardSupporter')
    public set supervisingBoardSupporterList(val: F01430_SupervisingBoardSupporter[]){
        this._supervisingBoardSupporterList = val;
    }
    
    public get supervisingBoardSupporterList(): F01430_SupervisingBoardSupporter[]{
        return this._supervisingBoardSupporterList;
    }
      

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F01501_ControllingBoardPerson', moduleContext.moduleName)
export class F01501_ControllingBoardPerson extends Record { 

    @observable private _person: Person = null;
    
    @TypeSystem.propertyDecorator(Person ? Person : moduleContext.moduleName + '.' + 'Person')
    public set person(val: Person){
        this._person = val;
    }
    
    public get person(): Person{
        return this._person;
    }
      

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F0150_ControllingBoardMandate', moduleContext.moduleName)
export class F0150_ControllingBoardMandate extends Mandate {  

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F015_ControllingBoard', moduleContext.moduleName)
export class F015_ControllingBoard extends CompositeField { 

    @observable private _controllingBoardMandate: F0150_ControllingBoardMandate = null;
    
    @TypeSystem.propertyDecorator(F0150_ControllingBoardMandate ? F0150_ControllingBoardMandate : moduleContext.moduleName + '.' + 'F0150_ControllingBoardMandate')
    public set controllingBoardMandate(val: F0150_ControllingBoardMandate){
        this._controllingBoardMandate = val;
    }
    
    public get controllingBoardMandate(): F0150_ControllingBoardMandate{
        return this._controllingBoardMandate;
    }
     

    @observable private _controllingBoardPersonList: F01501_ControllingBoardPerson[] = null;
    
    @TypeSystem.propertyArrayDecorator(F01501_ControllingBoardPerson ? F01501_ControllingBoardPerson : moduleContext.moduleName + '.' + 'F01501_ControllingBoardPerson')
    public set controllingBoardPersonList(val: F01501_ControllingBoardPerson[]){
        this._controllingBoardPersonList = val;
    }
    
    public get controllingBoardPersonList(): F01501_ControllingBoardPerson[]{
        return this._controllingBoardPersonList;
    }
      

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F01510_ControllingBoardSupportersPerson', moduleContext.moduleName)
export class F01510_ControllingBoardSupportersPerson extends Record { 

    @observable private _person: Person = null;
    
    @TypeSystem.propertyDecorator(Person ? Person : moduleContext.moduleName + '.' + 'Person')
    public set person(val: Person){
        this._person = val;
    }
    
    public get person(): Person{
        return this._person;
    }
      

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F015a_ControllingBoardSupporters', moduleContext.moduleName)
export class F015a_ControllingBoardSupporters extends CompositeField { 

    @observable private _controllingBoardSupportersPersonList: F01510_ControllingBoardSupportersPerson[] = null;
    
    @TypeSystem.propertyArrayDecorator(F01510_ControllingBoardSupportersPerson ? F01510_ControllingBoardSupportersPerson : moduleContext.moduleName + '.' + 'F01510_ControllingBoardSupportersPerson')
    public set controllingBoardSupportersPersonList(val: F01510_ControllingBoardSupportersPerson[]){
        this._controllingBoardSupportersPersonList = val;
    }
    
    public get controllingBoardSupportersPersonList(): F01510_ControllingBoardSupportersPerson[]{
        return this._controllingBoardSupportersPersonList;
    }
      

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F015b1_CommissionMember15b', moduleContext.moduleName)
export class F015b1_CommissionMember15b extends Record { 

    @observable private _person: Person = null;
    
    @TypeSystem.propertyDecorator(Person ? Person : moduleContext.moduleName + '.' + 'Person')
    public set person(val: Person){
        this._person = val;
    }
    
    public get person(): Person{
        return this._person;
    }
      

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F015b0_VerificationCommission15bMandate', moduleContext.moduleName)
export class F015b0_VerificationCommission15bMandate extends Mandate {  

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F015b_VerificationCommission15b', moduleContext.moduleName)
export class F015b_VerificationCommission15b extends CompositeField { 

    @observable private _commissionMembers15bList: F015b1_CommissionMember15b[] = null;
    
    @TypeSystem.propertyArrayDecorator(F015b1_CommissionMember15b ? F015b1_CommissionMember15b : moduleContext.moduleName + '.' + 'F015b1_CommissionMember15b')
    public set commissionMembers15bList(val: F015b1_CommissionMember15b[]){
        this._commissionMembers15bList = val;
    }
    
    public get commissionMembers15bList(): F015b1_CommissionMember15b[]{
        return this._commissionMembers15bList;
    }
     

    @observable private _verificationCommission15bMandate: F015b0_VerificationCommission15bMandate = null;
    
    @TypeSystem.propertyDecorator(F015b0_VerificationCommission15bMandate ? F015b0_VerificationCommission15bMandate : moduleContext.moduleName + '.' + 'F015b0_VerificationCommission15bMandate')
    public set verificationCommission15bMandate(val: F015b0_VerificationCommission15bMandate){
        this._verificationCommission15bMandate = val;
    }
    
    public get verificationCommission15bMandate(): F015b0_VerificationCommission15bMandate{
        return this._verificationCommission15bMandate;
    }
      

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F016_TermsOfPartnership', moduleContext.moduleName)
export class F016_TermsOfPartnership extends TextRecordField { 
    
    @observable private _date: moment.Moment = null;
    
    @TypeSystem.propertyDecorator('moment')
    public set date(val: moment.Moment){
        this._date = val;
    }
    
    public get date(): moment.Moment{
        return this._date;
    } 

    @observable private _termType: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set termType(val: string){
        this._termType = val;
    }
    
    public get termType(): string{
        return this._termType;
    }
      

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F016a_TermOfExisting', moduleContext.moduleName)
export class F016a_TermOfExisting extends TextRecordField { 
    
    @observable private _date: moment.Moment = null;
    
    @TypeSystem.propertyDecorator('moment')
    public set date(val: moment.Moment){
        this._date = val;
    }
    
    public get date(): moment.Moment{
        return this._date;
    }  

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F016b_TermOfExistingEUIE', moduleContext.moduleName)
export class F016b_TermOfExistingEUIE extends TextRecordField { 
    
    @observable private _date: moment.Moment = null;
    
    @TypeSystem.propertyDecorator('moment')
    public set date(val: moment.Moment){
        this._date = val;
    }
    
    public get date(): moment.Moment{
        return this._date;
    } 

    @observable private _termTypeEUIE: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set termTypeEUIE(val: string){
        this._termTypeEUIE = val;
    }
    
    public get termTypeEUIE(): string{
        return this._termTypeEUIE;
    }
      

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F016v_TermOfExistenceNonProfitLegalEntity', moduleContext.moduleName)
export class F016v_TermOfExistenceNonProfitLegalEntity extends TextRecordField { 
    
    @observable private _date: moment.Moment = null;
    
    @TypeSystem.propertyDecorator('moment')
    public set date(val: moment.Moment){
        this._date = val;
    }
    
    public get date(): moment.Moment{
        return this._date;
    } 

    @observable private _termTypeNonProfitLegalEntity: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set termTypeNonProfitLegalEntity(val: string){
        this._termTypeNonProfitLegalEntity = val;
    }
    
    public get termTypeNonProfitLegalEntity(): string{
        return this._termTypeNonProfitLegalEntity;
    }
      

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F017_SpecialConditions', moduleContext.moduleName)
export class F017_SpecialConditions extends TextRecordField { 

    @observable private _isConsortium: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set isConsortium(val: boolean){
        this._isConsortium = val;
    }
    
    public get isConsortium(): boolean{
        return this._isConsortium;
    }
     

    @observable private _isHolding: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set isHolding(val: boolean){
        this._isHolding = val;
    }
    
    public get isHolding(): boolean{
        return this._isHolding;
    }
      

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F017a_DesignatedToPerformPublicBenefit', moduleContext.moduleName)
export class F017a_DesignatedToPerformPublicBenefit extends CheckRecordField {  

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F017b_TemporarilySuspendedStatusForPublicBenefits', moduleContext.moduleName)
export class F017b_TemporarilySuspendedStatusForPublicBenefits extends CheckRecordField {  

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F017g_DesignatedToCarryOutPrivateActivity', moduleContext.moduleName)
export class F017g_DesignatedToCarryOutPrivateActivity extends CheckRecordField {  

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F017v_RestorationOfStatusInPublicBenefit', moduleContext.moduleName)
export class F017v_RestorationOfStatusInPublicBenefit extends CheckRecordField {  

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F018_PhysicalPersonTrader', moduleContext.moduleName)
export class F018_PhysicalPersonTrader extends RecordField { 

    @observable private _person: Person = null;
    
    @TypeSystem.propertyDecorator(Person ? Person : moduleContext.moduleName + '.' + 'Person')
    public set person(val: Person){
        this._person = val;
    }
    
    public get person(): Person{
        return this._person;
    }
      

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F0190_Partner', moduleContext.moduleName)
export class F0190_Partner extends Record { 

    @observable private _subject: Person = null;
    
    @TypeSystem.propertyDecorator(Person ? Person : moduleContext.moduleName + '.' + 'Person')
    public set subject(val: Person){
        this._subject = val;
    }
    
    public get subject(): Person{
        return this._subject;
    }
     

    @observable private _share: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set share(val: string){
        this._share = val;
    }
    
    public get share(): string{
        return this._share;
    }
      

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F019_Partners', moduleContext.moduleName)
export class F019_Partners extends CompositeField { 

    @observable private _partnersList: F0190_Partner[] = null;
    
    @TypeSystem.propertyArrayDecorator(F0190_Partner ? F0190_Partner : moduleContext.moduleName + '.' + 'F0190_Partner')
    public set partnersList(val: F0190_Partner[]){
        this._partnersList = val;
    }
    
    public get partnersList(): F0190_Partner[]{
        return this._partnersList;
    }
      

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F0200_UnlimitedLiabilityPartner', moduleContext.moduleName)
export class F0200_UnlimitedLiabilityPartner extends Record { 

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
      

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F020_UnlimitedLiabilityPartners', moduleContext.moduleName)
export class F020_UnlimitedLiabilityPartners extends CompositeField { 

    @observable private _unlimitedLiabilityPartnerList: F0200_UnlimitedLiabilityPartner[] = null;
    
    @TypeSystem.propertyArrayDecorator(F0200_UnlimitedLiabilityPartner ? F0200_UnlimitedLiabilityPartner : moduleContext.moduleName + '.' + 'F0200_UnlimitedLiabilityPartner')
    public set unlimitedLiabilityPartnerList(val: F0200_UnlimitedLiabilityPartner[]){
        this._unlimitedLiabilityPartnerList = val;
    }
    
    public get unlimitedLiabilityPartnerList(): F0200_UnlimitedLiabilityPartner[]{
        return this._unlimitedLiabilityPartnerList;
    }
      

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F0201_UnlimitedLiabilityPartnerEUIE', moduleContext.moduleName)
export class F0201_UnlimitedLiabilityPartnerEUIE extends Record { 

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
     

    @observable private _noObligationsEUIE: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set noObligationsEUIE(val: boolean){
        this._noObligationsEUIE = val;
    }
    
    public get noObligationsEUIE(): boolean{
        return this._noObligationsEUIE;
    }
     
    
    @observable private _date: moment.Moment = null;
    
    @TypeSystem.propertyDecorator('moment')
    public set date(val: moment.Moment){
        this._date = val;
    }
    
    public get date(): moment.Moment{
        return this._date;
    }  

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F020a_UnlimitedLiabilityPartnersEUIE', moduleContext.moduleName)
export class F020a_UnlimitedLiabilityPartnersEUIE extends CompositeField { 

    @observable private _unlimitedLiabilityPartnerEUIEList: F0201_UnlimitedLiabilityPartnerEUIE[] = null;
    
    @TypeSystem.propertyArrayDecorator(F0201_UnlimitedLiabilityPartnerEUIE ? F0201_UnlimitedLiabilityPartnerEUIE : moduleContext.moduleName + '.' + 'F0201_UnlimitedLiabilityPartnerEUIE')
    public set unlimitedLiabilityPartnerEUIEList(val: F0201_UnlimitedLiabilityPartnerEUIE[]){
        this._unlimitedLiabilityPartnerEUIEList = val;
    }
    
    public get unlimitedLiabilityPartnerEUIEList(): F0201_UnlimitedLiabilityPartnerEUIE[]{
        return this._unlimitedLiabilityPartnerEUIEList;
    }
      

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F0210_LimitedLiabilityPartner', moduleContext.moduleName)
export class F0210_LimitedLiabilityPartner extends Record { 

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
      

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F021_LimitedLiabilityPartners', moduleContext.moduleName)
export class F021_LimitedLiabilityPartners extends CompositeField { 

    @observable private _liabilityPartnerList: F0210_LimitedLiabilityPartner[] = null;
    
    @TypeSystem.propertyArrayDecorator(F0210_LimitedLiabilityPartner ? F0210_LimitedLiabilityPartner : moduleContext.moduleName + '.' + 'F0210_LimitedLiabilityPartner')
    public set liabilityPartnerList(val: F0210_LimitedLiabilityPartner[]){
        this._liabilityPartnerList = val;
    }
    
    public get liabilityPartnerList(): F0210_LimitedLiabilityPartner[]{
        return this._liabilityPartnerList;
    }
      

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F02201_ForeignTraderCountry', moduleContext.moduleName)
export class F02201_ForeignTraderCountry extends Record { 

    @observable private _isEUCountry: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set isEUCountry(val: boolean){
        this._isEUCountry = val;
    }
    
    public get isEUCountry(): boolean{
        return this._isEUCountry;
    }
     

    @observable private _otherCountr: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set otherCountr(val: boolean){
        this._otherCountr = val;
    }
    
    public get otherCountr(): boolean{
        return this._otherCountr;
    }
     

    @observable private _country: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set country(val: string){
        this._country = val;
    }
    
    public get country(): string{
        return this._country;
    }
     

    @observable private _countryCode: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set countryCode(val: string){
        this._countryCode = val;
    }
    
    public get countryCode(): string{
        return this._countryCode;
    }
     

    @observable private _countryCodeBRIS: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set countryCodeBRIS(val: string){
        this._countryCodeBRIS = val;
    }
    
    public get countryCodeBRIS(): string{
        return this._countryCodeBRIS;
    }
      

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F02203_ForeignTraderWayOfRepresentation', moduleContext.moduleName)
export class F02203_ForeignTraderWayOfRepresentation extends Record { 

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
     

    @observable private _representSelected: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set representSelected(val: boolean){
        this._representSelected = val;
    }
    
    public get representSelected(): boolean{
        return this._representSelected;
    }
     

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

@TypeSystem.typeDecorator('F02204_AddemptionOfForeignTrader', moduleContext.moduleName)
export class F02204_AddemptionOfForeignTrader extends Record { 

    @observable private _checked: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set checked(val: boolean){
        this._checked = val;
    }
    
    public get checked(): boolean{
        return this._checked;
    }
      

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F0220_ForeignTrader', moduleContext.moduleName)
export class F0220_ForeignTrader extends Record { 

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

@TypeSystem.typeDecorator('F022_ForeignTraders', moduleContext.moduleName)
export class F022_ForeignTraders extends CompositeField { 

    @observable private _foreignTraderRegistration: F02200_ForeignTraderRegistration = null;
    
    @TypeSystem.propertyDecorator(F02200_ForeignTraderRegistration ? F02200_ForeignTraderRegistration : moduleContext.moduleName + '.' + 'F02200_ForeignTraderRegistration')
    public set foreignTraderRegistration(val: F02200_ForeignTraderRegistration){
        this._foreignTraderRegistration = val;
    }
    
    public get foreignTraderRegistration(): F02200_ForeignTraderRegistration{
        return this._foreignTraderRegistration;
    }
     

    @observable private _foreignTraderCountry: F02201_ForeignTraderCountry = null;
    
    @TypeSystem.propertyDecorator(F02201_ForeignTraderCountry ? F02201_ForeignTraderCountry : moduleContext.moduleName + '.' + 'F02201_ForeignTraderCountry')
    public set foreignTraderCountry(val: F02201_ForeignTraderCountry){
        this._foreignTraderCountry = val;
    }
    
    public get foreignTraderCountry(): F02201_ForeignTraderCountry{
        return this._foreignTraderCountry;
    }
     

    @observable private _foreignTraderWayOfRepresentation: F02203_ForeignTraderWayOfRepresentation = null;
    
    @TypeSystem.propertyDecorator(F02203_ForeignTraderWayOfRepresentation ? F02203_ForeignTraderWayOfRepresentation : moduleContext.moduleName + '.' + 'F02203_ForeignTraderWayOfRepresentation')
    public set foreignTraderWayOfRepresentation(val: F02203_ForeignTraderWayOfRepresentation){
        this._foreignTraderWayOfRepresentation = val;
    }
    
    public get foreignTraderWayOfRepresentation(): F02203_ForeignTraderWayOfRepresentation{
        return this._foreignTraderWayOfRepresentation;
    }
     

    @observable private _addemptionOfForeignTrader: F02204_AddemptionOfForeignTrader = null;
    
    @TypeSystem.propertyDecorator(F02204_AddemptionOfForeignTrader ? F02204_AddemptionOfForeignTrader : moduleContext.moduleName + '.' + 'F02204_AddemptionOfForeignTrader')
    public set addemptionOfForeignTrader(val: F02204_AddemptionOfForeignTrader){
        this._addemptionOfForeignTrader = val;
    }
    
    public get addemptionOfForeignTrader(): F02204_AddemptionOfForeignTrader{
        return this._addemptionOfForeignTrader;
    }
     

    @observable private _foreignTraderList: F0220_ForeignTrader[] = null;
    
    @TypeSystem.propertyArrayDecorator(F0220_ForeignTrader ? F0220_ForeignTrader : moduleContext.moduleName + '.' + 'F0220_ForeignTrader')
    public set foreignTraderList(val: F0220_ForeignTrader[]){
        this._foreignTraderList = val;
    }
    
    public get foreignTraderList(): F0220_ForeignTrader[]{
        return this._foreignTraderList;
    }
      

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F0223_ForeignCompanyData', moduleContext.moduleName)
export class F0223_ForeignCompanyData extends Record { 

    @observable private _companyData: ForeignCompanyBaseData = null;
    
    @TypeSystem.propertyDecorator(ForeignCompanyBaseData ? ForeignCompanyBaseData : moduleContext.moduleName + '.' + 'ForeignCompanyBaseData')
    public set companyData(val: ForeignCompanyBaseData){
        this._companyData = val;
    }
    
    public get companyData(): ForeignCompanyBaseData{
        return this._companyData;
    }
      

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F02231_EUIEAddempted', moduleContext.moduleName)
export class F02231_EUIEAddempted extends Record { 

    @observable private _addempted: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set addempted(val: boolean){
        this._addempted = val;
    }
    
    public get addempted(): boolean{
        return this._addempted;
    }
      

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F02232_RepresentersWayOfManagement', moduleContext.moduleName)
export class F02232_RepresentersWayOfManagement extends Record { 

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
     

    @observable private _representSelected: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set representSelected(val: boolean){
        this._representSelected = val;
    }
    
    public get representSelected(): boolean{
        return this._representSelected;
    }
     

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

@TypeSystem.typeDecorator('F02233_PowerOfLiquidators', moduleContext.moduleName)
export class F02233_PowerOfLiquidators extends Record { 

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

@TypeSystem.typeDecorator('F02234_PowerOfTrustees', moduleContext.moduleName)
export class F02234_PowerOfTrustees extends Record { 

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

@TypeSystem.typeDecorator('F0224_DiscontinuanceOfTheEUIE', moduleContext.moduleName)
export class F0224_DiscontinuanceOfTheEUIE extends RecordField { 

    @observable private _stopOfLiquidation: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set stopOfLiquidation(val: boolean){
        this._stopOfLiquidation = val;
    }
    
    public get stopOfLiquidation(): boolean{
        return this._stopOfLiquidation;
    }
     

    @observable private _continuationOfActivity: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set continuationOfActivity(val: boolean){
        this._continuationOfActivity = val;
    }
    
    public get continuationOfActivity(): boolean{
        return this._continuationOfActivity;
    }
     

    @observable private _beginOfLiquidation: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set beginOfLiquidation(val: boolean){
        this._beginOfLiquidation = val;
    }
    
    public get beginOfLiquidation(): boolean{
        return this._beginOfLiquidation;
    }
     

    @observable private _stopEUIE: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set stopEUIE(val: boolean){
        this._stopEUIE = val;
    }
    
    public get stopEUIE(): boolean{
        return this._stopEUIE;
    }
      

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F02250_InsolvencyOfEUIE', moduleContext.moduleName)
export class F02250_InsolvencyOfEUIE extends Record { 

    @observable private _decision759: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set decision759(val: boolean){
        this._decision759 = val;
    }
    
    public get decision759(): boolean{
        return this._decision759;
    }
     

    @observable private _decision760: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set decision760(val: boolean){
        this._decision760 = val;
    }
    
    public get decision760(): boolean{
        return this._decision760;
    }
     
    
    @observable private _date: moment.Moment = null;
    
    @TypeSystem.propertyDecorator('moment')
    public set date(val: moment.Moment){
        this._date = val;
    }
    
    public get date(): moment.Moment{
        return this._date;
    } 

    @observable private _insolvencyText: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set insolvencyText(val: string){
        this._insolvencyText = val;
    }
    
    public get insolvencyText(): string{
        return this._insolvencyText;
    }
     

    @observable private _actNumber: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set actNumber(val: string){
        this._actNumber = val;
    }
    
    public get actNumber(): string{
        return this._actNumber;
    }
     

    @observable private _judicialCode: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set judicialCode(val: string){
        this._judicialCode = val;
    }
    
    public get judicialCode(): string{
        return this._judicialCode;
    }
      

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F0225_InsolvenciesOfEUIE', moduleContext.moduleName)
export class F0225_InsolvenciesOfEUIE extends CompositeField { 

    @observable private _insolvencyOfEUIEList: F02250_InsolvencyOfEUIE[] = null;
    
    @TypeSystem.propertyArrayDecorator(F02250_InsolvencyOfEUIE ? F02250_InsolvencyOfEUIE : moduleContext.moduleName + '.' + 'F02250_InsolvencyOfEUIE')
    public set insolvencyOfEUIEList(val: F02250_InsolvencyOfEUIE[]){
        this._insolvencyOfEUIEList = val;
    }
    
    public get insolvencyOfEUIEList(): F02250_InsolvencyOfEUIE[]{
        return this._insolvencyOfEUIEList;
    }
      

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F022a_DiscontinuanceOfForeignTrader', moduleContext.moduleName)
export class F022a_DiscontinuanceOfForeignTrader extends RecordField { 

    @observable private _finishingOfLiquidation: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set finishingOfLiquidation(val: boolean){
        this._finishingOfLiquidation = val;
    }
    
    public get finishingOfLiquidation(): boolean{
        return this._finishingOfLiquidation;
    }
     

    @observable private _stopOfLiquidation: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set stopOfLiquidation(val: boolean){
        this._stopOfLiquidation = val;
    }
    
    public get stopOfLiquidation(): boolean{
        return this._stopOfLiquidation;
    }
     

    @observable private _continuationOfActivity: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set continuationOfActivity(val: boolean){
        this._continuationOfActivity = val;
    }
    
    public get continuationOfActivity(): boolean{
        return this._continuationOfActivity;
    }
     

    @observable private _beginOfLiquidation: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set beginOfLiquidation(val: boolean){
        this._beginOfLiquidation = val;
    }
    
    public get beginOfLiquidation(): boolean{
        return this._beginOfLiquidation;
    }
     

    @observable private _stopForeignerTrader: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set stopForeignerTrader(val: boolean){
        this._stopForeignerTrader = val;
    }
    
    public get stopForeignerTrader(): boolean{
        return this._stopForeignerTrader;
    }
      

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F02220_InsolvencyOfForeignTrader', moduleContext.moduleName)
export class F02220_InsolvencyOfForeignTrader extends Record { 

    @observable private _decision759: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set decision759(val: boolean){
        this._decision759 = val;
    }
    
    public get decision759(): boolean{
        return this._decision759;
    }
     

    @observable private _decision760: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set decision760(val: boolean){
        this._decision760 = val;
    }
    
    public get decision760(): boolean{
        return this._decision760;
    }
     
    
    @observable private _date: moment.Moment = null;
    
    @TypeSystem.propertyDecorator('moment')
    public set date(val: moment.Moment){
        this._date = val;
    }
    
    public get date(): moment.Moment{
        return this._date;
    } 

    @observable private _insolvencyText: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set insolvencyText(val: string){
        this._insolvencyText = val;
    }
    
    public get insolvencyText(): string{
        return this._insolvencyText;
    }
     

    @observable private _actNumber: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set actNumber(val: string){
        this._actNumber = val;
    }
    
    public get actNumber(): string{
        return this._actNumber;
    }
     

    @observable private _judicialCode: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set judicialCode(val: string){
        this._judicialCode = val;
    }
    
    public get judicialCode(): string{
        return this._judicialCode;
    }
      

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F022b_InsolvenciesOfForeignTrader', moduleContext.moduleName)
export class F022b_InsolvenciesOfForeignTrader extends CompositeField { 

    @observable private _insolvencyOfForeignTraderList: F02220_InsolvencyOfForeignTrader[] = null;
    
    @TypeSystem.propertyArrayDecorator(F02220_InsolvencyOfForeignTrader ? F02220_InsolvencyOfForeignTrader : moduleContext.moduleName + '.' + 'F02220_InsolvencyOfForeignTrader')
    public set insolvencyOfForeignTraderList(val: F02220_InsolvencyOfForeignTrader[]){
        this._insolvencyOfForeignTraderList = val;
    }
    
    public get insolvencyOfForeignTraderList(): F02220_InsolvencyOfForeignTrader[]{
        return this._insolvencyOfForeignTraderList;
    }
      

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F023_SoleCapitalOwner', moduleContext.moduleName)
export class F023_SoleCapitalOwner extends RecordField { 

    @observable private _subject: Person = null;
    
    @TypeSystem.propertyDecorator(Person ? Person : moduleContext.moduleName + '.' + 'Person')
    public set subject(val: Person){
        this._subject = val;
    }
    
    public get subject(): Person{
        return this._subject;
    }
      

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F023a_Owner', moduleContext.moduleName)
export class F023a_Owner extends RecordField { 

    @observable private _subject: Person = null;
    
    @TypeSystem.propertyDecorator(Person ? Person : moduleContext.moduleName + '.' + 'Person')
    public set subject(val: Person){
        this._subject = val;
    }
    
    public get subject(): Person{
        return this._subject;
    }
      

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F02320_EuropeanHoldingCompanyAsShareholder', moduleContext.moduleName)
export class F02320_EuropeanHoldingCompanyAsShareholder extends Record { 

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
      

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F023b_EuropeanHoldingCompanysAsShareholders', moduleContext.moduleName)
export class F023b_EuropeanHoldingCompanysAsShareholders extends CompositeField { 

    @observable private _europeanHoldingCompanyAsShareholderList: F02320_EuropeanHoldingCompanyAsShareholder[] = null;
    
    @TypeSystem.propertyArrayDecorator(F02320_EuropeanHoldingCompanyAsShareholder ? F02320_EuropeanHoldingCompanyAsShareholder : moduleContext.moduleName + '.' + 'F02320_EuropeanHoldingCompanyAsShareholder')
    public set europeanHoldingCompanyAsShareholderList(val: F02320_EuropeanHoldingCompanyAsShareholder[]){
        this._europeanHoldingCompanyAsShareholderList = val;
    }
    
    public get europeanHoldingCompanyAsShareholderList(): F02320_EuropeanHoldingCompanyAsShareholder[]{
        return this._europeanHoldingCompanyAsShareholderList;
    }
      

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F0240_ShareTransfer', moduleContext.moduleName)
export class F0240_ShareTransfer extends Record { 

    @observable private _oldOwner: Person = null;
    
    @TypeSystem.propertyDecorator(Person ? Person : moduleContext.moduleName + '.' + 'Person')
    public set oldOwner(val: Person){
        this._oldOwner = val;
    }
    
    public get oldOwner(): Person{
        return this._oldOwner;
    }
     

    @observable private _newOwner: Person = null;
    
    @TypeSystem.propertyDecorator(Person ? Person : moduleContext.moduleName + '.' + 'Person')
    public set newOwner(val: Person){
        this._newOwner = val;
    }
    
    public get newOwner(): Person{
        return this._newOwner;
    }
     

    @observable private _shareAmount: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set shareAmount(val: string){
        this._shareAmount = val;
    }
    
    public get shareAmount(): string{
        return this._shareAmount;
    }
     

    @observable private _oldOwnerCountryID: number = null;
    
    @TypeSystem.propertyDecorator('number')
    public set oldOwnerCountryID(val: number){
        this._oldOwnerCountryID = val;
    }
    
    public get oldOwnerCountryID(): number{
        return this._oldOwnerCountryID;
    }
     

    @observable private _oldOwnerCountryName: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set oldOwnerCountryName(val: string){
        this._oldOwnerCountryName = val;
    }
    
    public get oldOwnerCountryName(): string{
        return this._oldOwnerCountryName;
    }
     

    @observable private _newOwnerCountryID: number = null;
    
    @TypeSystem.propertyDecorator('number')
    public set newOwnerCountryID(val: number){
        this._newOwnerCountryID = val;
    }
    
    public get newOwnerCountryID(): number{
        return this._newOwnerCountryID;
    }
     

    @observable private _newOwnerCountryName: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set newOwnerCountryName(val: string){
        this._newOwnerCountryName = val;
    }
    
    public get newOwnerCountryName(): string{
        return this._newOwnerCountryName;
    }
     
    
    @observable private _transferDate: moment.Moment = null;
    
    @TypeSystem.propertyDecorator('moment')
    public set transferDate(val: moment.Moment){
        this._transferDate = val;
    }
    
    public get transferDate(): moment.Moment{
        return this._transferDate;
    }  

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F024_ShareTransfers', moduleContext.moduleName)
export class F024_ShareTransfers extends CompositeField { 

    @observable private _shareTransfersList: F0240_ShareTransfer[] = null;
    
    @TypeSystem.propertyArrayDecorator(F0240_ShareTransfer ? F0240_ShareTransfer : moduleContext.moduleName + '.' + 'F0240_ShareTransfer')
    public set shareTransfersList(val: F0240_ShareTransfer[]){
        this._shareTransfersList = val;
    }
    
    public get shareTransfersList(): F0240_ShareTransfer[]{
        return this._shareTransfersList;
    }
      

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F024a_HiddenNonMonetaryDeposit', moduleContext.moduleName)
export class F024a_HiddenNonMonetaryDeposit extends TextRecordField { 

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

@TypeSystem.typeDecorator('F025_SharePaymentResponsibility', moduleContext.moduleName)
export class F025_SharePaymentResponsibility extends TextRecordField {  

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F025a_ConcededEstateValue', moduleContext.moduleName)
export class F025a_ConcededEstateValue extends TextRecordField {  

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F025b_TotalAmountOfInitialPropertyContributions', moduleContext.moduleName)
export class F025b_TotalAmountOfInitialPropertyContributions extends TextRecordField {  

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F02530_MembershipFees25v', moduleContext.moduleName)
export class F02530_MembershipFees25v extends RecordField { 

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

@TypeSystem.typeDecorator('F02531_CulturalEducationalAndInformationActivities25v', moduleContext.moduleName)
export class F02531_CulturalEducationalAndInformationActivities25v extends RecordField { 

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

@TypeSystem.typeDecorator('F02532_SubsidyFromStateAndMunicipalBudgets25v', moduleContext.moduleName)
export class F02532_SubsidyFromStateAndMunicipalBudgets25v extends RecordField { 

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

@TypeSystem.typeDecorator('F02533_RentalOfMovableAndImmovableProperty25v', moduleContext.moduleName)
export class F02533_RentalOfMovableAndImmovableProperty25v extends RecordField { 

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

@TypeSystem.typeDecorator('F02534_DonationAndWills25v', moduleContext.moduleName)
export class F02534_DonationAndWills25v extends RecordField { 

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

@TypeSystem.typeDecorator('F02535_OtherExpenses25v', moduleContext.moduleName)
export class F02535_OtherExpenses25v extends RecordField { 

    @observable private _text: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set text(val: string){
        this._text = val;
    }
    
    public get text(): string{
        return this._text;
    }
     

    @observable private _cheked: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set cheked(val: boolean){
        this._cheked = val;
    }
    
    public get cheked(): boolean{
        return this._cheked;
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

@TypeSystem.typeDecorator('F025v_SourcesOfInitialFinancing25v', moduleContext.moduleName)
export class F025v_SourcesOfInitialFinancing25v extends CompositeField { 

    @observable private _membershipFees25v: F02530_MembershipFees25v = null;
    
    @TypeSystem.propertyDecorator(F02530_MembershipFees25v ? F02530_MembershipFees25v : moduleContext.moduleName + '.' + 'F02530_MembershipFees25v')
    public set membershipFees25v(val: F02530_MembershipFees25v){
        this._membershipFees25v = val;
    }
    
    public get membershipFees25v(): F02530_MembershipFees25v{
        return this._membershipFees25v;
    }
     

    @observable private _culturalEducationalAndInformationActivities25v: F02531_CulturalEducationalAndInformationActivities25v = null;
    
    @TypeSystem.propertyDecorator(F02531_CulturalEducationalAndInformationActivities25v ? F02531_CulturalEducationalAndInformationActivities25v : moduleContext.moduleName + '.' + 'F02531_CulturalEducationalAndInformationActivities25v')
    public set culturalEducationalAndInformationActivities25v(val: F02531_CulturalEducationalAndInformationActivities25v){
        this._culturalEducationalAndInformationActivities25v = val;
    }
    
    public get culturalEducationalAndInformationActivities25v(): F02531_CulturalEducationalAndInformationActivities25v{
        return this._culturalEducationalAndInformationActivities25v;
    }
     

    @observable private _subsidyFromStateAndMunicipalBudgets25v: F02532_SubsidyFromStateAndMunicipalBudgets25v = null;
    
    @TypeSystem.propertyDecorator(F02532_SubsidyFromStateAndMunicipalBudgets25v ? F02532_SubsidyFromStateAndMunicipalBudgets25v : moduleContext.moduleName + '.' + 'F02532_SubsidyFromStateAndMunicipalBudgets25v')
    public set subsidyFromStateAndMunicipalBudgets25v(val: F02532_SubsidyFromStateAndMunicipalBudgets25v){
        this._subsidyFromStateAndMunicipalBudgets25v = val;
    }
    
    public get subsidyFromStateAndMunicipalBudgets25v(): F02532_SubsidyFromStateAndMunicipalBudgets25v{
        return this._subsidyFromStateAndMunicipalBudgets25v;
    }
     

    @observable private _rentalOfMovableAndImmovableProperty25v: F02533_RentalOfMovableAndImmovableProperty25v = null;
    
    @TypeSystem.propertyDecorator(F02533_RentalOfMovableAndImmovableProperty25v ? F02533_RentalOfMovableAndImmovableProperty25v : moduleContext.moduleName + '.' + 'F02533_RentalOfMovableAndImmovableProperty25v')
    public set rentalOfMovableAndImmovableProperty25v(val: F02533_RentalOfMovableAndImmovableProperty25v){
        this._rentalOfMovableAndImmovableProperty25v = val;
    }
    
    public get rentalOfMovableAndImmovableProperty25v(): F02533_RentalOfMovableAndImmovableProperty25v{
        return this._rentalOfMovableAndImmovableProperty25v;
    }
     

    @observable private _donationAndWills25v: F02534_DonationAndWills25v = null;
    
    @TypeSystem.propertyDecorator(F02534_DonationAndWills25v ? F02534_DonationAndWills25v : moduleContext.moduleName + '.' + 'F02534_DonationAndWills25v')
    public set donationAndWills25v(val: F02534_DonationAndWills25v){
        this._donationAndWills25v = val;
    }
    
    public get donationAndWills25v(): F02534_DonationAndWills25v{
        return this._donationAndWills25v;
    }
     

    @observable private _otherExpenses25v: F02535_OtherExpenses25v = null;
    
    @TypeSystem.propertyDecorator(F02535_OtherExpenses25v ? F02535_OtherExpenses25v : moduleContext.moduleName + '.' + 'F02535_OtherExpenses25v')
    public set otherExpenses25v(val: F02535_OtherExpenses25v){
        this._otherExpenses25v = val;
    }
    
    public get otherExpenses25v(): F02535_OtherExpenses25v{
        return this._otherExpenses25v;
    }
      

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F027_AddemptionOfTrader', moduleContext.moduleName)
export class F027_AddemptionOfTrader extends RecordField { 

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

@TypeSystem.typeDecorator('F027a_AddemptionOfTraderSeatChange', moduleContext.moduleName)
export class F027a_AddemptionOfTraderSeatChange extends SeatRecordField { 

    @observable private _isTraderAddempted: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set isTraderAddempted(val: boolean){
        this._isTraderAddempted = val;
    }
    
    public get isTraderAddempted(): boolean{
        return this._isTraderAddempted;
    }
     

    @observable private _foreignAuthority: ForeignAuthority = null;
    
    @TypeSystem.propertyDecorator(ForeignAuthority ? ForeignAuthority : moduleContext.moduleName + '.' + 'ForeignAuthority')
    public set foreignAuthority(val: ForeignAuthority){
        this._foreignAuthority = val;
    }
    
    public get foreignAuthority(): ForeignAuthority{
        return this._foreignAuthority;
    }
      

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F027v_AddemptionOfTraderEraseForeignTrader', moduleContext.moduleName)
export class F027v_AddemptionOfTraderEraseForeignTrader extends RecordField { 

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

@TypeSystem.typeDecorator('F028_ClosureBranchOfForeignTrader', moduleContext.moduleName)
export class F028_ClosureBranchOfForeignTrader extends RecordField { 

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

@TypeSystem.typeDecorator('F028a_AddemptionOfEUIE', moduleContext.moduleName)
export class F028a_AddemptionOfEUIE extends RecordField { 

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

@TypeSystem.typeDecorator('F031_Funds', moduleContext.moduleName)
export class F031_Funds extends TextRecordField { 

    @observable private _isInEuro: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set isInEuro(val: boolean){
        this._isInEuro = val;
    }
    
    public get isInEuro(): boolean{
        return this._isInEuro;
    }
      

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F03110_CredentialsForDifferentTypes', moduleContext.moduleName)
export class F03110_CredentialsForDifferentTypes extends TextRecordField {  

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F03111_SpecialConditionsForTransfer', moduleContext.moduleName)
export class F03111_SpecialConditionsForTransfer extends TextRecordField {  

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F0310a_Share', moduleContext.moduleName)
export class F0310a_Share extends Record { 

    @observable private _type: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set type(val: string){
        this._type = val;
    }
    
    public get type(): string{
        return this._type;
    }
     

    @observable private _count: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set count(val: string){
        this._count = val;
    }
    
    public get count(): string{
        return this._count;
    }
     

    @observable private _nominalValue: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set nominalValue(val: string){
        this._nominalValue = val;
    }
    
    public get nominalValue(): string{
        return this._nominalValue;
    }
      

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F031a_Shares', moduleContext.moduleName)
export class F031a_Shares extends CompositeField { 

    @observable private _credentialsForDifferentTypes: F03110_CredentialsForDifferentTypes = null;
    
    @TypeSystem.propertyDecorator(F03110_CredentialsForDifferentTypes ? F03110_CredentialsForDifferentTypes : moduleContext.moduleName + '.' + 'F03110_CredentialsForDifferentTypes')
    public set credentialsForDifferentTypes(val: F03110_CredentialsForDifferentTypes){
        this._credentialsForDifferentTypes = val;
    }
    
    public get credentialsForDifferentTypes(): F03110_CredentialsForDifferentTypes{
        return this._credentialsForDifferentTypes;
    }
     

    @observable private _specialConditionsForTransfer: F03111_SpecialConditionsForTransfer = null;
    
    @TypeSystem.propertyDecorator(F03111_SpecialConditionsForTransfer ? F03111_SpecialConditionsForTransfer : moduleContext.moduleName + '.' + 'F03111_SpecialConditionsForTransfer')
    public set specialConditionsForTransfer(val: F03111_SpecialConditionsForTransfer){
        this._specialConditionsForTransfer = val;
    }
    
    public get specialConditionsForTransfer(): F03111_SpecialConditionsForTransfer{
        return this._specialConditionsForTransfer;
    }
     

    @observable private _shareList: F0310a_Share[] = null;
    
    @TypeSystem.propertyArrayDecorator(F0310a_Share ? F0310a_Share : moduleContext.moduleName + '.' + 'F0310a_Share')
    public set shareList(val: F0310a_Share[]){
        this._shareList = val;
    }
    
    public get shareList(): F0310a_Share[]{
        return this._shareList;
    }
      

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F031b_MinimumAmount', moduleContext.moduleName)
export class F031b_MinimumAmount extends TextRecordField { 

    @observable private _isInEuro: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set isInEuro(val: boolean){
        this._isInEuro = val;
    }
    
    public get isInEuro(): boolean{
        return this._isInEuro;
    }
      

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F032_DepositedFunds', moduleContext.moduleName)
export class F032_DepositedFunds extends TextRecordField { 

    @observable private _isInEuro: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set isInEuro(val: boolean){
        this._isInEuro = val;
    }
    
    public get isInEuro(): boolean{
        return this._isInEuro;
    }
      

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F0330_NonMonetaryDeposit', moduleContext.moduleName)
export class F0330_NonMonetaryDeposit extends Record { 

    @observable private _description: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set description(val: string){
        this._description = val;
    }
    
    public get description(): string{
        return this._description;
    }
     

    @observable private _value: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set value(val: string){
        this._value = val;
    }
    
    public get value(): string{
        return this._value;
    }
     

    @observable private _outgoingNumber: OutgoingNumber = null;
    
    @TypeSystem.propertyDecorator(OutgoingNumber ? OutgoingNumber : moduleContext.moduleName + '.' + 'OutgoingNumber')
    public set outgoingNumber(val: OutgoingNumber){
        this._outgoingNumber = val;
    }
    
    public get outgoingNumber(): OutgoingNumber{
        return this._outgoingNumber;
    }
      

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F033_NonMonetaryDeposits', moduleContext.moduleName)
export class F033_NonMonetaryDeposits extends CompositeField { 

    @observable private _nonMonetaryDepositsList: F0330_NonMonetaryDeposit[] = null;
    
    @TypeSystem.propertyArrayDecorator(F0330_NonMonetaryDeposit ? F0330_NonMonetaryDeposit : moduleContext.moduleName + '.' + 'F0330_NonMonetaryDeposit')
    public set nonMonetaryDepositsList(val: F0330_NonMonetaryDeposit[]){
        this._nonMonetaryDepositsList = val;
    }
    
    public get nonMonetaryDepositsList(): F0330_NonMonetaryDeposit[]{
        return this._nonMonetaryDepositsList;
    }
      

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F034_BuyBackDecision', moduleContext.moduleName)
export class F034_BuyBackDecision extends TextRecordField { 

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

@TypeSystem.typeDecorator('F054a_VolumeOfRepresentationPower541', moduleContext.moduleName)
export class F054a_VolumeOfRepresentationPower541 extends TextRecordField {  

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F0600_DivisionOfEuropeanUnification', moduleContext.moduleName)
export class F0600_DivisionOfEuropeanUnification extends Record { 

    @observable private _foreignCompanyBaseData: ForeignCompanyBaseData = null;
    
    @TypeSystem.propertyDecorator(ForeignCompanyBaseData ? ForeignCompanyBaseData : moduleContext.moduleName + '.' + 'ForeignCompanyBaseData')
    public set foreignCompanyBaseData(val: ForeignCompanyBaseData){
        this._foreignCompanyBaseData = val;
    }
    
    public get foreignCompanyBaseData(): ForeignCompanyBaseData{
        return this._foreignCompanyBaseData;
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

@TypeSystem.typeDecorator('F060_DivisionsOfEuropeanUnification', moduleContext.moduleName)
export class F060_DivisionsOfEuropeanUnification extends CompositeField { 

    @observable private _divisionOfEuropeanUnificationList: F0600_DivisionOfEuropeanUnification[] = null;
    
    @TypeSystem.propertyArrayDecorator(F0600_DivisionOfEuropeanUnification ? F0600_DivisionOfEuropeanUnification : moduleContext.moduleName + '.' + 'F0600_DivisionOfEuropeanUnification')
    public set divisionOfEuropeanUnificationList(val: F0600_DivisionOfEuropeanUnification[]){
        this._divisionOfEuropeanUnificationList = val;
    }
    
    public get divisionOfEuropeanUnificationList(): F0600_DivisionOfEuropeanUnification[]{
        return this._divisionOfEuropeanUnificationList;
    }
      

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F070_WayOfEstablishingEuropeanCompany', moduleContext.moduleName)
export class F070_WayOfEstablishingEuropeanCompany extends RecordField { 

    @observable private _fromAcquisition: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set fromAcquisition(val: boolean){
        this._fromAcquisition = val;
    }
    
    public get fromAcquisition(): boolean{
        return this._fromAcquisition;
    }
     

    @observable private _fromMerge: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set fromMerge(val: boolean){
        this._fromMerge = val;
    }
    
    public get fromMerge(): boolean{
        return this._fromMerge;
    }
     

    @observable private _fromHolding: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set fromHolding(val: boolean){
        this._fromHolding = val;
    }
    
    public get fromHolding(): boolean{
        return this._fromHolding;
    }
     

    @observable private _fromSubsidiary: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set fromSubsidiary(val: boolean){
        this._fromSubsidiary = val;
    }
    
    public get fromSubsidiary(): boolean{
        return this._fromSubsidiary;
    }
     

    @observable private _fromConvert: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set fromConvert(val: boolean){
        this._fromConvert = val;
    }
    
    public get fromConvert(): boolean{
        return this._fromConvert;
    }
      

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F070a_WayOfEstablishingEuropeanCooperativeSociety', moduleContext.moduleName)
export class F070a_WayOfEstablishingEuropeanCooperativeSociety extends RecordField { 

    @observable private _throughInitialFormation: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set throughInitialFormation(val: boolean){
        this._throughInitialFormation = val;
    }
    
    public get throughInitialFormation(): boolean{
        return this._throughInitialFormation;
    }
     

    @observable private _throughAcquisitionOrMerge: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set throughAcquisitionOrMerge(val: boolean){
        this._throughAcquisitionOrMerge = val;
    }
    
    public get throughAcquisitionOrMerge(): boolean{
        return this._throughAcquisitionOrMerge;
    }
     

    @observable private _byConvertingCooperativeSocietyIntoEuropeanCooperativeSociety: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set byConvertingCooperativeSocietyIntoEuropeanCooperativeSociety(val: boolean){
        this._byConvertingCooperativeSocietyIntoEuropeanCooperativeSociety = val;
    }
    
    public get byConvertingCooperativeSocietyIntoEuropeanCooperativeSociety(): boolean{
        return this._byConvertingCooperativeSocietyIntoEuropeanCooperativeSociety;
    }
      

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F071_SeatChange', moduleContext.moduleName)
export class F071_SeatChange extends SeatRecordField { 

    @observable private _foreignAuthority: ForeignAuthority = null;
    
    @TypeSystem.propertyDecorator(ForeignAuthority ? ForeignAuthority : moduleContext.moduleName + '.' + 'ForeignAuthority')
    public set foreignAuthority(val: ForeignAuthority){
        this._foreignAuthority = val;
    }
    
    public get foreignAuthority(): ForeignAuthority{
        return this._foreignAuthority;
    }
      

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

   