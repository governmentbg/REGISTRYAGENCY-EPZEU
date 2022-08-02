using EPZEU.Applications.Models;
using EPZEU.Common;
using EPZEU.Nomenclatures;
using EPZEU.Web.DataProtection;
using EPZEU.Web.Utilities;
using Integration.EPZEU.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

namespace EPZEU.CR.Web.Common
{
    /// <summary>
    /// Интерфейс за работа със съдържанието на заявление
    /// </summary>
    public interface IApplicationConverter
    {
        /// <summary>
        /// Изчислява резултата на заявлението
        /// </summary>
        /// <param name="appInfo">Заявление от ТР</param>
        /// <param name="uicForUrlsIfApplicable">ЕИК</param>
        /// <param name="protectIncomingNumber"флаг указващ дали да се добави контекстна информация към линк с входящ номер</param>
        /// <returns>Html резултат на заявлението</returns>
        string CalculateApplicationResultHtml(ApplicationInfo appInfo, string uicForUrlsIfApplicable = null, string companyName = null, bool combineIncomingNumberWithCtx = false, bool isForMyApplication = false);

        /// <summary>
        /// Трансформира заявлението към заявление което се съдържа в EPZEU
        /// </summary>
        /// <param name="appInfo">Заявление от ТР</param>
        /// <returns></returns>
        Application ConvertToEPZEUApplication(ApplicationInfo appInfo);

        /// <summary>
        /// Трансформира заявлението към заясвление с което да работи UI
        /// </summary>
        /// <param name="appInfo">Заявление от ТР</param>
        /// <returns></returns>
        Models.ApplicationInfo ConvertToUIApplication(ApplicationInfo appInfo, string uic = null, string companyName = null);
    }


    /// <summary>
    /// Имплементация на IApplicationConverter за работа със съдържанието на заявление
    /// </summary>
    public class ApplicationConverter : IApplicationConverter
    {
        private readonly Regex _localizeResultRegex = null;
        private readonly IDataProtectorService _dataProtectorService = null;
        private readonly IStringLocalizer _stringLocalizer;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IOptionsMonitor<GlobalOptions> _globalOptionsAccessor;
        private readonly IApplicationTypes _appTypes;

        private GlobalOptions GlobalOptions => _globalOptionsAccessor.CurrentValue;
        private string CurrentLang => _httpContextAccessor.HttpContext.GetLanguage();

        public ApplicationConverter(
           IStringLocalizer stringLocalizer,
           IOptionsMonitor<GlobalOptions> globalOptionsAccessor,
           IHttpContextAccessor httpContextAccessor,
           IApplicationTypes appTypes,
           IDataProtectorService dataProtectorService)
        {
            _dataProtectorService = dataProtectorService;
            _stringLocalizer = stringLocalizer;
            _httpContextAccessor = httpContextAccessor;
            _globalOptionsAccessor = globalOptionsAccessor;
            _appTypes = appTypes;

            _localizeResultRegex = new Regex("{[A-Za-z0-9_]*}");
        }

        #region IApplicationConverter

        public Application ConvertToEPZEUApplication(Integration.EPZEU.Models.ApplicationInfo appInfo)
        {
            DateTime? lastModifiedDate;
            var appTypes = _appTypes.GetApplicationTypes(CurrentLang, EPZEU.Nomenclatures.Models.Registers.CR, out lastModifiedDate);

            var application = new Application()
            {
                Register = EPZEU.Nomenclatures.Models.Registers.CR,
                ApplicationTypeID = appTypes.Where(at => at.AppType == ((int)appInfo.ApplicationType).ToString()).Single().ApplicationTypeID,
                IncomingNumber = appInfo.IncomingNumber,
                RegistrationDate = appInfo.RegistrationDate,
                ApplicationDisplayUrl = GetIncomingDocumentsURL(appInfo),
                ResultHTML = CalculateApplicationResultHtml(appInfo, null, null, false, true)
            };

            return application;
        }

