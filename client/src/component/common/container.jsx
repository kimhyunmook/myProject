import { useEffect, useLayoutEffect, useState } from "react";
import util from "../../util";

// 안씀

function Container(props) {
  const [h1, setH1] = useState("");
  const path = util.path();
  path.shift();
  let compare = path[path.length - 1];

  useLayoutEffect(() => {
    if (compare !== "download" && compare !== "") {
      // console.log('compare :',compare)
    }
  }, [path[0]]);

  const [winH, setWinH] = useState(window.innerHeight);
  const [headerH, setHeaderH] = useState(0);
  const [_style, setStyle] = useState({});

  useEffect(() => {
    const header = document.querySelector("header");
    // const footer = document.querySelector("footer");
    // setWinH(window.innerHeight - header.offsetHeight - footer.offsetHeight);
    // setHeaderH(header.clientHeight);
  }, []);

  return (
    <div
      className={`container ${props.className ? props.className : ""}`}
      style={props.style}
    >
      {props.children}

      {
        // props.onePage ?
        // <div className="onePage" style={{ marginTop: headerH, height: winH }}>
        // {props.children}
        // </div>
        // : props.children
      }
      {/* {
                props.loading !== undefined ?
                    <Loading>
                    </Loading>
                    : props.children
            } */}
    </div>
  );
}

export default Container;
