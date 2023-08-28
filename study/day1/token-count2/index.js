// 너무 큰 숫자를 넣어 입력하기 힘든 토큰을 만들 경우 에러처리해주기

function getTokenCount(count) {

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

  const result = String(Math.floor(Math.random() * 10 ** count)).padStart(count, '0');
  console.log(`count Token is ${result}`);
  
  return result;
}

getTokenCount();
getTokenCount(-3);
getTokenCount(4);

