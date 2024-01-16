// import { basicSetting } from "./adm_action";
const {basicSetting} = require('./adm_action');

const deleteCookie = (name) => {
    window.location.href = '/'
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
function getDate (type) {
    const time = new Date();
    const year = time.getFullYear();
    let month = time.getMonth() + 1;
    let day = time.getDate();
    let hour = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();
    let display;

    if (month < 10) month = `${ month }`;
    if (day < 10) day = `${ day }`;
    if (hour < 10) hour = `0${ hour }`;
    if (minutes < 10) minutes = `0${ minutes }`;
    if (seconds < 10) seconds = `0${ seconds }`;
    
    switch (type) {
        case 'display': display = `${month}.${day} ${hour}:${minutes}`
            break;
        default : display = `${ year }.${ month }.${ day } ${ hour }:${ minutes }:${ seconds }`;
            break;
    }

    return display;
}

function MemberConfirm (auth) {
    console.log(auth);
}

function menuSetting () {
    return basicSetting({url:'menu'}).payload.then(res => {
        return res.menu
    });
}



module.exports= {
    deleteCookie,
    getDate,
    MemberConfirm,
    menuSetting
}