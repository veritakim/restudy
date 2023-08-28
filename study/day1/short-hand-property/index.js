import { getToday, checkEmail, registerNumber } from './util.js'

function registerTemplate ({name, email, number, site}) {
  if (!checkEmail(email)) {
    console.log("이메일 형식을 확인하세요")
    return
  }

  if (registerNumber(number)){
    return sendEmail({name, email, number, site});
  }

}

function sendEmail({name, email, number, site}) {
  console.log(`
  <html>
    <body>
    <h1>${name}님 가입을 환영합니다.</h1>
                <hr />
                <div>이름: ${name}</div>
                <div>이메일: ${email}</div>
                <div>주민등록번호: ${number}</div>
                <div>좋아하는 홈페이지: ${site}</div>
                <div>가입일: ${getToday()}</div>
    </body>
  </html>
  
  `)
}
const user = {
  name: "고길동",
  email: "asvcode.com",
  number: "123123-1231213",
  site: "www.naver.com"
}
registerTemplate ({...user})