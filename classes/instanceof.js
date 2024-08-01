// * Проверка класса "instanceof"
/*
Позволяет проверить, принадлежит ли объект к указанному классу,
с учётом наследования
*/

// Синтаксис
obj instanceof Class;

// Оператор вернёт true, если obj принадлежит классу Class или наследующему от него:

class Rabbit {}
let rabbit = new Rabbit();

alert(rabbit instanceof Rabbit); // true

// Также это работает с функциями-конструкторами:

function Rabbit() {}
alert(new Rabbit() instanceof Rabbit); // true

// …И для встроенных классов, таких как Array:

let arr = [1, 2, 3];

alert(arr instanceof Array); // true
alert(arr instanceof Object); // true

/* 
arr также принадлежит классу Object, потому что Array наследует от Object.
Обычно оператор instanceof просматривает для проверки цепочку прототипов.
*/

/* 
Алгоритм работы obj instanceof Class работает примерно так:

1. eсли имеется статический метод Symbol.hasInstance, тогда вызвать его.
Он должен вернуть либо true, либо false. Используя этот метод мы сами можем настроить
результат вызова instanceof:
*/

class Animal {
  static [Symbol.hasInstance](obj) {
    if (obj.canEat) return true; // возвращаемое значение будет неявно преобразовано в логический тип если не заданы значения true/false
  }
}

let obj = { canEat: true };

alert(obj instanceof Animal); // true

/* 
2. Большая часть классов не имеет метода Symbol.hasInstance.

В этом случае используется стандартная логика: проверяется, равен ли Class.prototype
одному из прототипов в прототипной цепочке obj.

obj.__proto__ === Class.prototype?
obj.__proto__.__proto__ === Class.prototype?
obj.__proto__.__proto__.__proto__ === Class.prototype?
...

- если какой-то из ответов true - возвратить true
- если дошли до конца цепочки - false

Вот иллюстрация того как rabbit instanceof Animal сравнивается с Animal.prototype:

.																Animal.prototype?
.	---------------------------------------------------------------------------
.	⬇								⬇										⬇											⬇								⬇
rabbit --> Rabbit.prototype --> Animal.prototype --> Object.prototype --> null


Кстати, есть метод objA.isPrototypeOf(objB), который возвращает true,
если объект objA есть где-то в прототипной цепочке объекта objB.

Так что obj instanceof Class можно перефразировать как Class.prototype.isPrototypeOf(obj).

Сам конструктор Class не участвует в процессе проверки! Давайте в этом убедимся.

Мы не можем изменять прототип объектов, созданных с помощью классов, поэтому для этого
воспользуемся функциями-конструкторами:
*/

function Bunny() {}
let bunny = new Bunny();

Bunny.prototype = {};
alert(bunny instanceof Bunny); // false

//_ Object.prototype.toString

/* 
Мы уже знаем, что обычные объекты преобразуются к строке как [object Object]:
*/

let object = {};
alert(object.toString()); // '[object Object]'

/* 
Так работает реализация метода toString. Этот метод можно использовать еще
как расширенную версию typeof и как альтернативу instanceof.

Почему так? Согласно спецификации встроенный метод toString может быть позаимствован у объекта
и вызван в контексте любого другого значения. И результат зависит от типа этого значения.

- для числа это будет [object Number]
- для логического типа: [object Boolean]
- для null: [object Null]
- для undefined: [object Undefined]
- для массивов: [object Array]
…и т.д. (поведение настраивается).
*/

let s = Object.prototype.toString;

alert(s.call([])); // '[object Array]'
alert(s.call(123)); // '[object Number]'
alert(s.call(null)); // '[object Null]'
alert(s.call(alert)); // '[object Function]'

alert({}.toString.call([])); // '[object Array]'

//' Symbol.toStringTag

/* 
Поведение метода объектов toString можно настраивать, используя специальное свойство объекта
Symbol.toStringTag:
*/

let user = {
  [Symbol.toStringTag]: 'User',
};

alert({}.toString.call(user)); // '[object User]'

/* 
Такое свойство есть у большей части объектов, специфичных для определённых окружений.
Вот несколько примеров для браузера:
*/

// toStringTag для браузерного объекта и класса
alert(window[Symbol.toStringTag]); // 'window'
alert(XMLHttpRequest.prototype[Symbol.toStringTag]); // 'XMLHttpRequest'

alert({}.toString.call(window)); // '[object Window]'
alert({}.toString.call(new XMLHttpRequest())); // '[object XMLHttpRequest]'

/* 
Можно использовать {}.toString.call вместо instanceof для встроенных объектов,
когда мы хотим получить тип в виде строки, а не просто сделать проверку.
*/

// * итог

/* 
Давайте обобщим, какие методы для проверки типа мы знаем:

|-----------------------------------------------------------------------------------------------------|
|								| работает для																											| возвращает			|
|								|-------------------------------------------------------------------|-----------------|
|typeof					| примитивов																												| строка					|
|{}.toString		| примитивов, встроенных объектов, объектов с Symbol.toStringTag		| строка					|
|instanceof			| объектов																													| true/false			|
|-----------------------------------------------------------------------------------------------------|

Как мы можем видеть, технически {}.toString «более продвинут», чем typeof.

А оператор instanceof – отличный выбор, когда мы работаем с иерархией классов
и хотим делать проверки с учётом наследования.
*/
