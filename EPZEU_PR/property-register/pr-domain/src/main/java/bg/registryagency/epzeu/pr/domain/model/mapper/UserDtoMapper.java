package bg.registryagency.epzeu.pr.domain.model.mapper;

import bg.registryagency.epzeu.pr.domain.model.User;
import bg.registryagency.epzeu.pr.integration.api.domain.UserDto;

public class UserDtoMapper {
    /**
     * Преобразува контейнерът на данни за потребител към бизнес моделът на потребител.
     * @return бизнес моделът на потребител.
     */
    public static User toModel(UserDto userDto) {
        if(userDto == null) {
            return null;
        }

        return new User(userDto.getUserId());
    }
    /**
     * Преобразува бизнес моделът на потребител към контейнер на данни за потребител.
     * @return контейнер на данни за потребител.
     */
    public static UserDto toDto(User user) {
        if(user == null) {
            return null;
        }

        UserDto userDto = new UserDto();
        userDto.setUserId(user.getUserId());

        return userDto;
    }
}
