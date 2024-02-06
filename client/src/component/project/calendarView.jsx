import { useState, useMemo, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import { BtnArea } from "../common/commonUi";

export default function CalendarView({ att, type, dateValue }) {
  const [value, OnChange] = useState(new Date());
  const format = "YYYY-MM-DD";
  const dateMemo = useMemo(() => {
    return { start: "", last: "" };
  }, []);
  const allTarget = document.querySelectorAll(
    ".react-calendar__month-view__days__day"
  );
  const [startColor, lastColor] = [
    { background: "#aaa", font: "#fff" },
    { background: "#222", font: "#fff" },
  ];
  function colorReset() {
    [...allTarget].map((v) => {
      v.style.backgroundColor = "inherit";
      v.style.color = "inherit";
    });
  }

  const calClose = (event) => {
    event.preventDefault();
    event.currentTarget.parentNode.parentNode.parentNode.classList.remove("on");
    colorReset();
    dateMemo.start = "";
    dateMemo.last = "";
  };
  const calConfirm = (event) => {
    event.preventDefault();
    console.log(dateMemo);
    if (!!!dateMemo.start || !!!dateMemo.last) {
      alert("날짜를 지정해주세요.");
      return;
    }
    event.currentTarget.parentNode.parentNode.parentNode.classList.remove("on");
    dateValue(dateMemo);
  };

  //insert init
  let calAtt = {
    locale: "en",
    onChange: OnChange,
    className: "react-calendar-insert",
    value: value,
    next2Label: null,
    prev2Label: null,
    showNeighboringMonth: false,
    navigationAriaLive: "polite",
    formatMonthYear: (locale, date) => moment(date).format("YYYY MMMM"),
    onClickDay: (value, event) => {
      value = moment(value).format(format);
      const target = event.currentTarget;
      if (!!!dateMemo.start) {
        //start가 없는 경우
        dateMemo.start = value;
        target.style.backgroundColor = startColor.background;
        target.style.color = startColor.font;
      } else {
        if (!!dateMemo.start && !!dateMemo.last) {
          colorReset();
          dateMemo.start = value;
          target.style.backgroundColor = startColor.background;
          target.style.color = startColor.font;
          dateMemo.last = "";
        } else {
          dateMemo.last = value;
          target.style.backgroundColor = lastColor.background;
          target.style.color = lastColor.font;
        }
      }
    },
  };
  //   useEffect(() => {
  //     console.log(dateMemo);
  //   }, [dateMemo]);

  return (
    <div className="calendar-box">
      <Calendar {...calAtt} />
      <p className="date-view">
        {!!dateMemo.start
          ? `Date : ${dateMemo.start} ~ ${dateMemo.last}`
          : null}
      </p>
      <BtnArea
        info={[
          { Name: "확인", Click: calConfirm },
          { Name: "닫기", Click: calClose },
        ]}
      />
    </div>
  );
}
