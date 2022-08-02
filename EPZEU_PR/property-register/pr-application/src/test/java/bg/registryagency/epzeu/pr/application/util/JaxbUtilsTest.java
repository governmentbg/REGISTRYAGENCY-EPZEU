package bg.registryagency.epzeu.pr.application.util;

import bg.registryagency.epzeu.pr.application.*;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.TestExecutionListeners;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.support.DependencyInjectionTestExecutionListener;
import org.springframework.test.context.transaction.TransactionalTestExecutionListener;
import org.xml.sax.SAXException;

import javax.xml.XMLConstants;
import javax.xml.bind.JAXBException;
import javax.xml.stream.XMLStreamException;
import javax.xml.validation.Schema;
import javax.xml.validation.SchemaFactory;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.nio.file.Files;
import java.security.NoSuchAlgorithmException;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@TestExecutionListeners({DependencyInjectionTestExecutionListener.class, TransactionalTestExecutionListener.class})
public class JaxbUtilsTest {
    private static final String BASE_APPLICATIONS_XSD_PATH = "xsd/application-without-signature/";

    @Test
    public void testCertificateForPerson() throws IOException, NoSuchAlgorithmException, JAXBException, SAXException, XMLStreamException {
        ApplicationForCertificateForPerson application = generateUvtlApplication(ApplicationContentType.INITIAL);
        ApplicationForCertificateForPerson applicationCorrected = generateUvtlApplication(ApplicationContentType.CORRECTIVE);

        URL xsdUrl = getClass().getClassLoader().getResource(BASE_APPLICATIONS_XSD_PATH + "ApplicationForIssuingOfCertificateForPersonFromPropertyRegister.xsd");

        marshalXMLDocumentByModel(application, xsdUrl, "ApplicationForCertificateForPerson-test.xml");
        marshalXMLDocumentByModel(applicationCorrected, xsdUrl, "ApplicationForCertificateForPerson-corrected-test.xml");
    }

    @Test
    public void testCertificateForProperty() throws IOException, NoSuchAlgorithmException, JAXBException, SAXException, XMLStreamException {
        ApplicationForCertificateForProperty application = generateApplicationForCertificateForProperty(ApplicationContentType.INITIAL);
        ApplicationForCertificateForProperty applicationCorrected = generateApplicationForCertificateForProperty(ApplicationContentType.CORRECTIVE);

        URL xsdUrl = getClass().getClassLoader().getResource(BASE_APPLICATIONS_XSD_PATH + "ApplicationForIssuingOfCertificateForPropertyFromPropertyRegister.xsd");

        marshalXMLDocumentByModel(application, xsdUrl, "ApplicationForCertificateForProperty-test.xml");
        marshalXMLDocumentByModel(applicationCorrected, xsdUrl, "ApplicationForCertificateForProperty-corrected-test.xml");
    }

    @Test
    public void testCertificateForPeriodForPerson() throws IOException, NoSuchAlgorithmException, JAXBException, SAXException, XMLStreamException {
        ApplicationForCertificateForPeriod application = generateApplicationForCertificateForPeriodForPerson(ApplicationContentType.INITIAL);
        ApplicationForCertificateForPeriod applicationCorrected = generateApplicationForCertificateForPeriodForPerson(ApplicationContentType.CORRECTIVE);

        URL xsdUrl = getClass().getClassLoader().getResource(BASE_APPLICATIONS_XSD_PATH + "ApplicationForIssuingOfCertificateForPeriodFromPropertyRegister.xsd");

        marshalXMLDocumentByModel(application, xsdUrl, "ApplicationForCertificateForPeriodForPerson-test.xml");
        marshalXMLDocumentByModel(applicationCorrected, xsdUrl, "ApplicationForCertificateForPeriodForPerson-corrected-test.xml");
    }

    @Test
    public void testCertificateForPeriodForProperty() throws IOException, NoSuchAlgorithmException, JAXBException, SAXException, XMLStreamException {
        ApplicationForCertificateForPeriod application = generateApplicationForCertificateForPeriodForProperty(ApplicationContentType.INITIAL);
        ApplicationForCertificateForPeriod applicationCorrected = generateApplicationForCertificateForPeriodForProperty(ApplicationContentType.CORRECTIVE);

        URL xsdUrl = getClass().getClassLoader().getResource(BASE_APPLICATIONS_XSD_PATH + "ApplicationForIssuingOfCertificateForPeriodFromPropertyRegister.xsd");

        marshalXMLDocumentByModel(application, xsdUrl, "ApplicationForCertificateForPeriodForProperty-test.xml");
        marshalXMLDocumentByModel(applicationCorrected, xsdUrl, "ApplicationForCertificateForPeriodForProperty-corrected-test.xml");
    }

