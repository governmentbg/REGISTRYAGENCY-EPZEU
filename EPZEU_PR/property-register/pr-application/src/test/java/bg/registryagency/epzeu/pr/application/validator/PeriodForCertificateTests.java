package bg.registryagency.epzeu.pr.application.validator;

import bg.registryagency.epzeu.pr.application.BootstrapDataUtils;
import bg.registryagency.epzeu.pr.application.conf.ValidatorsTestConfiguration;
import bg.registryagency.epzeu.pr.application.segment.PeriodForCertificate;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = ValidatorsTestConfiguration.class)
public class PeriodForCertificateTests {

    @Autowired
    private Validator periodForCertificateValidator;
    private PeriodForCertificate periodForCertificate;
    private Map<ValidationParamKey, Object> validationParams;
    private List<ApplicationError> actualErrors;

    @Before
    public void setup() {
        periodForCertificate = BootstrapDataUtils.createPeriodForCertificate();
        validationParams = new EnumMap<>(ValidationParamKey.class);
        actualErrors = new ArrayList<>();
    }

    @Test
    public void testWithInvalidStartDate() {
        periodForCertificate.getPeriodForReport().setStartDate(null);
        actualErrors = periodForCertificateValidator.validate(periodForCertificate, validationParams);

        int expected = 1;
        int actual = actualErrors.size();
        assertEquals(expected, actual);

        List<String> errorCodes = getAsStringCodeList();

        assertTrue(errorCodes.contains("PR_APP_00067_E"));
    }

    @Test
    public void testWithInvalidPeriodForCertificate() {
        periodForCertificate.getPeriodForReport()
            .setEndDate(LocalDate.now().plusDays(1));

        actualErrors = periodForCertificateValidator.validate(periodForCertificate, validationParams);

        int expected = 1;
        int actual = actualErrors.size();
        assertEquals(expected, actual);

        List<String> errorCodes = getAsStringCodeList();

        assertTrue(errorCodes.contains("PR_APP_INVALID_DATE_E"));
    }

    @Test
    public void testWithInvalidExpectedRegistrationDate() {
        LocalDate invalidDate = LocalDate.now().plusDays(1);
        periodForCertificate.setExpectedRegistrationDate(invalidDate);

        actualErrors = periodForCertificateValidator.validate(periodForCertificate, validationParams);

        int expected = 1;
        int actual = actualErrors.size();
        assertEquals(expected, actual);

        List<String> errorCodes = getAsStringCodeList();

        assertTrue(errorCodes.contains("PR_APP_EXPECTED_REGISTRATION_DATE_E"));
    }

    @Test
    public void testWithAllInvalidStartDateEndDateAndRegistrationDate() {
        periodForCertificate.getPeriodForReport().setStartDate(null);

        periodForCertificate.getPeriodForReport().setEndDate(LocalDate.now().plusDays(1));

        LocalDate invalidRegistrationDate = LocalDate.now().plusDays(1);
        periodForCertificate.setExpectedRegistrationDate(invalidRegistrationDate);

        actualErrors = periodForCertificateValidator.validate(periodForCertificate, validationParams);

        int expected = 3;
        int actual = actualErrors.size();
        assertEquals(expected, actual);

        List<String> errorCodes = getAsStringCodeList();

        assertTrue(errorCodes.contains("PR_APP_00067_E"));
        assertTrue(errorCodes.contains("PR_APP_INVALID_DATE_E"));
        assertTrue(errorCodes.contains("PR_APP_EXPECTED_REGISTRATION_DATE_E"));
    }

    @Test
    public void testWithInvalidStartDateAfterEndDateAndAfterTodayDate() {
        LocalDate endDate = periodForCertificate.getPeriodForReport().getEndDate();
        periodForCertificate.getPeriodForReport().setStartDate(endDate.plusDays(1));

        actualErrors = periodForCertificateValidator.validate(periodForCertificate, validationParams);

        int expected = 2;
        int actual = actualErrors.size();
        assertEquals(expected, actual);

        List<String> errorCodes = getAsStringCodeList();

        assertTrue(errorCodes.contains("PR_APP_00073_E"));
        assertTrue(errorCodes.contains("PR_APP_INVALID_DATE_E"));
    }

    private List<String> getAsStringCodeList() {
        return actualErrors
            .stream()
            .map(ApplicationError::getCode)
            .collect(Collectors.toList());
    }
}
