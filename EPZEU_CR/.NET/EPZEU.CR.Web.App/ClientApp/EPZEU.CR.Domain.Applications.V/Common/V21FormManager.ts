﻿import { ObjectHelper } from 'Cnsys.Core';
import { IApplicationWithFieldsFormManager, RecordOperations } from 'EPZEU.CR.Domain';
import { V21 } from '../Models/ApplicationForms/ApplicationFormsV';
import { F7030_Successor } from '../Models/Fields/ModelsAutoGenerated';
import { ApplicationFormVBaseManager } from './ApplicationFormVBaseManager';

export interface IV21FormManager extends IApplicationWithFieldsFormManager {
}

export class V21FormManager extends ApplicationFormVBaseManager<V21> implements IV21FormManager {
    protected createApplication(obj: any): V21 {
        return new V21(obj);
    }

    /**Инициализира данните на заявленеито*/
    protected initApplicationData(): Promise<void> {
        return super.initApplicationData().bind(this).then(() => {
            // Поле 703 понякога се държи като списъчно, понякога не (в зависимост от това какво е избрано в 701)
            // Може да е задължително или не (пак в зависимост от 701)
            // Затова не можем да го инициализираме в V21Provider.cs - ако го инициалицираме там и после 
            // в 701 е избрана такава опция, че 703 да не е задължително за попълване, и го оставим празно,
            // то няма да се прати към търговския (защото се прави сравнение - вижда се, че няма промяна, и не го праща),
            // а в старата система се праща (макар и празно)
            if (this.application.fields.successors703.successorList.length == 0) {
                let successor = new F7030_Successor();
                successor.legalForm = '-1';
                successor.recordOperation = RecordOperations.Add;
                successor.recordID = ObjectHelper.newGuid();
                this.application.fields.successors703.successorList.push(successor)
            }
        });
    }
}