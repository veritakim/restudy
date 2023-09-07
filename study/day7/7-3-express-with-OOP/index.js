import express from 'express'
import { Cash } from './cash'
import { Product } from './Product'

const app = express()

app.post("/products/buy", (req, res) => {
  const cashService = new Cash()
  const hasMoney = cashService.checkValue()

  const productService = new Product()
  const isSoldout = productService.checkSoldout()

  if(hasMoney && !isSoldout) {
    res.send("상품 구매 완료")
  }
})

app.post("/products/refund", (req, res) => {
  const productService = new Product()
  const isSoldout = productService.checkSoldout()

  if(isSoldout) {
    res.send("상품 환불 완료")
  }
})

app.listen(3000)