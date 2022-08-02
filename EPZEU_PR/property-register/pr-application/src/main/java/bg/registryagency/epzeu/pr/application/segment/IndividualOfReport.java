package bg.registryagency.epzeu.pr.application.segment;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * Физическо лице обект на справка
 * 
 * <p>Java class for IndividualOfReport complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="IndividualOfReport"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="PersonNationality" type="{Country}Country"/&gt;
 *         &lt;element name="Identity" type="{IdentityOfReport}IdentityOfReport"/&gt;
 *         &lt;element name="Name" type="{IndividualNameOfReport}IndividualNameOfReport"/&gt;
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
@XmlType(name = "IndividualOfReport", propOrder = {
    "personNationality",
    "identity",
    "individualNameOfReport"
})
public class IndividualOfReport {

    @XmlElement(name = "PersonNationality")
    protected Country personNationality;
    @XmlElement(name = "Identity")
    protected String identity;
    @XmlElement(name = "Name")
    protected IndividualNameOfReport individualNameOfReport;
}
