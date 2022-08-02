package bg.registryagency.epzeu.pr.application.segment;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;

/**
 * Метаданни на файла на приложен документ
 *
 * <p>Java class for DocumentFileMetadata complex type.
 *
 * <p>The following schema fragment specifies the expected content contained within this class.
 *
 * <pre>
 * &lt;complexType name="DocumentFileMetadata"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="FileName" type="{FileName}FileName"/&gt;
 *         &lt;element name="ContentType" type="{ContentType}:ContentType"/&gt;
 *         &lt;element name="Size" type="{Size}:Size"/&gt;
 *         &lt;element name="HashAlgorithm" type="{HashAlgorithm}:HashAlgorithm"/&gt;
 *         &lt;element name="Hash" type="{Hash}:Hash"/&gt;
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
@XmlType(name = "DocumentFileMetadata", propOrder = {
    "fileName",
    "contentType",
    "size",
    "hashAlgorithm",
    "hash"
})
public class DocumentFileMetadata {
    @XmlElement(name = "FileName", required = true)
    protected String fileName;
    @XmlElement(name = "ContentType", required = true)
    protected String contentType;
    @XmlElement(name = "Size", required = true)
    protected Long size;
    @XmlElement(name = "HashAlgorithm", required = true)
    protected String hashAlgorithm;
    @XmlElement(name = "Hash", required = true)
    protected byte[] hash;

    public DocumentFileMetadata(String fileName, String contentType, Long size, String hashAlgorithm, byte[] hash) {
        this.fileName = fileName;
        this.contentType = contentType;
        this.size = size;
        this.hashAlgorithm = hashAlgorithm;
        this.hash = hash;
    }
}
