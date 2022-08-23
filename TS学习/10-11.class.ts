// 抽象类 只能被继承，不能被实例化
abstract class Animal {
    eat() {
        console.log('eat')
    }
    abstract sleep(): void
}
// let animal = new Animal()

class Dog extends Animal {
    constructor(name: string) {
        super()
        this.name = name
        this.pri()
    }
    public name: string = 'dog'
    run() {}
    private pri() {} // 只能在类本身调用，不能被继承
    protected pro() {} // 只能在类或者子类中调用，不能被实例调用
    readonly legs: number = 4
    static food: string = 'bones' //只能用类名调用，可以被继承
    sleep() {
        console.log('Dog sleep')
    }
}
// console.log(Dog.prototype)
let dog = new Dog('wangwang')
// console.log(dog)
// dog.pri()
// dog.pro()
console.log(Dog.food)
dog.eat()

class Husky extends Dog {
    constructor(name: string, public color: string) {
        super(name)
        this.color = color
        // this.pri()
        this.pro()
    }
    // color: string
}
console.log(Husky.food)

class Cat extends Animal {
    sleep() {
        console.log('Cat sleep')
    }
}
let cat = new Cat()

let animals: Animal[] = [dog, cat]
animals.forEach(i => {
    i.sleep()
})

class Workflow {
    step1() {
        return this
    }
    step2() {
        return this
    }
}
new Workflow().step1().step2()

class MyFlow extends Workflow {
    next() {
        return this
    }
}
new MyFlow().next().step1().next().step2()
