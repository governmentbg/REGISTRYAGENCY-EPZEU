package bg.registryagency.epzeu.pr.application.segment;

import bg.registryagency.epzeu.pr.application.adapter.LocalDateAdapter;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;
import java.time.LocalDate;

/**
 * Данни за документ/акт обект на справка
 *
 * <p>Java class for DocumentOfReport complex type.
 *
 * <p>The following schema fragment specifies the expected content contained within this class.
 *
 * <pre>
 * &lt;complexType name="DocumentOfReport"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="Id" type="{DocumentId}DocumentId"/&gt;
 *         &lt;element name="RegistrationDate" type="{RegistrationDate}:RegistrationDate"/&gt;
 *         &lt;element name="IncomingRegisterNumber" type="{IncomingRegisterNumber}:IncomingRegisterNumber"/&gt;
 *         &lt;element name="DoubleIncomingRegisterNumber" type="{DoubleIncomingRegisterNumber}:DoubleIncomingRegisterNumber"/&gt;
 *         &lt;element name="Year" type="{Year}:Year"/&gt;
 *         &lt;element name="Book" type="{Book}:Book"/&gt;
 *         &lt;element name="Volume" type="{Volume}:Volume"/&gt;
 *         &lt;element name="ActNumber" type="{ActNumber}:ActNumber"/&gt;
 *         &lt;element name="RegistryOffice" type="{RegistryOffice}:RegistryOffice"/&gt;
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
@XmlType(name = "DocumentOfReport", propOrder = {
    "id",
    "incomingRegisterDate",
    "incomingRegisterNumber",
    "doubleIncomingRegisterNumber",
    "year",
    "book",
    "volume",
    "actNumber",
    "registryOffice"
})
public class DocumentOfReport {
    @XmlElement(name = "Id", required = true)
    private String id;
    @XmlElement(name = "IncomingRegisterDate", required = true)
    @XmlJavaTypeAdapter(LocalDateAdapter.class)
    private LocalDate incomingRegisterDate;
    @XmlElement(name = "IncomingRegisterNumber", required = true)
    private Integer incomingRegisterNumber;
    @XmlElement(name = "DoubleIncomingRegisterNumber", required = true)
    private String doubleIncomingRegisterNumber;
    @XmlElement(name = "Year", required = true)
    private Short year;
    @XmlElement(name = "Book", required = true)
    private Book book;
    @XmlElement(name = "Volume", required = true)
    private String volume;
    @XmlElement(name = "ActNumber", required = true)
    private String actNumber;
    @XmlElement(name = "RegistryOffice", required = true)
    private RegistryOffice registryOffice;
}
