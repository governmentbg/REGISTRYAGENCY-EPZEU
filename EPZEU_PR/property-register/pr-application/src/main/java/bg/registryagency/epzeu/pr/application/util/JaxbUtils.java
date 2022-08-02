package bg.registryagency.epzeu.pr.application.util;

import bg.registryagency.epzeu.pr.application.conf.JAXBContext;
import lombok.extern.slf4j.Slf4j;
import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import javax.xml.bind.*;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.stream.XMLOutputFactory;
import javax.xml.stream.XMLStreamException;
import javax.xml.stream.XMLStreamWriter;
import javax.xml.validation.Schema;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.StringWriter;
import java.nio.charset.StandardCharsets;

/**
 * JaxbUtils is utility which help to get Segment class by tag name in xml file
 */
@Slf4j
public final class JaxbUtils {

    private JaxbUtils(){}

    /**
     * Unmarshal Document to Object Model.
     * This util method helps to generate Object from XML Structural Document.
     * Method can unmarshal XML File to root or inner segment.
     * No need to pass namespace if tag which is extraction for is only one according to XML or XSD.
     * If there is tag with the same name but different namespaces it is obligatory to pass namespace parameter to
     * determine which specific tag want to extract example of this situation is:
     *
     *<Signature>
         <Signature xmlns="http://www.w3.org/2000/09/xmldsig#">
         .
         .
         </Signature>
     </Signature>
     *
     *
     * @param xmlFile File from which segment will be extracted
     * @param tagName Name of segment tag
     * @param tagNamespace The namespace of tag which will be extracted
     * @param segmentClass Segment class(Model) which will be returned
     * @return Returns segmentClass which is passed to method arguments
     */
    public static <T> T getModelByTagName(byte[] xmlFile, String tagName, String tagNamespace, Class<T> segmentClass)
        throws ParserConfigurationException, IOException, SAXException, JAXBException {
        DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
        //Disabling DTD to prevent from almost all XXE attacks
        dbf.setFeature("http://apache.org/xml/features/disallow-doctype-decl", true);
        dbf.setNamespaceAware(true);
        DocumentBuilder db = dbf.newDocumentBuilder();

        try(ByteArrayInputStream fileInputStream = new ByteArrayInputStream(xmlFile)) {
            Document doc = db.parse(fileInputStream);


//            DocumentType doctype = doc.getDoctype();
//            Element documentElement = doc.getDocumentElement();
//            String localName = documentElement.getLocalName();
//            String className = null;
//            if(localName.equals("RequestForReportOfPersonFromPropertyRegister")) {
//                className = "bg.registryagency.epzeu.pr.application.RequestForReportOfPerson";
//            }
//
//            Class<?> aClass = null;
//            try {
//                aClass = Class.forName(className);
//            } catch (ClassNotFoundException e) {
//                e.printStackTrace();
//            }
//            JAXBContext jaxbContext2 = JAXBContext.newInstance(aClass);
//            Unmarshaller jaxbUnmarshaller2 = jaxbContext2.createUnmarshaller();
//            NodeList node2;
//            if (tagNamespace == null || tagNamespace.isEmpty()) {
//                node2 = doc.getElementsByTagName(localName);
//            } else {
//                node2 = doc.getElementsByTagNameNS(tagNamespace, localName);
//            }
//            Node item2 = node2.item(0);
//            JAXBElement<?> element2 = jaxbUnmarshaller2.unmarshal(item2, aClass);
//            T cast = segmentClass.cast(element2.getValue());
//            GroupReportForPersonDto groupReportForPersonDto = RequestForReportOfPersonDtoMapper.asDto((RequestForReportOfPerson) cast);
//            byte[] bytes = JsonUtils.writeObjectAsByteArray(groupReportForPersonDto);
//            String s = new String(bytes, StandardCharsets.UTF_8);

            NodeList node;
            if (tagNamespace == null || tagNamespace.isEmpty()) {
                node = doc.getElementsByTagName(tagName);
            } else {
                node = doc.getElementsByTagNameNS(tagNamespace, tagName);
            }

            Unmarshaller jaxbUnmarshaller = JAXBContext.getInstance().createUnmarshaller();
            Node item = node.item(0);
            if (item != null) {
                jaxbUnmarshaller.setEventHandler(
                    new ValidationEventHandler() {
                        public boolean handleEvent(ValidationEvent event) {
                            throw new RuntimeException(event.getMessage(),
                                event.getLinkedException());
                        }
                    });

                JAXBElement<?> element = jaxbUnmarshaller.unmarshal(item, segmentClass);

                return segmentClass.cast(element.getValue());
            }
        }
        return null;
    }

