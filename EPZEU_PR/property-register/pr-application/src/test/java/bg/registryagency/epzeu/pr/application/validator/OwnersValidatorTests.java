package bg.registryagency.epzeu.pr.application.validator;

import bg.registryagency.epzeu.pr.application.BootstrapDataUtils;
import bg.registryagency.epzeu.pr.application.conf.ValidatorsTestConfiguration;
import bg.registryagency.epzeu.pr.application.segment.Owners;
import bg.registryagency.epzeu.pr.integration.cache.CountriesCache;
import bg.registryagency.epzeu.pr.integration.cache.EkatteSettlementNomenclatureCache;
import bg.registryagency.epzeu.pr.integration.cache.PlaceNomenclatureCache;
import bg.registryagency.epzeu.pr.integration.cache.RegistryOfficeNomenclatureCache;
import bg.registryagency.epzeu.pr.integration.epzeu.dto.CountryDto;
import bg.registryagency.epzeu.pr.integration.epzeu.dto.EkatteDto;
import bg.registryagency.epzeu.pr.integration.pr.dto.PlaceNomenclaturePrDto;
import bg.registryagency.epzeu.pr.integration.pr.dto.RegistryOfficeDto;
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
public class OwnersValidatorTests {

    @Autowired
    private Validator ownersValidator;
    @Autowired
    RegistryOfficeNomenclatureCache registryOfficeNomenclatureCache;
    @Autowired
    CountriesCache countriesCache;
    @Autowired
    PlaceNomenclatureCache placeNomenclatureCache;
    @Autowired
    EkatteSettlementNomenclatureCache ekatteSettlementNomenclatureCache;
    private Owners owners;
    private Map<ValidationParamKey, Object> validationParams;
    private List<ApplicationError> actualErrors;

    @Before
    public void setup() {
        owners = BootstrapDataUtils.createOwners();
        validationParams = new EnumMap<>(ValidationParamKey.class);
        actualErrors = new ArrayList<>();
        validationParams.put(ValidationParamKey.VALIDATE_FOR_SECTION_APPLICANT_DATA, false);

        RegistryOfficeDto registryOfficeDto = new RegistryOfficeDto();
        registryOfficeDto.setName("София");
        registryOfficeNomenclatureCache.put("10000900000000015838", registryOfficeDto);

        CountryDto countryDto = new CountryDto();
        countryDto.setName("БЪЛГАРИЯ");
        countriesCache.put((short)100, countryDto);

        PlaceNomenclaturePrDto settlement = new PlaceNomenclaturePrDto();
        settlement.setEkatte(68134);
        placeNomenclatureCache.put("10000800000000014665", settlement);

        EkatteDto validSettlementTestDto = new EkatteDto();
        validSettlementTestDto.setId(1234);
        ekatteSettlementNomenclatureCache.put("10135", validSettlementTestDto);
    }

    //if we wanna test for previous owners, we set into the map
    //validationParams.put(ValidationParamKey.VALIDATE_FOR_PREVIOUS_OWNERS, true);

    @Test
    public void testWithValidParamsForCurrentOwner() {
        validationParams.put(ValidationParamKey.VALIDATE_FOR_PREVIOUS_OWNERS, false);
        actualErrors = ownersValidator.validate(owners, validationParams);

        int expected = 0;
        int actual = actualErrors.size();
        assertEquals(expected, actual);
    }

    @Test
    public void testWithTwoPersonsForIndividualOneWithEmptyFieldsForCurrentOwner() {
        owners.getPersons().get(0).getIndividual().setPersonNationality(null);
        owners.getPersons().get(0).getIndividual().setName(null);
        owners.getPersons().get(0).getIndividual().setIdentity(null);

        validationParams.put(ValidationParamKey.VALIDATE_FOR_PREVIOUS_OWNERS, false);
        actualErrors = ownersValidator.validate(owners, validationParams);

        List<String> errorCodes = getAsStringCodeList();

        int expected = 4;
        int actual = actualErrors.size();
        assertEquals(expected, actual);

        assertTrue(errorCodes.contains("PR_APP_00108_E"));
        assertTrue(errorCodes.contains("PR_INPUT_PERSON_NATIONALITY_E"));
        assertTrue(errorCodes.contains("GL_INPUT_PERSON_FIRSTNAME_E"));
        assertTrue(errorCodes.contains("GL_INPUT_PERSON_FAMILYNAME_E"));
    }

