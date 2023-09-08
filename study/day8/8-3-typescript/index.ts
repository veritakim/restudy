// 타입 추론
let aaa = "안녕하세요";
aaa = 3;

let ccc: number | string = 1000;
ccc = "1000원";

let fff: number[] = [1, 2, 3, 4];
fff = ["1", 2, "3"];

let ggg: (string | number)[] = [1, 2, 3, "4"];

interface IProfile {
  name: string;
  age: number | string;
  school: string;
  hobby?: string;
}

const profile: IProfile = {
  name: "harry",
  age: 13,
  // school이 없어서 error
};

const add = (money1: number, money2: number, unit: string): string => {
  return money1 + money2 + unit;
};

const result = add(1000, 2000, "달러");
