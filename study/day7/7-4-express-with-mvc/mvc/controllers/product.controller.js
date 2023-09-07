import { Cash } from "./services/cash"
import { Product } from "./services/product"

export class ProductController {
  buyProduct = (req, res) => {
    const cashService = new Cash()
    const hasMoney = cashService.checkValue()
  
    const productService = new Product()
    const isSoldout = productService.checkSoldout()
  
    if(hasMoney && !isSoldout) {
      res.send("상품 구매 완료")
    }
  }

  refundProduct = (req, res) => {
    const productService = new Product()
    const isSoldout = productService.checkSoldout()
  
    if(isSoldout) {
      res.send("상품 환불 완료")
    }
  }
}