// * Преобразование типов

//_ Строковое преобразование

/*
Преобразование происходит очевидным образом.
false становится "false", null -> "null" и тд
*/

let age = 12;
age = String(age);
alert(age); // "12"

let isRain = true;
isRain = String(isRain);
alert(isRain); // "true"

//_ Численное преобразование

/*
undefined -> NaN
null -> 0
false -> 0
true -> 1
string ->
- пробельные символы (пробелы, знаки табуляции \t, знаки новой строки \n и т. п.) по краям обрезаются
- если остаётся пустая строка -> 0
- если остаётся число -> "считывается" число
- при ошибке -> NaN
*/

let str = '4';
str = Number(str);
alert(str); // 4

let chars = 'abc';
chars = Number(chars);
alert(chars); // NaN

alert(Number('   123   ')); // 123
alert(Number('123z')); // NaN (ошибка чтения числа на месте символа "z")
alert(Number(true)); // 1
alert(Number(false)); // 0

// Пример автоматического преобразования без использования функции:

let res = '72' / '2';
alert(res); // 36

alert(typeof res); // number

//_ Логическое преобразование

/*
0, "", null, undefinded, NaN становятся false.
Все остальные значения становятся true. (В частности "0" и " ")
*/

let num = 12;
num = Boolean(num);

alert(num); // true

let data = 0;
data = Boolean(data);

alert(data); // false

// * Итого:
/*
Большую часть из этих правил легко понять и запомнить.

Особые случаи, в которых часто допускаются ошибки:
undefined при численном преобразовании становится NaN, не 0.
"0" и строки из одних пробелов типа " " при логическом преобразовании всегда true.
*/

// * оператор typeof
// возвращает тип аргумента

// синтаксис
typeof 5; // Выведет "number"
// typeof(5); // Также выведет "number"

// typeof имеет более высокий приоритет, чем бинарные операторы

typeof 50 + ' Квартир'; // Выведет "number Квартир"
typeof (50 + ' Квартир'); // Выведет "string"

typeof 0; // "number"
typeof 'foo'; // "string"
typeof true; // "boolean"
typeof undefined; // "undefined"
typeof Math; // "object"  (1)
typeof null; // "object"  (2)
typeof alert; // "function"  (3)
// typeof 10n; // "bigint"
// typeof Symbol('id'); // "symbol"

/* 
(1) Math — это встроенный объект, который предоставляет математические операции и константы

(2) Результатом вызова typeof null является "object".
Это официально признанная ошибка в typeof, ведущая начало с времён создания JavaScript
и сохранённая для совместимости. Конечно, null не является объектом.
Это специальное значение с отдельным типом

(3) Вызов typeof alert возвращает "function", потому что alert является функцией.
В JavaScript нет специального типа «функция». Функции относятся к объектному типу.
Но typeof обрабатывает их особым образом, возвращая "function".
Так тоже повелось от создания JavaScript. Формально это неверно, но может быть удобным на практике
*/
