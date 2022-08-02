package bg.registryagency.epzeu.pr.application;

import bg.registryagency.epzeu.pr.application.segment.*;
import bg.registryagency.epzeu.pr.application.util.FileUtils;
import bg.registryagency.epzeu.pr.integration.epzeu.enums.AuthenticationTypeEnum;
import bg.registryagency.epzeu.pr.integration.pr.enums.PersonTypeNomenclature;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.*;

public final class BootstrapDataUtils {
    private static final Short COUNTRY_CODE_BG = 100;
    private static final String COUNTRY_NAME_BG = "БЪЛГАРИЯ";

    private static final Short COURT_ID_SOFIA = 100;
    private static final String COURT_NAME_SOFIA = "Апелативен съд - София";

    private static final String EKKATE_CODE_SOFIA = "68134";//Customer Register EKKATE code

    private static final String SETTLEMENT_SOFIA_ID = "10000800000000014665";//PR Nomenclature id
    private static final String SETTLEMENT_SOFIA_NAME = "гр.София";//PR Nomenclature name

    private static final String MUNICIPALITY_SOFIA_ID = "10000800000000009785";//PR Nomenclature id
    private static final String MUNICIPALITY_SOFIA_NAME = "СТОЛИЧНА";//PR Nomenclature name

    private static final String AREA_SOFIA_ID = "10000800000000009585";//PR Nomenclature id
    private static final String AREA_SOFIA_NAME = "СОФИЯ-СТОЛИЧНА";//PR Nomenclature name

    private static final String REGISTRY_OFFICE_NAME_SF = "София";
    private static final String REGISTRY_OFFICE_CODE_SF = "10000900000000015838";

    private static final String PROPERTY_ID = "08002208700000016116";

    private static final String PROPETY_TYPE_ID_BUILDING = "10000500000000000087";
    private static final String PROPETY_TYPE_NAME_BUILDING = "Сграда";

    private static final String BOOK_ID = "10000500000000000039";
    private static final String BOOK_NAME = "ВПИСВАНИЯ";

    private static final String DOCUMENT_TYPE_ID = "20001100000000000002";
    private static final String DOCUMENT_TYPE_NAME = "Други";

    private static final String APPLICANT_CATEGORY_ID = "20001100000000000111";
    private static final String APPLICANT_CATEGORY_NAME = "ДСИ";

    private static final String CADASTRAL_ID = "68134.4090.488.2.84";
    private static final String EMAIL = "test@cnsys.bg";
    private static final String PHONE_NUMBER = "0888888888";
    private static final String COMPANY_NAME = "СИЕНСИС";
    private static final String SERVICE_TYPE_ID = "10001100000000016576";
    private static final Integer NUMBER_MIN = 1;
    private static final Integer LENGTH_NAME = 5;

    private BootstrapDataUtils(){}

    public static RequestForReportOfPerson createRequestForReportForPersonIndividual() throws IOException, NoSuchAlgorithmException {
        RequestForReportOfPerson requestForReport = new RequestForReportOfPerson();
        requestForReport.setPerson(createPersonOfReportIndividual());
        requestForReport.setApplicantData(createApplicantDataOfReport());
        requestForReport.setPeriodForReport(new PeriodForReport(LocalDate.now(), LocalDate.now()));
        requestForReport.setGdprAgreement(createGdprAgreement());

        return requestForReport;
    }

    public static RequestForReportOfPerson createRequestForReportForPersonLegalEntity() throws IOException, NoSuchAlgorithmException {
        RequestForReportOfPerson requestForReport = new RequestForReportOfPerson();
        requestForReport.setPerson(createPersonOfReportLegalEntity());
        requestForReport.setApplicantData(createApplicantDataOfReport());
        requestForReport.setPeriodForReport(new PeriodForReport(LocalDate.now(), LocalDate.now()));
        requestForReport.setGdprAgreement(createGdprAgreement());

        return requestForReport;
    }

    public static RequestForReportOfProperty createRequestForReportForProperty() throws IOException, NoSuchAlgorithmException {
        RequestForReportOfProperty requestForReportOfProperty = new RequestForReportOfProperty();
        requestForReportOfProperty.setProperty(createPropertyOfReport());
        requestForReportOfProperty.setApplicantData(createApplicantDataOfReport());
        requestForReportOfProperty.setPeriodForReport(new PeriodForReport(LocalDate.now(), LocalDate.now()));
        requestForReportOfProperty.setGdprAgreement(createGdprAgreement());

        return requestForReportOfProperty;
    }

    public static RequestForReportOfAccountProperty createRequestForReportOfAccountProperty() throws IOException, NoSuchAlgorithmException {
        RequestForReportOfAccountProperty requestForReportOfAccountProperty = new RequestForReportOfAccountProperty();
        requestForReportOfAccountProperty.setAccountProperty(createAccountPropertyOfReport());
        requestForReportOfAccountProperty.setApplicantData(createApplicantDataOfReport());
        requestForReportOfAccountProperty.setGdprAgreement(createGdprAgreement());

        return requestForReportOfAccountProperty;
    }

