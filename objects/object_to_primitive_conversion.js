//* Преобразование объектов в примитивы

/* 
В реальных проектах не проводят математические действия с объектами.
Если всё же это происходит, то за редким исключением, из-за ошибок в коде.

Результатом obj1 + obj2 (или другой математической операции) с объектами
не может быть другой объект!
*/

/* 
Правила преобразования:

1. Не существует преобразования к логическому значению.
В логическом контексте все объекты являются true.
2. Числовое преобразование происходит, когда мы вычитаем объекты или
выполняем математические функции.
3. Строковое преобразование происходит, когда мы выводим объект на экран
при помощи alert и в подобных контекстах.

Можно реализовать свои преобразования к строкам и числам, используя
специальные объектные методы: Symbol.toPrimitive, toString, valueOf
*/

//_ Хинты
/*
Как JavaScript решает, какое преобразование применить?
Существуют 3 варианта преобразования типов. Их называют хинтами
*/

// "string" - для преобразования объекта к строке

alert(obj); // вывод
anotherObj[object] = 123; // используем объект в качестве ключа

// "number" - для преобразования объекта к числу, в случае математических операций:

let num = Number(obj); // явное преобразование

let n = +obj; // унарный плюс 		// математические (не считая бинарного плюса)
let delta = date1 - date2; // математические (не считая бинарного плюса)

let greater = user1 > user2; // сравнения больше/меньше

// "default" - если оператор "не уверен" какой тип ожидать (происходит редко)
/*
Например, бинарный плюс + может работать как со строками (объединяя их в одну),
так и с числами (складывая их).

Примеры использовная хинта "default":

- если бинарный плюс получает объект в качестве аргумента
- если объект сравнивается со строкой, числом или символом при помощи нестрогого сравнения
*/

let total = obj1 + obj2; // бинарный плюс использует хинт "default"

if (user == 1) alert(); // obj == number использует хинт "default"

/*
Операторы сравнения <, > могут работать со строками и числами.
Тем не менее, по историческим причинам, они используют хинт "number", а не "default".

Все встроенные объекты, кроме Date реализуют "default" преобразование
тем же способом, что и "number"
*/

/* 
Чтобы выполнить преобразование, JavaScript пытается найти и вызвать три следующих метода объекта:

1. Вызвать obj[Symbol.toPrimitive](hint) – метод с символьным ключом Symbol.toPrimitive
(системный символ), если такой метод существует.

2. Иначе, если хинт равен "string":
попробовать вызвать obj.toString() или obj.valueOf(), смотря какой из них существует.

3. Иначе, если хинт равен "number" или "default":
попробовать вызвать obj.valueOf() или obj.toString(), смотря какой из них существует.
*/

//_ Symbol.toPrimitive

/* 
Есть встроенный символ с именем Symbol.toPrimitive,
который следует использовать для обозначения метода преобразования:
*/

obj[Symbol.toPrimitive] = function (hint) {
  // вот код для преобразования этого объекта в примитив
  // он должен вернуть примитивное значение
  // hint = чему-то из "string", "number", "default"
};

/* 
Если метод Symbol.toPrimitive существует, он используется для всех хинтов,
и больше никаких методов не требуется
*/

let user = {
  name: 'John',
  money: 1000,

  [Symbol.toPrimitive](hint) {
    alert(`hint: ${hint}`);
    return hint == 'string' ? `{name: "${this.name}"}` : this.money;
  },
};

// демонстрация результатов преобразований:
alert(user); // hint: string -> {name: "John"} (alert преобразует объект в строку)
alert(+user); // hint: number -> 1000
alert(user + 500); // hint: default -> 1500

/* 
Как мы можем видеть из кода, user становится либо строкой со своим описанием,
либо суммой денег в зависимости от преобразования.
*/

//_ toString/valueOf

