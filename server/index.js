const express = require("express");
const path = require("path");
// import express from 'express';

//es6
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

app.set("port", port);

app.use(express.static(path.join(__dirname, "clent/build")));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

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