    public static RequestForReportOfDocument createRequestForReportOfDocument() throws IOException, NoSuchAlgorithmException {
        RequestForReportOfDocument requestForReportOfDocument = new RequestForReportOfDocument();
        requestForReportOfDocument.setDocument(createDocumentOfReport());
        requestForReportOfDocument.setApplicantData(createApplicantDataOfReport());
        requestForReportOfDocument.setGdprAgreement(createGdprAgreement());

        return requestForReportOfDocument;
    }

    public static RequestForReportOfPersonInAllRegistryOffices createRequestForReportOfIndividualPersonInAllRegistryOffices() throws IOException, NoSuchAlgorithmException {
        RequestForReportOfPersonInAllRegistryOffices application = new RequestForReportOfPersonInAllRegistryOffices();
        application.setApplicantData(createApplicantDataOfReport());
        application.setPeriodForReport(new PeriodForReport(LocalDate.now(), LocalDate.now()));
        application.setPersonType(PersonTypeNomenclature.INDIVIDUAL);
        application.setIdentity(createIdentityEgn());
        application.setGdprAgreement(createGdprAgreement());

        return application;
    }

    public static RequestForReportOfPersonInAllRegistryOffices createRequestForReportOfLegalEntityPersonInAllRegistryOffices() throws IOException, NoSuchAlgorithmException {
        RequestForReportOfPersonInAllRegistryOffices application = new RequestForReportOfPersonInAllRegistryOffices();
        application.setApplicantData(createApplicantDataOfReport());
        application.setPeriodForReport(new PeriodForReport(LocalDate.now(), LocalDate.now()));
        application.setPersonType(PersonTypeNomenclature.LEGAL_ENTITY);
        application.setLegalEntityNumber((Integer.valueOf(RandomGeneratorsUtil.numberInt(900000000, 999999999))).toString());
        application.setGdprAgreement(createGdprAgreement());
//        application.setCompanyName(COMPANY_NAME);

        return application;
    }

    public static ApplicantDataOfReport createApplicantDataOfReport() throws IOException, NoSuchAlgorithmException {
        ApplicantDataOfReport applicantDataOfReport = new ApplicantDataOfReport();
        applicantDataOfReport.setAuthenticationType(AuthenticationTypeEnum.CERTIFICATE.getId());
        applicantDataOfReport.setPersonalIdentifier("1111111111");
        applicantDataOfReport.setIssuer("CN = Tangra DC = dev DC = local");
        applicantDataOfReport.setNames("CNSYS OU ");
        applicantDataOfReport.setSerialNumber("2a 00 00 00 d0 98 e5 49 1c c1 b7 5d bf 00 03 00 00 00 d0");
        applicantDataOfReport.setCertificateHash("4cc45a3b4660b7b259bfe772230c313e27ff30f0");
        applicantDataOfReport.setCertificateContent("For test purposes this content is not necessary to be from real certificate".getBytes());

        return applicantDataOfReport;
    }

    public static Country createBulgariaCountry() {
        Country country = new Country();
        country.setCode(COUNTRY_CODE_BG);
        country.setName(COUNTRY_NAME_BG);

        return country;
    }

    public static PersonOfReport createPersonOfReportIndividual() {
        PersonOfReport personOfReport = new PersonOfReport();
        personOfReport.setPersonId("08007087050021252173");
        personOfReport.setRegistryOffice(createRegistryOfficeSofia());
        personOfReport.setIndividual(createIndividualOfReport());

        return personOfReport;
    }

    public static IndividualOfReport createIndividualOfReport() {
        IndividualOfReport individualOfReport = new IndividualOfReport();
        individualOfReport.setPersonNationality(createBulgariaCountry());
        individualOfReport.setIndividualNameOfReport(createIndividualNameOfReport());
        individualOfReport.setIdentity("1234567890");

        return individualOfReport;
    }

