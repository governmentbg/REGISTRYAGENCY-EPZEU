package bg.registryagency.epzeu.pr.application.validator;

import bg.registryagency.epzeu.pr.application.BootstrapDataUtils;
import bg.registryagency.epzeu.pr.application.conf.ValidatorsTestConfiguration;
import bg.registryagency.epzeu.pr.application.segment.LegalEntity;
import bg.registryagency.epzeu.pr.integration.cache.CountriesCache;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.*;
import java.util.stream.Collectors;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = ValidatorsTestConfiguration.class)
public class LegalEntityValidatorTests {

    @Autowired
    private Validator legalEntityValidator;
    @Autowired
    private CountriesCache countriesCache;
    private LegalEntity legalEntity;
    private Map<ValidationParamKey, Object> validationParams;
    private List<ApplicationError> actualErrors;

    @Before
    public void setup() {
        legalEntity = BootstrapDataUtils.createLegalEntity();
        validationParams = new EnumMap<>(ValidationParamKey.class);
        actualErrors = new ArrayList<>();
    }

    @Test
    public void testLegalEntityWithValidParams() {
        actualErrors = legalEntityValidator.validate(legalEntity, validationParams);

        int expected = 0;
        int actual = actualErrors.size();
        assertEquals(expected, actual);
    }

    @Test
    public void testAllWithEmptyStringParams() {
        legalEntity.getCountry().setName("");
        legalEntity.setCompanyName("");

        actualErrors = legalEntityValidator.validate(legalEntity, validationParams);

        int expected = 2;
        int actual = actualErrors.size();
        assertEquals(expected, actual);

        List<String> errorCodes = getAsStringCodeList();

        assertTrue(errorCodes.contains("PR_INPUT_COUNTRY_E"));
        assertTrue(errorCodes.contains("PR_APP_INPUT_COMPANY_NAME_E"));
    }

    @Test
    public void testWithEmptyCompanyCaseFields() {
        legalEntity.getCompanyCase().setNumber(null);
        legalEntity.getCompanyCase().setRegistrationCourt(null);
        legalEntity.getCompanyCase().setYear(null);

        actualErrors = legalEntityValidator.validate(legalEntity, validationParams);

        int expected = 0;
        int actual = actualErrors.size();
        assertEquals(expected, actual);
    }

    @Test
    public void testWithEmptyLegalEntityNumber() {
        legalEntity.setLegalEntityNumber(null);

        actualErrors = legalEntityValidator.validate(legalEntity, validationParams);

        int expected = 0;
        int actual = actualErrors.size();
        assertEquals(expected, actual);
    }

    @Test
    public void testWithInvalidYearOfCompanyCase() {
        legalEntity.getCompanyCase().setYear((short)123);

        actualErrors = legalEntityValidator.validate(legalEntity, validationParams);

        int expected = 1;
        int actual = actualErrors.size();
        assertEquals(expected, actual);

        List<String> errorCodes = getAsStringCodeList();

        assertTrue(errorCodes.contains("GL_INPUT_YEAR_VALUE_E"));
    }

    @Test
    public void testWithInvalidCompanyCaseAndLegalEntityNumber() {
        legalEntity.setLegalEntityNumber(null);
        legalEntity.setCompanyCase(null);

        actualErrors = legalEntityValidator.validate(legalEntity, validationParams);

        int expected = 1;
        int actual = actualErrors.size();
        assertEquals(expected, actual);

        List<String> errorCodes = getAsStringCodeList();

        assertTrue(errorCodes.contains("PR_APP_INPUT_00001_E"));
    }

    @Test
    public void testWithEmptyCompanyName() {
        legalEntity.setCompanyName("");

        actualErrors = legalEntityValidator.validate(legalEntity, validationParams);

        int expected = 1;
        int actual = actualErrors.size();
        assertEquals(expected, actual);

        List<String> errorCodes = getAsStringCodeList();

        assertTrue(errorCodes.contains("PR_APP_INPUT_COMPANY_NAME_E"));
    }

    @Test
    public void testWithDeletedCountriesNomenclatureValue() {
        countriesCache.asMap().remove((short)100);

        validationParams.put(ValidationParamKey.VALIDATE_NOMENCLATURE_CHANGES, true);

        actualErrors = legalEntityValidator.validate(legalEntity, validationParams);
        int expected = 2;
        int actual = actualErrors.size();
        assertEquals(expected, actual);

        List<String> errorCodes = getAsStringCodeList();

        assertTrue(errorCodes.contains("PR_APP_FOR_CORR_CHANGED_NOMENCLATURES_I"));
        assertTrue(errorCodes.contains("PR_INPUT_COUNTRY_E"));
    }

    private List<String> getAsStringCodeList() {
        return actualErrors
            .stream()
            .map(ApplicationError::getCode)
            .collect(Collectors.toList());
    }
}
