package bg.registryagency.epzeu.pr.application.segment;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * Начин на трайно ползване
 *
 * <p>Java class for PermanentUsage complex type.
 *
 * <p>The following schema fragment specifies the expected content contained within this class.
 *
 * <pre>
 *  &lt;complexType name="PermanentUsage"&gt;
 *    &lt;complexContent&gt;
 *    &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *
 * </pre>
 *
 *
 */

@Getter
@Setter
@NoArgsConstructor
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "PermanentUsage", propOrder = {
    "id",
    "name"
})
public class PermanentUsage {
    @XmlElement(name = "Id", required = true)
    protected String id;
    @XmlElement(name = "Name", required = true)
    protected String name;
}
