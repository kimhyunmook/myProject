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
  const [state, setState] = useState("normal");
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");

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
        setText1(target.value);
        // submitData.content = target.value;
        break;
    }
  });
  const callBack2 = useCallback((event) => {
    event.preventDefault();
    const target = event.currentTarget;
    if (target.name === "content") {
      setText2(target.value);
    }
  });

  function close_() {
    if (urlParam.includes("insert")) {
      submitData.subject = "";
      setText1("");
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

    submitData.project_num = project.num;
    submitData.date = projectDate;
    submitData.project_name = project.subject;
    submitData.content = text1;

    let body = {
      url: "/project/projectCalendarInfo",
      userId: userInfo.id,
      project_name: project.subject,
      project_num: project.num,
    };
    axios.post(`${process.env.REACT_APP_DB_HOST}/api/project/projectCalendar`, submitData).then((res) => {
      console.log(res);
      submitData.subject = "";
      setText1("");

      dispatch(_ProjectCalendarInfo(body));
      alert("입력되었습니다.");
      navigate("?look");
    });
  }

  useEffect(() => {
    let d = store.calendarInfo?.projectExecution?.reduce((a, c, i) => {
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
        project_name: project.subject,
      };
      dispatch(_ProjectCalendarInfo(body));
    }
  }
  function Fix(event) {
    event.preventDefault();
    let target = event.currentTarget.parentNode.parentNode.parentNode;
    console.log(target.children[1].innerText);
    setState(`insert_${target.dataset.num}`);
    setText2(target.children[1].innerText);
  }

  function Fix2(event) {
    event.preventDefault();
    const target = event.currentTarget.parentNode.parentNode.parentNode;

    body = {
      url: "/project/projectCalendarEdit",
      num: target.dataset.num,
      project_name: project.subject,
      subject: target.children[0].children[0].value,
      content: target.children[1].children[0].value,
      userId: userInfo.id,
      achieve: null,
    };
    dispatch(_ProjectCalendarInfo(body));
    alert("수정되었습니다.");
    setState("normal");
  }

  function Delete(event) {
    event.preventDefault();
    const target = event.currentTarget.parentNode.parentNode.parentNode;

    body = {
      url: "/project/projectCalendarDelete",
      num: target.dataset.num,
      project_name: project.subject,
      userId: userInfo.id,
    };
    if (window.confirm("삭제하시겠습니까?")) {
      dispatch(_ProjectCalendarInfo(body));
      alert("삭제되었습니다.");
    }
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
      title={`${project?.subject}`}
      button={modalBtn}
      logo={true}
    >
      <form ref={form}>
        <h3 className="date">{moment(viewDate).format("MM월DD일")}</h3>
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
                placeholder={"내용"}
                value_={text1}
                change={callBack}
              ></InsertInput>
            </li>
          </ul>
        ) : (
          <ul className="execution-look-view">
            {list?.length === 0 ? (
              <li>
                <h3>Projectd의 상세 계획이 없습니다.</h3>
              </li>
            ) : (
              list.map((v, i) => {
                return (
                  <li key={`execution_${v}_${i}`} data-num={v.num}>
                    {state === `insert_${v.num}` ? (
                      <>
                        <InsertInput
                          name={"subject"}
                          value_={v.subject}
                          change={callBack2}
                        >
                          제목{" "}
                        </InsertInput>
                        <InsertInput
                          name="content"
                          value_={text2}
                          type="textarea"
                          change={callBack2}
                        ></InsertInput>
                      </>
                    ) : (
                      // look view
                      <>
                        <p className="execution-date">{v.date}</p>
                        <p className="execution-subject">{v.subject}</p>
                        <p className="execution-content">{v.content}</p>
                      </>
                    )}
                    <BtnArea
                      info={[
                        {
                          Name: !!!v.achieve ? "미달성" : "달성",
                          Click: !!!v.achieve
                            ? achieve
                            : (event) => event.preventDefault(),
                          className: !!!v.achieve
                            ? "achieve-button"
                            : "achieve-button active",
                        },
                        {
                          Name: "수정",
                          Click: state.includes("insert") ? Fix2 : Fix,
                          className: "achieve-button",
                        },
                        {
                          Name: "삭제",
                          Click: Delete,
                          className: "achieve-button",
                        },
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
  change = null,
  focus,
  click,
  keypress,
  dataIndex,
  children,
  value_,
  placeholder,
  className = "line",
  label,
  autocomplete = "on",
}) {
  return (
    <div className={className}>
      {type === "textarea" ? (
        <textarea
          name={name}
          placeholder={placeholder}
          defaultValue={value_}
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
          // onBlur={focus}
          onFocusCapture={focus}
          onClick={click}
          onKeyDown={keypress}
          data-index={dataIndex}
          required
          autoComplete={autocomplete}
        />
      )}
      <label htmlFor="description">{!!!label ? children : label}</label>
      <span></span>
      {!!!label ? label : children}
    </div>
  );
}