        public Models.ApplicationInfo ConvertToUIApplication(ApplicationInfo appInfo, string uic = null, string companyName = null)
        {
            var application = new Models.ApplicationInfo()
            {
                IncomingNumber = appInfo.IncomingNumber,
                ApplicationTypeName = appInfo.ApplicationTypeName,
                ApplicationType = appInfo.ApplicationType,
                ApplicationStatus = appInfo.ApplicationStatus,
                PassedFrom = appInfo.PassedFrom,
                RegistrationDate = appInfo.RegistrationDate,
                OfficeName = appInfo.OfficeName,
                EntryNumber = appInfo.EntryNumber,
                ApplicationState = appInfo.ApplicationState,
                EntryDate = appInfo.EntryDate,
                RefusalType = appInfo.Refusal.Type,
                OutgoingNumber = appInfo.OutgoingRegister.OutgoingNumber,
                HasRequestsForCorrectionForScanning = appInfo.HasRequestsForCorrectionForScanning,
                ResultHTML = InitResultHtmlURLs(LocalizeResultHtmlResources(CalculateApplicationResultHtml(appInfo, uic, companyName, true))),
                IncomingLinkedDeeds = appInfo.IncomingLinkedDeeds,
                EntryDeeds = appInfo.EntryDeeds,
                IncomingNumberWithCtx = string.IsNullOrEmpty(uic) ? null : _dataProtectorService.CombineIncomingNumberWithCtx(appInfo.IncomingNumber, uic, companyName)
            };

            return application;
        }

