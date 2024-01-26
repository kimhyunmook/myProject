import { useCallback, useState } from "react";
import { Container2 } from "../common/commonUi";

export default function Test() {
  const [test, setTest] = useState(["test"]);
  const click = useCallback((event) => {
    event.preventDefault();
    setTest(test.concat("hello"));
  });
  const submit = (event) => {
    event.preventDefault();
    console.log(test);
  };
  return (
    <Container2>
      <button style={{ zIndex: 9999, height: "999px" }} onClick={click}>
        클릭
      </button>
      <button style={{ zIndex: 9999, height: "999px" }} onClick={submit}>
        보내기
      </button>
    </Container2>
  );
}
