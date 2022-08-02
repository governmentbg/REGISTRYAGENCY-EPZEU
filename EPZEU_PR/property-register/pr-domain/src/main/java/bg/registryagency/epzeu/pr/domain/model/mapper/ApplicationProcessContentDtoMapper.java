package bg.registryagency.epzeu.pr.domain.model.mapper;

import bg.registryagency.epzeu.pr.domain.model.ApplicationProcessContent;
import bg.registryagency.epzeu.pr.integration.api.domain.ApplicationProcessContentDto;

import java.nio.charset.StandardCharsets;

public class ApplicationProcessContentDtoMapper {
    /**
     * Преобразува контейнерът на данни за съдържание на заявление към бизнес моделът на съдържание на заявление.
     * @return бизнес моделът на съдържание на заявление.
     */
    public static ApplicationProcessContent asModel(ApplicationProcessContentDto applicationProcessContentDto) {
        if(applicationProcessContentDto == null) {
            return null;
        }

        ApplicationProcessContent applicationProcessContent = new ApplicationProcessContent();
        applicationProcessContent.setApplicationProcessContentId(applicationProcessContentDto.getApplicationProcessContentId());
        applicationProcessContent.setType(applicationProcessContentDto.getType() != null ?
            ApplicationProcessContent.Type.valueOf(applicationProcessContentDto.getType()) : null);
        applicationProcessContent.setApplicationProcess(ApplicationProcessDtoMapper.asModel(applicationProcessContentDto.getApplicationProcess()));
        applicationProcessContent.setContent(applicationProcessContentDto.getContent().getBytes(StandardCharsets.UTF_8));

        return applicationProcessContent;
    }
    /**
     * Преобразува бизнес моделът на съдържание на заявление към контейнер на данни за съдържание на заявление.
     * @return контейнер на данни за съдържание на заявление.
     */
    public static ApplicationProcessContentDto asDto(ApplicationProcessContent applicationProcessContent) {
        if(applicationProcessContent == null) {
            return null;
        }

        ApplicationProcessContentDto dto = new ApplicationProcessContentDto();
        dto.setApplicationProcessContentId(applicationProcessContent.getApplicationProcessContentId());
        dto.setType(applicationProcessContent.getType() != null ? applicationProcessContent.getType().toString() : null);
        dto.setApplicationProcess(ApplicationProcessDtoMapper.asDto(applicationProcessContent.getApplicationProcess()));

        if (applicationProcessContent.getContent() != null) {
            dto.setContent(new String(applicationProcessContent.getContent(), StandardCharsets.UTF_8));
        }

        return dto;
    }
}
