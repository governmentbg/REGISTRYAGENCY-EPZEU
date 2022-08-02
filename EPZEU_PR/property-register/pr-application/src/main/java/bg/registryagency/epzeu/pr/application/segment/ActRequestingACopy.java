package bg.registryagency.epzeu.pr.application.segment;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * Акт, от който се иска препис
 * 
 * <p>Java class for ActRequestingACopy complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="ActRequestingACopy"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="CopyReason" type="{CopyReason}CopyReason"/&gt;
 *         &lt;element name="RegistryOffice" type="{RegistryOffice}RegistryOffice"/&gt;
 *         &lt;choice&gt;
 *           &lt;element name="ActData" type="{ActData}ActData"/&gt;
 *           &lt;element name="ActOldData" type="{ActOldData}ActOldData"/&gt;
 *         &lt;/choice&gt;
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
@XmlType(name = "ActRequestingACopy", propOrder = {
    "copyReason",
    "registryOffice",
    "actData",
    "actOldData"
})
public class ActRequestingACopy {
    @XmlElement(name = "CopyReason", required = true)
    protected String copyReason;
    @XmlElement(name = "RegistryOffice", required = true)
    protected RegistryOffice registryOffice;
    @XmlElement(name = "ActData")
    protected ActData actData;
    @XmlElement(name = "ActOldData")
    protected ActOldData actOldData;

}
