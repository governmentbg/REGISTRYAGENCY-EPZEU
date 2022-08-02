

// Auto Generated Object
import * as moment from 'moment'
import { observable } from 'mobx'
import { TypeSystem, BaseDataModel } from 'Cnsys.Core'
import { Branch, Person, CompositeField, RecordField, Record, Address } from 'EPZEU.CR.Domain'
import { moduleContext } from '../../ModuleContext'



@TypeSystem.typeDecorator('F600_TransferringTypeOfTradeEnterprise', moduleContext.moduleName)
export class F600_TransferringTypeOfTradeEnterprise extends RecordField { 

    @observable private _fulltransfer: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set fulltransfer(val: boolean){
        this._fulltransfer = val;
    }
    
    public get fulltransfer(): boolean{
        return this._fulltransfer;
    }
     

    @observable private _partialtransfer: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set partialtransfer(val: boolean){
        this._partialtransfer = val;
    }
    
    public get partialtransfer(): boolean{
        return this._partialtransfer;
    }
     

    @observable private _taketransfer: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set taketransfer(val: boolean){
        this._taketransfer = val;
    }
    
    public get taketransfer(): boolean{
        return this._taketransfer;
    }
     

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F601_TransferringEnterprise', moduleContext.moduleName)
export class F601_TransferringEnterprise extends RecordField { 

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

@TypeSystem.typeDecorator('F6020_AcquisitionEnterprise', moduleContext.moduleName)
export class F6020_AcquisitionEnterprise extends Record { 

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

@TypeSystem.typeDecorator('F602_AcquisitionEnterprises', moduleContext.moduleName)
export class F602_AcquisitionEnterprises extends CompositeField { 

    @observable private _acquisitionEnterpriseList: F6020_AcquisitionEnterprise[] = null;
    
    @TypeSystem.propertyArrayDecorator(F6020_AcquisitionEnterprise ? F6020_AcquisitionEnterprise : moduleContext.moduleName + '.' + 'F6020_AcquisitionEnterprise')
    public set acquisitionEnterpriseList(val: F6020_AcquisitionEnterprise[]){
        this._acquisitionEnterpriseList = val;
    }
    
    public get acquisitionEnterpriseList(): F6020_AcquisitionEnterprise[]{
        return this._acquisitionEnterpriseList;
    }
     

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F701_FormOfTransforming701', moduleContext.moduleName)
export class F701_FormOfTransforming701 extends RecordField { 

    @observable private _influx: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set influx(val: boolean){
        this._influx = val;
    }
    
    public get influx(): boolean{
        return this._influx;
    }
     

    @observable private _fusion: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set fusion(val: boolean){
        this._fusion = val;
    }
    
    public get fusion(): boolean{
        return this._fusion;
    }
     

    @observable private _division: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set division(val: boolean){
        this._division = val;
    }
    
    public get division(): boolean{
        return this._division;
    }
     

    @observable private _separation: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set separation(val: boolean){
        this._separation = val;
    }
    
    public get separation(): boolean{
        return this._separation;
    }
     

    @observable private _changeLegalForm: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set changeLegalForm(val: boolean){
        this._changeLegalForm = val;
    }
    
    public get changeLegalForm(): boolean{
        return this._changeLegalForm;
    }
     

    @observable private _transferringProperty: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set transferringProperty(val: boolean){
        this._transferringProperty = val;
    }
    
    public get transferringProperty(): boolean{
        return this._transferringProperty;
    }
     

    @observable private _conversionOfBulgarianEuropeanCompanyIntoBulgarianPLC: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set conversionOfBulgarianEuropeanCompanyIntoBulgarianPLC(val: boolean){
        this._conversionOfBulgarianEuropeanCompanyIntoBulgarianPLC = val;
    }
    
    public get conversionOfBulgarianEuropeanCompanyIntoBulgarianPLC(): boolean{
        return this._conversionOfBulgarianEuropeanCompanyIntoBulgarianPLC;
    }
     

    @observable private _conversionOfBulgarianPLCIntoBulgarianEuropeanCompany: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set conversionOfBulgarianPLCIntoBulgarianEuropeanCompany(val: boolean){
        this._conversionOfBulgarianPLCIntoBulgarianEuropeanCompany = val;
    }
    
