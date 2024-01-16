import { useEffect, useRef, useState } from "react"

/**
 * @param btn Array
 * @param btn.text Object text
 * @param btn.fnc Object onClick
 * @ex let btn = [{text:"hi",fnc:moveList}]
 */
export function Button(props) {
    if (!Array.isArray(props.btn)) {
        console.error("btn props를 배열로 만들어주세요.")
        return (
            <> error </>
        )
    }
    return (
        <div className="btnArea">
            {props.btn.map((el, index) => {
                return (
                    <button key={index} className="button" onClick={el.fnc !== undefined ? el.fnc : null}>
                        {el.text}
                    </button>
                )
            })}
        </div>
    )
}

export function BoardWriteUi(props) {
    const notice_input = useRef(null);
    const [notice_text,setNotice_text] =useState('');

    useEffect(()=>{
        if(notice_input.current?.checked) {
            console.log(1)
        }
    },[])

    return (
        <div className="board board-ui">
            <form onSubmit={props.submit} id={props.id}>
                <div className="title">
                    <h2>
                        {props.title !== undefined ? props.title : null}
                    </h2>
                    {
                        props.admin === 1 ?
                            <div className="admin-box">
                                <div className="notice">
                                    <label htmlFor="notice">
                                        {notice_input.current ===false ? "공지":"고옹지"}
                                        {/* 공지 */}
                                    </label>
                                    <input ref={notice_input} type="checkbox" name="notice" id="notice" />
                                </div>
                            </div>
                            : null
                    }
                </div>
                <ul>
                    {props.children}
                </ul>
            </form>
        </div>
    )
}

export function Li(props) {
    return (
        <li style={props.style}>
            <label htmlFor={props.name}>
                {props.text}
            </label>
            {props.children}
        </li>
    )
}