    public static PropertyOfReport createPropertyOfReport() {
        PropertyOfReport propertyOfReport = new PropertyOfReport();
        propertyOfReport.setPropertyId(PROPERTY_ID);
        propertyOfReport.setAccountNumber(RandomGeneratorsUtil.textCyrillic(false, 5));
        propertyOfReport.setApartment("56");
        propertyOfReport.setAreaByDocuments(100F);
        propertyOfReport.setBlock("40");
        propertyOfReport.setCadastralId(CADASTRAL_ID);
        propertyOfReport.setCadastreNumber(RandomGeneratorsUtil.textCyrillic(false, 5));
        propertyOfReport.setCountrySide(RandomGeneratorsUtil.textCyrillic(false, 5));
        propertyOfReport.setDistrict(RandomGeneratorsUtil.textCyrillic(false, 5));
        propertyOfReport.setEntrance("b");
        propertyOfReport.setFloor("4");
        propertyOfReport.setHousingEstate(RandomGeneratorsUtil.textCyrillic(false, 5));
        propertyOfReport.setOldAccountNumber(RandomGeneratorsUtil.textCyrillic(false, 5));
        propertyOfReport.setPermanentUsage(createPermanentUsage());
        propertyOfReport.setPlot(RandomGeneratorsUtil.textCyrillic(false, 5));
        propertyOfReport.setPropertyRemark(RandomGeneratorsUtil.textCyrillic(false, 5));
        propertyOfReport.setRegulatedNeighborhood(RandomGeneratorsUtil.textCyrillic(false, 5));
        propertyOfReport.setStreet(RandomGeneratorsUtil.textCyrillic(false, 5));
        propertyOfReport.setStreetNumber("2");
        propertyOfReport.setType(createPropertyType());
        propertyOfReport.setRegistryOffice(createRegistryOfficeSofia());
        propertyOfReport.setSettlement(createSettlementPr());
        propertyOfReport.setMunicipality(createMunicipalityPr());
        propertyOfReport.setArea(createAreaPr());

        return propertyOfReport;
    }

    public static AccountPropertyOfReport createAccountPropertyOfReport() {
        AccountPropertyOfReport accountPropertyOfReport = new AccountPropertyOfReport();
        accountPropertyOfReport.setAccountPropertyId("10002900100000530754");
        accountPropertyOfReport.setPropertyId(PROPERTY_ID);
        accountPropertyOfReport.setAccountNumber(RandomGeneratorsUtil.textCyrillic(false, 5));
        accountPropertyOfReport.setApartment("56");
        accountPropertyOfReport.setAreaByDocuments(100F);
        accountPropertyOfReport.setBlock("40");
        accountPropertyOfReport.setCadastralId(CADASTRAL_ID);
        accountPropertyOfReport.setCadastreNumber(RandomGeneratorsUtil.textCyrillic(false, 5));
        accountPropertyOfReport.setCountrySide(RandomGeneratorsUtil.textCyrillic(false, 5));
        accountPropertyOfReport.setDistrict(RandomGeneratorsUtil.textCyrillic(false, 5));
        accountPropertyOfReport.setEntrance("b");
        accountPropertyOfReport.setFloor("4");
        accountPropertyOfReport.setHousingEstate(RandomGeneratorsUtil.textCyrillic(false, 5));
        accountPropertyOfReport.setOldAccountNumber(RandomGeneratorsUtil.textCyrillic(false, 5));
        accountPropertyOfReport.setPermanentUsage(createPermanentUsage());
        accountPropertyOfReport.setPlot(RandomGeneratorsUtil.textCyrillic(false, 5));
        accountPropertyOfReport.setPropertyRemark(RandomGeneratorsUtil.textCyrillic(false, 5));
        accountPropertyOfReport.setRegulatedNeighborhood(RandomGeneratorsUtil.textCyrillic(false, 5));
        accountPropertyOfReport.setStreet(RandomGeneratorsUtil.textCyrillic(false, 5));
        accountPropertyOfReport.setStreetNumber("2");
        accountPropertyOfReport.setType(createPropertyType());
        accountPropertyOfReport.setRegistryOffice(createRegistryOfficeSofia());
        accountPropertyOfReport.setSettlement(createSettlementPr());
        accountPropertyOfReport.setMunicipality(createMunicipalityPr());
        accountPropertyOfReport.setArea(createAreaPr());

        return accountPropertyOfReport;
    }

    public static DocumentOfReport createDocumentOfReport() {
        DocumentOfReport documentOfReport = new DocumentOfReport();
        documentOfReport.setId("09000100100000005306");
        documentOfReport.setActNumber("129");
        documentOfReport.setBook(createBook());
        documentOfReport.setDoubleIncomingRegisterNumber("4307");
        documentOfReport.setIncomingRegisterDate(LocalDate.now());
        documentOfReport.setIncomingRegisterNumber(5306);
        documentOfReport.setRegistryOffice(createRegistryOfficeSofia());
        documentOfReport.setVolume("011");
        documentOfReport.setYear((short)1998);

        return documentOfReport;
    }

    public static PersonOfReport createPersonOfReportLegalEntity() {
        PersonOfReport personOfReport = new PersonOfReport();
        personOfReport.setPersonId("08007087050021252173");
        personOfReport.setRegistryOffice(createRegistryOfficeSofia());
        personOfReport.setLegalEntity(createLegalEntityOfReport());

        return personOfReport;
    }

