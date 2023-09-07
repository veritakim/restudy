import express from 'express'
import { BoardController } from './mvc/controllers/board.controller.js'
import { CouponConroller } from './mvc/controllers/coupon.controller.js'
import { ProductController }from './mvc/controllers/product.controller.js'

const app = express()

// 게시판 api
const boardController = new BoardController()
app.get("/boards", boardController.fetchBoards)
app.post("/boards", boardController.createBoard)

const productContoller = new ProductController()
app.post("/products/buy", productContoller.buyProduct)
app.post("/products/refund", productContoller.refundProduct)

const couponController = new CouponConroller()
app.post("/coupons/buy", couponController.buyCoupon)


app.listen(3000)