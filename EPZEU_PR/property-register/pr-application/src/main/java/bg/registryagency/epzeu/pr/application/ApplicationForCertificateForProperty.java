package bg.registryagency.epzeu.pr.application;

import bg.registryagency.epzeu.pr.application.segment.*;
import bg.registryagency.epzeu.pr.application.segment.mapper.IdentityDtoMapper;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.xml.bind.annotation.*;
import java.util.List;


/**
 * Заявление за издаване на удостоверение за лице
 * 
 * <p>Java class for ApplicationForIssuingOfCertificateForPropertyFromPropertyRegister complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="ApplicationForIssuingOfCertificateForPropertyFromPropertyRegister"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="ApplicationType" type="{http://ereg.egov.bg/value/0008-000144}ApplicationType"/&gt;
 *         &lt;element name="InitialApplicationData" type="{InitialApplicationData}InitialApplicationData" minOccurs="0"/&gt;
 *         &lt;element name="ApplicantData" type="{Individual}Individual"/&gt;
 *         &lt;element name="RequestedProperty" type="{Property}Property"/&gt;
 *         &lt;element name="CurrentOwners" type="{Owners}Owners"/&gt;
 *         &lt;element name="PreviousOwners" type="{Owners}Owners"/&gt;
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
@XmlRootElement(name = "ApplicationForIssuingOfCertificateForPropertyFromPropertyRegister")
@XmlType(name = "ApplicationForIssuingOfCertificateForPropertyFromPropertyRegister", propOrder = {
    "applicationContentType",
    "initialApplicationData",
    "applicantData",
    "requestedProperty",
    "currentOwners",
    "previousOwners",
    "wayOfProvision",
    "contactData",
    "attachedDocuments",
    "signature",
    "gdprAgreement"
})
public class ApplicationForCertificateForProperty extends BaseApplicationForCertificate {

    protected Property requestedProperty;
    protected Owners currentOwners;
    protected Owners previousOwners;

    @XmlElement(name = "RequestedProperty", required = true)
    public Property getRequestedProperty() {
        return requestedProperty;
    }
    @XmlElement(name = "CurrentOwners", required = true)
    public Owners getCurrentOwners() {
        return currentOwners;
    }
    @XmlElement(name = "PreviousOwners", required = true)
    public Owners getPreviousOwners() {
        return previousOwners;
    }

    public ApplicationForCertificateForProperty(Individual applicantData) {
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
