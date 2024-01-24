import { useEffect } from "react";
import { Container2 } from "../common/commonUi";
import { faChild } from "@fortawesome/free-solid-svg-icons";

export default function About({}) {
  let info = {
    className: "about",
  };
  useEffect(() => {}, []);
  return (
    <Container2 info={info}>
      <div className="about-banner">
        <h3>ABOUT</h3>
        {/* <a href="https://kr.freepik.com/free-photo/contemporary-office_5398660.htm#query=%EC%82%AC%EB%AC%B4%EC%8B%A4%20%EB%B0%B0%EA%B2%BD&position=19&from_view=keyword&track=ais&uuid=e0606842-4b19-4aa2-bfd9-37a6e0767306">작가 pressfoto</a> 출처 Freepik */}
      </div>
      <section>
        <Article title="Hello" sizeFee={true} className="greetings">
          <p></p>
        </Article>
      </section>
    </Container2>
  );
}

function Article({ title, className, children, sizeFee }) {
  const Style = {
    height: sizeFee ? null : window.innerHeight,
  };
  return (
    <article className={className} style={Style}>
      <h3>{title}</h3>
      {children}
    </article>
  );
}