    public get conversionOfBulgarianPLCIntoBulgarianEuropeanCompany(): boolean{
        return this._conversionOfBulgarianPLCIntoBulgarianEuropeanCompany;
    }
     

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F7020_TransformingCompany', moduleContext.moduleName)
export class F7020_TransformingCompany extends Record { 

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

@TypeSystem.typeDecorator('F702_TransformingCompanys', moduleContext.moduleName)
export class F702_TransformingCompanys extends CompositeField { 

    @observable private _transformingCompanyList: F7020_TransformingCompany[] = null;
    
    @TypeSystem.propertyArrayDecorator(F7020_TransformingCompany ? F7020_TransformingCompany : moduleContext.moduleName + '.' + 'F7020_TransformingCompany')
    public set transformingCompanyList(val: F7020_TransformingCompany[]){
        this._transformingCompanyList = val;
    }
    
    public get transformingCompanyList(): F7020_TransformingCompany[]{
        return this._transformingCompanyList;
    }
     

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F702a0_TransformingCompany2', moduleContext.moduleName)
export class F702a0_TransformingCompany2 extends Record { 

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

@TypeSystem.typeDecorator('F702a_TransformingCompanys2', moduleContext.moduleName)
export class F702a_TransformingCompanys2 extends CompositeField { 

    @observable private _transformingCompany2List: F702a0_TransformingCompany2[] = null;
    
    @TypeSystem.propertyArrayDecorator(F702a0_TransformingCompany2 ? F702a0_TransformingCompany2 : moduleContext.moduleName + '.' + 'F702a0_TransformingCompany2')
    public set transformingCompany2List(val: F702a0_TransformingCompany2[]){
        this._transformingCompany2List = val;
    }
    
    public get transformingCompany2List(): F702a0_TransformingCompany2[]{
        return this._transformingCompany2List;
    }
     

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F702b0_TransformingNPO', moduleContext.moduleName)
export class F702b0_TransformingNPO extends Record { 

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

@TypeSystem.typeDecorator('F702b_TransformingNPOs', moduleContext.moduleName)
export class F702b_TransformingNPOs extends CompositeField { 

    @observable private _transformingNPOList: F702b0_TransformingNPO[] = null;
    
    @TypeSystem.propertyArrayDecorator(F702b0_TransformingNPO ? F702b0_TransformingNPO : moduleContext.moduleName + '.' + 'F702b0_TransformingNPO')
    public set transformingNPOList(val: F702b0_TransformingNPO[]){
        this._transformingNPOList = val;
    }
    
    public get transformingNPOList(): F702b0_TransformingNPO[]{
        return this._transformingNPOList;
    }
     

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F7030_Successor', moduleContext.moduleName)
export class F7030_Successor extends Record { 

    @observable private _subject: Person = null;
    
    @TypeSystem.propertyDecorator(Person ? Person : moduleContext.moduleName + '.' + 'Person')
    public set subject(val: Person){
        this._subject = val;
    }
    
    public get subject(): Person{
        return this._subject;
    }
     

    @observable private _legalForm: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set legalForm(val: string){
        this._legalForm = val;
    }
    
    public get legalForm(): string{
        return this._legalForm;
    }
     

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F703_Successors', moduleContext.moduleName)
export class F703_Successors extends CompositeField { 

    @observable private _successorList: F7030_Successor[] = null;
    
    @TypeSystem.propertyArrayDecorator(F7030_Successor ? F7030_Successor : moduleContext.moduleName + '.' + 'F7030_Successor')
    public set successorList(val: F7030_Successor[]){
        this._successorList = val;
    }
    
    public get successorList(): F7030_Successor[]{
        return this._successorList;
    }
     

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F7040_Branch704Subject', moduleContext.moduleName)
export class F7040_Branch704Subject extends Record { 

    @observable private _branchSubject: Person = null;
    
    @TypeSystem.propertyDecorator(Person ? Person : moduleContext.moduleName + '.' + 'Person')
    public set branchSubject(val: Person){
        this._branchSubject = val;
    }
    
