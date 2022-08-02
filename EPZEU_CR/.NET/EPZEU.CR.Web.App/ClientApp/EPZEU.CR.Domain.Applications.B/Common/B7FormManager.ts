import { ApplicationFormBaseManager } from 'EPZEU.CR.Domain'
import { B7 } from '../Models/ApplicationForms/ApplicationFormsB'
import { ApplicationFormBBaseManager, IApplicationFormBManager } from './ApplicationFormBBaseManager';
import { ObjectHelper } from 'Cnsys.Core';

export interface IApplicationFormB7Manager extends IApplicationFormBManager  {
    clearArticle63UnrelatedFields: () => Promise<void>;
}

export function isIApplicationFormB7Manager(obj: IApplicationFormB7Manager | any): obj is IApplicationFormB7Manager {
    return obj && ObjectHelper.isSubClassOf(obj, B7FormManager);
}

export class B7FormManager extends ApplicationFormBBaseManager<B7> implements IApplicationFormB7Manager {

    constructor() {
        super()

        this.clearArticle63UnrelatedFields = this.clearArticle63UnrelatedFields.bind(this);
    }

    protected createApplication(obj: any): B7 {
        return new B7(obj);
    }

    public clearArticle63UnrelatedFields(): Promise<void> {
        this.returnRecordToInititialState(this.application.fields.numberNationalRegister1b);
        this.returnRecordToInititialState(this.application.fields.offshoreCompany);
        this.returnRecordToInititialState(this.application.fields.offshoreSeat);
        this.returnRecordToInititialState(this.application.fields.offshoreWayOfRepresentation);
        this.returnRecordToInititialState(this.application.fields.offshoreSpecialConditions);
        this.returnRecordToInititialState(this.application.fields.article4);

        this.application.fields.offshoreRepresentatives.offshoreRepresentativesList.splice(1);
        this.returnRecordToInititialState(this.application.fields.offshoreRepresentatives.offshoreRepresentativesList[0]);

        return Promise.resolve();
    }
}