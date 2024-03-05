import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterUi, Li, Gender } from "./ui/userUi";
import { FontAwsome } from "../common/fontawsome";
import axios from "axios";
import { _Register } from "../../store/userSlice";
// import { useDispatch } from 'react-redux';
import { Container2 } from "../common/commonUi";
import util from "../../util";
import { api } from "../../actions/type";

//오래된 코드 수정 필요함
function Register() {
  const navigate = useNavigate();

  // state
  const [_Id, setId] = useState("");
  const [_Password, setPassword] = useState("");
  const [_Password2, setPassword2] = useState("");
  const [Name, setName] = useState("");
  const [nickName, setNickName] = useState("");
  const [Email, setEmail] = useState("");
  const [Phone, setPhone] = useState("");
  // const [gender, setGender] = useState("");
  const callBack = useCallback((event) => {
    event.preventDefault();
    const t = event.currentTarget
    let v;
    switch (t.name) {
      case "id":
        v = util.id(event)
        setId(v);
        break;
      case "password":
        v = util.id(event)
        setPassword(v);
        break;
      case "password2":
        v = util.id(event)
        setPassword2(v);
        break;
      case "name":
        setName(t.value);
        break;
      case "nickname":
        setNickName(t.value);
        break;
      case "email":
        v = util.id(event)
        setEmail(v);
        break;
      case "phone":
        v = util.phoneNumber(event)
        setPhone(v)
        break;

    }
  })
  const form = document.forms[0];

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (_Password !== _Password2) {
      alert("비밀번호가 다릅니다.");
      return;
    }

    // 순성 중요
    let body = {
      id: _Id,
      password: _Password,
      name: Name,
      nickName: nickName,
      email: Email,
      phone: Phone,
      gender: form.gender.value,
    };

    axios.post(`${api}/users/signup`, body).then((res) => {
      if (res.data.signUp) {
        alert("안녕하세요 회원 가입을 축하드립니다.");
        window.location.href = "/";
      } else if (res.data.errorType === "idOverlap") alert("아이디 중복");

    });
  };

  return (
    <Container2 info={{ className: "container-normal" }}>
      <RegisterUi name="회원가입" submit={onSubmitHandler} submitBtn="회원가입">
        <Li name="id">
          <input
            required
            type="text"
            value={_Id}
            name="id"
            placeholder="ID"
            onChange={callBack}
          />
        </Li>
        <Li name="password">
          <input
            required
            type="password"
            value={_Password}
            name="password"
            placeholder="Password"
            onChange={callBack}
          />
        </Li>
        <Li name="password2">
          <input
            required
            type="password"
            value={_Password2}
            name="password2"
            placeholder="Password 확인"
            onChange={callBack}
          />
        </Li>
        <Li name="name">
          <input
            required
            type="text"
            value={Name}
            name="name"
            placeholder="Name"
            onChange={callBack}
          />
        </Li>
        <Li name="nickname">
          <input
            required
            type="text"
            value={nickName}
            name="nickname"
            placeholder="Nick Name"
            onChange={callBack}
          />
        </Li>

        <Li name="phone">
          <input
            required
            type="phone"
            value={Phone}
            maxLength={13}
            name="phone"
            placeholder="Phone"
            onChange={callBack}
          />
        </Li>
        <Li name="gender">
          <Gender
            checked
            value="남자"
            gender="man"
          >
            <FontAwsome data={"fa-person"} />
          </Gender>
          <Gender value="여자" gender="girl" >
            <FontAwsome data={"fa-person-dress"} />
          </Gender>
        </Li>
        <Li name="E-mail">
          <input
            required
            type="email"
            value={Email}
            name="email"
            placeholder="E-mail"
            onChange={callBack}
          />
        </Li>
      </RegisterUi>
    </Container2>
  );
}


export default Register;