        public string CalculateApplicationResultHtml(ApplicationInfo appInfo, string uicForUrlsIfApplicable = null, string companyName = null, bool combineIncomingNumberWithCtx = false, bool isForMyApplication = false)
        {
            string outgoingDocumentGuidWithCtx = appInfo.OutgoingRegister.OutgoingDocumentGuid;
            string refusalDocumentGuidWithCtx = appInfo.Refusal.DocumentGuid;

            if (!string.IsNullOrEmpty(uicForUrlsIfApplicable))
            {

                if (!string.IsNullOrEmpty(appInfo.OutgoingRegister.OutgoingDocumentGuid))
                {
                    outgoingDocumentGuidWithCtx = _dataProtectorService.CombineDocGuidWithCtx(appInfo.OutgoingRegister.OutgoingDocumentGuid, appInfo.IncomingNumber, uicForUrlsIfApplicable);
                }

                if (!string.IsNullOrEmpty(appInfo.Refusal.DocumentGuid))
                {
                    refusalDocumentGuidWithCtx = _dataProtectorService.CombineDocGuidWithCtx(appInfo.Refusal.DocumentGuid, appInfo.IncomingNumber, uicForUrlsIfApplicable);
                }
            }

            string incomingNumberWithCtx = appInfo.IncomingNumber;
            if (combineIncomingNumberWithCtx)
            {
                string IncomingNumberWithCtx = _dataProtectorService.CombineIncomingNumberWithCtx(appInfo.IncomingNumber, uicForUrlsIfApplicable, companyName);
            }

            string result = null;

            switch (appInfo.ApplicationStatus)
            {
                case ApplicationStatuses.SentToCourt:
                    //Изпратена до съда, изх. номер
                    result = GetOutgoingDocumentsLink(appInfo, string.Format("{0} {1}", "{CR_SENT_TO_COURT_OUTGOING_NO_L}", appInfo.OutgoingRegister.OutgoingNumber));
                    break;
                case ApplicationStatuses.WaitingCourtAct:
                    //изчаква акт на съда
                    result = "{GL_AWAITING_ACT_COURT_L}";
                    break;
                case ApplicationStatuses.Waiting14Days:
                    //Изчаква 14 дневен срок
                    result = _stringLocalizer["GL_AWAITING_14_DAY_DEADLINE_L"];
                    break;
                case ApplicationStatuses.NotEntered:
                    //не вписва
                    result = "{GL_NOT_RECORD_L}";
                    break;
                case ApplicationStatuses.Processing:
                    //обработва се
                    result = "{GL_PROCESSED_L}";
                    break;
                case ApplicationStatuses.Refusal:
                    if (appInfo.OutgoingRegister.OutgoingDocumentType == EPZEU.CR.Domain.Common.DocumentTypes.Refusal)
                    {
                        //Отказ
                        result = GetOutgoingDocumentsLink(appInfo, "{GL_REJECTION_L}");
                    }
                    else
                    {
                        //Отказ
                        result = string.Format("<a href='baseApplicationURL{0}?incomingNumber={1}&outgoingDocGUID={2}' target='_blank'>{3}</a>", Models.PagesURLs.OutgoingDocumentsURL, appInfo.IncomingNumber, appInfo.Refusal.OutgoingGUID, "{GL_REJECTION_L}");
                    }
                    break;
                case ApplicationStatuses.TerminationOfRegProcedure:
                    if (appInfo.Refusal.Type == RefusalTypes.InscribedCircumstances
                        || appInfo.Refusal.Type == RefusalTypes.NotSubjectToInscription)
                    {
                        result = appInfo.Refusal.Reason;
                    }
                    else
                    {
                        //прекратяване на рег. производство
                        result = "{GL_CANCEL_REG_PROCESS_L}";
                    }
                    break;
                case ApplicationStatuses.RequestedCSCFromTheCourt:
                    //Поискано УАС от съда
                    result = GetOutgoingDocumentsLink(appInfo, "{GL_REQUEST_UAC_COURT_L}");
                    break;
                case ApplicationStatuses.StopProceeding:
                    if (appInfo.RelatedAct != null)
                    {
                        //Спиране на регистърно прозводство с Решение
                        result = string.Format("{0} {1}", "{CR_SUSPESION_REGISTRY_DECISION_L}", GetActsInfo(appInfo.RelatedAct));
                    }
                    else
                    {
                        result = "";
                    }
                    break;
                case ApplicationStatuses.NotReserved:
                    if (string.IsNullOrEmpty(appInfo.OutgoingRegister.OutgoingGUID))
                    {
                        //не запазва
                        result = "{GL_NOT_SAVE_L}";
                    }
                    else
                    {
                        //не запазва
                        result = GetOutgoingDocumentsLink(appInfo, "{GL_NOT_SAVE_L}");
                    }
                    break;
                case ApplicationStatuses.WaitingFor3DaysTerm:
                    //Изчакване на 3-дневен срок
                    result = _stringLocalizer["GL_AWAITING_3_DAY_DEADLINE_L"];
                    break;
                case ApplicationStatuses.WaitingForProcessingPreviousApplication:
                    //Изчаква обработка на предходно заявление
                    result = "{GL_AWAITING_PROCESSING_PREVIOUS_APPLICATION_L}";
                    break;
                case ApplicationStatuses.Reserved:
                    if (string.IsNullOrEmpty(appInfo.OutgoingRegister.OutgoingGUID))
                    {
                        //запазва
                        result = "{CR_GL_SAVE_L}";
                    }
                    else
                    {
                        //запазва
                        result = GetOutgoingDocumentsLink(appInfo, "{CR_GL_SAVE_L}");
                    }
                    break;
                case ApplicationStatuses.DeleteReservationCompany:
                    //заличаване на запазването
                    result = "{GL_DELETE_RESERVATION_L}";
                    break;
                case ApplicationStatuses.NotDeleteReservationCompany:
                    //не заличава запазването
                    result = "{CR_NOT_DELETE_PRESERVATION_L}";
                    break;
                case ApplicationStatuses.Accepted:
                    if (appInfo.ApplicationType == ApplicationFormTypes.CourtAct)
                    {
                        if (appInfo.Act != null)
                        {
                            result = string.Format("{0} {1}/{2}{3}{4}"
                                , "{CR_APP_COURT_NUMBER_L}"
                                , appInfo.Act.CaseNo
                                , appInfo.Act.CaseYear
                                , string.IsNullOrEmpty(appInfo.Act.PublisherName) ? "" : string.Format(", {0}", appInfo.Act.PublisherName)
                                , appInfo.EntryDeeds != null && appInfo.EntryDeeds.Any() ? string.Format("<br/>{0}: {1}", "{CR_GL_REGISTRATION_L}", appInfo.EntryNumber) : "");
                        }
                        else
                        {

                            result = appInfo.EntryDeeds != null && appInfo.EntryDeeds.Any() ? string.Format("{0}: {1}", "{CR_GL_REGISTRATION_L}", appInfo.EntryNumber) : "";
                        }
                    }
                    else
                    {
                        //приет
                        result = "{CR_APP_ACCEPTED_L}";
                    }
                    break;
                case ApplicationStatuses.Entered:
                    //вписване
                    result = string.Format("{0} {1}", "{CR_GL_REGISTRATION_L}", appInfo.EntryNumber);
                    break;
                case ApplicationStatuses.EnteredWithRefusal:
                    if (appInfo.OutgoingRegister.OutgoingDocumentType == EPZEU.CR.Domain.Common.DocumentTypes.Refusal)
                    {
                        result = string.Format("{0} {1} </br> {2}", "{CR_GL_REGISTRATION_L}", appInfo.EntryNumber, GetOutgoingDocumentsLink(appInfo, "{GL_REJECTION_L}"));
                    }
                    else
                    {
                        if (appInfo.ApplicationType == ApplicationFormTypes.RequestForCorrection)
                        {
                            //TRIR-5052
                            result = string.Format("{0} {1}", "{CR_GL_REGISTRATION_L}", appInfo.EntryNumber);
                        }
                        else
                        {
                            if (string.IsNullOrEmpty(appInfo.Refusal.OutgoingGUID))
                            {
                                result = string.Format("{0} {1} </br> {2}", "{CR_GL_REGISTRATION_L}", appInfo.EntryNumber, GetDocumentDownloadLink(appInfo.Refusal.DocumentGuid, "{GL_REJECTION_L}"));
                            }
                            else
                            {
                                result = string.Format("{0} {1} </br> {2}", "{CR_GL_REGISTRATION_L}", appInfo.EntryNumber, string.Format("<a href='baseApplicationURL{0}?incomingNumber={1}&outgoingDocGUID={2}' target='_blank'>{3}</a>", Models.PagesURLs.OutgoingDocumentsURL, appInfo.IncomingNumber, appInfo.Refusal.OutgoingGUID, "{GL_REJECTION_L}"));
                            }

                        }
                    }
                    break;
                case ApplicationStatuses.WaitingPayment:
                    //Чака плащане
                    result = "{GL_WAIT_FOR_PAYMENT_L}";
                    break;
                case ApplicationStatuses.Sent:
                    //Изпратено
                    if (isForMyApplication)
                        result = GetDocumentDownloadLink(outgoingDocumentGuidWithCtx, "{GL_SENTED_L}");
                    else
                        result = "{GL_SENTED_L}";

                    break;
                case ApplicationStatuses.StopAssignmentProceeding:
                    //Прекратяване на производство по назначение
                    if (appInfo.OutgoingRegister.OutgoingNumberCount > 1)
                    {
                        result = GetOutgoingDocumentsLink(appInfo, "{CR_APP_TERMINATION_OF_APPOINTMENT_PROCEDURE_L}", true);
                    }
                    else
                    {
                        result = GetDocumentDownloadLink(refusalDocumentGuidWithCtx, "{CR_APP_TERMINATION_OF_APPOINTMENT_PROCEDURE_L}");
                    }
                    break;
                case ApplicationStatuses.IncomingRegistrationRefusal:
                    //Прекратяване на производство
                    result = "{CR_APP_TERMINATION_PROCEEDINGS_L}";
                    break;
                case ApplicationStatuses.StopNewAssignmentProceeding:
                    //Прекратяване на производство по назначение
                    if (appInfo.OutgoingRegister.OutgoingNumberCount > 1)
                    {
                        result = GetOutgoingDocumentsLink(appInfo, "{CR_APP_TERMINATION_OF_APPOINTMENT_PROCEDURE_L}", true);
                    }
                    else
                    {
                        result = GetDocumentDownloadLink(refusalDocumentGuidWithCtx, "{CR_APP_TERMINATION_OF_APPOINTMENT_PROCEDURE_L}");
                    }
                    break;
                case ApplicationStatuses.AssignmentAccepted:
                    //Приет
                    result = "{CR_APP_ACCEPTED_L}";
                    break;
                case ApplicationStatuses.AssignmentAct:
                    //Акт за назначаване
                    if (appInfo.OutgoingRegister.OutgoingNumberCount > 1)
                    {
                        result = GetOutgoingDocumentsLink(appInfo, "{CR_APP_APPOINTMENT_ACT_L}", true);
                    }
                    else
                    {
                        if (string.IsNullOrEmpty(refusalDocumentGuidWithCtx))
                        {
                            result = GetDocumentDownloadLink(outgoingDocumentGuidWithCtx, "{CR_APP_APPOINTMENT_ACT_L}");
                        }
                        else
                        {
                            result = GetDocumentDownloadLink(refusalDocumentGuidWithCtx, "{CR_APP_APPOINTMENT_ACT_L}");
                        }
                    }
                    break;
                case ApplicationStatuses.AssignmentNextAct:
                    //Акт за изменение на акта за назначение
                    if (appInfo.OutgoingRegister.OutgoingNumberCount > 1)
                    {
                        result = GetOutgoingDocumentsLink(appInfo, "{CR_APP_ACT_AMENDING_APPOINTMENT_ACT_L}", true);
                    }
                    else
                    {
                        if (string.IsNullOrEmpty(refusalDocumentGuidWithCtx))
                        {
                            result = GetDocumentDownloadLink(outgoingDocumentGuidWithCtx, "{CR_APP_ACT_AMENDING_APPOINTMENT_ACT_L}");
                        }
                        else
                        {
                            result = GetDocumentDownloadLink(refusalDocumentGuidWithCtx, "{CR_APP_ACT_AMENDING_APPOINTMENT_ACT_L}");
                        }
                    }
                    break;
                case ApplicationStatuses.AssignmentWaitForAttitude:
                    //Изчакване за становище
                    result = "{CR_APP_WAITING_FOR_OPINION_L}";
                    break;
                case ApplicationStatuses.AssignmentCognizatExpertReturn:
                    //Върната експертиза
                    result = "{CR_APP_RETURNED_EXPERTISE_L}";
                    break;
                case ApplicationStatuses.AssignmentCognizantPayedDepositNotification:
                    //Изпратено уведомление на вещите лица
                    result = "{CR_APP_SENT_NOTIFICATION_TO_EXPERT_PERSONS_L}";
                    break;
                case ApplicationStatuses.AssignmentLiquidatorPayedDepositNotification:
                    //Изпратено уведомление на ликвидаторите
                    result = "{CR_APP_SENT_NOTIFICATION_TO_LIQUIDATORS_L}";
                    break;
                case ApplicationStatuses.AssignmentApplicantAdditionalDepositNotification:
                    //Поискано довнасяне на определен депозит
                    result = "{CR_APP_REQUEST_ADDITIONAL_DEPOSIT_L}";
                    break;
                case ApplicationStatuses.AssignmentCognizantRewardAndRestDeposit:
                    //Изпратена експертиза
                    result = "{CR_APP_SENT_EXPERTISE_L}";
                    break;
                case ApplicationStatuses.AssignmentAppointingControllerReward:
                    //Определено възнаграждение
                    result = "{CR_APP_FIXED_REMUNERATION_L}";
                    break;
                case ApplicationStatuses.AssignmentLiquidatorInterestedPersonDeposit:
                    //Поискан депозит от заинтересованите лица
                    result = "{CR_APP_DEPOSIT_REQIURED_BY_INTERESTED_PERSONS_L}";
                    break;
                case ApplicationStatuses.AssignmentLiquidatorReleaseDeposit:
                    //Освобождаване на депозит
                    result = GetDocumentDownloadLink(outgoingDocumentGuidWithCtx, "{CR_APP_RELEASE_DEPOSIT_L}");
                    break;
                default:
                    result = "";
                    break;
            }

            if (appInfo.OutgoingRegister.OutgoingDocumentType == EPZEU.CR.Domain.Common.DocumentTypes.CertificateConformityWithLaw)
            {
                if (string.IsNullOrEmpty(result))
                {
                    //издадено Удостоверение за законосъобразност
                    result = GetOutgoingDocumentsLink(appInfo, "{GL_ISSUING_CERTIFICATE_OF_LEGALITY_L}");
                }
                else
                {
                    //издадено Удостоверение за законосъобразност
                    result += "</br>" + GetOutgoingDocumentsLink(appInfo, "{GL_ISSUING_CERTIFICATE_OF_LEGALITY_L}");
                }
            }

            if (appInfo.ApplicationType == ApplicationFormTypes.CourtAct && appInfo.OutgoingRegister.OutgoingDocumentType == EPZEU.CR.Domain.Common.DocumentTypes.Act && !string.IsNullOrEmpty(outgoingDocumentGuidWithCtx))
            {
                result += "</br>" + GetDocumentDownloadLink(outgoingDocumentGuidWithCtx, "{CR_APP_APPOINTMENT_ACT_L}");
            }

            if (appInfo.InstructionMaxDate.HasValue)
            {
                if (string.IsNullOrEmpty(result))
                {
                    result = "";
                }
                else
                {
                    result += "</br>";
                }

                string dateFormat = string.Format("dd.MM.yyyy {0} HH:mm:ss", _stringLocalizer["GL_YEAR_ABBREVIATION_L"]);
                string fromDate = _stringLocalizer["CR_APP_FROM_DATE_L"];
                //Указания
                result += GetInstructionsLink(appInfo, string.Format("{0} {1} {2}", "{GL_INSTRUCTIONS_L}", fromDate.ToLower(), appInfo.InstructionMaxDate.Value.ToString(dateFormat)));
            }

            if (appInfo.ApplicationType == ApplicationFormTypes.B6 && appInfo.OutgoingRegister.OutgoingDocumentType == EPZEU.CR.Domain.Common.DocumentTypes.Act)
            {
                if (string.IsNullOrEmpty(result))
                {
                    result = "";
                }
                else
                {
                    result += "</br>";
                }

                //Указания за назначаване
                result += GetOutgoingDocumentsLink(appInfo, "{CR_APP_APPOINTMENT_ACT_L}", true);
            }

            if (appInfo.PassedFrom == Integration.EPZEU.Models.PassedFrom.Internal)
            {
                if (string.IsNullOrEmpty(result))
                    result = "";
                else
                    result += "</br>";

                if (appInfo.ApplicationStatus != Integration.EPZEU.Models.ApplicationStatuses.Processing && appInfo.ApplicationStatus != Integration.EPZEU.Models.ApplicationStatuses.Instruction)
                {
                    //Регистрацията вече е обработена
                }
                else if (appInfo.HasRequestsForCorrectionForScanning.HasValue && appInfo.HasRequestsForCorrectionForScanning.Value)
                    result += GetRequestForCorrectionForScanningLink(appInfo, "{GL_VIEW_SUMBITTED_NOTIFICATION_ERROR_DURING_SCANNING_L}"); //Преглед на подадено "Уведомление за изправяне на грешка"
                else
                    result += GetRequestForCorrectionForScanningLink(appInfo, "{GL_REPORT_ERROR_DURING_SCANNING_L}"); //Подаване на "Уведомление за изправяне на грешка"
            }

            return result;
        }


