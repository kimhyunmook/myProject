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

    if (event.type === "focus") cal.classList.add("on");
  };
  const dateValue = (t) => {
    setDate(`${t.start} ~ ${t.last}`);
  };
  function dateHandle(event) {
    event.preventDefault();
  }
  const submit_ = (event) => {
    event.preventDefault();
    const t = form.current;
    let body = {
      url: "/project/add",
      userId: id,
      type: t.type.value,
      subject: t.subject.value,
      date: date,
      content: t.content.value,
      description: t.description.value,
    };
    function emptyConfirm(obj = {}) {
      if (!!!obj.target) {
        alert(obj.alert);
        obj.focus.focus();
        return;
      }
    }

    emptyConfirm({
      target: body.type,
      alert: "type을 입력해주세요",
      focus: t.type,
    });
    emptyConfirm({
      target: body.subject,
      alert: "Project 이름을 입력해주세요.",
      focus: t.type,
    });
    emptyConfirm({
      target: body.date,
      alert: "기간을 정해주세요.",
      focus: t.date,
    });
    emptyConfirm({
      target: body.content,
      alert: "Project 목표를 정해주세요.",
      focus: t.content,
    });

    dispatch(_Project(body));
    alert("입력되었습니다.");
    // navigate("/project/calendar");
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
        focus={dateView}
        label={"Project 기간"}
        value_={date}
        change={dateHandle}
        keypress={(event) => event.preventDefault()}
        autocomplete="off"
      >
        <CalendarView dateValue={dateValue} />
      </InsertInput>
      <InsertInput
        className="box"
        name={"content"}
        label={"Project 목표"}
      ></InsertInput>
      <InsertInput
        type="textarea"
        className="box textarea"
        name={"description"}
        // label={"Project 설명"}
        placeholder={"Project 설명"}
      ></InsertInput>
      <BtnArea info={{ Name: "Create", Click: submit_ }}></BtnArea>
    </form>
  );
}
