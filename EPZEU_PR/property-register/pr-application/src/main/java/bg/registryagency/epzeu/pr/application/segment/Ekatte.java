package bg.registryagency.epzeu.pr.application.segment;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.xml.bind.annotation.*;

/**
 * Единният класификатор на административно-териториалните и териториалните единици (ЕКАТТЕ).
 *
 * <p>Java class for EKATTE complex type.
 *
 * <p>The following schema fragment specifies the expected content contained within this class.
 *
 * <pre>
 * &lt;complexType name="EKATTE"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="Code" type="{EkkateCode}EkkateCode"/&gt;
 *         &lt;element name="Name" type="{EkkateName}EkkateName"/&gt;
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
@XmlType(name = "EKATTE", propOrder = {
    "code",
    "name"
})
public class Ekatte {
    @XmlElement(name = "Code")
    protected String code;
    @XmlElement(name = "Name")
    protected String name;

    public Ekatte(String code, String name) {
        this.code = code;
        this.name = name;
    }
}
