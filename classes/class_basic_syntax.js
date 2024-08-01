// * Классы

/*
Класс – это расширяемый шаблон кода для создания объектов, который устанавливает в них
начальные значения (свойства) и реализацию поведения (методы).

class MyClass {
  constructor() {}
  method() {}
  ...
}

Затем используется вызов new MyClass() для создания нового объекта со всеми перечисленными методами.
При этом автоматически вызывается метод constructor(), в нём мы можем инициализировать объект.
*/

class User {
  constructor(name) {
    this.name = name;
  }
  greeting() {
    alert(this.name);
  }
}

// Использование:
let alex = new User('Alex');
alex.greeting(); // 'Alex'

alert(alex); // { name: 'Alex' }

/*
При вызове конструктора new User('Alex'):
- coздаётся новый объект
- запускается метод constructor с заданным аргументом и сохраняет его в this.name

…Затем можно вызывать на объекте методы, такие как user.greeting().

Методы в классе не разделяются запятой
*/

//_ Что из себя представляет класс?

/*
Конструкция class User {...}
- coздаёт функцию с именем User, которая становится результатом объявления класса.
Код функции берётся из метода constructor (она будет пустой, если такого метода нет).
- сохраняет все методы, такие как greeting, в User.protorype (эти методы становятся неперечислимыми).

Таким образом, объекты new User имеют доступ к методам класса.


User																			User.prototype
|---------------------|										|-----------------------|
| constructor(name) { |		prototype				| constructor: User   	|
| 	this.name = name;	| ---------------> 	| greeting: function		|
| }										|										| 											|
|---------------------|										|-----------------------|
*/

// класс - это функция
alert(typeof User); // function

// ...или, если точнее, это метод constructor
alert(User === User.prototype.constructor); // true

// методы находятся в User.prototype, например:
alert(User.prototype.greeting); // greeting() { alert(this.name); }

// в прототипе ровно 2 метода
alert(Object.getOwnPropertyNames(User.prototype)); // [ 'constructor', 'greeting' ]

//_ Различия классов и функций-конструкторов

/* 
1. В отличие от обычных функций, конструктор класса не может быть вызван без new.
Строковое представление конструктора класса в большинстве движков JavaScript начинается с «class …».

2. В классах методы записываются в прототип и становятся неперечислимыми.
Определение класса устанавливает флаг enumerable в false для всех методов в "prototype".

И это хорошо, так как если мы проходимся циклом for..in по объекту, то обычно мы не хотим
при этом получать методы класса.

В функциях-конструкторах методы записываются в сам объект и являются перечисляемыми.

Мы можем изменять прототип объектов, созданных с помощью функций-конструкторов,
но не можем изменять прототип объектов, созданных с помощью классов.

3. Классы всегда используют use strict. Весь код внутри класса автоматически находится в строгом режиме.
*/

//_ Class Expression (по анологии с Function Expression)

/* 
Как и функции, классы можно определять внутри другого выражения, передавать,
возвращать, присваивать и т.д.
*/

let User = class {
  greeting() {
    alert('Hello!');
  }
};

/* 
Аналогично Named Function Expression, Class Expression может иметь имя.
Если у Class Expression есть имя, то оно видно только внутри класса:
*/

let Person = class MyClass {
  greeting() {
    alert(MyClass);
  }
};

new Person().greeting(); // class MyClass { greeting() { alert(MyClass); } }

alert(MyClass); // Uncaught ReferenceError: MyClass is not defined

// можно динамически создавать классы:

function makeClass() {
  return class {
    constructor(name) {
      this.name = name;
    }
    greeting() {
      alert(`Hello! My name is ${this.name}`);
    }
  };
}

let User = makeClass('Hi!');
const john = new User('John');

john.greeting(); // 'Hello! My name is John'

//_ Геттеры/сеттеры в классах

/* 
Как и в литеральных объектах, в классах можно объявлять вычисляемые свойства, геттеры/сеттеры и т.д.

Вот пример user.name, реализованного с использованием get/set:
*/

class User {
  constructor(name) {
    // вызывает сеттер
    this.name = name;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    if (value.length < 4) {
      alert('Имя слишком короткое');
      return;
    }
    this._name = value;
  }
}

let user = new User('Andryush');
alert(user.name); // 'Andryush'

let user2 = new User(''); // 'Имя слишком короткое'
alert(user2.name); // undefined

// При объявлении класса геттеры/сеттеры создаются на User.prototype

//_ Свойства классов

class User {
  name = 'Аноним';

  greeting() {
    alert(`Привет, ${this.name}!`);
  }
}

new User().greeting(); // 'Привет, Аноним!'

/* 
name является свойством объекта, создаётся оператором new перед запуском конструктора.
Оно не устанавливается в User.prototype.

В этом примере мы создали свойство без использования конструктора. При создании свойства
с таким же именем через конструктор, созданное свойство перезапишет текущее значение 'Аноним'
*/

//_ Методы могут вызывать другие методы

/* 
Напомню, что constructor также является методом класса, как и greeting.
С его помощью можно вызвать greeting во время создания экземпляра класса:
*/

class User {
  constructor(name) {
    this.name = name;
    this.greeting();
  }
  greeting() {
    alert(`hello! my name is ${this.name}`);
  }
}

let user_john = new User('John'); // 'hello! my name is John'

// * итого

/* 
Базовый синтаксис для классов выглядит так:

class MyClass {
  prop = value; // свойство
  constructor(...) { // конструктор
    // ...
  }
  method(...) {} // метод
  get something(...) {} // геттер
  set something(...) {} // сеттер
  [Symbol.iterator]() {} // метод с вычисляемым именем (здесь - символом)
  // ...
}
*/
