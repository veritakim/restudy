export function checkValidationPhone(myphone){
  if (myphone.length !== 10 && myphone.length !== 11) {
    console.log('핸드폰 번호를 제대로 입력해주세요')

    return false; 
  } else {
    return true;
  }
}


export function getToken(count){
  if ( count === undefined ) {
    console.log('Error!!! 다시 입력해주세요.');
    return;
  } else if (count <= 0) {
    console.log('에러 발생!!! 갯수가 너무 적습니다!!!');
    return;
  } else if ( count >= 10 ) {
    console.log('에러 발생!!! 갯수가 너무 많습니다!!!');
    return;
  }

  const result = String( Math.floor( Math.random() * 10 ** count ) ).padStart(count, '0')
  return result;
}

export function sendSMS (myphone, result) {
  console.log(`[Web발신] ${myphone}로 보낸 인증번호는 ${result}입니다.`);
}
