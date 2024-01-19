/* eslint-disable react-hooks/rules-of-hooks */
import { useCallback, useEffect, useRef, useState } from "react";
import { Container2, Modal } from "../common/commonUi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { calendarInfo } from "../../store/calendarSlice";

export default function Test() {
  const [value, OnChange] = useState(new Date());
  const [modal_dis, setModal_dis] = useState(false);
  const listFirst = [{ type: "english" }];
  const [list, setList] = useState(listFirst);
  const cal = useRef(null);
  const curr = new Date();
  const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
  const utc = curr.getTime() + curr.getTimezoneOffset() * 60 * 1000;
  const korNow = new Date(utc + KR_TIME_DIFF);
  let format = "YYYY-MM-DD";
  const [ans, setAns] = useState("");
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const calendar_info = store.calendarInfo;
  // console.log(calendar_info);

  let body = {};
  const callBack = useCallback((event) => {
    const target = event.currentTarget;
    const lt = list[target.dataset.index];
    switch (target.name) {
      case "subject":
        lt.subject = target.value;
        break;
      case "content":
        lt.content = target.value;
        break;
      case "description":
        lt.description = target.value;
        break;
    }
  });
  useEffect(() => {
    body = {
      url: `/calendar/info`,
    };
    dispatch(calendarInfo(body));
  }, []);

  function dayClick() {
    setModal_dis(false);
    setList(listFirst);
  }
  async function submit(event) {
    event.preventDefault();
    body = {
      data: list,
    };
    body.data.map((v, i) => {
      v.date = moment(korNow).format(format);
    });
    await axios.post(`/api/calendar/study`, body);
    dispatch(calendarInfo({ url: `/calendar/info` }));
    setModal_dis(false);
    alert("입력되었습니다.");
  }

  function plus(event) {
    event.preventDefault();
    list.length < 5
      ? setList(list.concat({ type: "english" }))
      : alert("5개 초과 입력할 수 없습니다.");
  }

  return (
    <Container2 info={{ className: "container-normal" }}>
      <Calendar
        ref={cal}
        onChange={OnChange}
        value={value}
        showNeighboringMonth={false}
        formatDay={(locale, date) => moment(date).format("DD")}
        onClickDay={(value, event) => {
          moment(value).format(format) === moment(korNow).format(format)
            ? setModal_dis(true)
            : alert("오늘 날짜만 입력이 가능합니다.");
        }}
        tileContent={({ date, view }) => {
          let html = [];
          if (
            calendar_info.data
              .map((v) => v.date)
              .find((x) => x === moment(date).format(format))
          ) {
            html.push(
              <div key={date} style={{ border: "2px solid skyblue" }}></div>
            );
          }
          return <div>{html}</div>;
        }}
      />
      <Modal
        display={modal_dis}
        title={"🤗 오늘의 영어"}
        button={[
          { Name: "닫기 번튼입니다만", Click: dayClick },
          { Name: "송출 버튼입니다만", Click: submit },
        ]}
      >
        <form action="">
          <ul>
            <li>
              <button className="addButton" onClick={plus}>
                +
              </button>
            </li>
            {list.map((v, i) => {
              return (
                <li key={`list_${i}`}>
                  <div className="line">
                    <label htmlFor="subject">영문장</label>
                    <input
                      name={"subject"}
                      type="text"
                      onChange={callBack}
                      data-index={i}
                    />
                  </div>
                  <div className="line">
                    <label htmlFor="content">뜻</label>
                    <input
                      name={"content"}
                      type="text"
                      onChange={callBack}
                      data-index={i}
                    />
                  </div>
                  <div className="line">
                    <label htmlFor="description">설명</label>
                    <input
                      name={"description"}
                      type="text"
                      placeholder="description"
                      onChange={callBack}
                      data-index={i}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </form>
      </Modal>
    </Container2>
  );
}
