import React from "react";
import {
  faAngleLeft,
  faAngleRight,
  faAnglesLeft,
  faAnglesRight,
  faBars,
  faChalkboard,
  faClover,
  faFilePen,
  faHamburger,
  faHouse,
  faList,
  faPen,
  faPenNib,
  faPerson,
  faPersonDress,
  faPlay,
  faPlus,
  faScrewdriverWrench,
  faStamp,
  faStar,
  faTrash,
  faUnlockKeyhole,
  faUser,
  faUserLock,
  faUserXmark,
  faWrench,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function FontAwsome({ data, type }) {
  let fontData = [
    ["default", "😊"],
    ["fa-user", faUser],
    ["fa-house", faHouse],
    ["fa-chalkboard", faChalkboard],
    ["fa-unlock-keyhole", faUnlockKeyhole],
    ["fa-pen", faPen],
    ["fa-list", faList],
    ["fa-xmark", faXmark],
    ["fa-angle-left", faAngleLeft],
    ["fa-angle-right", faAngleRight],
    ["fa-wrench", faWrench],
    ["fa-trash", faTrash],
    ["fa-user-xmark", faUserXmark],
    ["fa-pen-nib", faPenNib],
    ["fa-plus", faPlus],
    ["fa-bars", faBars],
    ["fa-person", faPerson],
    ["fa-person-dress", faPersonDress],
    ["fa-user", faUser],
    ["fa-user-lock", faUserLock], //admin
    ["fa-screwdriver-wrench", faScrewdriverWrench], //admin
    ["fa-angles-right", faAnglesRight],
    ["fa-angles-left", faAnglesLeft],
    ["fa-start", faStamp],
    ["fa-play", faPlay],
    ["fa-clover", faClover],
    ["fa-hambuger", faBars],
    ["fa-file-pen", faFilePen],
  ];

  if (data !== "default")
    fontData.map((targetData) => {
      let text = targetData[0];
      let el = targetData[1];
      if (data === text) data = el;
    });

  if (type === "data")
    return {
      _data: fontData,
    };
  else if (type === "element" || !!!type) {
    if (data === "default" || data === "") {
      return fontData[0][1];
    } else {
      return <FontAwesomeIcon icon={data} />;
    }
  }
}
