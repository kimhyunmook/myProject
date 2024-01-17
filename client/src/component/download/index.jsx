import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { settingDownLoad } from "../../actions/adm_action";
import Container from "../common/container";
import { useDispatch } from "react-redux";
import { _Condtion } from "../../store/menuSlice";
import { Container2 } from "../common/commonUi";

export default function NeedDownLoad(props) {
  const form = useRef();
  const settingCover = useRef();
  const [formStyle, setFormStyle] = useState({});
  const [coverStyle, setCoverStyle] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pathTask = window.location.href.split("?task=")[1];

  const next1 = (event) => {
    // agree
    event.preventDefault();
    navigate("/download?task=1");
  };
  const next2 = (event) => {
    event.preventDefault();
    settingDownLoad({
      url: "dbinfo",
      host: host,
      user: dbUser,
      password: dbPassword,
      db: db,
    }).payload.then((res) => {
      navigate("/download?task=2");
    });
  };
  const next3 = (event) => {
    event.preventDefault();
    let body = { url: "/setting/menu" };
    dispatch(_Condtion(body));
    setTimeout(() => {
      window.location.href = "/";
    }, 100);
  };

  useEffect(() => {
    let widLen = settingCover.current.childNodes.length;
    setCoverStyle({
      width: form.current.offsetWidth * widLen,
      transform: `translate3D(-${form.current.offsetWidth * pathTask}px,0,0)`,
    });
    window.addEventListener("resize", () => {
      setCoverStyle({
        width: form.current.offsetWidth * widLen,
        transform: `translate3D(-${form.current.offsetWidth * pathTask}px,0,0)`,
      });
    });
  }, [pathTask]);

  const [host, setHost] = useState("");
  const onHostHandler = (event) => {
    let target = event.currentTarget;
    setHost(target.value);
  };
  const [dbUser, setDbUser] = useState("");
  const onUserHandler = (event) => {
    setDbUser(event.currentTarget.value);
  };
  const [dbPassword, setDbPassword] = useState("");
  const onPasswordHandler = (event) => {
    setDbPassword(event.currentTarget.value);
  };
  const [db, setDb] = useState("");
  const onDbHandler = (event) => {
    setDb(event.currentTarget.value);
  };

  const [containerStyle, setContianerStyle] = useState({
    overflowY: "initial",
    display: "flex",
    justifyCotent: "center",
    alignItems: "center",
  });
  return (
    <Container className="download" style={containerStyle}>
      <form ref={form} action="" style={formStyle} className="">
        <div ref={settingCover} className="setting_cover" style={coverStyle}>
          <OverlapUi button="다음" onClick={next1}>
            <h1>
              안녕하세요 <br />
              다운로드가 필요합니다.
            </h1>
            <p className="terms">이용약관</p>
            <h3>동의하시나요?</h3>
          </OverlapUi>
          <OverlapUi button="확인" onClick={next2}>
            <h1>DB 정보를 입력해주세요</h1>
            <ul>
              <InputLi
                type="text"
                value={host}
                onChange={onHostHandler}
                placeholder={"domain"}
              >
                host
              </InputLi>
              <InputLi
                type="text"
                value={dbUser}
                onChange={onUserHandler}
                placeholder={"db_id"}
              >
                user
              </InputLi>
              <InputLi
                type="password"
                value={dbPassword}
                onChange={onPasswordHandler}
                placeholder={"db_pw"}
              >
                password
              </InputLi>
              <InputLi
                type="text"
                value={db}
                onChange={onDbHandler}
                placeholder={"db_name"}
              >
                database
              </InputLi>
            </ul>
          </OverlapUi>
          <OverlapUi button="확인" onClick={next3}>
            <h1>설치 완료되었습니다. ^^</h1>
          </OverlapUi>
        </div>
      </form>
    </Container>
  );
}

const OverlapUi = (props) => {
  return (
    <div>
      {props.children}
      <div className="btnArea">
        <button className="button" onClick={props.onClick}>
          {props.button}
        </button>
      </div>
    </div>
  );
};

const InputLi = (props) => {
  return (
    <li>
      <label htmlFor={props.id}>
        <span>{props.children}</span>
      </label>
      <div className="insert-box">
        <input
          type={props.type}
          value={props.value}
          onChange={props.onChange}
          placeholder={props.placeholder}
        />
      </div>
    </li>
  );
};
