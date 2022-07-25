/*https://youtu.be/HwnHgEoiZzE => Export file*/
import React from "react";
import * as FileSaver from "file-saver"; //npm install xlsx file-saver --save
import * as XLSX from "xlsx";
// import * as Style from "xlsx-style";
import logo from "../img/file-download.png";

export const ExportCSV = ({ csvData, fileName }) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = (csvData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };

    ws["A1"].s = {
      fill: {
        sz: 24,
        bold: true,
        color: { rgb: "FFAA00" },
      },
    };

    // https://www.npmjs.com/package/xlsx#workbook-file-properties => sets the document company property
    if (!wb.Props) wb.Props = {};
    wb.Props.Company = "Bilav Information Services LLP";

    // company name is displayed in the row after all the data
    XLSX.utils.sheet_add_aoa(ws, [["Bilav Information Services LLP"]], {
      origin: -1,
    });

    // sets column width
    var wscols = [
      { wpx: 220 }, // "pixels"
      { wpx: 140 },
      { wpx: 180 },
      { wpx: 180 },
      { wpx: 130 },
    ];
    ws["!cols"] = wscols;

    // makes data uneditable
    ws["!protect"] = true;

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <img
      src={logo}
      alt="ExportLogo"
      onClick={(e) => exportToCSV(csvData, fileName)}
    />
    //<button onClick={(e) => exportToCSV(csvData,fileName)}>Export</button>
  );
};
