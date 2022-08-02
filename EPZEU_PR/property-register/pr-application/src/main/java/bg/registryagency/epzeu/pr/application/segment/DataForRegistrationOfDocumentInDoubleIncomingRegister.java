package bg.registryagency.epzeu.pr.application.segment;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.xml.bind.annotation.*;


/**
 * Данни за регистриране на документ в двойно входящ регистър на ИР
 * 
 * <p>Java class for DataForRegistrationOfDocumentInDoubleIncomingRegister complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="DataForRegistrationOfDocumentInDoubleIncomingRegister"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="DoubleIncomingRegisterNumber" type="{DoubleIncomingRegisterNumber}DoubleIncomingRegisterNumber"/&gt;
 *         &lt;element name="Year" type="{Year}Year"/&gt;
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
@XmlType(name = "DataForRegistrationOfDocumentInDoubleIncomingRegister", propOrder = {
    "doubleIncomingRegisterNumber",
    "year"
})
public class DataForRegistrationOfDocumentInDoubleIncomingRegister {

    @XmlElement(name = "DoubleIncomingRegisterNumber", required = true)
    protected Integer doubleIncomingRegisterNumber;
    @XmlElement(name = "Year", required = true)
    @XmlSchemaType(name = "gYear")
    protected Short year;

}
