import { useSelector } from "react-redux";
import Likes from "./likes";
import { useDispatch } from "react-redux";
import { _GetLike } from "../../store/likeSlice";
import { useCallback, useEffect, useRef, useState } from "react";

export default function Aside(props) {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const userInfo = store.userInfo;
  const likeInfo = store.likeInfo.data;
  const asideList = useRef(null);
  const asideContent = useRef(null);
  const [lendering, setLendering] = useState("");
  const ct = asideContent.current; //content target

  useEffect(() => {
    let body = {
      url: "/setting/like",
    };
    dispatch(_GetLike(body));
  }, []);

  const Click = (event) => {
    event.preventDefault();
    const al = asideList.current;
    if (!al.classList.value.includes("on")) {
      al.classList.add("on");
    } else {
      al.classList.remove("on");
      ct.classList.remove("active");
      [...ct.children].map((v) => v.classList.remove("active"));
    }
  };
  let ais = {
    height: asideList.current?.children.length * 94 + "px",
  };
  const listClick = useCallback((event) => {
    const t = event.currentTarget;
    setLendering(t.dataset.target);
    let triger = "active";
    if ([...ct.classList].indexOf(triger) === -1) {
      ct.classList.add(triger);
    } else if (
      [...ct.classList].indexOf(triger) !== -1 &&
      lendering === t.dataset.target
    ) {
      ct.classList.remove(triger);
    }
  });

  const close = (event) => {
    event.preventDefault();
    const t = event.currentTarget.parentNode;
    const tp = t.parentNode;
    // t.classList.remove("active");
    tp.classList.remove("active");
  };
  let listInfo = [
    {
      name: "👍",
      click: listClick,
      target: "likes",
    },
    {
      name: "🗣️",
      click: listClick,
      target: "dddd",
    },
  ];
  return (
    <aside>
      <div className="aside-icon" style={ais}>
        <span>
          <button onClick={Click}>
            <img src="../img/aside.png" alt="" />
            <a
              className="disNo"
              href="https://www.flaticon.com/kr/free-icons/"
              title="이유 아이콘"
            >
              이유 아이콘 제작자: smashingstocks - Flaticon
            </a>
          </button>
        </span>
        <ul ref={asideList}>
          {listInfo.map((v, i) => {
            return (
              <li
                key={`aside_listInfo_${i}`}
                onClick={v.click}
                data-target={v.target}
              >
                {v.name}
              </li>
            );
          })}
        </ul>
      </div>
      <ul className="aside-content" ref={asideContent}>
        {lendering === "likes" ? (
          <li className="likes">
            <button className="closeBtn" onClick={close}>
              닫기
            </button>
            <Likes
              style={{ width: "600px", paddingBottom: "0" }}
              like={likeInfo}
              userInfo={userInfo}
              title={false}
            >
              LIKE
            </Likes>
          </li>
        ) : null}
        {lendering === "dddd" ? (
          <li className="dddd">
            <div
              style={{ width: "300px", height: "300px", background: "#000" }}
            ></div>
          </li>
        ) : null}
      </ul>
    </aside>
  );
}