    public static LegalEntityOfReport createLegalEntityOfReport() {
        LegalEntityOfReport legalEntityOfReport = new LegalEntityOfReport();
        legalEntityOfReport.setCompanyCase(createCompanyCase());
        legalEntityOfReport.setCompanyName(COMPANY_NAME);
        legalEntityOfReport.setCountry(createBulgariaCountry());
        legalEntityOfReport.setLegalEntityNumber((Integer.valueOf(RandomGeneratorsUtil.numberInt(900000000, 999999999))).toString());

        return legalEntityOfReport;
    }

    public static ApplicationForCertificateForPerson createApplicationForCertificateForPerson(ApplicationContentType applicationContentType) throws IOException, NoSuchAlgorithmException {

        ApplicationForCertificateForPerson application = new ApplicationForCertificateForPerson();
        application.setApplicationContentType(applicationContentType);
        application.setApplicantData(createIndividual());
        application.setRequestedPerson(createRequestedPerson());
        application.setWayOfProvision(createWayOfProvision());
        application.setContactData(createContactData());
        application.setAttachedDocuments(createAttachedDocuments());
        application.setGdprAgreement(createGdprAgreement());

        if(ApplicationContentType.CORRECTIVE == applicationContentType) {
            application.setInitialApplicationData(createInitialApplicationData());
        }

        return application;
    }

    public static ApplicationForCertificateForProperty createApplicationForCertificateForProperty(ApplicationContentType applicationContentType) throws IOException, NoSuchAlgorithmException {

        ApplicationForCertificateForProperty application = new ApplicationForCertificateForProperty();
        application.setApplicationContentType(applicationContentType);
        application.setApplicantData(createIndividual());
        application.setRequestedProperty(createProperty());
        application.setCurrentOwners(createOwners());
        application.setPreviousOwners(createOwners());
        application.setWayOfProvision(createWayOfProvision());
        application.setContactData(createContactData());
        application.setAttachedDocuments(createAttachedDocuments());
        application.setGdprAgreement(createGdprAgreement());

        if(ApplicationContentType.CORRECTIVE == applicationContentType) {
            application.setInitialApplicationData(createInitialApplicationData());
        }

        return application;
    }

    public static ApplicationForCertifiedCopy createApplicationForCertifiedCopy() throws IOException, NoSuchAlgorithmException {

        ApplicationForCertifiedCopy application = new ApplicationForCertifiedCopy();
        application.setApplicantData(createApplicantData());
        application.setServiceRecipient(createServiceRecipient());
        application.setActRequestingACopy(createActRequestingACopy());
        application.setWayOfProvision(createWayOfProvisionBase());
        application.setContactData(createContactData());
        application.setAttachedDocuments(createAttachedDocuments());
        application.setGdprAgreement(createGdprAgreement());

        return application;
    }

    public static ApplicationForNotCertifiedCopy createApplicationForNotCertifiedCopy() {

        ApplicationForNotCertifiedCopy application = new ApplicationForNotCertifiedCopy();
        application.setApplicantData(createIndividual());
        application.setActRequestingACopy(createActRequestingACopy());
        application.setWayOfProvision(createWayOfProvisionBase());
        application.setContactData(createContactData());
        application.setGdprAgreement(createGdprAgreement());

        return application;
    }

    public static ApplicationForUpcomingDealForProperty createApplicationForUpcomingDealForProperty() {

        ApplicationForUpcomingDealForProperty application = new ApplicationForUpcomingDealForProperty();
        application.setApplicantData(createApplicantData());
        application.setUpcomingDealForProperty(createUpcomingDealForProperty());
        application.setGdprAgreement(createGdprAgreement());

        return application;
    }

    public static ApplicationForCertificateForPeriod createApplicationForCertificateForPeriodForProperty(ApplicationContentType applicationContentType) throws IOException, NoSuchAlgorithmException {
        ApplicationForCertificateForPeriod application = new ApplicationForCertificateForPeriod();
        application.setCertificateDataType(CertificateDataTypeNomenclature.PROPERTY);
        application.setApplicationContentType(applicationContentType);
        application.setApplicantData(createIndividual());
        application.setPropertyData(createPropertyData());
        application.setWayOfProvision(createWayOfProvision());
        application.setContactData(createContactData());
        application.setAttachedDocuments(createAttachedDocuments());
        application.setPeriodForCertificate(createPeriodForCertificate());
        application.setGdprAgreement(createGdprAgreement());

        if(ApplicationContentType.CORRECTIVE == applicationContentType) {
            application.setInitialApplicationData(createInitialApplicationData());
        }

        return application;
    }

