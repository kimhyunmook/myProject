import { useCallback, useEffect, useRef, useState } from "react";
import { BtnArea, Container2, Modal } from "../common/commonUi";
import "react-loading-skeleton/dist/skeleton.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { _ProjectInfo, addPlan } from "../../store/calendarSlice";
import util from "../../util";
import { useNavigate } from "react-router-dom";
import Auth from "../common/Auth";
import ProjectInsertView from "./piView";
import ExecutionView from "./executionView";

export default function ProjectS() {
  const urlParam = window.location.search;
  const store = useSelector((state) => state);
  const userInfo = store.userInfo.data;
  const calendar_info = store.calendarInfo;
  const projectData = calendar_info?.projectData;
  const projectTarget = projectData?.filter((v) => {
    if (urlParam?.split("project=")[1]?.split("&").includes(v.subject))
      return v;
  })[0];
  const [value, OnChange] = useState(new Date());
  const [clickDate, setClickDate] = useState("");

  console.log(store.calendarInfo.projectExecution);
  const cal = useRef(null);
  const format = "YYYY-MM-DD";
  const dispatch = useDispatch();
  const path = util.path();
  const navigate = useNavigate();
  const today = moment(new Date()).format(format);

  let body = {};

  useEffect(() => {
    body = {
      url: "/project/info",
      userId: userInfo.id,
    };
    dispatch(_ProjectInfo(body));
  }, []);

  const calendarRef = useRef(null);

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
  const projectInfoHandle = (event) => {
    event.preventDefault();
    projectData?.map((v, i) => {
      if (v.subject === event.currentTarget.value) {
        navigate(`?project=${v.subject}`);
      } else if (!!!event.currentTarget.value) navigate("");
    });
  };
  const closeModal = () => navigate(-1);

  return (
    <Container2
      info={{
        className: "container-normal",
        style: {
          background: "#feded0",
          maxWidth: "100%",
          padding: "50px 0",
        },
      }}
    >
      <Auth>
        {projectData?.length === 0 ? (
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
              <div
                ref={calendarRef}
                className="cover-box-calendar"
                style={{ backgroundColor: "#feded0" }}
              >
                <select
                  name="project-select"
                  className="project-select"
                  onChange={projectInfoHandle}
                  value={urlParam?.split("project=")[1]}
                >
                  <option value="">Project를 선택해주세요</option>
                  {projectData?.map((v, i) => {
                    return (
                      <option key={`${v}_${i}`} value={v.subject}>
                        {v.subject}
                      </option>
                    );
                  })}
                </select>
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
                    let dateValue = moment(value).format(format);
                    if (today > dateValue) {
                      alert("Project 기간이 아닙니다.");
                      return;
                    }
                    dispatch(
                      addPlan({
                        url: `/calendar/info`,
                        userId: userInfo.id,
                        date: dateValue,
                      })
                    );

                    setClickDate(value);
                    navigate(`${urlParam}&modal=display`);
                  }}
                  tileContent={({ date, view }) => {
                    let value = (date = moment(date).format(format));
                    let targetDate = !!projectTarget?.date
                      ? projectTarget?.date
                      : "0000-00-00 ~ 0000-00-00";
                    let className = "dateBg";
                    const [start, last] = targetDate
                      ?.split("~")
                      .map((v) => v.trim());

                    if (value === today) className += " today";
                    if (start === value) className += " start";
                    if (last === value) className += " last";
                    if (start <= value && last >= value) {
                      return <div className={className}></div>;
                    }
                  }}
                />
                <ExecutionView
                  project={!!!projectTarget ? {} : projectTarget}
                  userInfo={userInfo}
                  viewDate={clickDate}
                  closeEvent={closeModal}
                />
              </div>
            ) : (
              <ProjectInsertView userInfo={userInfo} title={true} />
            )}
          </>
        )}
      </Auth>
    </Container2>
  );
}
