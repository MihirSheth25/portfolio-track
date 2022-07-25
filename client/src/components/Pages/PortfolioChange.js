import React, { useState, useEffect } from "react";
import "../App.css";
import Axios from "axios"; //npm i axios
import { ExportCSV } from "../Functionality/ExportCSV";
import logo from "../img/search.png";

function PortfolioChange() {
  const [PrtnmList, setPrtnmList] = useState(""); //list of Portfolios on grid
  const [PrtChgCntList, setPrtChgCntList] = useState([]); //Total Records of Selected Portfolio Change
  const [PrtChgDetList, setPrtChgDetList] = useState([]); //Details of selected Portfolio Change
  const [PortfolioId, setPortfolioId] = useState(""); //Portfolio Id
  const [FromDt, setFromDt] = useState(""); //From Date
  const [ToDt, setToDt] = useState(""); //To Date

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

  //On 'SearchData' event, fetch Portfolio details and Total Record counts by passing Prtmstid and Date Range.
  const SearchData = () => {
    if (PortfolioId === "") {
      alert("Please Select Portfolio.");
      return;
    }
    if (FromDt === "") {
      alert("Please Select From Date.");
      return;
    }
    if (ToDt === "") {
      alert("Please Select To Date.");
      return;
    }
    const today = new Date();
    var dd = today.getDate();
    var mm = parseInt(today.getMonth() + 1);
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    var CurrentDt = dd + "-" + mm + "-" + yyyy;
    const CurDate = new Date(CurrentDt);
    const FromDate = new Date(FromDt);
    const ToDate = new Date(ToDt);

    if (FromDate > CurDate || ToDate > CurDate) {
      alert("From Date or To Date cannot be future Date");
      return;
    }

    if (FromDate > ToDate) {
      alert("From Date cannot be later than To Date");
      return;
    }

    alert(
      "Portfolio Id:" +
        PortfolioId +
        ", From Date:" +
        FromDt +
        ", To Date:" +
        ToDt
    );

    Axios.post("http://localhost:3001/api/getchgdata", {
      prtmstid: PortfolioId,
      fromdt: FromDt,
      todt: ToDt,
      prtcnt: false,
    }).then((Response) => {
      setPrtChgDetList(Response.data);
    });
    Axios.post("http://localhost:3001/api/getcntchgdata", {
      prtmstid: PortfolioId,
      fromdt: FromDt,
      todt: ToDt,
      prtcnt: true,
    })
      .then((Response) => {
        setPrtChgCntList(Response.data);
      })
      .catch((error) => {
        //setPrtnmList({ errorMessage: error.sqlMessage });
        console.log("There was an error!", error);
      });
  };

  if (
    typeof PrtChgDetList != "object" &&
    PrtChgDetList.substring(0, 5) === "Error"
  ) {
    alert(PrtChgDetList);
  }

  const fileName = "Portfolio Change Details";
  return (
    <div className="PrtApp">
      <h1>PORTFOLIO DETAILS</h1>
      <div className="PrtForm">
        <label>
          Portfolio :*
          {/*dropdown for list of portfolios and call 'OnChange' event while selecting Portfolio*/}
          {/*<select  name = "Prtlist" id= "Prtlist" onChange={onddlChange}>*/}
          <select
            name="Prtlist"
            id="Prtlist"
            onChange={(e) => {
              setPortfolioId(e.target.value);
            }}
          >
            <option value="0">Select</option>{" "}
            {/*default Select value dropdown*/}
            {/* display portfolios list on dropdown from PrtnmList*/}
            {PrtnmList &&
              PrtnmList.map((val, prtmstid) => {
                return (
                  <option key={prtmstid} value={prtmstid}>
                    {val.portname}{" "}
                  </option>
                );
              })}
          </select>
        </label>

        <label>
          From Date
          <input
            type="date"
            name="FromDt"
            onChange={(e) => {
              setFromDt(e.target.value);
            }}
          />
          To Date
          <input
            type="date"
            name="ToDt"
            onChange={(e) => {
              setToDt(e.target.value);
            }}
          />
          <img src={logo} alt="SearchLogo" onClick={SearchData} />
        </label>
        {/*horizontal line*/}
        <div>
          {" "}
          <hr class="hr1"></hr>{" "}
        </div>
        {/*Display Total Security Records of selected portfolio*/}
        {PrtChgCntList.map((val) => {
          return (
            <label>
              Total Records: {val.PRTCNT}
              <ExportCSV csvData={PrtChgDetList} fileName={fileName} />
            </label>
          );
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
        {PrtChgDetList.map((val) => {
          return (
            <div class="PrtGridView">
              <div class="PrtGrdData">{val.Company}</div>
              <div class="PrtGrdData">{val.ISIN}</div>
              <div class="PrtGrdData">{val.CIN}</div>
              <div class="PrtGrdData">{val.LEI}</div>
              <div class="PrtGrdData">{val.LEIRenewalDate}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PortfolioChange;
