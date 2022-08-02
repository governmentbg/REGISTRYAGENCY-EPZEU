package bg.registryagency.epzeu.pr.application.provider;

import bg.registryagency.epzeu.pr.application.ApplicationForm;
import bg.registryagency.epzeu.pr.application.exception.ApplicationFormTransformationException;
import bg.registryagency.epzeu.pr.application.util.JaxbUtils;
import bg.registryagency.epzeu.pr.application.util.JsonObjectMapper;
import bg.registryagency.epzeu.pr.integration.api.application.segment.IndividualDto;
import bg.registryagency.epzeu.pr.integration.conf.ApplicationConstants;
import bg.registryagency.epzeu.pr.integration.epzeu.client.UserWebClient;
import bg.registryagency.epzeu.pr.integration.epzeu.dto.CountryDto;
import bg.registryagency.epzeu.pr.integration.epzeu.dto.LoginSessionDto;
import bg.registryagency.epzeu.pr.integration.epzeu.enums.AuthenticationTypeEnum;
import bg.registryagency.epzeu.pr.integration.util.ValidatorHelper;
import lombok.RequiredArgsConstructor;
import org.xml.sax.SAXException;

import javax.xml.bind.JAXBException;
import javax.xml.stream.XMLStreamException;
import java.io.IOException;
import java.io.InputStream;

public abstract class BaseApplicationFormProvider extends BaseProvider implements ApplicationFormServiceProvider {
    protected final UserWebClient userWebClient;

    public BaseApplicationFormProvider(JsonObjectMapper jsonObjectMapper, UserWebClient userWebClient) {
        super(jsonObjectMapper);
        this.userWebClient = userWebClient;
    }

    protected abstract Class getApplicationClass();

    @Override
    public byte[] serializeApplicationToXml(ApplicationForm applicationForm) {
        try {
            return JaxbUtils.marshalXMLDocumentByModel(applicationForm, getXsdSchema(false));
        } catch (IOException | XMLStreamException | SAXException | JAXBException e) {
            throw new ApplicationFormTransformationException("Cannot serialize application to XML", e);
        }
    }

    protected IndividualDto buildApplicantDataDto() {
        LoginSessionDto loginSessionDto = userWebClient.getLoginSessionWithUserProfileInformation().block();

        IndividualDto individual = new IndividualDto();

        if (loginSessionDto != null) {
            if(loginSessionDto.getAuthenticationType() == AuthenticationTypeEnum.CERTIFICATE) {
                if (ValidatorHelper.validateEgn(loginSessionDto.getUserIdentifier())) {
                    individual.setPersonNationality(new CountryDto(ApplicationConstants.COUNTRY_BULGARIA_CODE));
                    individual.setIdentity(loginSessionDto.getUserIdentifier());
                } else if (ValidatorHelper.validateLnch(loginSessionDto.getUserIdentifier())) {
                    individual.setIdentity(loginSessionDto.getUserIdentifier());
                }
            }

            if(loginSessionDto.getUserProfileData() != null) {
                individual.getName().setFirstName(loginSessionDto.getUserProfileData().getFirstName());
                individual.getName().setSurName(loginSessionDto.getUserProfileData().getMiddleName());
                individual.getName().setFamilyName(loginSessionDto.getUserProfileData().getFamilyName());
            }
        }

        return individual;
    }
}