    public static ApplicationForCertificateForPeriod createApplicationForCertificateForPeriodForPerson(ApplicationContentType applicationContentType) throws IOException, NoSuchAlgorithmException {

        ApplicationForCertificateForPeriod application = new ApplicationForCertificateForPeriod();
        application.setCertificateDataType(CertificateDataTypeNomenclature.PROPERTY);
        application.setApplicationContentType(applicationContentType);
        application.setApplicantData(createIndividual());
        application.setRequestedPerson(createRequestedPerson());
        application.setWayOfProvision(createWayOfProvision());
        application.setContactData(createContactData());
        application.setAttachedDocuments(createAttachedDocuments());
        application.setPeriodForCertificate(createPeriodForCertificate());
        application.setGdprAgreement(createGdprAgreement());

        if(ApplicationContentType.CORRECTIVE == applicationContentType) {
            application.setInitialApplicationData(createInitialApplicationData());
        }

        return application;
    }

    public static GdprAgreement createGdprAgreement() {
        GdprAgreement gdprAgreement = new GdprAgreement();
        gdprAgreement.setGdprAgreementAcceptance(true);
        gdprAgreement.setGdprAgreementText("GDPR agreement text");

        return gdprAgreement;
    }

    public static InitialApplicationData createInitialApplicationData() {
        InitialApplicationData initialApplicationData = new InitialApplicationData();
        initialApplicationData.setIncomingReauNumber(RandomGeneratorsUtil.textCyrillic(true, 5));
        initialApplicationData.setRegisterNumber(RandomGeneratorsUtil.numberInt(1, 999));
        initialApplicationData.setRegisterDate(LocalDate.now());
        initialApplicationData.setRegistryOffice(createRegistryOfficeSofia());
        initialApplicationData.setRegisterType(new RegisterType("10000800000000001406", "Регистър удостоверения"));

        return initialApplicationData;
    }

    public static PropertyData createPropertyData() {
        PropertyData propertyData = new PropertyData();

        propertyData.setRequestedProperty(createProperty());
        propertyData.setCurrentOwners(createOwners());
        propertyData.setPreviousOwners(createOwners());

        return propertyData;
    }

    public static UpcomingDealForProperty createUpcomingDealForProperty() {
        UpcomingDealForProperty upcomingDealForProperty = new UpcomingDealForProperty();
        upcomingDealForProperty.setCadastralIds(Arrays.asList(new String[]{"68134.4090.488.2.84", "68134.4090.488.2.85"}));
        upcomingDealForProperty.setPropertyDealType(RandomGeneratorsUtil.textCyrillic(true, 5));
        upcomingDealForProperty.setPropertyDealDate(LocalDate.now());
        upcomingDealForProperty.setPropertyDealTime(LocalTime.now());

        return upcomingDealForProperty;
    }

    public static PeriodForCertificate createPeriodForCertificate() {
        PeriodForCertificate periodForCertificate = new PeriodForCertificate();
        periodForCertificate.setExpectedRegistrationDate(LocalDate.now());
        periodForCertificate.setPeriodForReport(new PeriodForReport(LocalDate.now(), LocalDate.now()));

        return periodForCertificate;
    }

    public static List<AttachedDocument> createAttachedDocuments() throws IOException, NoSuchAlgorithmException {
        List<AttachedDocument> attachedDocuments = new ArrayList<>(1);
        attachedDocuments.add(new AttachedDocument(UUID.randomUUID().toString(),
            RandomGeneratorsUtil.textCyrillic(false, 5), createDocumentType(), createDocumentFileMetadata()));

        return attachedDocuments;
    }

    public static DocumentType createDocumentType() {
        DocumentType documentType = new DocumentType();
        documentType.setId(DOCUMENT_TYPE_ID);
        documentType.setName(DOCUMENT_TYPE_NAME);

        return documentType;
    }

    public static ApplicantData createApplicantData() {
        ApplicantData applicantData = new ApplicantData();
        applicantData.setIndividual(createIndividual());
        applicantData.setApplicantType(ApplicantData.ApplicantTypeNomenclature.PERSONAL_QUALITY);
        applicantData.setApplicantCategory(createApplicantCategory());
        applicantData.setDataForAnOfficial(RandomGeneratorsUtil.textCyrillic(false, 50));
        applicantData.setSpecialAccessType("ДСИ");

        return applicantData;
    }

    public static ServiceRecipient createServiceRecipient() {
        ServiceRecipient serviceRecipient = new ServiceRecipient();
        serviceRecipient.setPerson(createPerson(Person.PropertyRegisterPersonTypeNomenclature.INDIVIDUAL, createIndividual(), null));
        serviceRecipient.setApplicantCategory(createApplicantCategory());
        serviceRecipient.setSpecialAccessType("ДСИ");
        serviceRecipient.setDataForAnOfficial(RandomGeneratorsUtil.textCyrillic(false, 50));

        return serviceRecipient;
    }

    public static ApplicantCategory createApplicantCategory() {
        ApplicantCategory applicantCategory = new ApplicantCategory();
        applicantCategory.setId(APPLICANT_CATEGORY_ID);
        applicantCategory.setName(APPLICANT_CATEGORY_NAME);

        return applicantCategory;
    }

