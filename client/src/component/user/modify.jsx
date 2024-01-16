import React, { useState, useEffect, useCallback } from 'react'
import { useDropzone } from 'react-dropzone';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { auth, edit } from '../../actions/user_action';
import Container from '../common/container';
import { RegisterUi, Li } from './ui/userUi';
import { Man, Girl } from '../common/fontawsome';
import util from '../../util';

function UserEdit() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // state
    const [_Id, setId] = useState("");
    const [_EditPassword, setEditPassword] = useState("");
    const [_EditPassword2, setEditPassword2] = useState("");
    const [Name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [Phone, setPhone] = useState("");
    const [Gender, setGender] = useState("");
    const [file, setFile] = useState("");
    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file) => {
            console.log(file)
            setFile(file)
        })
    }, []);

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    useEffect(() => {

        auth().payload
            .then(res => {
                setId(res.id)
                setName(res.name)
                setPhone(res.phone)
                setEmail(res.email)
                setGender(res.gender);
            })
    }, [])

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
        let value = util.phoneNumber(event);
        setPhone(value)
    }

    const onSubmitHandler = (event) => {
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
            email: Email,
            phone: Phone
        }

        dispatch(edit(body))
            .then(res => {
                let edit_res = res.payload
                if (edit_res.edit)
                    alert('수정되었습니다.')
                // navigate('/myPage')
            })

    }
    return (
        <Container onePage={true}>
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
                <Li name="phone">
                    <input required type="phone" value={Phone} name="phone" placeholder='Phone' onChange={onPhoneChangeHandler} />
                </Li>
                <Li name="name">
                    <input disabled type="text" value={Name} name="name" placeholder='Name' />
                </Li>
                <Li name="gender">
                    {
                        Gender === "남자" ? "MAN" :
                            Gender === "여자" ? "WOMAN" : "없음"
                    }
                </Li>
                <Li name="E-mail">
                    <input required type="email" value={Email} name="email" placeholder='E-mail' onChange={onEmailChangeHandler} />
                </Li>
            </RegisterUi>
        </Container>
    )
}

function Input({ type, value, name, placeholder, disabled, fnc }) {
    return (
        <li>
            <label htmlFor={name}>{name}</label>
            {
                disabled === true
                    ? <input type={type} defaultValue={value} name={name} placeholder={placeholder} disabled />
                    : <input type={type} defaultValue={value} name={name} placeholder={placeholder} onChange={fnc} />
            }
        </li>
    )
}

export default UserEdit