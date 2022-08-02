using EPZEU.DocumentTemplates.Models;
using EPZEU.Web.Api.Code;
using iTextSharp.text;
using iTextSharp.text.html.simpleparser;
using iTextSharp.text.pdf;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Text.RegularExpressions;

namespace EPZEU.Web.Api.Controllers.Private
{
    /// <summary>
    /// Контролер реализиращ уеб услуга за работа със шаблони на документи.
    /// </summary>
    [Authorize]
    public class DocumentTemplatesController : BaseApiController
    {
        private readonly static Lazy<Regex> _inputRegex = new Lazy<Regex>(() => new Regex("<input size=40 type=.*? id=.*? class=.*? value=\".*?\" />"), true);
        private readonly static Lazy<Regex> _prepareInputRegex = new Lazy<Regex>(() => new Regex("<input size=40 type=.*? id=.*? class=.*? value=\"(.*?)\" />"), true);


        /// <summary>
        /// Операция за създаване на документ на базата на шаблон.
        /// </summary>
        /// <param name="request">Заявка за създаване на документ.</param>
        /// /// <param name="unicodeFontProvider">Unicode доставчик на шрифтове.</param>
        /// <returns>Файл на създадения документа.</returns>
        [Route("CreateDocument")]
        [HttpPost]
        [ProducesResponseType(typeof(FileResult), StatusCodes.Status200OK)]
        public IActionResult CreateDocument([FromBody]CreateDocumentRequest request, UnicodeFontProvider unicodeFontProvider)
        {
            var htmlContent = PrepareHtmlContent(request);
            var stream = PdfSharpConvert(htmlContent, unicodeFontProvider);
            return File(stream, "application/pdf", string.Format("{0}.pdf", request.FileName));
        }

        #region Helpers

        private static Stream PdfSharpConvert(string html, UnicodeFontProvider unicodeFontProvider)
        {
            MemoryStream ms = new MemoryStream();
            var pdfDoc = new Document(PageSize.A4);
            PdfWriter.GetInstance(pdfDoc, ms);
            pdfDoc.Open();

            PdfPCell pdfCell = new PdfPCell
            {
                Border = 0,
                RunDirection = PdfWriter.RUN_DIRECTION_LTR
            };

            var styles = new StyleSheet();

            var props = new Hashtable {
                {"font_factory", unicodeFontProvider } // Always use Unicode fonts!
            };

            using (var reader = new StringReader(html))
            {
                var parsedHtmlElements = HtmlWorker.ParseToList(reader, styles, props);

                foreach (IElement htmlElement in parsedHtmlElements)
                {
                    pdfCell.AddElement(htmlElement);
                }
            }

            var table = new PdfPTable(1);
            table.AddCell(pdfCell);
            pdfDoc.Add(table);
            pdfDoc.Close();

            ms.Position = 0;

            return ms;
        }

        private string PrepareHtmlContent(CreateDocumentRequest request)
        {
            var htmlContent = request.HtmlTemplateContent;
            var inputs = GetInputs(htmlContent);

            foreach (var input in inputs)
            {
                htmlContent = PrepareInputValue(htmlContent, input);
            }

            htmlContent = string.Format("<div>{0}</div>", htmlContent);

            return htmlContent;
        }

        private List<string> GetInputs(string htmlContent)
        {
            var result = new List<string>();

            var match = _inputRegex.Value.Match(htmlContent);

            while (match != null && match.Success)
            {
                result.Add(match.Groups[0].Value);

                match = match.NextMatch();
            }

            return result;
        }

        private string PrepareInputValue(string htmlContent, string input)
        {
            var match = _prepareInputRegex.Value.Match(htmlContent);

            if (match.Success)
            {
                var inputValue = match.Groups[1].Value;

                return htmlContent.Replace(input, inputValue);
            }

            return htmlContent;
        }
        #endregion
    }
}