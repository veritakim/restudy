import { Cash } from "./services/cash"

export class CouponConroller {
  buyCoupon = (req, res) => {
    // 가진 돈 검증코드
    const cashService = new Cash()
    const hasMoney = cashService.checkValue()

    if(hasMoney) {
      res.send("쿠폰 구매 완료")
    }
  }


}