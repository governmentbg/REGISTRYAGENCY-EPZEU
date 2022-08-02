import { TypeSystem } from 'Cnsys.Core'
import { ApplicationWithFieldsFormBase } from 'EPZEU.CR.Domain'
import { moduleContext } from '../../ModuleContext'
import { BRISFields } from '../BRISModels'

@TypeSystem.typeDecorator('BRISCrossborderMergeReceptionMessage', moduleContext.moduleName)
export class BRISCrossborderMergeReceptionMessage extends ApplicationWithFieldsFormBase<BRISFields> {
    constructor(obj?: any) {
        super(obj)

        this.copyFrom(obj);

        if (obj && obj.fields) {
            this.fields = new BRISFields(obj.fields);
        }
    }
}

@TypeSystem.typeDecorator('BRISBranchDisclosureReceptionMessage', moduleContext.moduleName)
export class BRISBranchDisclosureReceptionMessage extends ApplicationWithFieldsFormBase<BRISFields> {
    constructor(obj?: any) {
        super(obj)

        this.copyFrom(obj);

        if (obj && obj.fields) {
            this.fields = new BRISFields(obj.fields);
        }
    }
}

@TypeSystem.typeDecorator('BRISChangeCompanyEUIDReceptionMessage', moduleContext.moduleName)
export class BRISChangeCompanyEUIDReceptionMessage extends ApplicationWithFieldsFormBase<BRISFields> {
    constructor(obj?: any) {
        super(obj)

        this.copyFrom(obj);

        if (obj && obj.fields) {
            this.fields = new BRISFields(obj.fields);
        }
    }
}