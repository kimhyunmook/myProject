import { useSelector } from "react-redux";
import Likes from "./likes";
import { useDispatch } from "react-redux";
import { _GetLike } from "../../store/likeSlice";
import { useCallback, useEffect, useRef } from "react";

export default function Aside(props) {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const userInfo = store.userInfo;
  const likeInfo = store.likeInfo.data;
  const asideList = useRef(null);
  const asideContent = useRef(null);

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
    }
  };
  let alis = {
    height: asideList.current?.children.length * 94 + "px",
  };
  const listClick = useCallback((event) => {
    let t = event.currentTarget;
    let ct = asideContent.current; //content target
    let ct_children = [...ct.children];
    if ([...ct.classList].indexOf("on") === -1) ct.classList.add("on");
    else {
      let confirm = ct_children.filter(
        (v) => [...v.classList].indexOf("on") !== -1
      );
      console.log(confirm[0].classList);
    }
    // ct = [...ct.children].filter((x) =>
    //   x.classList.value.includes(t.dataset.target)
    // );
    // if (!ct[0].classList.value.includes("on")) ct[0].classList.add("on");
    // else ct[0].classList.remove("on");
  });
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
      <div className="aside-icon" style={alis}>
        <span>
          <button onClick={Click}>
            <img src="../img/aside.png" alt="" />
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
        <li className="likes">
          <Likes
            like={likeInfo}
            userInfo={userInfo}
            description={"사용 하시고 평가 부탁드려요!"}
          >
            LIKE
          </Likes>
        </li>
        <li className="dddd"></li>
      </ul>
    </aside>
  );
}