    public static Person createRequestedPerson() {
        return createPerson(Person.PropertyRegisterPersonTypeNomenclature.LEGAL_ENTITY, null, createLegalEntity());
    }

    public static Person createPerson(Person.PropertyRegisterPersonTypeNomenclature type, Individual individual, LegalEntity legalEntity) {
        Person person = new Person();
        person.setType(type);
        person.setIndividual(individual);
        person.setLegalEntity(legalEntity);

        return person;
    }

    public static ActRequestingACopy createActRequestingACopy() {
        ActRequestingACopy actRequestingACopy = new ActRequestingACopy();
        actRequestingACopy.setCopyReason(RandomGeneratorsUtil.textCyrillic(false, 50));
        actRequestingACopy.setActData(createActData());
        actRequestingACopy.setRegistryOffice(createRegistryOfficeSofia());

        return actRequestingACopy;
    }

    public static ActData createActData() {
        ActData actData = new ActData();
        actData.setDataForRegistrationOfDocumentInBook(createDataForRegistrationOfDocumentInBook());
        actData.setDataForRegistrationOfDocumentInDoubleIncomingRegister(createDataForRegistrationOfDocumentInDoubleIncomingRegister());
        actData.setDataForRegistrationOfDocumentInIncomingRegister(createDataForRegistrationOfDocumentInIncomingRegister());

        return actData;
    }

    public static DataForRegistrationOfDocumentInBook createDataForRegistrationOfDocumentInBook() {
        DataForRegistrationOfDocumentInBook data = new DataForRegistrationOfDocumentInBook();
        data.setActNumber(RandomGeneratorsUtil.numberInt(90000, 99999));
        data.setVolume(RandomGeneratorsUtil.numberInt(1, 10));
        data.setYear((short)2010);
        data.setBook(createBook());

        return data;
    }

    public static DataForRegistrationOfDocumentInDoubleIncomingRegister createDataForRegistrationOfDocumentInDoubleIncomingRegister() {
        DataForRegistrationOfDocumentInDoubleIncomingRegister data = new DataForRegistrationOfDocumentInDoubleIncomingRegister();
        data.setDoubleIncomingRegisterNumber(RandomGeneratorsUtil.numberInt(90000, 99999));
        data.setYear((short)2010);

        return data;
    }

    public static DataForRegistrationOfDocumentInIncomingRegister createDataForRegistrationOfDocumentInIncomingRegister() {
        DataForRegistrationOfDocumentInIncomingRegister data = new DataForRegistrationOfDocumentInIncomingRegister();
        data.setIncomingRegisterNumber(RandomGeneratorsUtil.numberInt(90000, 99999));
        data.setRegistrationDate(LocalDate.now());

        return data;
    }

    public static Book createBook() {
        Book book = new Book();
        book.setId(BOOK_ID);
        book.setName(BOOK_NAME);

        return book;
    }

    public static Property createProperty() {
        Property property = new Property();
        property.setType(createPropertyType());
        property.setAccountNumber((Integer.valueOf(RandomGeneratorsUtil.numberInt(100000000, 999999999))).toString());
        property.setOldAccountNumber((Integer.valueOf(RandomGeneratorsUtil.numberInt(100000000, 999999999))).toString());
        property.setAreaByDocuments(100F);
        property.setCadastralId(CADASTRAL_ID);
        property.setCountrySide(RandomGeneratorsUtil.textCyrillic(true, 6));

        property.setPropertyLimits(RandomGeneratorsUtil.textCyrillic(true, 20));
        property.setPropertyRemark(RandomGeneratorsUtil.textCyrillic(true, 50));
        property.setSettlement(createSettlementPr());
        property.setMunicipality(createMunicipalityPr());
        property.setArea(createAreaPr());

        return property;
    }

    public static PermanentUsage createPermanentUsage() {
        PermanentUsage permanentUsage = new PermanentUsage();
        permanentUsage.setId("10000900000000016160");
        permanentUsage.setName("Oбществен селищен парк, градина");

        return permanentUsage;
    }

    public static PropertyType createPropertyType() {
        PropertyType propertyType = new PropertyType();
        propertyType.setId(PROPETY_TYPE_ID_BUILDING);
        propertyType.setName(PROPETY_TYPE_NAME_BUILDING);

        return propertyType;
    }

    public static PlaceNomenclaturePr createSettlementPr() {
        PlaceNomenclaturePr settlement = new PlaceNomenclaturePr();
        settlement.setId(SETTLEMENT_SOFIA_ID);
        settlement.setName(SETTLEMENT_SOFIA_NAME);

        return settlement;
    }

