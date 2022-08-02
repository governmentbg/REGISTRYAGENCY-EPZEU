package bg.registryagency.epzeu.pr.application.segment.mapper;

import bg.registryagency.epzeu.pr.application.segment.ApplicantData;
import bg.registryagency.epzeu.pr.integration.api.application.segment.ApplicantDataDto;
import org.springframework.util.StringUtils;

public class ApplicantDataDtoMapper {
    public static ApplicantData asModel(ApplicantDataDto dto) {
        if (dto == null) {
            return null;
        }

        ApplicantData applicantData = new ApplicantData();
        applicantData.setIndividual(IndividualDtoMapper.asModel(dto.getIndividual()));
        applicantData.setApplicantType(ApplicantData.ApplicantTypeNomenclature.fromInteger(dto.getApplicantType()));
        applicantData.setApplicantCategory(ApplicantCategoryDtoMapper.asModel(dto.getApplicantCategory()));
        applicantData.setDataForAnOfficial(StringUtils.hasText(dto.getDataForAnOfficial()) ? dto.getDataForAnOfficial() : null);
        applicantData.setSpecialAccessType(StringUtils.hasText(dto.getSpecialAccessType()) ? dto.getSpecialAccessType() : null);

        return  applicantData;
    }

    public static ApplicantDataDto asDto(ApplicantData applicantData) {
        if (applicantData == null) {
            return new ApplicantDataDto(true);
        }

        ApplicantDataDto dto = new ApplicantDataDto(false);
        dto.setIndividual(IndividualDtoMapper.asDto(applicantData.getIndividual()));
        dto.setApplicantType(applicantData.getApplicantType().getId());
        dto.setApplicantCategory(ApplicantCategoryDtoMapper.asDto(applicantData.getApplicantCategory()));
        dto.setDataForAnOfficial(applicantData.getDataForAnOfficial());
        dto.setSpecialAccessType(applicantData.getSpecialAccessType());

        return dto;
    }
}
