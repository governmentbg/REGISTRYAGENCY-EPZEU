package bg.registryagency.epzeu.pr.application.segment.mapper;

import bg.registryagency.epzeu.pr.application.segment.ApplicantDataOfReport;
import bg.registryagency.epzeu.pr.integration.api.application.segment.ApplicantDataOfReportDto;
import bg.registryagency.epzeu.pr.integration.epzeu.dto.LoginSessionDto;
import org.springframework.util.StringUtils;

public class ApplicantDataOfReportDtoMapper {
    public static ApplicantDataOfReport asModel(ApplicantDataOfReportDto dto) {
        if (dto == null) {
            return null;
        }

        ApplicantDataOfReport applicantData = new ApplicantDataOfReport();
        applicantData.setAuthenticationType(dto.getAuthenticationType());
        applicantData.setPersonalIdentifier(dto.getPersonalIdentifier());
        applicantData.setNames(StringUtils.hasText(dto.getNames()) ? dto.getNames() : null);
        applicantData.setIssuer(dto.getIssuer());
        applicantData.setSerialNumber(dto.getSerialNumber());
        applicantData.setCertificateHash(StringUtils.hasText(dto.getCertificateHash()) ? dto.getCertificateHash() : null);
        applicantData.setCertificateContent(dto.getCertificateContent());

        return  applicantData;
    }

    public static ApplicantDataOfReportDto asDto(ApplicantDataOfReport applicantDataOfReport) {
        if (applicantDataOfReport == null) {
            return null;
        }

        ApplicantDataOfReportDto dto = new ApplicantDataOfReportDto();
        dto.setAuthenticationType(applicantDataOfReport.getAuthenticationType());
        dto.setPersonalIdentifier(applicantDataOfReport.getPersonalIdentifier());
        dto.setNames(applicantDataOfReport.getNames());
        dto.setIssuer(applicantDataOfReport.getIssuer());
        dto.setSerialNumber(applicantDataOfReport.getSerialNumber());
        dto.setCertificateHash(applicantDataOfReport.getCertificateHash());
        dto.setCertificateContent(applicantDataOfReport.getCertificateContent());

        return dto;
    }

    public static ApplicantDataOfReportDto asDtoFromLoginSessionDto(LoginSessionDto loginSessionDto) {
        if (loginSessionDto == null) {
            return new ApplicantDataOfReportDto();
        }

        ApplicantDataOfReportDto dto = new ApplicantDataOfReportDto();
        dto.setAuthenticationType(loginSessionDto.getAuthenticationType().getId());
        dto.setPersonalIdentifier(loginSessionDto.getUserIdentifier());
        if(loginSessionDto.getCertificateInfo()!= null){
            dto.setCertificateContent(loginSessionDto.getCertificateInfo().getContent());
            dto.setCertificateHash(loginSessionDto.getCertificateInfo().getCertHash());
            dto.setIssuer(loginSessionDto.getCertificateInfo().getIssuer());
            dto.setNames(loginSessionDto.getCertificateInfo().getNames());
            dto.setSerialNumber(loginSessionDto.getCertificateInfo().getSerialNumber());
        }
        return dto;
    }
}
