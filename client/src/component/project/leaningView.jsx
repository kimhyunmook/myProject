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

export function InsertInput({
  name,
  type = "text",
  change,
  focus,
  click,
  dataIndex,
  children,
  value,
  placeholder,
  className = "line",
  label,
}) {
  return (
    <div className={className}>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={change}
        onBlur={focus}
        onFocus={focus}
        onClick={click}
        data-index={dataIndex}
        required
      />
      <label htmlFor="description">
        {!!!label ? children : label}
      </label>
      <span></span>
      {!!!label ? label : children}
    </div>
  );
}
