package bg.registryagency.epzeu.pr.application;


import bg.registryagency.epzeu.pr.application.provider.DocumentAttachable;
import bg.registryagency.epzeu.pr.application.segment.*;
import bg.registryagency.epzeu.pr.application.segment.mapper.IdentityDtoMapper;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.xml.bind.annotation.*;
import java.util.List;


/**
 * Заявление за издаване на заверен препис
 * 
 * <p>Java class for ApplicationForIssuingOfCertifiedCopyFromPropertyRegister complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="ApplicationForIssuingOfCertifiedCopyFromPropertyRegister"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="ApplicantData" type="{ApplicantData}ApplicantData"/&gt;
 *         &lt;element name="ServiceRecipient" type="{ServiceRecipient}ServiceRecipient"/&gt;
 *         &lt;element name="ActRequestingACopy" type="{ActRequestingACopy}ActRequestingACopy"/&gt;
 *         &lt;element name="WayOfProvision" type="{WayOfProvisionBaseData}WayOfProvisionBaseData"/&gt;
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
@XmlRootElement(name = "ApplicationForIssuingOfCertifiedCopyFromPropertyRegister")
@XmlType(name = "ApplicationForIssuingOfCertifiedCopyFromPropertyRegister", propOrder = {
    "applicantData",
    "serviceRecipient",
    "actRequestingACopy",
    "wayOfProvision",
    "contactData",
    "attachedDocuments",
    "signature",
    "gdprAgreement"
})
public class ApplicationForCertifiedCopy extends BaseApplicationForCopy implements DocumentAttachable {

    protected ApplicantData applicantData;
    protected ServiceRecipient serviceRecipient;
    protected List<AttachedDocument> attachedDocuments;

    @XmlElement(name = "ApplicantData", required = true)
    public ApplicantData getApplicantData() {
        return applicantData;
    }
    @XmlElement(name = "ServiceRecipient", required = true)
    public ServiceRecipient getServiceRecipient() {
        return serviceRecipient;
    }

    @Override
    @XmlElementWrapper(name = "AttachedDocuments")
    @XmlElement(name = "AttachedDocument", namespace = "http://www.registryagency.bg/schemas/property-register/segments")
    public List<AttachedDocument> getAttachedDocuments() {
        return attachedDocuments;
    }

    public ApplicationForCertifiedCopy(ApplicantData applicantData) {
        this.applicantData = applicantData;
    }

    @Override
    public String getApplicantName() {
        return applicantData.getIndividual().getName().toString();
    }

    @Override
    public String getIdentity() {
        return IdentityDtoMapper.asDto(applicantData.getIndividual().getIdentity());
    }
}
