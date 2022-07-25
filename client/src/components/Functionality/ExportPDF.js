/* MIHIR SHETH | 11/07/2022 */

import React from "react";
import logo from "./../../img/pdf-download-icon.png";
import styles from "./ExportLogo.module.css";

// https://pdfmake.github.io/docs/0.1/ => pdfMake documentation
import pdfMake from "pdfmake/build/pdfmake";
// https://youtu.be/xAdIDsnozRE => reference for using custom font "Calibri"
// copy "vfs_fonts" file from "client\node_modules\pdfmake\build" and paste to "assets"(this name can vary) folder and export from "assets" folder
import pdfFonts from "./../../assets/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
pdfMake.fonts = {
  Calibri: {
    normal: "calibri-regular.ttf",
    bold: "calibri-bold.ttf",
    italics: "calibri-italic.ttf",
    bolditalics: "calibri-bold-italic.ttf",
  },
};

export const ExportPDF = ({ exportData, fileName }) => {
  const exportToPDF = (exportData, fileName) => {
    var bodyData = [
      // pre-defined table header row
      [
        { text: "Company", style: "colHeader" },
        { text: "ICIN", style: "colHeader" },
        { text: "CIN", style: "colHeader" },
        { text: "LEI", style: "colHeader" },
        { text: "LEI Renewal Date", style: "colHeader" },
      ],
    ];

    // https://github.com/bpampuch/pdfmake/issues/949 => data from database into columns
    exportData.forEach(function (sourceRow) {
      var dataRow = [];
      dataRow.push({ text: sourceRow.Company, style: "content" });
      dataRow.push({ text: sourceRow.ISIN, style: "content" });
      dataRow.push({ text: sourceRow.CIN, style: "content" });
      dataRow.push({ text: sourceRow.LEI, style: "content" });
      dataRow.push({
        text: sourceRow.LEIRenewalDate,
        style: "content",
        alignment: "right",
      });
      bodyData.push(dataRow);
    });

    // pdf document formatting
    var dd = {
      pageMargins: [30, 70, 30, 40],
      // pre-defined functions that give current page and total number of pages of document
      header: function (currentPage, pageCount) {
        return {
          width: "auto",
          margin: [20, 20, 20, 15],
          table: {
            widths: ["30%", "40%", "30%"],
            body: [
              [
                {
                  text: "Date: " + new Date().toLocaleDateString("en-IN"),
                  color: "#5c5c5c",
                  fontSize: 10,
                },
                {
                  text: "TRAKLEI",
                  alignment: "center",
                  fontSize: 12,
                  bold: true,
                },
                {
                  text: "Page: " + currentPage.toString() + " of " + pageCount,
                  color: "#5c5c5c",
                  alignment: "right",
                  fontSize: 10,
                },
              ],
              // https://github.com/bpampuch/pdfmake/issues/1327 => gives header dotted line at the bottom
              [
                {
                  canvas: [
                    {
                      type: "line",
                      x1: 0,
                      y1: 16,
                      x2: 556,
                      y2: 16,
                      lineWidth: 1.5,
                      lineColor: "#5c5c5c",
                      dash: { length: 5, space: 2 },
                    },
                  ],
                },
                "",
                "",
              ],
            ],
          },
          layout: "noBorders",
        };
      },
      footer: {
        margin: [20, 10, 20, 10],
        columns: [
          {
            text: "Bilav Information Services LLP",
            alignment: "right",
            fontSize: 10,
            color: "#5c5c5c",
          },
        ],
      },
      content: [
        // https://stackoverflow.com/questions/57949581/how-to-center-align-table-pdfmake => main table within columns to center it
        {
          columns: [
            { width: "*", text: "" },
            {
              width: "auto",
              table: {
                headerRows: 1,
                widths: ["auto", "auto", "auto", "auto", "auto"],
                body: bodyData,
              },
            },
            { width: "*", text: "" },
          ],
        },
      ],
      // style dictionaries => pdfMake library feature
      styles: {
        colHeader: {
          bold: true,
          fontSize: 10,
          fillColor: "yellow",
        },
        content: {
          fontSize: 10,
        },
      },
      // defaultStyle => change style of entire document
      defaultStyle: {
        font: "Calibri",
      },
    };
    pdfMake.createPdf(dd).download(fileName + ".pdf");
  };

  return (
    <img
      className={styles.exportLogo}
      src={logo}
      title="Export to PDF"
      alt="Export to PDF"
      onClick={(e) => exportToPDF(exportData, fileName)}
    />
  );
};
