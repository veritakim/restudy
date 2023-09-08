import { CashService } from "./services/cash.service"
import { PointService } from "./services/point.service"
import { ProductService } from "./services/product.service"

export class ProductController {
  constructor(cashService, productService) {
    this.cashService = cashService
    this.productService = productService
  }

  buyProduct = (req, res) => {
    // const cashService = new CashService()
    // const productService = new ProductService()
    // const pointService = new PointService()

    const hasMoney = this.cashService.checkValue()
  
    const isSoldout = this.productService.checkSoldout()
  
    if(hasMoney && !isSoldout) {
      res.send("상품 구매 완료")
    }
  }

  refundProduct = (req, res) => {
    // const productService = new Product()
    const isSoldout = this.productService.checkSoldout()
  
    if(isSoldout) {
      res.send("상품 환불 완료")
    }
  }
}