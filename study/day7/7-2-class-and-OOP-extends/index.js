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

class SkyMonster extends Monster {
  constructor(smPower) {
    // 부모의 constructor에 넘겨준다
    super(smPower)
  }

  run = () => {
    console.log("날아서 도망")
  }
}

class GroundMonster extends Monster {
  run = () => {
    console.log("뛰어서 도망")
  }
}

const myMonster = new SkyMonster(20)
myMonster.run()
myMonster.attack()

const yourMonster = new GroundMonster(50)
yourMonster.run()
yourMonster.attack()