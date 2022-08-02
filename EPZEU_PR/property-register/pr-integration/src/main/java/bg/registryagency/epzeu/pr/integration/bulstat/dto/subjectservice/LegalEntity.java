package bg.registryagency.epzeu.pr.integration.bulstat.dto.subjectservice;

import lombok.Getter;
import lombok.Setter;

import javax.xml.bind.annotation.XmlElement;

@Getter
@Setter
public class LegalEntity {
    @XmlElement(name = "CyrillicFullName", namespace = "http://www.bulstat.bg/LegalEntity")
    private String cyrillicFullName;
}
