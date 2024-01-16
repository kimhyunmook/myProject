/**
 * 광택 효과 (만들다 말았음)
 * @설명 onMouseOver 효과 position:absolute or relative 필수
 * 왜캐 귀찮지 만들기....
 */
export const polish = (event) => {
    event.stopPropagation()
    const target = event.target
    let polish = document.createElement('div');

    if(target.children[1] != undefined) {
     
        target.children[1].remove()
        console.log(
            target.children[1]
        )
    } else  {
        const style = `
            border : 1px solid #fff;
        `
        polish.classList.add('polish');
        target.appendChild(polish);
    }
}