package bg.registryagency.epzeu.pr.application.segment;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;

/**
 * Приложен документ
 *
 * <p>Java class for AttachedDocument complex type.
 *
 * <p>The following schema fragment specifies the expected content contained within this class.
 *
 * <pre>
 * &lt;complexType name="AttachedDocument"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="DocumentUniqueId" type="{DocumentUniqueId}DocumentUniqueId"/&gt;
 *         &lt;element name="DocumentName" type="{DocumentName}DocumentName"/&gt;
 *         &lt;element name="DocumentType" type="{DocumentType}DocumentType"/&gt;
 *         &lt;element name="documentFileMetadata" type="{DocumentFileMetadata}DocumentFileMetadata"/&gt;
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
@XmlType(name = "AttachedDocument", propOrder = {
    "documentUniqueId",
    "documentName",
    "documentType",
    "documentFileMetadata"
})
public class AttachedDocument {
    @XmlElement(name = "DocumentUniqueId", required = true)
    protected String documentUniqueId;
    @XmlElement(name = "DocumentName", required = true)
    protected String documentName;
    @XmlElement(name = "DocumentType", required = true)
    protected DocumentType documentType;

    @XmlElement(name = "DocumentFileMetadata", required = true)
    protected DocumentFileMetadata documentFileMetadata;

    public AttachedDocument(String documentUniqueId, String documentName, DocumentType documentType, DocumentFileMetadata documentFileMetadata) {
        this.documentUniqueId = documentUniqueId;
        this.documentName = documentName;
        this.documentType = documentType;
        this.documentFileMetadata = documentFileMetadata;
    }
}
