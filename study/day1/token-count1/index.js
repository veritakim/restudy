console.log("Hi!");

function getToken() {
  const result = String(Math.floor(Math.random() * 1000000)).padStart(6, '0');

  console.log(result);

  return result;
}

getToken();

// 원하는 만큼 랜덤 숫자 만들기

function getTokenCount(count) {
  const result2 = String(Math.floor(Math.random() * 10 ** count)).padStart(count, '0');

  console.log(`count Token is ${result2}`);
  
  return result2;
}

getTokenCount(3);
getTokenCount(4);

