import { useCallback } from "react";

export default function LeaningView({ target, change }) {
  return (
    <ul>
      <li>
        {/* <BtnArea
              info={[
                { Name: "+", Click: plushandle },
                { Name: "-", Click: miushandle },
              ]}
            /> */}
      </li>
      {target.map((v, i) => {
        return (
          <li key={`list_${v}_${i}`}>
            <InsertInput name={"subject"} change={change} dataIndex={i}>
              Plan
            </InsertInput>
            <InsertInput name={"content"} change={change} dataIndex={i}>
              Content
            </InsertInput>
            <InsertInput name={"description"} change={change} dataIndex={i}>
              Description
            </InsertInput>
            {/* <div className="line">
              <input
                name={"subject"}
                type="text"
                onChange={callBack}
                data-index={i}
                required
              />
              <label htmlFor="subject">Plan</label>
              <span></span>
            </div> */}
            {/* <div className="line">
              <input
                name={"content"}
                type="text"
                onChange={callBack}
                data-index={i}
                required
              />
              <label htmlFor="content">뜻</label>
              <span></span>
            </div>
            <div className="line">
              <input
                name={"description"}
                type="text"
                // placeholder="description"
                onChange={callBack}
                data-index={i}
                required
              />
              <label htmlFor="description">설명</label>
              <span></span>
            </div> */}
          </li>
        );
      })}
    </ul>
  );
}

function InsertInput({ name, type = "text", change, dataIndex, children }) {
  return (
    <div className="line">
      <input
        name={name}
        type={type}
        // placeholder="description"
        onChange={change}
        data-index={dataIndex}
        required
      />
      <label htmlFor="description">{children}</label>
      <span></span>
    </div>
  );
}
