import { Container2 } from '../common/commonUi';
import { useLayoutEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwsome } from "../common/fontawsome";
import { BoardWriteUi, Button, Li } from "./ui/boardUi";
import { _Modify } from "../../store/boardSlice";
import util from "../../util";


function ModifyBoard() {
    const store = useSelector(state => state);
    const path = util.path();
    const userInfo = store.userInfo.data;
    const w_id = store.boardInfo.view.w_id;
    const [subject, setSubject] = useState(store.boardInfo.view.subject);
    const [textArea, setTextArea] = useState(store.boardInfo.view.content);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let body, config;

    useLayoutEffect(() => {

    }, []);

    const onSubjectHandler = (event) => {
        let value = event.currentTarget.value
        setSubject(value)
    }
    const onTextareaHandler = (event) => {
        let value = event.currentTarget.value
        setTextArea(value)
    }

    const onModify = async (event) => {
        event.preventDefault();
        body = {
            w_id: w_id,
            name: path[2],
            subject: subject,
            content: textArea
        }
        dispatch(_Modify(body));
        await alert('수정되었습니다.');
        await navigate(`/board/${path[2]}/contents/${path[4]}`);
    }
    return (
        <Container2 info={{className:"container-normal"}}>
            <BoardWriteUi submit={onModify} title="글쓰기">
                <Li name="subject" text="제목">
                    <input type="text" value={subject} onChange={onSubjectHandler} />
                </Li>
                <Li name="id" text="작성자">
                    <p>
                        {userInfo.id}
                    </p>
                </Li>
                <Li name="content" text="내용">
                    <textarea name="content" cols="30" rows="10" value={textArea} onChange={onTextareaHandler}></textarea>
                </Li>
                <Li>
                    <Button btn={[{ text: <FontAwsome data={"fa-wrench"} /> }]}></Button>
                </Li>
            </BoardWriteUi>
        </Container2>
    )
}

export default ModifyBoard;