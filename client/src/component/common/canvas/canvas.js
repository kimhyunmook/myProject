const tgStyle = "position:relative";
let i;

const canvas = {
    box: function (ob = {}) {
        const tg = ob.target;
        const coor = ob.coordinate;
        let color = ob.color;
        let width = ob.width;
        let height = ob.height;
        let x, y
        let boxStyle, addStyle;
        let bg = checkOverlapBg(tg);

        const ani = ob.animation;
        const branch = Array.isArray(coor[0]);
        overlapState(tg);
        addStyle = ob.addStyle;

        if (!branch) {
            const box = document.createElement('div');
            box.classList.add('canvas-box');
            width = addPx(width);
            height = addPx(height);
            x = addPx(coor[0]);
            y = addPx(coor[1]);
            boxStyle = {
                width,
                height,
                x,
                y,
                color
            }
            box.style = `${overlapState('style',boxStyle,addStyle)};`;
            animationHandle(box, ani)
            
            bg.appendChild(box);
        } else {
            for (i = 0; i < coor.length; i++) {
                const box = document.createElement('div');
                box.classList.add('canvas-box');
                x = addPx(coor[i][0]);
                y = addPx(coor[i][1]);

                let width_, height_, color_;
                if (Array.isArray(width)) {
                    width_ = addPx(width[i]);
                } else height_ = addPx(height);
                if (Array.isArray(height))
                    height_ = addPx(height[i]);
                else height_ = addPx(height);

                if (Array.isArray(color))
                    color_ = color[i];
                else color_ = color;

                boxStyle = {
                    width: width_,
                    height: height_,
                    x,
                    y,
                    color: color_
                }
                addStyle = ob.addStyle;

                if (Array.isArray(addStyle)) addStyle = addStyle[i]
                box.style = `${overlapState('style',boxStyle,addStyle)}`;
                if (ani !== undefined)
                    animationHandle(box, ani[i]);
                bg.appendChild(box);
            }
        }

    },
    circle: function (ob = {}) {
        const tg = ob.target;
        const ani = ob.animation;
        let [coor, color, width, height] = [ob.coordinate, ob.color, ob.width, ob.height];
        let x, y;
        overlapState(tg);
        let bg = checkOverlapBg(tg);

        const branch = Array.isArray(coor[0]);
        let circleStyle = {}
        if (!branch) {
            const circle = document.createElement('div');
            circle.classList.add('canvas-circle')
            width = addPx(width);
            height = addPx(height);
            x = addPx(coor[0]);
            y = addPx(coor[1]);
            circleStyle = {
                width,
                height,
                x,
                y,
                color
            }
            circle.style = `${overlapState('style',circleStyle)} border-radius:50%;`;
            animationHandle(circle, ani)
            bg.appendChild(circle);
        } else {
            for (i = 0; i < coor.length; i++) {
                const circle = document.createElement('div');
                circle.classList.add('canvas-circle');
                x = addPx(coor[i][0]);
                y = addPx(coor[i][1]);
                let width_, height_, color_;
                if (Array.isArray(width))
                    width_ = addPx(width[i]);
                else width_ = addPx(width);

                if (Array.isArray(height))
                    height_ = addPx(height[i]);
                else {
                    if (height === undefined)
                        height = width_
                    else
                        height_ = addPx(height)
                };
                if (Array.isArray(color))
                    color_ = color[i];
                else color_ = color;

                circleStyle = {
                    width: width_,
                    height: height_,
                    color: color_,
                    x,
                    y
                }
                circle.style = `${overlapState('style',circleStyle)} border-radius:50%`;
                if (ani !== undefined)
                    animationHandle(circle, ani[i]);

                bg.appendChild(circle)
            }
        }
    }
}

function animationHandle(tg, ani) {
    if (ani !== undefined) {
        tg.classList.add(`${ani}`);
    }
}

/**
 * @param tg target style 
 * @param {{width,height,color,x,y}} [style={}] width, height, color, x, y */
function overlapState(tg, style = {}, addStyle) {
    //children style
    if (tg === 'style')
        return `position:absolute;
        width:${style.width};
        height:${style.height};
        top:${style.y};
        left:${style.x};
        background-color:${style.color};${addStyle};`;

    // common
    tg.style = tgStyle;

}

function checkOverlapBg(tg) {
    let bg = document.querySelector('.canvas-bg');

    if (bg === null || bg === undefined) {
        bg = document.createElement('div');
        bg.classList.add('canvas-bg');
        tg.insertBefore(bg, tg.children[0]);
        bg.style = "position:absolute;width:100%;height:100%;top:0;left:0; overflow:hidden";
        return bg
    } else return bg
}

function addPx(tg) {
    if (tg === undefined || tg === null)
        return console.error('coordinate를 정확히 기입한지 확인부탁드립니다.')
    const sp = tg.toString().split('px');
    const p = tg.toString().split('%');
    if (sp.length <= 1 && p >= 2) {
        return tg + 'px';
    }

    return tg;
}


function bounce_ball(tg) {
    // setTimeout(() => {

    // }, 1000)
    // tg.style.transition = 1000;
    // setInterval(() => {
    //     let x_ran = Math.random() * 98
    //     let y_ran = Math.random() * 98
    //     let rotate = Math.random() * 3
    //     let scale = Math.random() * 2 + 1;

    //     tg.style.left = `${x_ran}%`;
    //     tg.style.top = `${y_ran}%`;
    //     tg.style.transform = `rotate(90deg*${rotate})scale(${scale})`;
    //     tg.style.clipPath = "circle(50%)"
    // }, 900)
}
export default canvas