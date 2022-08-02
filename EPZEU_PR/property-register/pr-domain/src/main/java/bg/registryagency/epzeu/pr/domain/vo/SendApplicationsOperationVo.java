package bg.registryagency.epzeu.pr.domain.vo;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.io.Serializable;

@Getter
@RequiredArgsConstructor
public final class SendApplicationsOperationVo implements Serializable {
    //All fields are serialized to Strings in Oracle db because it is easy to show this data in db
    // select utl_raw.cast_to_varchar2(a.USER_DATA.bytes_raw) from QUEUE a;
    private final String processId;
    private final String operationId;
}
