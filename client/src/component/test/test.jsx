/* eslint-disable react-hooks/rules-of-hooks */
import { useCallback, useEffect, useRef, useState } from "react";
import { Container2, Modal } from "../common/commonUi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { getDate } from "../../actions/tool_action";
import moment from "moment";
import axios from "axios";

export default function Test() {
  const [test, setTest] = useState(null);
  const [value, OnChange] = useState(new Date());
  const [modal_dis, setModal_dis] = useState(false);
  const [list, setList] = useState([{ type: 'english' }]);
  const cal = useRef(null);
  const modal = useRef(null);
  const curr = new Date();
  const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
  const utc = curr.getTime() + (curr.getTimezoneOffset() * 60 * 1000);
  const korNow = new Date(utc + KR_TIME_DIFF);
  console.log(korNow)
  let body = {}
  const callBack = useCallback((event) => {
    const target = event.currentTarget;
    const lt = list[target.dataset.index]
    switch (target.name) {
      case 'subject': lt.subject = target.value;
        break;
      case 'content': lt.content = target.value;
        break;
      case 'description': lt.description = target.value;
        break;
    }

  })
  useEffect(() => {
  }, []);

  function dayClick() {
    setModal_dis(false);
  }
  async function submit(event) {
    event.preventDefault();
    body = {
      data: list
    }
    body.data.map((v, i) => {
      v.date = korNow
    })
    await axios.post(`/api/calendar/study`, body)
  }

  function plus(event) {
    event.preventDefault();
    setList(list.concat({ type: "english" }));
  }

  return (
    <Container2 info={{ className: "container-normal" }}>
      <Calendar
        ref={cal}
        onChange={OnChange}
        value={value}
        showNeighboringMonth={false}
        formatDay={(locale, date) => moment(date).format('DD')}
        onClickDay={(value, event) => {
          setModal_dis(true);
          console.log(value);
        }}
      />
      <Modal
        display={modal_dis}
        title={"🤗 오늘의 추억"}
        button={[{ Name: "닫기 번튼입니다만", Click: dayClick }, { Name: '송출 버튼입니다만', Click: submit }]}
      >
        <form action="">
          <ul>
            <li>
              <button className="addButton" onClick={plus}>+</button>
            </li>
            {list.map((v, i) => {
              return (
                <li key={`list_${i}`}>
                  <div className="line">
                    <label htmlFor="subject">영문장</label>
                    <input name={"subject"} type="text" onChange={callBack} data-index={i} />
                  </div>
                  <div className="line">
                    <label htmlFor="content">뜻</label>
                    <input name={"content"} type="text" onChange={callBack} data-index={i} />
                  </div>
                  <div className="line">
                    <label htmlFor="description">설명</label>
                    <input name={'description'} type="text" placeholder="description" onChange={callBack} data-index={i} />
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
