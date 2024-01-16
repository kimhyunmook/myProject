import { useState, useEffect } from "react";
import { adminAction } from "../../actions/adm_action";
import { Overlap } from "./ui";
import ADM_Board from "./board";

export default function ADM_Menu(props) {
    const [menu, setMenu] = useState([
        {}
    ]);
    const [name, setName] = useState('');
    const [href, setHref] = useState('');
    const [selectValue, setSelectValue] = useState('');
    const [type,setType] = useState('');
    // `name`,`href`,`menu_type`,`description`,`depth`,`admin`,`parent`,`custom`,`custom_comment`
    let body = {
        url: 'settingmenu',
        name: name,
        // table_name: href,
        // href: '/board/' + href + '/1',
        // menu_type: 'board',
        // board_type: board_type,
        // description: description,
        // custom: custom,
        // custom_comment: customCommentValue,
        // defaultCustomComment: 'fa-chalkboard'
        // depth:0,
        // admin:0,
        
    }
    const submit = (event) => {
        event.preventDefault();
    }

    useEffect(() => {
        // adminAction(body).payload.then(res => {
        //     setMenu(res)
        // })
    }, []);

    function selectChange(event) {
        event.preventDefault();
        const value = event.target.value
        setSelectValue(value)
        menu.map(el => {
            if (el.href === value) {
                setName(el.name);
                setHref(el.href);

                setType(el.menu_type);
            }
        })

    }
    function onNameChangeHandler(event) {
        event.preventDefault();
        console.log(event.target.value);
        setName(event.target.value)
    }
    function onHrefChangeHandler(event) {
        event.preventDefault();
        console.log(event.target.value);
        setHref(event.target.value)
    }


    const coverSetting = {
        title: '메뉴 Edit',
        id: 'menu',
        onClick: props.onClick,
        onSubmit: submit
    }
    const selectSetting = {
        type: 'select',
        value: selectValue,
        label_text: 'Edit Menu',
        label_id: 'edit_menu',
        onChange: selectChange,
    }
    const nameSetting = {
        type: 'input',
        label_text: '게시판 이름',
        value: name,
        onChange: onNameChangeHandler,
    }

    return (
        <Overlap {...coverSetting}>
            <Overlap {...selectSetting}>
                <option value="" disabled>선택</option>
                {
                    menu.map((el, index) => {
                        return (
                            <option key={index} value={el.href}>
                                {el.name}
                            </option>
                        )
                    })
                }
            </Overlap>
            <Overlap {...nameSetting} />
            {/* <Overlap {...inputSetting} /> */}
        </Overlap>
    )
}