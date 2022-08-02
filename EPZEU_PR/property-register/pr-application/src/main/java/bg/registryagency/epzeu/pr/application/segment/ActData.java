package bg.registryagency.epzeu.pr.application.segment;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * Данни за нов акт в ИР
 * 
 * <p>Java class for ActData complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="ActData"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="DataForRegistrationOfDocumentInBook" type="{DataForRegistrationOfDocumentInBook}DataForRegistrationOfDocumentInBook" minOccurs="0"/&gt;
 *         &lt;element name="DataForRegistrationOfDocumentInDoubleIncomingRegister" type="{DataForRegistrationOfDocumentInDoubleIncomingRegister}DataForRegistrationOfDocumentInDoubleIncomingRegister" minOccurs="0"/&gt;
 *         &lt;element name="DataForRegistrationOfDocumentInIncomingRegister" type="{DataForRegistrationOfDocumentInIncomingRegister}DataForRegistrationOfDocumentInIncomingRegister" minOccurs="0"/&gt;
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
@XmlType(name = "ActData", propOrder = {
    "dataForRegistrationOfDocumentInBook",
    "dataForRegistrationOfDocumentInDoubleIncomingRegister",
    "dataForRegistrationOfDocumentInIncomingRegister"
})
public class ActData {

    @XmlElement(name = "DataForRegistrationOfDocumentInBook")
    protected DataForRegistrationOfDocumentInBook dataForRegistrationOfDocumentInBook;
    @XmlElement(name = "DataForRegistrationOfDocumentInDoubleIncomingRegister")
    protected DataForRegistrationOfDocumentInDoubleIncomingRegister dataForRegistrationOfDocumentInDoubleIncomingRegister;
    @XmlElement(name = "DataForRegistrationOfDocumentInIncomingRegister")
    protected DataForRegistrationOfDocumentInIncomingRegister dataForRegistrationOfDocumentInIncomingRegister;

}
