package bg.registryagency.epzeu.pr.application.segment.mapper;

import bg.registryagency.epzeu.pr.application.segment.Owners;
import bg.registryagency.epzeu.pr.integration.api.application.segment.OwnersDto;

import java.util.stream.Collectors;

public class OwnersDtoMapper {
    public static Owners asModel(OwnersDto dto) {
        if(dto == null) {
            return null;
        }

        boolean isEmpty = true;

        Owners owners = new Owners();
        if(dto.getPersons() != null && !dto.getPersons().isEmpty()) {
            owners.setPersons(dto.getPersons().stream()
                .map(personDto -> PersonDtoMapper.asModel(personDto))
                .collect(Collectors.toList()));
            isEmpty = false;
        }

        if(dto.getPropertyDocuments() != null && !dto.getPropertyDocuments().isEmpty()) {
            owners.setPropertyDocuments(dto.getPropertyDocuments().stream()
                .map(propertyDocumentDto -> PropertyDocumentDtoMapper.asModel(propertyDocumentDto))
                .collect(Collectors.toList()));
            isEmpty = false;
        }

        if(isEmpty) {
            return null;
        }

        return owners;
    }

    public static OwnersDto asDto(Owners owners) {
        if(owners == null) {
            return new OwnersDto(true);
        }

        OwnersDto dto = new OwnersDto(false);
        if(owners.getPersons() != null && !owners.getPersons().isEmpty()) {
            dto.setPersons(owners.getPersons().stream()
                .map(person -> PersonDtoMapper.asDto(person))
                .collect(Collectors.toList()));
        }

        if(owners.getPropertyDocuments() != null && !owners.getPropertyDocuments().isEmpty()) {
            dto.setPropertyDocuments(owners.getPropertyDocuments().stream()
                .map(propertyDocument -> PropertyDocumentDtoMapper.asDto(propertyDocument))
                .collect(Collectors.toList()));
        }

        return dto;
    }
}
