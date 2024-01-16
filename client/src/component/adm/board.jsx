import { useState, useEffect } from "react";
import { Overlap, DepthUi } from "./ui";
import { FontAwsome } from "../common/fontawsome";
import { useDispatch } from "react-redux";
import { _Condtion, _CreateMenu } from "../../store/menuSlice";
import { useNavigate } from "react-router-dom";

export default function ADM_Board(props) {
    let body;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const submit = async (event) => {
        event.preventDefault();
        // `name`,`href`,`menu_type`,`description`,`depth`,`admin`,`parent`,`custom`,`custom_comment`
        body = {
            url: '/adm/createboard',
            name: name,
            table_name: 'board_' + href,
            href: '/board/' + href,
            menu_type: 'board',
            board_type: board_type,
            description: description,
            custom: custom,
            custom_comment: customCommentValue,
            parent: depthTarget,
            defaultCustomComment: 'fa-chalkboard',
            depth: depth,
            // admin:0,
        }
        if (description === "" || description === undefined) {
            body.description = name
        }
        if (customCommentValue === "" || customCommentValue === undefined) {
            body.custom_comment = "fa-chalkboard"
        }

        dispatch(_CreateMenu(body));
        setTimeout(() => {
            window.location.reload();
        }, 1000)
    }
    // 이름
    const [name, setname] = useState("");
    function nameHandler(event) {
        event.preventDefault();
        setname(event.target.value)
    }

    // 주소
    const [href, sethref] = useState("");
    function hrefHandler(event) {
        event.preventDefault();
        event.target.value = event.target.value.replace(/[^A-Za-z]/ig, '')
        sethref(event.target.value)
    }


    // type
    const [board_type, setBoard_type] = useState("");
    function board_typeHandler(event) {
        event.preventDefault();
        setBoard_type(event.target.value)
    }

    // 커스텀
    const cC_default = {
        type: 'select',
        label_text: "fontawsome Code",
    }

    const [description, setdescription] = useState("");
    const [customComment, setcustomComment] = useState(cC_default);

    // 커스텀 코맨트
    const [customCommentValue, setcustomCommentValue] = useState("default");
    function descriptionHandler(event) {
        event.preventDefault();
        setdescription(event.target.value)
    }

    // 커스텀
    const [custom, setcustom] = useState("fontawsome");
    function customHandler(event) {
        event.preventDefault();
        const value = event.target.value
        setcustom(value)
        switch (value) {
            case "fontawsome":
                setcustomComment(cC_default);
                setcustomCommentValue("");
                break;
            case "self":
                setcustomComment({
                    type: 'input',
                    label_text: "직접 입력",
                    placeholder: "직접 입력"
                });
                setcustomCommentValue("");
                break;
        }
    }
    function customCommentHandler(event) {
        event.preventDefault();
        setcustomCommentValue(event.target.value)
    }

    // depth
    const [depth, setDepth] = useState(0);
    function depthHandler(value) {
        setDepth(value)
    }

    const [depthTarget, setDepthTarget] = useState(0);
    function depthTargetHandler(value) {
        setDepthTarget(value)
        console.log(value)
    }

    // Setting Value
    const nameSetting = {
        type: 'input',
        value: name,
        label_id: "board-name",
        label_text: "게시판 이름",
        onChange: nameHandler,
        placeholder: `게시판 이름`
    }
    const hrefSetting = {
        type: 'input',
        value: href,
        label_id: 'board-href',
        label_text: '게시판 url',
        onChange: hrefHandler,
        placeholder: 'ex) test [only English]'
    }
    const descriptionSetting = {
        type: 'input',
        value: description,
        label_id: 'board-description',
        label_text: '게시판 설명',
        onChange: descriptionHandler,
        placeholder: '표기이름(미기입시 이름으로 표기)'
    }
    const typeSetting = {
        type: 'select',
        value: board_type,
        label_id: 'board-type',
        label_text: '게시판 유형',
        onChange: board_typeHandler
    }
    const customSetting = {
        type: 'select',
        value: custom,
        label_id: 'board-custom',
        label_text: '커스텀 (아이콘)',
        onChange: customHandler,
    }
    const customCommentSetting = {
        type: customComment.type,
        value: customCommentValue,
        label_id: 'board-custom-comment',
        label_text: customComment.label_text,
        onChange: customCommentHandler,
        placeholder: customComment.placeholder,
        icon: <FontAwsome data={customCommentValue} />,
    }
    const coverSetting = {
        title: '게시판 생성',
        id: 'adm-board',
        onClick: props.onClick,
        onSubmit: submit
    }


    useEffect(() => {
    }, []);

    return (
        <Overlap {...coverSetting}>
            <Overlap {...nameSetting} />
            <Overlap {...hrefSetting} />
            <Overlap {...descriptionSetting} />
            <Overlap {...typeSetting}>
                <option value="board" > 일반 </option>
                <option value="gallery"> 갤러리 </option>
            </Overlap>
            <Overlap {...customSetting}>
                <option value="fontawsome" > fontawsome </option>
                <option value="self"> 직접입력(미구현) </option>
            </Overlap>
            <Overlap {...customCommentSetting} >
                {
                    FontAwsome({ type: 'data' })._data.map((el, index) => {
                        return (
                            <option value={el[0]} key={index}>
                                {el[0]}
                            </option>
                        )
                    })
                }
            </Overlap>
            <DepthUi upState={depthHandler} upState2={depthTargetHandler}></DepthUi>
        </Overlap>
    )

}