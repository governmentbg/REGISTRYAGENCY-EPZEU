package bg.registryagency.epzeu.pr.application.segment.mapper;

import bg.registryagency.epzeu.pr.application.segment.UpcomingDealForProperty;
import bg.registryagency.epzeu.pr.integration.api.application.segment.UpcomingDealForPropertyDto;

import java.time.LocalDate;

public class UpcomingDealForPropertyDtoMapper {
    public static UpcomingDealForProperty asModel(UpcomingDealForPropertyDto dto) {
        if(dto == null) {
            return null;
        }

        var upcomingDeal = new UpcomingDealForProperty();
        upcomingDeal.setPropertyDealType(dto.getPropertyDealType());
        upcomingDeal.setCadastralIds(dto.getCadastralIds());
        upcomingDeal.setPropertyDealDate(dto.getPropertyDealDate());
        if(dto.getPropertyDealTime() != null) {
            upcomingDeal.setPropertyDealTime(dto.getPropertyDealTime().toLocalTime());
        }

        return upcomingDeal;
    }

    public static UpcomingDealForPropertyDto asDto(UpcomingDealForProperty upcomingDeal) {
        if (upcomingDeal == null) {
            return new UpcomingDealForPropertyDto();
        }

        UpcomingDealForPropertyDto dto = new UpcomingDealForPropertyDto();
        dto.setPropertyDealType(upcomingDeal.getPropertyDealType());
        dto.setCadastralIds(upcomingDeal.getCadastralIds());
        dto.setPropertyDealDate(upcomingDeal.getPropertyDealDate());
        if(upcomingDeal.getPropertyDealTime() != null) {
            dto.setPropertyDealTime(upcomingDeal.getPropertyDealTime().atDate(LocalDate.now()));
        }

        return dto;
    }
}
