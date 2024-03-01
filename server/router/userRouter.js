const express = require("express");
// import express from 'express';

const router = express.Router();
const { db, db2 } = require("../db");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const {
  readSQL,
  saltRounds,
  errorMessage,
  correctMessage,
  commaString,
  pw_askiicode,
  sqlText,
} = require("../util");
router.use(cookieParser());

router.post("/signup", async (req, res) => {
  const routerName = req.originalUrl;
  let message, sql, query, result, hash, res_data;
  let param = Object.values(req.body);
  param.push(0); // add role
  const id = param[1];
  try {
    sql = `SELECT * FROM users WHERE id=?`;
    const conn = await db2.getConnection();
    query = await conn.query(sql, id);
    result = query[0][0];
    if (result !== undefined) {
      message = "ID overlap";
      res_data = {
        signUp: false,
        error: message,
        errorType: "idOverlap",
      };
    } else {
      param[1] = await bcrypt.hashSync(param[1], saltRounds);
      message = "REGISTER SUCCESS";

      await conn.query(readSQL("user/insert.sql"), param);
      res_data = {
        signUp: true,
        message,
      };
    }
    res.status(200).json(res_data);
    await conn.release();
    correctMessage(routerName, message);
  } catch (error) {
    errorMessage(routerName, error);
  }
});

router.post("/login", async (req, res) => {
  const routerName = req.originalUrl;
  const id = req.body.id;
  const password = req.body.password;
  // console.log(req.body);
  let param = [id, password];
  let sql = `SELECT * FROM users WHERE id=?`;
  let conn = await db2.getConnection();
  let message = "";
  let search, searchId, loginToken;
  try {
    search = await conn.query(sql, id);
    searchId = await search[0][0];
    console.log(searchId)
    if (searchId === undefined) {
      message = "ID_NO_EXIST";
      errorMessage(routerName, message);
      return res.status(200).json({
        login: false,
        message,
        data: {},
      });
    }
    let match = await bcrypt.compareSync(param[1], searchId.password);
    if (match) {
      message = `ID: ${id} , login success`;
      correctMessage(routerName, message);
      loginToken = Math.floor(Math.random() * 100000).toString();
      loginToken = bcrypt.hashSync(loginToken, 3) + `/id=` + searchId;
      res.cookie("login_token", loginToken, {
        expires: new Date(),
        path: "/",
      });
      sql = `UPDATE users SET login_token=? WHERE id=?`;
      await conn.query(sql, param);
      await res.status(200).json({
        login: true,
        data: searchId,
        message,
      });
    } else {
      message = "PW_ERROR";
      await res.status(200).json({
        login: false,
        data: {},
        message: message,
      });
      await errorMessage(routerName, message);
    }
  } catch (error) {
    res.send('login fail')
    errorMessage(router, error);
  }
});

router.post("/logout", async (req, res) => {
  const routerName = req.originalUrl;
  const id = req.body.id;
  let sql = `SELECT * FROM users WHERE id=?`;
  let conn = await db2.getConnection();
  let search, logOutId;
  try {
    search = await conn.query(sql, id);
    logOutId = search[0][0];
    sql = `UPDATE users SET login_token=null WHERE id=?`;
    await conn.query(sql, id);
    let message = "LOGOUT_SUCCESS";
    await res.status(200).json({
      login: false,
      message,
      data: {},
    });
    await correctMessage(routerName, `ID: ${id} , logout success`);
  } catch (error) {
    errorMessage(routerName, error);
  }
});

router.post("/edit", (req, res) => {
  let sql = `
        UPDATE users 
        SET password=?, phone=?, email=?, nickname=?
        WHERE id=?
    `;
  let param = [
    req.body.password,
    req.body.phone,
    req.body.email,
    req.body.nickname,
    req.body.id,
  ];
  let result;
  bcrypt.hash(param[0], saltRounds, (err, hash) => {
    if (err) throw err;
    param[0] = hash;

    db.query(sql, param, (err1) => {
      if (err1) throw err1;
      sql = `SELECT * FROM users WHERE id=?`;
      db.query(sql, param[param.length - 1], (err2, rows) => {
        if (err2) throw err2;
        result = {
          edit: true,
          login: true,
          data: rows[0],
        };
        res.status(200).json(result);
      });
    });
  });
});

router.post("/delete", async (req, res) => {
  const routerName = req.originalUrl;
  let sql = `
        DELETE FROM users
        WHERE id=?
    `;
  let param = [req.body.id];
  const conn = await db2.getConnection();
  try {
    await conn.query(sql, param[0]);
    await correctMessage(routerName, `Id: ${param[0]}, ID delete`);

    await conn.release();
  } catch (error) {
    errorMessage(routerName, error);
  }
});

router.post("/search/:type", async (req, res) => {
  const routerName = req.originalUrl;
  const conn = await db2.getConnection();
  let sql;
  let param = [];
  let key = Object.values(req.body);
  let type;
  let result = {};
  param = key;
  console.log(param, req.params);
  try {
    switch (req.params.type) {
      case "1":
        type = "id";
        sql = sqlText.SELECT("users", "name=? AND email=?");
        break;
      case "2":
        type = "password";
        sql = sqlText.SELECT("users", "id=? AND name=? AND email=?");
        break;
    }
    console.log(type);
    let searchInfo = await conn.query(sql, param);
    searchInfo = searchInfo[0][0];
    if (searchInfo === undefined) {
      res.send({
        type,
        result: "fail",
      });
      return;
    }

    if (type === "id") {
      result = {
        type,
        result: "success",
        id: searchInfo.id,
      };
    }
    if (type === "password") {
      console.log(1);
      let pwLen = pw_askiicode().length;
      let newPw = "";
      for (i = 0; i < 8; i++) {
        let rand = Math.floor(Math.random() * pwLen);
        newPw += pw_askiicode(rand);
      }

      let pw = bcrypt.hashSync(newPw, saltRounds);
      sql = sqlText.UPDATE(
        "users",
        `password='${pw}'`,
        `id='${searchInfo.id}'`
      );
      await conn.query(sql);
      result = {
        type,
        result: "success",
        id: searchInfo.id,
        password: newPw,
      };
    }
    res.send(result);
    await correctMessage(routerName, `Search ${type}`);
    await conn.release();
  } catch (error) {
    errorMessage(routerName, error);
  }
});

module.exports = router;
