const express = require("express"); //npm install express body-parser
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors"); //npm install cors
const mysql = require("mysql2"); //npm install --save mysql2

const db = mysql.createPool({
  //const db = mysql.createConnection({
  host: "10.0.1.16",
  user: "react",
  password: "React@123",
  database: "SUBSDB",
});

db.getConnection((err) => {
  if (!err) console.log("DB connection succeeded.");
  else
    console.log(
      "DB connection failed \n Error : " + JSON.stringify(err, undefined, 2)
    );
});

{
  /*CORS stands for cross-origin resource sharing. Just like HTTPS, it's a protocol that defines some rules for sharing resources from a different origin. */
}
app.use(cors());
{
  /*The express.json() function is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.*/
}
app.use(express.json());
{
  /*Returns middleware that only parses urlencoded bodies and only looks at requests where the Content-Type header matches the type option. */
}
app.use(bodyParser.urlencoded({ extended: true }));

{
  /*Execute Select query for Portfolio details from PRTDET table with passing selected PRTMSTID in where condition*/
}
app.post("/api/getdata", (req, res) => {
  const prtmstid = req.body.prtmstid;
  const prtcnt = req.body.prtcnt;
  const sqlSelect1 = "call SUBSDB.ProcPrtdetByPrtmstId(?,?);";
  db.query(sqlSelect1, [prtmstid, prtcnt], (err1, result1) => {
    if (err1 == null) {
      res.send(result1[0]);
    } else {
      res.status(500);
      res.send("Error:" + err1.sqlMessage);
    }
  });
});

{
  /*Execute Select query for Portfolio Records Count from PRTDET table with passing selected PRTMSTID in where condition*/
}
app.post("/api/getcntdata", (req, res) => {
  const prtmstid = req.body.prtmstid;
  const prtcnt = req.body.prtcnt;
  const sqlSelect2 = "call SUBSDB.ProcPrtdetByPrtmstId(?,?);";
  db.query(sqlSelect2, [prtmstid, prtcnt], (err2, result2) => {
    if (err2 == null) {
      res.send(result2[0]);
    } else {
      res.status(500);
      res.send("Error:" + err2.sqlMessage);
    }
  });
});

{
  /*Execute Select query for Portfolio list from PRTMST table */
}
app.get("/api/get", (req, res) => {
  const sqlSelect = "call SUBSDB.ProcPrtmstSel();";
  db.query(sqlSelect, (err, result) => {
    if (err == null) {
      res.send(result[0]);
    } else {
      res.status(500);
      res.send({ err: err.sqlMessage });
    }
  });
});

{
  /*Execute Select query for Portfolio Change details from PRTDET table with passing selected PRTMSTID, From Date and To Date in where condition*/
}
app.post("/api/getchgdata", (req, res) => {
  const prtmstid = req.body.prtmstid;
  const fromdt = req.body.fromdt;
  const todt = req.body.todt;
  const prtcnt = req.body.prtcnt;
  const sqlSelect3 = "call SUBSDB.ProcPrtChgByPrtmstId(?,?,?,?);";
  db.query(sqlSelect3, [prtmstid, fromdt, todt, prtcnt], (err3, result3) => {
    if (err3 == null) {
      res.send(result3[0]);
    } else {
      res.status(500);
      res.send("Error:" + err3.sqlMessage);
    }
  });
});

{
  /*Execute Select query for Portfolio Change Records Count from PRTDET table with passing selected PRTMSTID, From Date and To Date in where condition*/
}
app.post("/api/getcntchgdata", (req, res) => {
  const prtmstid = req.body.prtmstid;
  const fromdt = req.body.fromdt;
  const todt = req.body.todt;
  const prtcnt = req.body.prtcnt;
  const sqlSelect4 = "call SUBSDB.ProcPrtChgByPrtmstId(?,?,?,?);";
  db.query(sqlSelect4, [prtmstid, fromdt, todt, prtcnt], (err4, result4) => {
    if (err4 == null) {
      res.send(result4[0]);
    } else {
      res.status(500);
      res.send("Error:" + err4.sqlMessage);
    }
  });
});

{
  /*
{/*Execute Select query for Portfolio details from PRTDET table with passing selected PRTMSTID in where condition*/
}
/*app.post("/api/getdata", (req, res) => {
    const prtmstid = req.body.prtmstid;
    // const sqlSelect1 = "select prtmstid, seccd from prtdet where prtmstid = "+prtmstid    ;
    const sqlSelect1 = "select ISSUR.ISSNAME as 'Company', SCMST.ISIN, ISSUR.CIN, ISSUR.LEI, " +
        "date_format( cast(LEIDM.NXTRNWLDT as date),'%d/%m/%Y')  as 'LEIRenewalDate'  from prtdet " +
        "join prtmst on prtdet.prtmstid = prtmst.prtmstid " +
        "join TRAKLEI.SCMST on prtdet.seccd = TRAKLEI.SCMST.SECCD " +
        "join TRAKLEI.ISSUR on TRAKLEI.SCMST.ISSCD = TRAKLEI.ISSUR.ISSCD " +
        "join TRAKLEI.LEIDM on TRAKLEI.ISSUR.LEI = TRAKLEI.LEIDM.LEI " +
        "where prtmst.prtmstid = " + prtmstid;
    db.query(sqlSelect1, [prtmstid], (err, result1) => {
        // console.log(result1);
        res.send(result1);
    });  
})*/