    @Test
    public void testWithSingleParamForBothListsForCurrentOwner() {
        owners.getPersons().remove(0);
        owners.getPersons().get(0).setIndividual(null);
        owners.getPersons().get(0).setLegalEntity(null);

        owners.getPropertyDocuments().remove(0);
        owners.getPropertyDocuments().get(0).setType(null);

        validationParams.put(ValidationParamKey.VALIDATE_FOR_PREVIOUS_OWNERS, false);
        validationParams.put(ValidationParamKey.IS_SINGLE_DOCUMENT, true);
        actualErrors = ownersValidator.validate(owners, validationParams);

        int expected = 2;
        int actual = actualErrors.size();
        assertEquals(expected, actual);

        List<String> errorCodes = getAsStringCodeList();

        assertTrue(errorCodes.contains("PR_APP_00107_E"));
        assertTrue(errorCodes.contains("PR_APP_00058_E"));
    }

    @Test
    public void testWithTwoEmptyParamsInPersonForCurrentOwner() {
        owners.getPersons().get(0).setIndividual(null);
        owners.getPersons().get(1).setIndividual(null);

        validationParams.put(ValidationParamKey.VALIDATE_FOR_PREVIOUS_OWNERS, false);
        actualErrors = ownersValidator.validate(owners, validationParams);

        int expected = 2;
        int actual = actualErrors.size();
        assertEquals(expected, actual);

        List<String> errorCodes = getAsStringCodeList();

        assertTrue(errorCodes.contains("PR_APP_00108_E"));
    }

    @Test
    public void testWithTwoEmptyParamsInPropertyDocumentsForCurrentOwner() {
        owners.getPropertyDocuments().get(0).setType(null);
        owners.getPropertyDocuments().get(1).setType(null);

        validationParams.put(ValidationParamKey.VALIDATE_FOR_PREVIOUS_OWNERS, false);
        actualErrors = ownersValidator.validate(owners, validationParams);

        int expected = 2;
        int actual = actualErrors.size();
        List<String> errorCodes = getAsStringCodeList();

        assertEquals(expected, actual);

        assertTrue(errorCodes.contains("PR_APP_00108_E"));
    }

    @Test
    public void testWithTwoEmptyParamsForEachListForCurrentOwner() {
        owners.getPersons().get(0).setIndividual(null);
        owners.getPersons().get(1).setIndividual(null);
        owners.getPropertyDocuments().get(0).setType(null);
        owners.getPropertyDocuments().get(1).setType(null);

        validationParams.put(ValidationParamKey.VALIDATE_FOR_PREVIOUS_OWNERS, false);
        validationParams.put(ValidationParamKey.IS_SINGLE_DOCUMENT, false);
        actualErrors = ownersValidator.validate(owners, validationParams);

        int expected = 4;
        int actual = actualErrors.size();
        assertEquals(expected, actual);

        List<String> errorCodes = getAsStringCodeList();

        assertTrue(errorCodes.contains("PR_APP_00108_E"));
    }



    @Test
    public void testWithTwoPropertyDocumentsOneWithEmptyFieldsForCurrentOwner() {
        owners.getPropertyDocuments().get(1).setDescription(null);

        validationParams.put(ValidationParamKey.VALIDATE_FOR_PREVIOUS_OWNERS, false);
        actualErrors = ownersValidator.validate(owners, validationParams);

        List<String> errorCodes = getAsStringCodeList();

        int expected = 2;
        int actual = actualErrors.size();
        assertEquals(expected, actual);

        assertTrue(errorCodes.contains("PR_APP_00045_E"));
        assertTrue(errorCodes.contains("PR_APP_00108_E"));
    }

