/**
 * Base package for application(application forms/application blanks) models.
 * Application models are used for serialization and deserialization of applications.
 */
@XmlSchema(
    namespace = "http://www.registryagency.bg/schemas/property-register/applications",
    elementFormDefault = XmlNsForm.QUALIFIED,
    xmlns = {
        @XmlNs(prefix="app", namespaceURI="http://www.registryagency.bg/schemas/property-register/applications")
    }
)
package bg.registryagency.epzeu.pr.application;

import javax.xml.bind.annotation.XmlNs;
import javax.xml.bind.annotation.XmlNsForm;
import javax.xml.bind.annotation.XmlSchema;
