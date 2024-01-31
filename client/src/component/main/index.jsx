import React, { useState, useLayoutEffect, useEffect, useRef } from "react";
import { admDelete, needDownLoad } from "../../actions/adm_action";
import { FontAwsome } from "../common/fontawsome";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../../store/boardSlice";
import Slider2 from "../common/slider/slider";
import { _Condtion } from "../../store/menuSlice";
import D3C from "../common/d3/d3";
import AdminSide from "../common/adminSide";
import Canvas from "../common/canvas/canvas";
import { _GetLike } from "../../store/likeSlice";
import { Container2 } from "../common/commonUi";
import Likes from "../aside/likes";

function Main() {
  const store = useSelector((state) => state);
  const [menu, setMenu] = useState(store.menuInfo.data);
  const [likeInfo, setLikeInfo] = useState(store.likeInfo.data);
  const [userInfo, setUserInfo] = useState({});
  const dispatch = useDispatch();
  const section1 = useRef(null);
  const section2 = useRef(null);
  const [winSize, setWinSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  let body;

  useEffect(() => {
    setUserInfo(store.userInfo.data);
    setLikeInfo(store.likeInfo.data);
  }, [store]);

  useLayoutEffect(() => {
    body = {};

    needDownLoad(body).payload.then((res) => {
      if (!res.Download) window.location.href = "/download?task=0";
    });

    const header = document.querySelector("header");

    header.classList.add("index");
    const handleResize = () => {
      setWinSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("reisze", () => null);
    };
  }, []);

  let ContainerStyle = {
    width: "100%",
    marginLeft: 0,
  };

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
  };

  return (
    <Container2 info={{ style: ContainerStyle }}>
      <Section
        index="1"
        useRef={section1}
        style={{ height: winSize.height + "px" }}
      >
        <div className="bg">
          <div className="content-cover">
            <div className="textbox">
              <h2>My Project</h2>
              <p>
                오늘의 계획을 Calendar에 저장하고 Test를 통해 하루를 돌아보세요.
              </p>
            </div>
            <div className="imgbox">
              <img src="../img/bg_2.jpg" alt="" />
              <div className="disNo">
                Bich Tran님의 사진: https://www.pexels.com/ko-kr/photo/1059383/
              </div>
            </div>
          </div>
        </div>
      </Section>
      <Section index="4" className="useLang">
        <div className="content-cover">
          <h2>Used Language</h2>

          <Slider2 {...settings}>
            <List>
              {/* <ImgBox imgSrc={"html.png"}>
              <h3>HTML</h3>
              <a href="https://ko.wikipedia.org/wiki/HTML"></a>
            </ImgBox> */}
              <ImgBox imgSrc={"react.png"}>
                <h3>React</h3>
                <a href="https://ko.wikipedia.org/wiki/%EB%A6%AC%EC%95%A1%ED%8A%B8_(%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8_%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC)"></a>
              </ImgBox>
              <ImgBox imgSrc={"css.png"}>
                <h3>CSS3</h3>
                <a href="https://ko.wikipedia.org/wiki/CSS"></a>
              </ImgBox>
              <ImgBox imgSrc={"js.png"}>
                <h3>Javascript</h3>
              </ImgBox>
              <ImgBox imgSrc={"nodejs.png"}>
                <h3>NodeJs</h3>
                <a href="https://ko.wikipedia.org/wiki/Node.js"></a>
              </ImgBox>
            </List>
            <List>
              <ImgBox imgSrc={"mysql.png"}>
                <h3>Mysql</h3>
              </ImgBox>
              <ImgBox imgSrc={"sass.png"}>
                <h3>Sass</h3>
              </ImgBox>
              {/* <ImgBox imgSrc={"java.png"}>
              <h3>Java</h3>
            </ImgBox> */}
            </List>
          </Slider2>

        </div>
      </Section>
      <Section index={10}>
        <Likes
          style={{
            // backgroundColor: "#4b1010a6",
            backgroundColor: "#ffec8e",
          }}
          titleStyle={{
            // color: "#fee04d",
            fontSize: "50px",
            letterSpacing: "0px",
          }}
          descriptionStyle={
            {
              // color: "#fee04d",
            }
          }
          like={likeInfo}
          userInfo={store.userInfo}
          description={"좋아요를 남겨주세요"}
        >
          LIKE
        </Likes>
      </Section>

      {/* <Section useRef={section2} index='2' name="Mastery">
                <D3C
                    data={[
                        { label: "HTML ", value: 95, fill: '' },
                        { label: "CSS", value: 95, fill: '' },
                        { label: 'SASS', value: 80, fill: '' },
                        { label: "Javascript", value: 85, fill: '' },
                        { label: "React", value: 80, fill: '' },
                        { label: "NodeJS", value: 70, fill: '' },
                        { label: 'mysql', value: 70, fill: '' },
                        { label: 'JAVA', value: 50 },
                        { label: 'PHP', value: 50 }
                    ]}
                    width={winSize.width}
                    height={450}
                ></D3C>
            </Section> */}

      {/* <Section index="5" name="Career">

        <List
          type="1"
          img_position="back"
          name="프론트앤드"
          img="frontend.jpg"
          img_alt='<a href="https://kr.freepik.com/free-vector/frontend-development-concept-website-interface-design-improvement-web-page-programming-coding-and-testing-it-profession-isolated-flat-vector-illustration_28158111.htm#query=%ED%94%84%EB%A1%A0%ED%8A%B8%EC%95%A4%EB%93%9C%20%EA%B0%9C%EB%B0%9C&position=0&from_view=search&track=country_rows_v1">작가 vector4stock</a> 출처 Freepik'
          data={section5Data[0]}
        />
        <List
          type="1"
          name="백앤드"
          img_position="front"
          img="backend.jpg"
          img_alt='<a href="https://kr.freepik.com/free-vector/back-end-typographic-header-software-development-process-website-interface-design-improvement-programming-and-coding-it-profession-isolated-flat-vector-illustration_25579589.htm#query=%EB%B0%B1%EC%95%A4%EB%93%9C%20%EA%B0%9C%EB%B0%9C&position=2&from_view=search&track=country_rows_v1">작가 vector4stock</a> 출처 Freepik'
          data={section5Data[1]}
        />
        <List
          type="1"
          img_position="back"
          name="Bixby"
          img="bixby.jpg"
          img_alt=""
          data={section5Data[2]}
        />
      </Section> */}
    </Container2>
  );
}

