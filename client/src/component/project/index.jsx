import { BtnArea, Container2, Modal } from "../common/commonUi";
import { useCallback, useEffect, useRef, useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { FontAwsome } from "../common/fontawsome";
import {
  _ProjectCalendarInfo,
  _ProjectInfo,
  addPlan,
} from "../../store/calendarSlice";
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
  const executionData = calendar_info?.projectExecution;
  const [executionDate, setExeDate] = useState(
    executionData?.map((v) => v.date)
  ); //date
  const projectTarget = projectData?.filter((v) => {
    if (urlParam?.split("project=")[1]?.split("&").includes(v.subject))
      return v;
  })[0];
  const targetDate = !!projectTarget?.date
    ? projectTarget?.date
    : "0000-00-00 ~ 0000-00-00";
  const [start, last] = targetDate?.split("~").map((v) => v.trim());
  const [value, OnChange] = useState(new Date());
  const [clickDate, setClickDate] = useState("");
  const calendarRef = useRef(null);

  const cal = useRef(null);
  const format = "YYYY-MM-DD";
  const dispatch = useDispatch();
  const path = util.path();
  const navigate = useNavigate();
  const today = moment(new Date()).format(format);
  const projectName = urlParam?.split("project=")[1];
  const [todayExecutionData, setTodayExecutionDaya] = useState([]);
  let executionBody = {
    url: "/project/projectCalendarInfo",
    projectName: projectName,
    userId: userInfo.id,
  };
  let body = {};

  useEffect(() => {
    body = {
      url: "/project/info",
      userId: userInfo.id,
    };
    dispatch(_ProjectCalendarInfo(executionBody));
    dispatch(_ProjectInfo(body));
    setExeDate(executionData.map((v) => v.date));
  }, []);

  const projectInfoHandle = (event) => {
    event.preventDefault();
    projectData?.map((v, i) => {
      if (v.subject === event.currentTarget.value) {
        navigate(`?project=${v.subject}`);
      } else if (!!!event.currentTarget.value) navigate("");
    });

    //이거 왜이럼 ?
    executionBody = {
      url: "/project/projectCalendarInfo",
      projectName: projectName,
      userId: userInfo.id,
    };
    console.log(executionBody);

    dispatch(_ProjectCalendarInfo(executionBody));
    setExeDate(executionData.map((v) => v.date));
  };
  const closeModal = (event) => {
    navigate(urlParam.split("&modal=display", 1).join(""));
  };

  console.log(calendar_info);

  const calednarAtt = {
    locale: "en",
    className: "react-calendar-main",
    ref: cal,
    onChange: OnChange,
    value: value,
    next2Label: null,
    prev2Label: null,
    showNeighboringMonth: false,
    navigationAriaLive: "polite",
    formatMonthYear: (locale, date) => moment(date).format("YYYY MMMM"),
    showNavigation: true,
    onClickDay: (value, event) => {
      let dateValue = moment(value).format(format);
      if (dateValue < start || dateValue > last) {
        alert("Project 기간이 아닙니다.");
        return;
      } else {
        if (dateValue < today) {
          alert("지난 날에는 입력이 불가능합니다.");
          return;
        }
      }
      // dispatch(
      //   addPlan({
      //     url: `/project/add`,
      //     userId: userInfo.id,
      //     date: dateValue,
      //   })
      // );
      setTodayExecutionDaya(
        executionData.filter((x) => (x.date === dateValue ? x : null))
      );
      setClickDate(value);
      navigate(`${urlParam}&modal=display`);
    },
    tileContent: ({ date, view }) => {
      let value = moment(date).format(format);
      let className = "dateBg";

      if (value === today) className += " today";
      if (start === value) className += " start";
      let exeDate = [
        ...new Set(executionDate.filter((x) => (x === value ? value : null))),
      ][0];
      let test = [
        ...new Set(
          executionData
            ?.map((v) => (value === v.date ? v.date : null))
            .filter((x) => x !== null)
        ),
      ][0];

      if (last === value) className += " last";
      if (start <= value && last >= value) {
        if (value === exeDate || test === value) {
          className += " exe";
          return (
            <div className={className}>
              <div className="exe_box">
                <FontAwsome data={"fa-clover"} />
              </div>
            </div>
          );
        }
        return <div className={className}></div>;
      }
    },
  };

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
            <ProjectMenu
              arr={[
                { href: "/project/calendar", text: "🗓️ Calendar" },
                { href: "/project/add", text: "📝 Add Project" },
              ]}
            ></ProjectMenu>

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
                  value={projectName}
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
                <Calendar {...calednarAtt} />
                <ExecutionView
                  project={!!!projectTarget ? {} : projectTarget}
                  projectInfo={todayExecutionData}
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

export function ProjectMenu({ arr = [{ href: "", text: "" }] }) {
  const navigate = useNavigate();
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

  return (
    <ul className="project-menu">
      {arr.map((v, i) => {
        return (
          <li key={`proejct_li_${v.text}_${i}`}>
            <a href={v.href} onClick={menuClick}>
              {v.text}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