    @Test
    public void testCertifiedCopy() throws IOException, NoSuchAlgorithmException, JAXBException, SAXException, XMLStreamException {
        ApplicationForCertifiedCopy application = generateApplicationForCertifiedCopy();

        URL xsdUrl = getClass().getClassLoader().getResource(BASE_APPLICATIONS_XSD_PATH + "ApplicationForIssuingOfCertifiedCopyFromPropertyRegister.xsd");

        marshalXMLDocumentByModel(application, xsdUrl, "ApplicationForCertifiedCopy-test.xml");
    }

    @Test
    public void testNotCertifiedCopy() throws IOException, JAXBException, SAXException, XMLStreamException {
        ApplicationForNotCertifiedCopy application = generateApplicationForNotCertifiedCopy();

        URL xsdUrl = getClass().getClassLoader().getResource(BASE_APPLICATIONS_XSD_PATH + "ApplicationForIssuingOfNotCertifiedCopyFromPropertyRegister.xsd");

        marshalXMLDocumentByModel(application, xsdUrl, "ApplicationForNotCertifiedCopy-test.xml");
    }

    @Test
    public void testUpcomingDealForProperty() throws IOException, JAXBException, SAXException, XMLStreamException {
        ApplicationForUpcomingDealForProperty application = generateApplicationForUpcomingDealForProperty();

        URL xsdUrl = getClass().getClassLoader().getResource(BASE_APPLICATIONS_XSD_PATH + "ApplicationForDeclarationOfUpcomingDealForPropertyFromPropertyRegister.xsd");

        marshalXMLDocumentByModel(application, xsdUrl, "ApplicationForUpcomingDealForProperty-test.xml");
    }

    @Test
    public void testRequestForReportForPersonIndividual() throws IOException, NoSuchAlgorithmException, JAXBException, SAXException, XMLStreamException {
        RequestForReportOfPerson requestForReportOfPerson = generateRequestForReportForPersonIndividual();

        URL xsdUrl = getClass().getClassLoader().getResource(BASE_APPLICATIONS_XSD_PATH + "RequestForReportOfPersonFromPropertyRegister.xsd");

        marshalXMLDocumentByModel(requestForReportOfPerson, xsdUrl, "RequestForReportOfPersonIndividual-test.xml");
    }

    @Test
    public void testRequestForReportForPersonLegalEntity() throws IOException, NoSuchAlgorithmException, JAXBException, SAXException, XMLStreamException {
        RequestForReportOfPerson requestForReportOfPerson = generateRequestForReportForPersonLegalEntity();

        URL xsdUrl = getClass().getClassLoader().getResource(BASE_APPLICATIONS_XSD_PATH + "RequestForReportOfPersonFromPropertyRegister.xsd");

        marshalXMLDocumentByModel(requestForReportOfPerson, xsdUrl, "RequestForReportOfPersonLegalEntity-test.xml");
    }

    @Test
    public void testRequestForReportForProperty() throws IOException, NoSuchAlgorithmException, JAXBException, SAXException, XMLStreamException {
        RequestForReportOfProperty requestForReportOfProperty = generateRequestForReportForProperty();

        URL xsdUrl = getClass().getClassLoader().getResource(BASE_APPLICATIONS_XSD_PATH + "RequestForReportOfPropertyFromPropertyRegister.xsd");

        marshalXMLDocumentByModel(requestForReportOfProperty, xsdUrl, "RequestForReportOfProperty-test.xml");
    }

    @Test
    public void testRequestForReportForAccountProperty() throws IOException, NoSuchAlgorithmException, JAXBException, SAXException, XMLStreamException {
        RequestForReportOfAccountProperty requestForReportOfAccountProperty = generateRequestForReportForAccountProperty();

        URL xsdUrl = getClass().getClassLoader().getResource(BASE_APPLICATIONS_XSD_PATH + "RequestForReportOfAccountPropertyFromPropertyRegister.xsd");

        marshalXMLDocumentByModel(requestForReportOfAccountProperty, xsdUrl, "RequestForReportOfAccountProperty-test.xml");
    }