    public static PlaceNomenclaturePr createMunicipalityPr() {
        PlaceNomenclaturePr municipality = new PlaceNomenclaturePr();
        municipality.setId(MUNICIPALITY_SOFIA_ID);
        municipality.setName(MUNICIPALITY_SOFIA_NAME);

        return municipality;
    }

    public static PlaceNomenclaturePr createAreaPr() {
        PlaceNomenclaturePr area = new PlaceNomenclaturePr();
        area.setId(AREA_SOFIA_ID);
        area.setName(AREA_SOFIA_NAME);

        return area;
    }

    public static Owners createOwners() {
        List<Person> personList = new ArrayList<>(2);
        personList.add(createPerson(Person.PropertyRegisterPersonTypeNomenclature.INDIVIDUAL, createIndividual(), null));
        personList.add(createPerson(Person.PropertyRegisterPersonTypeNomenclature.INDIVIDUAL, createIndividual(), null));

        List<PropertyDocument> propertyDocumentList = new ArrayList<>(2);
        propertyDocumentList.add(createPropertyDocument(PropertyDocumentTypeNomenclature.ACT_OF_OWNERSHIP));
        propertyDocumentList.add(createPropertyDocument(PropertyDocumentTypeNomenclature.OTHER));

        Owners owners = new Owners();
        owners.setPersons(personList);
        owners.setPropertyDocuments(propertyDocumentList);

        return owners;
    }

    public static PropertyDocument createPropertyDocument(PropertyDocumentTypeNomenclature propertyDocumentType) {
        PropertyDocument propertyDocument = new PropertyDocument();
        propertyDocument.setType(propertyDocumentType);

        if(propertyDocumentType == PropertyDocumentTypeNomenclature.ACT_OF_OWNERSHIP) {
            propertyDocument.setActNumber(RandomGeneratorsUtil.numberInt(100000000, 999999999));
            propertyDocument.setIncomingRegisterNumber(RandomGeneratorsUtil.numberInt(1000, 99999));
            propertyDocument.setPropertyDocumentDate(LocalDate.now());
            propertyDocument.setVolume(100);
        } else if(propertyDocumentType == PropertyDocumentTypeNomenclature.OTHER) {
            propertyDocument.setDescription(RandomGeneratorsUtil.textCyrillic(true, 20));
        }

        return propertyDocument;
    }

    public static WayOfProvision createWayOfProvision() {
        WayOfProvision wayOfProvision = new WayOfProvision();
        wayOfProvision.setIssuingAuthority(createRegistryOfficeSofia());
        wayOfProvision.setDeliveryMethodType(DeliveryMethodNomenclature.ON_THE_COUNTER.asDeliveryMethodType());
        wayOfProvision.setReceivingOffice(createRegistryOfficeSofia());
        wayOfProvision.setServiceTypeId(SERVICE_TYPE_ID);
        wayOfProvision.setServiceTypeEpzeu(new ServiceType("1", "Обикновена"));

        return wayOfProvision;
    }

    public static WayOfProvisionBaseData createWayOfProvisionBase() {
        WayOfProvisionBaseData wayOfProvision = new WayOfProvisionBaseData();
        wayOfProvision.setIssuingAuthority(createRegistryOfficeSofia());
        wayOfProvision.setDeliveryMethodType(DeliveryMethodNomenclature.ON_THE_COUNTER.asDeliveryMethodType());

        return wayOfProvision;
    }

    public static RegistryOffice createRegistryOffice(String code, String name) {
        RegistryOffice registryOffice = new RegistryOffice();
        registryOffice.setId(code);
        registryOffice.setName(name);

        return registryOffice;
    }

    public static ContactData createContactData() {
        ContactData contactData = new ContactData();
        contactData.setAppEmailAddress(EMAIL);
        contactData.setPhone(PHONE_NUMBER);
        contactData.setAddress(createAddress());
        contactData.setAppAddressee(RandomGeneratorsUtil.textCyrillic(true, LENGTH_NAME));

        return contactData;
    }

    public static Identity createIdentity() {
        Identity identity = new Identity();
        identity.setBirthDate(LocalDate.now());

        return identity;
    }

    public static Identity createIdentityEgn() {
        Identity identity = new Identity();
        identity.setEgn("1010101010");

        return identity;
    }

    public static Individual createIndividual() {
        Individual individual = new Individual();
        individual.setPersonNationality(createBulgariaCountry());
        individual.setIdentity(createIdentity());
        individual.setName(createName());
        individual.setBirthPlace(createBirthPlace());

        return individual;
    }

    public static Name createName() {
        Name applicantName = new Name();
        applicantName.setFirstName(RandomGeneratorsUtil.textCyrillic(true, LENGTH_NAME));
        applicantName.setSurName(RandomGeneratorsUtil.textCyrillic(true, LENGTH_NAME));
        applicantName.setFamilyName(RandomGeneratorsUtil.textCyrillic(true, LENGTH_NAME));

        return applicantName;
    }

