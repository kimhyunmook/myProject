import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useState, useLayoutEffect, useEffect } from "react";
import Main from "./component/main";
import Header from "./component/common/header";
import Register from "./component/user/register";
import Login from "./component/user/login";
import MyPage from "./component/user/myPage";
import UserEdit from "./component/user/edit";
import Board from "./component/board/board";
import Write from "./component/board/write";
import ContentBoard from "./component/board/[num]";
import ModifyBoard from "./component/board/modify";
import ADM from "./component/adm";
import SearchUser from "./component/user/search";
// import WriteGallery from './component/board/write-gallery';
import NeedDownLoad from "./component/download";
import "../src/css/main.css";
import "../src/component/common/canvas/canvas.css";
import Footer from "./component/common/footer";
import About from "./component/about";
import ProjectS from "./component/project";
import Test from "./component/project/test";

function App() {
  const [headerCofirm, setHeaderCofirm] = useState(true);
  const path = window.location.pathname;
  useEffect(() => {
    let path = window.location.pathname.split("/");
    if (path[1] === "download") {
      setHeaderCofirm(false);
    } else {
      setHeaderCofirm(true);
    }
  }, [path]);
  return (
    <Router>
      {headerCofirm === true ? <Header /> : null}
      <Routes>
        <Route path="/test" element={<Test />} />

        <Route path="/" element={<Main />} />
        <Route path="/adm" element={<ADM />} />
        <Route path="/download" element={<NeedDownLoad />} />
        <Route path="/project/:type" element={<ProjectS />} />

        {/* user */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/myPage" element={<MyPage />} />
        <Route path="/myPage/edit" element={<UserEdit />} />
        <Route path="/login/search" element={<SearchUser />} />

        {/* about */}
        <Route path="/about" element={<About />} />

        {/* board */}
        <Route path="/board/:name/:page" element={<Board />} />
        <Route path="/board/:name/write" element={<Write />} />
        <Route path={`/board/:name/contents/:num`} element={<ContentBoard />} />
        <Route path={`/board/:name/modify/:num`} element={<ModifyBoard />} />
        {/* <Route path={`/board/gallery/:name/write`} element={<WriteGallery />} /> */}
      </Routes>
      {headerCofirm === true ? <Footer /> : null}
    </Router>
  );
}

export default App;
