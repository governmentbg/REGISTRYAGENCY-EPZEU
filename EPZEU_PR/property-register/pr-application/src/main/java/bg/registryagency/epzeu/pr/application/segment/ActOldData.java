package bg.registryagency.epzeu.pr.application.segment;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.xml.bind.annotation.*;


/**
 * Данни за вписване на стар акт в ИР
 * 
 * <p>Java class for ActOldData complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="ActOldData"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="ActOldNumber" type="{ActOldNumber}ActOldNumber"/&gt;
 *         &lt;element name="VolumeOld" type="{VolumeOld}VolumeOld"/&gt;
 *         &lt;element name="CaseNumber" type="{CaseNumber}CaseNumber"/&gt;
 *         &lt;element name="Year" type="{Year}Year"/&gt;
 *         &lt;element name="ActAdditionalData" type="{ActAdditionalData}ActAdditionalData"/&gt;
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
@XmlType(name = "ActOldData", propOrder = {
    "actOldNumber",
    "volumeOld",
    "caseNumber",
    "year",
    "actAdditionalData"
})
public class ActOldData {

    @XmlElement(name = "ActOldNumber", required = true)
    protected String actOldNumber;
    @XmlElement(name = "VolumeOld", required = true)
    protected String volumeOld;
    @XmlElement(name = "CaseNumber")
    protected String caseNumber;
    @XmlElement(name = "Year", required = true)
    @XmlSchemaType(name = "gYear")
    protected Short year;
    @XmlElement(name = "ActAdditionalData", required = true)
    protected String actAdditionalData;

}
