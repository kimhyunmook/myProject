import { useDispatch } from "react-redux";
import { _GetLike } from "../../store/likeSlice";

export default function Likes(props) {
  const dispatch = useDispatch();
  const likes = props.like;
  const banerStyle = {
    backgroundImage:
      props.background_image !== undefined
        ? `url('${props.background_image}')`
        : "none",
    backgroundPosition: "center",
    backgroundRepeact: "no-repeact",
    backgroundSize: "100%",
    backgroundAttachment: "fixed",
  };
  const fontStyle = {
    ...props.titleStyle,
  };
  let title = true;
  if (props.title !== undefined) title = props.title;
  return (
    <div className="likes-cover" style={{ ...banerStyle, ...props.style }}>
      {title ? <h2 style={fontStyle}>{props.children}</h2> : null}
      {props.description === undefined ? null : (
        <p className="like-description" style={props.descriptionStyle}>
          {props.description}
        </p>
      )}
      <ul className="like">
        {likes !== undefined
          ? likes.map((el, i) => {
              const clickHandle = async (event) => {
                event.preventDefault();
                if (props.userInfo.data.num === undefined)
                  return alert("로그인 이후 이용해주세요");
                let click = false;
                if (event.type === "click") click = true;

                let body = {
                  url: "/setting/like",
                  hit: el.hit,
                  type: el.type,
                  userNum: props.userInfo.num,
                  click,
                };
                dispatch(_GetLike(body));
              };
              return (
                <li key={i}>
                  <a href="#" className={el.type} onClick={clickHandle}>
                    {el.icon}
                  </a>
                  <p className="like_hit">{el.hit}</p>
                </li>
              );
            })
          : null}
      </ul>
      <div className="disNo">{props.from}</div>
    </div>
  );
}
