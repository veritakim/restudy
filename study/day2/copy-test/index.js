const child1 = {
  name: '철수',
  age: 13,
  school: '다람쥐초등학교',
};

// shallow copy
const child2 = {...child1};
child2.name = "영희";

console.log(child2);

const man1 = {
  name: { first: '김', last: '철수' },
  age: 13,
  school: '다람쥐초등학교',
};

const man2 = JSON.parse(JSON.stringify(man1));

man2.name.first = "최";
man2.name.last = "영희";

console.log(man1);
console.log(man2);