    @Test
    public void testRequestForReportForDocument() throws IOException, NoSuchAlgorithmException, JAXBException, SAXException, XMLStreamException {
        RequestForReportOfDocument requestForReportOfDocument = generateRequestForReportForDocument();

        URL xsdUrl = getClass().getClassLoader().getResource(BASE_APPLICATIONS_XSD_PATH + "RequestForReportOfDocumentFromPropertyRegister.xsd");

        marshalXMLDocumentByModel(requestForReportOfDocument, xsdUrl, "RequestForReportOfDocument-test.xml");
    }

    @Test
    public void testRequestForReportForIndividualPersonInAllRegistryOffices() throws IOException, NoSuchAlgorithmException, JAXBException, SAXException, XMLStreamException {
        RequestForReportOfPersonInAllRegistryOffices application = generateRequestForReportOfIndividualPersonInAllRegistryOffices();

        URL xsdUrl = getClass().getClassLoader().getResource(BASE_APPLICATIONS_XSD_PATH + "RequestForReportOfPersonInAllRegistryOffices.xsd");

        marshalXMLDocumentByModel(application, xsdUrl, "RequestForReportOfIndividualPersonInAllRegistryOffices-test.xml");
    }

    @Test
    public void testRequestForReportForLegalEntityPersonInAllRegistryOffices() throws IOException, NoSuchAlgorithmException, JAXBException, SAXException, XMLStreamException {
        RequestForReportOfPersonInAllRegistryOffices application = generateRequestForReportOfLegalEntityPersonInAllRegistryOffices();

        URL xsdUrl = getClass().getClassLoader().getResource(BASE_APPLICATIONS_XSD_PATH + "RequestForReportOfPersonInAllRegistryOffices.xsd");

        marshalXMLDocumentByModel(application, xsdUrl, "RequestForReportOfPersonInAllRegistryOffices-test.xml");
    }

    public void marshalXMLDocumentByModel(ApplicationForm application, URL xsdUrl, String targetFileName) throws SAXException, IOException, JAXBException, XMLStreamException {
        Schema schema = null;

        if(xsdUrl != null) {
            SchemaFactory sf = SchemaFactory.newInstance(XMLConstants.W3C_XML_SCHEMA_NS_URI);
            schema = sf.newSchema(xsdUrl);
        }

        byte[] bytes = JaxbUtils.marshalXMLDocumentByModel(application, schema);

        assertThat(bytes).isNotNull();

        File xmlDir = BootstrapDataUtils.getXmlDirFile();
        String targetDirPath = xmlDir.getAbsolutePath();
        String pathToTargetFile = targetDirPath + "\\" + targetFileName;

        // Save file in file system
        FileUtils.saveFile(bytes, pathToTargetFile);

        String pathToGeneratedXML = "xml/" + targetFileName;
        File xmlFile = BootstrapDataUtils.getFileByPath(pathToGeneratedXML);
        byte[] readBytes = Files.readAllBytes(xmlFile.toPath());

        assertThat(readBytes).isNotEmpty();
        assertThat(bytes).isEqualTo(readBytes);

        ApplicationForm unmarshaledApplication = JaxbUtils.unmarshalXMLDocumentToModel(new ByteArrayInputStream(readBytes), schema);

        assertThat(unmarshaledApplication).isNotNull();
        assertThat(unmarshaledApplication.equals(application));
    }

    public ApplicationForCertificateForPerson generateUvtlApplication(ApplicationContentType applicationContentType) throws IOException, NoSuchAlgorithmException {
        ApplicationForCertificateForPerson application = BootstrapDataUtils.createApplicationForCertificateForPerson(applicationContentType);

        assertThat(application).isNotNull();

        return application;
    }

    public ApplicationForCertificateForProperty generateApplicationForCertificateForProperty(ApplicationContentType applicationContentType) throws IOException, NoSuchAlgorithmException {
        ApplicationForCertificateForProperty application = BootstrapDataUtils.createApplicationForCertificateForProperty(applicationContentType);

        assertThat(application).isNotNull();

        return application;
    }

