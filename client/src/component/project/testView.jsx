import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function TestView({ viewData }) {
  const testView = useRef(null);
  const navigate = useNavigate();
  const [w, setW] = useState("1100%");
  const [coverStyle, setCoverStyle] = useState({
    position: "absolute",
    top: 0,
    left: 0,
    // display: "flex",
    width: "100%",
    height: "300px",
    border: "1px solid green",
    transition: ".5s",
  });
  const rcn = testView.current?.className; // rootClassName
  let scroe = [];
  useEffect(() => {
    setW(100 * viewData.length + "%");
  }, []);

  const containerStyle = {
    width: "100%",
    height: "300px",
    border: "1px solid #000",
    overflow: "hidden",
    textAlign: "center",
    position: "relative",
  };
  let boxStyle = {
    width: "100%",
    height: "100%",
    let: 0,
    top: 0,
    border: "1px solid red",
    position: "absolute",
    background: "#fff",
  };
  const next = useCallback((event) => {
    let target = event.currentTarget;
    if (target.parentNode.className !== `${rcn}-lastbox`)
      target.parentNode.style.zIndex = -1;
    else {
      alert("점수는요!");
    }
  });
  console.log(viewData);
  return (
    <div className="test-view" style={containerStyle} ref={testView}>
      <div className="test-view-container" style={coverStyle}>
        <Box
          className="box"
          style={{ ...boxStyle, zIndex: viewData.length + 1 }}
        >
          <h3>문제가 준비됐어요. 시험을 시작할까요?</h3>
        </Box>
        {viewData.map((v, i) => {
          return (
            <Box
              key={`${rcn}_div_${i}`}
              className="box"
              style={{ ...boxStyle, zIndex: viewData.length - i }}
            >
              <div className={`${rcn}-description`}>
                <h3>
                  {viewData.length}문제 중 {i + 1}번째 문제
                </h3>
                <p></p>
              </div>

              <div className={`${rcn}-box-input`}>
                <h4>{v.subject}</h4>
                <label htmlFor="answer">답 :</label>
                <input type="text" name={"answer"} />
              </div>
            </Box>
          );
        })}
        <Box
          className="lastbox"
          style={{ ...boxStyle, zIndex: 0 }}
          button={"결과 확인 🫣"}
        ></Box>
      </div>
    </div>
  );
  function Box({ className, children, style = {}, button = "Next" }) {
    return (
      <div className={`${rcn}-${className}`} style={style}>
        {children}
        <button onClick={next}>{button}</button>
      </div>
    );
  }
}
