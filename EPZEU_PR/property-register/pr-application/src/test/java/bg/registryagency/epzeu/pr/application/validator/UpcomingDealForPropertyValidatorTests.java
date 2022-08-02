package bg.registryagency.epzeu.pr.application.validator;

import bg.registryagency.epzeu.pr.application.BootstrapDataUtils;
import bg.registryagency.epzeu.pr.application.conf.ValidatorsTestConfiguration;
import bg.registryagency.epzeu.pr.application.segment.UpcomingDealForProperty;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.EnumMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = ValidatorsTestConfiguration.class)
public class UpcomingDealForPropertyValidatorTests {

    @Autowired
    private UpcomingDealForPropertyValidator upcomingDealForPropertyValidator;
    private UpcomingDealForProperty upcomingDealForProperty;
    private Map<ValidationParamKey, Object> validationParams;
    private List<ApplicationError> actualErrors;

    @Before
    public void setup() {
        this.upcomingDealForProperty = BootstrapDataUtils.createUpcomingDealForProperty();
        validationParams = new EnumMap<>(ValidationParamKey.class);
        actualErrors = new ArrayList<>();
    }

    @Test
    public void testWithCorrectParameters() {
        actualErrors = upcomingDealForPropertyValidator.validate(upcomingDealForProperty, validationParams);

        int expected = 0;
        int actual = actualErrors.size();
        assertEquals(expected, actual);
    }

    @Test
    public void testWithEmptyCadastralIdList() {
        upcomingDealForProperty.setCadastralIds(new ArrayList<>());
        actualErrors = upcomingDealForPropertyValidator.validate(upcomingDealForProperty, validationParams);

        int expected = 1;
        int actual = actualErrors.size();
        assertEquals(expected, actual);

        List<String> errorCodes = getAsStringCodeList();

        assertTrue(errorCodes.contains("PR_EMPTY_PROP_LIST_E"));
    }

    @Test
    public void testWithEmptyPropertyDealType() {
        upcomingDealForProperty.setPropertyDealType("");
        actualErrors = upcomingDealForPropertyValidator.validate(upcomingDealForProperty, validationParams);

        int expected = 1;
        int actual = actualErrors.size();
        assertEquals(expected, actual);

        List<String> errorCodes = getAsStringCodeList();

        assertTrue(errorCodes.contains("PR_MISSING_TRANSACT_TYPE_E"));
    }

    @Test
    public void testWithInvalidPropertyDealDate() {
        upcomingDealForProperty.setPropertyDealDate(LocalDate.now().minusDays(1));
        actualErrors = upcomingDealForPropertyValidator.validate(upcomingDealForProperty, validationParams);

        int expected = 1;
        int actual = actualErrors.size();
        assertEquals(expected, actual);

        List<String> errorCodes = getAsStringCodeList();

        assertTrue(errorCodes.contains("PR_INVALID_TRANSCT_DATE_E"));
    }

    @Test
    public void testWithInvalidPropertyDealDateWithMoreThanThirtyDaysDifference() {
        upcomingDealForProperty.setPropertyDealDate(LocalDate.now().plusDays(31));
        actualErrors = upcomingDealForPropertyValidator.validate(upcomingDealForProperty, validationParams);

        int expected = 1;
        int actual = actualErrors.size();
        assertEquals(expected, actual);

        List<String> errorCodes = getAsStringCodeList();

        assertTrue(errorCodes.contains("PR_TRANSCT_DATE_NO_LATER_THAN_E"));
    }

    @Test
    public void testWithInvalidCadastralId() {
        List<String> cadastralIds = new ArrayList<>(upcomingDealForProperty.getCadastralIds());
        cadastralIds.add("1234");
        upcomingDealForProperty.setCadastralIds(cadastralIds);
        actualErrors = upcomingDealForPropertyValidator.validate(upcomingDealForProperty, validationParams);

        int expected = 1;
        int actual = actualErrors.size();
        assertEquals(expected, actual);

        List<String> errorCodes = getAsStringCodeList();

        assertTrue(errorCodes.contains("PR_APP_00066_E"));
    }

    private List<String> getAsStringCodeList() {
        return actualErrors
            .stream()
            .map(ApplicationError::getCode)
            .collect(Collectors.toList());
    }
}
