// * JSON

/* 
JSON (англ. JavaScript Object Notation) — текстовый формат обмена данными,
основанный на JavaScript.

Но при этом формат независим от JS и может использоваться в любом языке программирования.

JSON поддерживает следующие типы данных:

- объекты (и массивы)
- строки, числа, true/false, null

JavaScript предоставляет методы:

- JSON.stringify для преобразования объектов в JSON
- JSON.parse для преобразования JSON обратно в объект
*/

//_ JSON.stringify

/* 
Метод JSON.stringify() берёт объект и преобразует его в строку.
Полученная строка json называется JSON-форматированным или сериализованным объектом:
*/

let student = {
  name: 'John',
  age: 30,
  isAdmin: false,
  courses: ['html', 'css', 'js'],
  wife: null,
};

let json = JSON.stringify(student);

alert(json); // '{"name":"John","age":30,"isAdmin":false,"courses":["html","css","js"],"wife":null}'

/* 
Отличия объекта в формате JSON от объектного литерала:

- имена свойств заключаются в двойные кавычки (age: 30 становится "age":30)
- строки используют двойные кавычки ('John' становится "John")
*/

// число в JSON остаётся числом
alert(JSON.stringify(1)); // '1'

// строка в JSON по-прежнему остаётся строкой, но в двойных кавычках
alert(JSON.stringify('test')); // "test"

alert(JSON.stringify(true)); // 'true'

alert(JSON.stringify([1, 2, 3])); // '[1,2,3]'

/* 
JSON.stringify пропускает:

- свойства-функции (методы)
- символьные ключи и значения
- свойства, содержащие undefined
*/

let user = {
  // будет пропущено
  sayHi() {
    alert('Hello');
  },
  [Symbol('id')]: 123, // ... и это
  something: undefined, // ... и это
};

alert(JSON.stringify(user)); // {} (пустой объект)

// Поддерживаются вложенные объекты

let meetup = {
  title: 'Conference',
  room: {
    number: 23,
    participants: ['john', 'ann'],
  },
};

alert(JSON.stringify(meetup)); // {"title":"Conference","room":{"number":23,"participants":["john","ann"]}}

// Важное ограничение: не должно быть циклических ссылок

let room = {
  number: 23,
};

let meet = {
  title: 'Conference',
  participants: ['john', 'ann'],
};

meet.place = room; // meet ссылается на room
room.occupiedBy = meet; // room ссылается на meetup

JSON.stringify(meet); // Ошибка: Преобразование цикличной структуры в JSON

/* 
Полный синтаксис JSON.stringify:

` let json = JSON.stringify(value[, replacer, space])

value - значение для кодирования
replacer - массив свойств для кодирования или функция соответствия function(key, value)
space - дополнительное пространство (отступы), используемое для форматирования
*/

//' replacer

/* 
В большинстве случаев JSON.stringify используется только с первым аргументом.

Но если нам нужно выборочно вывести свойства или поменять значения свойств,
то использовуем второй аргумент: replacer.

В качестве replacer мы можем передать:
- массив ключей свойств, которые будут закодированы
- функцию, которая будет возвращать значения свойств

Функция должна возвращать исходное или замененное значение свойства,
либо undefined, чтобы пропустить значение (свойство не кодируется).

Значение this внутри функции – это объект, который содержит текущее свойство.

Если нужно пропустить аргумент replacer, передаем null вместо него
*/

// В коде ниже нам нужно проигнорировать циклическую ссылку occupiedBy:

let room1 = {
  number: 23,
};

let meetup1 = {
  title: 'Conference',
  participants: [{ name: 'John' }, { name: 'Alice' }],
  place: room1, // meetup ссылается на room1
};

room1.occupiedBy = meetup1; // room1 ссылается на meetup

alert(JSON.stringify(meetup1, ['title', 'participants', 'place', 'number', 'name'])); // в массиве не содержится 'occupiedBy', следовательно свойство с этим ключом не будет кодироваться

alert(
  JSON.stringify(meetup1, (key, value) => (key === 'occupiedBy' ? undefined : value)) // если ключ равен 'occupiedBy', то пропускаем это свойтсво (оно не будет кодироваться)
);

// в обоих случаях получаем:
// {"title":"Conference","participants":[{"name":"John"},{"name":"Alice"}],"place":{"number":23}}

// игнорируем свойство с ключом 'occupiedBy', заменяем значения 'John' и 23:

function replacer(key, value) {
  if (key === 'occupiedBy') {
    return undefined;
  } else if (key === 'number') {
    return 12;
  } else if (key === 'name' && value === 'John') {
    return 'Alex';
  } else {
    return value;
  }
}

alert(JSON.stringify(meetup1, replacer));
// {"title":"Conference","participants":[{"name":"Alex"},{"name":"Alice"}],"place":{"number":12}}