function List({ children, type, name, img_position, img, img_alt, data = [] }) {
  if (type === "1")
    children = (
      <div className="flex-box content-box">
        {img_position === "front" ? (
          <img className="frontImg" src={`../img/${img}`} alt={img_alt} />
        ) : null}
        <div className="text-box">
          <h3>{name}</h3>
          <ul>
            {data.map((el, index) => {
              return (
                <li key={index}>
                  <p>{el}</p>
                </li>
              );
            })}
          </ul>
          {children}
        </div>
        {img_position === "back" ? (
          <img className="backImg" src={`../img/${img}`} alt="" />
        ) : null}
      </div>
    );

  return (
    <div className="list">
      <div className="flex-box">{children}</div>
    </div>
  );
}

function Section(props) {
  return (
    <section
      ref={props.useRef}
      id={`section${props.index}`}
      style={props.style}
    >
      <article className="section-pad">
        {props.name !== undefined ? <h2>{props.name}</h2> : null}
        {props.children}
      </article>
    </section>
  );
}

const ImgBox = (props) => {
  const img = props.imgSrc;
  const img_class = props.imgSrc.split(".")[0];
  return (
    <div className={`imgBox ${img_class}`}>
      <img src={`../img/${img}`} alt={props.alt} />
      {props.children}
    </div>
  );
};

export default Main;
