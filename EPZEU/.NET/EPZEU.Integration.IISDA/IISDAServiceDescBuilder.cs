using IISDA.AdministrativeServices;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace EPZEU.Integration.IISDA
{
    /// <summary>
    /// Интерфейс за създаване на описание на услуги за IISDA.
    /// </summary>
    public interface IIISDAServiceDescriptionBuilder
    {
        /// <summary>
        /// Създаване на описание на услуги за IISDA.
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        string BuildServiceDescription(AdmServiceBatchDataType item);
    }

    /// <summary>
    /// Реализация на интерфейс IISDAServiceDescriptionHtmlBuilder за създаване на описание на услуги за IISDA.
    /// </summary>
    internal class IISDAServiceDescriptionHtmlBuilder : IIISDAServiceDescriptionBuilder
    {
        public string BuildServiceDescription(AdmServiceBatchDataType item)
        {
            string html = $"<div class=\"card card-page\"><div class=\"card-body card-page__body\">{BuildMainHtmlSection(item)}</div></div>" +
                $"<section class=\"card card-page card--collapsible\">{BuildServicingUnitsHtmlSection(item)}</section>" +
                $"<section class=\"card card-page card--collapsible\">{BuildStagesHtmlSection(item)}</section>" +
                $"<section class=\"card card-page card--collapsible\">{BuildModelDocumentsHtmlSection(item.AdmServiceBatchInfo.ModelDocuments)}</section>" +
                $"<section class=\"card card-page card--collapsible\">{BuildRegulatoryDocumentsHtmlSection(item.AdmServiceBatchInfo.RegulatoryRegimeDocuments)}</section>" +
                $"<section class=\"card card-page card--collapsible\">{BuildPaymentInfoHtmlSection(item)}</section>";

            return html;
        }

        private string BuildMainHtmlSection(AdmServiceBatchDataType item)
        {
            StringBuilder html = new StringBuilder();
            html.Append($"<p><b>Услуга:</b><br />{item.AdmServiceData.ServiceNumber} {item.AdmServiceData.Name}</p>");
            html.Append($"<p>{item.AdmServiceData.Description}</p>");
            html.Append($"<p><b>На основание на</b>:<br />{BuildLegalBasisHtmlData(item.AdmServiceData.LegalBasisCollection)}</p>");
            html.Append($"<p><b>Орган по предоставянето на административната услуга:</b><br />{item.AdmServiceBatchInfo.ProvisionGovBodyName}</p>");
            html.Append($"<p><b>Срок за предоставяне:</b><br />{item.AdmServiceBatchInfo.GrantTerm}</p>");
            html.Append($"<p><b>Срок на действие на документа/индивидуалния административен акт:</b><br />{item.AdmServiceBatchInfo.OperationTerm}</p>");
            html.Append($"<p><b>Орган, осъществяващ контрол върху дейността на органа по предоставянето на услугата:</b><br />{item.AdmServiceBatchInfo.ControlGovBodyName}</p>");
            html.Append($"<p><b>Орган, пред който се обжалва индивидуален административен акт:</b><br />{item.AdmServiceBatchInfo.AppealGovBodyName}</p>");
            html.Append($"<p><b>Електронен адрес, на който се предоставя услугата:</b><br />{item.AdmServiceBatchInfo.ProvisionEAddress}</p>");
            html.Append($"<p><b>Електронен адрес за предложения:</b><br />{item.AdmServiceBatchInfo.SuggestionsEAddress}</p>");

            return html.ToString();
        }

        private string BuildServicingUnitsHtmlSection(AdmServiceBatchDataType item)
        {
            StringBuilder html = new StringBuilder();

            foreach (var unitContact in item.AdmServiceBatchInfo.ServicingUnitContactData)
            {
                var ekatte = unitContact.Address.EkatteAddress;
                string areaDisplay = !string.IsNullOrEmpty(ekatte.AreaName) ? $", р-н {ekatte.AreaName}" : string.Empty;
                string phoneDisplay = unitContact.CorrespondenceData.Phone != null && unitContact.CorrespondenceData.Phone.Any() ?
                    string.Join(",", unitContact.CorrespondenceData.Phone.Select(p => p.IncludesSettlementCallCodeSpecified && p.IncludesSettlementCallCode? $"({unitContact.CorrespondenceData.InterSettlementCallingCode}){p.PhoneNumber}" : p.PhoneNumber)) : null;

                string s = $"<strong><em>{unitContact.Name}</em></strong>" +
                    $"<ul><li>Адрес: обл. {ekatte.DistrictName}, общ. {ekatte.MunicipalityName}, гр. {ekatte.SettlementName}{areaDisplay}, {unitContact.Address.AddressText}, п.к. {unitContact.Address.PostCode}</li>" +
                    $"<li>Код за междуселищно избиране: {unitContact.CorrespondenceData.InterSettlementCallingCode}</li>" +
                    $"<li>Телефон за връзка: {phoneDisplay}</li>" +
                    $"<li>Работно време: {unitContact.WorkTime}</li></ul>";

                html.Append($"{s}<br />");
            }

            var sectionContent = $"<div id=\"collapsable-content-1\" class=\"collapse\"><div class=\"card-body card-page__body\">{html.ToString()}</div></div>";

            return $"{BuildSectionHeader("Административни звена, в които се подават документите и се получава информация за хода на преписката", 1)}{sectionContent}";
        }

        private string BuildStagesHtmlSection(AdmServiceBatchDataType item)
        {
            StringBuilder html = new StringBuilder();

            foreach (var stage in item.AdmServiceBatchInfo.Stages)
            {
                html.Append($"<strong>{stage.Name}</strong><div>{stage.Description.Value}</div><br />");
            }

            var sectionContent = $"<div id=\"collapsable-content-2\" class=\"collapse\"><div class=\"card-body card-page__body\">{html.ToString()}</div></div>";

            return $"{BuildSectionHeader("Изисквания, процедури, инструкции", 2)}{sectionContent}";
        }

        private string BuildModelDocumentsHtmlSection(IEnumerable<AdmServiceInfoDocumentType> docs)
        {
            StringBuilder html = new StringBuilder();

            foreach (var doc in docs)
            {
                var linkOrText = !string.IsNullOrEmpty(doc.DocumentDownloadUrl) ?
                    $"<a href=\"{doc.DocumentDownloadUrl}\" target=\"_blank\">{doc.Name}</a>" : doc.Name;

                html.Append($"<p><i class=\"ui-icon ui-icon-download-color mr-1\" aria-hidden=\"true\"></i>{linkOrText}</p>");
            }

            var sectionContent = $"<div id=\"collapsable-content-3\" class=\"collapse\"><div class=\"card-body card-page__body\">{html.ToString()}</div></div>";

            return $"{BuildSectionHeader("Образци", 3)}{sectionContent}";
        }

        private string BuildRegulatoryDocumentsHtmlSection(IEnumerable<AdmServiceInfoDocumentType> docs)
        {
            StringBuilder html = new StringBuilder();

            foreach (var doc in docs)
            {
                var linkOrText = !string.IsNullOrEmpty(doc.DocumentDownloadUrl) ?
                    $"<a href=\"{doc.DocumentDownloadUrl}\" target=\"_blank\">{doc.Name}</a>" : doc.Name;

                html.Append($"<p><i class=\"ui-icon ui-icon-book mr-1\" aria-hidden=\"true\"></i>{linkOrText}</p>");
            }

            var sectionContent = $"<div id=\"collapsable-content-4\" class=\"collapse\"><div class=\"card-body card-page__body\">{html.ToString()}</div></div>";

            return $"{BuildSectionHeader("Нормативна уредба", 4)}{sectionContent}";
        }

        private string BuildPaymentInfoHtmlSection(AdmServiceBatchDataType item)
        {
            var html = new StringBuilder();

            if (item.AdmServiceBatchInfo.PaymentInfo.Explanations != null)
            {
                if (item.AdmServiceBatchInfo.PaymentInfo.PaymentKind != PaymentKindsEnum.Free)
                {
                    html.Append("<p><strong>За услугата се заплаща такса</strong></p><br />");
                }                
                html.Append($"{item.AdmServiceBatchInfo.PaymentInfo.Explanations.Value}<br />");
            }

            if (item.AdmServiceBatchInfo.PaymentInfo.PaymentKind != PaymentKindsEnum.Free)
            {
                if (item.AdmServiceBatchInfo.PaymentInfo.PaymentMethods != null && item.AdmServiceBatchInfo.PaymentInfo.PaymentMethods.Any())
                {
                    html.Append($"<p><strong>Услугата може да бъде заплатена по един от следните начини:</strong></p>");

                    string payMthsString = string.Empty;
                    foreach (var pm in item.AdmServiceBatchInfo.PaymentInfo.PaymentMethods)
                    {
                        payMthsString += $"<li>{Resources.ResourceManager.GetString($"PaymentMethodsEnum_{pm}")}</li>";
                    }
                    html.Append($"<ul>{payMthsString}</ul>");
                }
            }            

            var sectionContent = $"<div id=\"collapsable-content-5\" class=\"collapse\"><div class=\"card-body card-page__body\">{html.ToString()}</div></div>";

            return $"{BuildSectionHeader("Заплащане", 5)}{sectionContent}";
        }

        private string BuildLegalBasisHtmlData(RegulatoryActLegalBasisType[] legalBasisCollection)
        {
            StringBuilder html = new StringBuilder();

            foreach (var legalBasis in legalBasisCollection)
            {
                string structuredDataHtml = string.Empty;
                if (legalBasis.StructuredData != null && legalBasis.StructuredData.Any())
                {
                    var structActItems = new List<string>();

                    foreach (var structActData in legalBasis.StructuredData)
                    {
                        structActItems.Add(DisplaySingleSgActData(structActData));
                    }

                    structuredDataHtml = $"- {string.Join("; ", structActItems.Where(sai => sai != null))}";
                }

                html.Append($"<li>{legalBasis.RegulatoryActName} {structuredDataHtml}</li>");
            }

            return $"<ul>{html.ToString()}</ul>";
        }

        public static string DisplaySingleSgActData(RegulatoryActStructuredDataType actData)
        {
            List<string> items = new List<string>();

            if (!string.IsNullOrEmpty(actData.Paragraph))
                items.Add(string.Format("§. {0}", actData.Paragraph));

            if (!string.IsNullOrEmpty(actData.Article))
                items.Add(string.Format("чл. {0}", actData.Article));

            if (!string.IsNullOrEmpty(actData.SubParagraph))
                items.Add(string.Format("ал. {0}", actData.SubParagraph));

            if (!string.IsNullOrEmpty(actData.Point))
                items.Add(string.Format("т. {0}", actData.Point));

            if (!string.IsNullOrEmpty(actData.Letter))
                items.Add(string.Format("б. {0}", actData.Letter));

            if (!string.IsNullOrEmpty(actData.Text))
                items.Add(string.Format("{0}", actData.Text));

            if (items.Count > 0)
                return string.Join(", ", items);

            return null;
        }

        public static string BuildSectionHeader(string headerText, int headerIndex)
        {
            var h2 = $"<h2 class=\"section-title section-title--page\">{headerText}</h2>";
            var button = $"<button class=\"system-button toggle-collapse\"><i class=\"ui-icon ui-icon-chevron-up\" aria-hidden=\"true\"></i></button>";

            return $"<div class=\"card-header card-page__header collapsed\" data-toggle=\"collapse\" data-target=\"#collapsable-content-{headerIndex}\" aria-expanded=\"false\">{h2}{button}</div>";
        }
    }
}
