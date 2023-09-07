import express from 'express'
import {ProductController}from './mvc/controllers/product.controller.js'

const app = express()

const productContoller = new ProductController()
app.post("/products/buy", productContoller.buyProduct)
app.post("/products/refund", productContoller.refundProduct)


app.listen(3000)