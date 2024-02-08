import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "../common/commonUi";
import moment from "moment";
import axios from "axios";
import { useDispatch } from "react-redux";
import { _ProjectCalendarInfo } from "../../store/calendarSlice";

export default function ExecutionView({
  project,
  viewDate,
  closeEvent,
  userInfo,
}) {
  const urlParam = window.location.search;
  const form = useRef(null);
  const dispatch = useDispatch();
  let modalDisplay = urlParam?.split("&")[1]?.split("modal=")[1];
  const [p, setP] = useState(project);
  const navigate = useNavigate();
  let submitinit = {
    url: "/project/projectCalendar",
    project_name: project?.subject,
    userId: userInfo.id,
    subject: "",
    content: "",
    date: "",
  };

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
    form.current.subject.value = "";
    form.current.content.value = "";
    closeEvent();
  }
  function submit_(event) {
    event.preventDefault();
    const subDate = moment(viewDate).format("YYYY-MM-DD");

    form.current.subject.value = "";
    form.current.content.value = "";
    submitData.date = subDate;
    axios.post("/api/project/projectCalendar", submitData);
    navigate(-1);
  }

  useEffect(() => {
    let body = {
      url: "/project/projectCalendarInfo",
      userId: userInfo.id,
      date: moment(viewDate).format("YYYY-MM-DD"),
    };
    dispatch(_ProjectCalendarInfo(body));
  }, [viewDate]);

  return (
    <Modal
      display={!!!modalDisplay ? false : true}
      className={"calendar-modal"}
      title={`🤗 Project ${project?.subject}`}
      button={[
        { Name: "Add", Click: submit_ },
        { Name: "Close", Click: close_ },
      ]}
    >
      <form ref={form}>
        <h3>{moment(viewDate).format("MM월DD일")}</h3>
        <ul className="execution-view">
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
