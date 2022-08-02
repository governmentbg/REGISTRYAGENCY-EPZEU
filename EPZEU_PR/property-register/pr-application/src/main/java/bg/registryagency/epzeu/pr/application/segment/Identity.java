package bg.registryagency.epzeu.pr.application.segment;

import bg.registryagency.epzeu.pr.application.adapter.LocalDateAdapter;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.xml.bind.annotation.*;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;
import java.time.LocalDate;

/**
 * ЕГН/ЛНЧ/Дата на раждане.
 *
 * Identity може да има само едно поле, което да не е null.
 * Този модел е направен, за да може да конструира XML, в който еднозначно се разпознава Identity от какъв тип е ЕГН/ЛНЧ/Дата на раждане.
 * В презентационният слой Identity е едно string поле, което може да бъде или ЕГН, или ЛНЧ или Дата на раждане.
 *
 * <p>Java class for Identity complex type.
 *
 * <p>The following schema fragment specifies the expected content contained within this class.
 *
 * <pre>
 * &lt;complexType name="Identity"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;choice&gt;
 *         &lt;element name="EGN" type="{EGN}EGN"/&gt;
 *         &lt;element name="IdentityCardNumber" type="{IdentityCardNumber}IdentityCardNumber"/&gt;
 *         &lt;element name="BirthDate" type="{BirthDate}BirthDate"/&gt;
 *       &lt;/choice&gt;
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
@XmlType(name = "Identity", propOrder = {
    "egn",
    "lnch",
    "birthDate"
})
public class Identity {
    @XmlElement(name = "EGN")
    protected String egn;
    @XmlElement(name = "LNCH")
    protected String lnch;
    @XmlElement(name = "BirthDate")
    @XmlJavaTypeAdapter(LocalDateAdapter.class)
    protected LocalDate birthDate;

    public Identity(String egn, String lnch, LocalDate birthDate) {
        this.egn = egn;
        this.lnch = lnch;
        this.birthDate = birthDate;
    }
}