/* пары ключ: значение, которые приходят в replacer:

:             		[object Object]
title:        		Conference
participants: 		[object Object],[object Object]
0:            		[object Object]
name:         		John
1:            		[object Object]
name:         		Alice
place:        		[object Object]
number:       		23
occupiedBy:   		[object Object]

Первая (key, value) пара имеет пустой ключ, а значением является целевой объект: {"": meetup}.
Таким образом, у функции replacer есть возможность проанализировать и
заменить/пропустить даже весь объект целиком, если это необходимо.
*/

//' space

/* 
space - количество пробелов для форматирования JSON-строки.
Используется исключительно для удобства (логирования и красивого вывода).

Значениями могут быть либо число, отражающее количество пробелов,
либо строка, которые будут использоваться для отступа:
*/

let person = {
  name: 'John',
  age: 25,
  roles: {
    isAdmin: false,
    isEditor: true,
  },
};

alert(JSON.stringify(person, null, 2));
alert(JSON.stringify(person, null, '..'));

/* 
{													|		{
  "name": "John",					|		.."name": "John",
  "age": 25,							|		.."age": 25,
  "roles": {							|		.."roles": {
    "isAdmin": false,			|		...."isAdmin": false,
    "isEditor": true			|		...."isEditor": true
  }												|		..}
}													|		}
*/

//_ Пользовательский «toJSON»

/* 
Как и toString для преобразования строк, объект может предоставлять метод toJSON
для преобразования в JSON. JSON.stringify автоматически вызывает его, если он есть.
*/

let room2 = {
  number: 23,
  toJSON() {
    return this.number;
  },
};

let meetup2 = {
  title: 'Conference',
  room2,
};

alert(JSON.stringify(room2)); // '23', вместо '{"number":23}'

alert(JSON.stringify(meetup2));
// '{"title":"Conference","room2":23}', вместо '{"title":"Conference","room2":{"number":23}}'

/* 
Как мы видим, toJSON используется как при прямом вызове JSON.stringify(room2),
так и когда room2 вложен в другой сериализуемый (преобразовывающийся в строку) объект.
*/

/* 
Все объекты типа Date имеют встроенный метод toJSON, который возвращает строку
в формате YYYY-MM-DDTHH:mm:ss.sssZ:
*/

let room3 = {
  number: 23,
};

let meetup3 = {
  title: 'Conference',
  date: new Date(Date.UTC(2017, 0, 1)),
  room3,
};

alert(JSON.stringify(meetup3)); // '{"title":"Conference","date":"2017-01-01T00:00:00.000Z","room3":{"number":23}}'

//_ JSON.parse

/* 
JSON.parse нужен для декодирования JSON-строки

` let value = JSON.parse(str[, reviver])

str - JSON для преобразования в объект
reviver - необязательная функция, которая будет вызываться для каждой пары (ключ, значение)
и может преобразовывать значение.
*/

let numbers = '[0, 1, 2, 3]';

numbers = JSON.parse(numbers);

alert(numbers); // [0, 1, 2, 3]

let user1 = '{ "name": "John", "age": 35, "isAdmin": false, "friends": [0,1,2,3] }';

user1 = JSON.parse(user1);

alert(user1.friends[1]); // 1

//' reviver

let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';

let obj = JSON.parse(str);

alert(obj.date.getDate()); // Ошибка!

/* 
Значением obj.date является строка, а не Date объект. Как JSON.parse мог знать,
что он должен был преобразовать эту строку в Date?

Для таких случаев, надо создать функцию reviver:
*/

let schedule = `{
  "meetups": [
    {"title":"Conference","date":"2017-11-30T12:00:00.000Z"},
    {"title":"Birthday","date":"2017-04-18T12:00:00.000Z"}
  ]
}`;

schedule = JSON.parse(schedule, function (key, value) {
  if (key == 'date') return new Date(value);
  return value;
});

alert(schedule.meetups[1].date.getDate()); // 18

/* 
JSON может быть настолько сложным, насколько это необходимо,
объекты и массивы могут включать другие объекты и массивы.

JSON не поддерживает комментарии. Добавление комментария в JSON делает его недействительным.

Существует ещё один формат JSON5, который поддерживает ключи без кавычек, комментарии и т.д.
Но это самостоятельная библиотека, а не спецификация языка.
*/

// Типичные ошибки в написанном от руки JSON:

let jsonStr = `{
  name: "John",                       // имя свойства без кавычек
  "surname": 'Smith',                 // одинарные кавычки в значении (должны быть двойными)
  'isAdmin': false,                   // одинарные кавычки в ключе (должны быть двойными)
  "birthday": new Date(2000, 2, 3),   // не допускается конструктор "new", только значения
  "gender": "male"                    // отсутствует запятая после непоследнего свойства
  "friends": [0,1,2,3],               // не должно быть запятой после последнего свойства
}`;

// * итого

/* 
JSON – это формат данных, который имеет собственный независимый стандарт и
библиотеки для большинства языков программирования.

JSON поддерживает простые объекты, массивы, строки, числа, логические значения и null.

JavaScript предоставляет методы JSON.stringify для сериализации в JSON и
JSON.parse для чтения из JSON.

Оба метода поддерживают функции преобразования для интеллектуального чтения/записи.

Если объект имеет метод toJSON, то он вызывается через JSON.stringify.
*/
