package bg.registryagency.epzeu.pr.domain;

import bg.registryagency.epzeu.pr.domain.model.*;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.LongNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.fasterxml.jackson.databind.node.TextNode;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;

public final class BootstrapDataUtils {
    private BootstrapDataUtils(){}

    public static ObjectNode createObjectNode() {
        ObjectNode jsonObject = new ObjectNode(JsonNodeFactory.instance);
        jsonObject.set("longField", new LongNode(10));
        jsonObject.set("textField", new TextNode("text"));

        return jsonObject;
    }

    public static ApplicationProcess createApplicationProcess(User user, ApplicationProcess.Status status) {
        ApplicationProcess applicationProcess = new ApplicationProcess();
        applicationProcess.setStatus(status);
        applicationProcess.setUser(user);

        return applicationProcess;
    }

    public static ApplicationDocument createApplicationDocument(Application application) {
        ApplicationDocument applicationDocument = new ApplicationDocument();
        applicationDocument.setApplication(application);
        applicationDocument.setBackofficeGuid(UUID.randomUUID());
        applicationDocument.setName(UUID.randomUUID().toString().replace("-", ""));
        applicationDocument.setDocumentTypeId("1");
        applicationDocument.setFileSize(0);

        return applicationDocument;
    }

    public static File getFile() {
        return new File(BootstrapDataUtils.class.getClassLoader().getResource("XML.xml").getFile());
    }

    public static InputStream getFileInputStream(String filename) throws IOException {
        return BootstrapDataUtils.class.getClassLoader().getResource("XML.xml").openStream();
    }

    public static File getFile(String filename) {
        return new File(BootstrapDataUtils.class.getClassLoader().getResource(filename).getFile());
    }

    public static User createUser(int userId, int cin) {
        User user = new User(userId);
        user.setDisplayName("UnitTestUser");
        user.setIsSystem(false);
        user.setCin(cin);
        return user;
    }

    public static Operation createOperation() {
        Operation operation = new Operation();
        operation.setType(Operation.Type.APPLICATION_ACCEPTANCE);
        operation.setOperationId(UUID.randomUUID().toString());

        return operation;
    }
}