        #endregion

        #region Helpers

        private string InitResultHtmlURLs(string resultHtml)
        {
            if (resultHtml.Contains("baseApplicationURL"))
            {
                string lang = CurrentLang;
                if (lang == "bg")
                {
                    resultHtml = UrlHelpers.PrepareUrl(resultHtml.Replace("baseApplicationURL", GlobalOptions.GL_CR_PUBLIC_UI_URL));
                }
                else
                {
                    resultHtml = UrlHelpers.PrepareUrl(resultHtml.Replace("baseApplicationURL", string.Format("{0}/{1}/", GlobalOptions.GL_CR_PUBLIC_UI_URL, lang)));
                }
            }

            if (resultHtml.Contains("baseNoLangApplicationURL"))
            {
                resultHtml = UrlHelpers.PrepareUrl(resultHtml.Replace("baseNoLangApplicationURL", GlobalOptions.GL_CR_PUBLIC_UI_URL));
            }

            return resultHtml;
        }

        private string LocalizeResultHtmlResources(string resultHtml)
        {
            var resourceKeys = ExtractByRegex(resultHtml).Select(res => res.Replace("{", "").Replace("}", ""));

            foreach (var key in resourceKeys)
            {
                resultHtml = resultHtml.Replace("{" + key + "}", _stringLocalizer[key]);
            }

            return resultHtml;
        }

