import { useNavigate } from "react-router-dom";
import { adminAction } from "../../actions/adm_action";
import { Overlap } from "./ui";

export default function ADM_Content(props) {
    const navigate = useNavigate();
    const submit = (event) => {
        // event.preventDefault();
        // // `name`,`href`,`menu_type`,`description`,`depth`,`admin`,`parent`,`custom`,`custom_comment`
        // let body = {
        //     url:"",
        //     name:href,
        //     href:href,
        //     menu_type:'normaly',
        //     description:description,
        //     custom:custom,
        //     custom_comment:customComment
        // }
        // adminAction(body).payload.then(res=>{
        //     navigate('/adm')
        // })
    }
    const coverSetting = {
        title: '일반 생성',
        onClick: props.onClick,
        onSumbit: submit
    }
    const nameSetting = {
        type: 'input',
        label_id: 'name',
        label_text: '이름',
        placeholder: '이름'
    }
    const hrefSetting = {
        type: 'input',
        label_id: 'href',
        label_text: '주소',
        placeholder: '주소'
    }
    return (
        <Overlap {...coverSetting}>
            <Overlap {...nameSetting} />
            <Overlap {...hrefSetting} />
        </Overlap>
    )
}