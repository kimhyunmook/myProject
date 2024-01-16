import React, { useState, useEffect, useCallback } from 'react'
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container2 } from '../common/commonUi';
import { RegisterUi, Li } from './ui/userUi';
import { _Edit } from '../../store/userSlice';
import util from '../../util';

function UserEdit() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const reducer = useSelector(state => state);
    const userInfo = reducer.userInfo.data;
    // state
    const [_Id, setId] = useState("");
    const [_EditPassword, setEditPassword] = useState("");
    const [_EditPassword2, setEditPassword2] = useState("");
    const [Name, setName] = useState("");
    const [nickName, setNickName] = useState("");
    const [Email, setEmail] = useState("");
    const [Phone, setPhone] = useState("");
    const [Gender, setGender] = useState(userInfo.gender);
    const [file, setFile] = useState("");
    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file) => {
            console.log(file)
            setFile(file)
        })
    }, []);

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    useEffect(() => {
        setId(userInfo.id)
        setName(userInfo.name)
        setPhone(userInfo.phone)
        setEmail(userInfo.email)
        setNickName(userInfo.nickname)
    }, [reducer])

    // function
    const onPasswordChangeHandler = (event) => {
        let value = event.currentTarget.value
        setEditPassword(value)
    }
    const onPasswordChangeHandler2 = (event) => {
        let value = event.currentTarget.value
        setEditPassword2(value)
    }
    const onEmailChangeHandler = (event) => {
        let value = event.currentTarget.value
        setEmail(value)
    }
    const onPhoneChangeHandler = (event) => {
        let value = util.phoneNumber(event)
        setPhone(value)
    }
    const onNickNameChangeHandler = (event) => {
        let value = event.currentTarget.value
        setNickName(value)
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        if (_EditPassword !== _EditPassword2) {
            alert('비밀번호가 서로 다릅니다.')
            return;
        }
        // let body = new FormData();
        // body.append('id',_Id)
        // body.append('password',_EditPassword)
        // body.append('name',Name)
        // body.append('email',Email)
        // body.append('phone',Phone)
        // body.append('img',file) 

        let body = {
            id: _Id,
            password: _EditPassword,
            name: Name,
            nickname: nickName,
            email: Email,
            phone: Phone
        }

        dispatch(_Edit(body))
        alert('수정 완료됐습니다.')
        // navigate('/#')
        window.location.href = '/';
    }
    return (
        <Container2 info={{ className: 'container-normal' }}>
            <RegisterUi name="정보 수정" submit={onSubmitHandler} submitBtn="수정">
                <Li name="id">
                    <input disabled type="text" value={_Id} name="id" />
                </Li>
                <Li name="password">
                    <input required type="password" value={_EditPassword} name="password" placeholder='Password' onChange={onPasswordChangeHandler} />
                </Li>
                <Li name="password2">
                    <input required type="password" value={_EditPassword2} name="password2" placeholder='Password 확인' onChange={onPasswordChangeHandler2} />
                </Li>
                <Li name="nick">
                    {
                        userInfo.role === 1 ?
                            <input disabled type="text" value={nickName} name="nickname" placeholder='nickname' onChange={onNickNameChangeHandler} /> :
                            <input required type="text" value={nickName} name="nickname" placeholder='nickname' onChange={onNickNameChangeHandler} />
                    }
                </Li>
                <Li name="phone">
                    <input required type="phone" value={Phone} name="phone" placeholder='Phone' maxLength={13} onChange={onPhoneChangeHandler} />
                </Li>
                <Li name="name">
                    <input disabled type="text" value={Name} name="name" placeholder='Name' />
                </Li>
                <Li name="gender">
                    {
                        Gender === "남자" ? "MAN" :
                            Gender === "여자" ? "WOMAN" : "관리자"
                    }
                </Li>
                <Li name="E-mail">
                    <input required type="email" value={Email} name="email" placeholder='E-mail' onChange={onEmailChangeHandler} />
                </Li>
            </RegisterUi>
        </Container2>
    )
}


export default UserEdit