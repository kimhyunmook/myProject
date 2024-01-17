/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useRef, useState } from "react";
import { Container2, Modal } from "../common/commonUi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function Test() {
  const [test, setTest] = useState(null);
  const [value, OnChange] = useState(new Date());
  const [modal_dis, setModal_dis] = useState(false);
  const [list, setList] = useState([]);
  const cal = useRef(null);
  const modal = useRef(null);

  useEffect(() => {
    console.log(modal.current);
  }, []);
  function dayClick() {
    setModal_dis(false);
  }

  function plus() {
    setList(list.concat("list"));
  }

  return (
    <Container2 info={{ className: "container-normal" }}>
      <Calendar
        ref={cal}
        onChange={OnChange}
        value={value}
        showNeighboringMonth={false}
        onClickDay={(value, event) => {
          setModal_dis(true);
          console.log(value);
        }}
      />
      <Modal
        display={modal_dis}
        title={"🤗 오늘의 추억"}
        button={{ Name: "닫기 번튼입니다만", Click: dayClick }}
      >
        <ul>
          <li>
            <button onClick={plus}>+</button>
          </li>
          {list.map((v, i) => {
            return (
              <li key={`list_${i}`}>
                <div className="line">
                  <label htmlFor="">영문장</label>
                  <input type="text" />
                </div>
                <div className="line">
                  <label htmlFor="">뜻</label>
                  <input type="text" />
                </div>
                <div className="line">
                  <label htmlFor="">설명</label>
                  <input type="text" placeholder="description" />
                </div>
              </li>
            );
          })}
          <li>
            <label htmlFor="test">오늘의 영단어: </label>
            <input name="test" type="text" />
          </li>
        </ul>
      </Modal>
    </Container2>
  );
}
