export function getToday() {
  const date = new Date();
  const yyyy = date.getFullYear();
  const mm = date.getMonth() + 1;
  const dd = date.getDate();

  return `${yyyy}-${mm}-${dd}`;
}

export function registerNumber( number ) {
  const ex = "123123-2121212";
  const idx = ex.indexOf("-");

  if ( number.indexOf("-") !== idx) {
    console.log("주민번호 형식이 옳바르지 않습니다");
    return false;
  }

  const front = number.split("-")[0];
  const back = number.split("-")[1];



  if ( front.length !== 6 || back.length !== 7 ) {
    console.log("주민번호 앞, 뒤 갯수를 제대로 입력해주세요");
    return false;
  }

  return true;

  const result = number.slice(0, 8)
  return `${result.padEnd(14, "*")}`;
}

export function checkEmail(email) {
  if (!email.includes("@")) {
    return false;
  }

  return true;
}