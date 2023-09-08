import express from 'express'
import { BoardController } from './mvc/controllers/board.controller.js'
import { CouponConroller } from './mvc/controllers/coupon.controller.js'
import { ProductController }from './mvc/controllers/product.controller.js'
import { CashService } from './mvc/controllers/services/cash.service.js'
import { PointService } from './mvc/controllers/services/point.service.js'
import { ProductService } from './mvc/controllers/services/product.service.js'

const app = express()

const cashService = new CashService()
const pointService = new PointService()
const productService = new ProductService()

// 게시판 api
const boardController = new BoardController()
app.get("/boards", boardController.fetchBoards)
app.post("/boards", boardController.createBoard)

const productContoller = new ProductController(cashService, productService)
app.post("/products/buy", productContoller.buyProduct)
app.post("/products/refund", productContoller.refundProduct)

const couponController = new CouponConroller(cashService)
app.post("/coupons/buy", couponController.buyCoupon)


app.listen(3000)