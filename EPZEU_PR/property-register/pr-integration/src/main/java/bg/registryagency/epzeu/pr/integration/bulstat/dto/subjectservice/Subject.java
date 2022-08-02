package bg.registryagency.epzeu.pr.integration.bulstat.dto.subjectservice;

import lombok.Getter;
import lombok.Setter;

import javax.xml.bind.annotation.XmlElement;

@Getter
@Setter
public class Subject {
    @XmlElement(name = "LegalEntitySubject", namespace = "http://www.bulstat.bg/Subject")
    private LegalEntity legalEntitySubject;
}
