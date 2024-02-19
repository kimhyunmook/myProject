import { useState, useLayoutEffect, useEffect, useRef, useMemo } from "react";
import LoginList from "./loginList";
import { loginToken } from "../../actions/type";
import { FontAwsome } from "./fontawsome";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Logo, { homelink } from "./logo";
import util from "../../util";
import { headerSize, mobileSize } from "../../size";
import { MobileUi } from "./commonUi";

function Header({}) {
  const store = useSelector((state) => state);
  const loginCookieName = loginToken;
  const [userInfo, setUserInfo] = useState({});
  const [menu, setMenu] = useState([]);
  const path = util.path();
  const menuInfo = store.menuInfo.data;
  const header = useRef(null);
  const [id, setId] = useState("header");
  const [winW, setWinW] = useState(window.outerWidth);
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();
  const navMenu = useRef(null);

  // scroll
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScrollY(window.scrollY);
    });
    window.addEventListener("resize", () => {
      setWinW(window.outerWidth);
    });
  }, [winW, scrollY]);
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
    navigate("/");
  }
  function openMobilemenu(event) {
    event.preventDefault();
    navMenu.current.classList.add("on");
  }

  function closeMobileMenu(event) {
    event.preventDefault();
    navMenu.current.classList.remove("on");
  }

  return (
    <>
      <header
        id={id}
        ref={header}
        className={scrollY > 0 ? "on" : ""}
        style={{
          height: winW <= mobileSize ? headerSize.mobile : headerSize.desktop,
        }}
      >
        <div className="header">
          <Logo click={homelink}></Logo>
          <nav className="header-nav">
            <MobileUi windowWidth={winW}>
              <div className="hambuger-menu" onClick={openMobilemenu}>
                <FontAwsome data={"fa-hambuger"} />
              </div>
            </MobileUi>
            <ul className="header-nav-menu" ref={navMenu}>
              <MobileUi windowWidth={winW}>
                <li className="closeBtn" onClick={closeMobileMenu}></li>
              </MobileUi>
              <li>
                <a href="/" onClick={homelink}>
                  홈
                </a>
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
              {/* <MobileUi windowWidth={winW}>
                <li className="login-li">
                  <LoginList
                    loginCookieName={loginCookieName}
                    userInfo={userInfo}
                  />
                </li>
              </MobileUi> */}
            </ul>
          </nav>
          <LoginList loginCookieName={loginCookieName} userInfo={userInfo} />
          <MobileUi windowWidth={winW} reverse={true}></MobileUi>
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