    public get branchSubject(): Person{
        return this._branchSubject;
    }
     

    @observable private _branches: Branch[] = null;
    
    @TypeSystem.propertyArrayDecorator(Branch ? Branch : moduleContext.moduleName + '.' + 'Branch')
    public set branches(val: Branch[]){
        this._branches = val;
    }
    
    public get branches(): Branch[]{
        return this._branches;
    }
     

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F704_Branches704', moduleContext.moduleName)
export class F704_Branches704 extends CompositeField { 

    @observable private _branchList: F7040_Branch704Subject[] = null;
    
    @TypeSystem.propertyArrayDecorator(F7040_Branch704Subject ? F7040_Branch704Subject : moduleContext.moduleName + '.' + 'F7040_Branch704Subject')
    public set branchList(val: F7040_Branch704Subject[]){
        this._branchList = val;
    }
    
    public get branchList(): F7040_Branch704Subject[]{
        return this._branchList;
    }
     

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F705_StoppingEntry', moduleContext.moduleName)
export class F705_StoppingEntry extends RecordField { 

    @observable private _incomingNumber: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set incomingNumber(val: string){
        this._incomingNumber = val;
    }
    
    public get incomingNumber(): string{
        return this._incomingNumber;
    }
     

    @observable private _judicialCode: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set judicialCode(val: string){
        this._judicialCode = val;
    }
    
    public get judicialCode(): string{
        return this._judicialCode;
    }
     

    @observable private _appType: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set appType(val: string){
        this._appType = val;
    }
    
    public get appType(): string{
        return this._appType;
    }
     

    @observable private _transformingCompanies: string[] = null;
    
    @TypeSystem.propertyArrayDecorator('string')
    public set transformingCompanies(val: string[]){
        this._transformingCompanies = val;
    }
    
    public get transformingCompanies(): string[]{
        return this._transformingCompanies;
    }
     

    @observable private _successors: string[] = null;
    
    @TypeSystem.propertyArrayDecorator('string')
    public set successors(val: string[]){
        this._successors = val;
    }
    
    public get successors(): string[]{
        return this._successors;
    }
     

    @observable private _hasTransformation: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set hasTransformation(val: boolean){
        this._hasTransformation = val;
    }
    
    public get hasTransformation(): boolean{
        return this._hasTransformation;
    }
     

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F706_NumberApplication', moduleContext.moduleName)
export class F706_NumberApplication extends RecordField { 

    @observable private _incomingNumber: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set incomingNumber(val: string){
        this._incomingNumber = val;
    }
    
    public get incomingNumber(): string{
        return this._incomingNumber;
    }
     
    
    @observable private _date: moment.Moment = null;
    
    @TypeSystem.propertyDecorator('moment')
    public set date(val: moment.Moment){
        this._date = val;
    }
    
