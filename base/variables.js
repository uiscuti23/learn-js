// * Переменные

// Переменная – это «именованное хранилище» для данных
/*
Данные сохраняются в области памяти, связанной с переменной.
Мы можем получить к ней доступ, используя имя переменной
*/

let msg; // объявление переменной без значения
msg = 'hey there'; // присвоение значения

let hey = 'hey there'; // объявление переменной и присвоения значения

//_ Объявление нескольких переменных:

let myName, myAge, myMessage;

let yourName = 'Alex',
  yourAge = 12,
  yourMessage = 'Hi!';

//_ Изменение значения переменной:

let num = 36;
num = 18; // cтарое значение автоматически удаляется

//_ Передача значений переменных:

let number = 24;
let newNumber = number;
alert(newNumber); // 24

//_ Повторное объявление вызывает ошибку:

// let guest = 'Alex';
// let guest = 'John'; // SyntaxError: 'guest' has already been declared

/*
Ключевое слово let объявляет переменную.
Имя переменной может содержать только буквы, лучше латинского алфавита,
символы $ и _ и цифры (имя не может начинаться с цифры).
*/

let computer;
let $size;
let _color;
let my_name;

/*
Для лучшей читабельности кода имя переменной должна соответсвовать содержимому.
Если имя переменной состоит из нескольких слов:
*/

let leftSideBar; // стиль lowerCamelCase используется по умолчанию
let left_side_bar; // стиль snake_case тоже приемлем

/*
Рекомендуется создавать отдельную переменную для
каждого отдельного значения.
*/

//_ Константа это та же переменная, которую нельзя изменить.

const hours = 24;

// Имена констант с заранее известными значениями:

const PLANETS = 8;
const COLOR_RED = '#F00';

//_ Зарезервированные имена

// Нельзя использовать их в качестве имени переменной:
/*
break			case				class			catch
const			continue		debugger	default
delete		do					else			export
extends		finally			for				function
if				import			in				instanceof
let				new					return		super
switch		this				throw			try
typeof		var					void			while
with			yield

А также: enum await null true false

Следующие ключевые слова зарезервированы для кода, который выполняется в strict режиме:

implements		package			protected			static
interface			private			public

Зарезервированные ключевые слова в более старых версиях:

abstract			boolean			byte				char
double				final				float				goto
int						long				native			short
synchronized	transient		volatile
*/

//_ Область видимости переменных

/*
Если объявить переменную ВНУТРИ блока {}, то
за его пределами переменная не будет существовать:
*/

if (true) {
  let coconut = 'coconut';
  alert(coconut); // 'coconut'
}
alert(coconut); // error

/*
Если переменные внутри и вне блока имеют одинаковые названия
они всё равно будут считаться разными переменными:
*/

let rating = 10;

if (true) {
  let rating = 5;
  alert(rating); // 5
}

alert(rating); // 10

/*
Повторное объявления переменной в рамках одного
блока вызовет ошибку:
*/

if (true) {
  // let snakes = 2;
  // let snakes = 1; // SyntaxError: 'snakes' has already been declared
}

/*
Объявление переменных с одинаковым названием внутри отдельных
блоков никак не вызовет ошибок:
*/

if (true) {
  let fruit = 'banana';
} else {
  let fruit = 'orange';
}

//* Итого
/* 
Мы можем объявить переменные для хранения данных с помощью ключевых слов let, const или var.

let – это современный способ объявления.
const – похоже на let, но значение переменной не может изменяться.
var – это устаревший способ объявления.

Переменные должны быть названы таким образом, чтобы мы могли легко понять, что у них внутри.
*/

// Дополнительно

//_ Устаревшее ключевое слово "var"

// На первый взгляд, поведение var похоже на let, но это не так

// 1. Для «var» не существует блочной области видимости, то есть он игнорирует блоки {}

if (true) {
  var test = true; // используем var вместо let
}
alert(test); // true, переменная существует вне блока if

for (var i = 0; i < 10; i++) {
  // ...
}
alert(i); // 10, переменная i доступна вне цикла, т.к. является глобальной переменной

// Если блок кода находится внутри функции, то var становится локальной переменной в этой функции:

function sayHi() {
  if (true) {
    var phrase = 'Привет';
  }
  alert(phrase); // срабатывает и выводит "Привет"
}
sayHi();

alert(phrase); // Ошибка: phrase не определена

// 2. «var» допускает повторное объявление
/* 
Используя var, можно переобъявлять переменную сколько угодно раз.
Повторные var игнорируются:
*/

var user = 'Pete';
var user; // ничего не делает, переменная объявлена раньше

alert(user); // Pete

// Если дополнительно присвоить значение, то переменная примет новое значение:

var user = 'Pete';
var user = 'John';

alert(user); // John

// 3. «var» обрабатываются в начале запуска функции
/* 
Или обрабатываются в начале запуска скрипта, если переменная является глобальной.

Другими словами, переменные var считаются объявленными с самого начала
исполнения функции вне зависимости от того, в каком месте функции реально
находятся их объявления (при условии, что они не находятся во вложенной функции).

Это поведение называется «hoisting» (всплытие, поднятие),
потому что все объявления переменных var «всплывают» в самый верх функции
*/

// Следующие 3 фрагметна кода эквивалентны друг другу:

function sayHi() {
  phrase = 'Привет';

  alert(phrase);

  var phrase;
}

function sayHi() {
  var phrase;
  phrase = 'Привет';

  alert(phrase);
}

function sayHi() {
  phrase = 'Привет'; // (*)

  if (false) {
    // условие никогда не выполнится
    var phrase; // но это никаким образом не препятствует созданию переменной var phrase
  }

  alert(phrase);
}

/* 
Объявления переменных «всплывают», но присваивания значений – нет.
*/
function sayHi() {
  alert(phrase);
  var phrase = 'Привет';
}
sayHi();

/* 
Объявление переменной обрабатывается в начале выполнения функции («всплывает»),
однако присвоение значения всегда происходит в той строке кода, где оно указано.
Т.е. предыдущий код выполняется по следующему сценарию:
*/

function sayHi() {
  var phrase; // объявление переменной срабатывает вначале

  alert(phrase); // undefined

  phrase = 'Привет'; // ...присвоение - в момент, когда исполнится данная строка кода.
}
sayHi();

/* 
В обоих примерах выше вызов alert происходил без ошибки,
потому что переменная phrase уже существовала.
Но её значение ещё не было присвоено, поэтому мы получали undefined.
*/
