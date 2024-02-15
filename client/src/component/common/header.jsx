import { useState, useLayoutEffect, useEffect, useRef, useMemo } from "react";
import LoginList from "./loginList";
import { loginToken } from "../../actions/type";
import { FontAwsome } from "./fontawsome";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Logo, { homelink } from "./logo";
import util from "../../util";

function Header(props) {
  const store = useSelector((state) => state);
  const loginCookieName = loginToken;
  const [userInfo, setUserInfo] = useState({});
  const [menu, setMenu] = useState([]);
  const path = util.path();
  const menuInfo = store.menuInfo.data;
  const header = useRef(null);
  const [id, setId] = useState("header");
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();

  // scroll
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScrollY(window.scrollY);
    });
  }, [scrollY]);
  useEffect(() => {
    setUserInfo(store.userInfo.data);
    if (path[1].split("?")[0] !== "download") {
      if (menuInfo !== undefined) {
        setMenu(menuInfo);
      }
    }
  }, [store]);

  function homelink(event) {
    event.preventDefault();
    header.current.style.backgroundColor = "transparent";
    navigate("/");
  }

  return (
    <>
      <header
        id={id}
        ref={header}
        className={scrollY < 0 ? "on" : ""}
        style={{
          height: 90,
          backgroundColor: header.current?.nextSibling.className.includes(
            "index"
          )
            ? "transparent"
            : "#333",
        }}
      >
        <div className="header">
          <Logo click={homelink}></Logo>
          <nav className="header-nav">
            <ul className="header-nav-menu">
              {userInfo?.role === 1
                ? menu?.map((el, index) => {
                    if (el.admin === 1)
                      return (
                        <MenuLi key={`admin_${index}`} href={el.href}>
                          el.name
                        </MenuLi>
                      );
                  })
                : null}
              <li>
                <a href="/" onClick={homelink}>
                  홈
                </a>
                {/* <Link to="/">홈</Link> */}
              </li>
              {menu?.map((el, index) => {
                let info;
                let init = {
                  key: index,
                  href: el.href,
                  role: el.role,
                };
                if (el.depth === 0) info = { ...init };
                if (el.depthChildren.length !== 0)
                  info = {
                    ...init,
                    depthChildren: el.depthChildren,
                  };
                if (el.menu_type === "board") info.href = el.href + "/1";
                if (el.description !== "") info.description = el.description;
                // if (el.custom === "fontawsome") info.children = <FontAwsome data={el.custom_comment} />;
                if (el.depth !== 1 && el.admin !== 1 && index !== 0)
                  return <MenuLi {...info}>{el.name}</MenuLi>;
              })}
            </ul>
          </nav>
          <LoginList loginCookieName={loginCookieName} userInfo={userInfo} />
        </div>
      </header>
    </>
  );
}

function MenuLi(props) {
  const dc = props.depthChildren;
  const noAction = (event) => {
    // event.preventDefault();
  };
  return (
    <li className={dc !== undefined ? "depth_menu" : null}>
      <Link to={props.href} onClick={dc !== undefined ? noAction : null}>
        {props.children}
      </Link>
      {dc !== undefined ? (
        <ul className={`depth1`}>
          <li className="depth1_li">
            <Link to={props.href}>{props.children}</Link>
          </li>
          {dc.map((el, index) => {
            return (
              <li className="depth1_li" key={index}>
                <Link to={el.href + "/1"}>{el.name}</Link>
              </li>
            );
          })}
        </ul>
      ) : null}
    </li>
  );
}
export default Header;
