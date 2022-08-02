package bg.registryagency.epzeu.pr.domain.util;

import bg.registryagency.epzeu.pr.domain.model.Application;
import bg.registryagency.epzeu.pr.integration.conf.ApplicationConstants;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ArrayNode;

public final class ApplicationUtil {
    private ApplicationUtil(){}

    /**
     * If application has documents copied from initial application uuid will be the same as in initial application.
     * Check whether uuid is consists in these copied application if yes them this document is copied from initial application.
     *
     * @param application which is copy of initial application and has documents from initial application
     * @param uuid of the document
     * @return
     */
    public static boolean isDocumentFromInitialApplication(Application application, String uuid) {
        boolean isFromInitialApplication = false;

        if(application.getAdditionalData() != null) {
            ArrayNode initialAppDocuments = (ArrayNode) application.getAdditionalData().get(ApplicationConstants.ADDITIONAL_DATA_INITIAL_APP_DOCUMENTS);

            if(initialAppDocuments != null) {
                for (JsonNode initialAppDocument : initialAppDocuments) {
                    if (initialAppDocument.asText().equals(uuid)) {
                        isFromInitialApplication = true;
                        break;
                    }
                }
            }
        }

        return isFromInitialApplication;
    }
}
