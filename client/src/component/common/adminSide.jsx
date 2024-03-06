import { useDispatch, useSelector } from "react-redux";
import { _Condtion } from "../../store/menuSlice";
import { admDelete } from "../../actions/adm_action";
import { reset } from "../../store/boardSlice";
import { BtnArea } from "./commonUi";

export default function AdminSide() {
  const store = useSelector((state) => state);
  const userInfo = store.userInfo.data;
  const dispatch = useDispatch();
  const param = window.location.search

  function resetHomaPage() {
    let body = { url: "delete", target: "reset" };
    if (userInfo.role === 1)
      if (window.confirm("초기화 하시겠습니까?")) {
        admDelete(body).payload.then((res) => {
          if (res.delete === "success")
            window.location.href = "/download?task=0";
        });
        reset();
      } else return;
  }
  function testIng() {
    let body = {
      url: "/setting/menu",
    };
    dispatch(_Condtion(body));
    alert(`SUCCESS url:${body.url}`);
  }
  console.log(param);
  return (
    <div className="adminSide">
      {userInfo?.role === 1 || param ==="?admin" ? (
        <BtnArea
          info={[
            { Name: "초기화", Click: resetHomaPage },
            { Name: "메뉴 세팅", Click: testIng },
          ]}
        />
      ) : null}
    </div>
  );
}
