import { getToday } from "./util.js"
import nodemailer from "nodemailer"

export const checkValidationEmail = (email) => {
  if (email === undefined || !email.includes("@")) {
    return false;
  }
}

export function getWelcomeTemplate({email, name, age, school}){
    const createdAt = getToday()
    return `
        <html>
            <body>
                <h1>${name}님 가입을 환영합니다.</h1>
                <hr />
                <div>이름: ${name}</div>
                <div>나이: ${age}살</div>
                <div>학교: ${school}</div>
                <div>가입일: ${createdAt}</div>
            </body>
        </html>
    `
}

export async function sendTemplateToEmail({email, result}){
    // console.log(mytemplate)
    const USER_MAIL = process.env.USER_MAIL
    const USER_PASS = process.env.USER_PASS

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: USER_MAIL,
            pass: USER_PASS
        }
    })

    const response = await transporter.sendMail({
        from: USER_MAIL,
        to: email,
        subject: "[가입축하] 가입을 축하합니다",
        html: result
    })
    
    console.log(response)
}