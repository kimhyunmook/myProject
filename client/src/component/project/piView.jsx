import { useDispatch } from "react-redux";
import { BtnArea } from "../common/commonUi";
import CalendarView from "./calendarView";
import { InsertInput } from "./executionView";
import { useRef, useState } from "react";
import { _Project } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";

export default function ProjectInsertView({ userInfo, title }) {
  const form = useRef(null);
  const [date, setDate] = useState("");
  const dispatch = useDispatch();
  const id = !!!userInfo ? "미확인" : userInfo.id;
  const navigate = useNavigate();
  const dateView = (event) => {
    event.preventDefault();
    const cal = event.currentTarget.nextSibling.nextSibling.nextSibling;
    if (cal.className.includes("on")) cal.classList.remove("on");
    else cal.classList.add("on");
  };
  const dateValue = (t) => {
    setDate(`${t.start} ~ ${t.last}`);
  };
  function dateHandle(event) {
    event.preventDefault();
  }
  //   const dateHandler = ()
  const submit_ = (event) => {
    event.preventDefault();
    const t = form.current;
    let triger = false;
    let body = {
      url: "/project/add",
      userId: id,
      type: t.type.value,
      subject: t.subject.value,
      date: date,
      content: t.content.value,
      description: t.description.value,
    };
    if (!!!body.type) {
      alert("type을 입력해주세요");
      t.type.focus();
      return;
    }
    if (!!!body.subject) {
      alert("이름을 입력해주세요");
      t.subject.focus();
      return;
    }
    if (!!!body.date) {
      alert("기간을 정해주세요");
      t.date.focus();
      return;
    }
    if (!!!body.content) {
      alert("계획의 내용을 입력해주세요");
      t.content.focus();
      return;
    }
    dispatch(_Project(body));
    alert("입력되었습니다.");
    navigate("/project/calendar");
    window.location.reload();
  };

  return (
    <form className="pi-view" ref={form}>
      {!!!title ? (
        <>
          <h2 className="">
            안녕하세요 <b className="userid">{id}</b>님 <br />
            현재 진행 중인 Project가 없습니다.
          </h2>
          <p>새로운 Project를 만들어 계획을 세우고 관리하며 실천해보세요.</p>
        </>
      ) : (
        <>
          <h2>새로운 프로젝트</h2>
          {/* 명언 넣어볼 예정 */}
          <p className="wiseSaying">새로운 Project를 입력해주세요</p>
        </>
      )}
      <InsertInput
        className="box"
        name={"type"}
        label={"Project type"}
      ></InsertInput>
      <InsertInput
        className="box"
        name={"subject"}
        label={"Project 이름"}
      ></InsertInput>
      <InsertInput
        className="box"
        name="date"
        click={dateView}
        label={"Project 기간"}
        value_={date}
        change={dateHandle}
        keypress={(event) => event.preventDefault()}
      >
        <CalendarView dateValue={dateValue} />
      </InsertInput>
      <InsertInput
        className="box"
        name={"content"}
        label={"Project 내용"}
      ></InsertInput>
      <InsertInput
        type="textarea"
        className="box textarea"
        name={"description"}
        // label={"Project 설명"}
        placeholder={"Project 설명"}
      ></InsertInput>
      <button className="pi-createbtn" onClick={submit_}>
        Create
      </button>
    </form>
  );
}