        private string GetInstructionsLink(Integration.EPZEU.Models.ApplicationInfo appInfo, string text)
        {
            return string.Format("<a href='baseApplicationURL{0}?incomingNumber={1}' target='_blank'>{2}</a>", Models.PagesURLs.InstructionsURL, appInfo.IncomingNumber, text);
        }

        private string GetOutgoingDocumentsLink(Integration.EPZEU.Models.ApplicationInfo appInfo, string text, bool loadAll = false)
        {
            if (!loadAll)
            {
                return string.Format("<a href='baseApplicationURL{0}?incomingNumber={1}&outgoingDocGUID={2}' target='_blank'>{3}</a>", Models.PagesURLs.OutgoingDocumentsURL, appInfo.IncomingNumber, appInfo.OutgoingRegister.OutgoingGUID, text);
            }
            else
            {
                return string.Format("<a href='baseApplicationURL{0}?incomingNumber={1}' target='_blank'>{2}</a>", Models.PagesURLs.OutgoingDocumentsURL, appInfo.IncomingNumber, text);
            }
        }

        private string GetRequestForCorrectionForScanningLink(Integration.EPZEU.Models.ApplicationInfo appInfo, string text)
        {
            return string.Format("<a href='baseApplicationURL{0}/{1}' target='_blank'>{2}</a>", Models.PagesURLs.RequestForCorrectionForScanningURL, appInfo.IncomingNumber, text);
        }

