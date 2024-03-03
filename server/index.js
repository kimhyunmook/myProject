const express = require("express");
const path = require("path");
const cors = require('cors');

//es6
// import express from 'express';
// import userRouter from './router/userRouter';
// import boardRouter from './router/boardRouter';
// import settingRouter from './router/settingRouter';
// import admRouter from './router/admRouter';

//Router
const userRouter = require("./router/userRouter");
const boardRouter = require("./router/boardRouter");
const settingRouter = require("./router/settingRouter");
const admRouter = require("./router/admRouter");
const calendarRouter = require("./router/calendar");
const projectRouter = require("./router/project");
// const xlsxUpload = require('./router/xlsxUpload');

const port = require("../port");
const app = express();

app.use(express.json())
app.use(cors());

// app.set("port", port);

app.use(
  express.urlencoded({
    extended: true,
  })
);

// app.get("/download")

app.use("/api/users", userRouter);
app.use("/api/board", boardRouter);
app.use("/api/setting", settingRouter);
app.use("/api/adm", admRouter);
app.use("/api/calendar", calendarRouter);
app.use("/api/project", projectRouter);
// app.use('/api/upload', xlsxUpload);
app.all("*", (req, res) => {
  res
    .status(404)
    .send(`<h1 style=text-align:center>ERROR - 페이지 찾을 수 없음</h1>`);
});

app.listen(port, () => {
  console.log(`server start ${port}`);
});
