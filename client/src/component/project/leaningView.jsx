import { useCallback } from "react";
import { Link } from "react-router-dom";
import util from "../../util";

export default function LeaningView({ target, change, view }) {
  const path = util.path();
  const param = window.location.search;
  return (
    <>
      <ul className="project-menu">
        <li>
          <Link to={`?plan`}>Plan</Link>
        </li>
        <li>
          <Link to={`?test`}>Test</Link>
        </li>
      </ul>
      <ul>
        <li>
          {/* <BtnArea
                info={[
                    { Name: "+", Click: plushandle },
                    { Name: "-", Click: miushandle },
                ]}
                /> */}
        </li>
        {target?.map((v, i) => {
          return (
            <li key={`list_${v}_${i}`}>
              {param === "?test" ? (
                <li key={`list_${v}_${i}`}>
                  <div>미구현</div>
                </li>
              ) : (
                <PalnView change={change} index={i} />
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
}
function PalnView({ change, index }) {
  return (
    <>
      <InsertInput name={"type"} change={change} dataIndex={index}>
        Type
      </InsertInput>
      <InsertInput name={"subject"} change={change} dataIndex={index}>
        Plan
      </InsertInput>
      <InsertInput name={"content"} change={change} dataIndex={index}>
        Content
      </InsertInput>
      <InsertInput name={"description"} change={change} dataIndex={index}>
        Description
      </InsertInput>
      <InsertInput name={"color"} change={change} dataIndex={index}>
        Color
      </InsertInput>
    </>
  );
}

function InsertInput({
  name,
  type = "text",
  change,
  dataIndex,
  children,
  placeholder,
}) {
  return (
    <div className="line">
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={change}
        data-index={dataIndex}
        required
      />
      <label htmlFor="description">{children}</label>
      <span></span>
    </div>
  );
}
