import { useCallback, useEffect, useRef, useState } from "react";
import { BtnArea, Container2, Modal } from "../common/commonUi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  calendarInfo,
  lookDataReset,
  notToday,
  testRequest,
} from "../../store/calendarSlice";
import util from "../../util";
import { useNavigate } from "react-router-dom";
import TestView from "./testView";

export default function ProjectS() {
  const [value, OnChange] = useState(new Date());
  const [modal_dis, setModal_dis] = useState(false);
  const listFirst = [{ type: "english" }];
  const [list, setList] = useState(listFirst);
  const cal = useRef(null);
  const curr = new Date();
  const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
  const utc = curr.getTime() + curr.getTimezoneOffset() * 60 * 1000;
  const korNow = new Date(utc + KR_TIME_DIFF);
  const format = "YYYY-MM-DD";
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const userInfo = store.userInfo.data;
  const calendar_info = store.calendarInfo;
  const [view, setView] = useState(null);
  const [view_button, setView_button] = useState({ Name: "" });
  const path = util.path();
  const navigate = useNavigate();
  const [question, setQuestion] = useState(false);

  let body = {};
  const callBack = useCallback((event) => {
    const target = event.currentTarget;
    const lt = list[target.dataset.index];
    console.log(target, list);
    switch (target.name) {
      case "subject":
        lt.subject = target.value;
        break;
      case "content":
        lt.content = target.value;
        break;
      case "description":
        lt.description = target.value;
        break;
    }
  });

  const plus = useCallback((event) => {
    event.preventDefault();
    list.length < 5
      ? setList(list.concat({ type: "english" }))
      : alert("5개 초과 입력할 수 없습니다.");
  });

  function dayClick() {
    setModal_dis(false);
    setList(listFirst);
    dispatch(lookDataReset());
  }
  function submit(event) {
    event.preventDefault();
    console.log(list);
    body = {
      userId: userInfo.id,
      data: list,
    };
    console.log(list);
    body.data.map((v, i) => {
      v.userId = userInfo.id;
      v.date = moment(korNow).format(format);
    });
    axios.post(`/api/calendar/study`, body);
    dispatch(calendarInfo({ url: `/calendar/info` }));
    setModal_dis(false);
    // setList(listFirst);
    alert("입력되었습니다.");
  }

  const calendarRef = useRef(null);
  const testRef = useRef(null);
  useEffect(() => {
    body = {
      url: `/calendar/info`,
    };
    dispatch(calendarInfo(body));
    setQuestion(calendar_info.testData?.subject);
  }, []);

  const menuClick = (event) => {
    event.preventDefault();
    let target = event.currentTarget;
    let target_href = String(target.href).replace(
      String(window.location.origin),
      ""
    );
    if (target_href !== window.location.pathname) {
      navigate(target_href);
    }
  };
  const startTest = () => {
    body = {
      userId: userInfo.id,
      type: "english",
      url: "/calendar/study_test",
    };

    dispatch(testRequest(body));
    setQuestion(true);
    navigate("?task=0");
  };

  return (
    <Container2 info={{ className: "container-normal" }}>
      <ul>
        <li>
          <a href="/project/calendar" onClick={menuClick}>
            Calendar
          </a>
        </li>
        <li>
          <a href="/project/test" onClick={menuClick}>
            Test
          </a>
        </li>
      </ul>
      {path[path.length - 1] === "calendar" ? (
        <div ref={calendarRef} className="cover-box-calendar">
          <Calendar
            ref={cal}
            onChange={OnChange}
            value={value}
            showNeighboringMonth={false}
            formatDay={(locale, date) => moment(date).format("DD")}
            onClickDay={(value, event) => {
              if (
                moment(value).format(format) === moment(korNow).format(format)
              ) {
                setModal_dis(true);
                setView("training");
                setView_button([
                  { Name: "닫기 번튼입니다만", Click: dayClick },
                  { Name: "송출 버튼입니다만", Click: submit },
                ]);
              } else {
                dispatch(
                  notToday({
                    url: `/calendar/info`,
                    date: moment(value).format(format),
                  })
                );
                setModal_dis(true);
                setView("leaned");
                setView_button({ Name: "", Click: dayClick });
              }
            }}
            tileContent={({ date, view }) => {
              let html = [];
              if (
                calendar_info.data
                  .map((v) => v.date)
                  .find((x) => x === moment(date).format(format))
              ) {
                html.push(
                  <div key={date} style={{ border: "2px solid skyblue" }}></div>
                );
              }
              return <div>{html}</div>;
            }}
          />
          <Modal
            display={modal_dis}
            title={"🤗 오늘의 영어"}
            button={view_button}
          >
            {view === "training" ? (
              <Training_view />
            ) : (
              <Leaned_view view={calendar_info.lookData} />
            )}
          </Modal>
        </div>
      ) : (
        <div ref={testRef} className="cover-box-test">
          <div className="question">
            <h3> "지금 까지 학습한 내용을 테스트 해볼게요.😏"</h3>
          </div>
          {<BtnArea info={[{ Name: "시험보기", Click: startTest }]} />}
          {question ? (
            <div className="answer">
              <TestView viewData={calendar_info.testData}></TestView>
            </div>
          ) : null}
        </div>
      )}
    </Container2>
  );
  function Training_view({}) {
    const ul = useRef(null);

    const mius = (event) => {
      event.preventDefault();
      if (list.length > 1) {
        let li = ul.current.children;
        li[li.length - 1].remove();
        list.pop();
      } else {
        alert("최소 입력 값입니다.");
      }
    };

    return (
      <form action="">
        <ul ref={ul}>
          <li>
            <BtnArea
              info={[
                { Name: "+", Click: plus },
                { Name: "-", Click: mius },
              ]}
            />
          </li>
          {list?.map((v, i) => {
            return (
              <li key={`list_${v}_${i}`}>
                <div className="line">
                  <label htmlFor="subject">영문장</label>
                  <input
                    name={"subject"}
                    type="text"
                    // value={list[i].subject}
                    onChange={callBack}
                    data-index={i}
                  />
                </div>
                <div className="line">
                  <label htmlFor="content">뜻</label>
                  <input
                    name={"content"}
                    type="text"
                    // value={list[i].content}
                    onChange={callBack}
                    data-index={i}
                  />
                </div>
                <div className="line">
                  <label htmlFor="description">설명</label>
                  <input
                    name={"description"}
                    type="text"
                    placeholder="description"
                    // value={list[i].description}
                    onChange={callBack}
                    data-index={i}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </form>
    );
  }

  function Leaned_view({ view }) {
    const Box = ({ children, title }) => {
      return (
        <div>
          <b>{title} : </b>
          {children}
        </div>
      );
    };
    return (
      <div className="leaned_view">
        <h2>학습한 내용</h2>
        {calendar_info.lookData?.length > 0 ? (
          calendar_info.lookData.map((v, i) => {
            return (
              <div className="" key={`leaned_view_${i}`}>
                <Box title={"영문장"}>{v.subject}</Box>
                <Box title={"뜻"}>{v.content}</Box>
                <Box title={"설명"}>{v.description}</Box>
              </div>
            );
          })
        ) : (
          <div>학습된 내용이 없습니다.</div>
        )}
      </div>
    );
  }
}
