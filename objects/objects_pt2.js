//* Копирование объектов и ссылки

/*
Переменная, которой присвоен объект, хранит не сам объект,
а его «адрес в памяти» – другими словами, «ссылку» на него.

При копировании переменной объекта копируется ссылка на объект,
сам же объект не дублируется.
*/

let userData = { name: 'Alex' };
let adminData = userData; // копируется ссылка

/*
Можно использовать любую из переменных для доступа к объекту и
изменения его содержимого:
*/

adminData.name = 'John';
alert(userData.name); // 'John'

//_ Сравнение по ссылке

// Два объекта равны только в том случае, если это один и тот же объект:

let i = {};
let j = i; // копирование по ссылке

alert(i == j); // true, т.к. обе переменные ссылаются на один и тот же объект
alert(i === j); // true

/*
Операторы равенства и строгого равенства для объектов работают одинаково
*/

// Два независимых объекта не равны, даже если они выглядят одинаково:

let y = {};
let x = {};

alert(y == x); // false

/*
Для сравнений типа obj1 > obj2 или для сравнения с примитивом obj == 5
объекты преобразуются в примитивы
*/

//_ Клонирование и объединение объектов

/* 
Для копирования объекта нужно создать новый объект и воспроизвести
структуру существующего, перебрав его свойства и скопировав их на примитивном уровне
*/

let client = {
  name: 'John',
  age: 24,
};

let clone = {}; // новый пустой объект

// скопируем все свойства user в него

for (let key in client) {
  clone[key] = client[key];
}

alert(clone); // { name: 'John', age: 24 }
alert(client == clone || client === clone); // false

//_ Object.assign

/*
` Object.assign(dest, [src1, src2, src3...])

- копирует в целевой объект dest все свойства объектов src1, src2 и тд (включая и свойства с символьными ключами)
- возвращает объект dest

Если имена свойств dest совпадают с именами скопированных свойств из объектов src1, src2...,
то эти свойства будут перезаписаны.
*/

let person_info = { name: 'John' };

let permissions1 = { canView: true };
let permissions2 = { canEdit: true };

// копируем все свойства из permissions1 и permissions2 в person_info:

Object.assign(person_info, permissions1, permissions2);
alert(person_info); // { name: 'John', canView: true, canEdit: true }

/*
Если принимающий объект уже имеет свойство с таким именем, оно
будет перезаписано:
*/

Object.assign(person_info, { name: 'Alex' });
alert(person_info); // { name: 'Alex', canView: true, canEdit: true }

// пример простого клонирования с помощью Object.assign:

let car = {
  brand: 'Audi',
  cost: 120_000,
};

let carClone = Object.assign({}, car);

alert(carClone); // { brand: 'Audi', cost: 120000 }

//_ Другие способы клонирования (клонируются и свойства с символьными ключами)

/* 
Используя оператор расширения:
let clone1 = { ...person };

Клонирование объекта вместе с его флагами:
let clone2 = Object.defineProperties({}, Object.getOwnPropertyDescriptors(person));

Cоздание точной копии объекта, включая все свойства: перечисляемые и неперечисляемые,
геттеры/сеттеры для свойств – и всё это с правильным свойством [[Prototype]]:
let clone3 = Object.create(Object.getPrototypeOf(person), Object.getOwnPropertyDescriptors(person));

Используя JSON:
let clone4 = JSON.parse(JSON.stringify(obj))
*/

//' Для глубокого клонирования используем _.cloneDeep(obj)

//*  Методы объекта

/* 
Функцию, которая является свойством объекта, называют методом этого объекта.

Метод можно создать, присвоив функцию к свойству объекта,
либо указав в литерале объекта
*/

let user = {
  name: 'John',
};

// Присвоим к свойству user.sayHi Function Expression:

user.sayHi = function () {
  alert('Привет!');
};

// Добавляем в качестве метода user.sayBye Function Declaration:

user.sayBye = sayGoodbye;

function sayGoodbye() {
  alert('До свидания!');
}

user.sayHi(); // 'Привет!'
user.sayBye(); // 'До свидания!'

// Способы записи методов в литерале объекта:

let user_one = {
  greeting: function () {
    alert('Привет!');
  },
};

let user_two = {
  greeting() {
    alert('Привет!');
  },
};

alert(user_one).greeting(); // 'Привет!'
alert(user_two).greeting(); // 'Привет!'

/* 
Эти 2 способа записи методов почти эквивалентны, но есть тонкие различия.
Сокращенный метод записи (второй пример) является предпочтительным.
*/

//_ Ключевое слово "this" в методах

