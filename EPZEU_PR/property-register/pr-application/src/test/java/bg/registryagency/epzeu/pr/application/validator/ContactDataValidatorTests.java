package bg.registryagency.epzeu.pr.application.validator;

import bg.registryagency.epzeu.pr.application.BootstrapDataUtils;
import bg.registryagency.epzeu.pr.application.conf.ValidatorsTestConfiguration;
import bg.registryagency.epzeu.pr.application.segment.Address;
import bg.registryagency.epzeu.pr.application.segment.ContactData;
import bg.registryagency.epzeu.pr.integration.cache.EkatteSettlementNomenclatureCache;
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
public class ContactDataValidatorTests {

    @Autowired
    private Validator contactDataValidator;
    @Autowired
    private EkatteSettlementNomenclatureCache ekatteSettlementNomenclatureCache;
    private ContactData contactData;
    private Map<ValidationParamKey, Object> validationParams;
    private List<ApplicationError> actualErrors;

    @Before
    public void setup() {
        contactData = BootstrapDataUtils.createContactData();
        validationParams = new EnumMap<>(ValidationParamKey.class);
        actualErrors = new ArrayList<>();
    }

    @Test
    public void testAllWithValidParamsWithEmptyAddress() {

        Address address = new Address();

        contactData.setAddress(address);

        actualErrors = contactDataValidator.validate(contactData, validationParams);

        int expected = 0;
        int actual = actualErrors.size();
        assertEquals(expected, actual);
    }

    @Test
    public void testWithInvalidEmailAndPhone() {
        contactData.setPhone(null);
        contactData.setAppEmailAddress(null);
        Address address = new Address();
        contactData.setAddress(address);

        actualErrors = contactDataValidator.validate(contactData, validationParams);

        int expected = 2;
        int actual = actualErrors.size();
        assertEquals(expected, actual);

        List<String> errorCodes = getAsStringCodeList();

        assertTrue(errorCodes.contains("PR_INPUT_PHONE_NUMBER_E"));
        assertTrue(errorCodes.contains("GL_INPUT_VALID_EMAIL_E"));
    }

    @Test
    public void testWithInvalidAddressWithAllFields() {
        actualErrors = contactDataValidator.validate(contactData, validationParams);

        int expected = 1;
        int actual = actualErrors.size();
        assertEquals(expected, actual);

        List<String> errorCodes = getAsStringCodeList();

        assertTrue(errorCodes.contains("PR_APP_00010_E"));
    }

    @Test
    public void testWithFirstValidCaseForAddressInsertion() {
        contactData.getAddress().setStreet(null);
        contactData.getAddress().setStreetNumber(null);

        actualErrors = contactDataValidator.validate(contactData, validationParams);

        int expected = 0;
        int actual = actualErrors.size();
        assertEquals(expected, actual);
    }

    @Test
    public void testWithSecondValidCaseForAddressInsertion() {
        contactData.getAddress().setHousingEstate(null);
        contactData.getAddress().setBlock(null);

        actualErrors = contactDataValidator.validate(contactData, validationParams);

        int expected = 0;
        int actual = actualErrors.size();
        assertEquals(expected, actual);
    }

    @Test
    public void testWithValidCaseWithInvalidArea() {
        contactData.getAddress().setStreet(null);
        contactData.getAddress().setStreetNumber(null);
        contactData.getAddress().getArea().setCode("invalidArea");

        actualErrors = contactDataValidator.validate(contactData, validationParams);

        int expected = 1;
        int actual = actualErrors.size();
        assertEquals(expected, actual);

        List<String> errorCodes = getAsStringCodeList();

        assertTrue(errorCodes.contains("PR_APP_00010_E"));
    }

    @Test
    public void testWithValidCaseWithSettlementWithoutArea() {
        contactData.getAddress().setStreet(null);
        contactData.getAddress().setStreetNumber(null);
        contactData.getAddress().getSettlement().setCode("56252");

        actualErrors = contactDataValidator.validate(contactData, validationParams);

        int expected = 0;
        int actual = actualErrors.size();
        assertEquals(expected, actual);
    }

    @Test
    public void testWithDeletedSettlementNomenclatureValue() {
        ekatteSettlementNomenclatureCache.asMap().remove("10135");

        validationParams.put(ValidationParamKey.VALIDATE_NOMENCLATURE_CHANGES, true);

        actualErrors = contactDataValidator.validate(contactData, validationParams);
        int expected = 3;
        int actual = actualErrors.size();
        assertEquals(expected, actual);

        List<String> errorCodes = getAsStringCodeList();

        long expectedEqualsErrorsCount = 2;
        long actualEqualsErrorsCount = errorCodes.stream().filter(e -> e.equals("PR_APP_00010_E")).count();

        assertTrue(errorCodes.contains("PR_APP_FOR_CORR_CHANGED_NOMENCLATURES_I"));
        assertEquals(expectedEqualsErrorsCount, actualEqualsErrorsCount);
    }

    private List<String> getAsStringCodeList() {
        return actualErrors
            .stream()
            .map(ApplicationError::getCode)
            .collect(Collectors.toList());
    }
}
