

// Auto Generated Object
import * as moment from 'moment'
import { observable } from 'mobx'
import { TypeSystem, BaseDataModel } from 'Cnsys.Core'
import { ApplicationFormFieldsBase, Person } from 'EPZEU.CR.Domain'
import { moduleContext } from '../../ModuleContext'
import * as fields from '../Fields/ModelsAutoGenerated'



@TypeSystem.typeDecorator('ApplicationFormGFieldsBase', moduleContext.moduleName)
export class ApplicationFormGFieldsBase extends ApplicationFormFieldsBase { 

    @observable private _statements: fields.F10019A_StatementsA = null;
    
    @TypeSystem.propertyDecorator(fields.F10019A_StatementsA)
    public set statements(val: fields.F10019A_StatementsA){
        this._statements = val;
    }
    
    public get statements(): fields.F10019A_StatementsA{
        return this._statements;
    }
     

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('ActCompany', moduleContext.moduleName)
export class ActCompany extends BaseDataModel { 

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

@TypeSystem.typeDecorator('ActsCompanies', moduleContext.moduleName)
export class ActsCompanies extends BaseDataModel { 

    @observable private _actsCompaniesList: ActCompany[] = null;
    
    @TypeSystem.propertyArrayDecorator(ActCompany ? ActCompany : moduleContext.moduleName + '.' + 'ActCompany')
    public set actsCompaniesList(val: ActCompany[]){
        this._actsCompaniesList = val;
    }
    
    public get actsCompaniesList(): ActCompany[]{
        return this._actsCompaniesList;
    }
     

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('G1Fields', moduleContext.moduleName)
export class G1Fields extends ApplicationFormGFieldsBase { 

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('G2Fields', moduleContext.moduleName)
export class G2Fields extends ApplicationFormGFieldsBase { 

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('G3Fields', moduleContext.moduleName)
export class G3Fields extends ApplicationFormGFieldsBase { 

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}
