package bg.registryagency.epzeu.pr.domain.adapter;

import bg.registryagency.epzeu.pr.application.ApplicationType;
import bg.registryagency.epzeu.pr.domain.util.DocumentTypeEnum;
import bg.registryagency.epzeu.pr.integration.cache.DocumentTypePrNomenclatureCache;
import bg.registryagency.epzeu.pr.integration.cache.RegisterTypeNomenclatureCache;
import bg.registryagency.epzeu.pr.integration.cache.RegistryOfficeNomenclatureCache;
import bg.registryagency.epzeu.pr.integration.conf.ApplicationConstants;
import bg.registryagency.epzeu.pr.integration.conf.UrlConstants;
import bg.registryagency.epzeu.pr.integration.epzeu.dto.EpzeuApplicationDto;
import bg.registryagency.epzeu.pr.integration.reau.dto.ApplicationInfo;
import bg.registryagency.epzeu.pr.integration.reau.dto.ApplicationStatusEnum;
import bg.registryagency.epzeu.pr.integration.reau.dto.AttachmentInfo;
import bg.registryagency.epzeu.pr.integration.util.StringSubstitutor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class EpzeuApplicationAdapter {
    private static DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("dd.MM.yyyy");
    private static DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm:ss");

    private final RegisterTypeNomenclatureCache registerTypeCache;
    private final RegistryOfficeNomenclatureCache registryOfficeCache;
    private final DocumentTypePrNomenclatureCache documentTypeNomenclatureCache;

    /**
     * Преобразува контейнерът на данни за информация за регистрирано заявление към контейнер на данни за ЕПЗЕУ заявление(необходимо за функционалността на Моите Услуги).
     *
     * @return бизнес моделът на прикачени документи.
     */
    public EpzeuApplicationDto toEpzeuApplicationCreate(ApplicationInfo applicationInfo) {
        if (applicationInfo == null) {
            return null;
        }

        EpzeuApplicationDto epzeuApplicationDto = new EpzeuApplicationDto();
        epzeuApplicationDto.setRegisterId(ApplicationConstants.REGISTER_ID);
        epzeuApplicationDto.setApplicantCin(applicationInfo.getApplicantCIN());
        epzeuApplicationDto.setApplicationTypeId(applicationInfo.getApplicationTypeId());
        epzeuApplicationDto.setApplicationDisplayUrl(String.format(UrlConstants.BASE_APP_URL_EPZEU_PLACEHOLDER + "/%s/%s",
            "ApplicationPreview", applicationInfo.getIncomingNumber()));
        epzeuApplicationDto.setIncomingNumber(applicationInfo.getIncomingNumber());
        epzeuApplicationDto.setRegistrationDate(applicationInfo.getRegistrationTime());
        epzeuApplicationDto.setResultHtml(createResultHtml(applicationInfo));

        return epzeuApplicationDto;
    }

    public EpzeuApplicationDto toEpzeuApplicationUpdate(ApplicationInfo applicationInfo) {
        if (applicationInfo == null) {
            return null;
        }

        EpzeuApplicationDto epzeuApplicationDto = new EpzeuApplicationDto();
        epzeuApplicationDto.setIncomingNumber(applicationInfo.getIncomingNumber());
        epzeuApplicationDto.setResultHtml(createResultHtml(applicationInfo));

        return epzeuApplicationDto;
    }

    private String createResultHtml(ApplicationInfo applicationInfo) {
        String resultHtml;
        StringBuilder resultHtmlBuilder;
        Map substitutes;

        switch (ApplicationStatusEnum.fromInteger(applicationInfo.getStatusId())) {
            case ACCEPTED://The same as TERMINATED only status is different
                //PR_ON_INITIAL_APPLICATION_NO_L

                if (applicationInfo.getRegisterNumber() == null) {
                    //If there is no register number this is initial application which is already accepted in REAU
                    resultHtml = createResultHtmlWithStatus(ApplicationStatusEnum.fromInteger(applicationInfo.getStatusId()));
                } else {
                    //If there is register number this is application for correction and register number is number of its initial application
                    resultHtmlBuilder = new StringBuilder("<p class=\"field-text\"><b>{${application_status}}</b></p>")
                        .append("<p class=\"field-text\">{PR_ON_INITIAL_APPLICATION_NO_L} ${initial_application_number} ")
                        .append("{PR_INITIAL_APPLICATION_REGNUM_L} ${pr_register_number}/${pr_register_date} {GL_YEAR_ABBREVIATION_L}")
                        .append(", „${register_type}“, ${registry_office_name}</p>");

                    substitutes = new HashMap<String, String>();
                    substitutes.put("application_status", ApplicationStatusEnum.ACCEPTED.getLabel());
                    substitutes.put("initial_application_number", applicationInfo.getInitialIncomingNumber());
                    substitutes.put("pr_register_number", applicationInfo.getRegisterNumber());
                    substitutes.put("pr_register_date", applicationInfo.getRegisterDate().format(dateFormatter));
                    substitutes.put("register_type", registerTypeCache.get(applicationInfo.getPrRegisterTypeId()).getName());
                    substitutes.put("registry_office_name", registryOfficeCache.get(applicationInfo.getRegistryOfficeId()).getName());

                    resultHtml = StringSubstitutor.replace(resultHtmlBuilder.toString(), substitutes);
                }

                break;
            case WAITING_FOR_PAYMENT://The same as TERMINATED only status is different
            case WAITING_FOR_REGISTRATION://The same as TERMINATED only status is different
            case IN_PROCESS://The same as TERMINATED only status is different
            case TERMINATED:
                resultHtml = createResultHtmlWithStatusAndStatusHistory(applicationInfo);
                break;
            case PROCESS_TERMINATED:
                resultHtmlBuilder = new StringBuilder("<p class=\"field-text\"><b>{").append(ApplicationStatusEnum.PROCESS_TERMINATED.getLabel()).append("}</b></p>")
                    .append("<p class=\"field-text\">");
                addTextLink(resultHtmlBuilder, applicationInfo, "PR_TECHNICAL_REASONS_L");
                resultHtmlBuilder.append("<br>");
                addStatusHistoryLink(resultHtmlBuilder, applicationInfo);
                resultHtmlBuilder.append("</p>");

                resultHtml = resultHtmlBuilder.toString();

                break;
            case COMPLETED:
                //Completed OSS Report
                resultHtmlBuilder = new StringBuilder("<p class=\"field-text\"><b>{${application_status}}</b></p>")
                    .append("<p class=\"field-text\"><a href=\"${result_download_link}\" target=\"_blank\" >{GL_RESULT_L}</a>")
                    .append(" {GL_NUMBER_ABBREVATION_L} ${report_result_number}/${report_result_date} {GL_YEAR_ABBREVIATION_L} ")
                    .append("${status_time} {GL_HOUR_ABBREVIATION_L}, „${register_type}“</p>");

                addStatusHistoryLink(resultHtmlBuilder, applicationInfo);

                substitutes = new HashMap<String, String>();
                substitutes.put("application_status", ApplicationStatusEnum.COMPLETED.getLabel());
                substitutes.put("result_download_link", UrlConstants.BASE_APP_URL_EPZEU_PLACEHOLDER + UrlConstants.DOCUMENT_ACCESS_URL +
                    "/" + applicationInfo.getReportResultDocumentGuid());
                substitutes.put("report_result_number", applicationInfo.getReportResultNumber().toString());
                substitutes.put("report_result_date", applicationInfo.getReportResultDate().format(dateFormatter));
                substitutes.put("status_time", applicationInfo.getStatusDateTime().format(timeFormatter));
                substitutes.put("register_type", registerTypeCache.get(applicationInfo.getPrRegisterTypeId()).getName());

                resultHtml = StringSubstitutor.replace(resultHtmlBuilder.toString(), substitutes);
                break;

            case WITHOUT_MOVEMENT_FOR_REVIEW:
                resultHtmlBuilder = new StringBuilder("<p class=\"field-text\"><b>{${application_status}}</b></p>")
                    .append("<p class=\"field-text\">{PR_SUBMITTED_CORRECTIVE_APPLICATION_L} <a href=\"${correction_app_preview_link}\" target=\"_blank\">${correction_app_incoming_number}</a>")
                    .append(" / ${correction_app_date} {GL_YEAR_ABBREVIATION_L} ${correction_app_time} {GL_HOUR_ABBREVIATION_L} ")
                    .append("{PR_ON_REGISTERED_APPLICATION_NO_L} ${pr_register_number}/${pr_register_date} {GL_YEAR_ABBREVIATION_L}")
                    .append(", „${register_type}“, ${registry_office_name}</p>");

                addStatusHistoryLink(resultHtmlBuilder, applicationInfo);

                substitutes = new HashMap<String, String>();
                substitutes.put("application_status", ApplicationStatusEnum.WITHOUT_MOVEMENT_FOR_REVIEW.getLabel());
                substitutes.put("correction_app_preview_link", UrlConstants.BASE_APP_URL_EPZEU_PLACEHOLDER + "/ApplicationPreview/" + applicationInfo.getCorrectionApplicationNumber());
                substitutes.put("correction_app_incoming_number", applicationInfo.getCorrectionApplicationNumber());
                substitutes.put("correction_app_date", applicationInfo.getCorrectionApplicationRegTime().format(dateFormatter));
                substitutes.put("correction_app_time", applicationInfo.getCorrectionApplicationRegTime().format(timeFormatter));
                substitutes.put("pr_register_number", applicationInfo.getRegisterNumber());
                substitutes.put("pr_register_date", applicationInfo.getRegisterDate().format(dateFormatter));
                substitutes.put("register_type", registerTypeCache.get(applicationInfo.getPrRegisterTypeId()).getName());
                substitutes.put("registry_office_name", registryOfficeCache.get(applicationInfo.getRegistryOfficeId()).getName());

                resultHtml = StringSubstitutor.replace(resultHtmlBuilder.toString(), substitutes);
                break;

            case REGISTERED_DEAL:
                resultHtmlBuilder = new StringBuilder("<p class=\"field-text\"><b>{PR_REGISTERED_UPCOMING_DEAL_L}</b></p>")
                    .append("<p class=\"field-text\">")
                    .append("{PR_APPLICATION_REGNUM_L} ${pr_register_number}/${pr_register_date} {GL_YEAR_ABBREVIATION_L} ${pr_register_time} {GL_HOUR_ABBREVIATION_L}")
                    .append(", „${register_type}“</p>");

                substitutes = new HashMap<String, String>();
                substitutes.put("pr_register_number", applicationInfo.getRegisterNumber());
                substitutes.put("register_type", registerTypeCache.get(applicationInfo.getPrRegisterTypeId()).getName());
                substitutes.put("pr_register_date", applicationInfo.getRegisterDate().format(dateFormatter));
                substitutes.put("pr_register_time", applicationInfo.getStatusDateTime().format(timeFormatter));

                resultHtml = StringSubstitutor.replace(resultHtmlBuilder.toString(), substitutes);

                break;
            case REGISTERED_ACT://The same as REGISTERED_CERTIFICATE only status is different
            case REGISTERED_CERTIFICATE:
                resultHtml = createResultHtmlWithIncomingNumber(applicationInfo, ApplicationStatusEnum.fromInteger(applicationInfo.getStatusId()), "PR_APPLICATION_REGNUM_L");
                break;

            case REFUSAL_TO_ISSUE_CERTIFICATE://The same as WITHOUT_MOVEMENT
            case WITH_A_REFUSAL:
            case WITHOUT_MOVEMENT:
                resultHtml = createResultHtmlWithResultFile(applicationInfo, ApplicationStatusEnum.fromInteger(applicationInfo.getStatusId()));
                break;

            case CANCELED:
                resultHtml = createResultHtmlWithResultFile(applicationInfo, ApplicationStatusEnum.CANCELED);
                break;

            case ISSUED_CERTIFICATE:
                resultHtml = createResultHtmlWithResultFile(applicationInfo, ApplicationStatusEnum.ISSUED_CERTIFICATE);
                break;

            case ISSUED_ACT:
                //When Application is in this status for Not Certified copy it will have result document, for certified copy it won't have result document
                if (applicationInfo.getApplicationTypeId() == ApplicationType.APPLICATION_NOT_CERTIFIED_COPY.getCode()) {
                    resultHtml = createResultHtmlWithResultFile(applicationInfo, ApplicationStatusEnum.ISSUED_ACT);
                } else {
                    resultHtml = createResultHtmlWithIncomingNumber(applicationInfo, ApplicationStatusEnum.ISSUED_ACT, "PR_ON_REGISTERED_APPLICATION_NO_L");
                }
                break;

            case IN_PROCESS_OF_ISSUE://The same as NO_DATA_FOUND only status is different
            case NO_DATA_FOUND:
                resultHtml = createResultHtmlWithIncomingNumber(applicationInfo, ApplicationStatusEnum.fromInteger(applicationInfo.getStatusId()), "PR_ON_REGISTERED_APPLICATION_NO_L");
                break;

            default:
                throw new IllegalStateException("There is no Application Status with id:" + applicationInfo.getStatusId());
        }

        return resultHtml;
    }

    private String createResultHtmlWithStatusAndStatusHistory(ApplicationInfo applicationInfo) {
        var resultHtmlBuilder = new StringBuilder("<p class=\"field-text\"><b>{")
            .append(ApplicationStatusEnum.fromInteger(applicationInfo.getStatusId()).getLabel())
            .append("}</b></p>")
            .append("<p class=\"field-text\">");

        addStatusHistoryLink(resultHtmlBuilder, applicationInfo);

        resultHtmlBuilder.append("</p>");

        return resultHtmlBuilder.toString();
    }

    private String createResultHtmlWithStatus(ApplicationStatusEnum applicationStatus) {
        return String.format("{%s}", applicationStatus.getLabel());
    }

    private String createResultHtmlWithResultFile(ApplicationInfo applicationInfo, ApplicationStatusEnum applicationStatus) {
        var substitutes = new HashMap<String, String>();

        var resultHtmlBuilder = new StringBuilder("<p class=\"field-text\"><b>{${application_status}}</b></p>")
            .append("<p class=\"field-text\">");

        if (StringUtils.hasText(applicationInfo.getRemark())) {
            addAttachmentInfoForText(applicationInfo, AttachmentInfo.AttachmentType.REMARK_TEXT);
        }
        if (StringUtils.hasText(applicationInfo.getJudgeResolution())) {
            addAttachmentInfoForText(applicationInfo, AttachmentInfo.AttachmentType.JUDGE_RESOLUTION_TEXT);
        }

        if (applicationInfo.getAttachmentsInfo() != null) {
            List<AttachmentInfo> sortedFiles = applicationInfo.getAttachmentsInfo().stream()
                .sorted((o1, o2) -> -(o1.getCreateDate().compareTo(o2.getCreateDate())))
                .collect(Collectors.toList());

            Iterator<AttachmentInfo> attachmentInfoIterator = sortedFiles.iterator();
            while (attachmentInfoIterator.hasNext()) {
                AttachmentInfo attachmentInfo = attachmentInfoIterator.next();

                LocalDateTime createdDateTimeForLocalZone = attachmentInfo.getCreateDate();

                if (AttachmentInfo.AttachmentType.FILE == attachmentInfo.getType()) {
                    String documentTypeLabel = DocumentTypeEnum.fromIdToLabel(attachmentInfo.getFileTypeID());

                    resultHtmlBuilder.append("<a href=\"")
                        .append(UrlConstants.BASE_APP_URL_EPZEU_PLACEHOLDER + UrlConstants.DOCUMENT_ACCESS_URL +
                            "/" + attachmentInfo.getDownloadIdentifier())
                        .append("\" target=\"_blank\">")
                        .append(StringUtils.hasText(documentTypeLabel) ? "{" + documentTypeLabel + "}" : documentTypeNomenclatureCache.get(attachmentInfo.getFileTypeID()).getName())
                        .append("</a>/")
                        .append(createdDateTimeForLocalZone.format(dateFormatter))
                        .append(" {GL_YEAR_ABBREVIATION_L} ")
                        .append(createdDateTimeForLocalZone.format(timeFormatter))
                        .append(" {GL_HOUR_ABBREVIATION_L}");
                    if (attachmentInfoIterator.hasNext()) {
                        resultHtmlBuilder.append(",").append("<br>");
                    }
                } else if (AttachmentInfo.AttachmentType.JUDGE_RESOLUTION_TEXT == attachmentInfo.getType()) {

                    addTextLink(resultHtmlBuilder, applicationInfo, "PR_JUDGE_RESOLUTION_L");

                    if (attachmentInfoIterator.hasNext()) {
                        resultHtmlBuilder.append(",").append("<br>");
                    }
                } else if (AttachmentInfo.AttachmentType.REMARK_TEXT == attachmentInfo.getType()) {
                    if(applicationInfo.getStatusId() == ApplicationStatusEnum.WITH_A_REFUSAL.getId()
                        && applicationInfo.getApplicationTypeId() == ApplicationType.APPLICATION_NOT_CERTIFIED_COPY.getCode()) {

                        addTextLink(resultHtmlBuilder, applicationInfo, "GL_REASON_L");
                    } else {
                        addTextLink(resultHtmlBuilder, applicationInfo, "PR_REASONS_L");
                    }

                    if (attachmentInfoIterator.hasNext()) {
                        resultHtmlBuilder.append(",").append("<br>");
                    }
                }
            }
        }

        resultHtmlBuilder.append(" {PR_ON_REGISTERED_APPLICATION_NO_L} ${pr_register_number}/${pr_register_date} {GL_YEAR_ABBREVIATION_L}")
            .append(", „${register_type}“, ${registry_office_name}</p>");

        addStatusHistoryLink(resultHtmlBuilder, applicationInfo);

        substitutes.put("application_status", applicationStatus.getLabel());
        substitutes.put("pr_register_number", applicationInfo.getRegisterNumber());
        substitutes.put("pr_register_date", applicationInfo.getRegisterDate().format(dateFormatter));
        substitutes.put("register_type", registerTypeCache.get(applicationInfo.getPrRegisterTypeId()).getName());
        substitutes.put("registry_office_name", registryOfficeCache.get(applicationInfo.getRegistryOfficeId()).getName());

        return StringSubstitutor.replace(resultHtmlBuilder.toString(), substitutes);
    }

    private void addStatusHistoryLink(StringBuilder resultHtmlBuilder, ApplicationInfo applicationInfo) {
        resultHtmlBuilder.append("<a href=\"")
            .append(UrlConstants.BASE_APP_URL_EPZEU_PLACEHOLDER + UrlConstants.STATUS_HISTORY_URL + "/" + applicationInfo.getIncomingNumber())
            .append("\" target=\"_blank\" >{PR_SHOW_STATUS_HISTRY_L}</a>");
    }

    private void addAttachmentInfoForText(ApplicationInfo applicationInfo, AttachmentInfo.AttachmentType attachmentType) {
        if(applicationInfo.getStatusId() == ApplicationStatusEnum.WITHOUT_MOVEMENT.getId() || applicationInfo.getStatusId() == ApplicationStatusEnum.WITH_A_REFUSAL.getId()
            || applicationInfo.getStatusId() == ApplicationStatusEnum.REFUSAL_TO_ISSUE_CERTIFICATE.getId() || applicationInfo.getStatusId() == ApplicationStatusEnum.CANCELED.getId()) {
            List<AttachmentInfo> attachmentsInfo = applicationInfo.getAttachmentsInfo();

            LocalDateTime createDate = applicationInfo.getStatusDateTime();
            attachmentsInfo.add(new AttachmentInfo(attachmentType, createDate));
        }
    }

    private void addTextLink(StringBuilder resultHtmlBuilder, ApplicationInfo applicationInfo, String label) {
        resultHtmlBuilder.append("<a href=\"")
            .append(UrlConstants.BASE_APP_URL_EPZEU_PLACEHOLDER + UrlConstants.STATUS_TEXT_URL +
                "/" + applicationInfo.getIncomingNumber())
            .append("\" target=\"_blank\" >{").append(label).append("}</a>/")
            .append(applicationInfo.getStatusDateTime().format(dateFormatter))
            .append(" {GL_YEAR_ABBREVIATION_L} ")
            .append(applicationInfo.getStatusDateTime().format(timeFormatter))
            .append(" {GL_HOUR_ABBREVIATION_L}");
    }

    private String createResultHtmlWithIncomingNumber(ApplicationInfo applicationInfo, ApplicationStatusEnum applicationStatus, String startLabel) {
        var resultHtmlBuilder = new StringBuilder("<p class=\"field-text\"><b>{${application_status}}</b></p>")
            .append("<p class=\"field-text\">")
            .append("{")
            .append(startLabel)
            .append("} ${pr_register_number}/${pr_register_date} {GL_YEAR_ABBREVIATION_L}, „${register_type}“, ${registry_office_name}</p>");

        addStatusHistoryLink(resultHtmlBuilder, applicationInfo);

        var substitutes = new HashMap<String, String>();
        substitutes.put("application_status", applicationStatus.getLabel());
        substitutes.put("pr_register_number", applicationInfo.getRegisterNumber());
        substitutes.put("pr_register_date", applicationInfo.getRegisterDate().format(dateFormatter));
        substitutes.put("register_type", registerTypeCache.get(applicationInfo.getPrRegisterTypeId()).getName());
        substitutes.put("registry_office_name", registryOfficeCache.get(applicationInfo.getRegistryOfficeId()).getName());

        return StringSubstitutor.replace(resultHtmlBuilder.toString(), substitutes);
    }
}
