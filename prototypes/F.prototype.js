// * Func.prototype (свойтсво "prototype" у функций, в частности у функций-конструкторов)

/* 
У каждой функции (за исключением стрелочных) по умолчанию уже есть свойство "prototype".
(Для ее нахождения функцию нужно передать в console.dir)

Значением этого свойства является объект с единственным свойством constructor,
которое ссылается на ту же самую функцию.
*/

function showGreeting() {
  return 'hello';
}

console.dir(showGreeting); // у функции есть свойство 'prototype'
alert(showGreeting.prototype.constructor === showGreeting); // true

/* 
Рассмотрим случай с функциями-конструкторами. При создании объекта с помощью функций-конструкторов
оператор new устанавливает в качестве [[Prototype]] значение свойства "prototype", то есть
объект со свойством constructor, ссылающийся на функцию:
*/

function Hamster(name) {
  this.name = name;
}

let hamster = new Hamster('syrian hamster'); // [[Prototype]] === {constructor: function Hamster(name) {...}}

alert(hamster.constructor === Hamster); // true (получаем свойство constructor из прототипа)

// Мы можем использовать свойство constructor существующего объекта для создания нового:
let hamster2 = new hamster.constructor('chinese hamster');

/* 
Это удобно, когда у нас есть объект, но мы не знаем, какой конструктор
использовался для его создания (например, он мог быть взят из сторонней библиотеки),
а нам необходимо создать ещё один такой объект
*/

/* 
У любой функции (за исключением стрелочных) можно перезаписать значение свойства 'prototype'
(то есть перезаписать объект со свойством constructor).

Тогда, в случае с функциями-конструкторами, у объектов, созданных с помощью оператора new,
в [[Prototype]] будет новое перезаписанное значение:
*/

function Hare() {}

Hare.prototype = {
  jumps: true,
};

let hare = new Hare();
alert(hare.constructor === Hare); // false
alert(hare.jumps); // true

/*
Если мы еще раз перезапишем значение свойства 'prototype', например: Hare.prototype = { jumps: true },
то объект ({ jumps: true }) в прототипе у ранее созданного hare сохранится (не изменится),

а новые сущности, созданные как: new Hare(), будут иметь в качестве [[Prototype]] объект { jumps: true }.

Так происходит потому, что объект в качестве [[Prototype]] присваивается в момент вызова new Hare().

А для того, чтобы сохранить объект со свойством "constructor" в прототипе,
мы должны добавлять/удалять/изменять свойства у него вместо того, чтобы перезаписывать его целиком:
*/

function Cat() {}

Cat.prototype.jumps = true;

let cat = new Cat();
console.log(cat.constructor.prototype); // { jumps: true, constructor: ƒ }

// Или мы можем заново создать свойство constructor:

function Dog() {}

Dog.prototype = {
  jumps: true,
  constructor: Dog,
};

let dog = new Dog();
console.log(dog.constructor === Dog); // true
console.log(dog.constructor.prototype); // {jumps: true, constructor: ƒ}

// * итого

/* 
Мы кратко рассмотрели способ задания [[Prototype]] для объектов, создаваемых с помощью функции-конструктора.

Всё достаточно просто:

- свойство F.prototype (не путать с [[Prototype]]) устанавливает[[Prototype]]
для новых объектов при вызове new F().
- значение F.prototype должно быть либо объектом, либо null. Другие значения не будут работать.
*/
