package bg.registryagency.epzeu.pr.application.segment.mapper;

import bg.registryagency.epzeu.pr.application.segment.ApplicantCategory;
import bg.registryagency.epzeu.pr.integration.pr.dto.ApplicantCategoryDto;

public class ApplicantCategoryDtoMapper {
    public static ApplicantCategory asModel(ApplicantCategoryDto dto) {
        if(dto == null || dto.getId() == null) {
            return null;
        }

        ApplicantCategory applicantCategory = new ApplicantCategory();
        applicantCategory.setId(dto.getId());
        applicantCategory.setName(dto.getName());

        return applicantCategory;
    }

    public static ApplicantCategoryDto asDto(ApplicantCategory applicantCategory) {
        if(applicantCategory == null) {
            return new ApplicantCategoryDto();
        }

        ApplicantCategoryDto dto = new ApplicantCategoryDto();
        dto.setId(applicantCategory.getId());
        dto.setName(applicantCategory.getName());

        return dto;
    }
}
