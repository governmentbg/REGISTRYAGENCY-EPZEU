package bg.registryagency.epzeu.pr.application.validator;

import bg.registryagency.epzeu.pr.application.ApplicationContentType;
import bg.registryagency.epzeu.pr.application.ApplicationForCertificateForPerson;
import bg.registryagency.epzeu.pr.application.conf.ValidatorsTestConfiguration;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = ValidatorsTestConfiguration.class)
public class ApplicationForCertificateForPersonValidatorTests {

    @Autowired
    private Validator applicationForCertificateForPersonValidator;
    private ApplicationForCertificateForPerson applicationForCertificateForPerson;

    @Before
    public void setup() {
        applicationForCertificateForPerson = new ApplicationForCertificateForPerson();
    }

    @Test(expected = IllegalStateException.class)
    public void testWithCorrectiveApplicationContentTypeAndInvalidInitialApplicationData(){
        applicationForCertificateForPerson.setApplicationContentType(ApplicationContentType.CORRECTIVE);
        applicationForCertificateForPerson.setInitialApplicationData(null);

        applicationForCertificateForPersonValidator.validate(applicationForCertificateForPerson, null);
    }
}
