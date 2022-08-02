package bg.registryagency.epzeu.pr.application.validator;

import bg.registryagency.epzeu.pr.application.ApplicationForCertifiedCopy;
import bg.registryagency.epzeu.pr.application.BootstrapDataUtils;
import bg.registryagency.epzeu.pr.application.conf.ValidatorsTestConfiguration;
import bg.registryagency.epzeu.pr.application.segment.ApplicantData;
import bg.registryagency.epzeu.pr.application.segment.AttachedDocument;
import bg.registryagency.epzeu.pr.application.segment.DocumentFileMetadata;
import bg.registryagency.epzeu.pr.application.segment.DocumentType;
import lombok.extern.slf4j.Slf4j;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.util.EnumMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = ValidatorsTestConfiguration.class)
@Slf4j
public class ApplicationForCertifiedCopyValidatorTests {

    @Autowired
    private Validator applicationForCertifiedCopyValidator;
    private ApplicationForCertifiedCopy applicationForCertifiedCopy;
    private Map<ValidationParamKey, Object> validationParams;
    private List<ApplicationError> actualErrors;

    @Before
    public void setup() {
        try {
            applicationForCertifiedCopy = BootstrapDataUtils.createApplicationForCertifiedCopy();
        } catch (IOException | NoSuchAlgorithmException e) {
            log.error(e.getMessage(), e);
        }
        validationParams = new EnumMap<>(ValidationParamKey.class);
    }

    @Test
    public void testWithAttorneyApplicantTypeAndPowerOFAttorneyAttachedDocumentType() {
        applicationForCertifiedCopy.getContactData().getAddress().setStreet(null);
        applicationForCertifiedCopy.getContactData().getAddress().setStreetNumber(null);

        applicationForCertifiedCopy.getApplicantData().setApplicantType(ApplicantData.ApplicantTypeNomenclature.ATTORNEY);

        AttachedDocument powerOfAttorneyDocument = new AttachedDocument();
        DocumentFileMetadata metadata = new DocumentFileMetadata();
        metadata.setSize(5L);
        powerOfAttorneyDocument.setDocumentFileMetadata(metadata);
        DocumentType documentType = new DocumentType();
        documentType.setId("20001100000000002021");
        powerOfAttorneyDocument.setDocumentType(documentType);
        applicationForCertifiedCopy.getAttachedDocuments().add(powerOfAttorneyDocument);

        validationParams.put(ValidationParamKey.VALIDATE_FOR_SECTION_APPLICANT_DATA, true);
        actualErrors = applicationForCertifiedCopyValidator.validate(applicationForCertifiedCopy, validationParams);

        int expected = 0;
        int actual = actualErrors.size();
        assertEquals(expected, actual);
    }

    @Test
    public void testWithAttorneyApplicantTypeAndNoAttachedDocuments() {
        applicationForCertifiedCopy.getContactData().getAddress().setStreet(null);
        applicationForCertifiedCopy.getContactData().getAddress().setStreetNumber(null);

        applicationForCertifiedCopy.getApplicantData().setApplicantType(ApplicantData.ApplicantTypeNomenclature.ATTORNEY);

        validationParams.put(ValidationParamKey.VALIDATE_FOR_SECTION_APPLICANT_DATA, true);
        actualErrors = applicationForCertifiedCopyValidator.validate(applicationForCertifiedCopy, validationParams);

        int expected = 1;
        int actual = actualErrors.size();
        assertEquals(expected, actual);

        List<String> errorCodes = getAsStringCodeList();

        assertTrue(errorCodes.contains("PR_APP_00011_E"));
    }

    private List<String> getAsStringCodeList() {
        return actualErrors
            .stream()
            .map(ApplicationError::getCode)
            .collect(Collectors.toList());
    }

}
