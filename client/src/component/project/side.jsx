import { FontAwsome } from "../common/fontawsome";
import { InsertInput } from "./executionView";
import { useEffect, useState } from "react";
import { BtnArea } from "../common/commonUi";
import { useDispatch, useSelector } from "react-redux";
import { _ProjectMemo } from "../../store/calendarSlice";
import moment from "moment";

export default function Side({ project = {} }) {
  const [look, setLook] = useState(false);
  const [memo, setMemo] = useState("");
  const [memoActive, setMemoActive] = useState(false);
  const [memoList, setMemoList] = useState([]);
  const store = useSelector((state) => state);
  const memoInfo = store.calendarInfo?.memo;
  const dispatch = useDispatch();
  let body;
  useEffect(() => {
    setMemoList(store.calendarInfo.memo);
  }, [store.calendarInfo]);

  const fnc = {
    close: (event) => {
      event.preventDefault();
      setLook(false);
    },
    edit: (event) => {
      event.preventDefault();
    },
    openMemo: (event) => {
      event.preventDefault();
      setLook(true);
    },
    memeoActive: (event) => {
      event.preventDefault();
      if (!memoActive) setMemoActive(true);
      else setMemoActive(false);
    },
    memoHandle: (event) => {
      event.preventDefault();
      setMemo(event.currentTarget.value);
    },
    memoSubmit: (event) => {
      event.preventDefault();
      body = {
        url: `/project/${project.subject}/memo`,
        num: project.num,
        project_name: project.subject,
        userId: project.userId,
        date: moment(new Date()).format("YYYY-MM-DD"),
        memo: memo,
      };
      dispatch(_ProjectMemo(body));

      setMemoActive(false);
      setMemo("");
    },
    deleteMemo: (event) => {
      event.preventDefault();
      // console.log(event.currentTarget.parentNode.children[1].innerText);
      body = {
        url: `/project/${project.subject}/memoDelete`,
        unique_num: event.currentTarget.parentNode.ariaLabel,
        num: project.num,
        project_name: project.subject,
        userId: project.userId,
      };
      dispatch(_ProjectMemo(body));
    },
  };

  if (!!project)
    return (
      <>
        {look ? (
          <div className="project-side">
            <div className="menu-bar">
              <button className="memo" onClick={fnc.memeoActive}>
                <FontAwsome data={"fa-plus"} />
              </button>
              {/* <button className="editBtn" onClick={fnc.edit}>
                <FontAwsome data={"fa-wrench"} />
              </button> */}
              <button className="closeBtn" onClick={fnc.close}></button>
            </div>
            <ul className="project-content">
              <li className="subject">
                <b>Project</b>
                <p className="subject">{project.subject}</p>
              </li>
              <li className="goals">
                <b>목표</b>
                <p>{project.content}</p>
              </li>
              <li className="date">
                <b>기간</b>
                <p>
                  {project.date?.replace(/-/g, '.').replace(/20/g, '')}
                </p>
              </li>
              <li className="des">
                <b>설명</b>
                <p>{project.description}</p>
              </li>
              {!!!memoInfo && !memoActive ? null : (
                <li className="memo">
                  <h3>Memo</h3>
                  {!memoActive ? (
                    <ul className="memo-look">
                      {memoList.length === 0 ?
                        <li>
                          <p className="memo-date">0000-00-00</p>
                          <p className="memo-value">
                            + 눌러 memo를 추가 해보세요.
                          </p>
                        </li>
                        :
                        memoList?.map((el, index) => {
                          return (
                            <li
                              aria-label={`${el.unique_num}`}
                              key={`${el}_${el.unique_num}`}
                            >
                              <p className="memo-date">{el.date}</p>
                              <p className="memo-value">{el.memo}</p>
                              <button
                                className="deleteBtn"
                                onClick={fnc.deleteMemo}
                              >
                                <FontAwsome data={"fa-trash"} />
                              </button>
                            </li>
                          );
                        })
                      }
                    </ul>
                  ) : (
                    <div className="memo-insert">
                      <InsertInput
                        type="textarea"
                        value_={memo}
                        change={fnc.memoHandle}
                      />
                      <BtnArea info={{ Name: "Memo", Click: fnc.memoSubmit }} />
                    </div>
                  )}
                </li>
              )}
            </ul>
          </div>
        ) : (
          <div className="memo-icon" onClick={fnc.openMemo}>
            <FontAwsome data={"fa-file-pen"} />
          </div>
        )}
      </>
    );
}
