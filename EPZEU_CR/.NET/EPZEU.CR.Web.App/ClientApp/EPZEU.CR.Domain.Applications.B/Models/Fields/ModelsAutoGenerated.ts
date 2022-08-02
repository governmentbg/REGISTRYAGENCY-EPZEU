

// Auto Generated Object
import * as moment from 'moment'
import { observable } from 'mobx'
import { TypeSystem, BaseDataModel } from 'Cnsys.Core'
import {  CompositeField, Record, RecordField, TextRecordField, Person, Address, Passport, SeatRecordField, ActivityNKIDField, Price, MannerRecordHolder, Contacts } from 'EPZEU.CR.Domain'
import { moduleContext } from '../../ModuleContext'


 
@TypeSystem.typeDecorator('F001b_NumberNationalRegister1b', moduleContext.moduleName)
export class F001b_NumberNationalRegister1b extends TextRecordField { 

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F0410_Procurator', moduleContext.moduleName)
export class F0410_Procurator extends Record { 

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
     

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F041_Procurators', moduleContext.moduleName)
export class F041_Procurators extends CompositeField { 

    @observable private _procuratorsList: F0410_Procurator[] = null;
    
    @TypeSystem.propertyArrayDecorator(F0410_Procurator ? F0410_Procurator : moduleContext.moduleName + '.' + 'F0410_Procurator')
    public set procuratorsList(val: F0410_Procurator[]){
        this._procuratorsList = val;
    }
    
    public get procuratorsList(): F0410_Procurator[]{
        return this._procuratorsList;
    }
     

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F0420_SpecialPower', moduleContext.moduleName)
export class F0420_SpecialPower extends Record { 

    @observable private _procuratorName: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set procuratorName(val: string){
        this._procuratorName = val;
    }
    
    public get procuratorName(): string{
        return this._procuratorName;
    }
     

    @observable private _rightToAlienate: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set rightToAlienate(val: boolean){
        this._rightToAlienate = val;
    }
    
    public get rightToAlienate(): boolean{
        return this._rightToAlienate;
    }
     

    @observable private _rightToBurden: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set rightToBurden(val: boolean){
        this._rightToBurden = val;
    }
    
    public get rightToBurden(): boolean{
        return this._rightToBurden;
    }
     

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F042_SepcialPowers', moduleContext.moduleName)
export class F042_SepcialPowers extends CompositeField { 

    @observable private _sepcialPowersList: F0420_SpecialPower[] = null;
    
    @TypeSystem.propertyArrayDecorator(F0420_SpecialPower ? F0420_SpecialPower : moduleContext.moduleName + '.' + 'F0420_SpecialPower')
    public set sepcialPowersList(val: F0420_SpecialPower[]){
        this._sepcialPowersList = val;
    }
    
    public get sepcialPowersList(): F0420_SpecialPower[]{
        return this._sepcialPowersList;
    }
     

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F043_WayOfRepresentation43', moduleContext.moduleName)
export class F043_WayOfRepresentation43 extends MannerRecordHolder { 

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F044_EraseProcura', moduleContext.moduleName)
export class F044_EraseProcura extends RecordField { 

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
 
@TypeSystem.typeDecorator('F051_BranchSeat', moduleContext.moduleName)
export class F051_BranchSeat extends SeatRecordField { 

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F051a_BranchFirm', moduleContext.moduleName)
export class F051a_BranchFirm extends TextRecordField { 

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F051b_BranchIdentifier', moduleContext.moduleName)
export class F051b_BranchIdentifier extends TextRecordField { 

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F052_BranchSubjectOfActivity', moduleContext.moduleName)
export class F052_BranchSubjectOfActivity extends TextRecordField { 

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F052a_MainActivityNKID', moduleContext.moduleName)
export class F052a_MainActivityNKID extends ActivityNKIDField { 

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F053_BranchManagers', moduleContext.moduleName)
export class F053_BranchManagers extends CompositeField { 

    @observable private _managersList: F0530_BranchManager[] = null;
    
    @TypeSystem.propertyArrayDecorator(F0530_BranchManager ? F0530_BranchManager : moduleContext.moduleName + '.' + 'F0530_BranchManager')
    public set managersList(val: F0530_BranchManager[]){
        this._managersList = val;
    }
    
    public get managersList(): F0530_BranchManager[]{
        return this._managersList;
    }
     

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F0530_BranchManager', moduleContext.moduleName)
export class F0530_BranchManager extends Record { 

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
     

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F054_VolumeOfRepresentationPower', moduleContext.moduleName)
export class F054_VolumeOfRepresentationPower extends TextRecordField { 

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F055_BranchClosure', moduleContext.moduleName)
export class F055_BranchClosure extends RecordField { 

    @observable private _company: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set company(val: string){
        this._company = val;
    }
    
    public get company(): string{
        return this._company;
    }
     

    @observable private _seat: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set seat(val: string){
        this._seat = val;
    }
    
    public get seat(): string{
        return this._seat;
    }
     

    @observable private _subUIC: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set subUIC(val: string){
        this._subUIC = val;
    }
    
    public get subUIC(): string{
        return this._subUIC;
    }
     

    @observable private _closed: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set closed(val: boolean){
        this._closed = val;
    }
    
    public get closed(): boolean{
        return this._closed;
    }
     

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F200_PledgeDDIdentifier', moduleContext.moduleName)
export class F200_PledgeDDIdentifier extends TextRecordField { 

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F2010_Pledgor', moduleContext.moduleName)
export class F2010_Pledgor extends Record { 

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
 
@TypeSystem.typeDecorator('F201_Pledgors', moduleContext.moduleName)
export class F201_Pledgors extends CompositeField { 

    @observable private _pledgorList: F2010_Pledgor[] = null;
    
    @TypeSystem.propertyArrayDecorator(F2010_Pledgor ? F2010_Pledgor : moduleContext.moduleName + '.' + 'F2010_Pledgor')
    public set pledgorList(val: F2010_Pledgor[]){
        this._pledgorList = val;
    }
    
    public get pledgorList(): F2010_Pledgor[]{
        return this._pledgorList;
    }
     

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F2030_SecuredClaimDebtor', moduleContext.moduleName)
export class F2030_SecuredClaimDebtor extends Record { 

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
 
@TypeSystem.typeDecorator('F203_SecuredClaimDebtors', moduleContext.moduleName)
export class F203_SecuredClaimDebtors extends CompositeField { 

    @observable private _securedClaimDebtorList: F2030_SecuredClaimDebtor[] = null;
    
    @TypeSystem.propertyArrayDecorator(F2030_SecuredClaimDebtor ? F2030_SecuredClaimDebtor : moduleContext.moduleName + '.' + 'F2030_SecuredClaimDebtor')
    public set securedClaimDebtorList(val: F2030_SecuredClaimDebtor[]){
        this._securedClaimDebtorList = val;
    }
    
    public get securedClaimDebtorList(): F2030_SecuredClaimDebtor[]{
        return this._securedClaimDebtorList;
    }
     

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F2050_PledgeCreditor', moduleContext.moduleName)
export class F2050_PledgeCreditor extends Record { 

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
 
@TypeSystem.typeDecorator('F205_PledgeCreditors', moduleContext.moduleName)
export class F205_PledgeCreditors extends CompositeField { 

    @observable private _pledgeCreditorsList: F2050_PledgeCreditor[] = null;
    
    @TypeSystem.propertyArrayDecorator(F2050_PledgeCreditor ? F2050_PledgeCreditor : moduleContext.moduleName + '.' + 'F2050_PledgeCreditor')
    public set pledgeCreditorsList(val: F2050_PledgeCreditor[]){
        this._pledgeCreditorsList = val;
    }
    
    public get pledgeCreditorsList(): F2050_PledgeCreditor[]{
        return this._pledgeCreditorsList;
    }
     

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F207_SecuredClaimReason', moduleContext.moduleName)
export class F207_SecuredClaimReason extends RecordField { 

    @observable private _contract: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set contract(val: boolean){
        this._contract = val;
    }
    
    public get contract(): boolean{
        return this._contract;
    }
     

    @observable private _courtOrder: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set courtOrder(val: boolean){
        this._courtOrder = val;
    }
    
    public get courtOrder(): boolean{
        return this._courtOrder;
    }
     

    @observable private _administrativeAct: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set administrativeAct(val: boolean){
        this._administrativeAct = val;
    }
    
