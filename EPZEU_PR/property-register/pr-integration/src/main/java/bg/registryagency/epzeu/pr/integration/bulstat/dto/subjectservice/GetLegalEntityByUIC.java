package bg.registryagency.epzeu.pr.integration.bulstat.dto.subjectservice;

import lombok.Getter;
import lombok.Setter;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;


@Getter
@Setter
@XmlRootElement(name = "GetLegalEntityByUIC")
public class GetLegalEntityByUIC {

    @XmlElement(name = "GetLegalEntityByUICRequest", namespace = "http://www.bulstat.bg/GetLegalEntityByUICRequest" )
    private GetLegalEntityByUICRequest getLegalEntityByUICRequest;

}
