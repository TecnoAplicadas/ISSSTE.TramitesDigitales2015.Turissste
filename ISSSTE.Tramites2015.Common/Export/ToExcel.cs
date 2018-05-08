using System;
using System.Linq;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Drawing;
using OfficeOpenXml;

namespace ISSSTE.Tramites2015.Common.Export
{
    /// <summary>
    /// 
    /// </summary>
    public class ToExcel
    {
        static int i = 0;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="dataSet"></param>
        /// <param name="fileName"></param>
        public static void ExportToExcel(DataSet dataSet, string fileName)
        {
            try
            {
                FileInfo fileInfo = new FileInfo(fileName);

                using (ExcelPackage xlPackage = new ExcelPackage(fileInfo))
                {
                    //Do the export stuff here..
                    int i = 0;
                    foreach (DataTable dataTable in dataSet.Tables)
                    {
                        i++;

                        string sheetname = null == dataTable.TableName || dataTable.TableName.Equals(string.Empty) ? "Sheet" + i.ToString() : dataTable.TableName;

                        AddSheetsToWorkBookFromDataTable(xlPackage, dataTable, sheetname);

                    }
                    xlPackage.Save();

                    i = 0;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            // i = 0;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="excelRange"></param>
        /// <param name="dataColumn"></param>
        public static void ApplyFormattingToARangeByDataType(ExcelRange excelRange, DataColumn dataColumn)
        {

            if (IsDate(dataColumn))
            {
                excelRange.Style.Numberformat.Format = @"dd/mm/yyyy hh:mm:ss AM/PM";
            }
            else if (IsInteger(dataColumn))
            {
                //Do Nothing
            }
            else if (IsNumeric(dataColumn))
            {
                excelRange.Style.Numberformat.Format = @"#.##";
            }

            excelRange.AutoFitColumns();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="excelPackage"></param>
        /// <param name="dataTable"></param>
        /// <param name="sheetName"></param>
        public static void AddSheetsToWorkBookFromDataTable(ExcelPackage excelPackage, DataTable dataTable, string sheetName)
        {
            try
            {
                ExcelWorksheet oWs = excelPackage.Workbook.Worksheets.Add(null == dataTable.TableName || dataTable.TableName.Equals(string.Empty) ? "Sheet" + i.ToString() : dataTable.TableName);
                oWs.Cells.Style.Font.Name = "Calibiri";
                oWs.Cells.Style.Font.Size = 10;

                int ColCnt = dataTable.Columns.Count, RowCnt = dataTable.Rows.Count;

                //Export each row..
                oWs.Cells["A1"].LoadFromDataTable(dataTable, true);
                //Format the header
                using (ExcelRange oRange = oWs.Cells["A1:" + GetColumnAlphabetFromNumber(ColCnt) + "1"])
                {
                    oRange.Style.Font.Bold = true;
                    oRange.Style.Fill.PatternType = OfficeOpenXml.Style.ExcelFillStyle.Solid;
                    oRange.Style.Fill.BackgroundColor.SetColor(Color.FromArgb(79, 129, 189));
                }

                int CurrentColCount = 1;

                foreach (DataColumn oDC in dataTable.Columns)
                {
                    using (ExcelRange oRange = oWs.Cells[GetColumnAlphabetFromNumber(CurrentColCount) + "1:" + GetColumnAlphabetFromNumber(CurrentColCount) + RowCnt.ToString()])
                    {
                        ApplyFormattingToARangeByDataType(oRange, oDC);
                    }

                    CurrentColCount++;
                }
            }

            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="dataColumn"></param>
        /// <returns></returns>
        public static bool IsInteger(DataColumn dataColumn)
        {
            if (dataColumn == null)
                return false;

            var numericTypes = new[] { typeof(Byte),
                                                typeof(Int16), typeof(Int32), typeof(Int64), typeof(SByte),
                                                 typeof(UInt16), typeof(UInt32), typeof(UInt64)};
            return numericTypes.Contains(dataColumn.DataType);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="dataColumn"></param>
        /// <returns></returns>
        public static bool IsNumeric(DataColumn dataColumn)
        {
            if (dataColumn == null)
                return false;
            var numericTypes = new[] {  typeof(Decimal), typeof(Double),
                                                typeof(Single)};
            return numericTypes.Contains(dataColumn.DataType);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="dataColumn"></param>
        /// <returns></returns>
        public static bool IsDate(DataColumn dataColumn)
        {
            if (dataColumn == null)
                return false;
            var numericTypes = new[] { typeof(DateTime), typeof(TimeSpan) };
            return numericTypes.Contains(dataColumn.DataType);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="columnCount"></param>
        /// <returns></returns>
        public static string GetColumnAlphabetFromNumber(int columnCount)
        {
            string strColAlpha = string.Empty;

            try
            {
                int iloop = columnCount, icount1 = 0, icount2 = 0;
                Char chr = ' ';

                while (iloop > 676)
                {
                    iloop -= 676;
                    icount1++;
                }

                if (icount1 != 0)
                {
                    chr = (Char)(64 + icount1);
                    strColAlpha = chr.ToString();
                }
                while (iloop > 26)
                {
                    iloop -= 26;
                    icount2++;
                }
                if (icount2 != 0)
                {
                    chr = (Char)(64 + icount2);
                    strColAlpha = strColAlpha + chr.ToString();
                }
                chr = (Char)(64 + iloop);
                strColAlpha = strColAlpha + chr.ToString();
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return strColAlpha;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="sqlDataReader"></param>
        /// <param name="fileName"></param>
        public static void ExportToExcel(SqlDataReader sqlDataReader, string fileName)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="dataTable"></param>
        /// <param name="fileName"></param>
        public static MemoryStream ExportToExcel(DataTable dataTable, string fileName)
        {
            MemoryStream memoryStream = null;

            try
            {
                FileInfo newFile = new FileInfo(fileName);

                using (ExcelPackage xlPackage = new ExcelPackage(newFile))
                {
                    //Do the export stuff here..
                    string sheetname = null == dataTable.TableName || dataTable.TableName.Equals(string.Empty) ? "Sheet1" : dataTable.TableName;
                    AddSheetsToWorkBookFromDataTable(xlPackage, dataTable, sheetname);
                    xlPackage.Save();

                    memoryStream = new MemoryStream(xlPackage.GetAsByteArray());
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return memoryStream;
        }
    }
}