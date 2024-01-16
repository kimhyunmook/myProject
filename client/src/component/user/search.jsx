import { Container2, Modal } from "../common/commonUi";
import { RegisterUi, Li } from "./ui/userUi";
import util from "../../util";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchUser({ }) {
    let Name = '';
    let triger;
    let body = {};
    const param = util.urlParam('type');
    const [user_id, setUser_id] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [newPw, setNewPw] = useState('');
    const [modalDis, setModalDis] = useState(false);
    const navigate = useNavigate();

    switch (param) {
        case 'id': triger = 1;
            Name = 'Id 찾기'
            body = {
                name,
                email
            }
            break;
        case 'password': triger = 2;
            Name = '비밀번호 찾기';
            body = {
                id: user_id,
                name,
                email
            }
            break;
        default: triger = 0;
            break;
    }

    const idHandler = (event) => {
        let value = event.currentTarget.value;
        setUser_id(value);
    }
    const nameHandler = (event) => {
        let value = event.currentTarget.value;
        setName(value);
    }
    const emailHandler = (event) => {
        let value = event.currentTarget.value;
        setEmail(value)

    }

    const onSubmit = (event) => {
        event.preventDefault();
        axios.post(`/api/users/search/${triger}`, body)
            .then(res => {
                let id = res.data.id;
                let pw = res.data.password;
                setUser_id(id);
                setNewPw(pw);
                if (res.data.result === 'success')
                    setModalDis(true);
                else if (res.data.result === 'fail') alert('일치 하는 정보가 없습니다.');

            });

    }

    const modalHandler = (event) => {
        event.preventDefault();
        navigate('/login');

    }
    const modalHandler2 = (event) => {
        event.preventDefault();
        navigate('/login/search?type=password');
        // window.location.href = '/login/search?type=password';
        setModalDis(false);
        setUser_id('');
        setName('');
        setEmail('');
    }
    let buttonInfo;
    param === 'id' ? buttonInfo = [{ Name: '로그인', Click: modalHandler }, { Name: '비밀번호 찾기', Click: modalHandler2 }]
        : buttonInfo = { Name: '로그인', Click: modalHandler };
    return (
        <Container2 info={{ className: "container-normal" }}  >
            <Modal display={modalDis} title={Name} button={buttonInfo}>
                {
                    param === 'id' ?
                        <p>
                            회원님의 ID는 <b>{user_id}</b> 입니다.
                        </p>
                        : <p>
                            임시 비밀번호는 <b>{newPw}</b> 입니다. <br />
                            * 로그인 후 비밀번호 변경 부탁드립니다.
                        </p>
                }
            </Modal>
            <RegisterUi name={Name} submit={onSubmit} submitBtn="찾기" >
                {
                    triger === 1 ?
                        <>
                            <Li name="이름">
                                <input required type="text" id='name' name='name' value={name} onChange={nameHandler} />
                            </Li>
                            <Li name="E-mail">
                                <input required type="email" id='email' name='email' value={email} onChange={emailHandler} />
                            </Li>
                        </>
                        : triger === 2 ?
                            <>
                                <Li name="id">
                                    <input required type="text" id='id' name='id' value={user_id} onChange={idHandler} />
                                </Li>
                                <Li name="이름">
                                    <input required type="text" id='name' name='name' value={name} onChange={nameHandler} />
                                </Li>
                                <Li name="E-mail">
                                    <input required type="email" id='email' name='email' value={email} onChange={emailHandler} />
                                </Li>
                            </>
                            : null
                }
            </RegisterUi>
        </Container2>
    )
}