    /**
     * Unmarshal Document to Object Model.
     * This util method helps to generate Object from XML Structural Document.
     * Method cannot unmarshal to inner segment only to a root Segment which is Structural Document.
     * @param xmlInputStream Structural document for unmarshaling
     * @param <T> T can be every root segment with annotation @XmlRootElement
     * @return Generated Java Object for the whole passed xml file
     * @throws ParserConfigurationException
     * @throws IOException if an I/O error occurs during closing of input stream.
     * @throws JAXBException - if an error was encountered while creating the JAXBContext, such as (but not limited to):
            No JAXB implementation was discovered
            Classes use JAXB annotations incorrectly
            Classes have colliding annotations (i.e., two classes with the same type name)
            The JAXB implementation was unable to locate provider-specific out-of-band information (such as additional files generated at the development time.)
            An error was encountered while creating the Unmarshaller object
            An error was encountered while setting the event handler
     */
    public static <T> T unmarshalXMLDocumentToModel(InputStream xmlInputStream, Schema schema) throws JAXBException, IOException {
        Unmarshaller unmarshaller = JAXBContext.getInstance().createUnmarshaller();

        if(schema != null) {
            unmarshaller.setSchema(schema);
        }
        unmarshaller.setEventHandler(
            event -> {
                throw new RuntimeException(event.getMessage(),
                    event.getLinkedException());
            });
        try (xmlInputStream) {
            return (T) unmarshaller.unmarshal(xmlInputStream);
        }
    }

    /**
     * Marshal XML Document By passed object.
     * The util class helps to generate xml Document by passed Java Structural Document.
     * Method cannot marshal inner segment only a root segment which is Structural Document.
     * @param object Document object for marshaling
     * @param schema Used for XSD validation. If schema is not passed(null), XSD Schema validation will be skipped.
     * @return Byte array for XML Structural Document
     * @throws JAXBException  if an error was encountered while creating the JAXBContext, such as (but not limited to):
            No JAXB implementation was discovered
            Classes use JAXB annotations incorrectly
            Classes have colliding annotations (i.e., two classes with the same type name)
            The JAXB implementation was unable to locate provider-specific out-of-band information (such as additional files generated at the development time.)
            An error was encountered while creating the Marshaller object
            when there is an error during processing of property or value in marshaller
     * @throws XMLStreamException If there is well-formedness errors as well as unexpected processing conditions
     * @throws IOException If an I/O error occurs
     */
    public static byte[] marshalXMLDocumentByModel(Object object, Schema schema) throws JAXBException, IOException, XMLStreamException {
        Marshaller marshaller = JAXBContext.getInstance().createMarshaller();
        marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);
        if(schema != null) {
            marshaller.setSchema(schema);
        }
        XMLStreamWriter xsw = null;
        try(StringWriter stringWriter = new StringWriter()) {
            XMLOutputFactory xof = XMLOutputFactory.newFactory();
            xsw = xof.createXMLStreamWriter(stringWriter);
//            marshaller.marshal(object, new NoNSPrefixXMLStreamWriter(xsw));
            marshaller.marshal(object, xsw);

            return stringWriter.toString().getBytes(StandardCharsets.UTF_8);
        } finally {
            if(xsw != null) {
                //Close XMLStreamWriter in finally block because this class do not implements Closable and cannot be used in try-with-resources block
                xsw.close();
            }
        }
    }
}
