import React, { useEffect, useState, useCallback } from "react";
import "./../../App.css";
import Axios from "axios"; //npm i axios
// import { ExportCSV } from "./ExportCSV";
import { ExportEXC } from "../Functionality/ExportEXC";
import { ExportPDF } from "../Functionality/ExportPDF";

import ToolTip from "../UI/Tooltip";
import styles from "./Searchbar.module.css";
import searchIcon from "./../../assets/searching-svgrepo-com.svg";

function Portfolio() {
  const [PrtnmList, setPrtnmList] = useState(""); //list of Portfolios on grid
  const [PrtcntList, setPrtcntList] = useState([]); //Total Records of Selected Portfolio
  const [PrtdetList, setPrtdetList] = useState([]); //Details of selected Portfolio

  /* --- MIHIR SHETH | 06-08-2022 --- */
  const SearchBar = () => {
    const [searchResult, setSearchResult] = useState([]);
    const onInputChange = useCallback(
      (e) => {
        const searchInput = e.target.value;
        const matchTo = `^${searchInput.toLowerCase()}`;
        const regex = new RegExp(matchTo, "g");
        const newFilter = PrtnmList.filter((val) => {
          return val.portname.toLowerCase().match(regex);
        });

        if (searchInput === "") {
          setSearchResult([]);
        } else {
          setSearchResult(newFilter);
        }
      },
      [setSearchResult]
    );
    // return <input type="text" onChange={onChangeInput} value={textInput} />;
    return (
      <div className={styles.searchBar}>
        <div className={styles.bar}>
          <input
            id="searchBar"
            name="searchBar"
            type="text"
            placeholder="Search Portfolio..."
            autoComplete="off"
            onChange={onInputChange}
          />
          <img
            className="searchIcon"
            src={searchIcon}
            alt="Search for portfolio"
          />
        </div>
        {searchResult.length !== 0 && (
          <div className={styles.result}>
            {searchResult.map((val, prtmstid) => {
              return (
                <ul>
                  <li
                    key={prtmstid}
                    idValue={val.prtmstid}
                    className={styles.resultItem}
                    onClick={onddlChange}
                  >
                    {val.portname}
                  </li>
                </ul>
              );
            })}
          </div>
        )}
      </div>
    );
  };
  /* --- MIHIR SHETH | 06-08-2022 --- */

  /* --- MIHIR SHETH | 05-08-2022 --- */
  //fetch Portfolio names
  useEffect(() => {
    Axios.get("http://localhost:3001/api/search")
      .then((Response) => {
        //console.log(Response.data);
        // if (Response.data === "")
        // setPrtnmList(Response.data);
        setPrtnmList(Response.data);
      })
      .catch((error) => {
        //setPrtnmList({ errorMessage: error.sqlMessage });
        console.log("There was an error!", error.response);
        alert(error);
      });
  }, []);
  // if (typeof PrtnmList != 'object' && PrtnmList.substring(0, 5) === 'Error') { alert(PrtnmList) }
  /* --- MIHIR SHETH | 05-08-2022 --- */

  //On 'Onddlchange' event, fetch Portfolio details and Total Record counts by passing Prtmstid
  const onddlChange = (e) => {
    const prtmstid = e.target.getAttribute("idValue");
    // console.log("THE PORTFOLIO ID IS CLIENT -->", prtmstid);
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
        {/* --- MIHIR SHETH | 06-08-2022 --- */}
        <SearchBar />
        {/* --- MIHIR SHETH | 06-08-2022 --- */}

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
