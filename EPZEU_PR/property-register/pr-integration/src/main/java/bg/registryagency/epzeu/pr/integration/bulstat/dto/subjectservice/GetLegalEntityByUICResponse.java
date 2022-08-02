package bg.registryagency.epzeu.pr.integration.bulstat.dto.subjectservice;

import lombok.Getter;
import lombok.Setter;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@Getter
@Setter
@XmlRootElement(name = "GetLegalEntityByUICResponse")
public class GetLegalEntityByUICResponse {
    @XmlElement(name = "Subject", namespace = "http://www.bulstat.bg/Subject")
    private Subject subject;
}
