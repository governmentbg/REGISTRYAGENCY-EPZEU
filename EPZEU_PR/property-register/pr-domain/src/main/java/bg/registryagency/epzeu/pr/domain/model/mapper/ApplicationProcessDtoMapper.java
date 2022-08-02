package bg.registryagency.epzeu.pr.domain.model.mapper;

import bg.registryagency.epzeu.pr.domain.model.ApplicationProcess;
import bg.registryagency.epzeu.pr.integration.api.domain.ApplicationProcessDto;
import org.springframework.util.CollectionUtils;

import java.util.stream.Collectors;

public class ApplicationProcessDtoMapper {
    /**
     * Преобразува контейнерът на данни за процес по заявяване към бизнес моделът на процес по заявяване.
     * @return бизнес моделът на процес по заявяване.
     */
    public static ApplicationProcess asModel(ApplicationProcessDto dto) {
        if(dto == null) {
            return null;
        }

        ApplicationProcess applicationProcess = new ApplicationProcess(dto.getApplicationProcessId());
        applicationProcess.setStatus(dto.getStatus() != null ?
            ApplicationProcess.Status.fromInteger(dto.getStatus()) : null);
        applicationProcess.setUser(UserDtoMapper.toModel(dto.getUser()));
        applicationProcess.setSigningGuid(dto.getSigningGuid());
        applicationProcess.setIncomingNumbers(dto.getIncomingNumbers());
        applicationProcess.setErrorMessage(dto.getErrorMessage());
        applicationProcess.setMainApplication(ApplicationDtoMapper.asModel(dto.getMainApplication()));
        applicationProcess.setHasChangesInApplicationsNomenclature(dto.isHasChangesInApplicationsNomenclature());
        if(!CollectionUtils.isEmpty(dto.getApplications())) {
            applicationProcess.setApplications(dto.getApplications().stream()
                .map(ApplicationDtoMapper::asModel)
                .collect(Collectors.toList()));
        }
        if(!CollectionUtils.isEmpty(dto.getApplicationProcessContents())) {
            applicationProcess.setApplicationProcessContents(dto.getApplicationProcessContents().stream()
                .map(ApplicationProcessContentDtoMapper::asModel)
                .collect(Collectors.toList()));
        }

        return applicationProcess;
    }
    /**
     * Преобразува бизнес моделът на процес по заявяване към контейнер на данни за процес по заявяване.
     * @return контейнер на данни за процес по заявяване.
     */
    public static ApplicationProcessDto asDto(ApplicationProcess applicationProcess) {
        if(applicationProcess == null) {
            return null;
        }

        ApplicationProcessDto dto = new ApplicationProcessDto();
        dto.setApplicationProcessId(applicationProcess.getApplicationProcessId());
        dto.setStatus(applicationProcess.getStatus() != null ? applicationProcess.getStatus().getId() : null);
        dto.setUser(UserDtoMapper.toDto(applicationProcess.getUser()));
        dto.setSigningGuid(applicationProcess.getSigningGuid());
        dto.setIncomingNumbers(applicationProcess.getIncomingNumbers());
        dto.setErrorMessage(applicationProcess.getErrorMessage());
        dto.setMainApplication(ApplicationDtoMapper.asDto(applicationProcess.getMainApplication()));
        dto.setMainApplicationId(applicationProcess.getMainApplication() != null ? applicationProcess.getMainApplication().getApplicationId() : null);
        dto.setHasChangesInApplicationsNomenclature(applicationProcess.isHasChangesInApplicationsNomenclature());
        if(applicationProcess.getApplications() != null) {
            dto.setApplications(applicationProcess.getApplications().stream()
                .map(ApplicationDtoMapper::asDto)
                .collect(Collectors.toList()));
        }
        if(applicationProcess.getApplicationProcessContents() != null) {
            dto.setApplicationProcessContents(
                applicationProcess.getApplicationProcessContents().stream()
                    .map(ApplicationProcessContentDtoMapper::asDto)
                    .collect(Collectors.toList()));
        }

        return dto;
    }
}
