package bg.registryagency.epzeu.pr.application.segment;

import bg.registryagency.epzeu.pr.application.adapter.LocalDateAdapter;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.xml.bind.annotation.*;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;
import java.time.LocalDate;

/**
 * Данни на иницииращо/първоначално заявление
 *
 * <p>Java class for InitialApplicationData complex type.
 *
 * <p>The following schema fragment specifies the expected content contained within this class.
 *
 * <pre>
 * &lt;complexType name="InitialApplicationData"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="IncomingReauNumber" type="{IncomingReauNumber}IncomingReauNumber"/&gt;
 *         &lt;element name="RegisterNumber" type="{IncomingRegisterNumber}IncomingRegisterNumber" minOccurs="0"/&gt;
 *         &lt;element name="RegisterDate" type="{RegistrationDate}RegistrationDate"/&gt;
 *         &lt;element name="RegisterType" type="{RegisterType}RegisterType"/&gt;
 *         &lt;element name="RegistryOffice" type="{RegistryOffice}RegistryOffice"/&gt;
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
@XmlType(name = "InitialApplicationData", propOrder = {
    "incomingReauNumber",
    "registerNumber",
    "registerDate",
    "registerType",
    "registryOffice"
})
public class InitialApplicationData {
    @XmlElement(name = "IncomingReauNumber", required = true)
    private String incomingReauNumber;
    @XmlElement(name = "RegisterNumber", required = true)
    private Integer registerNumber;
    @XmlElement(name = "RegisterDate", required = true)
    @XmlJavaTypeAdapter(LocalDateAdapter.class)
    private LocalDate registerDate;
    @XmlElement(name = "RegisterType", required = true)
    private RegisterType registerType;
    @XmlElement(name = "RegistryOffice", required = true)
    private RegistryOffice registryOffice;
}
