﻿import { Constants } from 'EPZEU.Core'
import { IApplicationFormAManager, ApplicationFormABaseManager } from './ApplicationFormABaseManager'
import { A14 } from '../Models/ApplicationForms/ApplicationFormsA'
import { F0100_Representative } from '../Models/Fields/ModelsAutoGenerated'

export class A14FormManager extends ApplicationFormABaseManager<A14> {

    protected createApplication(obj: any): A14 {
        return new A14(obj);
    }
}