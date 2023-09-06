import coolsms from 'coolsms-node-sdk'
import 'dotenv/config'

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

export const sendSMS = async (myphone, result) => {
  const SMS_KEY = process.env.SMS_KEY
  const SMS_SECRET = process.env.SMS_SECRET
  const SMS_SENDER = process.env.SMS_SENDER

  const mysms = coolsms.default
  const messageService = new mysms( SMS_KEY, SMS_SECRET );

  const response = await messageService.sendOne({
    to: myphone,
    from: SMS_SENDER,
    text: `[트루쓰킴] 나야 ${result}`
  })

  console.log(response);
}
