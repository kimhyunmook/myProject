const express = require("express");
const router = express.Router();
const { db2 } = require("../db");
const { errorMessage, correctMessage, sqlText } = require("../util");
const fs = require("fs");
const training = require("../training/training");
const moment = require("moment");

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
  console.log(insert);
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
    await conn.query(sql);
    console.log(sql);

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
  const date = req.body.date;
  let data,
    lookData = [];
  let sql = "";
  let today = new Date();
  try {
    let where =
      date !== undefined
        ? `date="${date}"`
        : `date="${moment(today).format("YYYY-MM-DD")}"`;
    sql = sqlText.SELECT("calendar");
    data = await conn.query(sql);
    data = data[0];

    sql = sqlText.SELECT("calendar", where);
    lookData = await conn.query(sql);
    lookData = lookData[0];

    // local save data가 있는 경우
    const training_dir = fs.readdirSync("server/training");
    let json_file = [];
    let training_data = {};

    if (training_dir.length > 1 && data.length === 0) {
      training_dir.map((v) =>
        v.split(".")[v.split(".").length - 1] === "json"
          ? json_file.push(v)
          : null
      );
      json_file.map(async (v, i) => {
        training_data = training(v);
        let insert = {
          table_name: "calendar",
          list: training_data.list,
        };
        sql = sqlText.INSERT(insert);
        await conn.query(sql);
      });
    }

    res.status(200).json({
      condition: "success",
      data,
      lookData,
    });
    correctMessage(routerName, "Info Success ~~ :)");
  } catch (error) {
    errorMessage(routerName, error);
  }
});

router.post("/study_test", async (req, res) => {
  const routerName = req.originalUrl;
  let sql = "";
  let data = [];
  let [userId, type] = [req.body.userId, req.body.type];
  const conn = await db2.getConnection();
  const quesLength = 10;
  let random, i = 0;
  let quesIndex = [];

  try {
    sql = sqlText.SELECT("calendar", `type="${type}" AND  userId="${userId}"`);
    data = await conn.query(sql);
    data = data[0];
    for (i = 0; i < quesLength; i++) {
      random = Math.floor(Math.random() * data.length);
      quesIndex.push(random);
    }
    console.log(quesIndex)
    // async function overlap_remove() {
    //   quesIndex = await quesIndex.filter((x, i) => quesIndex.indexOf(x) === i);
    //   console.log(quesIndex)
    //   if (quesIndex.length < quesLength) {
    //     for (i = 0; i < quesLength - quesIndex.length; i++) {
    //       random = Math.floor(Math.random() * data.length);
    //       quesIndex.push(random);
    //     }
    //     return overlap_remove();
    //   } else return quesIndex;
    // }
    // quesIndex = overlap_remove();
    // console.log(quesIndex)

    // data = quesIndex.reduce((a, c, i) => {
    //   a.push(data[c]);
    //   return a;
    // }, []);
    correctMessage(routerName, "Success requiest_id:" + userId);
    res.status(200).json({
      condition: "success",
      data,
    });
  } catch (error) {
    errorMessage(routerName, error);
  }
});
module.exports = router;
