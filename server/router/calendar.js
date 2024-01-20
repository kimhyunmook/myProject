const express = require("express");
const router = express.Router();
const { db2 } = require("../db");
const { errorMessage, correctMessage, sqlText } = require("../util");
const fs = require("fs");
const training = require("../training/training");

router.post("/study", async (req, res) => {
  const routerName = req.originalUrl;
  let sql;
  let insert = {
    table_name: "calendar",
    list: req.body.data,
  };

  // add training json
  let training_dir = "server/training/english.json";
  let initial = {
    tabel_name: "",
    list: [],
  };
  if (!fs.existsSync(training_dir))
    fs.writeFileSync(training_dir, JSON.stringify(initial));

  const conn = await db2.getConnection();
  try {
    //local save
    let backup = training("english", req.body.data);
    sql = sqlText.SELECT("calendar");
    let confirm = await conn.query(sql);
    confirm[0].length === 0 ? (insert.list = backup.list) : null;

    //server save
    sql = sqlText.INSERT(insert);

    console.log(insert, sql);

    await conn.query(sql);

    res.status(200).json({
      condition: "success",
    });
    await conn.release();
    correctMessage(routerName, "Study Success:)");
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
    data = await conn.query(sql);
    data = data[0];
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
