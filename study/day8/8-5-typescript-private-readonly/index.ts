//
// public
class Aaa1 {
  constructor(public mypower) {
    // this.mypower = mypower
  }

  ggg() {
    console.log(this.mypower); // 안에서 접근 가능
    this.mypower = 10; // 안에서 수정가능
  }
}

class Aaa2 extends Aaa1 {
  ggg() {
    console.log(this.mypower); // public은 자식인 Aaa2에서 접근, 수정 가능
    this.mypower = 10;
  }
}

const aaa = new Aaa2(50);
console.log(aaa.mypower); // class밖에서 접근 가능
aaa.mypower = 10; // class밖에서 수정 가능

//
//
//
// protected
class Bbb1 {
  constructor(protected mypower) {
    // this.mypower = mypower
  }

  ggg() {
    console.log(this.mypower); // 안에서 접근 가능
    this.mypower = 10; // 안에서 수정가능
  }
}

class Bbb2 extends Bbb1 {
  ggg() {
    console.log(this.mypower); // protected 자식인 Aaa2에서 접근, 수정 가능
    this.mypower = 10;
  }
}

const bbb = new Bbb2(50);
console.log(bbb.mypower); // class밖에서 접근 불가
bbb.mypower = 10; // class밖에서 수정 불가

//
//
//
// private

class Ppp1 {
  constructor(private mypower) {
    // this.mypower = mypower
  }

  ggg() {
    console.log(this.mypower); // 안에서 접근 가능
    this.mypower = 10; // 안에서 수정가능
  }
}

class Ppp2 extends Ppp1 {
  ggg() {
    console.log(this.mypower); // 자식 안에서 접근 불가
    this.mypower = 10; // 자식 안에서 수정 불가
  }
}

//
//
//
// readonly
// 부모 접근 가능 / 수정 불가
// 자식 접근 가능 / 수정 불가
// class 외부 접근 가능 / 수정 불가

//
//
//
// private readonly
// 부모에서만 접근 가능 / 수정 불가
