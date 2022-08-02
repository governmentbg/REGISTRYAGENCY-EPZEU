package bg.registryagency.epzeu.pr.application.segment.mapper;

import bg.registryagency.epzeu.pr.application.segment.DocumentOfReport;
import bg.registryagency.epzeu.pr.integration.pr.dto.DocumentOfReportDto;

public class DocumentOfReportDtoMapper {
    public static DocumentOfReport asModel(DocumentOfReportDto dto) {
        if(dto == null) {
            return null;
        }

        var documentOfReport = new DocumentOfReport();
        documentOfReport.setId(dto.getId());
        documentOfReport.setIncomingRegisterNumber(dto.getNumberIncomingRegistry());
        documentOfReport.setIncomingRegisterDate(dto.getDateIncomingRegistry());
        documentOfReport.setDoubleIncomingRegisterNumber(dto.getNumberDoubleIncomingRegistry());
        documentOfReport.setVolume(dto.getVolume());
        documentOfReport.setActNumber(dto.getActNumber());
        documentOfReport.setBook(BookDtoMapper.asModel(dto.getBook()));
        documentOfReport.setYear(dto.getYear());
        documentOfReport.setRegistryOffice(RegistryOfficeDtoMapper.asModel(dto.getRegistryOffice()));


        return documentOfReport;
    }

    public static DocumentOfReportDto asDto(DocumentOfReport documentOfReport) {
        if(documentOfReport == null) {
            return new DocumentOfReportDto();
        }

        var dto = new DocumentOfReportDto();
        dto.setId(documentOfReport.getId());
        dto.setNumberIncomingRegistry(documentOfReport.getIncomingRegisterNumber());
        dto.setDateIncomingRegistry(documentOfReport.getIncomingRegisterDate());
        dto.setNumberDoubleIncomingRegistry(documentOfReport.getDoubleIncomingRegisterNumber());
        dto.setVolume(documentOfReport.getVolume());
        dto.setActNumber(documentOfReport.getActNumber());
        dto.setBook(BookDtoMapper.asDto(documentOfReport.getBook()));
        dto.setYear(documentOfReport.getYear());
        dto.setRegistryOffice(RegistryOfficeDtoMapper.asDto(documentOfReport.getRegistryOffice()));

        return dto;
    }
}
