// * Символы

/* 
В качестве ключей для свойств объекта могут использоваться только строки или символы
*/

/*
Символ представляет собой уникальный идентификатор.
Создаются они с помощью оператора Symbol().
При создании символу нужно дать описание (имя).
*/

let id = Symbol('id'); // Создаём символ id с описанием (именем) 'id'

/*
Символы гарантированно уникальны, даже если у них одинаковое описание.
Описание – это просто метка, которая ни на что не влияет
*/

let id1 = Symbol('id');
let id2 = Symbol('id');

alert(id1 == id2); // false

/*
При выведении символа с помощью alert возникнет ошибка, так как символы
не преобразовываются в строку автоматически.

Это – языковая «защита» от путаницы, ведь строки и символы –
принципиально разные типы данных и не должны неконтролируемо
преобразовываться друг в друга.

Если нужно вывести символ при помощи alert необходимо явно его
преобразовать с помощью метода .toString():
*/

let id_1 = Symbol('id');
alert(id_1.toString()); // Symbol(id), теперь работает

// Или можно вывести только описание символа:

let id_2 = Symbol('id');
alert(id_2.description); // 'id'

//_ «Скрытые» свойства

/*
Символы позволяют создавать «скрытые» свойства объектов, к которым нельзя
нечаянно обратиться и перезаписать их из других частей программы.

Например, мы работаем с объектами user, которые принадлежат стороннему коду.
Мы хотим добавить к ним идентификаторы:
*/

let user = {
  name: 'Вася',
};

let ourId = Symbol('ident');

user[ourId] = 1;

alert(user); // { name: 'Вася', Symbol(ident): 1 }
alert(user[ourId]); // мы можем получить доступ к данным по ключу-символу

/* 
Так как объект user принадлежит стороннему коду, и этот код также работает с ним,
то нам не следует добавлять к нему свои собственные свойства с ключами в виде строки.
Это небезопасно.

Но мы можем добавить свойства с ключами-символами, так как к символу сложно нечаянно обратиться.

Сторонний код вряд ли его вообще увидит, и, скорее всего,
добавление такого свойства к объекту не вызовет никаких проблем.
*/

/* 
Предположим, что другой скрипт для каких-то своих целей хочет записать
собственный идентификатор в объект user.

Этот сторнний скрипт может быть абсолютно не связан с нашим скриптом.

Даже если имена символов, созданные нами и сторонним скриптом, совпадают,
никакого конфликта между ними не будет, так как символы всегда уникальны:
*/

// ... сторонний скрипт:
let their_id = Symbol('ident');

user[their_id] = 'Их идентификатор';

// А вот если бы мы использовали строку "id" вместо символа, то тогда был бы конфликт:

let person = { name: 'Вася' };

// Объявляем в нашем скрипте свойство "id"
person.id = 'Наш идентификатор';

// ...другой скрипт тоже хочет свой идентификатор...

person.id = 'Их идентификатор';
// Ой! Свойство перезаписано сторонней библиотекой!

//_ Символы в литеральном объекте

// Символы при литеральном объявлении объекта {...} заключаются в скобки []:

let symb = Symbol('id');

let userInfo = {
  name: 'Вася',
  [symb]: 123, // значение переменной symb в качестве ключа
};

/* 
Это вызвано тем, что нам нужно использовать значение переменной symb
в качестве ключа, а не строку «symb»
*/

//_ Символы игнорируются циклом for..in, Object.keys(), Object.entries()

// Свойства, чьи ключи – символы, не перебираются, но копируются при помощи Object.assign():

let idnt = Symbol('id');
let user_info = {
  name: 'Вася',
  age: 30,
  [idnt]: 123,
};

for (let key in user_info) alert(key); // 'name', 'age'

alert(user_info[idnt]); // 123 (прямой доступ по символу работает!)

let clone = Object.assign({}, user_info);

alert(clone); // { name: 'Вася', age: 30, Symbol(id): 123 }

/* 
Здесь нет никакого парадокса или противоречия. Так и задумано.
Идея заключается в том, что, когда мы клонируем или объединяем объекты,
мы обычно хотим скопировать все свойства (включая такие свойства с ключами-символами)
*/

