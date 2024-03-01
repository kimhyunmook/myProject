import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from "react-router-dom";
import { _Login } from "../../store/userSlice";
import { Container2 } from "../common/commonUi";
import { FontAwsome } from "../common/fontawsome";

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const store = useSelector(state => state);
    const userInfo = store.userInfo;
    const [login_Id, setLoginId] = useState("");
    const [login_Password, setLoginPassword] = useState("");

    const onIdChangeHandler = (event) => {
        let value = event.currentTarget.value
        setLoginId(value)
    }
    const onPasswordChangeHandler = (event) => {
        let value = event.currentTarget.value
        setLoginPassword(value)
    }
    // const reducer = useSelector(state => state);

    const loginHandler = async (event) => {
        event.preventDefault();
        let body = {
            id: login_Id,
            password: login_Password
        }
        console.log(body);
        dispatch(_Login(body));
        // if (userInfo.message === 'ID_NO_EXIST' || userInfo.message === 'PW_ERROR')
        // await alert('ID or password 가 틀립니다.')
    }

    useEffect(() => {
        if (userInfo.login) navigate('/')
    }, [store])

    return (
        <Container2 info={{ onePage: true }}>
            <div className="login">
                <h2>
                    로그인
                </h2>
                <form onSubmit={loginHandler} className="loginForm">
                    <ul>
                        <Cover name="id" text={<FontAwsome data={"fa-user"} />}>
                            <input type="text" value={login_Id} name="id" placeholder="id" onChange={onIdChangeHandler} />
                        </Cover>
                        <Cover name="password" text={<FontAwsome data={"fa-unlock-keyhole"} />}>
                            <input type="password" value={login_Password} name="password" placeholder="password" onChange={onPasswordChangeHandler} />
                        </Cover>
                    </ul>
                    <div className="btnArea">
                        <input className="button" type="submit" value="로그인" />
                    </div>
                </form>
                <div className="supplementary-services">
                    <Link to={"/login/search?type=id"}>
                        아이디 찾기
                    </Link>
                    <Link to={"/login/search?type=password"}>
                        비밀번호 찾기
                    </Link>
                    <Link to={"/register"}>
                        회원가입
                    </Link>
                </div>
            </div>
        </Container2 >
    )
}

const Cover = (props) => {
    return (
        <li className={props.name}>
            <label htmlFor={props.name}>{props.text}</label>
            {props.children}
        </li>
    )
}

export default Login