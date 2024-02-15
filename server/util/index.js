const fs = require("fs");
const bcrypt = require("bcrypt");
const saltRounds = 10; // export
const { db2 } = require("../db");

function readSQL(fileName, config) {
  let file = fs.readFileSync(`server/mysql/sql/${fileName}`, {
    encoding: "utf8",
    flag: "r",
  });
  if (config !== undefined) {
    file = file.split("?");
    file = file[0] + config.createName + file[1];
  }
  return file;
}

async function existCreateQuery(
  config = {
    connect,
    table_name,
    read_sql,
    read_sql_config,
    sql,
  }
) {
  let { connect, table_name, read_sql, read_sql_config, sql } = config;

  if (read_sql_config !== undefined)
    if (table_name !== read_sql_config.createName)
      throw console.error(
        "table_name 과 read_sql_config.createName이 다릅니다."
      );

  try {
    await connect.query(`SELECT * FROM ${table_name}`);
    errorMessage(`##{${table_name}}## create table exist`);
  } catch (noExist) {
    if (sql !== undefined) await connect.query(sql);
    else await connect.query(readSQL(read_sql, read_sql_config));
    correctMessage(`##{${table_name}}## create table`);
  }
}

async function existInsertQuery(
  config = {
    connect,
    table_name,
    read_sql,
    read_sql_config,
    sql,
    overlap_where,
    param,
    count,
  }
) {
  let {
    connect,
    table_name,
    read_sql,
    read_sql_config,
    sql,
    overlap_where,
    param,
    count,
  } = config;
  const res = await connect.query(
    `SELECT * FROM ${table_name} WHERE ${overlap_where}`
  );
  const cont_or = overlap_where.split("or").length;
  const cont_and = overlap_where.split("and").length;
  let cont = 1;

  if (count === undefined) {
    if (cont_or > 1) cont = cont_or;
    if (cont_and > 1) cont = cont_and;
  }
  if (res[0].length >= cont) {
    errorMessage(`##{${table_name}}## exist`);
  } else {
    if (sql !== undefined) await connect.query(sql);
    else await connect.query(readSQL(read_sql, read_sql_config), param);
    correctMessage(`##{${table_name}}## target create done`);
  }
}

function getDate() {
  const time = new Date();
  const year = time.getFullYear();
  let month = time.getMonth() + 1;
  let day = time.getDate();
  let hour = time.getHours();
  let minutes = time.getMinutes();
  let seconds = time.getSeconds();
  if (month < 10) month = `${month}`;
  if (day < 10) day = `${day}`;
  if (hour < 10) hour = `0${hour}`;
  if (minutes < 10) minutes = `0${minutes}`;
  if (seconds < 10) seconds = `0${seconds}`;

  return `${year}.${month}.${day} ${hour}:${minutes}:${seconds}`;
}

const mes = {
  result: "RESULT:",
  router_path: "ROUTER_PATH:",
};

function correctMessage(routerName, message) {
  if (message === undefined) message = "";
  if (routerName === undefined) routerName = message;
  console.log(
    `${getDate()} - [${mes.result} SUCCESS] ${mes.router_path} ${routerName} `,
    message
  );
}

function errorMessage(routerName, message) {
  if (message === undefined) message = "";
  if (routerName === undefined) routerName = message;
  console.error(
    `${getDate()} - [${mes.result} ERROR] ${mes.router_path} ${routerName} \n`,
    message
  );
}

function commaString(target = [], keys = false) {
  let sum = "";
  target.map((el, index) => {
    if (keys === true) {
      if (index === target.length - 1) sum += el;
      else sum += el + ",";
    } else {
      if (index === target.length - 1) sum += `'${el}'`;
      else sum += `'${el}'` + ",";
    }
  });

  return sum;
}

function menuFactoring(target) {
  let i, x;
  let menu = [];

  for (i = 0; i < target.length; i++) {
    target[i].depthChildren = [];
    for (x = 0; x < target.length; x++) {
      if (target[i].menu_id === target[x].parent) {
        target[i].depthChildren.push(target[x]);
        console.log(target[x]);
      }
    }
    console.log(target[i].depthChildren);
    if (target[i].depth === 0) menu.push(target[i]);
  }

  return menu;
}

function arrSql(target, type) {
  let key = "";
  let value = "";
  let list = target.list === undefined ? target : target.list;
  key += Object.keys(list[0]);

  for (let i = 0; i < list.length; i++) {
    let obj = Object.values(list[i]);
    obj = obj.reduce((a, c, i) => {
      if (isNaN(c) || c === "") a.push(`"${c}"`);
      else a.push(Number(c));
      return a;
    }, []);
    i === list.length - 1
      ? (value += `(${obj.join(",")})`)
      : (value += `(${obj.join(",")}),`);
  }
  if (type === "key") return key;
  else return value;
}
const sqlText = {
  /**
   * if Array >> insert = {table_name:String, list:Array}
   * @param {*} tableName INSERT INTO ???
   * @param {*} key tableName (???) VALUES
   * @param {*} value VALUES ???
   * @returns
   */
  INSERT: (tableName = "", key = "", value = "") => {
    let sql;
    // console.log(tableName)
    Array.isArray(tableName.list)
      ? (sql = `INSERT INTO ${tableName.table_name} (${arrSql(
          tableName,
          "key"
        )}) VALUES ${arrSql(tableName)}`)
      : (sql = `INSERT INTO ${tableName} (${key}) VALUES ${value};`);
    return sql;
  },
  SELECT: (tableName = "", where, scope = "*") => {
    let sql = `SELECT ${scope} FROM ${tableName}`;
    if (where !== undefined) sql += ` WHERE ${where}`;
    return sql;
  },
  UPDATE: (tableName = "", set = "", where) => {
    let sql = `UPDATE ${tableName} SET ${set}`;
    if (where !== undefined) sql += ` WHERE ${where}`;
    return sql;
  },
  DELETE: (tableName = "", where) => {
    let sql = `DELETE FROM ${tableName}`;
    if (where !== undefined) sql += ` WHERE ${where}`;
    return sql;
  },
};

const pw_askiicode = (index) => {
  let i;
  let arr = [];
  for (i = 48; i <= 57; i++) {
    arr.push(i);
  }

  for (i = 65; i <= 90; i++) {
    arr.push(i);
  }

  if (index !== undefined) {
    return String.fromCharCode(arr[index]);
  }

  return arr;
};

module.exports = {
  sqlText,
  readSQL,
  existCreateQuery,
  existInsertQuery,
  getDate,
  correctMessage,
  errorMessage,
  commaString,
  menuFactoring,
  pw_askiicode,
  saltRounds,
};
