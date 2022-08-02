package bg.registryagency.epzeu.pr.application.segment.mapper;

import bg.registryagency.epzeu.pr.application.segment.Book;
import bg.registryagency.epzeu.pr.integration.pr.dto.BookDto;

public class BookDtoMapper {
    public static Book asModel(BookDto dto) {
        if(dto == null || dto.getId() == null) {
            return null;
        }

        Book book = new Book();
        book.setId(dto.getId());
        book.setName(dto.getName());

        return book;
    }

    public static BookDto asDto(Book book) {
        if(book == null) {
            return new BookDto();
        }

        BookDto dto = new BookDto();
        dto.setId(book.getId());
        dto.setName(book.getName());

        return dto;
    }
}
