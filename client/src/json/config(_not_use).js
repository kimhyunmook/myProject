// import configJson from './site_config.json';
// import {
//     faFileExcel,
//     faHouse,
//     faKeyboard
// } from "@fortawesome/free-solid-svg-icons";
// import {
//     FontAwesomeIcon
// } from "@fortawesome/react-fontawesome";

// /** board 타겟 값 */
// export function board_target() {
//     let i, k
//     let board = configJson.board.target;
//     let header = configJson.header;
//     const path = window.location.href.split('/');

//     let targetName = board.map((el, index) => {
//         if (el.href.split('/')[2] === path[4]) {
//             return el.name;
//         }
//     })

//     for (i = 0; i < targetName.length; i++) {
//         if (targetName[i] !== undefined) {
//             for (k = 0; k < board.length; k++) {
//                 if (targetName[i] === board[k].name) {
//                     return board[k].type.division_type
//                 }
//             }
//         }
//     }
// }

// export function menuConfig(All) {
//     let header = configJson.header
//     let i, k;
//     let iconList = [
//         faHouse,
//         faKeyboard,
//         faFileExcel
//     ]
//     if (All === undefined)
//         All = false;

//     for (i = 0; i < header.length; i++) {
//         header[i].fontAwesome = < FontAwesomeIcon icon = {
//             iconList[i]
//         }
//         />
//         delete header[i].icon;
//     }

//     if (All === false) return header;

//     let header2 = [];
//     let border = configJson.board.target;

//     for (i = 0; i < header.length; i++) {
//         if (header[i].depth !== true) {
//             header2.push(header[i])
//         } else {
//             for (k = 0; k < border.length; k++) {
//                 border[k].fontAwesome =  < FontAwesomeIcon icon = {
//                     iconList[i]
//                 }
//                 />
//                 // delete border[k].type
//                 header2.push(border[k]);
//             }
//         }
//     }

//     if (All === true) return header2;
// }

// export function menuHandler(condi) {
//     if (condi === undefined)
//         condi = true;
//     const header = document.querySelector('#header');
//     if (!condi) {
//         header.classList.add('disNo');
//     } else {
//         header.classList.remove('disNo');
//     }
// }
