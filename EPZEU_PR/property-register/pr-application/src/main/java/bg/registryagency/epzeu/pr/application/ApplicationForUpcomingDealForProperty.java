package bg.registryagency.epzeu.pr.application;


import bg.registryagency.epzeu.pr.application.segment.*;
import bg.registryagency.epzeu.pr.application.segment.mapper.IdentityDtoMapper;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.xml.bind.annotation.*;


/**
 * Заявление за деклариране на предстояща сделка с недвижим имот
 * 
 * <p>Java class for ApplicationForDeclarationOfUpcomingDealForPropertyFromPropertyRegister complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="ApplicationForDeclarationOfUpcomingDealForPropertyFromPropertyRegister"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="ApplicantData" type="{ApplicantData}ApplicantData"/&gt;
 *         &lt;element name="UpcomingDealForProperty" type="{UpcomingDealForProperty}UpcomingDealForProperty"/&gt;
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
@XmlRootElement(name = "ApplicationForDeclarationOfUpcomingDealForPropertyFromPropertyRegister")
@XmlType(name = "ApplicationForDeclarationOfUpcomingDealForPropertyFromPropertyRegister", propOrder = {
    "applicantData",
    "upcomingDealForProperty",
    "signature",
    "gdprAgreement"
})
public class ApplicationForUpcomingDealForProperty extends BaseApplicationForm {

    protected ApplicantData applicantData;
    protected UpcomingDealForProperty upcomingDealForProperty;

    public ApplicationForUpcomingDealForProperty(ApplicantData applicantData) {
        this.applicantData = applicantData;
    }

    @XmlElement(name = "ApplicantData", required = true)
    public ApplicantData getApplicantData() {
        return applicantData;
    }

    @XmlElement(name = "UpcomingDealForProperty", required = true)
    public UpcomingDealForProperty getUpcomingDealForProperty() {
        return upcomingDealForProperty;
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
