const util = {
  /**
   * 로그인 시 가능한 기능
   * @param {*} userInfo
   */
  auth: (userInfo) => {
    if (userInfo.id === undefined) return alert("로그인 후 이용해주세요.");
  },
  /**
   * 핸드폰 번호 함수 자동 적으로 하이푼(-)을 넣어줌
   * @param {*} e
   * @returns ex) 000-0000-0000
   */
  phoneNumber: (e) => {
    let re = /[^0-9]/g;
    let data = e.nativeEvent.data;
    let value = e.currentTarget.value;
    let number = re.exec(data);

    if (number !== null && number["input"] !== "null") {
      alert("숫자만 입력해주세요");
      e.currentTarget.focus();
    }
    value = value
      .replace(/[^0-9]/g, "")
      .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
      .replace(/(\-{1,2})$/g, "");

    return value;
  },
  /**
   * path를 배열로 반환 parameter 에 원하는 index 값 반환 가능
   * @param index integer
   * @returns ['','','']
   */
  path: (index) => {
    const path = window.location.pathname.split("/");

    if (Number.isInteger(index)) {
      return path[index];
    }
    return path;
  },
  /**
   * url parameter 을 찾는 용도
   * @param target string
   * @returns
   */
  urlParam: (target) => {
    let param = window.location.search.split("?")[1];
    if (target !== undefined) {
      target = target.trim();
      param = param.split(target + "=")[1];
    }

    return param;
  },
};

export default util;
