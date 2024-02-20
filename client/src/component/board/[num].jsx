import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container2 } from "../common/commonUi";
import Reply from "./reply";
import { FontAwsome } from "../common/fontawsome";
import { getDate } from "../../actions/tool_action";
import {
  _InsertWrite,
  _ViewContent,
  _DeleteTarget,
} from "../../store/boardSlice";
import { BtnArea } from "../common/commonUi";
import util from "../../util";

function ContentBoard() {
  const store = useSelector((state) => state);
  const userInfo = store.userInfo.data;
  const [boardInfo, setBoardInfo] = useState("");
  const [w_comment, setW_comment] = useState(0);
  const [replyText, setReplyText] = useState("");
  const [replyView, setReplyView] = useState([]);
  const [replyState, setReplyState] = useState(false);
  const [subject, setSubject] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const path = util.path();
  let body;

  const moveList = (event) => {
    event.preventDefault();
    navigate(`/board/${path[2]}/1`);
  };
  const moveModify = (event) => {
    event.preventDefault();
    navigate(`/board/${path[2]}/modify/${boardInfo.w_num}`);
  };
  const deleteList = useCallback(async () => {
    if (window.confirm("삭제 하시겠습니까?")) {
      body = {
        name: path[2],
        w_num: path[4],
      };
      await dispatch(_DeleteTarget(body));
      await navigate(`/board/${path[2]}/1`);
    } else return;
  });

  const onReplyHandler = (event) => {
    event.preventDefault();
    setReplyText(event.currentTarget.value);
  };

  const replyButton = (event) => {
    event.preventDefault();
    if (!replyState) setReplyState(true);
    else setReplyState(false);
  };
  const reply = async (event) => {
    event.preventDefault();
    body = {
      w_comment: w_comment,
      w_time: getDate(),
      d_time: getDate("display"),
      content: replyText,
      user_id: userInfo.id,
      board_type: "reply",
      w_num: path[4],
      subject: `reply_${path[4]}`,
      url: `/${path[2]}`,
      notice: "false",
    };

    await setReplyState(false);
    await dispatch(_InsertWrite(body));
    await setReplyView(store.boardInfo.reply);
    await setReplyText("");
  };

  const replyVarValueEventHandler = (event) => {
    event.preventDefault();
    const depth = event.currentTarget.nextSibling;
    if (depth.classList[1] === undefined) {
      depth.classList.add("on");
    } else {
      depth.classList.remove("on");
    }
  };

  const replyDel = async (event) => {
    event.preventDefault();
    const replyTarget = event.target.classList[1];
    if (window.confirm("삭제하시겠습니까")) {
      body = {
        name: path[2],
        w_id: replyTarget,
      };
      await dispatch(_DeleteTarget(body));
    } else return;
  };

  useEffect(() => {
    if (store.boardInfo.view !== undefined) {
      setBoardInfo(store.boardInfo.view);
      setW_comment(store.boardInfo.view.w_comment);
      setReplyView(store.boardInfo.reply);
      if (store.boardInfo.view.subject !== undefined) {
        let last = 20;
        if (store.boardInfo.view.subject.length > last) {
          setSubject(store.boardInfo.view.subject.substr(0, last) + "....");
        } else setSubject(store.boardInfo.view.subject);
      }
    }
  }, [store]);

  useLayoutEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    body = {
      name: path[2],
      w_num: path[4],
    };
    dispatch(_ViewContent(body));
  }, []);
  let topBtn = [
    {
      Name: <FontAwsome data={"fa-list"} />,
      Click: moveList,
    },
    {
      Name: <FontAwsome data={"fa-wrench"} />,
      Click: moveModify,
      ternaryOperator: {
        condition: userInfo.id === boardInfo.user_id,
        reverseResult: null,
      },
    },
    {
      Name: "삭제",
      Click: deleteList,
      ternaryOperator: {
        condition: userInfo.id === boardInfo.user_id,
        reverseResult: null,
      },
    },
  ];

  return (
    <Container2 info={{ className: "container-normal" }}>
      <div className="board board-Mini">
        <div className="board-content">
          <div className="flex-box subjectLine">
            <div className="board-content-sbj">{subject}</div>
            <div className="board-content-right">
              <p className="hit">조회수: {boardInfo.hit + 1}</p>
              <p className="user">작성자: {boardInfo.user_id}</p>
              <p className="time">{boardInfo.w_time}</p>
              <BtnArea info={topBtn} />
            </div>
          </div>

          <pre className="board-content-txt">{boardInfo?.content}</pre>
        </div>
        {!replyState ? (
          <BtnArea
            className={"replay-button"}
            info={{ Name: "댓글 작성", Click: replyButton }}
          />
        ) : (
          <BtnArea
            className={"replay-button-x"}
            info={{
              Name: <FontAwsome data={"fa-xmark"} />,
              Click: replyButton,
            }}
          />
        )}
        <div className="reply">
          {replyState ? (
            <Reply
              id={userInfo.id}
              text={replyText}
              textEvent={onReplyHandler}
              click={reply}
            />
          ) : null}
          <ul className="reply-list">
            {replyView.map((el, index) => {
              return (
                <li className="reply-info" key={index}>
                  <p className="reply-userId">
                    {userInfo.id === boardInfo.user_id ? (
                      <FontAwsome data={"fa-pen-nib"} />
                    ) : null}
                    <span style={{ marginLeft: "5px" }}>{el.user_id}</span>
                  </p>
                  <p className="reply-content">{el.content}</p>
                  <p className="reply-time">{el.d_time}</p>

                  <a href="#" className="reply-varValue">
                    <p onClick={replyVarValueEventHandler}>
                      <FontAwsome data={"fa-bars"} />
                    </p>
                    <ul className="reply-varValue-depth">
                      <li className={`delete ${el.w_id}`} onClick={replyDel}>
                        삭제
                      </li>
                      <li>추천</li>
                    </ul>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Container2>
  );
}

export default ContentBoard;
