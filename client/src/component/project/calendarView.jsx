import { useState,useMemo, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
export default function CalendarView({ att, type }) {
    const [value, OnChange] = useState(new Date());
    const format = "YYYY-MM-DD";
    const dateMemo = useMemo(()=>{
        return {start:"",last:""}
    },[])

    //insert init
    let calAtt = {
        locale: "en",
        onChange: OnChange,
        className: 'react-calendar-insert',
        value: value,
        next2Label: null,
        prev2Label: null,
        showNeighboringMonth: false,
        navigationAriaLive: "polite",
        formatMonthYear: (locale, date) =>
            moment(date).format("YYYY MMMM"),
        onClickDay: (value, event) => {
            value = moment(value).format(format)
            console.log(dateMemo);
            // console.log(value, event.currentTarget);
            if(!!!dateMemo.start) {
                dateMemo.start = value;
            } else {
                dateMemo.last = value;
            }
            if(event.currentTarget) {}
        }
    }
    useEffect(()=>{
        console.log(dateMemo)
    },[dateMemo])
    
    return (
        <Calendar {...calAtt}  />
    )
}