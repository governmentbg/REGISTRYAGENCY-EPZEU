package bg.registryagency.epzeu.pr.application;

import bg.registryagency.epzeu.pr.application.segment.*;
import bg.registryagency.epzeu.pr.application.segment.mapper.IdentityDtoMapper;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.xml.bind.annotation.*;
import java.util.List;

/**
 * Удостоверение за лице от Имотен регистър
 *
 * <p>Java class for ApplicationForIssuingOfCertificateForPersonFromPropertyRegister complex type.
 *
 * <p>The following schema fragment specifies the expected content contained within this class.
 *
 * <pre>
 * &lt;complexType name="ApplicationForIssuingOfCertificateForPersonFromPropertyRegister"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="ApplicationType" type="{http://ereg.egov.bg/value/0008-000144}ApplicationType"/&gt;
 *         &lt;element name="InitialApplicationData" type="{InitialApplicationData}InitialApplicationData" minOccurs="0"/&gt;
 *         &lt;element name="ApplicantData" type="{Individual}Individual"/&gt;
 *         &lt;element name="RequestedPerson" type="{Person}Person"/&gt;
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
@ToString(callSuper=true)
@XmlRootElement(name = "ApplicationForIssuingOfCertificateForPersonFromPropertyRegister")
@XmlType(name = "ApplicationForIssuingOfCertificateForPersonFromPropertyRegister", propOrder = {
    "applicationContentType",
    "initialApplicationData",
    "applicantData",
    "requestedPerson",
    "wayOfProvision",
    "contactData",
    "attachedDocuments",
    "signature",
    "gdprAgreement"
})
public class ApplicationForCertificateForPerson extends BaseApplicationForCertificate {

    protected Person requestedPerson;

    @XmlElement(name = "RequestedPerson", required = true)
    public Person getRequestedPerson() {
        return requestedPerson;
    }

    public ApplicationForCertificateForPerson(Individual applicantData) {
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
