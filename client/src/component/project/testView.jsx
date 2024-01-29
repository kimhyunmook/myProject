import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import util from "../../util";

export default function TestView({ viewData }) {
  const testView = useRef(null);
  const navigate = useNavigate();
  const [w, setW] = useState("1100%");
  const [coverStyle, setCoverStyle] = useState({
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "300px",
    transition: ".5s",
  });
  const rcn = testView.current?.className; // rootClassName
  let scroe = useMemo(() => {
    return [];
  }, []);
  let task = window.location.search.split("task=");
  task = Number(task[1]);

  useEffect(() => {
    setW(100 * viewData.length + "%");
  }, []);

  const containerStyle = {
    width: "100%",
    // height: "300px",
    overflow: "hidden",
    textAlign: "center",
    position: "relative",
  };
  let boxStyle = {
    width: "100%",
    height: "100%",
    let: 0,
    top: 0,
    position: "absolute",
    zIndex: -1,
  };
  const [answer, setAnswer] = useState("");
  const next = useCallback((event) => {
    let target = event.currentTarget;
    let pcl = target.parentNode.className;
    if (pcl !== `${rcn}-lastbox`) {
      if (!pcl.includes(`${rcn}-firstbox`)) {
        if (answer === target.parentNode.dataset.answer) scroe.push(true);
        else scroe.push(false);
      }
      //   if (Number.isNaN(task)) task = 0;
      navigate(`?task=${task + 1}`);
    } else {
      let scroe2 = scroe.reduce((a, c) => {
        if (c) a += 100;
        return a;
      }, 0);
      scroe2 = scroe2 / scroe.length;
      console.log(scroe2);
      alert("점수는요!" + scroe2 + "점입니다.");
    }
  });

  const inputHandle = useCallback((event) => {
    let target = event.currentTarget;
    setAnswer(target.value);
  });
  return (
    <div className="test-view" style={containerStyle} ref={testView}>
      <div className="test-view-container" style={coverStyle}>
        <Box
          className={`${rcn}-box ${rcn}-firstbox`}
          style={
            task === 0 || Number.isNaN(task)
              ? { ...boxStyle, zIndex: 0, opacity: 1 }
              : boxStyle
          }
          click_={next}
        >
          <h3>문제가 준비됐어요. TEST를 시작할까요?</h3>
        </Box>
        {viewData.map((v, i) => {
          let reStyle = { ...boxStyle, zIndex: 1 };
          return (
            <Box
              key={`${rcn}_div_${i}`}
              className={`${rcn}-box`}
              click_={next}
              style={i + 1 === task ? reStyle : boxStyle}
              answer={v.content}
            >
              <div className={`${rcn}-description`}>
                <h3>
                  "{viewData.length}"문제 중 {i + 1}번째 문제
                </h3>
                <p className={`${rcn}-question`}>{v.subject}</p>
              </div>
              <div className={`${rcn}-box-input inputs`}>
                <input
                  type="text"
                  name={"answer"}
                  onChange={inputHandle}
                  required
                />
                <label htmlFor="answer">답 :</label>
              </div>
            </Box>
          );
        })}
        <Box
          className={`${rcn}-lastbox`}
          style={task > viewData.length ? { ...boxStyle, zIndex: 1 } : boxStyle}
          click_={next}
          button={"결과 확인 "}
        >
          <h3>
            수고하셨어요~ <br />
            결과를 확인 할려면 결과 확인 버튼을 눌러주세요
          </h3>
        </Box>
      </div>
    </div>
  );
}

function Box({
  className,
  children,
  style = {},
  click_,
  button = "Next",
  answer = "",
}) {
  return (
    <div className={`${className}`} style={style} data-answer={answer}>
      {children}
      <button onClick={click_}>{button}</button>
    </div>
  );
}
