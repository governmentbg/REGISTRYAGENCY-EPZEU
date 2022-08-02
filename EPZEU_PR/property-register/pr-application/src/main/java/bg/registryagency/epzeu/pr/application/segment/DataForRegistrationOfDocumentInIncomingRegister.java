package bg.registryagency.epzeu.pr.application.segment;

import bg.registryagency.epzeu.pr.application.adapter.LocalDateAdapter;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.xml.bind.annotation.*;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;
import java.time.LocalDate;


/**
 * Данни за регистриране на документ във входящ регистър на ИР
 * 
 * <p>Java class for DataForRegistrationOfDocumentInIncomingRegister complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="DataForRegistrationOfDocumentInIncomingRegister"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="IncomingRegisterNumber" type="{IncomingRegisterNumber}IncomingRegisterNumber"/&gt;
 *         &lt;element name="RegistrationDate" type="{RegistrationDate}RegistrationDate"/&gt;
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
@XmlType(name = "DataForRegistrationOfDocumentInIncomingRegister", propOrder = {
    "incomingRegisterNumber",
    "registrationDate"
})
public class DataForRegistrationOfDocumentInIncomingRegister {

    @XmlElement(name = "IncomingRegisterNumber", required = true)
    protected Integer incomingRegisterNumber;
    @XmlElement(name = "RegistrationDate", required = true)
    @XmlJavaTypeAdapter(LocalDateAdapter.class)
    protected LocalDate registrationDate;

}
