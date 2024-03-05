const express = require("express");
const router = express.Router();
const { db2 } = require("../db");
const { errorMessage, correctMessage, sqlText } = require("../util");
const fs = require("fs");
const moment = require("moment");

router.post("/add", async (req, res) => {
  let routerName = req.originalUrl;
  let sql;
  let data = [];
  let result = {};

  const conn = await db2.getConnection();
  delete req.body.url;
  console.log(req.body.description);

  try {
    let key = Object.keys(req.body);
    let values = Object.values(req.body);
    let searchId = "";

    sql = sqlText.SELECT("users", `id="${req.body.userId}"`);
    searchId = await conn.query(sql);
    searchId = searchId[0][0];

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
    result = { condition: "SUCCESS", data: searchId, login: true };

    correctMessage(routerName, "Project add ");
    await conn.release();
  } catch (error) {
    errorMessage(routerName, error);
  }
  res.status(200).json(result);
});

router.post("/delete", async (req, res) => {
  const routerName = req.originalUrl;
  let sql = "";
  let result = {};
  let data = [];
  try {
    const conn = await db2.getConnection();
    sql = sqlText.DELETE("project", `userId = ? AND num =?`);
    await conn.query(sql, [req.body.userId, req.body.num]);
    sql = sqlText.DELETE("project_calendar", `userId = ? AND project_num =?`);
    await conn.query(sql, [req.body.userId, req.body.num]);

    correctMessage(routerName, "success");
    result = {
      condition: "success",
    };
    await conn.release();
  } catch (error) {
    errorMessage(routerName, error);
    result.condition = "error";
    result.error = error;
  }

  res.status(200).json(result);
});

router.post("/info", async (req, res) => {
  const routerName = req.originalUrl;
  let data = [];
  let result = {};
  try {
    const conn = await db2.getConnection();
    sql = sqlText.SELECT("project", `userId=?`);
    data = await conn.query(sql, req.body.userId);
    data = data[0];
    result = {
      data,
      condition: "success",
    };
  } catch (error) {
    errorMessage(routerName, error);
    result.condition = "fail";
  }
  res.status(200).json(result);
});

router.post("/projectCalendar", async (req, res) => {
  const routerName = req.originalUrl;
  const conn = await db2.getConnection();
  let sql;
  let result = {};
  delete req.body.url;

  try {
    let keys = Object.keys(req.body);
    let values = Object.values(req.body);
    values = values.map((v) => `"${v}"`);
    sql = sqlText.INSERT("project_calendar", keys, `(${values})`);
    await conn.query(sql);
    await correctMessage(routerName, "insert good");
    result.condition = "success";
  } catch (error) {
    errorMessage(routerName, error);
    result.condition = "fail";
  }
  res.status(200).json(result);
});

router.post("/projectCalendarInfo", async (req, res) => {
  const routerName = req.originalUrl;
  delete req.body.url;
  let result = {}
  try {
    const conn = await db2.getConnection();
    let sql = sqlText.SELECT(
      "project_calendar",
      `userId=? AND project_name=? AND project_num=?`
    );
    let data = await conn.query(sql, [
      req.body.userId,
      req.body.project_name,
      req.body.project_num,
    ]);

    data = data[0];
    result = {
      condition: "SUCCESS",
      data,
    }
    correctMessage(routerName, "execution data");
    await conn.release();
  } catch (error) {
    errorMessage(routerName, error);
    result = {
      condition: "FAIL",
      fail_error: error
    }
  }
  res.status(200).json(result);
});

router.post("/projectCalendarEdit", async (req, res) => {
  const routerName = req.originalUrl;
  let update, sql;
  try {
    const conn = await db2.getConnection();
    if (!!req.body.achieve)
      sql = sqlText.UPDATE(
        "project_calendar",
        `achieve="${req.body.achieve}"`,
        `num=${req.body.num}`
      );
    else
      sql = sqlText.UPDATE(
        "project_calendar",
        `subject="${req.body.subject}", content="${req.body.content}"`,
        `num=${req.body.num} AND userId="${req.body.userId}"`
      );
    await conn.query(sql);
    let data;
    sql = sqlText.SELECT(
      "project_calendar",
      `project_name="${req.body.project_name}" AND userId="${req.body.userId}"`
    );
    data = await conn.query(sql);
    data = data[0];
    res.status(200).json({
      data,
    });
    correctMessage(routerName, "execution Edit");
    await conn.release();
  } catch (error) {
    errorMessage(routerName, error);
  }
});

router.post("/projectCalendarDelete", async (req, res) => {
  const routerName = req.originalUrl;
  let sql, data;
  try {
    const conn = await db2.getConnection();
    sql = sqlText.DELETE(
      "project_calendar",
      `project_name="${req.body.project_name}" AND userId="${req.body.userId}" AND num=${req.body.num}`
    );
    await conn.query(sql);
    sql = sqlText.SELECT(
      "project_calendar",
      `project_name="${req.body.project_name}" AND userId="${req.body.userId}"`
    );
    data = await conn.query(sql);
    data = data[0];

    correctMessage(routerName, "s");
  } catch (error) {
    errorMessage(routerName, error);
  }

  await res.status(200).json({
    data,
  });
});

router.post("/:projectName/memo", async (req, res) => {
  const routerName = req.originalUrl;
  let sql = "";
  let data = [];
  let result = {};
  let search;
  delete req.body.url;
  if (req.params.projectName !== "undefined")
    try {
      const conn = await db2.getConnection();
      let [key, value] = [Object.keys(req.body), Object.values(req.body)];
      value = value.reduce((a, c, i) => {
        if (i !== 0) a.push(`"${c}"`);
        else a.push(c);
        return a;
      }, []);
      if (!!req.body.memo) {
        sql = sqlText.INSERT(`project_memo`, key, `(${value})`);
        await conn.query(sql);
      }
      sql = sqlText.SELECT(
        "project_memo",
        `userId="${req.body.userId}" AND project_name="${req.body.project_name}" AND num=${req.body.num}`
      );
      search = await conn.query(sql);
      search = search[0];
      correctMessage(routerName, "memo" + search);
      result = {
        condition: "success",
        data: search,
      };

      await conn.release();
    } catch (error) {
      result.condition = "fail";

      errorMessage(routerName, error);
    }
  res.status(200).json(result);
});

router.post("/:projectName/memoDelete", async (req, res) => {
  const routerName = req.originalUrl;
  let sql = "";
  let result = {};
  let data,
    search = [];
  try {
    const conn = await db2.getConnection();
    sql = sqlText.DELETE(`project_memo`, `unique_num=${req.body.unique_num}`);
    await conn.query(sql);
    sql = sqlText.SELECT(
      `project_memo`,
      `userId="${req.body.userId}" AND num=${req.body.num} AND project_name="${req.body.project_name}"`
    );
    search = await conn.query(sql);
    data = search[0];

    result = {
      condition: "success",
      data,
    };
    correctMessage(routerName, "memo delete");
    await conn.release();
  } catch (error) {
    errorMessage(routerName, error);
  }

  res.status(200).json(result);
});

module.exports = router;
