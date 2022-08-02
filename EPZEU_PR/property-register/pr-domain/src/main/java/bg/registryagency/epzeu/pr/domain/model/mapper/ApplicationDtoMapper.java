package bg.registryagency.epzeu.pr.domain.model.mapper;

import bg.registryagency.epzeu.pr.application.ApplicationType;
import bg.registryagency.epzeu.pr.domain.model.Application;
import bg.registryagency.epzeu.pr.integration.api.domain.ApplicationDto;
import org.springframework.util.CollectionUtils;

import java.util.stream.Collectors;

public class ApplicationDtoMapper {
    /**
     * Преобразува контейнерът на данни за заявления към бизнес моделът на заявления.
     * @return бизнес моделът на заявления.
     */
    public static Application asModel(ApplicationDto applicationDto) {
        if(applicationDto == null) {
            return null;
        }

        Application application = new Application();
        application.setApplicationId(applicationDto.getApplicationId());
        application.setOrder(applicationDto.getOrder());
        application.setType(applicationDto.getType() != null ? ApplicationType.fromInteger(applicationDto.getType()): null);
        application.setApplicationProcess(ApplicationProcessDtoMapper.asModel(applicationDto.getApplicationProcess()));
        application.setApplicationProcessContent(ApplicationProcessContentDtoMapper.asModel(applicationDto.getApplicationProcessContent()));
        if(!CollectionUtils.isEmpty(applicationDto.getApplicationDocuments())) {
            application.setApplicationDocuments(applicationDto.getApplicationDocuments().stream()
                .map(ApplicationDocumentDtoMapper::toModel)
                .collect(Collectors.toList()));
        }

        return application;
    }
    /**
     * Преобразува бизнес моделът на заявления към контейнер на данни за заявления.
     * @return контейнер на данни за заявления.
     */
    public static ApplicationDto asDto(Application application) {
        if(application == null) {
            return null;
        }

        ApplicationDto dto = new ApplicationDto();
        dto.setApplicationId(application.getApplicationId());
        dto.setOrder(application.getOrder());
        dto.setType(application.getType() != null ? application.getType().getCode() : null);
        dto.setApplicationProcess(ApplicationProcessDtoMapper.asDto(application.getApplicationProcess()));
        dto.setApplicationProcessId(application.getApplicationProcess() != null ? application.getApplicationProcess().getApplicationProcessId() : null);
        dto.setApplicationProcessContent(ApplicationProcessContentDtoMapper.asDto(application.getApplicationProcessContent()));
        dto.setAdditionalData(application.getAdditionalData());
        if(!CollectionUtils.isEmpty(application.getApplicationDocuments())) {
            dto.setApplicationDocuments(application.getApplicationDocuments().stream()
                .map(ApplicationDocumentDtoMapper::toDto)
                .collect(Collectors.toList()));
        }

        return dto;
    }
}
