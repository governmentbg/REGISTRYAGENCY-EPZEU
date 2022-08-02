package bg.registryagency.epzeu.pr.application;


import bg.registryagency.epzeu.pr.application.segment.ActRequestingACopy;
import bg.registryagency.epzeu.pr.application.segment.ContactData;
import bg.registryagency.epzeu.pr.application.segment.Individual;
import bg.registryagency.epzeu.pr.application.segment.WayOfProvisionBaseData;
import bg.registryagency.epzeu.pr.application.segment.mapper.IdentityDtoMapper;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.xml.bind.annotation.*;


/**
 * Заявление за издаване на заверен препис
 * 
 * <p>Java class for ApplicationForIssuingOfNotCertifiedCopyFromPropertyRegister complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="ApplicationForIssuingOfNotCertifiedCopyFromPropertyRegister"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="Individual" type="{Individual}Individual"/&gt;
 *         &lt;element name="ActRequestingACopy" type="{ActRequestingACopy}ActRequestingACopy"/&gt;
 *         &lt;element name="WayOfProvision" type="{WayOfProvisionBaseData}WayOfProvisionBaseData"/&gt;
 *         &lt;element name="ContactData" type="{ContactData}ContactData"/&gt;
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
@XmlRootElement(name = "ApplicationForIssuingOfNotCertifiedCopyFromPropertyRegister")
@XmlType(name = "ApplicationForIssuingOfNotCertifiedCopyFromPropertyRegister", propOrder = {
    "applicantData",
    "actRequestingACopy",
    "wayOfProvision",
    "contactData",
    "signature",
    "gdprAgreement"
})
public class ApplicationForNotCertifiedCopy extends BaseApplicationForCopy {

    protected Individual applicantData;

    @XmlElement(name = "ApplicantData", required = true)
    public Individual getApplicantData() {
        return applicantData;
    }

    public ApplicationForNotCertifiedCopy(Individual applicantData) {
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