/*
Для доступа к информации внутри объекта метод может использовать
ключеваое слово this.

Значение this - это объект "перед точкой", который использовался
для вызова метода
*/

let userInfo = {
  name: 'John',
  age: 30,

  sayHi() {
    alert(this.name); // this - это "текущий объект"
    // значением this будет являться userInfo
  },
};
userInfo.sayHi(); // 'John'

/*
"this" не является фиксированным.
Его можно использовать в любой функции, даже если это не метод объекта.

Значение "this" вычисляется во время выполнения кода и зависит от контекста.
*/

let user_info = { name: 'John' };
let admin_info = { name: 'Alex' };

user_info.f = sayHi;
admin_info.f = sayHi;

function sayHi() {
  alert(this.name);
}

user_info.f(); // 'John'  (this == user_info)
admin_info.f(); // 'Alex'  (this == admin_info)

admin_info['f'](); // 'Alex' (нет разницы между использованием точки или квадратных скобок для доступа к объекту)

// Мы даже можем вызвать функцию вообще без объекта:

function greeting() {
  alert(this);
}

greeting(); // undefined

/*
В строгом режиме ("use strict") в таком коде значением this будет являться undefined.
Если мы попытаемся получить доступ к this.name – это вызовет ошибку.

В нестрогом режиме значением this в таком случае будет глобальный объект (window в браузерe)

Обычно подобный вызов является ошибкой программирования.

Если внутри функции используется this, тогда она ожидает,
что будет вызвана в контексте какого-либо объекта.
*/

/*
У стрелочных функций нет "this"

Если мы ссылаемся на this внутри такой функции, то оно берётся
из внешней «нормальной» функции:
*/

let person = {
  firstName: 'Ilya',
  sayHi() {
    let arrow = () => alert(this.firstName);
    arrow();
  },
};

person.sayHi(); // 'Ilya'

/* 
Если бы внутри метода sayHi функция arrow была бы объявлена иначе,
(например, как function arrow() {...} или let arrow = function () {...})
то мы получили бы в результате undefined
*/

//* Конструкторы, создание объектов через "new"

/* 
Для создания множества похожих, однотипных объектов можно воспользоваться
функциями-конструкторами и оператором "new".

Функции-конструкторы являются обычными функциями. Но есть 2 соглашения:
- имя начинается с большой буквы
- должна выполняться при помощи оператора "new"
*/

function User(name) {
  this.name = name;
  this.isAdmin = false;
}

let jack = new User('Jack');

alert(jack); // { name: 'Jack', isAdmin: false }

// Когда вызывается new User(...), происходит следующее:

function User(name) {
  // let this = {};  - создается новый пустой объект this (неявно)

  // добавляются свойства в объект this:
  this.name = name;
  this.isAdmin = false;

  // return this; - возрается значение this (неявно)
}

//_ Создание методов в конструкторе

// В this можно добавлять не только свойства, но и методы:

function User(name) {
  this.name = name;

  this.sayHi = function () {
    alert('Меня зовут: ' + this.name);
  };
}

let alex = new User('Alex');

alert(alex); // { name: 'Alex', sayHi: function() { ... } }

alex.sayHi(); // 'Меня зовут: Alex'

//_ Возврат значения из конструктора return

/*
Обычно конструкторы ничего не возвращают явно (не имеют оператора return).
Их задача – записать все необходимое в this, и это автоматически становится результатом.

Но если return всё же есть, то применяется правило:
- при вызове return с объектом, будет возвращен объект, а не this
- при вызове return с примитивным значением, либо без значения, оно проигнорируется
*/

function BigUser() {
  this.name = 'John';
  return { name: 'Godzilla' }; // <-- возвращает этот объект
}

alert(new BigUser().name); // 'Godzilla', получили этот объект

//_ Синтаксис new function() {…}

/* 
Конструктор, созданный в примере ниже, не может быть вызван снова,
так как он нигде не сохраняется, просто создаётся и тут же вызывается:
*/

let personInfo = new (function () {
  this.name = 'John';
  this.isAdmin = false;
})();

//* Опциональная цепочка "?."

/*
Это безопасный способ доступа к свойствам вложенных объектов,
даже если какое-либо из промежуточных свойств не существует.

В следующием примере у объекта about нет свойства с именем address.

При попытке получить:
- about.address 				- вернется undefined
- about.address.street 	- получим ошибку (поскольку у undefined нет свойств)
*/

let about = {
  name: 'Donald',
  surname: 'Duck',
};

alert(about.address); // undefined
alert(about.address.street); // ошибка

