import { Container2 } from "../common/commonUi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { getDate } from "../../actions/tool_action";
import { FontAwsome } from "../common/fontawsome";
import { BoardWriteUi, Li } from "./ui/boardUi";
import { BtnArea } from "../common/commonUi";
import { _InsertWrite } from "../../store/boardSlice";
import util from "../../util";


function WriteBoard() {
    const store = useSelector(state => state);
    const userInfo = store.userInfo.data;
    const [subject, setSubject] = useState('');
    const [textArea, setTextArea] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const path = util.path();

    const onSubjectHandler = (event) => {
        event.preventDefault();
        setSubject(event.currentTarget.value)
    }
    const onTextareaHandler = (event) => {
        event.preventDefault();
        setTextArea(event.currentTarget.value)

    }
    const moveList = (event) => {
        event.preventDefault();
        navigate(`/board/${path[2]}/1`)
    }

    const onWrite = async (event) => {
        event.preventDefault();
        const form = document.forms[0];
        if (subject === "" || subject === " ") {
            alert('제목을 작성해주세요.');
            form.subject.focus();
            return;
        }
        if (textArea === "" || textArea === " ") {
            alert('내용을 작성해주세요.');
            form.textArea.focus();
            return;
        }

        let body = {
            url: `/${path[2]}`,
            subject: subject,
            content: textArea,
            w_time: getDate(),
            d_time: getDate('display'),
            user_id: userInfo.id,
            board_type: 'normal',
            notice: userInfo.role === 1 ? document.querySelector('#notice').checked : 'false'
        }

        await dispatch(_InsertWrite(body));
        await navigate(`/board/${path[2]}/1`);
    }
    useEffect(() => {

    }, [])

    let btn = [
        {
            Name: <FontAwsome data={"fa-pen"} />
        },
        {
            Name: <FontAwsome data={"fa-list"} />,
            Click: moveList
        }
    ]
    return (
        <Container2 info={{ className: "container-normal" }}>
            <BoardWriteUi submit={onWrite} title="글쓰기" admin={userInfo.role}>

                <Li name="subject" text="제목">
                    <input type="text" name="subject" value={subject} onChange={onSubjectHandler} />
                </Li>
                <Li name="content" text="내용">
                    <textarea value={textArea} name="textArea" onChange={onTextareaHandler}></textarea>
                </Li>
                <Li>
                    <BtnArea info={btn} />
                </Li>
            </BoardWriteUi>
        </Container2>
    )
}

export default WriteBoard