package bg.registryagency.epzeu.pr.application.segment;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.xml.bind.annotation.*;


/**
 * Данни за вписване на документ в книга на ИР
 * 
 * <p>Java class for DataForRegistrationOfDocumentInBook complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="DataForRegistrationOfDocumentInBook"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="ActNumber" type="{ActNumber}ActNumber"/&gt;
 *         &lt;element name="Volume" type="{Volume}Volume"/&gt;
 *         &lt;element name="Year" type="{Year}Year"/&gt;
 *         &lt;element name="Book" type="{Book}Book"/&gt;
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
@XmlType(name = "DataForRegistrationOfDocumentInBook", propOrder = {
    "actNumber",
    "volume",
    "year",
    "book"
})
public class DataForRegistrationOfDocumentInBook {

    @XmlElement(name = "ActNumber", required = true)
    protected Integer actNumber;
    @XmlElement(name = "Volume", required = true)
    protected Integer volume;
    @XmlElement(name = "Year", required = true)
    @XmlSchemaType(name = "gYear")
    protected short year;
    @XmlElement(name = "Book", required = true)
    protected Book book;

}
