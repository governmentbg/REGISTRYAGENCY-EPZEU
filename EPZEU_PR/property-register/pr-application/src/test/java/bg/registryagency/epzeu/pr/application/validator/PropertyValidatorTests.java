package bg.registryagency.epzeu.pr.application.validator;

import bg.registryagency.epzeu.pr.application.BootstrapDataUtils;
import bg.registryagency.epzeu.pr.application.conf.ValidatorsTestConfiguration;
import bg.registryagency.epzeu.pr.application.segment.Property;
import bg.registryagency.epzeu.pr.integration.cache.PlaceNomenclatureCache;
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
public class PropertyValidatorTests {

    @Autowired
    private Validator propertyValidator;
    @Autowired
    private PlaceNomenclatureCache placeNomenclatureCache;
    private Property property;
    private Map<ValidationParamKey, Object> validationParams;
    private List<ApplicationError> actualErrors;

    @Before
    public void setup() {
        property = BootstrapDataUtils.createProperty();
        validationParams = new EnumMap<>(ValidationParamKey.class);
        actualErrors = new ArrayList<>();
    }

    @Test
    public void testPropertyWithValidParams() {
        actualErrors = propertyValidator.validate(property, validationParams);

        int expected = 0;
        int actual = actualErrors.size();
        assertEquals(expected, actual);
    }

    @Test
    public void testWithAllInvalidParams() {
        Property emptyProperty = new Property();
        actualErrors = propertyValidator.validate(emptyProperty, validationParams);

        int expected = 4;
        int actual = actualErrors.size();
        assertEquals(expected, actual);

        List<String> errorCodes = getAsStringCodeList();

        assertTrue(errorCodes.contains("PR_APP_00040_E"));
        assertTrue(errorCodes.contains("PR_APP_00041_E"));
        assertTrue(errorCodes.contains("PR_APP_00042_E"));
        assertTrue(errorCodes.contains("PR_APP_00043_E"));
    }

    @Test
    public void testWithInvalidCadastralId() {
        property.setCadastralId("invalidCadastralId");
        actualErrors = propertyValidator.validate(property, validationParams);

        int expected = 1;
        int actual = actualErrors.size();
        assertEquals(expected, actual);

        List<String> errorCodes = getAsStringCodeList();

        assertTrue(errorCodes.contains("PR_APP_00066_E"));
    }

    @Test
    public void testWithInvalidAccountNumber() {
        property.setAccountNumber("123test123");
        actualErrors = propertyValidator.validate(property, validationParams);

        int expected = 1;
        int actual = actualErrors.size();
        assertEquals(expected, actual);

        List<String> errorCodes = getAsStringCodeList();

        assertTrue(errorCodes.contains("GL_INPUT_DIGIT_VALUE_E"));
    }

    @Test
    public void testPropertyWithInvalidCadastralIdForCurrentSettlement() {
        property.setCadastralId("68135.4090.488.2.84");

        actualErrors = propertyValidator.validate(property, validationParams);

        int expected = 1;
        int actual = actualErrors.size();
        assertEquals(expected, actual);

        List<String> errorCodes = getAsStringCodeList();

        assertTrue(errorCodes.contains("PR_APP_00085_E"));
    }

    @Test
    public void testWithDeletedPlaceNomenclatureAndPropertyNomenclatureValue() {
        placeNomenclatureCache.asMap().remove("10000800000000014665");

        validationParams.put(ValidationParamKey.VALIDATE_NOMENCLATURE_CHANGES, true);

        actualErrors = propertyValidator.validate(property, validationParams);

        int expected = 4;
        int actual = actualErrors.size();
        assertEquals(expected, actual);

        List<String> errorCodes = getAsStringCodeList();

        long expectedEqualsErrorsCount = 2;

        long actualEqualsErrorsCount = errorCodes.stream().filter(e -> e.equals("PR_APP_FOR_CORR_CHANGED_NOMENCLATURES_I")).count();

        assertEquals(expectedEqualsErrorsCount, actualEqualsErrorsCount);
        assertTrue(errorCodes.contains("PR_APP_00041_E"));
        assertTrue(errorCodes.contains("PR_APP_00040_E"));
    }

    private List<String> getAsStringCodeList() {
        return actualErrors
            .stream()
            .map(ApplicationError::getCode)
            .collect(Collectors.toList());
    }
}
