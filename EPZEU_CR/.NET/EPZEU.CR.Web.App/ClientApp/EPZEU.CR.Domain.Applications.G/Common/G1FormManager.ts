import { G1 } from '../Models/ApplicationForms/ApplicationFormsG'
import { ApplicationFormGBaseManager } from './ApplicationFormGBaseManager';

export class G1FormManager extends ApplicationFormGBaseManager<G1> {

    //#region Abstract

    protected createApplication(obj: any): G1 {
        return new G1(obj);
    }
    
    //#endregion
}