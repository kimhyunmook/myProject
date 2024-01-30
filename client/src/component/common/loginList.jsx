import List from "./list";
import {
  faCircleXmark,
  faFaceSmileWink,
  faScrewdriverWrench,
  faUser,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { _Logout } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";

function LoginList(props) {
  const [icon, setIcon] = useState("😊");
  const store = useSelector((state) => state);
  const userInfo = store.userInfo;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandle = async (event) => {
    event.preventDefault();
    let body = {
      id: userInfo.data.id,
      token: userInfo.data.token,
    };
    dispatch(_Logout(body));
    await navigate("/");
  };

  useEffect(() => {
    if (userInfo.login) {
    }
  }, []);

  let loginStyle = {};

  if (userInfo.login) {
    return (
      <ul className={"login-box"} style={loginStyle}>
        <li className="id">
          <b>
            {userInfo.data.role === 1 ? (
              <FontAwesomeIcon icon={faScrewdriverWrench} />
            ) : (
              icon
            )}
          </b>
          <b className="id-text">{userInfo.data.nickname}</b>
        </li>
        <li className="icon-box">
          <ul className="icon-list">
            <List
              text={<FontAwesomeIcon icon={faUser} />}
              href={"/myPage"}
              description="마이페이지"
            />
            <li>
              <a onClick={logoutHandle} className="logout">
                <FontAwesomeIcon icon={faCircleXmark} />
              </a>
            </li>
          </ul>
        </li>
      </ul>
    );
  } else {
    loginStyle = {
      width: "110px",
    };
    return (
      <ul className={"login-box"} style={loginStyle}>
        <List
          text={<FontAwesomeIcon icon={faUserPlus} />}
          href={"/register"}
          description="회원가입"
        />
        <List text={`login`} href={`/login`} class_name={``} />
      </ul>
    );
  }
}

export default LoginList;
