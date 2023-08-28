import { checkValidationPhone, getToken, sendSMS } from './phone.js'

function createTokenOfPhone(myphone, count){
  const isValid = checkValidationPhone(myphone)
  if (isValid === true ) {
    const token = getToken(count);

    sendSMS(myphone, token);
  } 
}


createTokenOfPhone("01012345678", 6)