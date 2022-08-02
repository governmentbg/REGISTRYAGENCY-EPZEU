package bg.registryagency.epzeu.pr.application.segment.mapper;

import bg.registryagency.epzeu.pr.application.segment.ActData;
import bg.registryagency.epzeu.pr.integration.api.application.segment.ActDataDto;

public class ActDataDtoMapper {
    public static ActData asModel(ActDataDto dto) {
        if(dto == null) {
            return null;
        }

        ActData actData = new ActData();
        if(dto.getDataForRegistrationOfDocumentInBook().getActNumber() != null) {
            actData.setDataForRegistrationOfDocumentInBook(DataForRegistrationOfDocumentInBookDtoMapper
                .asModel(dto.getDataForRegistrationOfDocumentInBook()));
        }
        if(dto.getDataForRegistrationOfDocumentInDoubleIncomingRegister().getDoubleIncomingRegisterNumber() != null) {
            actData.setDataForRegistrationOfDocumentInDoubleIncomingRegister(DataForRegistrationOfDocumentInDoubleIncomingRegisterDtoMapper
                .asModel(dto.getDataForRegistrationOfDocumentInDoubleIncomingRegister()));
        }
        if(dto.getDataForRegistrationOfDocumentInIncomingRegister().getIncomingRegisterNumber() != null) {
            actData.setDataForRegistrationOfDocumentInIncomingRegister(DataForRegistrationOfDocumentInIncomingRegisterDtoMapper
                .asModel(dto.getDataForRegistrationOfDocumentInIncomingRegister()));
        }

        return actData;
    }

    public static ActDataDto asDto(ActData actData) {
        if(actData == null) {
            return new ActDataDto(true);
        }

        ActDataDto dto = new ActDataDto(false);
        dto.setDataForRegistrationOfDocumentInBook(DataForRegistrationOfDocumentInBookDtoMapper
            .asDto(actData.getDataForRegistrationOfDocumentInBook()));
        dto.setDataForRegistrationOfDocumentInDoubleIncomingRegister(DataForRegistrationOfDocumentInDoubleIncomingRegisterDtoMapper
            .asDto(actData.getDataForRegistrationOfDocumentInDoubleIncomingRegister()));
        dto.setDataForRegistrationOfDocumentInIncomingRegister(DataForRegistrationOfDocumentInIncomingRegisterDtoMapper
            .asDto(actData.getDataForRegistrationOfDocumentInIncomingRegister()));

        return dto;
    }
}