    public ApplicationForCertifiedCopy generateApplicationForCertifiedCopy() throws IOException, NoSuchAlgorithmException {
        ApplicationForCertifiedCopy application = BootstrapDataUtils.createApplicationForCertifiedCopy();

        assertThat(application).isNotNull();

        return application;
    }

    public ApplicationForNotCertifiedCopy generateApplicationForNotCertifiedCopy() {
        ApplicationForNotCertifiedCopy application = BootstrapDataUtils.createApplicationForNotCertifiedCopy();

        assertThat(application).isNotNull();

        return application;
    }

    public ApplicationForUpcomingDealForProperty generateApplicationForUpcomingDealForProperty() {
        ApplicationForUpcomingDealForProperty application = BootstrapDataUtils.createApplicationForUpcomingDealForProperty();

        assertThat(application).isNotNull();

        return application;
    }

    public ApplicationForCertificateForPeriod generateApplicationForCertificateForPeriodForPerson(ApplicationContentType applicationContentType) throws IOException, NoSuchAlgorithmException {
        ApplicationForCertificateForPeriod application = BootstrapDataUtils.createApplicationForCertificateForPeriodForPerson(applicationContentType);

        assertThat(application).isNotNull();

        return application;
    }

    public ApplicationForCertificateForPeriod generateApplicationForCertificateForPeriodForProperty(ApplicationContentType applicationContentType) throws IOException, NoSuchAlgorithmException {
        ApplicationForCertificateForPeriod application = BootstrapDataUtils.createApplicationForCertificateForPeriodForProperty(applicationContentType);

        assertThat(application).isNotNull();

        return application;
    }

    public RequestForReportOfPerson generateRequestForReportForPersonIndividual() throws IOException, NoSuchAlgorithmException {
        RequestForReportOfPerson requestForReportForPerson = BootstrapDataUtils.createRequestForReportForPersonIndividual();

        assertThat(requestForReportForPerson).isNotNull();

        return requestForReportForPerson;
    }

    public RequestForReportOfPerson generateRequestForReportForPersonLegalEntity() throws IOException, NoSuchAlgorithmException {
        RequestForReportOfPerson requestForReportForPerson = BootstrapDataUtils.createRequestForReportForPersonLegalEntity();

        assertThat(requestForReportForPerson).isNotNull();

        return requestForReportForPerson;
    }

    public RequestForReportOfProperty generateRequestForReportForProperty() throws IOException, NoSuchAlgorithmException {
        RequestForReportOfProperty requestForReportForProperty = BootstrapDataUtils.createRequestForReportForProperty();

        assertThat(requestForReportForProperty).isNotNull();

        return requestForReportForProperty;
    }

    public RequestForReportOfAccountProperty generateRequestForReportForAccountProperty() throws IOException, NoSuchAlgorithmException {
        RequestForReportOfAccountProperty requestForReportOfAccountProperty = BootstrapDataUtils.createRequestForReportOfAccountProperty();

        assertThat(requestForReportOfAccountProperty).isNotNull();

        return requestForReportOfAccountProperty;
    }

    public RequestForReportOfDocument generateRequestForReportForDocument() throws IOException, NoSuchAlgorithmException {
        RequestForReportOfDocument requestForReportOfDocument = BootstrapDataUtils.createRequestForReportOfDocument();

        assertThat(requestForReportOfDocument).isNotNull();

        return requestForReportOfDocument;
    }

    public RequestForReportOfPersonInAllRegistryOffices generateRequestForReportOfIndividualPersonInAllRegistryOffices() throws IOException, NoSuchAlgorithmException {
        RequestForReportOfPersonInAllRegistryOffices application = BootstrapDataUtils.createRequestForReportOfIndividualPersonInAllRegistryOffices();

        assertThat(application).isNotNull();

        return application;
    }

    public RequestForReportOfPersonInAllRegistryOffices generateRequestForReportOfLegalEntityPersonInAllRegistryOffices() throws IOException, NoSuchAlgorithmException {
        RequestForReportOfPersonInAllRegistryOffices application = BootstrapDataUtils.createRequestForReportOfLegalEntityPersonInAllRegistryOffices();

        assertThat(application).isNotNull();

        return application;
    }
}
