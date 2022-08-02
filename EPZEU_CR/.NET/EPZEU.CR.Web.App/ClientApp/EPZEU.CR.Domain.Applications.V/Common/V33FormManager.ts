import { IApplicationWithFieldsFormManager, PersonTypes } from 'EPZEU.CR.Domain';
import { computed } from 'mobx';
import { V33 } from '../Models/ApplicationForms/ApplicationFormsV';
import { IF803Manager } from '../UI/Fields/F803_SuccessorsUI';
import { ApplicationFormVBaseManager } from './ApplicationFormVBaseManager';

export interface IV33FormManager extends IApplicationWithFieldsFormManager {
}


export class V33FormManager extends ApplicationFormVBaseManager<V33> implements IV33FormManager, IF803Manager {

    constructor() {
        super();

    }

    protected createApplication(obj: any): V33 {
        return new V33(obj);
    }

    @computed get personTypeForField803(): PersonTypes {
        let ret = this.application.fields.formOfTransforming801a.fusion801a ? PersonTypes.Successor803Fusion : PersonTypes.Successor803;
        return ret;
    }
}