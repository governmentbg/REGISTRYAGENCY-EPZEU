package bg.registryagency.epzeu.pr.application.segment.mapper;

import bg.registryagency.epzeu.pr.application.segment.DataForRegistrationOfDocumentInIncomingRegister;
import bg.registryagency.epzeu.pr.integration.api.application.segment.DataForRegistrationOfDocumentInIncomingRegisterDto;

public class DataForRegistrationOfDocumentInIncomingRegisterDtoMapper {
    public static DataForRegistrationOfDocumentInIncomingRegister asModel(DataForRegistrationOfDocumentInIncomingRegisterDto dto) {
        if(dto == null) {
            return null;
        }

        var data = new DataForRegistrationOfDocumentInIncomingRegister();
        data.setIncomingRegisterNumber(dto.getIncomingRegisterNumber());
        data.setRegistrationDate(dto.getRegistrationDate());

        return data;
    }

    public static DataForRegistrationOfDocumentInIncomingRegisterDto asDto(DataForRegistrationOfDocumentInIncomingRegister data) {
        if(data == null) {
            return new DataForRegistrationOfDocumentInIncomingRegisterDto();
        }

        var dto = new DataForRegistrationOfDocumentInIncomingRegisterDto();
        dto.setIncomingRegisterNumber(data.getIncomingRegisterNumber());
        dto.setRegistrationDate(data.getRegistrationDate());

        return dto;
    }
}
