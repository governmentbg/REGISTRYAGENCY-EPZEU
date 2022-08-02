/*
  Segment's package. Segments are granular and reusable parts of Application Forms.
  Some Application Forms have the same Segments.
 */
@XmlSchema(
    namespace = "http://www.registryagency.bg/schemas/property-register/segments",
    elementFormDefault = XmlNsForm.QUALIFIED,
    xmlns = {
        @XmlNs(prefix="seg", namespaceURI="http://www.registryagency.bg/schemas/property-register/segments"),
        @XmlNs(prefix="val", namespaceURI="http://www.registryagency.bg/schemas/property-register/values")
    }
)
package bg.registryagency.epzeu.pr.application.segment;

import javax.xml.bind.annotation.XmlNs;
import javax.xml.bind.annotation.XmlNsForm;
import javax.xml.bind.annotation.XmlSchema;
