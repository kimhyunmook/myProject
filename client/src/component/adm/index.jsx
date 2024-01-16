import Container from "../common/container"
import ADM_Board from './board';
import ADM_Content from './cotent'
import ADM_Menu from "./menu";

export default function ADM() {
    const listOpen = (event) => {
        const content = event.target.parentNode;
        const on = document.querySelectorAll('.adm-list.on');
        if (content.classList[1] === undefined) {
            on.forEach((el) => {
                el.classList.remove('on');
            });
            content.classList.add('on');
        }
        else content.classList.remove('on');
    }
    const style = {
        margin: '90px auto 0',
        padding: "2% 100px",
        maxWidth: "1200px"
    }
    return (
        <Container adm={true} style={style}>
            <ul className="adm">
                <ADM_Content onClick={listOpen} />
                <ADM_Board onClick={listOpen} />
                <ADM_Menu onClick={listOpen} />
            </ul>
        </Container>
    )
}