        private string GetDocumentDownloadLink(string docGuid, string text)
        {
            if (string.IsNullOrEmpty(docGuid))
                return text;
            else
                return string.Format("<a href='baseApplicationURL/{0}/{1}' target='_blank'>{2}</a>", Models.LinkRoutes.DOCUMENT_ACCESS_UI_URL, docGuid, text);
        }

        private string GetActsInfo(Act act)
        {
            string dateFormat = string.Format("dd.MM.yyyy {0}", _stringLocalizer["GL_YEAR_ABBREVIATION_L"]);
            return string.Format("{{CR_GL_ACT_NUMBER_L}} {0} {{GL_START_DATE_L}} {1}, {{CR_APP_COURT_NUMBER_L}} {2}/{3}{4}",
                act.ActNumber,
                act.ActDate.Value.ToString(dateFormat),
                act.CaseNo,
                act.CaseYear,
                string.IsNullOrEmpty(act.PublisherName) ? "" : ", " + act.PublisherName);
        }

        private List<string> ExtractByRegex(string value)
        {
            var results = new List<string>();

            var match = _localizeResultRegex.Match(value);

            while (match != null && match.Success)
            {
                results.Add(match.Groups[0].Value);

                match = match.NextMatch();
            }

            return results;
        }

        private string GetIncomingDocumentsURL(Integration.EPZEU.Models.ApplicationInfo appInfo)
        {
            return string.Format("baseApplicationURL{0}?incomingNumber={1}", Models.PagesURLs.IncomingDocumentsURL, appInfo.IncomingNumber);
        }

        #endregion
    }
}
