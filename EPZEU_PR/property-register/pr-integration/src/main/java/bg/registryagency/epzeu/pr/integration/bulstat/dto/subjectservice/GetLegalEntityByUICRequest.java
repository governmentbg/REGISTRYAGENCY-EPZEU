package bg.registryagency.epzeu.pr.integration.bulstat.dto.subjectservice;

import lombok.Getter;
import lombok.Setter;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


@Getter
@Setter
@XmlType(name = "GetLegalEntityByUICRequest")
public class GetLegalEntityByUICRequest {
    @XmlElement(name = "UIC")
    private String uic;
}
