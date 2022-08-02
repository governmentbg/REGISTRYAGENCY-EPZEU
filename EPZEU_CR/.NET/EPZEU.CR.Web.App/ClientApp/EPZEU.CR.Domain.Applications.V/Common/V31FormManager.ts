import { IApplicationWithFieldsFormManager, PersonTypes } from 'EPZEU.CR.Domain';
import { V31 } from '../Models/ApplicationForms/ApplicationFormsV';
import { IF803Manager } from '../UI/Fields/F803_SuccessorsUI';
import { ApplicationFormVBaseManager } from './ApplicationFormVBaseManager';

export interface IV31FormManager extends IApplicationWithFieldsFormManager {
}

export class V31FormManager extends ApplicationFormVBaseManager<V31> implements IV31FormManager, IF803Manager {

    constructor() {
        super();

    }

    protected createApplication(obj: any): V31 {
        return new V31(obj);
    }

    get personTypeForField803(): PersonTypes {
        if (this.application.fields.formOfTransforming801.fusion) {
            return PersonTypes.Successor803Fusion
        }

        return PersonTypes.Successor803;
    }
}