package bg.registryagency.epzeu.pr.application.validator;

import bg.registryagency.epzeu.pr.application.BootstrapDataUtils;
import bg.registryagency.epzeu.pr.application.conf.ValidatorsTestConfiguration;
import bg.registryagency.epzeu.pr.application.segment.Identity;
import bg.registryagency.epzeu.pr.application.segment.Individual;

import bg.registryagency.epzeu.pr.application.segment.Name;
import bg.registryagency.epzeu.pr.integration.cache.CountriesCache;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.*;
import java.util.stream.Collectors;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = ValidatorsTestConfiguration.class)
public class IndividualValidatorTests {

    @Autowired
    private Validator individualValidator;
    @Autowired
    private CountriesCache countriesCache;
    private Individual individual;
    private Map<ValidationParamKey, Object> validationParams;
    private List<ApplicationError> actualErrors;

    @Before
    public void setup() {
        individual = BootstrapDataUtils.createIndividual();
        validationParams = new EnumMap<>(ValidationParamKey.class);
        actualErrors = new ArrayList<>();
    }
    //TODO add tests for bulstat with country Bulgaria, if such an error is created
    @Test
    public void testApplicantDataWithValidParams(){
        validationParams.put(ValidationParamKey.VALIDATE_FOR_SECTION_APPLICANT_DATA, true);
        actualErrors = individualValidator.validate(individual, validationParams);

        int expected = 0;
        int actual = actualErrors.size();
        assertEquals(expected, actual);
    }

    @Test
    public void testApplicantDataWithAllInvalidParams() {
        individual.setIdentity(null);
        individual.setPersonNationality(null);
        individual.setBirthPlace(null);
        individual.setName(null);
        individual.setBulstat(null);

        validationParams.put(ValidationParamKey.VALIDATE_FOR_SECTION_APPLICANT_DATA, true);
        actualErrors = individualValidator.validate(individual, validationParams);

        int expected = 4;
        int actual = actualErrors.size();
        assertEquals(expected, actual);

        List<String> errorCodes = getAsStringCodeList();

        assertTrue(errorCodes.contains("PR_INPUT_PERSON_NATIONALITY_E"));
        assertTrue(errorCodes.contains("GL_INPUT_PERSON_ID_BIRTHDATE_E"));
        assertTrue(errorCodes.contains("GL_INPUT_PERSON_FIRSTNAME_E"));
        assertTrue(errorCodes.contains("GL_INPUT_PERSON_FIRSTNAME_E"));
    }

    @Test
    public void testPersonWithAllInvalidParams() {
        individual.setIdentity(null);
        individual.setPersonNationality(null);
        individual.setBirthPlace(null);
        individual.setName(null);
        individual.setBulstat(null);

        validationParams.put(ValidationParamKey.VALIDATE_FOR_SECTION_APPLICANT_DATA, false);
        actualErrors = individualValidator.validate(individual, validationParams);

        int expected = 4;
        int actual = actualErrors.size();
        assertEquals(expected, actual);

        List<String> errorCodes = getAsStringCodeList();

        assertTrue(errorCodes.contains("PR_INPUT_PERSON_NATIONALITY_E"));
        assertTrue(errorCodes.contains("GL_INPUT_PERSON_ID_BIRTHDATE_E"));
        assertTrue(errorCodes.contains("GL_INPUT_PERSON_FIRSTNAME_E"));
        assertTrue(errorCodes.contains("GL_INPUT_PERSON_FIRSTNAME_E"));
    }

    @Test
    public void testWithInvalidNationality() {
        individual.getPersonNationality().setName("");

        validationParams.put(ValidationParamKey.VALIDATE_FOR_SECTION_APPLICANT_DATA, true);
        actualErrors = individualValidator.validate(individual, validationParams);

        int expected = 1;
        int actual = actualErrors.size();
        assertEquals(expected, actual);

        List<String> errorCodes = getAsStringCodeList();

        assertTrue(errorCodes.contains("PR_INPUT_PERSON_NATIONALITY_E"));
    }

    @Test
    public void testWithEmptyIdentity() {
        Identity identity = new Identity();
        individual.setIdentity(identity);

        validationParams.put(ValidationParamKey.VALIDATE_FOR_SECTION_APPLICANT_DATA, true);
        actualErrors = individualValidator.validate(individual, validationParams);

        int expected = 1;
        int actual = actualErrors.size();
        assertEquals(expected, actual);

        List<String> errorCodes = getAsStringCodeList();

        assertTrue(errorCodes.contains("GL_INPUT_PERSON_ID_BIRTHDATE_E"));
    }

