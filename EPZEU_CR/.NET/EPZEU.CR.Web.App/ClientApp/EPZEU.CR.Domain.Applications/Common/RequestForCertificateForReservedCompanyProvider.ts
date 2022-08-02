import { DataServiceProvider, Nomenclatures } from 'EPZEU.Core';
import { ApplicationFormTypes } from 'EPZEU.CR.Core';
import { ApplicationItem, DomainModelHepler, Form, FormState, IApplicationFormManager, IApplicationFormValidationContext, IApplicationProvider } from 'EPZEU.CR.Domain';
import { moduleContext } from '../';
import { RequestForCertificateForReservedCompany } from '../Models/RequestForCertificateForReservedCompany';
import { RequestForCertificateForReservedValidator } from '../Models/Validators/RequestForCertificateForReservedValidator';
import { RequestForCertificateForReservedCompanyStartUI } from '../UI/RequestForCertificateForReservedCompanyStartUI';
import { RequestForCertificateForReservedCompanyUI } from '../UI/RequestForCertificateForReservedCompanyUI';
import { RequestForCertificateForReservedCompanyFormManager } from './RequestForCertificateForReservedCompanyFormManager';

export class RequestForCertificateForReservedCompanyProvider implements IApplicationProvider {

    getStartUIComponentType(): any {
        return RequestForCertificateForReservedCompanyStartUI;
    }
    
    getUIComponentType(): any {
        return RequestForCertificateForReservedCompanyUI;
    } 

    public getApplicationForms(appItem: ApplicationItem, dataServiceProvider: DataServiceProvider): Form[] {
        let validationContext: IApplicationFormValidationContext = {
            appType: appItem.applicationManager.application.appType,
            isRecordNew: DomainModelHepler.isRecordNew,
            isRecordEmpty: DomainModelHepler.isRecordEmpty,
            isRecordDirty: DomainModelHepler.isRecordDirty,
            processStates: appItem.applicationManager.processState,
            applicationManager: appItem.applicationManager,
            dataServiceProvider: dataServiceProvider,
            ekatteAreas: null,
            foreignCommercialRegisters: null
        };

        Nomenclatures.getEkatteAreas().then(areas => validationContext.ekatteAreas = areas);

        let forms: Form[] = [];

        var form: Form = {
            form: (<RequestForCertificateForReservedCompany>appItem.applicationManager.application),
            formManager: appItem.applicationManager,
            formMenuNavItems: [{
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("CR_APP_EMAIL_ADDRESSES_OBTAIN_CERTIFICATE_L"),
            }],
            formUICmp: RequestForCertificateForReservedCompanyUI,
            formValidator: new RequestForCertificateForReservedValidator(),
            state: FormState.New,
            order: "1",
            isMain: true,
            canEdit: true,
            canDelete: false,
            errorPropNames: ["email"]
        }

        form.formValidator.setValidationContext(validationContext)

        forms.push(form);

        return forms;
    }

    public getHasGRPRAgreement(): boolean { return false; }

    getApplicationManager(): IApplicationFormManager {
        return new RequestForCertificateForReservedCompanyFormManager();
    }

    getValidator(): RequestForCertificateForReservedValidator {
        return new RequestForCertificateForReservedValidator();
    }

    get applicationType(): ApplicationFormTypes {
        return ApplicationFormTypes.CertificateForReserveFirm;
    }
}
