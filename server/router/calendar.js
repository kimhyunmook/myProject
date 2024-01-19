const express = require("express");
const router = express.Router();
const { db2 } = require("../db");
const {
  errorMessage,
  correctMessage,
  commaString,
  sqlText,
} = require("../util");

router.post("/study", async (req, res) => {
  const routerName = req.originalUrl;
  const conn = await db2.getConnection();
  let sql;
  let insert = {
    table_name: "calendar",
    list: req.body.data,
  };
  console.log(req.body.data);
  try {
    sql = sqlText.INSERT(insert);
    await conn.query(sql);
    res.status(200).json({
      condition: "success",
    });
    await conn.release();
    correctMessage(routerName, "Study :)");
  } catch (error) {
    errorMessage(routerName, error);
  }
});

router.post("/info", async (req, res) => {
  const routerName = req.originalUrl;
  const conn = await db2.getConnection();
  const date = req.params.date;
  let sql, data;
  try {
    sql = sqlText.SELECT("calendar");
    console.log(sql);
    data = await conn.query(sql);
    data = data[0];
    console.log(data);
    res.status(200).json({
      condition: "success",
      data,
    });
    correctMessage(routerName, "Info ~~ :)");
  } catch (error) {
    errorMessage(routerName, error);
  }
});
module.exports = router;
