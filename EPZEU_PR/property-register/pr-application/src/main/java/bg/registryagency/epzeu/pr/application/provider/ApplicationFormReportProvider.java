package bg.registryagency.epzeu.pr.application.provider;

import bg.registryagency.epzeu.pr.application.BaseRequestForReport;
import bg.registryagency.epzeu.pr.application.exception.ApplicationDataException;
import bg.registryagency.epzeu.pr.application.exception.ApplicationFormTransformationException;

import java.util.List;

public interface ApplicationFormReportProvider extends ApplicationFormProvider {

    List<BaseRequestForReport> fromJsonDraftToApplications(byte[] jsonBytes) throws ApplicationFormTransformationException, ApplicationDataException;

    byte[] fromApplicationToXmlBytes(BaseRequestForReport requestForReportOfPerson) throws ApplicationFormTransformationException;
}
