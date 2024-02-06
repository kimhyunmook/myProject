import { useCallback, useEffect, useRef, useState } from "react";
import { BtnArea, Container2, Modal } from "../common/commonUi";
import "react-loading-skeleton/dist/skeleton.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  _ProjectInfo,
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
import ProjectInsertView from "./piView";

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
  let haveProject = calendar_info?.projectData;
  let task = window.location.search.split("task=")[1];

  let body = {};
  const callBack = useCallback((event) => {
    const target = event.currentTarget;
    const lt = list[target.dataset.index];
    switch (target.name) {
      case "type":
        lt.project = target.value;
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
  useEffect(() => {
    body = {
      url: "/project/info",
      userId: userInfo.id,
    };
    dispatch(_ProjectInfo(body));
  }, []);
  console.log(store.calendarInfo.projectData);

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

    if (triger) {
      setList(listFirst);
      window.location.reload();
      axios.post(`/api/calendar/add`, body);
      dispatch(calendarInfo({ url: `/calendar/info` }));
      setModal_dis(false);
      alert("입력되었습니다.");
    }
  }

  const calendarRef = useRef(null);
  const [modalTitle, setModalTitle] = useState("");

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

  return (
    <Container2
      info={{
        className: "container-normal",
        style: { background: "#ffefef", maxWidth: "100%" },
      }}
    >
      <Auth>
        {haveProject.length ===0 ? (
          <ProjectInsertView userInfo={userInfo} />
        ) : (
          <>
            <ul className="project-menu">
              <li>
                <a href="/project/calendar" onClick={menuClick}>
                  🗓️ Calendar
                </a>
              </li>
              <li>
                <a href="/project/add" onClick={menuClick}>
                  📝 Add Project
                </a>
              </li>
            </ul>
            {path[path.length - 1] === "calendar" ? (
              <div ref={calendarRef} className="cover-box-calendar">
                <Calendar
                  locale="en"
                  className={"react-calendar-main"}
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
              <ProjectInsertView userInfo={userInfo} />
            )}
          </>
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
