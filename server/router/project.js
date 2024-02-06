const express = require("express");
const router = express.Router();
const { db2 } = require("../db");
const { errorMessage, correctMessage, sqlText } = require("../util");
const fs = require("fs");
const moment = require("moment");

router.post("/add", async (req, res) => {
  let routerName = req.originalUrl;
  let sql, data;
  const conn = await db2.getConnection();
  delete req.body.url;
  try {
    sql = sqlText.SELECT("users", `id="${req.body.userId}"`);
    let searchId = await conn.query(sql);
    searchId = searchId[0][0];
    let key = Object.keys(req.body);
    let values = Object.values(req.body);
    sql = sqlText.SELECT(`users`, `id="${req.body.userId}"`, "project");
    let project = await conn.query(sql);
    project = project[0][0].project;
    function existProject(newp) {
      project = [...project];
      let text = "";
      project.map((v) => {
        text += `\"${v}\",`;
      });
      return `[${text}\"${newp}\"]`;
    }
    project = !!!searchId.project
      ? `["${req.body.subject}"]`
      : existProject(req.body.subject);

    //users 에 project update
    sql = sqlText.UPDATE(
      `users`,
      `project='${project}'`,
      `id="${req.body.userId}"`
    );
    await conn.query(sql);
    values = values.map((v) => `"${v}"`);
    sql = sqlText.INSERT("project", key, `(${values})`);
    await conn.query(sql);

    res.status(200).json({
      condition: "SUCCESS",
      data: searchId,
      login: true,
    });
    correctMessage(routerName, "Project create ");
  } catch (error) {
    errorMessage(routerName, error);
  }
});

router.post("/info", async (req, res) => {
  const routerName = req.originalUrl;
  let data = [];
  const conn = await db2.getConnection();
  try {

    sql = sqlText.SELECT("project", `userId=?`);
    data = await conn.query(sql, req.body.userId);
    data = data[0];

    res.status(200).json({
      data,
      condition: "SUCCESS",
    });
  } catch (error) {
    errorMessage(routerName, error);
  }
});

module.exports = router;
