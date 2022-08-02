package bg.registryagency.epzeu.pr.application;

import bg.registryagency.epzeu.pr.application.segment.Identity;
import bg.registryagency.epzeu.pr.application.segment.PeriodForReport;
import bg.registryagency.epzeu.pr.integration.pr.enums.PersonTypeNomenclature;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;


/**
 * Искане за справка чрез отдалечен достъп за лице от Имотен регистър за всички служби по вписвания
 * 
 * <p>Java class for RequestForReportOfPersonInAllRegistryOffices complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="RequestForReportOfPersonInAllRegistryOffices"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="PeriodForReport" type="{PersonOfReport}PersonOfReport"/&gt;
 *         &lt;element name="PersonType" type="{PersonType}PersonType"/&gt;
 *         &lt;element name="Identity" type="{Identity}Identity"/&gt;
 *         &lt;element name="LegalEntityNumber" type="{LegalEntityNumber}LegalEntityNumber"/&gt;
 *         &lt;element name="ApplicantData" type="{ApplicantData}ApplicantData"/&gt;
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
@XmlRootElement(name = "RequestForReportOfPersonInAllRegistryOffices")
@XmlType(name = "RequestForReportOfPersonInAllRegistryOffices", propOrder = {
    "periodForReport",
    "personType",
    "identity",
    "legalEntityNumber",
    "applicantData",
    "gdprAgreement"
})
public class RequestForReportOfPersonInAllRegistryOffices extends BaseRequestForReport {

    private PeriodForReport periodForReport;
    private PersonTypeNomenclature personType;
    private Identity identity;
    private String legalEntityNumber;

    @XmlElement(name = "PeriodForReport", required = true)
    public PeriodForReport getPeriodForReport() {
        return periodForReport;
    }
    @XmlElement(name = "PersonType", required = true)
    public PersonTypeNomenclature getPersonType() {
        return personType;
    }
    @XmlElement(name = "Identity")
    public Identity getIdentity() {
        return identity;
    }
    @XmlElement(name = "LegalEntityNumber")
    public String getLegalEntityNumber() {
        return legalEntityNumber;
    }

    @Override
    public Object getSubjectOfReport() {
        if(personType == PersonTypeNomenclature.INDIVIDUAL) {
            return identity;
        } else {
            return legalEntityNumber;
        }
    }
}
