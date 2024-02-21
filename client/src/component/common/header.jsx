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
import AdminSide from "./adminSide";

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

  function openMobilemenu(event) {
    event.preventDefault();
    navMenu.current.classList.add("on");
  }

  function closeMobileMenu(event) {
    event.preventDefault();
    navMenu.current.classList.remove("on");
  }
  function menuEventHandle(event) {
    if (event.currentTarget.href !== window.location.href) closeMobileMenu();
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
          <Logo click={menuEventHandle}></Logo>
          <nav className="header-nav">
            <MobileUi>
              <div className="hambuger-menu" onClick={openMobilemenu}>
                <FontAwsome data={"fa-hambuger"} />
              </div>
            </MobileUi>
            <ul className="header-nav-menu" ref={navMenu}>
              <MobileUi>
                <li className="closeBtn" onClick={closeMobileMenu}></li>
                <li>
                  <LoginList
                    loginCookieName={loginCookieName}
                    userInfo={userInfo}
                  />
                </li>
              </MobileUi>

              <li>
                <Link to="/" onClick={menuEventHandle}>
                  홈
                </Link>
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
                  return (
                    <MenuLi {...info} onClick={menuEventHandle}>
                      {el.name}
                    </MenuLi>
                  );
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
          <MobileUi reverse={true}></MobileUi>
        </div>
        <AdminSide></AdminSide>
      </header>
    </>
  );
}

function MenuLi(props) {
  return (
    <li>
      <Link to={props.href} onClick={props.onClick}>
        {props.children}
      </Link>
    </li>
  );
}
export default Header;
