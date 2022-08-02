package bg.registryagency.epzeu.pr.application.segment.mapper;

import bg.registryagency.epzeu.pr.application.segment.DataForRegistrationOfDocumentInBook;
import bg.registryagency.epzeu.pr.integration.api.application.segment.DataForRegistrationOfDocumentInBookDto;

public class DataForRegistrationOfDocumentInBookDtoMapper {
    public static DataForRegistrationOfDocumentInBook asModel(DataForRegistrationOfDocumentInBookDto dto) {
        if(dto == null) {
            return null;
        }

        var dataForRegistrationOfDocumentInBook = new DataForRegistrationOfDocumentInBook();
        dataForRegistrationOfDocumentInBook.setActNumber(dto.getActNumber());
        dataForRegistrationOfDocumentInBook.setBook(BookDtoMapper.asModel(dto.getBook()));
        dataForRegistrationOfDocumentInBook.setVolume(dto.getVolume());
        dataForRegistrationOfDocumentInBook.setYear(dto.getYear());

        return dataForRegistrationOfDocumentInBook;
    }

    public static DataForRegistrationOfDocumentInBookDto asDto(DataForRegistrationOfDocumentInBook data) {
        if(data == null) {
            return new DataForRegistrationOfDocumentInBookDto(true);
        }

        var dto = new DataForRegistrationOfDocumentInBookDto(false);
        dto.setActNumber(data.getActNumber());
        dto.setBook(BookDtoMapper.asDto(data.getBook()));
        dto.setVolume(data.getVolume());
        dto.setYear(data.getYear());

        return dto;
    }
}