    public get administrativeAct(): boolean{
        return this._administrativeAct;
    }
     

    @observable private _otherSource: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set otherSource(val: boolean){
        this._otherSource = val;
    }
    
    public get otherSource(): boolean{
        return this._otherSource;
    }
     
    
    @observable private _date: moment.Moment = null;
    
    @TypeSystem.propertyDecorator('moment')
    public set date(val: moment.Moment){
        this._date = val;
    }
    
    public get date(): moment.Moment{
        return this._date;
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
 
@TypeSystem.typeDecorator('F207a_ContractOfPledgeForShare', moduleContext.moduleName)
export class F207a_ContractOfPledgeForShare extends TextRecordField { 
    
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
 
@TypeSystem.typeDecorator('F208_SecuredClaimSubject', moduleContext.moduleName)
export class F208_SecuredClaimSubject extends RecordField { 

    @observable private _givingMoney: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set givingMoney(val: boolean){
        this._givingMoney = val;
    }
    
    public get givingMoney(): boolean{
        return this._givingMoney;
    }
     

    @observable private _givingThing: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set givingThing(val: boolean){
        this._givingThing = val;
    }
    
    public get givingThing(): boolean{
        return this._givingThing;
    }
     

    @observable private _doingActions: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set doingActions(val: boolean){
        this._doingActions = val;
    }
    
    public get doingActions(): boolean{
        return this._doingActions;
    }
     

    @observable private _notDoingActions: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set notDoingActions(val: boolean){
        this._notDoingActions = val;
    }
    
    public get notDoingActions(): boolean{
        return this._notDoingActions;
    }
     

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F209_SecuredClaimAmount', moduleContext.moduleName)
export class F209_SecuredClaimAmount extends RecordField { 

    @observable private _amountDue: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set amountDue(val: string){
        this._amountDue = val;
    }
    
    public get amountDue(): string{
        return this._amountDue;
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
 
@TypeSystem.typeDecorator('F210_SecuredClaimInterests', moduleContext.moduleName)
export class F210_SecuredClaimInterests extends TextRecordField { 

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F211_SecuredClaimDelayInterests', moduleContext.moduleName)
export class F211_SecuredClaimDelayInterests extends TextRecordField { 

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F212_PledgeMoney', moduleContext.moduleName)
export class F212_PledgeMoney extends RecordField { 

    @observable private _price: Price = null;
    
    @TypeSystem.propertyDecorator(Price ? Price : moduleContext.moduleName + '.' + 'Price')
    public set price(val: Price){
        this._price = val;
    }
    
    public get price(): Price{
        return this._price;
    }
     

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F213_PledgePropertyDescription', moduleContext.moduleName)
export class F213_PledgePropertyDescription extends RecordField { 

    @observable private _corporateShare: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set corporateShare(val: boolean){
        this._corporateShare = val;
    }
    
    public get corporateShare(): boolean{
        return this._corporateShare;
    }
     

    @observable private _partOfCorporateShare: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set partOfCorporateShare(val: boolean){
        this._partOfCorporateShare = val;
    }
    
    public get partOfCorporateShare(): boolean{
        return this._partOfCorporateShare;
    }
     

    @observable private _sharesCount: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set sharesCount(val: string){
        this._sharesCount = val;
    }
    
    public get sharesCount(): string{
        return this._sharesCount;
    }
     

    @observable private _nominal: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set nominal(val: string){
        this._nominal = val;
    }
    
    public get nominal(): string{
        return this._nominal;
    }
     

    @observable private _capital: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set capital(val: string){
        this._capital = val;
    }
    
    public get capital(): string{
        return this._capital;
    }
     

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F214_PledgePropertyPrice', moduleContext.moduleName)
export class F214_PledgePropertyPrice extends RecordField { 

    @observable private _price: Price = null;
    
    @TypeSystem.propertyDecorator(Price ? Price : moduleContext.moduleName + '.' + 'Price')
    public set price(val: Price){
        this._price = val;
    }
    
    public get price(): Price{
        return this._price;
    }
     

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F215_ModalityDate', moduleContext.moduleName)
export class F215_ModalityDate extends TextRecordField { 
    
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
 
@TypeSystem.typeDecorator('F216_ModalityCondition', moduleContext.moduleName)
export class F216_ModalityCondition extends TextRecordField { 

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F216a_PledgedCreditorAgreement', moduleContext.moduleName)
export class F216a_PledgedCreditorAgreement extends RecordField { 

    @observable private _article_8_Para_3_Of_SPA: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set article_8_Para_3_Of_SPA(val: boolean){
        this._article_8_Para_3_Of_SPA = val;
    }
    
    public get article_8_Para_3_Of_SPA(): boolean{
        return this._article_8_Para_3_Of_SPA;
    }
     

    @observable private _article_32_Para_5_Of_SPA: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set article_32_Para_5_Of_SPA(val: boolean){
        this._article_32_Para_5_Of_SPA = val;
    }
    
    public get article_32_Para_5_Of_SPA(): boolean{
        return this._article_32_Para_5_Of_SPA;
    }
     

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F217_PledgeExecutionClaim', moduleContext.moduleName)
export class F217_PledgeExecutionClaim extends TextRecordField { 

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F21800_Partner218Part', moduleContext.moduleName)
export class F21800_Partner218Part extends Record { 

    @observable private _count: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set count(val: string){
        this._count = val;
    }
    
    public get count(): string{
        return this._count;
    }
     

    @observable private _value: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set value(val: string){
        this._value = val;
    }
    
    public get value(): string{
        return this._value;
    }
     

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F2180_Partner218', moduleContext.moduleName)
export class F2180_Partner218 extends Record { 

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
 
@TypeSystem.typeDecorator('F218_Partners218', moduleContext.moduleName)
export class F218_Partners218 extends CompositeField { 

    @observable private _partner218Part: F21800_Partner218Part = null;
    
    @TypeSystem.propertyDecorator(F21800_Partner218Part ? F21800_Partner218Part : moduleContext.moduleName + '.' + 'F21800_Partner218Part')
    public set partner218Part(val: F21800_Partner218Part){
        this._partner218Part = val;
    }
    
    public get partner218Part(): F21800_Partner218Part{
        return this._partner218Part;
    }
     

    @observable private _partner218List: F2180_Partner218[] = null;
    
    @TypeSystem.propertyArrayDecorator(F2180_Partner218 ? F2180_Partner218 : moduleContext.moduleName + '.' + 'F2180_Partner218')
    public set partner218List(val: F2180_Partner218[]){
        this._partner218List = val;
    }
    
    public get partner218List(): F2180_Partner218[]{
        return this._partner218List;
    }
     

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F219_PledgeExecutionDepozitar', moduleContext.moduleName)
export class F219_PledgeExecutionDepozitar extends RecordField { 

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
     

    @observable private _bic: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set bic(val: string){
        this._bic = val;
    }
    
    public get bic(): string{
        return this._bic;
    }
     

    @observable private _iban: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set iban(val: string){
        this._iban = val;
    }
    
    public get iban(): string{
        return this._iban;
    }
     

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('DepozitarDistraintData', moduleContext.moduleName)
export class DepozitarDistraintData extends Record { 

    @observable private _reasonCourt: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set reasonCourt(val: boolean){
        this._reasonCourt = val;
    }
    
    public get reasonCourt(): boolean{
        return this._reasonCourt;
    }
     

    @observable private _reasonCourtExecuter: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set reasonCourtExecuter(val: boolean){
        this._reasonCourtExecuter = val;
    }
    
    public get reasonCourtExecuter(): boolean{
        return this._reasonCourtExecuter;
    }
     

    @observable private _reasonADV: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set reasonADV(val: boolean){
        this._reasonADV = val;
    }
    
    public get reasonADV(): boolean{
        return this._reasonADV;
    }
     

    @observable private _incomingDistraint: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set incomingDistraint(val: boolean){
        this._incomingDistraint = val;
    }
    
    public get incomingDistraint(): boolean{
        return this._incomingDistraint;
    }
     

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
     

    @observable private _court: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set court(val: string){
        this._court = val;
    }
    
    public get court(): string{
        return this._court;
    }
     

    @observable private _caseNo: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set caseNo(val: string){
        this._caseNo = val;
    }
    
    public get caseNo(): string{
        return this._caseNo;
    }
     

    @observable private _partValue: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set partValue(val: string){
        this._partValue = val;
    }
    
    public get partValue(): string{
        return this._partValue;
    }
     

    @observable private _partCount: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set partCount(val: string){
        this._partCount = val;
    }
    
    public get partCount(): string{
        return this._partCount;
    }
     

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F2200_DepozitarDistraintDetails', moduleContext.moduleName)
export class F2200_DepozitarDistraintDetails extends DepozitarDistraintData { 

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F22001_DepozitarDistraint', moduleContext.moduleName)
export class F22001_DepozitarDistraint extends Record { 

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
 
@TypeSystem.typeDecorator('F22002_DepozitarReminderDistraint', moduleContext.moduleName)
export class F22002_DepozitarReminderDistraint extends Record { 

    @observable private _reminderDistraint: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set reminderDistraint(val: boolean){
        this._reminderDistraint = val;
    }
    
    public get reminderDistraint(): boolean{
        return this._reminderDistraint;
    }
     

    @observable private _value: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set value(val: string){
        this._value = val;
    }
    
    public get value(): string{
        return this._value;
    }
     

    @observable private _currency: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set currency(val: string){
        this._currency = val;
    }
    
    public get currency(): string{
        return this._currency;
    }
     

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F220_Depozitar', moduleContext.moduleName)
export class F220_Depozitar extends CompositeField { 

    @observable private _depozitarDistraintDetails: F2200_DepozitarDistraintDetails = null;
    
    @TypeSystem.propertyDecorator(F2200_DepozitarDistraintDetails ? F2200_DepozitarDistraintDetails : moduleContext.moduleName + '.' + 'F2200_DepozitarDistraintDetails')
    public set depozitarDistraintDetails(val: F2200_DepozitarDistraintDetails){
        this._depozitarDistraintDetails = val;
    }
    
    public get depozitarDistraintDetails(): F2200_DepozitarDistraintDetails{
        return this._depozitarDistraintDetails;
    }
     

    @observable private _depozitarReminderDistraint: F22002_DepozitarReminderDistraint = null;
    
    @TypeSystem.propertyDecorator(F22002_DepozitarReminderDistraint ? F22002_DepozitarReminderDistraint : moduleContext.moduleName + '.' + 'F22002_DepozitarReminderDistraint')
    public set depozitarReminderDistraint(val: F22002_DepozitarReminderDistraint){
        this._depozitarReminderDistraint = val;
    }
    
    public get depozitarReminderDistraint(): F22002_DepozitarReminderDistraint{
        return this._depozitarReminderDistraint;
    }
     

    @observable private _depozitarDistraintList: F22001_DepozitarDistraint[] = null;
    
    @TypeSystem.propertyArrayDecorator(F22001_DepozitarDistraint ? F22001_DepozitarDistraint : moduleContext.moduleName + '.' + 'F22001_DepozitarDistraint')
    public set depozitarDistraintList(val: F22001_DepozitarDistraint[]){
        this._depozitarDistraintList = val;
    }
    
    public get depozitarDistraintList(): F22001_DepozitarDistraint[]{
        return this._depozitarDistraintList;
    }
     

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F221_DepozitarDistraintRemove', moduleContext.moduleName)
export class F221_DepozitarDistraintRemove extends RecordField { 

    @observable private _court: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set court(val: string){
        this._court = val;
    }
    
    public get court(): string{
        return this._court;
    }
     

    @observable private _caseNo: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set caseNo(val: string){
        this._caseNo = val;
    }
    
    public get caseNo(): string{
        return this._caseNo;
    }
     

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F222_StopOfExecutionSize', moduleContext.moduleName)
export class F222_StopOfExecutionSize extends RecordField { 

    @observable private _price: Price = null;
    
    @TypeSystem.propertyDecorator(Price ? Price : moduleContext.moduleName + '.' + 'Price')
    public set price(val: Price){
        this._price = val;
    }
    
    public get price(): Price{
        return this._price;
    }
     

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F223_StopOfExecutionProperty', moduleContext.moduleName)
export class F223_StopOfExecutionProperty extends TextRecordField { 

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F2231_EntryIntoPledgeCreditorRight', moduleContext.moduleName)
export class F2231_EntryIntoPledgeCreditorRight extends Record { 

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
 
@TypeSystem.typeDecorator('F223a_EntryIntoPledgeCreditorRights', moduleContext.moduleName)
export class F223a_EntryIntoPledgeCreditorRights extends CompositeField { 

    @observable private _entryIntoPledgeCreditorRightList: F2231_EntryIntoPledgeCreditorRight[] = null;
    
    @TypeSystem.propertyArrayDecorator(F2231_EntryIntoPledgeCreditorRight ? F2231_EntryIntoPledgeCreditorRight : moduleContext.moduleName + '.' + 'F2231_EntryIntoPledgeCreditorRight')
    public set entryIntoPledgeCreditorRightList(val: F2231_EntryIntoPledgeCreditorRight[]){
        this._entryIntoPledgeCreditorRightList = val;
    }
    
    public get entryIntoPledgeCreditorRightList(): F2231_EntryIntoPledgeCreditorRight[]{
        return this._entryIntoPledgeCreditorRightList;
    }
     

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F224_PledgeRenewDate', moduleContext.moduleName)
export class F224_PledgeRenewDate extends TextRecordField { 
    
    @observable private _date: moment.Moment = null;
    
    @TypeSystem.propertyDecorator('moment')
    public set date(val: moment.Moment){
        this._date = val;
    }
    
    public get date(): moment.Moment{
        return this._date;
    } 

    @observable private _processingRenewDistraintRequired: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set processingRenewDistraintRequired(val: boolean){
        this._processingRenewDistraintRequired = val;
    }
    
    public get processingRenewDistraintRequired(): boolean{
        return this._processingRenewDistraintRequired;
    }
     

    @observable private _renewDistraintText: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set renewDistraintText(val: string){
        this._renewDistraintText = val;
    }
    
    public get renewDistraintText(): string{
        return this._renewDistraintText;
    }
     

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F225_PledgeAddemption', moduleContext.moduleName)
export class F225_PledgeAddemption extends RecordField { 

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
 
@TypeSystem.typeDecorator('F300_ForfeitCompanyIdentifier', moduleContext.moduleName)
export class F300_ForfeitCompanyIdentifier extends TextRecordField { 

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F3010_DebtorOverSecureClaim', moduleContext.moduleName)
export class F3010_DebtorOverSecureClaim extends Record { 

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
 
@TypeSystem.typeDecorator('F301_DebtorOverSecureClaims', moduleContext.moduleName)
export class F301_DebtorOverSecureClaims extends CompositeField { 

    @observable private _debtorOverSecureClaimList: F3010_DebtorOverSecureClaim[] = null;
    
    @TypeSystem.propertyArrayDecorator(F3010_DebtorOverSecureClaim ? F3010_DebtorOverSecureClaim : moduleContext.moduleName + '.' + 'F3010_DebtorOverSecureClaim')
    public set debtorOverSecureClaimList(val: F3010_DebtorOverSecureClaim[]){
        this._debtorOverSecureClaimList = val;
    }
    
    public get debtorOverSecureClaimList(): F3010_DebtorOverSecureClaim[]{
        return this._debtorOverSecureClaimList;
    }
     

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F3030_AtPawnCreditor', moduleContext.moduleName)
export class F3030_AtPawnCreditor extends Record { 

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
 
@TypeSystem.typeDecorator('F303_AtPawnCreditors', moduleContext.moduleName)
export class F303_AtPawnCreditors extends CompositeField { 

    @observable private _atPawnCreditorsList: F3030_AtPawnCreditor[] = null;
    
    @TypeSystem.propertyArrayDecorator(F3030_AtPawnCreditor ? F3030_AtPawnCreditor : moduleContext.moduleName + '.' + 'F3030_AtPawnCreditor')
    public set atPawnCreditorsList(val: F3030_AtPawnCreditor[]){
        this._atPawnCreditorsList = val;
    }
    
    public get atPawnCreditorsList(): F3030_AtPawnCreditor[]{
        return this._atPawnCreditorsList;
    }
     

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F305_Reason', moduleContext.moduleName)
export class F305_Reason extends RecordField { 

    @observable private _text: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set text(val: string){
        this._text = val;
    }
    
    public get text(): string{
        return this._text;
    }
     

    @observable private _contract: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set contract(val: boolean){
        this._contract = val;
    }
    
    public get contract(): boolean{
        return this._contract;
    }
     

    @observable private _courtOrder: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set courtOrder(val: boolean){
        this._courtOrder = val;
    }
    
    public get courtOrder(): boolean{
        return this._courtOrder;
    }
     

    @observable private _administrativAct: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set administrativAct(val: boolean){
        this._administrativAct = val;
    }
    
    public get administrativAct(): boolean{
        return this._administrativAct;
    }
     

    @observable private _otherSource: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set otherSource(val: boolean){
        this._otherSource = val;
    }
    
    public get otherSource(): boolean{
        return this._otherSource;
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
 
@TypeSystem.typeDecorator('F305a_PledgeContractForTrader', moduleContext.moduleName)
export class F305a_PledgeContractForTrader extends TextRecordField { 
    
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
 
@TypeSystem.typeDecorator('F306_Object306', moduleContext.moduleName)
export class F306_Object306 extends RecordField { 

    @observable private _forGivingAmount: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set forGivingAmount(val: boolean){
        this._forGivingAmount = val;
    }
    
    public get forGivingAmount(): boolean{
        return this._forGivingAmount;
    }
     

    @observable private _forGive: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set forGive(val: boolean){
        this._forGive = val;
    }
    
    public get forGive(): boolean{
        return this._forGive;
    }
     

    @observable private _forDoingActivity: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set forDoingActivity(val: boolean){
        this._forDoingActivity = val;
    }
    
    public get forDoingActivity(): boolean{
        return this._forDoingActivity;
    }
     

    @observable private _forNotDoingActivity: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set forNotDoingActivity(val: boolean){
        this._forNotDoingActivity = val;
    }
    
    public get forNotDoingActivity(): boolean{
        return this._forNotDoingActivity;
    }
     

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F307_Size307', moduleContext.moduleName)
export class F307_Size307 extends RecordField { 

    @observable private _quantityDue: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set quantityDue(val: string){
        this._quantityDue = val;
    }
    
    public get quantityDue(): string{
        return this._quantityDue;
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
 
@TypeSystem.typeDecorator('F308_Interest', moduleContext.moduleName)
export class F308_Interest extends TextRecordField { 

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F309_InterestAndDefaultForDelay', moduleContext.moduleName)
export class F309_InterestAndDefaultForDelay extends TextRecordField { 

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F310_Size310', moduleContext.moduleName)
export class F310_Size310 extends RecordField { 

    @observable private _price: Price = null;
    
    @TypeSystem.propertyDecorator(Price ? Price : moduleContext.moduleName + '.' + 'Price')
    public set price(val: Price){
        this._price = val;
    }
    
    public get price(): Price{
        return this._price;
    }
     

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F311_Description', moduleContext.moduleName)
export class F311_Description extends RecordField { 

    @observable private _wholeCompany: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set wholeCompany(val: boolean){
        this._wholeCompany = val;
    }
    
    public get wholeCompany(): boolean{
        return this._wholeCompany;
    }
     

    @observable private _partOfCompany: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set partOfCompany(val: boolean){
        this._partOfCompany = val;
    }
    
    public get partOfCompany(): boolean{
        return this._partOfCompany;
    }
     

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F312_Price312', moduleContext.moduleName)
export class F312_Price312 extends RecordField { 

    @observable private _price: Price = null;
    
    @TypeSystem.propertyDecorator(Price ? Price : moduleContext.moduleName + '.' + 'Price')
    public set price(val: Price){
        this._price = val;
    }
    
    public get price(): Price{
        return this._price;
    }
     

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F313_Term', moduleContext.moduleName)
export class F313_Term extends TextRecordField { 
    
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
 
@TypeSystem.typeDecorator('F314_Circumstances', moduleContext.moduleName)
export class F314_Circumstances extends TextRecordField { 

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F314a_PledgedCreditorAgreement2', moduleContext.moduleName)
export class F314a_PledgedCreditorAgreement2 extends RecordField { 

    @observable private _article_8_Para_3_Of_SPA: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set article_8_Para_3_Of_SPA(val: boolean){
        this._article_8_Para_3_Of_SPA = val;
    }
    
    public get article_8_Para_3_Of_SPA(): boolean{
        return this._article_8_Para_3_Of_SPA;
    }
     

    @observable private _article_32_Para_5_Of_SPA: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set article_32_Para_5_Of_SPA(val: boolean){
        this._article_32_Para_5_Of_SPA = val;
    }
    
    public get article_32_Para_5_Of_SPA(): boolean{
        return this._article_32_Para_5_Of_SPA;
    }
     

    @observable private _article_21_Para_5_Of_SPA: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set article_21_Para_5_Of_SPA(val: boolean){
        this._article_21_Para_5_Of_SPA = val;
    }
    
    public get article_21_Para_5_Of_SPA(): boolean{
        return this._article_21_Para_5_Of_SPA;
    }
     

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F315_PartOfClaimwhatIsSeek', moduleContext.moduleName)
export class F315_PartOfClaimwhatIsSeek extends TextRecordField { 

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F316_PropertyOverExecution', moduleContext.moduleName)
export class F316_PropertyOverExecution extends RecordField { 

    @observable private _wholeCompany: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set wholeCompany(val: boolean){
        this._wholeCompany = val;
    }
    
    public get wholeCompany(): boolean{
        return this._wholeCompany;
    }
     

    @observable private _partOfCompany: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set partOfCompany(val: boolean){
        this._partOfCompany = val;
    }
    
    public get partOfCompany(): boolean{
        return this._partOfCompany;
    }
     

    @observable private _assetsOfCompany: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set assetsOfCompany(val: string){
        this._assetsOfCompany = val;
    }
    
    public get assetsOfCompany(): string{
        return this._assetsOfCompany;
    }
     

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F317_Depositor', moduleContext.moduleName)
export class F317_Depositor extends RecordField { 

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
     

    @observable private _bic: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set bic(val: string){
        this._bic = val;
    }
    
    public get bic(): string{
        return this._bic;
    }
     

    @observable private _iban: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set iban(val: string){
        this._iban = val;
    }
    
    public get iban(): string{
        return this._iban;
    }
     

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F318_InvitationForAppointingOfManager', moduleContext.moduleName)
export class F318_InvitationForAppointingOfManager extends RecordField { 

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
 
@TypeSystem.typeDecorator('F319_ManagerOfTradeEnterprise', moduleContext.moduleName)
export class F319_ManagerOfTradeEnterprise extends RecordField { 

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
     

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F320_RestoringManagementRight', moduleContext.moduleName)
export class F320_RestoringManagementRight extends RecordField { 

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
 
@TypeSystem.typeDecorator('F321_DistraintData', moduleContext.moduleName)
export class F321_DistraintData extends RecordField { 

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
     

    @observable private _price: Price = null;
    
    @TypeSystem.propertyDecorator(Price ? Price : moduleContext.moduleName + '.' + 'Price')
    public set price(val: Price){
        this._price = val;
    }
    
    public get price(): Price{
        return this._price;
    }
     

    @observable private _assetsOfCompany: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set assetsOfCompany(val: string){
        this._assetsOfCompany = val;
    }
    
    public get assetsOfCompany(): string{
        return this._assetsOfCompany;
    }
     

    @observable private _court: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set court(val: boolean){
        this._court = val;
    }
    
    public get court(): boolean{
        return this._court;
    }
     

    @observable private _legalExecutor: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set legalExecutor(val: boolean){
        this._legalExecutor = val;
    }
    
    public get legalExecutor(): boolean{
        return this._legalExecutor;
    }
     

    @observable private _adv: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set adv(val: boolean){
        this._adv = val;
    }
    
    public get adv(): boolean{
        return this._adv;
    }
     

    @observable private _incomingAmount: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set incomingAmount(val: boolean){
        this._incomingAmount = val;
    }
    
    public get incomingAmount(): boolean{
        return this._incomingAmount;
    }
     

    @observable private _remainingAmount: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set remainingAmount(val: boolean){
        this._remainingAmount = val;
    }
    
    public get remainingAmount(): boolean{
        return this._remainingAmount;
    }
     

    @observable private _enterprisesLikeCombination: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set enterprisesLikeCombination(val: boolean){
        this._enterprisesLikeCombination = val;
    }
    
    public get enterprisesLikeCombination(): boolean{
        return this._enterprisesLikeCombination;
    }
     

    @observable private _separateAssets: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set separateAssets(val: boolean){
        this._separateAssets = val;
    }
    
    public get separateAssets(): boolean{
        return this._separateAssets;
    }
     

    @observable private _courtLegalExecutor: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set courtLegalExecutor(val: string){
        this._courtLegalExecutor = val;
    }
    
    public get courtLegalExecutor(): string{
        return this._courtLegalExecutor;
    }
     

    @observable private _caseNumber: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set caseNumber(val: string){
        this._caseNumber = val;
    }
    
    public get caseNumber(): string{
        return this._caseNumber;
    }
     

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F322_RaiseDistraint', moduleContext.moduleName)
export class F322_RaiseDistraint extends RecordField { 

    @observable private _court: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set court(val: string){
        this._court = val;
    }
    
    public get court(): string{
        return this._court;
    }
     

    @observable private _caseNumber: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set caseNumber(val: string){
        this._caseNumber = val;
    }
    
    public get caseNumber(): string{
        return this._caseNumber;
    }
     

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F323_Size323', moduleContext.moduleName)
export class F323_Size323 extends RecordField { 

    @observable private _price: Price = null;
    
    @TypeSystem.propertyDecorator(Price ? Price : moduleContext.moduleName + '.' + 'Price')
    public set price(val: Price){
        this._price = val;
    }
    
    public get price(): Price{
        return this._price;
    }
     

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F324_StopExecutionOverProperty', moduleContext.moduleName)
export class F324_StopExecutionOverProperty extends TextRecordField { 

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F32410_EntryIntoPledgeCreditorRight2', moduleContext.moduleName)
export class F32410_EntryIntoPledgeCreditorRight2 extends Record { 

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
 
@TypeSystem.typeDecorator('F324a_EntryIntoPledgeCreditorRights2', moduleContext.moduleName)
export class F324a_EntryIntoPledgeCreditorRights2 extends CompositeField { 

    @observable private _entryIntoPledgeCreditorRight2List: F32410_EntryIntoPledgeCreditorRight2[] = null;
    
    @TypeSystem.propertyArrayDecorator(F32410_EntryIntoPledgeCreditorRight2 ? F32410_EntryIntoPledgeCreditorRight2 : moduleContext.moduleName + '.' + 'F32410_EntryIntoPledgeCreditorRight2')
    public set entryIntoPledgeCreditorRight2List(val: F32410_EntryIntoPledgeCreditorRight2[]){
        this._entryIntoPledgeCreditorRight2List = val;
    }
    
    public get entryIntoPledgeCreditorRight2List(): F32410_EntryIntoPledgeCreditorRight2[]{
        return this._entryIntoPledgeCreditorRight2List;
    }
     

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F325_EraseDistraint', moduleContext.moduleName)
export class F325_EraseDistraint extends RecordField { 

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
 
@TypeSystem.typeDecorator('F325a_PartialEraseDistraint', moduleContext.moduleName)
export class F325a_PartialEraseDistraint extends RecordField { 

    @observable private _description: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set description(val: string){
        this._description = val;
    }
    
    public get description(): string{
        return this._description;
    }
     

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
 
@TypeSystem.typeDecorator('F326_DateOfRenewingDistraint', moduleContext.moduleName)
export class F326_DateOfRenewingDistraint extends TextRecordField { 

    @observable private _processingRenewDistraintRequired: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set processingRenewDistraintRequired(val: boolean){
        this._processingRenewDistraintRequired = val;
    }
    
    public get processingRenewDistraintRequired(): boolean{
        return this._processingRenewDistraintRequired;
    }
     
    
    @observable private _date: moment.Moment = null;
    
    @TypeSystem.propertyDecorator('moment')
    public set date(val: moment.Moment){
        this._date = val;
    }
    
    public get date(): moment.Moment{
        return this._date;
    } 

    @observable private _renewDistraintText: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set renewDistraintText(val: string){
        this._renewDistraintText = val;
    }
    
    public get renewDistraintText(): string{
        return this._renewDistraintText;
    }
     

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F400_DistraintIdentifier', moduleContext.moduleName)
export class F400_DistraintIdentifier extends TextRecordField { 

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F4010_Distraint', moduleContext.moduleName)
export class F4010_Distraint extends Record { 

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
 
@TypeSystem.typeDecorator('F401_Distraints', moduleContext.moduleName)
export class F401_Distraints extends CompositeField { 

    @observable private _distraintsList: F4010_Distraint[] = null;
    
    @TypeSystem.propertyArrayDecorator(F4010_Distraint ? F4010_Distraint : moduleContext.moduleName + '.' + 'F4010_Distraint')
    public set distraintsList(val: F4010_Distraint[]){
        this._distraintsList = val;
    }
    
    public get distraintsList(): F4010_Distraint[]{
        return this._distraintsList;
    }
     

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F403_Reason403', moduleContext.moduleName)
export class F403_Reason403 extends RecordField { 

    @observable private _court: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set court(val: boolean){
        this._court = val;
    }
    
    public get court(): boolean{
        return this._court;
    }
     

    @observable private _legalExecutor: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set legalExecutor(val: boolean){
        this._legalExecutor = val;
    }
    
    public get legalExecutor(): boolean{
        return this._legalExecutor;
    }
     

    @observable private _adv: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set adv(val: boolean){
        this._adv = val;
    }
    
    public get adv(): boolean{
        return this._adv;
    }
     

    @observable private _courtLegalExecutor: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set courtLegalExecutor(val: string){
        this._courtLegalExecutor = val;
    }
    
    public get courtLegalExecutor(): string{
        return this._courtLegalExecutor;
    }
     

    @observable private _caseNumber: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set caseNumber(val: string){
        this._caseNumber = val;
    }
    
    public get caseNumber(): string{
        return this._caseNumber;
    }
     

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F404_Size404', moduleContext.moduleName)
export class F404_Size404 extends RecordField { 

    @observable private _price: Price = null;
    
    @TypeSystem.propertyDecorator(Price ? Price : moduleContext.moduleName + '.' + 'Price')
    public set price(val: Price){
        this._price = val;
    }
    
    public get price(): Price{
        return this._price;
    }
     

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F404a_MoratoryRate', moduleContext.moduleName)
export class F404a_MoratoryRate extends RecordField { 
    
    @observable private _date: moment.Moment = null;
    
    @TypeSystem.propertyDecorator('moment')
    public set date(val: moment.Moment){
        this._date = val;
    }
    
    public get date(): moment.Moment{
        return this._date;
    } 

    @observable private _price: Price = null;
    
    @TypeSystem.propertyDecorator(Price ? Price : moduleContext.moduleName + '.' + 'Price')
    public set price(val: Price){
        this._price = val;
    }
    
    public get price(): Price{
        return this._price;
    }
     

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F405_Interests', moduleContext.moduleName)
export class F405_Interests extends RecordField { 

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
 
@TypeSystem.typeDecorator('F040601_Description406', moduleContext.moduleName)
export class F040601_Description406 extends Record { 

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
 
@TypeSystem.typeDecorator('F04060_DescriptionCount', moduleContext.moduleName)
export class F04060_DescriptionCount extends Record { 

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
 
@TypeSystem.typeDecorator('F406_Descriptions', moduleContext.moduleName)
export class F406_Descriptions extends CompositeField { 

    @observable private _descriptionCount: F04060_DescriptionCount = null;
    
    @TypeSystem.propertyDecorator(F04060_DescriptionCount ? F04060_DescriptionCount : moduleContext.moduleName + '.' + 'F04060_DescriptionCount')
    public set descriptionCount(val: F04060_DescriptionCount){
        this._descriptionCount = val;
    }
    
    public get descriptionCount(): F04060_DescriptionCount{
        return this._descriptionCount;
    }
     

    @observable private _description406List: F040601_Description406[] = null;
    
    @TypeSystem.propertyArrayDecorator(F040601_Description406 ? F040601_Description406 : moduleContext.moduleName + '.' + 'F040601_Description406')
    public set description406List(val: F040601_Description406[]){
        this._description406List = val;
    }
    
    public get description406List(): F040601_Description406[]{
        return this._description406List;
    }
     

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F408_LiftingDistraint', moduleContext.moduleName)
export class F408_LiftingDistraint extends RecordField { 

    @observable private _courtLegalExecutor: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set courtLegalExecutor(val: string){
        this._courtLegalExecutor = val;
    }
    
    public get courtLegalExecutor(): string{
        return this._courtLegalExecutor;
    }
     

    @observable private _caseNumber: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set caseNumber(val: string){
        this._caseNumber = val;
    }
    
    public get caseNumber(): string{
        return this._caseNumber;
    }
     

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F409_Size409', moduleContext.moduleName)
export class F409_Size409 extends RecordField { 

    @observable private _price: Price = null;
    
    @TypeSystem.propertyDecorator(Price ? Price : moduleContext.moduleName + '.' + 'Price')
    public set price(val: Price){
        this._price = val;
    }
    
    public get price(): Price{
        return this._price;
    }
     

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F410_StopExecutionOverProperty410', moduleContext.moduleName)
export class F410_StopExecutionOverProperty410 extends TextRecordField { 

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F501_TermsOfLiquidation', moduleContext.moduleName)
export class F501_TermsOfLiquidation extends TextRecordField { 
    
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
     

    @observable private _liquidationProceedings: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set liquidationProceedings(val: boolean){
        this._liquidationProceedings = val;
    }
    
    public get liquidationProceedings(): boolean{
        return this._liquidationProceedings;
    }
     

    @observable private _changeCircumstances: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set changeCircumstances(val: boolean){
        this._changeCircumstances = val;
    }
    
    public get changeCircumstances(): boolean{
        return this._changeCircumstances;
    }
     

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F5020_Liquidator', moduleContext.moduleName)
export class F5020_Liquidator extends Record { 

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
 
@TypeSystem.typeDecorator('F502_Liquidators', moduleContext.moduleName)
export class F502_Liquidators extends CompositeField { 

    @observable private _liquidatorList: F5020_Liquidator[] = null;
    
    @TypeSystem.propertyArrayDecorator(F5020_Liquidator ? F5020_Liquidator : moduleContext.moduleName + '.' + 'F5020_Liquidator')
    public set liquidatorList(val: F5020_Liquidator[]){
        this._liquidatorList = val;
    }
    
    public get liquidatorList(): F5020_Liquidator[]{
        return this._liquidatorList;
    }
     

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F503_Representative503', moduleContext.moduleName)
export class F503_Representative503 extends RecordField { 

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
 
@TypeSystem.typeDecorator('F504_ContinuingTradeActivity', moduleContext.moduleName)
export class F504_ContinuingTradeActivity extends RecordField { 

    @observable private _continue: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set continue(val: boolean){
        this._continue = val;
    }
    
    public get continue(): boolean{
        return this._continue;
    }
     

    @observable private _restore: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set restore(val: boolean){
        this._restore = val;
    }
    
    public get restore(): boolean{
        return this._restore;
    }
     

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F529_ReasonForEntry529', moduleContext.moduleName)
export class F529_ReasonForEntry529 extends RecordField { 

    @observable private _article63: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set article63(val: boolean){
        this._article63 = val;
    }
    
    public get article63(): boolean{
        return this._article63;
    }
     

    @observable private _article6: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set article6(val: boolean){
        this._article6 = val;
    }
    
    public get article6(): boolean{
        return this._article6;
    }
     

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F531_OffshoreCompany', moduleContext.moduleName)
export class F531_OffshoreCompany extends TextRecordField { 

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F532_OffshoreTransliteration', moduleContext.moduleName)
export class F532_OffshoreTransliteration extends TextRecordField { 

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F533_OffshoreSeat', moduleContext.moduleName)
export class F533_OffshoreSeat extends SeatRecordField { 

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F5340_OffshoreRepresentative', moduleContext.moduleName)
export class F5340_OffshoreRepresentative extends Record { 

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
 
@TypeSystem.typeDecorator('F534_OffshoreRepresentatives', moduleContext.moduleName)
export class F534_OffshoreRepresentatives extends CompositeField { 

    @observable private _offshoreRepresentativesList: F5340_OffshoreRepresentative[] = null;
    
    @TypeSystem.propertyArrayDecorator(F5340_OffshoreRepresentative ? F5340_OffshoreRepresentative : moduleContext.moduleName + '.' + 'F5340_OffshoreRepresentative')
    public set offshoreRepresentativesList(val: F5340_OffshoreRepresentative[]){
        this._offshoreRepresentativesList = val;
    }
    
    public get offshoreRepresentativesList(): F5340_OffshoreRepresentative[]{
        return this._offshoreRepresentativesList;
    }
     

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F535_OffshoreWayOfRepresentation', moduleContext.moduleName)
export class F535_OffshoreWayOfRepresentation extends MannerRecordHolder { 

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F536_OffshoreSpecialConditions', moduleContext.moduleName)
export class F536_OffshoreSpecialConditions extends TextRecordField { 

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F537_OffshoreDirectControlCompanies', moduleContext.moduleName)
export class F537_OffshoreDirectControlCompanies extends CompositeField { 

    @observable private _offshoreDirectControlCompany: F5370_OffshoreDirectControlCompany = null;
    
    @TypeSystem.propertyDecorator(F5370_OffshoreDirectControlCompany ? F5370_OffshoreDirectControlCompany : moduleContext.moduleName + '.' + 'F5370_OffshoreDirectControlCompany')
    public set offshoreDirectControlCompany(val: F5370_OffshoreDirectControlCompany){
        this._offshoreDirectControlCompany = val;
    }
    
    public get offshoreDirectControlCompany(): F5370_OffshoreDirectControlCompany{
        return this._offshoreDirectControlCompany;
    }
     

    @observable private _offshoreDirectControlCompanyLegalForm: F53702_OffshoreDirectControlCompanyLegalForm = null;
    
    @TypeSystem.propertyDecorator(F53702_OffshoreDirectControlCompanyLegalForm ? F53702_OffshoreDirectControlCompanyLegalForm : moduleContext.moduleName + '.' + 'F53702_OffshoreDirectControlCompanyLegalForm')
    public set offshoreDirectControlCompanyLegalForm(val: F53702_OffshoreDirectControlCompanyLegalForm){
        this._offshoreDirectControlCompanyLegalForm = val;
    }
    
    public get offshoreDirectControlCompanyLegalForm(): F53702_OffshoreDirectControlCompanyLegalForm{
        return this._offshoreDirectControlCompanyLegalForm;
    }
     

    @observable private _offshoreDirectControlCompanyTransliteration: F53703_OffshoreDirectControlCompanyTransliteration = null;
    
    @TypeSystem.propertyDecorator(F53703_OffshoreDirectControlCompanyTransliteration ? F53703_OffshoreDirectControlCompanyTransliteration : moduleContext.moduleName + '.' + 'F53703_OffshoreDirectControlCompanyTransliteration')
    public set offshoreDirectControlCompanyTransliteration(val: F53703_OffshoreDirectControlCompanyTransliteration){
        this._offshoreDirectControlCompanyTransliteration = val;
    }
    
    public get offshoreDirectControlCompanyTransliteration(): F53703_OffshoreDirectControlCompanyTransliteration{
        return this._offshoreDirectControlCompanyTransliteration;
    }
     

    @observable private _offshoreDirectControlCompanyNumberInRegister: F53704_OffshoreDirectControlCompanyNumberInRegister = null;
    
    @TypeSystem.propertyDecorator(F53704_OffshoreDirectControlCompanyNumberInRegister ? F53704_OffshoreDirectControlCompanyNumberInRegister : moduleContext.moduleName + '.' + 'F53704_OffshoreDirectControlCompanyNumberInRegister')
    public set offshoreDirectControlCompanyNumberInRegister(val: F53704_OffshoreDirectControlCompanyNumberInRegister){
        this._offshoreDirectControlCompanyNumberInRegister = val;
    }
    
    public get offshoreDirectControlCompanyNumberInRegister(): F53704_OffshoreDirectControlCompanyNumberInRegister{
        return this._offshoreDirectControlCompanyNumberInRegister;
    }
     

    @observable private _offshoreDirectControlCompanyAddress: F53705_OffshoreDirectControlCompanyAddress = null;
    
    @TypeSystem.propertyDecorator(F53705_OffshoreDirectControlCompanyAddress ? F53705_OffshoreDirectControlCompanyAddress : moduleContext.moduleName + '.' + 'F53705_OffshoreDirectControlCompanyAddress')
    public set offshoreDirectControlCompanyAddress(val: F53705_OffshoreDirectControlCompanyAddress){
        this._offshoreDirectControlCompanyAddress = val;
    }
    
    public get offshoreDirectControlCompanyAddress(): F53705_OffshoreDirectControlCompanyAddress{
        return this._offshoreDirectControlCompanyAddress;
    }
     

    @observable private _offshoreDirectControlCompanyWayOfRepresentation: F53707_OffshoreDirectControlCompanyWayOfRepresentation = null;
    
    @TypeSystem.propertyDecorator(F53707_OffshoreDirectControlCompanyWayOfRepresentation ? F53707_OffshoreDirectControlCompanyWayOfRepresentation : moduleContext.moduleName + '.' + 'F53707_OffshoreDirectControlCompanyWayOfRepresentation')
    public set offshoreDirectControlCompanyWayOfRepresentation(val: F53707_OffshoreDirectControlCompanyWayOfRepresentation){
        this._offshoreDirectControlCompanyWayOfRepresentation = val;
    }
    
    public get offshoreDirectControlCompanyWayOfRepresentation(): F53707_OffshoreDirectControlCompanyWayOfRepresentation{
        return this._offshoreDirectControlCompanyWayOfRepresentation;
    }
     

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F5370_OffshoreDirectControlCompany', moduleContext.moduleName)
export class F5370_OffshoreDirectControlCompany extends RecordField { 

    @observable private _name: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set name(val: string){
        this._name = val;
    }
    
    public get name(): string{
        return this._name;
    }
     

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F53702_OffshoreDirectControlCompanyLegalForm', moduleContext.moduleName)
export class F53702_OffshoreDirectControlCompanyLegalForm extends RecordField { 

    @observable private _dcLegalForm: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set dcLegalForm(val: string){
        this._dcLegalForm = val;
    }
    
    public get dcLegalForm(): string{
        return this._dcLegalForm;
    }
     

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F53703_OffshoreDirectControlCompanyTransliteration', moduleContext.moduleName)
export class F53703_OffshoreDirectControlCompanyTransliteration extends RecordField { 

    @observable private _dcTransliteration: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set dcTransliteration(val: string){
        this._dcTransliteration = val;
    }
    
    public get dcTransliteration(): string{
        return this._dcTransliteration;
    }
     

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F53704_OffshoreDirectControlCompanyNumberInRegister', moduleContext.moduleName)
export class F53704_OffshoreDirectControlCompanyNumberInRegister extends RecordField { 

    @observable private _dcNumberInRegister: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set dcNumberInRegister(val: string){
        this._dcNumberInRegister = val;
    }
    
    public get dcNumberInRegister(): string{
        return this._dcNumberInRegister;
    }
     

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F53705_OffshoreDirectControlCompanyAddress', moduleContext.moduleName)
export class F53705_OffshoreDirectControlCompanyAddress extends RecordField { 

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
 
@TypeSystem.typeDecorator('F53707_OffshoreDirectControlCompanyWayOfRepresentation', moduleContext.moduleName)
export class F53707_OffshoreDirectControlCompanyWayOfRepresentation extends MannerRecordHolder { 

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F53710_OffshoreDirectControlCompanyRepresentative', moduleContext.moduleName)
export class F53710_OffshoreDirectControlCompanyRepresentative extends Record { 

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
     

    @observable private _countryOfResidence: Address = null;
    
    @TypeSystem.propertyDecorator(Address ? Address : moduleContext.moduleName + '.' + 'Address')
    public set countryOfResidence(val: Address){
        this._countryOfResidence = val;
    }
    
    public get countryOfResidence(): Address{
        return this._countryOfResidence;
    }
     

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F5371_OffshoreDirectControlCompanyRepresentatives', moduleContext.moduleName)
export class F5371_OffshoreDirectControlCompanyRepresentatives extends CompositeField { 

    @observable private _offshoreDirectControlCompanyRepresentativesList: F53710_OffshoreDirectControlCompanyRepresentative[] = null;
    
    @TypeSystem.propertyArrayDecorator(F53710_OffshoreDirectControlCompanyRepresentative ? F53710_OffshoreDirectControlCompanyRepresentative : moduleContext.moduleName + '.' + 'F53710_OffshoreDirectControlCompanyRepresentative')
    public set offshoreDirectControlCompanyRepresentativesList(val: F53710_OffshoreDirectControlCompanyRepresentative[]){
        this._offshoreDirectControlCompanyRepresentativesList = val;
    }
    
    public get offshoreDirectControlCompanyRepresentativesList(): F53710_OffshoreDirectControlCompanyRepresentative[]{
        return this._offshoreDirectControlCompanyRepresentativesList;
    }
     

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F538_OffshoreNoDirectControlCompanies', moduleContext.moduleName)
export class F538_OffshoreNoDirectControlCompanies extends CompositeField { 

    @observable private _offshoreNoDirectControlCompany: F5380_OffshoreNoDirectControlCompany = null;
    
    @TypeSystem.propertyDecorator(F5380_OffshoreNoDirectControlCompany ? F5380_OffshoreNoDirectControlCompany : moduleContext.moduleName + '.' + 'F5380_OffshoreNoDirectControlCompany')
    public set offshoreNoDirectControlCompany(val: F5380_OffshoreNoDirectControlCompany){
        this._offshoreNoDirectControlCompany = val;
    }
    
    public get offshoreNoDirectControlCompany(): F5380_OffshoreNoDirectControlCompany{
        return this._offshoreNoDirectControlCompany;
    }
     

    @observable private _offshoreNoDirectControlCompanyLegalForm: F53802_OffshoreNoDirectControlCompanyLegalForm = null;
    
    @TypeSystem.propertyDecorator(F53802_OffshoreNoDirectControlCompanyLegalForm ? F53802_OffshoreNoDirectControlCompanyLegalForm : moduleContext.moduleName + '.' + 'F53802_OffshoreNoDirectControlCompanyLegalForm')
    public set offshoreNoDirectControlCompanyLegalForm(val: F53802_OffshoreNoDirectControlCompanyLegalForm){
        this._offshoreNoDirectControlCompanyLegalForm = val;
    }
    
    public get offshoreNoDirectControlCompanyLegalForm(): F53802_OffshoreNoDirectControlCompanyLegalForm{
        return this._offshoreNoDirectControlCompanyLegalForm;
    }
     

    @observable private _offshoreNoDirectControlCompanyTransliteration: F53803_OffshoreNoDirectControlCompanyTransliteration = null;
    
    @TypeSystem.propertyDecorator(F53803_OffshoreNoDirectControlCompanyTransliteration ? F53803_OffshoreNoDirectControlCompanyTransliteration : moduleContext.moduleName + '.' + 'F53803_OffshoreNoDirectControlCompanyTransliteration')
    public set offshoreNoDirectControlCompanyTransliteration(val: F53803_OffshoreNoDirectControlCompanyTransliteration){
        this._offshoreNoDirectControlCompanyTransliteration = val;
    }
    
    public get offshoreNoDirectControlCompanyTransliteration(): F53803_OffshoreNoDirectControlCompanyTransliteration{
        return this._offshoreNoDirectControlCompanyTransliteration;
    }
     

    @observable private _offshoreNoDirectControlCompanyNumberInRegister: F53804_OffshoreNoDirectControlCompanyNumberInRegister = null;
    
    @TypeSystem.propertyDecorator(F53804_OffshoreNoDirectControlCompanyNumberInRegister ? F53804_OffshoreNoDirectControlCompanyNumberInRegister : moduleContext.moduleName + '.' + 'F53804_OffshoreNoDirectControlCompanyNumberInRegister')
    public set offshoreNoDirectControlCompanyNumberInRegister(val: F53804_OffshoreNoDirectControlCompanyNumberInRegister){
        this._offshoreNoDirectControlCompanyNumberInRegister = val;
    }
    
    public get offshoreNoDirectControlCompanyNumberInRegister(): F53804_OffshoreNoDirectControlCompanyNumberInRegister{
        return this._offshoreNoDirectControlCompanyNumberInRegister;
    }
     

    @observable private _offshoreNoDirectControlCompanyAddress: F53805_OffshoreNoDirectControlCompanyAddress = null;
    
    @TypeSystem.propertyDecorator(F53805_OffshoreNoDirectControlCompanyAddress ? F53805_OffshoreNoDirectControlCompanyAddress : moduleContext.moduleName + '.' + 'F53805_OffshoreNoDirectControlCompanyAddress')
    public set offshoreNoDirectControlCompanyAddress(val: F53805_OffshoreNoDirectControlCompanyAddress){
        this._offshoreNoDirectControlCompanyAddress = val;
    }
    
    public get offshoreNoDirectControlCompanyAddress(): F53805_OffshoreNoDirectControlCompanyAddress{
        return this._offshoreNoDirectControlCompanyAddress;
    }
     

    @observable private _offshoreNoDirectControlCompanyWayOfRepresentation: F53807_OffshoreNoDirectControlCompanyWayOfRepresentation = null;
    
    @TypeSystem.propertyDecorator(F53807_OffshoreNoDirectControlCompanyWayOfRepresentation ? F53807_OffshoreNoDirectControlCompanyWayOfRepresentation : moduleContext.moduleName + '.' + 'F53807_OffshoreNoDirectControlCompanyWayOfRepresentation')
    public set offshoreNoDirectControlCompanyWayOfRepresentation(val: F53807_OffshoreNoDirectControlCompanyWayOfRepresentation){
        this._offshoreNoDirectControlCompanyWayOfRepresentation = val;
    }
    
    public get offshoreNoDirectControlCompanyWayOfRepresentation(): F53807_OffshoreNoDirectControlCompanyWayOfRepresentation{
        return this._offshoreNoDirectControlCompanyWayOfRepresentation;
    }
     

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F5380_OffshoreNoDirectControlCompany', moduleContext.moduleName)
export class F5380_OffshoreNoDirectControlCompany extends RecordField { 

    @observable private _name: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set name(val: string){
        this._name = val;
    }
    
    public get name(): string{
        return this._name;
    }
     

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F53802_OffshoreNoDirectControlCompanyLegalForm', moduleContext.moduleName)
export class F53802_OffshoreNoDirectControlCompanyLegalForm extends RecordField { 

    @observable private _ndcLegalForm: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set ndcLegalForm(val: string){
        this._ndcLegalForm = val;
    }
    
    public get ndcLegalForm(): string{
        return this._ndcLegalForm;
    }
     

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F53803_OffshoreNoDirectControlCompanyTransliteration', moduleContext.moduleName)
export class F53803_OffshoreNoDirectControlCompanyTransliteration extends RecordField { 

    @observable private _ndcTransliteration: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set ndcTransliteration(val: string){
        this._ndcTransliteration = val;
    }
    
    public get ndcTransliteration(): string{
        return this._ndcTransliteration;
    }
     

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F53804_OffshoreNoDirectControlCompanyNumberInRegister', moduleContext.moduleName)
export class F53804_OffshoreNoDirectControlCompanyNumberInRegister extends RecordField { 

    @observable private _ndcNumberInRegister: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set ndcNumberInRegister(val: string){
        this._ndcNumberInRegister = val;
    }
    
    public get ndcNumberInRegister(): string{
        return this._ndcNumberInRegister;
    }
     

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F53805_OffshoreNoDirectControlCompanyAddress', moduleContext.moduleName)
export class F53805_OffshoreNoDirectControlCompanyAddress extends RecordField { 

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
 
@TypeSystem.typeDecorator('F53807_OffshoreNoDirectControlCompanyWayOfRepresentation', moduleContext.moduleName)
export class F53807_OffshoreNoDirectControlCompanyWayOfRepresentation extends MannerRecordHolder { 

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F53810_OffshoreNoDirectControlCompanyRepresentative', moduleContext.moduleName)
export class F53810_OffshoreNoDirectControlCompanyRepresentative extends Record { 

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
     

    @observable private _countryOfResidence: Address = null;
    
    @TypeSystem.propertyDecorator(Address ? Address : moduleContext.moduleName + '.' + 'Address')
    public set countryOfResidence(val: Address){
        this._countryOfResidence = val;
    }
    
    public get countryOfResidence(): Address{
        return this._countryOfResidence;
    }
     

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F5381_OffshoreNoDirectControlCompanyRepresentatives', moduleContext.moduleName)
export class F5381_OffshoreNoDirectControlCompanyRepresentatives extends CompositeField { 

    @observable private _offshoreNoDirectControlCompanyRepresentativesList: F53810_OffshoreNoDirectControlCompanyRepresentative[] = null;
    
    @TypeSystem.propertyArrayDecorator(F53810_OffshoreNoDirectControlCompanyRepresentative ? F53810_OffshoreNoDirectControlCompanyRepresentative : moduleContext.moduleName + '.' + 'F53810_OffshoreNoDirectControlCompanyRepresentative')
    public set offshoreNoDirectControlCompanyRepresentativesList(val: F53810_OffshoreNoDirectControlCompanyRepresentative[]){
        this._offshoreNoDirectControlCompanyRepresentativesList = val;
    }
    
    public get offshoreNoDirectControlCompanyRepresentativesList(): F53810_OffshoreNoDirectControlCompanyRepresentative[]{
        return this._offshoreNoDirectControlCompanyRepresentativesList;
    }
     

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F540_CircumstanceArticle4', moduleContext.moduleName)
export class F540_CircumstanceArticle4 extends TextRecordField { 

    @observable private _isArticle2: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set isArticle2(val: boolean){
        this._isArticle2 = val;
    }
    
    public get isArticle2(): boolean{
        return this._isArticle2;
    }
     

    @observable private _isArticle3: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set isArticle3(val: boolean){
        this._isArticle3 = val;
    }
    
    public get isArticle3(): boolean{
        return this._isArticle3;
    }
     

    @observable private _isArticle5: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set isArticle5(val: boolean){
        this._isArticle5 = val;
    }
    
    public get isArticle5(): boolean{
        return this._isArticle5;
    }
     

    @observable private _isArticle6: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set isArticle6(val: boolean){
        this._isArticle6 = val;
    }
    
    public get isArticle6(): boolean{
        return this._isArticle6;
    }
     

    @observable private _isArticle7: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set isArticle7(val: boolean){
        this._isArticle7 = val;
    }
    
    public get isArticle7(): boolean{
        return this._isArticle7;
    }
     

    @observable private _isArticle8: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set isArticle8(val: boolean){
        this._isArticle8 = val;
    }
    
    public get isArticle8(): boolean{
        return this._isArticle8;
    }
     

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F5500_ActualOwner', moduleContext.moduleName)
export class F5500_ActualOwner extends Record { 

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
     

    @observable private _ownedRights: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set ownedRights(val: string){
        this._ownedRights = val;
    }
    
    public get ownedRights(): string{
        return this._ownedRights;
    }
     

    @observable private _countryOfResidence: Address = null;
    
    @TypeSystem.propertyDecorator(Address ? Address : moduleContext.moduleName + '.' + 'Address')
    public set countryOfResidence(val: Address){
        this._countryOfResidence = val;
    }
    
    public get countryOfResidence(): Address{
        return this._countryOfResidence;
    }
     

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F550_ActualOwners', moduleContext.moduleName)
export class F550_ActualOwners extends CompositeField { 

    @observable private _actualOwnersList: F5500_ActualOwner[] = null;
    
    @TypeSystem.propertyArrayDecorator(F5500_ActualOwner ? F5500_ActualOwner : moduleContext.moduleName + '.' + 'F5500_ActualOwner')
    public set actualOwnersList(val: F5500_ActualOwner[]){
        this._actualOwnersList = val;
    }
    
    public get actualOwnersList(): F5500_ActualOwner[]{
        return this._actualOwnersList;
    }
     

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F550a_ContactPerson550a', moduleContext.moduleName)
export class F550a_ContactPerson550a extends RecordField { 

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
     

    @observable private _permanentAddress: Address = null;
    
    @TypeSystem.propertyDecorator(Address ? Address : moduleContext.moduleName + '.' + 'Address')
    public set permanentAddress(val: Address){
        this._permanentAddress = val;
    }
    
    public get permanentAddress(): Address{
        return this._permanentAddress;
    }
     

    constructor(obj?: any){
        super(obj)
         
        this.copyFrom(obj);
    }
}
 
@TypeSystem.typeDecorator('F551_EraseActualOwner', moduleContext.moduleName)
export class F551_EraseActualOwner extends RecordField { 

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


   


