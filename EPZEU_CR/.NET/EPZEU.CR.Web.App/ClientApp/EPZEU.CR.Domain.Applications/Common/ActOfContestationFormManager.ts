﻿import { ClientError } from 'Cnsys.Core'
import { ApplicationFormBaseManager } from 'EPZEU.CR.Domain'
import { ActOfContestation } from '../Models/ModelsAutoGenerated'

export class ActOfContestationFormManager extends ApplicationFormBaseManager<ActOfContestation> {

    protected createApplication(obj: any): ActOfContestation {
        return new ActOfContestation(obj);
    }
}