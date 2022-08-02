using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Spreadsheet;
using EPZEU.Nomenclatures;
using Integration.EPZEU;
using Integration.EPZEU.Models;
using Integration.EPZEU.Models.SearchCriteria;
using System;
using System.Collections.Generic;
using System.Data;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace EPZEU.CR.Reports
{
    /// <summary>
    /// Интерфейс на услуга за статистически справки.
    /// </summary>
    public interface IStatisticReportService
    {
        Task<Stream> ExportAppliedServicesStatisticsAsync(BaseReportSearchCriteria criteria);

        Task<Stream> ExportMerchantStatisticsAsync(BaseReportSearchCriteria criteria);
    }

    /// <summary>
    /// Реализация на интерфейс IStatisticReportService за работа със статистически справки.
    /// </summary>
    internal class StatisticReportService : IStatisticReportService
    {
        #region Private members

        private IReportServiceClient _reportServiceClient = null;

        private readonly ILabels _labels = null;

        private readonly string _defaultLanguage = "bg";

        #endregion

        #region Constructor

        public StatisticReportService(IReportServiceClient reportServiceClient, ILabels labels)
        {
            _reportServiceClient = reportServiceClient;
            _labels = labels;
        }

        #endregion

        #region IStatisticReportService

        public async Task<Stream> ExportAppliedServicesStatisticsAsync(BaseReportSearchCriteria criteria)
        {
            if (!criteria.FromDate.HasValue || !criteria.ToDate.HasValue)
                throw new NotSupportedException("Invalid Input params");

            Stream buffer = null;
            var results = await _reportServiceClient.GetAppliedServicesStatisticsAsync(criteria);

            var titleLabels = PrepareTitleCellsAppliedServicesStatistics(criteria);
            DataTable dataTable = PrepareDataAppliedServicesStatistics(results);

            string[] mergeCells = null;

            if (results != null && results.Any())
                mergeCells = new string[] { "A1:G1", "A2:G2", "B3:C3", "D3:E3", "F3:G3" };
            else
                mergeCells = new string[] { "A1:G1", "A2:G2", "B3:C3", "D3:E3", "F3:G3", "A5:G5" };

            buffer = ExcelExportHelper.CreateExcel("Sheet1", titleLabels, dataTable, mergeCells);

            return buffer;
        }

        public async Task<Stream> ExportMerchantStatisticsAsync(BaseReportSearchCriteria criteria)
        {
            if (!criteria.FromDate.HasValue || !criteria.ToDate.HasValue)
                throw new NotSupportedException("Invalid Input params");

            Stream buffer = null;
            var results = await _reportServiceClient.GetMerchantStatisticsAsync(criteria);

            if (results != null && results.Any())
            {
                string[] legalFormAbbrs = results.Select(t => t.formAbbr).Distinct().OrderBy(s => s).ToArray();
                var newDataTable = PrepareDataMerchantStatistics(results.Where(t => t.DeedStatus == DeedStatuses.New), legalFormAbbrs, criteria);
                var reregisteredDataTable = PrepareDataMerchantStatistics(results.Where(t => t.DeedStatus == DeedStatuses.Existing), legalFormAbbrs, criteria);

                var titleLabels = PrepareTitleCellsMerchantStatistics(criteria, legalFormAbbrs);
                var subTitleLabels = PrepareSubTitleCellsMerchantStatistics(legalFormAbbrs);

                var lastColID = ExcelExportHelper.GetExcelColumnName(legalFormAbbrs.Length + 3);

                var mergeCells = new string[] {
                    string.Format("A1:{0}1", lastColID),
                    string.Format("A2:{0}2", lastColID),
                    string.Format("A4:{0}4", lastColID),
                    string.Format("A{0}:{1}{0}", titleLabels.Length + newDataTable.Rows.Count + 1, lastColID),
                    string.Format("A{0}:B{0}", titleLabels.Length + newDataTable.Rows.Count),
                    string.Format("A{0}:B{0}", titleLabels.Length + subTitleLabels.Length + newDataTable.Rows.Count + reregisteredDataTable.Rows.Count),
                };

                buffer = ExcelExportHelper.CreateExcel("Sheet1", titleLabels, newDataTable, mergeCells, subTitleLabels, reregisteredDataTable);
            }

            return buffer;
        }

        #endregion

        #region AppliedServicesStatistics

        private DataTable PrepareDataAppliedServicesStatistics(IEnumerable<AppliedServicesStatistics> results)
        {
            var dataTable = new DataTable("AppliedServices");

            dataTable.Columns.Add("Services", typeof(string));
            dataTable.Columns.Add("Total Count", typeof(int));
            dataTable.Columns.Add("Total Percent", typeof(float));

            dataTable.Columns.Add("Internet Count", typeof(int));
            dataTable.Columns.Add("Internet Peercent", typeof(float));

            dataTable.Columns.Add("Office Count", typeof(int));
            dataTable.Columns.Add("Office Percent", typeof(float));

            if (results != null && results.Any())
            {
                int totalInternetApplicationsCount = results.Select(i => i.InternetApplicationsCount.GetValueOrDefault()).Sum();
                int totalOfficeApplicationsCount = results.Select(i => i.OfficeApplicationsCount.GetValueOrDefault()).Sum();
                int totalCount = totalInternetApplicationsCount + totalOfficeApplicationsCount;

                foreach (var item in results)
                {
                    int rowTotal = item.InternetApplicationsCount.GetValueOrDefault() + item.OfficeApplicationsCount.GetValueOrDefault();
                    var dataRow = dataTable.NewRow();
                    var rowValues = new object[]
                    {
                        string.Format("{0} {1}",item.AppCode, item.AppDescription),
                        rowTotal,
                        Math.Round((((float)rowTotal * 100)/ (float)totalCount), 2, MidpointRounding.AwayFromZero),
                        item.InternetApplicationsCount.GetValueOrDefault(),
                        Math.Round((((float)item.InternetApplicationsCount.GetValueOrDefault() * 100) / (float)rowTotal), 2, MidpointRounding.AwayFromZero),
                        item.OfficeApplicationsCount.GetValueOrDefault(),
                        Math.Round((((float)item.OfficeApplicationsCount.GetValueOrDefault() * 100) / (float)rowTotal), 2, MidpointRounding.AwayFromZero)
                    };
                    dataRow.ItemArray = rowValues;

                    dataTable.Rows.Add(dataRow);
                }

                var totalDataRow = dataTable.NewRow();
                totalDataRow.ItemArray = new object[]
                {
                        _labels.GetLabel(_defaultLanguage,"GL_TOTAL_L"),
                        totalCount,
                        100,
                        totalInternetApplicationsCount,
                        ((float)totalInternetApplicationsCount * 100) /totalCount,
                        totalOfficeApplicationsCount,
                        ((float)totalOfficeApplicationsCount * 100) / totalCount
                };
                dataTable.Rows.Add(totalDataRow);
            }
            else
            {
                var totalDataRow = dataTable.NewRow();
                totalDataRow.ItemArray = new object[]
                {
                        _labels.GetLabel(_defaultLanguage,"GL_NO_DATA_FOUND_L"),
                        null,
                        null,
                        null,
                        null,
                        null,
                        null
                };
                dataTable.Rows.Add(totalDataRow);
            }


            return dataTable;
        }

        private string[][] PrepareTitleCellsAppliedServicesStatistics(BaseReportSearchCriteria criteria)
        {
            string[][] labels = new string[][]
            {
                new string[] { _labels.GetLabel(_defaultLanguage, "EP_STATISTICS_COUNT_APLICATION_L"), "", "", "", "", "", ""},

                new string[] { _labels.GetLabel(_defaultLanguage, "EP_STATISTICS_PERIOD_L").Replace("{dateFrom}", criteria.FromDate?.ToString("dd.MM.yyyy")).Replace("{dateTo}", criteria.ToDate?.ToString("dd.MM.yyyy")), "", "", "", "", "", ""},

                new string[] { _labels.GetLabel(_defaultLanguage, "GL_APPLICATION_L"),
                    _labels.GetLabel(_defaultLanguage, "EP_STATISTICS_CONT_APPLICATIONS_L"),
                    "",
                    _labels.GetLabel(_defaultLanguage, "EP_STATISTICS_CONT_APPLICATIONS_INTERNET_L"),
                    "",
                    _labels.GetLabel(_defaultLanguage, "EP_STATISTICS_CONT_APPLICATIONS_COUNTER_L"), ""},

                new string[] { "",
                    _labels.GetLabel(_defaultLanguage, "GL_QUANTITY_L"),
                    _labels.GetLabel(_defaultLanguage, "GL_PERCENT_L"),
                    _labels.GetLabel(_defaultLanguage, "GL_QUANTITY_L"),
                    _labels.GetLabel(_defaultLanguage, "GL_PERCENT_L"),
                    _labels.GetLabel(_defaultLanguage, "GL_QUANTITY_L"),
                    _labels.GetLabel(_defaultLanguage, "GL_PERCENT_L"), }
            };

            return labels;
        }

        #endregion

        #region MerchantStatistics

        private DataTable PrepareDataMerchantStatistics(IEnumerable<MerchantStatistics> results, string[] legalFormAbbrs, BaseReportSearchCriteria criteria)
        {
            int fromYear = criteria.FromDate.GetValueOrDefault().Year;
            int toYear = criteria.ToDate.GetValueOrDefault().Year;
            int fromMonth = criteria.FromDate.GetValueOrDefault().Month;
            int toMonth = criteria.ToDate.GetValueOrDefault().Month;

            var dataTable = new DataTable("Merchant");

            //Добавяме колоните на таблицата
            for (int i = 0; i < legalFormAbbrs.Length + 3; i++)
            {
                if (i == 0)
                    dataTable.Columns.Add("Year", typeof(string));
                else if (i == 1)
                    dataTable.Columns.Add("Month", typeof(string));
                else if (i == legalFormAbbrs.Length + 2)
                    dataTable.Columns.Add("Total", typeof(int));
                else
                    dataTable.Columns.Add(legalFormAbbrs[i - 2] + i, typeof(int));
            }

            int[] colTotals = new int[legalFormAbbrs.Length];

            int total = 0;
            for (int month = fromMonth; month <= toMonth + ((toYear - fromYear) * 12); month++)
            {
                int year = fromYear + ((month - 1) / 12);

                int rowTotal = 0;
                var dataRow = dataTable.NewRow();
                var rowValues = new List<object>();
                rowValues.Add(year);
                rowValues.Add(GetMonth(month % 12));

                var shiftedMonth = month % 12 == 0 ? 12 : month % 12;

                int lfIdx = 0;
                foreach (var legalForm in legalFormAbbrs)
                {
                    int legalFormCnt = results.SingleOrDefault(t => t.formAbbr == legalForm && t.Year == year && t.Month == shiftedMonth)?.Count ?? 0;
                    rowValues.Add(legalFormCnt);
                    colTotals[lfIdx] += legalFormCnt;
                    rowTotal += legalFormCnt;
                    lfIdx++;
                }
                rowValues.Add(rowTotal);
                total += rowTotal;

                dataRow.ItemArray = rowValues.ToArray();
                dataTable.Rows.Add(dataRow);
            }

            var totalRowValues = new List<object>();
            totalRowValues.Add(_labels.GetLabel(_defaultLanguage, "GL_TOTAL_L"));
            totalRowValues.Add("");
            foreach (var colTotal in colTotals)
            {
                totalRowValues.Add(colTotal);
            }
            totalRowValues.Add(total);

            var totalDataRow = dataTable.NewRow();
            totalDataRow.ItemArray = totalRowValues.ToArray();
            dataTable.Rows.Add(totalDataRow);

            return dataTable;
        }

        private string GetMonth(int id)
        {
            string resource = "";
            switch (id)
            {
                case (1):
                    resource = _labels.GetLabel(_defaultLanguage, "GL_MONTH_JANUARY_L"); // "Януари";
                    break;
                case (2):
                    resource = _labels.GetLabel(_defaultLanguage, "GL_MONTH_FEBRUARY_L"); // "Февруари";
                    break;
                case (3):
                    resource = _labels.GetLabel(_defaultLanguage, "GL_MONTH_MARCH_L"); // "Март";
                    break;
                case (4):
                    resource = _labels.GetLabel(_defaultLanguage, "GL_MONTH_APRIL_L"); // "Април";
                    break;
                case (5):
                    resource = _labels.GetLabel(_defaultLanguage, "GL_MONTH_MAY_L"); // "Май";
                    break;
                case (6):
                    resource = _labels.GetLabel(_defaultLanguage, "GL_MONTH_JUNE_L"); // "Юни";
                    break;
                case (7):
                    resource = _labels.GetLabel(_defaultLanguage, "GL_MONTH_JULY_L"); // "Юли";
                    break;
                case (8):
                    resource = _labels.GetLabel(_defaultLanguage, "GL_MONTH_AUGUST_L"); // "Август";
                    break;
                case (9):
                    resource = _labels.GetLabel(_defaultLanguage, "GL_MONTH_SEPTEMBER_L"); // "Септември";
                    break;
                case (10):
                    resource = _labels.GetLabel(_defaultLanguage, "GL_MONTH_OCTOBER_L"); // "Октомври";
                    break;
                case (11):
                    resource = _labels.GetLabel(_defaultLanguage, "GL_MONTH_NOVEMBER_L"); // "Ноември";
                    break;
                case (0):
                    resource = _labels.GetLabel(_defaultLanguage, "GL_MONTH_DECEMBER_L"); // "Декември";
                    break;
            }
            return resource;
        }

        private string[][] PrepareTitleCellsMerchantStatistics(BaseReportSearchCriteria criteria, string[] legalFormAbbrs)
        {
            string[] row1 = new string[legalFormAbbrs.Length + 3];
            string[] row2 = new string[legalFormAbbrs.Length + 3];
            string[] row3 = new string[legalFormAbbrs.Length + 3];
            string[] row4 = new string[legalFormAbbrs.Length + 3];

            for (int i = 0; i < legalFormAbbrs.Length + 3; i++)
            {
                row1[i] = "";
                row2[i] = "";
                row4[i] = "";

                if (i == 0)
                    row3[i] = _labels.GetLabel(_defaultLanguage, "GL_YEAR_L");
                else if (i == 1)
                    row3[i] = _labels.GetLabel(_defaultLanguage, "GL_MONTH_L");
                else if (i == (legalFormAbbrs.Length + 2))
                    row3[i] = _labels.GetLabel(_defaultLanguage, "GL_TOTAL_L");
                else
                    row3[i] = legalFormAbbrs[i - 2];
            }

            row1[0] = _labels.GetLabel(_defaultLanguage, "EP_STATISTICS_COUNT_REGISTR_BATCH_L");
            row2[0] = _labels.GetLabel(_defaultLanguage, "EP_STATISTICS_PERIOD_L").Replace("{dateFrom}", criteria.FromDate?.ToString("dd.MM.yyyy")).Replace("{dateTo}", criteria.ToDate?.ToString("dd.MM.yyyy"));
            row4[0] = _labels.GetLabel(_defaultLanguage, "CR_GL_NEW_REGISTER_COMPANY_L"); //"Новорегистрирани"

            string[][] labels = new string[][] { row1, row2, row3, row4 };

            return labels;
        }

        private string[][] PrepareSubTitleCellsMerchantStatistics(string[] legalFormAbbrs)
        {
            string[] row1 = new string[legalFormAbbrs.Length + 3];

            for (int i = 0; i < legalFormAbbrs.Length + 3; i++)
            {
                if (i == 0)
                    row1[i] = _labels.GetLabel(_defaultLanguage, "CR_GL_RE_REGISTER_COMPANY_L"); //"Пререгистрирани"
                else
                    row1[i] = "";
            }

            string[][] labels = new string[][] { row1 };

            return labels;
        }

        #endregion
    }

    /// <summary>
    /// Клас с операции за създаване на Excel file
    /// </summary>
    public class ExcelExportHelper
    {
        #region private fields

        private static Type[] numericTypes = new Type[] { typeof(int), typeof(long), typeof(Int16), typeof(Int32), typeof(Int64), typeof(short) };
        private static Type[] floatNumericTypes = new Type[] { typeof(double), typeof(decimal), typeof(float) };

        #endregion

        #region Public Methods

        /// <summary>
        /// Операция за създаване на Excel file.
        /// </summary>
        /// <param name="sheetName"></param>
        /// <param name="titleLabels"></param>
        /// <param name="data"></param>
        /// <param name="mergeCells"></param>
        /// <returns></returns>
        public static Stream CreateExcel(string sheetName, string[][] titleLabels, DataTable data, string[] mergeCells)
        {
            var tables = new List<Tuple<string[][], DataTable>>()
            {
                new Tuple<string[][], DataTable>(titleLabels, data)
            };
            return CreateExcel(sheetName, tables, mergeCells);
        }

        /// <summary>
        /// Операция за създаване на Excel file.
        /// </summary>
        /// <param name="sheetName"></param>
        /// <param name="titleLabels"></param>
        /// <param name="data"></param>
        /// <param name="mergeCells"></param>
        /// <param name="subtitleLabels"></param>
        /// <param name="subData"></param>
        /// <returns></returns>
        public static Stream CreateExcel(string sheetName, string[][] titleLabels, DataTable data, string[] mergeCells, string[][] subtitleLabels = null, DataTable subData = null)
        {
            var tables = new List<Tuple<string[][], DataTable>>()
            {
                new Tuple<string[][], DataTable>(titleLabels, data),
                new Tuple<string[][], DataTable>(subtitleLabels, subData)
            };
            return CreateExcel(sheetName, tables, mergeCells);
        }

        /// <summary>
        /// Операция за създаване на Excel file.
        /// </summary>
        /// <param name="sheetName"></param>
        /// <param name="tables"></param>
        /// <param name="mergeCells"></param>
        /// <returns></returns>
        public static Stream CreateExcel(string sheetName, List<Tuple<string[][], DataTable>> tables, string[] mergeCells)
        {
            var ms = new MemoryStream();

            using (SpreadsheetDocument xl = SpreadsheetDocument.Create(ms, SpreadsheetDocumentType.Workbook, true))
            {
                Worksheet worksheet = null;
                var sheetData = InitSheet(xl, sheetName, out worksheet);

                foreach (var table in tables)
                {
                    AppendTitleColsToSheet(sheetData, table.Item1);

                    AppendDataRowsToSheet(sheetData, table.Item2);
                }

                MergeCellsToSheet(sheetData, worksheet, mergeCells);
            }
            ms.Seek(0, SeekOrigin.Begin);

            return ms;
        }

        /// <summary>
        /// Операция за взимане на име на колони
        /// </summary>
        /// <param name="columnNumber"></param>
        /// <returns></returns>
        public static string GetExcelColumnName(int columnNumber)
        {
            int dividend = columnNumber;
            string columnName = String.Empty;
            int modulo;

            while (dividend > 0)
            {
                modulo = (dividend - 1) % 26;
                columnName = Convert.ToChar(65 + modulo).ToString() + columnName;
                dividend = (int)((dividend - modulo) / 26);
            }

            return columnName;
        }

        #endregion

        #region Main Actions

        private static SheetData InitSheet(SpreadsheetDocument xl, string sheetName, out Worksheet worksheet)
        {
            var workbookPart = xl.AddWorkbookPart();

            xl.WorkbookPart.Workbook = new Workbook();
            xl.WorkbookPart.Workbook.Sheets = new Sheets();
            var wsPart = xl.WorkbookPart.AddNewPart<WorksheetPart>();
            worksheet = wsPart.Worksheet = new Worksheet();

            SheetFormatProperties sheetFormatProperties = new SheetFormatProperties()
            {
                DefaultColumnWidth = 20,
                DefaultRowHeight = 15D
            };

            wsPart.Worksheet.Append(sheetFormatProperties);

            var stylesPart = xl.WorkbookPart.AddNewPart<WorkbookStylesPart>();
            stylesPart.Stylesheet = CreateExcelStyles();
            stylesPart.Stylesheet.Save();

            var sheetData = wsPart.Worksheet.AppendChild(new SheetData());
            Sheets sheets = xl.WorkbookPart.Workbook.GetFirstChild<Sheets>();
            string relationshipId = xl.WorkbookPart.GetIdOfPart(wsPart);
            Sheet sheet = new Sheet() { Id = relationshipId, SheetId = 1, Name = sheetName };
            sheets.Append(sheet);

            return sheetData;
        }

        private static void AppendTitleColsToSheet(SheetData sheetData, string[][] labels)
        {
            if (labels != null && labels.Length > 0)
            {
                for (int rowID = 0; rowID < labels.Length; rowID++)
                {
                    Row row = new Row();
                    if (labels[rowID] != null && labels[rowID].Length > 0)
                    {
                        for (int colID = 0; colID < labels[rowID].Length; colID++)
                        {
                            ExcelExportHelper.AddTitleCellsToRow(row, labels[rowID][colID]);
                        }
                    }

                    sheetData.AppendChild(row);
                }
            }
        }

        private static void AddTitleCellsToRow(Row row, string text, string cellReference = null)
        {
            row.AppendChild(new Cell() { DataType = CellValues.String, CellValue = new CellValue(text), StyleIndex = 8 });
        }

        private static void MergeCellsToSheet(SheetData sheetData, Worksheet worksheet, string[] cellIDRanges)
        {
            if (cellIDRanges != null && cellIDRanges.Length > 0)
            {
                MergeCells mergeCells = new MergeCells();
                for (int rowID = 0; rowID < cellIDRanges.Length; rowID++)
                {
                    mergeCells.Append(new MergeCell() { Reference = new StringValue(cellIDRanges[rowID]) });
                }
                worksheet.InsertAfter(mergeCells, sheetData);
            }
        }

        private static void AppendDataRowsToSheet(SheetData sheetData, DataTable data)
        {
            //Data
            foreach (DataRow row in data.Rows)
            {
                Row newDataRow = new Row();
                for (var i = 0; i < row.ItemArray.Length; i++)
                {
                    AddDataCellToRow(newDataRow, row.ItemArray[i], data.Columns[i].DataType);
                }

                sheetData.AppendChild(newDataRow);
            }
        }

        #endregion

        #region Helpers

        private static void AddDataCellToRow(Row row, object cellValue, Type valueType)
        {
            row.AppendChild(valueType == typeof(DateTime) ? CreateDateDataCell(cellValue, valueType) : CreateDataCell(cellValue, valueType));
        }

        private static Cell CreateDataCell(object cellValue, Type valueType)
        {
            var dataCell = new Cell()
            {
                DataType = floatNumericTypes.Contains(valueType) || numericTypes.Contains(valueType) ? CellValues.Number : CellValues.String,
                CellValue = new CellValue(cellValue == DBNull.Value ? "" : Convert.ToString(cellValue, CultureInfo.InvariantCulture)),
                StyleIndex = GetCellStyleIndexByDataType(valueType)
            };

            return dataCell;
        }

        private static UInt32Value GetCellStyleIndexByDataType(Type cellDataType)
        {
            if (numericTypes.Contains(cellDataType))
            {
                return UInt32Value.FromUInt32(7);
            }
            else if (floatNumericTypes.Contains(cellDataType))
            {
                return UInt32Value.FromUInt32(3);
            }
            else if (cellDataType == typeof(DateTime))
            {
                return UInt32Value.FromUInt32(1);
            }
            else
            {
                return UInt32Value.FromUInt32(4);
            }
        }

        private static Cell CreateDateDataCell(object cellValue, Type valueType)
        {
            var dataCell = new Cell()
            {
                StyleIndex = 5,
                DataType = CellValues.Date,
                CellValue = new CellValue(cellValue == DBNull.Value ? "" : ((DateTime)cellValue).ToString("dd.MM.yyyy HH:mm:ss.fff"))
            };

            return dataCell;
        }

        private static Stylesheet CreateExcelStyles()
        {
            Stylesheet ss = new Stylesheet();
            CellFormat cf = new CellFormat();
            uint iExcelIndex = 164;

            #region Fonts

            var Fonts = new Fonts();
            Fonts.AppendChild(new Font()); // required, reserved by Excel
            Fonts.AppendChild(new Font() { Color = new Color() { Rgb = HexBinaryValue.FromString("#000000") }, Bold = new Bold() { Val = true } });
            Fonts.Count = UInt32Value.FromUInt32((uint)Fonts.ChildElements.Count);

            #endregion

            #region Fills

            var Fills = new Fills();
            Fills.AppendChild(new Fill() { PatternFill = new PatternFill { PatternType = PatternValues.None } }); // required, reserved by Excel
            Fills.AppendChild(new Fill() { PatternFill = new PatternFill { PatternType = PatternValues.Gray125 } }); // required, reserved by Excel

            var headerCellFill = new PatternFill() { PatternType = PatternValues.Solid };
            headerCellFill.ForegroundColor = new ForegroundColor() { Rgb = HexBinaryValue.FromString("FDE4B8") };
            headerCellFill.BackgroundColor = new BackgroundColor { Indexed = 64 };

            Fills.AppendChild(new Fill { PatternFill = headerCellFill });
            Fills.Count = UInt32Value.FromUInt32((uint)Fills.ChildElements.Count);

            #endregion

            #region Borders

            var Borders = new Borders();
            Borders.AppendChild(new Border()); // required, reserved by Excel
            Borders.AppendChild(new Border()
            {
                BottomBorder = new BottomBorder() { Color = new Color() { Rgb = HexBinaryValue.FromString("#000000") }, Style = BorderStyleValues.Medium },
                TopBorder = new TopBorder() { Color = new Color() { Rgb = HexBinaryValue.FromString("#000000") }, Style = BorderStyleValues.Medium },
                LeftBorder = new LeftBorder() { Color = new Color() { Rgb = HexBinaryValue.FromString("#000000") }, Style = BorderStyleValues.Medium },
                RightBorder = new RightBorder() { Color = new Color() { Rgb = HexBinaryValue.FromString("#000000") }, Style = BorderStyleValues.Medium },
            });
            Borders.Count = UInt32Value.FromUInt32((uint)Borders.ChildElements.Count);

            #endregion

            #region CellStyleFormats

            CellStyleFormats csfs = new CellStyleFormats();

            cf.NumberFormatId = 0;
            cf.FontId = 0;
            cf.FillId = 0;
            cf.BorderId = 0;
            csfs.Append(cf);
            csfs.Count = UInt32Value.FromUInt32((uint)csfs.ChildElements.Count);

            #endregion

            #region NumberFormats and CellFormats

            NumberingFormats nfs = new NumberingFormats();
            CellFormats cfs = new CellFormats();

            cf = new CellFormat();
            cf.NumberFormatId = 0;
            cf.FontId = 0;
            cf.FillId = 0;
            cf.BorderId = 0;
            cf.FormatId = 0;
            cfs.AppendChild(cf);

            NumberingFormat nfDateTime = new NumberingFormat();
            nfDateTime.NumberFormatId = UInt32Value.FromUInt32(iExcelIndex++);
            nfDateTime.FormatCode = StringValue.FromString("dd/mm/yyyy hh:mm:ss");
            nfs.AppendChild(nfDateTime);

            NumberingFormat nf4decimal = new NumberingFormat();
            nf4decimal.NumberFormatId = UInt32Value.FromUInt32(iExcelIndex++);
            nf4decimal.FormatCode = StringValue.FromString("#,##0.0000");
            nfs.AppendChild(nf4decimal);

            // #,##0.00 is also Excel style index 4
            NumberingFormat nf2decimal = new NumberingFormat();
            nf2decimal.NumberFormatId = UInt32Value.FromUInt32(iExcelIndex++);
            nf2decimal.FormatCode = StringValue.FromString("#,##0.00");
            nfs.AppendChild(nf2decimal);

            // @ is also Excel style index 49
            NumberingFormat nfForcedText = new NumberingFormat();
            nfForcedText.NumberFormatId = UInt32Value.FromUInt32(iExcelIndex++);
            nfForcedText.FormatCode = StringValue.FromString("@");
            nfs.AppendChild(nfForcedText);

            NumberingFormat nfHoleNumber = new NumberingFormat();
            nfHoleNumber.NumberFormatId = UInt32Value.FromUInt32(iExcelIndex++);
            nfHoleNumber.FormatCode = StringValue.FromString("0");
            nfs.AppendChild(nfHoleNumber);

            // index 1
            cf = new CellFormat();
            cf.NumberFormatId = nfDateTime.NumberFormatId;
            cf.FontId = 0;
            cf.FillId = 0;
            cf.BorderId = 1;
            cf.FormatId = 0;
            cf.ApplyNumberFormat = BooleanValue.FromBoolean(true);
            cfs.AppendChild(cf);

            // index 2
            cf = new CellFormat();
            cf.NumberFormatId = nf4decimal.NumberFormatId;
            cf.FontId = 0;
            cf.FillId = 0;
            cf.BorderId = 1;
            cf.FormatId = 0;
            cf.ApplyNumberFormat = BooleanValue.FromBoolean(true);
            cfs.AppendChild(cf);

            // index 3
            cf = new CellFormat();
            cf.NumberFormatId = nf2decimal.NumberFormatId;
            cf.FontId = 0;
            cf.FillId = 0;
            cf.BorderId = 1;
            cf.FormatId = 0;
            cf.ApplyNumberFormat = BooleanValue.FromBoolean(true);
            cf.Alignment = new Alignment() { Horizontal = HorizontalAlignmentValues.Right };
            cf.ApplyNumberFormat = BooleanValue.FromBoolean(true);
            cfs.AppendChild(cf);

            // index 4
            cf = new CellFormat();
            cf.NumberFormatId = nfForcedText.NumberFormatId;
            cf.FontId = 0;
            cf.FillId = 0;
            cf.BorderId = 1;
            cf.FormatId = 0;
            cf.ApplyNumberFormat = BooleanValue.FromBoolean(true);
            cfs.AppendChild(cf);

            // index 5
            cf = new CellFormat();
            cf.NumberFormatId = nfForcedText.NumberFormatId;
            cf.FontId = 0;
            cf.FillId = 0;
            cf.BorderId = 1;
            cf.FormatId = 0;
            cf.ApplyNumberFormat = BooleanValue.FromBoolean(true);
            cf.Alignment = new Alignment() { Horizontal = HorizontalAlignmentValues.Right };
            cf.ApplyAlignment = BooleanValue.FromBoolean(true);
            cfs.AppendChild(cf);

            // index 6
            cf = new CellFormat();
            cf.NumberFormatId = nf2decimal.NumberFormatId;
            cf.FontId = 0;
            cf.FillId = 0;
            cf.BorderId = 1;
            cf.FormatId = 0;
            cf.ApplyNumberFormat = BooleanValue.FromBoolean(true);
            cfs.AppendChild(cf);

            // index 7
            cf = new CellFormat();
            cf.NumberFormatId = nfHoleNumber.NumberFormatId;
            cf.FontId = 0;
            cf.FillId = 0;
            cf.BorderId = 1;
            cf.FormatId = 0;
            cf.ApplyNumberFormat = BooleanValue.FromBoolean(true);
            cf.Alignment = new Alignment() { Horizontal = HorizontalAlignmentValues.Right };
            cf.ApplyAlignment = BooleanValue.FromBoolean(true);
            cfs.AppendChild(cf);

            // index 8
            // Header column
            cf = new CellFormat();
            cf.NumberFormatId = nfForcedText.NumberFormatId;
            cf.FontId = 1;
            cf.FillId = 2;
            cf.BorderId = 1;
            cf.FormatId = 0;
            cf.Alignment = new Alignment() { Horizontal = HorizontalAlignmentValues.Center };
            cf.ApplyNumberFormat = BooleanValue.FromBoolean(true);
            cfs.AppendChild(cf);

            nfs.Count = UInt32Value.FromUInt32((uint)nfs.ChildElements.Count);
            cfs.Count = UInt32Value.FromUInt32((uint)cfs.ChildElements.Count);

            #endregion

            ss.AppendChild(nfs);
            ss.AppendChild(Fonts);
            ss.AppendChild(Fills);
            ss.AppendChild(Borders);
            ss.AppendChild(csfs);
            ss.AppendChild(cfs);

            return ss;
        }

        #endregion
    }
}