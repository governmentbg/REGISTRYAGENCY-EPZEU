package bg.registryagency.epzeu.pr.application.validator;

import bg.registryagency.epzeu.pr.application.ApplicationType;
import bg.registryagency.epzeu.pr.application.BootstrapDataUtils;
import bg.registryagency.epzeu.pr.application.conf.ValidatorsTestConfiguration;
import bg.registryagency.epzeu.pr.application.segment.WayOfProvision;
import bg.registryagency.epzeu.pr.integration.cache.RegistryOfficeNomenclatureCache;
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
public class WayOfProvisionValidatorTests {

    @Autowired
    private Validator wayOfProvisionValidator;
    @Autowired
    private RegistryOfficeNomenclatureCache registryOfficeNomenclatureCache;
    private WayOfProvision wayOfProvision;
    private Map<ValidationParamKey, Object> validationParams;
    private List<ApplicationError> actualErrors;

    @Before
    public void setup() {
        wayOfProvision = BootstrapDataUtils.createWayOfProvision();
        validationParams = new EnumMap<>(ValidationParamKey.class);
        actualErrors = new ArrayList<>();
        validationParams.put(ValidationParamKey.APPLICATION_TYPE, ApplicationType.APPLICATION_CERTIFICATE_PERSON);

        RegistryOfficeDto registryOfficeDto = new RegistryOfficeDto();
        registryOfficeDto.setName("София");
        registryOfficeNomenclatureCache.put("10000900000000015838", registryOfficeDto);
    }

    @Test
    public void testAllWithValidParams() {
        actualErrors = wayOfProvisionValidator.validate(wayOfProvision, validationParams);

        int expected = 0;
        int actual = actualErrors.size();
        assertEquals(expected, actual);
    }

    @Test
    public void testAllWithInvalidParams() {
        WayOfProvision wayOfProvision = new WayOfProvision();

        actualErrors = wayOfProvisionValidator.validate(wayOfProvision, validationParams);

        int expected = 3;
        int actual = actualErrors.size();
        assertEquals(expected, actual);

        List<String> errorCodes = getAsStringCodeList();

        assertTrue(errorCodes.contains("PR_INPUT_ISSUING_AUTHORITY_E"));
        assertTrue(errorCodes.contains("PR_APP_00088_E"));
        assertTrue(errorCodes.contains("PR_INCORR_CNFG_SERVICE_TYPE_E"));
    }

    @Test
    public void testDeliveryMethodTypeOnTheCounter() {
        wayOfProvision.getReceivingOffice().setName("");

        actualErrors = wayOfProvisionValidator.validate(wayOfProvision, validationParams);

        int expected = 1;
        int actual = actualErrors.size();
        assertEquals(expected, actual);

        List<String> errorCodes = getAsStringCodeList();

        assertTrue(errorCodes.contains("PR_INPUT_RECEIVING_OFFICE_E"));
    }

    @Test
    public void testWithInvalidServiceType() {
        wayOfProvision.setServiceTypeId("invalidServiceTypeId");

        actualErrors = wayOfProvisionValidator.validate(wayOfProvision, validationParams);

        int expected = 1;
        int actual = actualErrors.size();
        assertEquals(expected, actual);

        List<String> errorCodes = getAsStringCodeList();

        assertTrue(errorCodes.contains("PR_INCORR_CNFG_SERVICE_TYPE_E"));
    }

    @Test
    public void testWithDeletedRegistryOfficeNomenclatureValue() {
        registryOfficeNomenclatureCache.asMap().remove("10000900000000015838");

        validationParams.put(ValidationParamKey.VALIDATE_NOMENCLATURE_CHANGES, true);

        actualErrors = wayOfProvisionValidator.validate(wayOfProvision, validationParams);

        int expected = 2;
        int actual = actualErrors.size();
        assertEquals(expected, actual);

        List<String> errorCodes = getAsStringCodeList();

        assertTrue(errorCodes.contains("PR_APP_FOR_CORR_CHANGED_NOMENCLATURES_I"));
        assertTrue(errorCodes.contains("PR_INPUT_RECEIVING_OFFICE_E"));
    }

    private List<String> getAsStringCodeList() {
        return actualErrors
            .stream()
            .map(ApplicationError::getCode)
            .collect(Collectors.toList());
    }

}