    public get date(): moment.Moment{
        return this._date;
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

@TypeSystem.typeDecorator('F801_FormOfTransforming801', moduleContext.moduleName)
export class F801_FormOfTransforming801 extends RecordField { 

    @observable private _influx: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set influx(val: boolean){
        this._influx = val;
    }
    
    public get influx(): boolean{
        return this._influx;
    }
     

    @observable private _fusion: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set fusion(val: boolean){
        this._fusion = val;
    }
    
    public get fusion(): boolean{
        return this._fusion;
    }
     

    @observable private _division: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set division(val: boolean){
        this._division = val;
    }
    
    public get division(): boolean{
        return this._division;
    }
     

    @observable private _separation: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set separation(val: boolean){
        this._separation = val;
    }
    
    public get separation(): boolean{
        return this._separation;
    }
     

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F801a_FormOfTransforming801a', moduleContext.moduleName)
export class F801a_FormOfTransforming801a extends RecordField { 

    @observable private _influx801a: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set influx801a(val: boolean){
        this._influx801a = val;
    }
    
    public get influx801a(): boolean{
        return this._influx801a;
    }
     

    @observable private _fusion801a: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set fusion801a(val: boolean){
        this._fusion801a = val;
    }
    
    public get fusion801a(): boolean{
        return this._fusion801a;
    }
     

    @observable private _conversionToCoop: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set conversionToCoop(val: boolean){
        this._conversionToCoop = val;
    }
    
    public get conversionToCoop(): boolean{
        return this._conversionToCoop;
    }
     

    @observable private _conversionToEUCoop: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set conversionToEUCoop(val: boolean){
        this._conversionToEUCoop = val;
    }
    
    public get conversionToEUCoop(): boolean{
        return this._conversionToEUCoop;
    }
     

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F8020_CoOperative', moduleContext.moduleName)
export class F8020_CoOperative extends Record { 

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

@TypeSystem.typeDecorator('F802_ReorganizeCoOperatives', moduleContext.moduleName)
export class F802_ReorganizeCoOperatives extends CompositeField { 

    @observable private _coOperativeList: F8020_CoOperative[] = null;
    
    @TypeSystem.propertyArrayDecorator(F8020_CoOperative ? F8020_CoOperative : moduleContext.moduleName + '.' + 'F8020_CoOperative')
    public set coOperativeList(val: F8020_CoOperative[]){
        this._coOperativeList = val;
    }
    
    public get coOperativeList(): F8020_CoOperative[]{
        return this._coOperativeList;
    }
     

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F802a0_CoOperative2', moduleContext.moduleName)
export class F802a0_CoOperative2 extends Record { 

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

@TypeSystem.typeDecorator('F802a_ReorganizeCoOperatives2', moduleContext.moduleName)
export class F802a_ReorganizeCoOperatives2 extends CompositeField { 

    @observable private _coOperative2List: F802a0_CoOperative2[] = null;
    
    @TypeSystem.propertyArrayDecorator(F802a0_CoOperative2 ? F802a0_CoOperative2 : moduleContext.moduleName + '.' + 'F802a0_CoOperative2')
    public set coOperative2List(val: F802a0_CoOperative2[]){
        this._coOperative2List = val;
    }
    
    public get coOperative2List(): F802a0_CoOperative2[]{
        return this._coOperative2List;
    }
     

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F8030_Successor803', moduleContext.moduleName)
export class F8030_Successor803 extends Record { 

    @observable private _legalForm: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set legalForm(val: string){
        this._legalForm = val;
    }
    
    public get legalForm(): string{
        return this._legalForm;
    }
     

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

@TypeSystem.typeDecorator('F803_Successors803', moduleContext.moduleName)
export class F803_Successors803 extends CompositeField { 

    @observable private _successorList: F8030_Successor803[] = null;
    
    @TypeSystem.propertyArrayDecorator(F8030_Successor803 ? F8030_Successor803 : moduleContext.moduleName + '.' + 'F8030_Successor803')
    public set successorList(val: F8030_Successor803[]){
        this._successorList = val;
    }
    
    public get successorList(): F8030_Successor803[]{
        return this._successorList;
    }
     

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F8040_ReorgBranch', moduleContext.moduleName)
export class F8040_ReorgBranch extends Record { 

    @observable private _branchSubject: Person = null;
    
    @TypeSystem.propertyDecorator(Person ? Person : moduleContext.moduleName + '.' + 'Person')
    public set branchSubject(val: Person){
        this._branchSubject = val;
    }
    
    public get branchSubject(): Person{
        return this._branchSubject;
    }
     

    @observable private _branches: Branch[] = null;
    
    @TypeSystem.propertyArrayDecorator(Branch ? Branch : moduleContext.moduleName + '.' + 'Branch')
    public set branches(val: Branch[]){
        this._branches = val;
    }
    
    public get branches(): Branch[]{
        return this._branches;
    }
     

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F804_ReorgBranches', moduleContext.moduleName)
export class F804_ReorgBranches extends CompositeField { 

    @observable private _branchList: F8040_ReorgBranch[] = null;
    
    @TypeSystem.propertyArrayDecorator(F8040_ReorgBranch ? F8040_ReorgBranch : moduleContext.moduleName + '.' + 'F8040_ReorgBranch')
    public set branchList(val: F8040_ReorgBranch[]){
        this._branchList = val;
    }
    
    public get branchList(): F8040_ReorgBranch[]{
        return this._branchList;
    }
     

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}