    @Test
    public void testWithSinglePropertyDocumentWithEmptyFieldsForCurrentOwner() {
        owners.getPropertyDocuments().remove(1);
        owners.getPropertyDocuments().get(0).setActNumber(null);
        owners.getPropertyDocuments().get(0).setIncomingRegisterNumber(null);
        owners.getPropertyDocuments().get(0).setVolume(null);

        validationParams.put(ValidationParamKey.VALIDATE_FOR_PREVIOUS_OWNERS, false);
        actualErrors = ownersValidator.validate(owners, validationParams);

        List<String> errorCodes = getAsStringCodeList();

        int expected = 4;
        int actual = actualErrors.size();
        assertEquals(expected, actual);

        assertTrue(errorCodes.contains("GL_INPUT_DIGIT_VALUE_E"));
        assertTrue(errorCodes.contains("PR_APP_00095_E"));
    }

    @Test
    public void testForPreviousOwnerWithEmptyFields() {
        Owners emptyOwners = new Owners();

        validationParams.put(ValidationParamKey.VALIDATE_FOR_PREVIOUS_OWNERS, true);
        actualErrors = ownersValidator.validate(emptyOwners, validationParams);

        int expected = 0;
        int actual = actualErrors.size();
        assertEquals(expected, actual);
    }

    @Test
    public void testForTwoIndividualPersonsWithEqualEGN() {
        owners.getPersons().get(0).getIndividual().getIdentity().setEgn("9944309995");
        owners.getPersons().get(1).getIndividual().getIdentity().setEgn("9944309995");

        validationParams.put(ValidationParamKey.VALIDATE_FOR_PREVIOUS_OWNERS, false);
        actualErrors = ownersValidator.validate(owners, validationParams);

        int expected = 1;
        int actual = actualErrors.size();
        assertEquals(expected, actual);

        List<String> errorCodes = getAsStringCodeList();

        assertTrue(errorCodes.contains("PR_APP_00100_E"));
    }

    @Test
    public void testForTwoIndividualPersonsWithEqualLNCH() {
        owners.getPersons().get(0).getIndividual().getIdentity().setLnch("0000000011");
        owners.getPersons().get(1).getIndividual().getIdentity().setLnch("0000000011");

        validationParams.put(ValidationParamKey.VALIDATE_FOR_PREVIOUS_OWNERS, false);
        actualErrors = ownersValidator.validate(owners, validationParams);

        int expected = 1;
        int actual = actualErrors.size();
        assertEquals(expected, actual);

        List<String> errorCodes = getAsStringCodeList();

        assertTrue(errorCodes.contains("PR_APP_00100_E"));
    }

    @Test
    public void testForTwoIndividualPersonsWithEqualBulstat() {
        owners.getPersons().get(0).getIndividual().setBulstat("119044990");
        owners.getPersons().get(1).getIndividual().setBulstat("119044990");

        validationParams.put(ValidationParamKey.VALIDATE_FOR_PREVIOUS_OWNERS, false);
        actualErrors = ownersValidator.validate(owners, validationParams);

        int expected = 1;
        int actual = actualErrors.size();
        assertEquals(expected, actual);

        List<String> errorCodes = getAsStringCodeList();

        assertTrue(errorCodes.contains("PR_APP_00100_E"));
    }

    @Test
    public void testForTwoLegalEntityPersonsWithEqualBulstat() {
        owners.getPersons().get(0).setIndividual(null);
        owners.getPersons().get(1).setIndividual(null);

        owners.getPersons().get(0).setLegalEntity(BootstrapDataUtils.createLegalEntity());
        owners.getPersons().get(1).setLegalEntity(BootstrapDataUtils.createLegalEntity());

        owners.getPersons().get(0).getLegalEntity().setLegalEntityNumber("119044990");
        owners.getPersons().get(1).getLegalEntity().setLegalEntityNumber("119044990");

        validationParams.put(ValidationParamKey.VALIDATE_FOR_PREVIOUS_OWNERS, false);
        actualErrors = ownersValidator.validate(owners, validationParams);

        int expected = 1;
        int actual = actualErrors.size();
        assertEquals(expected, actual);

        List<String> errorCodes = getAsStringCodeList();

        assertTrue(errorCodes.contains("PR_APP_00103_E"));
    }


    private List<String> getAsStringCodeList() {
        return actualErrors
            .stream()
            .map(ApplicationError::getCode)
            .collect(Collectors.toList());
    }
}