    @Test
    public void testWithInvalidIdentity(){
        individual.getIdentity().setBirthDate(null);
        individual.getIdentity().setEgn("1234");

        validationParams.put(ValidationParamKey.VALIDATE_FOR_SECTION_APPLICANT_DATA, true);
        actualErrors = individualValidator.validate(individual, validationParams);

        int expected = 1;
        int actual = actualErrors.size();
        assertEquals(expected, actual);

        List<String> errorCodes = getAsStringCodeList();

        assertTrue(errorCodes.contains("GL_INVALID_IDENTIFIER_E"));
    }

    @Test
    public void testWithEmptyName() {
        Name name = new Name();
        individual.setName(name);

        validationParams.put(ValidationParamKey.VALIDATE_FOR_SECTION_APPLICANT_DATA, true);
        actualErrors = individualValidator.validate(individual, validationParams);

        int expected = 2;
        int actual = actualErrors.size();
        assertEquals(expected, actual);

        List<String> errorCodes = getAsStringCodeList();

        assertTrue(errorCodes.contains("GL_INPUT_PERSON_FIRSTNAME_E"));
        assertTrue(errorCodes.contains("GL_INPUT_PERSON_FAMILYNAME_E"));
    }

    @Test
    public void testWithInvalidFirstNameWithNationalityBulgaria() {
        individual.getName().setFirstName("");

        validationParams.put(ValidationParamKey.VALIDATE_FOR_SECTION_APPLICANT_DATA, true);
        actualErrors = individualValidator.validate(individual, validationParams);

        int expected = 1;
        int actual = actualErrors.size();
        assertEquals(expected, actual);

        List<String> errorCodes = getAsStringCodeList();

        assertTrue(errorCodes.contains("GL_INPUT_PERSON_FIRSTNAME_E"));
    }

    @Test
    public void testWithInvalidFamilyNameWithNationalityBulgaria() {
        individual.getName().setFamilyName("");

        validationParams.put(ValidationParamKey.VALIDATE_FOR_SECTION_APPLICANT_DATA, true);
        actualErrors = individualValidator.validate(individual, validationParams);

        int expected = 1;
        int actual = actualErrors.size();
        assertEquals(expected, actual);

        List<String> errorCodes = getAsStringCodeList();

        assertTrue(errorCodes.contains("GL_INPUT_PERSON_FAMILYNAME_E"));
    }

    @Test
    public void testNamesWithLatinLettersWithNationalityBulgaria() {
        individual.getName().setFirstName("test");
        individual.getName().setFamilyName("test");

        validationParams.put(ValidationParamKey.VALIDATE_FOR_SECTION_APPLICANT_DATA, true);
        actualErrors = individualValidator.validate(individual, validationParams);

        int expected = 2;
        int actual = actualErrors.size();
        assertEquals(expected, actual);

        List<String> errorCodes = getAsStringCodeList();

        assertTrue(errorCodes.contains("GL_INPUT_CORRECT_NAME_E"));
    }

    @Test
    public void testNamesWithLatinLettersWithCountryGermany() {
        individual.getName().setFirstName("test");
        individual.getName().setFamilyName("Тест");

        validationParams.put(ValidationParamKey.VALIDATE_FOR_SECTION_APPLICANT_DATA, true);
        actualErrors = individualValidator.validate(individual, validationParams);

        int expected = 1;
        int actual = actualErrors.size();
        assertEquals(expected, actual);

        List<String> errorCodes = getAsStringCodeList();

        assertTrue(errorCodes.contains("GL_INPUT_CORRECT_NAME_E"));
    }

    @Test
    public void testForApplicantDataWithDateOfBirthWithEmptyBirthPlace() {

        individual.getBirthPlace().setPlaceName("");
        individual.getBirthPlace().setCountryName("");

        validationParams.put(ValidationParamKey.VALIDATE_FOR_SECTION_APPLICANT_DATA, true);
        actualErrors = individualValidator.validate(individual, validationParams);

        int expected = 1;
        int actual = actualErrors.size();
        assertEquals(expected, actual);

        List<String> errorCodes = getAsStringCodeList();

        assertTrue(errorCodes.contains("PR_APP_INPUT_BIRTHPLACE_E"));
    }

    @Test
    public void testWithDeletedCountriesNomenclatureValue() {
        countriesCache.asMap().remove((short)100);

        validationParams.put(ValidationParamKey.VALIDATE_NOMENCLATURE_CHANGES, true);

        actualErrors = individualValidator.validate(individual, validationParams);
        int expected = 2;
        int actual = actualErrors.size();
        assertEquals(expected, actual);

        List<String> errorCodes = getAsStringCodeList();

        assertTrue(errorCodes.contains("PR_APP_FOR_CORR_CHANGED_NOMENCLATURES_I"));
        assertTrue(errorCodes.contains("PR_INPUT_PERSON_NATIONALITY_E"));
    }

    private List<String> getAsStringCodeList() {
        return actualErrors
            .stream()
            .map(ApplicationError::getCode)
            .collect(Collectors.toList());
    }
}
