package bg.registryagency.epzeu.pr.application.provider;

import bg.registryagency.epzeu.pr.application.util.JsonObjectMapper;
import org.xml.sax.SAXException;

import javax.xml.XMLConstants;
import javax.xml.validation.Schema;
import javax.xml.validation.SchemaFactory;

public abstract class BaseProvider {
    private static final String BASE_APPLICATIONS_WITHOUT_SIGNATURE_XSD_PATH = "xsd/application-without-signature/";
    private static final String BASE_APPLICATIONS_XSD_PATH = "xsd/application/";

    private Schema schema;

    protected final JsonObjectMapper jsonObjectMapper;

    public BaseProvider(JsonObjectMapper jsonObjectMapper) {
        this.jsonObjectMapper = jsonObjectMapper;
    }

    public abstract String getXsdFileName();

    public Schema getXsdSchema(boolean withSignature) throws SAXException {
        if(schema == null) {
            SchemaFactory sf = SchemaFactory.newInstance(XMLConstants.W3C_XML_SCHEMA_NS_URI);
            this.schema = sf.newSchema(getClass().getClassLoader()
                .getResource((withSignature ? BASE_APPLICATIONS_XSD_PATH : BASE_APPLICATIONS_WITHOUT_SIGNATURE_XSD_PATH)
                    + getXsdFileName()));
        }

        return schema;
    }
}
