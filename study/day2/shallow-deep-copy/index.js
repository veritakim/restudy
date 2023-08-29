let money = 1000;
let money2 = money;

money = 500;

console.log(money2) 

const profile = {
  name: "고길동",
  age: 23, 
  school: "yeonsei"
};

const profile2 = profile;

profile.name = "홍둘리"

console.log(profile2)

const newProfile = {
  name: '철수',
  age: 13,
  school: '다람쥐초등학교',
  hobby: {
    one: '수영',
    two: '프로그래밍',
  },
};


// console.log(JSON.stringify(newProfile))
const newProfile2 = JSON.parse(JSON.stringify(newProfile))
newProfile.name = "도우너"
console.log(newProfile2)
