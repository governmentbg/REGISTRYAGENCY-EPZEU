import { G2 } from '../Models/ApplicationForms/ApplicationFormsG';
import { ApplicationFormGBaseManager } from './ApplicationFormGBaseManager';

export class G2FormManager extends ApplicationFormGBaseManager<G2> {

    //#region Abstract

    protected createApplication(obj: any): G2 {
        return new G2(obj);
    }

    //#endregion
}