    public static IndividualNameOfReport createIndividualNameOfReport() {
        IndividualNameOfReport individualNameOfReport = new IndividualNameOfReport();
        individualNameOfReport.setFirstName(RandomGeneratorsUtil.textCyrillic(true, LENGTH_NAME));
        individualNameOfReport.setSurName(RandomGeneratorsUtil.textCyrillic(true, LENGTH_NAME));
        individualNameOfReport.setFamilyName(RandomGeneratorsUtil.textCyrillic(true, LENGTH_NAME));

        return individualNameOfReport;
    }

    public static BirthPlace createBirthPlace() {
        BirthPlace birthPlace = new BirthPlace();
        birthPlace.setCountryName(COUNTRY_NAME_BG);
        birthPlace.setPlaceName(RandomGeneratorsUtil.textCyrillic(true, 6));

        return birthPlace;
    }

    public static LegalEntity createLegalEntity() {
        LegalEntity legalEntity = new LegalEntity();
        legalEntity.setCountry(createBulgariaCountry());
        legalEntity.setLegalEntityNumber("119044990");
        legalEntity.setCompanyName(COMPANY_NAME);
        legalEntity.setCompanyCase(createCompanyCase());

        return legalEntity;
    }

    public static CompanyCase createCompanyCase() {
        CompanyCase companyCase = new CompanyCase();
        companyCase.setNumber(Integer.valueOf(RandomGeneratorsUtil.numberInt(100000, 500000)).toString());
        companyCase.setYear((short)Calendar.getInstance().get(Calendar.YEAR));
        companyCase.setRegistrationCourt(createCourt());

        return companyCase;
    }

    public static Court createCourt() {
        Court court = new Court();
        court.setId(COURT_ID_SOFIA);
        court.setName(COURT_NAME_SOFIA);

        return court;
    }

    public static Address createAddress() {
        String name = RandomGeneratorsUtil.textCyrillic(true, LENGTH_NAME);
        Integer postCode = RandomGeneratorsUtil.numberInt(1000, 9999);
        int number = RandomGeneratorsUtil.numberInt(NUMBER_MIN, 99);
        int block = RandomGeneratorsUtil.numberInt(NUMBER_MIN, 500);
        int floor = RandomGeneratorsUtil.numberInt(NUMBER_MIN, 17);
        int apartment = RandomGeneratorsUtil.numberInt(NUMBER_MIN, 23);

        Address address = new Address();
        address.setSettlement(new Ekatte("10135", "София"));
        address.setArea(new Ekatte("10135-03", "р-н Младост"));
        address.setMunicipality(new Ekatte("SOF46", "Столична"));
        address.setRegion(new Ekatte("SOF", "София (столица)"));
        address.setPostCode(postCode);
        address.setStreet(name);
        address.setHousingEstate(RandomGeneratorsUtil.textCyrillic(false, 5));
        address.setStreetNumber(Integer.toString(number));
        address.setBlock(Integer.toString(block));
        address.setEntrance(RandomGeneratorsUtil.textCyrillic(true, NUMBER_MIN));
        address.setFloor(Integer.toString(floor));
        address.setApartment(Integer.toString(apartment));

        return address;
    }

    public static File getTestPdfFile() {
        return new File(BootstrapDataUtils.class.getClassLoader().getResource("TestFile.pdf").getFile());
    }

    public static DocumentFileMetadata createDocumentFileMetadata() throws NoSuchAlgorithmException, IOException {
        File testPdfFile = getTestPdfFile();

        String hashAlgorithm = "SHA-256";

        DocumentFileMetadata documentFileMetadata = new DocumentFileMetadata();
        documentFileMetadata.setContentType(FileUtils.getContentTypeFromFileName(testPdfFile.getName()));
        documentFileMetadata.setFileName(testPdfFile.getName());
        documentFileMetadata.setSize(testPdfFile.length());
        documentFileMetadata.setHashAlgorithm(hashAlgorithm);
        documentFileMetadata.setHash(FileUtils.getHashFromFile(testPdfFile, hashAlgorithm));

        return documentFileMetadata;
    }

    public static File getXmlDirFile() {
        return new File(BootstrapDataUtils.class.getClassLoader().getResource("xml").getFile());
    }

    public static File getFileByPath(String path) {
        return new File(BootstrapDataUtils.class.getClassLoader().getResource(path).getFile());
    }

    public static InputStream getFileInputStreamByPath(String path) throws IOException {
        Resource resource = new ClassPathResource(path);
        return resource.getInputStream();
    }

    public static RegistryOffice createRegistryOfficeSofia() {
        return createRegistryOffice(REGISTRY_OFFICE_CODE_SF, REGISTRY_OFFICE_NAME_SF);
    }
}
