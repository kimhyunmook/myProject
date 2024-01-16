import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container2 } from "../common/commonUi";
import { FontAwsome } from "../common/fontawsome";
import { useDispatch, useSelector } from "react-redux";
import { _Delete } from "../../store/userSlice";

function MyPage() {
    const reducer = useSelector(state => state);
    const [userInfo, setUserInfo] = useState(reducer.userInfo)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    if (!userInfo.login) {
        setTimeout(async () => {
            alert('접근이 불가합니다.')
            await navigate('/')
        }, 100)
    }

    const userEdit = (event) => {
        event.preventDefault();
        navigate('/myPage/edit')
    }

    const userDelete = async (event) => {
        event.preventDefault();
        let body = {
            id: userInfo.data.id
        }
        if (window.confirm('정말 삭제 하시겠습니까?')) {
            await dispatch(_Delete(body))
            await alert('삭제되었습니다.')
            await navigate('/')
        } else return;
    }

    return (
        <Container2 info={{ className: "container-normal" }}>
            <div className="max1400">
                <ul className="myPage">
                    <Box class_name={'user_id'} tag_name={'ID'} value={userInfo.data.id} />
                    <Box class_name={'user_class'} tag_name={'이용자 등급'} value={userInfo.data.role === 1 ? '관리자' : '일반'} />
                    <Box class_name={'user_name'} tag_name={'이름'} value={userInfo.data.name} />
                    <Box class_name={'user_nick'} tag_name={'닉네임'} value={userInfo.data.nickname} />
                    <Box class_name={'user_gender'} tag_name={'성별'} value={userInfo.data.gender} />
                    <Box class_name={'user_email'} tag_name={'이메일'} value={userInfo.data.email} />
                    <Box class_name={'user_phone'} tag_name={'핸드폰'} value={userInfo.data.phone} />
                </ul>
                <div className="btnArea">
                    <button className={'edit_btn button'} onClick={userEdit}>
                        <FontAwsome data={"fa-wrench"} />
                    </button>
                    <button className={'delete_btn button'} onClick={userDelete}>
                        <FontAwsome data={"fa-user-xmark"} />
                    </button>
                </div>
            </div>
        </Container2>
    );
}

function Box({ class_name, tag_name, value }) {
    return (
        <li className={`${class_name} list`}>
            <p className="tag_name">
                {tag_name}
            </p>
            <p className="value">
                {value}
            </p>
        </li>
    )
}

export default MyPage