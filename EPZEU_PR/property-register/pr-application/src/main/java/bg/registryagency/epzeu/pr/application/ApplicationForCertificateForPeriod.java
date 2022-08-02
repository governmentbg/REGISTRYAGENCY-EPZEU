package bg.registryagency.epzeu.pr.application;

import bg.registryagency.epzeu.pr.application.segment.*;
import bg.registryagency.epzeu.pr.application.segment.mapper.IdentityDtoMapper;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.xml.bind.annotation.*;
import java.util.List;


/**
 * Заявление за издаване на удостоверение за период
 * 
 * <p>Java class for ApplicationForCertificateForPeriod complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="ApplicationForIssuingOfCertificateForPeriodFromPropertyRegister"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="ApplicationType" type="{http://ereg.egov.bg/value/0008-000144}ApplicationType"/&gt;
 *         &lt;element name="CertificateDataType" type="{CertificateDataType}CertificateDataType"/&gt;
 *         &lt;element name="InitialApplicationData" type="{InitialApplicationData}InitialApplicationData" minOccurs="0"/&gt;
 *         &lt;element name="ApplicantData" type="{Individual}Individual"/&gt;
 *         &lt;element name="PeriodForCertificate" type="{PeriodForCertificate}PeriodForCertificate"/&gt;
 *         &lt;choice&gt;
 *           &lt;element name="RequestedPerson" type="{Person}Person"/&gt;
 *           &lt;element name="PropertyData" type="{PropertyData}PropertyData"/&gt;
 *         &lt;/choice&gt;
 *         &lt;element name="WayOfProvision" type="{WayOfProvision}WayOfProvision"/&gt;
 *         &lt;element name="ContactData" type="{ContactData}ContactData"/&gt;
 *         &lt;element name="AttachedDocuments" type="{AttachedDocuments}AttachedDocuments" minOccurs="0"/&gt;
 *       &lt;/sequence&gt;
 *     &lt;/restriction&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 * 
 * 
 */
@Setter
@NoArgsConstructor
@XmlRootElement(name = "ApplicationForIssuingOfCertificateForPeriodFromPropertyRegister")
@XmlType(name = "ApplicationForIssuingOfCertificateForPeriodFromPropertyRegister",
    propOrder = {
    "applicationContentType",
    "certificateDataType",
    "initialApplicationData",
    "applicantData",
    "periodForCertificate",
    "requestedPerson",
    "propertyData",
    "wayOfProvision",
    "contactData",
    "attachedDocuments",
    "signature",
    "gdprAgreement"
})
public class ApplicationForCertificateForPeriod extends BaseApplicationForCertificate {

    protected CertificateDataTypeNomenclature certificateDataType;
    protected PeriodForCertificate periodForCertificate;
    //RequestedPerson is not null when CertificateDataType = PERSON
    protected Person requestedPerson;
    //PropertyData is not null when CertificateDataType = PROPERTY
    protected PropertyData propertyData;

    @XmlElement(name = "CertificateDataType", required = true)
    @XmlSchemaType(name = "string")
    public CertificateDataTypeNomenclature getCertificateDataType() {
        return certificateDataType;
    }
    @XmlElement(name = "PeriodForCertificate", required = true)
    public PeriodForCertificate getPeriodForCertificate() {
        return periodForCertificate;
    }
    @XmlElement(name = "RequestedPerson")
    public Person getRequestedPerson() {
        return requestedPerson;
    }
    @XmlElement(name = "PropertyData")
    public PropertyData getPropertyData() {
        return propertyData;
    }

    public ApplicationForCertificateForPeriod(Individual applicantData) {
        this.applicantData = applicantData;
    }

    @Override
    public String getApplicantName() {
        return applicantData.getName().toString();
    }

    @Override
    public String getIdentity() {
        return IdentityDtoMapper.asDto(applicantData.getIdentity());
    }
}