//_ Глобальные символы

//' Symbol.for(key)
/*
Если мы хотим, чтобы символы с одинаковыми именами были одной сущностью,
используем глобальный реестр символов.

Мы можем создавать в нём символы, и обращаться к ним позже,
и при каждом обращении будет возвращаться один и тот же символ.

Для чтения (или, при отсутсвии, создания) символа из реестра используется
метод Symbol.for(key).

Он проверяет глобальный реестр и, при наличии в нём символа с именем key, возвращает его,
иначе же создаётся новый символ Symbol(key) и записывается в реестр под ключом key.
*/

// читаем символ из глобального реестра и записываем его в переменную
let someSymbol = Symbol.for('id'); // если символа не существует, он будет создан

// читаем его снова и записываем в другую переменную (возможно, из другого места кода)
let someSymbolAgain = Symbol.for('id');

// проверяем -- это один и тот же символ
alert(someSymbol === someSymbolAgain); // true

/* 
Символы, содержащиеся в реестре, называются глобальными символами.
Если вам нужен символ, доступный везде в коде – используйте глобальные символы.
*/

//' Symbol.keyFor(sym)
/*
Метод Symbol.keyFor(sym), наоборот, принимает глобальный символ и возвращает его имя.
Если символ неглобальный, то вернёт undefined
*/
// получаем символ по имени
let sym = Symbol.for('name');
let sym2 = Symbol.for('id');

// получаем имя по символу
alert(Symbol.keyFor(sym)); // 'name'
alert(Symbol.keyFor(sym2)); // 'id'

//' description
/*
Впрочем, для любых символов доступно свойство description.
Он работает как для глобальных и неглобальных символов:
*/

let globalSymbol = Symbol.for('name');
let localSymbol = Symbol('name');

alert(Symbol.keyFor(globalSymbol)); // 'name', глобальный символ
alert(Symbol.keyFor(localSymbol)); // undefined для неглобального символа

alert(localSymbol.description); // 'name'

//_ Системные символы

/* 
Существует множество «системных» символов, использующихся внутри самого JavaScript,
и мы можем использовать их, чтобы настраивать различные аспекты поведения объектов:

Symbol.hasInstance
Symbol.isConcatSpreadable
Symbol.iterator
Symbol.toPrimitive
…и так далее.

В частности, Symbol.toPrimitive позволяет описать правила для объекта,
согласно которым он будет преобразовываться к примитиву.

А Symbol.iterator позволяет сделать объекты итерируемыми
*/

/*
Технически символы не спрятаны на 100%.
Метод Object.getOwnPropertySymbols(obj) позволяет получить все свойства объекта с ключами-символами,
a Reflect.ownKeys(obj) возвращает все ключи объекта, включая символьные
*/

// * Итого

/* 
Символ (symbol) – примитивный тип данных, использующийся для создания уникальных идентификаторов.

Символы создаются вызовом функции Symbol(), в которую можно передать описание (имя) символа.

Даже если символы имеют одно и то же имя, это – разные символы.

Если мы хотим, чтобы одноимённые символы были равны, то следует использовать глобальный реестр:
вызов Symbol.for(key) возвращает (или создаёт) глобальный символ с key в качестве имени.

Многократные вызовы команды Symbol.for с одним и тем же аргументом возвращают один и тот же символ.

Символы имеют два основных варианта использования:

1. «Скрытые» свойства объектов.

Если мы хотим добавить свойство в объект, который «принадлежит» другому скрипту или библиотеке,
мы можем создать символ и использовать его в качестве ключа.

Символьное свойство не появится в for..in, так что оно не будет нечаянно обработано вместе с другими.

Также оно не будет модифицировано прямым обращением, так как другой скрипт не знает о нашем символе.
Таким образом, свойство будет защищено от случайной перезаписи или использования.

Так что, используя символьные свойства, мы можем спрятать что-то нужное нам, но что другие видеть не должны.

2. Существует множество системных символов, используемых внутри JavaScript.
Мы можем использовать их, чтобы изменять встроенное поведение ряда объектов.

Технически символы не спрятаны на 100%
*/
