import React, { useState, useEffect } from "react";
import "./../../App.css";
import Axios from "axios"; //npm i axios
// import { ExportCSV } from "./ExportCSV";
import { ExportEXC } from "../Functionality/ExportEXC";
import { ExportPDF } from "../Functionality/ExportPDF";

import ToolTip from "../UI/Tooltip";

function Portfolio() {
  const [PrtnmList, setPrtnmList] = useState(""); //list of Portfolios on grid
  const [PrtcntList, setPrtcntList] = useState([]); //Total Records of Selected Portfolio
  const [PrtdetList, setPrtdetList] = useState([]); //Details of selected Portfolio

  //fetch Portfolio names
  useEffect(() => {
    Axios.get("http://localhost:3001/api/get")
      .then((Response) => {
        //console.log(Response.data);
        // if (Response.data === "")
        setPrtnmList(Response.data);
      })
      .catch((error) => {
        //setPrtnmList({ errorMessage: error.sqlMessage });
        console.log("There was an error!", error.response);
        alert(error);
      });
  }, []);
  // if (typeof PrtnmList != 'object' && PrtnmList.substring(0, 5) === 'Error') { alert(PrtnmList) }

  //On 'Onddlchange' event, fetch Portfolio details and Total Record counts by passing Prtmstid
  const onddlChange = (e) => {
    const prtmstid = e.target.value;
    Axios.post("http://localhost:3001/api/getdata", {
      prtmstid: prtmstid,
      prtcnt: false,
    }).then((Response) => {
      setPrtdetList(Response.data);
    });
    Axios.post("http://localhost:3001/api/getcntdata", {
      prtmstid: prtmstid,
      prtcnt: true,
    })
      .then((Response) => {
        setPrtcntList(Response.data);
      })
      .catch((error) => {
        //setPrtnmList({ errorMessage: error.sqlMessage });
        console.log("There was an error!", error);
      });
  };

  if (typeof PrtdetList != "object" && PrtdetList.substring(0, 5) === "Error") {
    alert(PrtdetList);
  }

  const fileName = "Portfolio Details"; //Set Export filename

  return (
    <div className="PrtApp">
      <h1>PORTFOLIO DETAILS</h1>
      <div className="PrtForm">
        <label>
          Portfolio :*
          {/*https://youtu.be/o8Gx_QQUjhQ => Dropdown List */}
          {/*dropdown for list of portfolios and call 'OnChange' event while selecting Portfolio*/}
          <select name="Prtlist" id="Prtlist" onChange={onddlChange}>
            {/* <select  name = "Prtlist" id= "Prtlist">*/}
            <option value="0">Select</option>{" "}
            {/*default Select value dropdown*/}
            {/* display portfolios list on dropdown from PrtnmList*/}
            {PrtnmList.length > 0 &&
              PrtnmList.map((val, prtmstid) => {
                return (
                  <option key={prtmstid} value={prtmstid}>
                    {val.portname}{" "}
                  </option>
                );
              })}
          </select>
        </label>

        {/*horizontal line*/}
        <div>
          {" "}
          <hr class="PrtHrLine"></hr>{" "}
        </div>

        {/*Display Total Security Records of selected portfolio*/}
        {PrtcntList.map((val) => {
          /* --- MIHIR SHETH | 11/07/2022 --- */
          return (
            <div className="outerContainer">
              <div className="detailsCount">Total Records: {val.PRTCNT}</div>
              {/*https://youtu.be/HwnHgEoiZzE => Export file*/}
              <div className="logoContainer">
                <ExportPDF exportData={PrtdetList} fileName={fileName} />
                <ExportEXC exportData={PrtdetList} fileName={fileName} />
              </div>
            </div>
          );
          /* --- MIHIR SHETH | 11/07/2022 --- */
        })}

        {/*Details of selected portfolio on grid*/}
        {/*Set column's header of grid*/}
        <div class="PrtGridView">
          <div class="PrtGrdHeader">Company</div>
          <div class="PrtGrdHeader">ISIN</div>
          <div class="PrtGrdHeader">CIN</div>
          <div class="PrtGrdHeader">LEI</div>
          <div class="PrtGrdHeader">LEI Renewal Date</div>
        </div>

        {/*display Portfolio details on grid from PrtdetList */}
        {PrtdetList.map((val) => {
          return (
            <div class="PrtGridView">
              <div class="PrtGrdData">
                {/* using custom tooltip component from "./ui/Tooltip.js" */}
                <ToolTip
                  ttTitle="Company Info"
                  ttText="Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                  Praesent facilisis ipsum eu mi commodo, ac lacinia mauris feugiat. 
                  Proin scelerisque ullamcorper egestas. 
                  Pellentesque ut libero a massa egestas congue non quis ligula. 
                  Quisque quis velit sit amet quam imperdiet pharetra. Vivamus varius sollicitudin odio ac dictum. 
                  Praesent malesuada velit ut leo tempus, id iaculis turpis molestie. 
                  Integer molestie leo vitae ante tristique dignissim. 
                  Ut sed quam aliquet, vestibulum ligula vel, faucibus sapien."
                >
                  {val.Company}
                </ToolTip>
              </div>
              <div class="PrtGrdData">
                <ToolTip ttTitle={val.ISIN} ttText={"CIN: " + val.CIN}>
                  {val.ISIN}
                </ToolTip>
              </div>
              <div class="PrtGrdData">
                <ToolTip ttTitle={"LEI: " + val.LEI} ttText="LOREM">
                  {val.CIN}
                </ToolTip>
              </div>
              <div class="PrtGrdData">{val.LEI}</div>
              <div class="PrtGrdData">{val.LEIRenewalDate}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Portfolio;
