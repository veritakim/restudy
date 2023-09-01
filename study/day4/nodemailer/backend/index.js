// const express = require('express')
import express from 'express'
import {getToken, checkValidationPhone, sendSMS} from './phone.js'
import {checkValidationEmail, getWelcomeTemplate, sendTemplateToEmail} from './email.js'
import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'
import { options } from './swagger/config.js'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)));
app.get('/boards', (req, res) => {
  const result = [
    { number: 1, writer: "철수", title: "제목없슴", contents: "내용"},
    { number: 2, writer: "영희", title: "제목영희", contents: "영희의 내용"},
    { number: 3, writer: "만두", title: "제목만두", contents: "만두의 내용"},
  ]

  res.send(result);
})

app.post('/boards', (req, res) => {
  console.log(req.body.writer)
  console.log(req.body.title)
  console.log(req.body.contents)

  res.send("게시물 등록에 성공하였습니다.")
})

app.post('/tokens/phone', (req, res) => {
  const isValid = checkValidationPhone(req.body.myphone)
  if (isValid === true ) {
    const token = getToken(6);
    
    sendSMS(req.body.myphone, token)
    res.send("인증완료")
  } else {
    res.send("핸드폰 번호를 다시 확인하세요")
  }
})

app.post('/users', (req, res) => {
  // 회원가입하고 이메일 보내기
  const isValid = checkValidationEmail(req.body.myuser.email)
  if (isValid === false) return

  /*
  const name = req.body.name
  const age = req.body.age
  const school = req.body.school
  */

  const {email, name, age, school, ...rest} = req.body.myuser
  const result = getWelcomeTemplate({email, name, age, school})
  sendTemplateToEmail({email, result})
  res.send("가입완료")
})

app.listen(3000, () => {
  console.log(`프로그램을 켜는데 성공했어요.`)
})