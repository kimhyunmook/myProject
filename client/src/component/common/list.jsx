import { Link } from "react-router-dom"
import { useState } from "react";
import Description from "./description";
import { useSelector } from "react-redux";
// import { polish } from '../../actions/effect';

function List({ text, href, class_name, depth, depth_content, description, auth }) {
    let targetHref;
    const store = useSelector(state => state);
    const menu = store.menuInfo.data;

    if (href === undefined) targetHref = '#';
    else targetHref = href;

    const [dis, setDis] = useState('disNo');
    const disYes = (event) => {
        event.preventDefault();
        setDis('disYes');
    }
    const disNo = (event) => {
        event.preventDefault();
        setDis('disNo');
    }
    const depthClick = (event) => {
        event.preventDefault();
        let checkClass = event.target.nextSibling.classList[1];
        if (checkClass === "disYes") {
            setDis('disNo')
        }
        else if (checkClass === "disNo") {
            setDis('disYes')
        }
    }

    function Depth() {
        return (
            <div className={`depth1 ${dis}`}>
                {depth_content}
            </div>
        )
    }


    return (
        <li
            className={class_name}
            onMouseEnter={disYes}
            onMouseLeave={disNo}
        >
            <Link
                to={targetHref}

            // onClick={depth === true ? depthClick : null}
            >
                {text}
            </Link>
            {/* {
                menu.map((el, index) => {
                    let depth = []
                    if (el.depth !== 0) {
                        depth.push(el);
                    }
                    console.log(depth);
                    
                    if (el.menu_id == depth.parent)
                        // if (el.parent === el.menu_id)
                        return (
                            <div key={index}>
                                {depth.name}
                            </div>
                        )
                })
            } */}
        </li>
    )
}

export default List
