package bg.registryagency.epzeu.pr.application.provider;


import bg.registryagency.epzeu.pr.application.ApplicationForm;
import bg.registryagency.epzeu.pr.application.BaseApplicationForm;
import bg.registryagency.epzeu.pr.application.exception.ApplicationDataException;


public interface ApplicationFormServiceProvider extends ApplicationFormProvider {
    BaseApplicationForm deserializeApplicationFromJson(byte[] jsonContent) throws ApplicationDataException;

    byte[] serializeApplicationToXml(ApplicationForm applicationForm);

    String getApplicationFileName();

    void validate(ApplicationForm application) throws ApplicationDataException;
}
