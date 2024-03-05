import { useCallback, useEffect, useRef, useState } from "react";
import { BtnArea, Container2, Modal } from "../common/commonUi";
import "react-loading-skeleton/dist/skeleton.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  addPlan,
  calendarInfo,
  lookDataReset,
  testRequest,
} from "../../store/calendarSlice";
import util from "../../util";
import { useNavigate } from "react-router-dom";
import TestView from "./testView";
import Auth from "../common/Auth";
import LeaningView from "./leaningView";

export default function ProjectS() {
  const [value, OnChange] = useState(new Date());
  const [modal_dis, setModal_dis] = useState(false);
  const listFirst = [{ type: "english" }];
  const [list, setList] = useState([{ type: "english" }]);
  const cal = useRef(null);
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
  const listRef = useRef(list);
  let task = window.location.search.split("task=")[1];
  let urlParma = window.location.search.split("?");

  let body = {};
  const callBack = useCallback((event) => {
    const target = event.currentTarget;
    const lt = list[target.dataset.index];
    switch (target.name) {
      case "type":
        lt.type = target.value;
        break;
      case "subject":
        lt.subject = target.value;
        break;
      case "content":
        lt.content = target.value;
        break;
      case "description":
        lt.description = target.value;
        break;
      case "color":
        lt.color = target.value;
        break;
    }
    setList(list);
    listRef.current = list;
  });
  const [insertLength, setInsertLength] = useState(1);

  // 추가 될 기능
  // function plushandle(event) {
  //   event.preventDefault();
  //   if (list.length < 5) {
  //     setList(list.concat({ type: "english" }));
  //     setInsertLength((i) => i + 1);
  //     navigate(`?inserLength=${insertLength}`);
  //   } else alert("5개 초과 입력할 수 없습니다.");
  // }
  // const miushandle = (event) => {
  //   event.preventDefault();
  //   if (list.length > 1) {
  //     let li = ul.current.children;
  //     console.log("ddd", list.splice(list.length - 1, 1));
  //     setList(list.splice(list.length - 1, 1));
  //     console.log(list);
  //   } else {
  //     alert("최소 입력 값입니다.");
  //   }
  // };

  function closeModal() {
    setModal_dis(false);
    setList([{}]);
    dispatch(lookDataReset());
    navigate("/project/calendar");
  }

  function submit_(event) {
    event.preventDefault();
    console.log(listRef.current);
    body = {
      userId: userInfo.id,
      kind: window.location.search.split("?")[1],
      data: listRef.current,
    };
    let triger = true;
    function triger_confirm(target, text) {
      if (target === "" || target === undefined) {
        triger = false;
        alert(text);
        return;
      }
    }
    body.data.map((v, i) => {
      triger_confirm(v.type, "계획의 종류를 입력해주세요");
      triger_confirm(v.subject, "계획의 제목을 입력해주세요");
      triger_confirm(v.content, "내용을 입력해주세요");
      if (v.description === undefined) v.description = "";
      v.userId = userInfo.id;
    });

    console.log(body);
    if (triger) {
      setList(listFirst);
      window.location.reload();
      axios.post(`${process.env.REACT_APP_DB_HOST}/api/calendar/add`, body);
      dispatch(calendarInfo({ url: `/calendar/info` }));
      setModal_dis(false);
      alert("입력되었습니다.");
    }
  }

  const calendarRef = useRef(null);
  const testRef = useRef(null);
  const [modalTitle, setModalTitle] = useState("");
  let btn;

  useEffect(() => {
    body = {
      userId: userInfo.id,
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
      if (target_href === "/project/calendar") {
        if (Number(task) >= 1)
          if (!window.confirm("시험이 초기화 됩니다. 괜찮으신가요?")) {
            return;
          }
      }
      setQuestion(false);
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

  const behavior = (event) => {
    event.preventDefault();
    let type = event.currentTarget.className;
    navigate(`?${type}`);
    setView(type);
  };

  const back = (event) => {
    event.preventDefault();
    navigate("?behavior");
    setView("behavior");
  };

  console.log("view", view);
  return (
    <Container2
      info={{
        className: "container-normal",
        style: { background: "#ffefef", maxWidth: "100%" },
      }}
    >
      <Auth>
        <ul className="project-menu">
          <li>
            <a href="/project/calendar" onClick={menuClick}>
              🗓️ Calendar
            </a>
          </li>
          <li>
            <a href="/project/test" onClick={menuClick}>
              📝 Test
            </a>
          </li>
        </ul>
        {path[path.length - 1] === "calendar" ? (
          <div ref={calendarRef} className="cover-box-calendar">
            <Calendar
              locale="en"
              ref={cal}
              onChange={OnChange}
              value={value}
              next2Label={null}
              prev2Label={null}
              showNeighboringMonth={false}
              navigationAriaLive="polite"
              formatMonthYear={(locale, date) =>
                moment(date).format("YYYY MMMM")
              }
              showNavigation={true}
              onClickDay={(value, event) => {
                navigate("?behavior");
                dispatch(
                  addPlan({
                    url: `/calendar/info`,
                    userId: userInfo.id,
                    date: moment(value).format(format),
                  })
                );
                listRef.current.map((v) => {
                  v.date = moment(value).format(format);
                });

                setModal_dis(true);
                setView("behavior");
                setModalTitle(moment(value).format("MM월DD일"));
              }}
              tileContent={({ date, view }) => {
                let d = moment(date).format(format);
                let html = [];
                calendar_info.data?.map((v, i) => {
                  if (d === v.date)
                    html.push(
                      <div
                        key={d + i}
                        className="calendar-dot"
                        style={{ background: v.color }}
                      ></div>
                    );
                });
                return <div>{html}</div>;
              }}
            />
            <Modal
              display={modal_dis}
              className={"calendar-modal"}
              title={`🤗 ${modalTitle} Plan`}
              button={
                view === "behavior"
                  ? { Name: "close", Click: closeModal }
                  : view === "plan"
                  ? [
                      { Name: "Add", Click: submit_ },
                      { Name: "Back", Click: back },
                      { Name: "Close", Click: closeModal },
                    ]
                  : [
                      { Name: "Back", Click: back },
                      {
                        Name: "Close",
                        Click: closeModal,
                      },
                    ]
              }
            >
              {view === "behavior" ? (
                <ul className="behavior-list">
                  <li>
                    <a className="look" href="/look" onClick={behavior}>
                      Plan 보기
                    </a>
                  </li>
                  <li>
                    <a className="plan" href="/insert" onClick={behavior}>
                      Plan 추가하기
                    </a>
                  </li>
                </ul>
              ) : view === "plan" ? (
                <LeaningView target={list} change={callBack} />
              ) : (
                <Leaned_view view={calendar_info.lookData} />
              )}
            </Modal>
          </div>
        ) : (
          <div ref={testRef} className="cover-box-test">
            {question ? (
              <div className="answer">
                <TestView viewData={calendar_info.testData}></TestView>
              </div>
            ) : (
              <div className="question">
                <h3>
                  <b className="userId">{userInfo.id}</b>
                  님 안녕하세요! <br />
                  지금 까지 학습한 내용들을 Test 할거에요.
                  <br />
                  문제를 풀고 점수를 확인하세요 😏
                </h3>
                <button onClick={startTest}>Test Start</button>
              </div>
            )}
          </div>
        )}
      </Auth>
    </Container2>
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
      {view?.length > 0 ? (
        view.map((v, i) => {
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
