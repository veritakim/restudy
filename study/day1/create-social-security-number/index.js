function customRegistrationNumber ( number ) {
  const ex = "123123-2121212";
  const idx = ex.indexOf("-")

  if ( number.indexOf("-") !== idx) {
    console.log("형식이 옳바르지 않습니다")
    return;
  }

  const front = number.split("-")[0]
  const back = number.split("-")[1]



  if ( front.length !== 6 || back.length !== 7 ) {
    console.log("주민번호 앞, 뒤 갯수를 제대로 입력해주세요")
    return;
  }

  const result = number.slice(0, 8)
  console.log(result.padEnd(14, "*"))
}

customRegistrationNumber("010101-4242424")
customRegistrationNumber("010101-42424")
customRegistrationNumber("01010142242424")