package bg.registryagency.epzeu.pr.application.provider;

import bg.registryagency.epzeu.pr.application.segment.AttachedDocument;

import java.util.List;

public interface DocumentAttachable {
    List<AttachedDocument> getAttachedDocuments();
}
