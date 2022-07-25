/* MIHIR SHETH | 07/07/2022 */

// https://youtu.be/HwnHgEoiZzE => Export file
import React from "react";
import * as ExcelJS from "exceljs";
import * as fs from "file-saver";
import logo from "./../../img/xlsx-download-icon.png";
import styles from "./ExportLogo.module.css";

// https://javascript.plainenglish.io/export-data-to-excel-in-angular-using-exceljs-305ba8c5dece => ExcelJS code
export const ExportEXC = ({ exportData, fileName }) => {
  const exportToEXC = (exportData, fileName) => {
    // defining new workbook and creating a new worksheet in it
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Portfolio Data");

    // setting company porperty of file
    workbook.company = "Bilav Information Services LLP";

    // adding column headers
    worksheet.columns = [
      { header: "Company", key: "name" },
      { header: "ISIN", key: "isin" },
      { header: "CIN", key: "cin" },
      { header: "LEI", key: "lei" },
      { header: "LEI Renewal Date", key: "rendate" },
    ];

    // parsing data and adding into worksheet
    for (let x1 of exportData) {
      let x2 = Object.keys(x1);
      let temp = [];
      for (let y of x2) {
        temp.push(x1[y].trim());
      }
      worksheet.addRow(temp);
    }

    // // https://stackoverflow.com/questions/45798205/exceljs-apply-fill-to-cell-range => header row properties
    // header row fill color
    worksheet.getRow(1).eachCell({ includeEmpty: false }, function (cell) {
      worksheet.getCell(cell.address).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: {
          argb: "FFFFFF00",
        },
        bgColor: {
          argb: "FF000000",
        },
      };
      // header row bold font
      worksheet.getCell(cell.address).font = {
        bold: true,
      };
    });

    // freezes header row
    worksheet.views = [{ state: "frozen", ySplit: 1 }];

    // date column right align
    const dateCol = worksheet.getColumn("rendate");
    dateCol.alignment = { horizontal: "right" };
    // date column header back to left (applies to all headers)
    worksheet.getRow(1).eachCell({ includeEmpty: false }, function (cell) {
      worksheet.getCell(cell.address).alignment = {
        horizontal: "left",
      };
    });

    // empty placeholder rows
    var rows = [[], []];
    worksheet.addRows(rows);
    rows.hidden = true;
    // last row with hidden company name
    let lRow = worksheet.addRow({
      id: "hidden",
      name: "Bilav Information Services LLP",
    });
    lRow.font = {
      color: { argb: "FFFFFFFF" },
    };
    lRow.hidden = true;

    // column width auto-fit
    worksheet.columns.forEach(function (column, i) {
      var maxLength = 0;
      column["eachCell"]({ includeEmpty: true }, function (cell) {
        var columnLength = cell.value ? cell.value.toString().length : 25;
        if (columnLength > maxLength) {
          maxLength = columnLength;
        }
      });
      column.width = maxLength < 25 ? 25 : maxLength;
    });

    // attempt to encrypt worksheet (ON HOLD)
    /* const lock = async () => {
      await worksheet.protect("Bilav@123", {
        selectLockedCells: true,
        formatCells: false,
        formatColumns: false,
        formatRows: false,
        insertRows: false,
        insertColumns: false,
        deleteRows: false,
        deleteColumns: false,
      });
    };
    var test = worksheet.getCell("A2").value;
    if (typeof test === "string") {
      lock();
    } */

    // file-saver code
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      fs.saveAs(blob, fileName + ".xlsx");
    });
  };

  return (
    <img
      className={styles.exportLogo}
      src={logo}
      title="Export to Excel"
      alt="Export to Excel"
      onClick={(e) => exportToEXC(exportData, fileName)}
    />
  );
};
