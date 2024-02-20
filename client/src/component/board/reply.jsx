import { FontAwsome } from "../common/fontawsome";
import { BtnArea } from "../common/commonUi";

function Reply({ id, text, textEvent, click }) {
  return (
    <div className="reply-insert">
      <p className="userId">{id}</p>
      <textarea
        name="content"
        value={text}
        cols="50"
        rows="5"
        onChange={textEvent}
      ></textarea>
      <BtnArea
        className="replay-button"
        info={{ Name: <FontAwsome data={"fa-pen-nib"} />, Click: click }}
      />
    </div>
  );
}

export default Reply;
