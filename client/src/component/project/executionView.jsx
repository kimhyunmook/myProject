import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "../common/commonUi";
import moment from "moment";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { _ProjectCalendarInfo } from "../../store/calendarSlice";
import { ProjectMenu } from ".";
import { BtnArea } from "../common/commonUi";

export default function ExecutionView({
  project,
  viewDate,
  closeEvent,
  userInfo,
  modalDisplay = false,
}) {
  const urlParam = window.location.search;
  const form = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const store = useSelector((state) => state);
  const [list, setList] = useState([]);

  let submitinit = {
    url: "/project/projectCalendar",
    project_name: project.subject,
    userId: userInfo.id,
    subject: "",
    content: "",
    date: "",
  };
  let body = {};
  const projectDate = moment(viewDate).format("YYYY-MM-DD");
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
    if (urlParam.includes("insert")) {
      submitData.subject = "";
      submitData.content = "";
    }
    closeEvent();
  }
  function submit_(event) {
    event.preventDefault();
    const target = form.current;

    if (!!!target.subject.value) {
      alert("제목을 입력해주세요.");
      target.subject.focus();
      return;
    }
    if (!!!target.content.value) {
      alert("자세한 내용을 입력해주세요");
      target.content.focus();
      return;
    }

    submitData.date = projectDate;
    submitData.project_name = project.subject;

    let body = {
      url: "/project/projectCalendarInfo",
      userId: userInfo.id,
      projectName: project.subject,
    };
    axios.post("/api/project/projectCalendar", submitData).then((res) => {
      submitData.subject = "";
      submitData.content = "";

      dispatch(_ProjectCalendarInfo(body));
      alert("입력되었습니다.");
      navigate("?look");
    });
  }

  useEffect(() => {
    let d = store.calendarInfo.projectExecution.reduce((a, c, i) => {
      if (c.date === projectDate) {
        a.push(c);
      }
      return a;
    }, []);
    setList(d);
  }, [store, window.location.search]);

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
  function Delete(event) {
    event.preventDefault();
  }
  let modalBtn = urlParam.includes("insert")
    ? [
        { Name: "Add", Click: submit_ },
        { Name: "Close", Click: close_ },
      ]
    : [{ Name: "Close", Click: close_ }];

  return (
    <Modal
      display={!!!modalDisplay ? false : true}
      className={"calendar-modal"}
      title={`🤗 ${project?.subject}`}
      button={modalBtn}
    >
      <form ref={form}>
        <h3>{moment(viewDate).format("MM월DD일")}</h3>
        <ProjectMenu
          arr={[
            { href: `?insert`, text: "Insert" },
            { href: `?look`, text: "Look" },
          ]}
        />

        {urlParam.includes("insert") ? (
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
            {list.length === 0 ? (
              <li>
                <h3>Projectd의 상세 계획이 없습니다.</h3>
              </li>
            ) : (
              list.map((v, i) => {
                return (
                  <li key={`execution_${v}_${i}`} data-num={v.num}>
                    <p className="execution-subject">{v.subject}</p>
                    <p className="execution-content">{v.content}</p>
                    <BtnArea
                      info={[
                        {
                          Name: !!!v.achieve ? "미달성" : "달성",
                          Click: achieve,
                          className: "achieve-button",
                        },
                        { Name: "수정", Click: Fix },
                        { Name: "삭제", Click: Delete },
                      ]}
                    ></BtnArea>
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