/*
Опциональная цепочка останавливает вычисление и возвращает undefined,
если значение перед ?. равно undefined или null.

Другими словами, value?.prop:

- работает как value.prop, если value существует
- возвращает undefined, если value равен undefined/null (код после prop не выполняется)
*/

alert(about?.address?.street); // undefined (без ошибки)

let html = document.querySelector('.elem')?.innerHTML; // будет undefined, если элемента нет

/*
Синтаксис ?. делает необязательным значение перед ним, но не
последующее значение:
*/

let admin = null;

alert(admin?.address); // admin равен null, возвращается undefined
alert(admin?.address.street); // и здесь возвращается undefined

/* 
Переменная должна быть объявлена.
Если переменной admin вообще нет, то admin?.address приведёт к ошибке
*/

/*
Не нужно злоупотреблять опциональной цепочкой,
его следует использовать там, где возможно чего-то не существует.

Если, в соответствии с логикой нашего кода, объект admin должен существовать,
но address является необязательным, то нам следует писать admin.address?.street,
но не admin?.address?.street.

Иначе ?. будет скрывать от нас ошибки программирования, если они возникнут
*/

//_ Другие варианты применения опц. цепочки: ?.(), ?.[]

/* 
Опциональная цепочка ?. — это не оператор, а специальная синтаксическая конструкция,
которая также работает с функциями и квадратными скобками.

Например, ?.() используется для вызова функции, которая может не существовать
*/

let manager = {
  admin() {
    alert('Я админ');
  },
};

let guest = {};

manager.admin?.(); // 'Я админ'
guest.admin?.(); // ничего не произойдет (такого метода нет)

// ?.[] также работает, если мы хотим использовать скобки [] для доступа к свойствам:

let key = 'firstName';

let user1 = {
  firstName: 'John',
};

let user2 = null;

alert(user1?.[key]); // 'John'
alert(user2?.[key]); // undefined

// Также мы можем использовать ?. с delete:

let machine = null;

delete machine?.name; // удаляет user.name если пользователь существует

delete machine.name; // ошибка

// Мы можем использовать ?. для безопасного чтения и удаления, но не для записи:

let guest_info = {
  name: 'Alex',
};

guest_info.address?.street = 'Freedom'; // ошибка

//_ Дополнительно

//_ Сравнение способов клонирования объекта

let obj = {
  name: 'John',
  surname: 'Smith',
  [Symbol('id')]: 123,
  say() {
    console.log('hello');
  },
  set fullName(val) {
    [this.name, this.surname] = val.split(' ');
  },
  get fullName() {
    return this.name + this.surname;
  },
  __proto__: { jumps: true },
};

Object.defineProperty(obj, 'age', {
  value: 23,
  writable: false,
  enumerable: false,
  configurable: true,
});

let cloneAss = Object.assign({}, obj);

let cloneExp = { ...obj };

let cloneFlag = Object.defineProperties({}, Object.getOwnPropertyDescriptors(obj));

let cloneProto = Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));

let cloneCycle = {};
for (let key in obj) {
  cloneCycle[key] = obj[key];
}

let cloneJson = JSON.parse(JSON.stringify(obj));

/* 
obj:
{name: 'John', surname: 'Smith', age: 23, Symbol(id): 123, say: ƒ}

cloneAssign:
{name: 'John', surname: 'Smith', fullName: 'JohnSmith', Symbol(id): 123, say: ƒ}

cloneExp:
{name: 'John', surname: 'Smith', fullName: 'JohnSmith', Symbol(id): 123, say: ƒ}

cloneFlag:
{name: 'John', surname: 'Smith', age: 23, Symbol(id): 123, say: ƒ}

cloneProto:
{name: 'John', surname: 'Smith', age: 23, Symbol(id): 123, say: ƒ}

cloneCycle:
{name: 'John', surname: 'Smith', fullName: 'JohnSmith', jumps: true, say: ƒ}

cloneJson:
{name: 'John', surname: 'Smith', fullName: 'JohnSmith'}
*/

/* 
Мы видим, что лучшим способом копирования объектов являются:
- Object.defineProperties({}, Object.getOwnPropertyDescriptors(obj))
- Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj))

так, как они копируют строковые и символьные ключи, флаги, методы, геттеры и сеттеры,
а в последнем случае, и прототипы.

Остальные способы копирования неправильно работают со свойствами-акцессорами, создавая
новое свойство на их основе, но не копируя свойства-акцессоры.

Цикл for..in не копирует свойства с символьными ключами, но копирует перечисляемые свойства прототипов

Способ копирования с JSON игнорирует методы, символьные ключи и значения, а так же свойства,
содержащие undefined
*/