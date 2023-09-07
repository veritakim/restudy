const aaa = new Date()
const yyyy = aaa.getFullYear()
const mm = aaa.getMonth() + 1

class Monster {
  power = 10

  constructor(monsterPower){
    this.power = monsterPower
  }

  attack = () => {
    console.log("attack!!!!!")
    console.log("내 공격력은 " + this.power)
  }

  run = () => {
    console.log("run!!!")
  }

  jump = () => {
    console.log("jump!!!")
  }
}

const myMonster = new Monster(20)
myMonster.jump()
myMonster.attack()

const yourMonster = new Monster(30)
yourMonster.attack()