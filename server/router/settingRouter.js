const express = require("express");
const router = express.Router();
const fs = require("fs");
const bcrypt = require("bcrypt");
const mysql = require("mysql2/promise");
const { db, db2 } = require("../db");
const boardDummy = require("../dummy/board_dummy.json");
const setting = require("../setting.json");

const {
  readSQL,
  sqlText,
  existCreateQuery,
  existInsertQuery,
  errorMessage,
  correctMessage,
  saltRounds,
  menuFactoring,
} = require("../util");
require("dotenv").config();

router.get("/down", (req, res) => {
  const envConfirm = fs.existsSync(".env");
  res.status(200).json({
    Download: envConfirm,
  });
});

router.post("/dbinfo", async (req, res) => {
  const routerName = req.originalUrl;
  // NO FIX || env 파일 생성을 위한 코드 수정하지마세요.
  const dbinfo = `DB_HOST=${req.body.host}
DB_USER=${req.body.user}
PORT=3306
DB_PW=${req.body.password}
DB=${req.body.db}
`;

  const initDB = mysql.createPool({
    host: req.body.host,
    user: req.body.user,
    port: "3306",
    password: req.body.password,
    database: req.body.db,
  });
  let result = {
    ok: false,
    msg: "",
  };
  try {
    const conn = await initDB.getConnection();
    let sql;

    await existCreateQuery({
      connect: conn,
      table_name: "users",
      read_sql: "user/create.sql",
    });

    const salt = bcrypt.genSaltSync(saltRounds);
    const pw = bcrypt.hashSync(req.body.password, salt);
    const admin = ["admin", pw, "admin", "admin", "-", "-", "-", 1, 0];

    await existInsertQuery({
      connect: conn,
      table_name: "users",
      overlap_where: `id="${admin[0]}"`,
      read_sql: "user/insert.sql",
      param: admin,
    });

    await existCreateQuery({
      connect: conn,
      table_name: "adm_menu",
      read_sql: "menu/create.sql",
    });

    await existCreateQuery({
      connect: conn,
      table_name: "board_basic",
      read_sql: "board/create.sql",
      read_sql_config: {
        createName: "board_basic",
      },
    });

    await existCreateQuery({
      connect: conn,
      table_name: "likes",
      read_sql: "like.sql",
    });

    await existCreateQuery({
      connect: conn,
      table_name: "calendar",
      read_sql: "calendar/create.sql",
      read_sql_config: {
        createName: "calendar",
      },
    });

    await existCreateQuery({
      connect: conn,
      table_name: "calendar_dev",
      read_sql: "calendar/create.sql",
      read_sql_config: {
        createName: "calendar_dev",
      },
    });

    await existCreateQuery({
      connect: conn,
      table_name: "project",
      read_sql: "project/create.sql",
    });

    await existCreateQuery({
      connect: conn,
      table_name: "project_calendar",
      read_sql: "project/project_calendar.sql",
    });

    sql = sqlText.INSERT(
      "likes",
      "icon,type,hit",
      `("😊","good",0),("🥰","love",0),("🤔","hmm",0),("😫","no",0),("😡","angry",0)`
    );
    await conn.query(sql);

    sql = sqlText.INSERT(setting.menu);

    await existInsertQuery({
      connect: conn,
      table_name: "adm_menu",
      sql,
      overlap_where: `href="/adm" OR href="/board/basic"`,
    });

    // dummy
    let dummyUse = false; // true 로 바꾸면 dummy data 들어감
    let dummy;
    dummyUse = true;
    dummy = JSON.parse(JSON.stringify(boardDummy));
    dummy = dummy.data;

    if (dummyUse && dummy.length > 1) {
      for (let i = 0; i < dummy.length; i++) {
        let dmysql = sqlText.INSERT(
          "board_basic",
          `w_num,w_parent,subject,content,w_comment,d_time,w_time,user_id,hit,reply_count,board_type,notice`,
          `(${i + 1},${i + 1},"${dummy[i].subject}","${dummy[i].content}",0,"${
            dummy[i].time
          }","${dummy[i].time}","${dummy[i].writer}",${
            dummy[i].hit
          },0,"normal","false")`
        );
        await conn.query(dmysql);
      }
    }

    await fs.writeFileSync(".env", dbinfo);
    result = true;
    result.msg = "ok";
    // result.result = result;

    await res.status(200).send(result);
    correctMessage(routerName);
    conn.release();
  } catch (error) {
    errorMessage(routerName, error);
  }
});

router.delete("/delete", async (req, res) => {
  const routerName = req.originalUrl;
  try {
    let rows;
    let sql = `SET FOREIGN_KEY_CHECKS = 0;`;
    const conn = await db2.getConnection();
    await conn.query(sql);

    rows = await conn.query(`SHOW TABLES FROM ${process.env.DB}`);
    rows = rows[0];

    await rows.map(async (el) => {
      if (Object.values(el)[0] !== "calendar")
        await conn.query(`DROP TABLE IF EXISTS ${Object.values(el)[0]}`);
    });
    await fs.unlinkSync(".env");
    correctMessage(routerName);
    res.status(200).json({
      delete: "success",
    });
  } catch (error) {
    errorMessage(routerName, error);
  }
});

router.post("/menu", async (req, res) => {
  const routerName = req.originalUrl;
  try {
    let sql = `SELECT * FROM adm_menu`;
    const conn = await db2.getConnection();
    let rows = await conn.query(sql);
    correctMessage(routerName);
    let menu = menuFactoring(rows[0]);
    await res.status(200).json({
      menu,
      condition: "success",
    });
    await conn.release();
  } catch (error) {
    errorMessage(routerName, error);

    res.status(200).json({
      condition: "error",
    });
  }
});

router.post("/like", async (req, res) => {
  const routerName = req.originalUrl;
  try {
    const conn = await db2.getConnection();
    let sql;
    console.log(req.body);
    if (req.body.click) {
      sql = sqlText.UPDATE(
        "likes",
        `hit=${req.body.hit + 1}`,
        `type="${req.body.type}"`
      );
      await conn.query(sql);
      sql = sqlText.UPDATE("users", `event=1`, `num=${req.body.userNum}`);
    }

    sql = sqlText.SELECT("likes");
    const rows = await conn.query(sql);
    correctMessage(routerName);
    await res.status(200).json({
      data: rows[0],
      condition: "success",
    });
    await conn.release();
  } catch (error) {
    errorMessage(routerName, error);
  }
});

module.exports = router;
