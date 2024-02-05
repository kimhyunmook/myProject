import { useDispatch } from "react-redux";
import { BtnArea } from "../common/commonUi";
import CalendarView from "./calendarView";
import { InsertInput } from "./leaningView";
import { useRef,useState } from "react";

export default function ProjectInsertView({ userInfo }) {
    const [date,setDate] =useState("");
    const dispatch = useDispatch();
    const id = !!!userInfo ? '미확인' : userInfo.id
    const dateView = (event) => {
        event.preventDefault();
        const cal = event.currentTarget.nextSibling.nextSibling.nextSibling;
        if (cal.className.includes('on')) cal.classList.remove('on');
        else cal.classList.add('on');
    }
    const dateValue =(event) =>{
        event.preventDefault();
    }
    const submit_ = (event) => {
        event.preventDefault();
    }
    const calClose = (event) =>{
        event.preventDefault();
        event.currentTarget.parentNode.parentNode.parentNode.classList.remove('on');
    }
    const calConfirm = (event)=>{
        event.preventDefault()
    }

    return (
        <form className="project-insert-view">
            <h2 className="">
                안녕하세요 <b className="userid">{id}</b>님 <br />
                현재 진행 중인 Project가 없습니다.
            </h2>
            <p>
                새로운 Project를 만들고 계획을 세우고 관리하며 실천해보세요.
            </p>
            <InsertInput className="box" label={'Project 이름'}>
            </InsertInput>
            <InsertInput className="box" click={dateView} label={'기간'} value={date} change={dateValue}>
                <div className="calendar-box">
                    <CalendarView />
                    <BtnArea info={[{Name:"확인",Click:calConfirm},{Name:"닫기",Click: calClose}]} />
                </div>
            </InsertInput>
            <button className="" onClick={submit_}>Create</button>
        </form>
    )
}