/*Execute Select query for Portfolio Records Count from PRTDET table with passing selected PRTMSTID in where condition*/
/*app.post("/api/getcntdata", (req, res) => {
    const prtmstid = req.body.prtmstid;
    const prtcnt = req.body.prtcnt;
    const sqlSelect1 = "call SUBSDB.ProcPrtdetByPrtmstId(?,?);";    
    db.query(sqlSelect1, [prtmstid,prtcnt], (err1, result1) => {
    const sqlSelect2 = "select COUNT(*)  as PRTCNT  from prtdet " +
        "join prtmst on prtdet.prtmstid = prtmst.prtmstid " +
        "join TRAKLEI.SCMST on prtdet.seccd = TRAKLEI.SCMST.SECCD " +
        "join TRAKLEI.ISSUR on TRAKLEI.SCMST.ISSCD = TRAKLEI.ISSUR.ISSCD " +
        "join TRAKLEI.LEIDM on TRAKLEI.ISSUR.LEI = TRAKLEI.LEIDM.LEI " +
        "where prtmst.prtmstid = " + prtmstid;
    db.query(sqlSelect2, [prtmstid], (err, result2) => {
        // console.log(result2);
        res.send(result2);
    });
})*/

/*
{/*Execute Select query for Portfolio list from PRTMST table 
app.get("/api/get", (req, res) => {
    const sqlSelect = "SELECT * FROM prtmst";
    db.query(sqlSelect, (err, result) => {
        //res.send('Backend mysql !'); 
        if(!err)
        res.send(result);
        else
        console.log(err)
    });
})*/

/*
{/*Execute Select query for Portfolio Change details from PRTDET table with passing selected PRTMSTID, From Date and To Date in where condition*
app.post("/api/getchgdata", (req, res) => {
    const prtmstid = req.body.prtmstid;
    const fromdt = req.body.fromdt;
    const todt = req.body.todt;
    console.log(fromdt)
    console.log(todt)
    const sqlSelect3 = "select ISSUR.ISSNAME as 'Company', prtdet.seccd, SCMST.ISIN, ISSUR.CIN, ISSUR.LEI, " +
        " date_format( cast(LEIDM.NXTRNWLDT as date),'%d/%m/%Y')  as 'LEIRenewalDate', " +
        " ISSUR.GCDATE AS ISSGCDATE, SCMST.GCDATE AS SCMGCDATE, LEIDM.GCDATE AS LEIGCDATE, prtdet.dbupdate from prtdet " +
        " join prtmst on prtdet.prtmstid = prtmst.prtmstid " +
        " join TRAKLEI.SCMST on prtdet.seccd = TRAKLEI.SCMST.SECCD " +
        " join TRAKLEI.ISSUR on TRAKLEI.SCMST.ISSCD = TRAKLEI.ISSUR.ISSCD " +
        " join TRAKLEI.LEIDM on TRAKLEI.ISSUR.LEI = TRAKLEI.LEIDM.LEI " +
        " where prtmst.prtmstid =  " + prtmstid +
        " and ((date(ISSUR.GCDATE) >= '" + fromdt + "' and date(ISSUR.GCDATE) <= '" + todt + "')" +
        " or (date(SCMST.GCDATE) >= '" + fromdt + "' and date(SCMST.GCDATE) <= '" + todt + "')" +
        " or (date(LEIDM.GCDATE) >= '" + fromdt + "' and date(LEIDM.GCDATE) <= '" + todt + "'));";

    console.log(sqlSelect3);
    db.query(sqlSelect3, [prtmstid, fromdt, todt], (err, result3) => {
        // console.log(result3);
        res.send(result3);
    });
})

{/*Execute Select query for Portfolio Change Records Count from PRTDET table with passing selected PRTMSTID, From Date and To Date in where condition
app.post("/api/getcntchgdata", (req, res) => {
    const prtmstid = req.body.prtmstid;
    const fromdt = req.body.fromdt;
    const todt = req.body.todt;

    const sqlSelect4 = "select COUNT(*)  as PRTCNT  from prtdet " +
        " join prtmst on prtdet.prtmstid = prtmst.prtmstid " +
        " join TRAKLEI.SCMST on prtdet.seccd = TRAKLEI.SCMST.SECCD " +
        " join TRAKLEI.ISSUR on TRAKLEI.SCMST.ISSCD = TRAKLEI.ISSUR.ISSCD " +
        " join TRAKLEI.LEIDM on TRAKLEI.ISSUR.LEI = TRAKLEI.LEIDM.LEI " +
        " where prtmst.prtmstid =  " + prtmstid +
        " and ((date(ISSUR.GCDATE) >= '" + fromdt + "' and date(ISSUR.GCDATE) <= '" + todt + "')" +
        " or (date(SCMST.GCDATE) >= '" + fromdt + "' and date(SCMST.GCDATE) <= '" + todt + "')" +
        " or (date(LEIDM.GCDATE) >= '" + fromdt + "' and date(LEIDM.GCDATE) <= '" + todt + "'))";
    //console.log(sqlSelect4);
    db.query(sqlSelect4, [prtmstid, fromdt, todt], (err, result4) => {
        // console.log(result4);
        res.send(result4);
    });
})
*/

app.listen(3001, () => {
  console.log("running on port 3001");
});
