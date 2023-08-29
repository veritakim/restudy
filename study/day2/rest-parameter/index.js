const child = {
  name: '철수',
  age: 8,
  school: '다람쥐초등학교',
  money: 2000,
  hobby: '수영',
};

const {money, hobby, ...rest} = child;
console.log(rest)

const {school, ...student} = child;

console.log(student)