import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "../common/commonUi";
import moment from "moment";
import axios from "axios";
import { useDispatch } from "react-redux";
import { _ProjectCalendarInfo } from "../../store/calendarSlice";
import { ProjectMenu } from ".";
import { BtnArea } from "../common/commonUi";

export default function ExecutionView({
  project,
  projectInfo = [],
  viewDate,
  closeEvent,
  userInfo,
}) {
  const urlParam = window.location.search;
  const initParma = `?project=${project?.subject}&modal=display`;
  const form = useRef(null);
  const dispatch = useDispatch();
  let modalDisplay = urlParam?.split("&")[1]?.split("modal=")[1];
  const navigate = useNavigate();
  let submitinit = {
    url: "/project/projectCalendar",
    project_name: project?.subject,
    userId: userInfo.id,
    subject: "",
    content: "",
    date: "",
  };
  let body = {};
  const type = urlParam.split("type=");

  const submitData = useMemo(() => {
    return submitinit;
  }, []);
  const callBack = useCallback((event) => {
    event.preventDefault();
    const target = event.currentTarget;

    switch (target.name) {
      case "subject":
        submitData.subject = target.value;
        break;
      case "content":
        submitData.content = target.value;
        break;
    }
  });
  function close_() {
    if (type.includes("insert")) {
      form.current.subject.value = "";
      form.current.content.value = "";
    }
    closeEvent();
  }
  function submit_(event) {
    event.preventDefault();
    const subDate = moment(viewDate).format("YYYY-MM-DD");
    const target = form.current;

    if (!!!target.subject.value) {
      alert("빈칸을 입력해주세요.");
      target.subject.focus();
      return;
    }
    if (!!!target.content.value) {
      alert("빈칸을 입력해주세요");
      target.content.focus();
      return;
    }
    form.current.subject.value = "";
    form.current.content.value = "";
    submitData.date = subDate;
    axios.post("/api/project/projectCalendar", submitData);
    let body = {
      url: "/project/projectCalendarInfo",
      userId: userInfo.id,
      projectName: project?.subject,
    };
    console.log(body);
    dispatch(_ProjectCalendarInfo(body));
    alert("입력되었습니다.");
    navigate(urlParam.split("&modal=display", 1));
  }
  function achieve(event) {
    event.preventDefault();
    if (window.confirm("달성으로 변경 하시겠습니까?")) {
      body = {
        url: "/project/projectCalendarEdit",
        num: event.currentTarget.parentNode.parentNode.parentNode.dataset.num,
        achieve: "달성",
        userId: userInfo.id,
      };
      dispatch(_ProjectCalendarInfo(body));
      event.currentTarget.classList.add("active");
      navigate(0);
    }
  }
  function Fix(event) {
    event.preventDefault();
  }

  return (
    <Modal
      display={!!!modalDisplay ? false : true}
      className={"calendar-modal"}
      title={`🤗 ${project?.subject}`}
      button={[
        { Name: "Add", Click: submit_ },
        { Name: "Close", Click: close_ },
      ]}
    >
      <form ref={form}>
        <h3>{moment(viewDate).format("MM월DD일")}</h3>
        <ProjectMenu
          arr={[
            { href: `${initParma}&type=insert`, text: "Insert" },
            { href: `${initParma}&type=look`, text: "Look" },
          ]}
        />

        {type.includes("insert") ? (
          <ul className="execution-insert-view">
            <li>
              <InsertInput
                name="subject"
                value_={submitData.subject}
                change={callBack}
              >
                제목
              </InsertInput>
            </li>
            <li>
              <InsertInput
                className="textarea"
                type="textarea"
                name="content"
                placeholder={"오늘 한 일"}
                value_={submitData.content}
                change={callBack}
              ></InsertInput>
            </li>
          </ul>
        ) : (
          <ul className="execution-look-view">
            {projectInfo.length === 0 ? (
              <li>
                <h3>Projectd의 상세 계획이 없습니다.</h3>
              </li>
            ) : (
              projectInfo.map((v, i) => {
                return (
                  <li key={`execution_${v}_${i}`} data-num={v.num}>
                    <p className="execution-subject">{v.subject}</p>
                    <p className="execution-content">{v.content}</p>
                    {/* <p className="execution-achieve"></p> */}
                    <BtnArea
                      info={[
                        {
                          Name: !!!v.achieve ? "미달성" : "달성",
                          Click: achieve,
                          className: "achieve-button",
                        },
                        { Name: "수정", Click: Fix },
                      ]}
                    ></BtnArea>
                    {/* <button className="achieve-button" onClick={achieve}>
                      {!!!v.achieve ? "미달성" : "달성"}
                    </button> */}
                  </li>
                );
              })
            )}
          </ul>
        )}
      </form>
    </Modal>
  );
}

export function InsertInput({
  name,
  type = "text",
  change,
  focus,
  click,
  keypress,
  dataIndex,
  children,
  value_,
  placeholder,
  className = "line",
  label,
}) {
  return (
    <div className={className}>
      {type === "textarea" ? (
        <textarea
          name={name}
          placeholder={placeholder}
          onChange={change}
          onClick={click}
        ></textarea>
      ) : (
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          defaultValue={value_}
          onChange={change}
          onBlur={focus}
          onFocus={focus}
          onClick={click}
          onKeyDown={keypress}
          data-index={dataIndex}
          required
        />
      )}
      <label htmlFor="description">{!!!label ? children : label}</label>
      <span></span>
      {!!!label ? label : children}
    </div>
  );
}
