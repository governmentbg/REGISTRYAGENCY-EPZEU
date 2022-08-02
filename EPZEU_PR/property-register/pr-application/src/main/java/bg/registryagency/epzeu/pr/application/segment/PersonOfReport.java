package bg.registryagency.epzeu.pr.application.segment;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * Данни за физическо/юридическо лице обект на справка
 * 
 * <p>Java class for PersonOfReport complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="PersonOfReport"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="PersonId" type="{PersonOfReportId}PersonOfReportId"/&gt;
 *         &lt;element name="RegistryOffice" type="{RegistryOffice}RegistryOffice"/&gt;
 *         &lt;choice&gt;
 *           &lt;element name="Individual" type="{IndividualOfReport}IndividualOfReport"/&gt;
 *           &lt;element name="LegalEntity" type="{LegalEntityOfReport}LegalEntityOfReport"/&gt;
 *         &lt;/choice&gt;
 *       &lt;/sequence&gt;
 *     &lt;/restriction&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 * 
 * 
 */
@Getter
@Setter
@NoArgsConstructor
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "PersonOfReport", propOrder = {
    "personId",
    "registryOffice",
    "individual",
    "legalEntity"
})
public class PersonOfReport {
    @XmlElement(name = "PersonId", required = true)
    protected String personId;
    @XmlElement(name = "RegistryOffice")
    protected RegistryOffice registryOffice;
    @XmlElement(name = "Individual")
    protected IndividualOfReport individual;
    @XmlElement(name = "LegalEntity")
    protected LegalEntityOfReport legalEntity;
}
