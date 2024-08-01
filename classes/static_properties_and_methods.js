// * Статические свойства и методы

//_ Статические методы

/*
Методы самого класса называют статическими. При объявлении они
добавляются с помощью ключевого слова static:
*/

class User {
  static staticMethod() {
    alert(this === User);
  }
}

User.staticMethod(); // true

// Это фактически то же самое, что присвоить метод напрямую как свойство функции:

class User {}

User.staticMethod = function () {
  alert(this === User);
};

/*
Значением this при вызове User.staticMethod() является сам конструктор класса User
(правило «объект до точки»).

Обычно статические методы используются для реализации функций, которые будут принадлежать
классу в целом, но не какому-либо его конкретному объекту.

Например, есть объекты статей Article, и нужна функция для их сравнения:
*/

class Article {
  constructor(title, date) {
    this.title = title;
    this.date = date;
  }

  static compare(articleA, articleB) {
    return articleA.date - articleB.date;
  }
}

let articles = [
  new Article('HTML', new Date(2019, 1, 1)),
  new Article('CSS', new Date(2019, 0, 1)),
  new Article('JavaScript', new Date(2019, 11, 1)),
];

articles.sort(Article.compare);
alert(articles[0].title); // 'CSS'

// Пример создания объекта через статический метод:

class Article {
  constructor(title, date) {
    this.title = title;
    this.date = date;
  }

  static createTodays() {
    // помним, что this = Article
    return new this('Сегодняшний дайджест', new Date());
  }
}

let article = Article.createTodays();

/* 
Статические методы могут вызываться для классов, но не для отдельных объектов.
Такой код не будет работать:
*/

article.createTodays(); /// Error: article.createTodays is not a function

//_ Статические свойства

// Статические свойства также возможны, они выглядят как свойства класса, но с static в начале:

class Article {
  static publisher = 'Илья Кантор';
}

alert(Article.publisher); // 'Илья Кантор'

// это то же самое, что и прямое присваивание:
Article.publisher = 'Илья Кантор';

//_ Наследование статических свойств и методов

/* 
Статические свойства и методы наследуются.
Например, метод Animal.compare в коде ниже наследуется и доступен как Rabbit.compare:
*/

class Animal {
  constructor(name, speed) {
    this.name = name;
    this.speed = speed;
  }

  run(speed = 0) {
    this.speed += speed;
    console.log(`${this.name} бежит со скоростью ${this.speed}.`);
  }

  static compare(animalA, animalB) {
    return animalA.speed - animalB.speed;
  }
}

class Rabbit extends Animal {
  hide() {
    console.log(`${this.name} прячется!`);
  }
}

const arr = [
  new Rabbit('Белый кролик', 15),
  new Rabbit('Черный кролик', 5),
  new Rabbit('Желто-серый кролик', 10),
];

arr.sort(Rabbit.compare);

alert(arr); // [{name: 'Черный кролик', speed: 5}, {name: 'Желто-серый кролик', speed: 10}, {name: 'Белый кролик', speed: 15}]

/* 
Animal																Animal.prototype
|-----------------|										|---------------------------|
| compare				  |		prototype				| constructor: Animal	  		|
| 								| ---------------> 	| run: function							|
|-----------------|										|---------------------------|	
.	
.				⬆																					⬆
.	[[Prototype]]															[[Prototype]]
.				⬆																					⬆
Rabbit																Rabbit.prototype								 
|-----------------|										|---------------------------|
| 							  |		prototype				| constructor: Rabbit	   		|
| 								| ---------------> 	| hide: function		 				|
|-----------------|										|---------------------------|		
.
.																									⬆
.																						[[Prototype]]
.																									⬆
.																							rabbit											
.																				|---------------------|
.																				|	name: "Белый кролик"|	
.																				|---------------------|
*/

// * итог

/*
Статические методы используются для функциональности, принадлежат классу «в целом»,
а не относятся к конкретному объекту класса.

Статические свойства используются в тех случаях, когда мы хотели бы
сохранить данные на уровне класса, а не какого-то одного объекта.

В объявлении класса они помечаются ключевым словом static.

Синтаксис:

class MyClass {
  static property = ...;

  static method() {
    ...
  }
}

Технически, статическое объявление – это то же самое, что и присвоение классу:

MyClass.property = ...
MyClass.method = ...

Статические свойства и методы наследуются.

Для class B extends A прототип класса B указывает на A: B.[[Prototype]] = A.
Таким образом, если поле не найдено в B, поиск продолжается в A.
*/
