import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Auth({ children }) {
  const store = useSelector((state) => state);
  const userInfo = store.userInfo?.data;
  const navigate = useNavigate();
  function click(event) {
    event.preventDefault();
    navigate("/login");
  }
  if (userInfo?.id === undefined && userInfo?.num === undefined) {
    return (
      <div className="auth">
        <h2>로그인 후 이용 가능합니다.</h2>
        <button onClick={click}> 로그인 하러가기</button>
      </div>
    );
  } else return <>{children}</>;
}