/* 
Если нет Symbol.toPrimitive, тогда JavaScript пытается найти методы toString и valueOf:

Для хинта "string":
- вызвать метод toString, если он существует и не возвращает объект вместо примитивного значения
- иначе вызывается valueOf.

toString имеет приоритет при строковом преобразовании.

Для хинтов "number" и "default":
- вызвать метод valueOf, если он существует и не возвращает объект вместо примитивного значения
- иначе вызывается toString.

valueOf имеет приоритет для математических операций
*/

/* 
Методы должны возвращать примитивное значение.

Если toString или valueOf возвращает объект, то он игнорируется
(так же, как если бы метода не было).

По умолчанию в обычном объекте:

- toString возвращает строку "[object Object]".
- valueOf возвращает сам объект.
*/

let person = { name: 'John' };

console.log(person.toString()); // '[object Object]'
console.log(person.valueOf() === user); // true

/* 
Если мы попытаемся использовать объект в качестве строки
как например в alert, то по умолчанию мы увидим [object Object].

valueOf возвращает сам объект и поэтому игнорируется (нет смысла его писать).
*/

// Перепишем пример с user, используя toString/valueOf вместо Symbol.toPrimitive:

let user1 = {
  name: 'John',
  money: 1000,

  // для хинта равного "string"
  toString() {
    return `{name: "${this.name}"}`;
  },

  // для хинта равного "number" или "default"
  valueOf() {
    return this.money;
  },
};

alert(user1); // toString -> {name: "John"}
alert(+user1); // valueOf -> 1000
alert(user1 + 500); // valueOf -> 1500

//_ Преобразование может вернуть любой примитивный тип

/* 
Важная вещь, которую следует знать обо всех методах преобразования примитивов,
заключается в том, что они не обязательно возвращают подсказанный хинтом примитив.

Нет никакого контроля над тем, вернёт ли toString именно строку,
или чтобы метод Symbol.toPrimitive возвращал именно число для хинта "number".

Единственное обязательное условие: эти методы должны возвращать примитив, а не объект.

По историческим причинам, если toString или valueOf вернёт объект, то ошибки не будет,
но такое значение будет проигнорировано (как если бы метода вообще не существовало).

А вот Symbol.toPrimitive уже «четче», этот метод обязан возвращать примитив, иначе будет ошибка.
*/

//_ Дальнейшие преобразования

/* 
Как мы уже знаем, многие операторы и функции выполняют преобразования типов,
например, умножение * преобразует операнды в числа.

Если мы передаём объект в качестве аргумента, то в вычислениях будут две стадии:

1. Объект преобразуется в примитив (с использованием правил, описанных выше).
2. Если необходимо для дальнейших вычислений, этот примитив преобразуется дальше.
*/

let obj = {
  // toString обрабатывает все преобразования в случае отсутствия других методов
  toString() {
    return '2';
  },
};

alert(obj * 2); // 4, объект был преобразован к примитиву "2", затем умножение сделало его числом
alert(obj + 2); // '22' ("2" + 2), преобразование к примитиву вернуло строку => конкатенация

// * Итого

/* 
Преобразование объекта в примитив вызывается автоматически многими встроенными функциями и операторами, которые ожидают примитив в качестве значения.

Существует всего 3 типа (хинта) для этого:

"string" (для alert и других операций, которым нужна строка)
"number" (для математических операций)
"default" (для некоторых других операторов, обычно объекты реализуют его как "number")

Спецификация явно описывает для каждого оператора, какой ему следует использовать хинт.

Алгоритм преобразования таков:

1. Сначала вызывается метод obj[Symbol.toPrimitive](hint), если он существует

2. В случае, если хинт равен "string":
происходит попытка вызвать obj.toString() и obj.valueOf(), смотря что есть

3. В случае, если хинт равен "number" или "default"
происходит попытка вызвать obj.valueOf() и obj.toString(), смотря что есть

Все эти методы должны возвращать примитив
(если они имеются в объекте, то есть описаны как метод этого объекта).

На практике часто бывает достаточно реализовать только obj.toString()
в качестве универсального метода для преобразований к строке,
который должен возвращать удобочитаемое представление объекта
для целей логирования или отладки.
*/
