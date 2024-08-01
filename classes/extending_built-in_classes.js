// * Расширение встроенных классов

/*
От встроенных классов, таких как Array, Map и других,
тоже можно наследовать.
*/
class PowerArray extends Array {
  isEmpty() {
    return this.length === 0;
  }
}

let arr = new PowerArray(1, 2, 5, 10, 50);
console.log(arr.isEmpty()); // false

let filteredArr = arr.filter(item => item >= 10);

console.log(filteredArr); // 10, 50
console.log(filteredArr.isEmpty()); // false

/* 
Обратите внимание: встроенные методы, такие как filter, map и другие возвращают новые объекты
унаследованного класса PowerArray.

В примере выше: arr.constructor === PowerArray

... и это замечательно, поскольку можно продолжать использовать методы PowerArray далее на результатах
(на возвращаемых объектах, полученных при использовании методов filter, map и тд).

По желанию можно изменить такое поведение при помощи статического геттера Symbol.species,
который возвратит желаемый конструктор:
*/

class PowerArray extends Array {
  isEmpty() {
    return this.length === 0;
  }

  // встроенные методы массива будут использовать этот метод как конструктор
  static get [Symbol.species]() {
    return Array;
  }
}

let array = new PowerArray(1, 2, 5, 10, 50);
alert(array.isEmpty()); // false

// filter создаст новый массив, используя arr.constructor[Symbol.species] как конструктор
let filteredArray = array.filter(item => item >= 10);

// filteredArr не является PowerArray, это Array
alert(filteredArray.isEmpty()); // Error: filteredArray.isEmpty is not a function

/* 
Теперь метод filter возвращает Array. Расширенная функциональность не будет передаваться далее.
Другие коллекции, такие как Map, Set, работают аналогично. Они также используют Symbol.species.
*/

//_ Статические поля встроенных классов не расширяются

/* 
У встроенных объектов есть собственные статические методы, например Object.keys, Array.isArray и т.д.
Обычно, когда один класс наследует другой, то наследуются и статические методы.
Но встроенные классы – исключение. Они не наследуют статические методы друг друга.

Например, и Array, и Date наследуют от Object, так что в их экземплярах доступны методы из Object.prototype,
к примеру, hasOwnProperty, но Array.[[Prototype]] не ссылается на Object, поэтому нет методов Array.keys()
или Date.keys().

Object																Object.prototype
|-----------------|										|---------------------------|
| defineProperty  |		prototype				| constructor: Object   		|
| keys						| ---------------> 	| toString: function 				|
| ...							|										| hasOwnProperty: function	|
|									|										|	...												|
|-----------------|										|---------------------------|	
.	
.																										⬆
.																							[[Prototype]]
.																										⬆
Date																	Date.prototype									 
|-----------------|										|---------------------------|
| now 					  |		prototype				| constructor: Date		   		|
| parse						| ---------------> 	| toString: function 				|
| ...							|										| getDate: function					|
|									|										|	...												|
|-----------------|										|---------------------------|		
.
.																										⬆
.																							[[Prototype]]
.																										⬆
.																							new Date()											
.																					|-----------------|
.																					|	1 Jan 2019			|	
.																					|-----------------|


Как видите, нет связи между Date и Object. Они независимы, только Date.prototype наследует
от Object.prototype.
*/
