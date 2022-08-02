package bg.registryagency.epzeu.pr.application.validator;

import bg.registryagency.epzeu.pr.application.BootstrapDataUtils;
import bg.registryagency.epzeu.pr.application.conf.ValidatorsTestConfiguration;
import bg.registryagency.epzeu.pr.application.segment.ActRequestingACopy;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = ValidatorsTestConfiguration.class)
public class ActRequestingACopyValidatorTests {

    @Autowired
    private Validator actRequestingACopyValidator;
    private ActRequestingACopy actRequestingACopy;
    private List<ApplicationError> actualErrors;

    @Before
    public void setup() {
        actRequestingACopy = BootstrapDataUtils.createActRequestingACopy();
        actualErrors = new ArrayList<>();
    }

    @Test
    public void testAllWithValidParameters() {
        actualErrors = actRequestingACopyValidator.validate(actRequestingACopy, null);

        int expected = 0;
        int actual = actualErrors.size();
        assertEquals(expected, actual);
    }

    @Test
    public void testWithInvalidCopyReason() {
        actRequestingACopy.setCopyReason(null);

        actualErrors = actRequestingACopyValidator.validate(actRequestingACopy, null);

        int expected = 1;
        int actual = actualErrors.size();
        assertEquals(expected, actual);

        List<String> errorCodes = getAsStringCodeList();

        assertTrue(errorCodes.contains("PR_APP_00097_E"));
    }

    @Test
    public void testWithInvalidRegistryOffice() {
        actRequestingACopy.setRegistryOffice(null);

        actualErrors = actRequestingACopyValidator.validate(actRequestingACopy, null);

        int expected = 1;
        int actual = actualErrors.size();
        assertEquals(expected, actual);

        List<String> errorCodes = getAsStringCodeList();

        assertTrue(errorCodes.contains("PR_APP_00020_E"));
    }

    @Test
    public void testWithInvalidActDataAndOldActData() {
        actRequestingACopy.setActData(null);
        actRequestingACopy.setActOldData(null);

        actualErrors = actRequestingACopyValidator.validate(actRequestingACopy, null);

        int expected = 1;
        int actual = actualErrors.size();
        assertEquals(expected, actual);

        List<String> errorCodes = getAsStringCodeList();

        assertTrue(errorCodes.contains("PR_APP_00089_E"));
    }

    @Test
    public void testWithAllInvalidDocumentsForActData() {
        actRequestingACopy.getActData().setDataForRegistrationOfDocumentInBook(null);
        actRequestingACopy.getActData().setDataForRegistrationOfDocumentInIncomingRegister(null);
        actRequestingACopy.getActData().setDataForRegistrationOfDocumentInDoubleIncomingRegister(null);

        actualErrors = actRequestingACopyValidator.validate(actRequestingACopy, null);

        int expected = 1;
        int actual = actualErrors.size();
        assertEquals(expected, actual);

        List<String> errorCodes = getAsStringCodeList();

        assertTrue(errorCodes.contains("PR_APP_00094_E"));
    }

    @Test
    public void testWithInvalidDocumentInBookWithInvalidYearForActData() {
        short invalidYear = 111;
        actRequestingACopy.getActData().getDataForRegistrationOfDocumentInBook().setYear(invalidYear);

        actualErrors = actRequestingACopyValidator.validate(actRequestingACopy, null);

        int expected = 2;
        int actual = actualErrors.size();
        assertEquals(expected, actual);

        List<String> errorCodes = getAsStringCodeList();

        assertTrue(errorCodes.contains("PR_APP_00039_E"));
        assertTrue(errorCodes.contains("GL_INPUT_YEAR_VALUE_E"));
    }

    @Test
    public void testWithInvalidDocumentInIncomingRegisterWithInvalidDateForActData() {
        LocalDate tomorrow = LocalDate.now().plus(1, ChronoUnit.DAYS);

        actRequestingACopy.getActData().getDataForRegistrationOfDocumentInIncomingRegister().setRegistrationDate(tomorrow);

        actualErrors = actRequestingACopyValidator.validate(actRequestingACopy, null);

        int expected = 2;
        int actual = actualErrors.size();
        assertEquals(expected, actual);

        List<String> errorCodes = getAsStringCodeList();

        assertTrue(errorCodes.contains("PR_APP_00069_E"));
        assertTrue(errorCodes.contains("PR_APP_INVALID_DATE_E"));
    }

    @Test
    public void testWithInvalidDocumentInDoubleIncomingRegisterWithInvalidYearForActData() {

        short invalidYear = 111;
        actRequestingACopy.getActData().getDataForRegistrationOfDocumentInDoubleIncomingRegister().setYear(invalidYear);

        actualErrors = actRequestingACopyValidator.validate(actRequestingACopy, null);

        int expected = 2;
        int actual = actualErrors.size();
        assertEquals(expected, actual);

        List<String> errorCodes = getAsStringCodeList();

        assertTrue(errorCodes.contains("PR_APP_00068_E"));
        assertTrue(errorCodes.contains("GL_INPUT_YEAR_VALUE_E"));
    }


    private List<String> getAsStringCodeList() {
        return actualErrors
            .stream()
            .map(ApplicationError::getCode)
            .collect(Collectors.toList());
    }
}
