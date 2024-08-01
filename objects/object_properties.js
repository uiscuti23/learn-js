// * Флаги и дескрипторы свойств

/*
Помимо значения value, свойства объекта имеют три специальных атрибута (так называемые «флаги»).

writable – если true, свойство можно изменить, иначе оно только для чтения.
enumerable – если true, свойство могут перечисляться (например, в циклах), в противном случае они будут проигнорированы.
configurable – если true, свойство можно удалить, а атрибуты(флаги) можно изменять, иначе этого делать нельзя.
Исключением является случай, когда мы хотим изменить значение флага writable на false.

То есть при явной или неявной установке флага configurable = false,
запоминаются значения writable, enumerable, configurable и
мы их не сможем изменить в дальнейшем, а в строгом режиме('use strict')
получим еще и ошибку.
Сможем лишь изменить значение флага writable на false, если он ранее был равен true.

configurable = false не влияет напрямую на возможность/не возможность
измениения значения свойства value, на это влияет флаг writable.

Но, в случае, если configurable и writable будут равны false,
мы не сможем изменять значение свойства, равно, как и удалять.

Когда мы создаём свойство «обычным способом», все флаги будут иметь значение true.
При создании свойства через Object.defineProperty/Object.defineProperties,
если значения флагов указано неявно, то они по умолчанию примут значение false.
*/

//_ Получение полной информации о свойстве:

/* 
«Дескриптор свойства» содержит значение свойства и все его флаги,
то есть полную информацию о свойстве.

` let descriptor = Object.getOwnPropertyDescriptor(obj, propertyName)

obj - объект, из которого мы получаем информацию
propertyName - имя свойства
*/

let person = { name: 'John', age: 23 };
let descriptor = Object.getOwnPropertyDescriptor(person, 'name');

alert(descriptor); // { "value": "John", "writable": true, "enumerable": true, "configurable": true }

//_ Изменение флагов

/* 
Чтобы изменить флаги, мы можем использовать следующий метод:
` Object.defineProperty(obj, propertyName, descriptor)

obj, propertyName - объект и его свойство, для которого нужно применить дескриптор
descriptor - применяемый дескриптор
*/

/*
Если свойство существует, defineProperty обновит его флаги. В противном случае метод
создаёт новое свойство с указанным значением и флагами.

Eсли все флаги не указаны явно, им присваивается false.
(У свойств, созданных в литерале объекта флаги изначально равны true)
*/

// Пример 1. Добавление к пустому объекту свойства с именем 'name' и значением 'John':

let user = {};
Object.defineProperty(user, 'name', { value: 'John' });

// { value: "John", writable: false, enumerable: false, configurable: false }

// Пример 2. Изменение значения флага 'writable' у свойства с именем 'name':

let user2 = { name: 'John' };
Object.defineProperty(user2, 'name', { writable: false });

// { value: "John", writable: false, enumerable: true, configurable: true }

// Пример 3. Изменение значения флага 'writable' у свойства с именем 'name'.
// (значение флага не изменится, так как он изначально был равен true):

let user3 = { name: 'John' };
Object.defineProperty(user3, 'name', { writable: true });

// { value: John, writable: true, enumerable: true, configurable: true }

/*
-------------|--------|				let user = {};
VALUE				 | "John"	|				
-------------|--------|				Object.defineProperty(user, 'name', {
WRITABLE		 | false	|					value: 'John'
ENUMERABLE 	 | false	|				});
CONFIGURABLE | false	|
-------------|--------|
*/

/*
-------------|--------|				let user = { name: 'John' };
VALUE				 | "John"	|				
-------------|--------|				Object.defineProperty(user, 'name', {
WRITABLE		 | false	|					writable: false
ENUMERABLE 	 | true		|				});
CONFIGURABLE | true		|
-------------|--------|
*/

/*
-------------|--------|				let user = { name: 'John' };
VALUE				 | "John"	|				
-------------|--------|				Object.defineProperty(user, 'name', {
WRITABLE		 | true		|					writable: true
ENUMERABLE 	 | true		|				});
CONFIGURABLE | true		|
-------------|--------|
*/

//_ Флаг writable

// при writible = false, свойство нельзя изменить, оно доступно только для чтения

/* 
Пример с user2 - только для чтения (так как writable равен false).
Мы не сможем изменить его следующим образом (появится ошибка в строгом режиме):
*/

user2.name = 'Pete'; // Ошибка: Невозможно изменить свойство 'name'

// Воссоздадим аналогичный пример, где свойство создаётся через defineProperty:

let user_2 = {};

Object.defineProperty(user_2, 'name', {
  value: 'John',
  enumerable: true, // для нового свойства необходимо явно указывать все флаги, где их значения равны true
  configurable: true,
});

// { value: 'John', writable: false, enumerable: true, configurable: true }

//_ Флаг enumerable

// при enumerable == false, свойство становится неперечисляемым

let admin = {
  name: 'John',
  sayHello() {
    alert('Hey there! My name is ' + this.name);
  },
};

for (let key in admin) {
  alert(key); // 'name', 'sayHello'
}
alert(Object.keys(admin)); // ['name', 'sayHello']

// Сделаем неперечисляемым метод sayHello:

Object.defineProperty(admin, 'sayHello', { enumerable: false });

for (let key in admin) {
  alert(key); // 'name'
}
alert(Object.keys(admin)); // ['name']

//_ Флаг configurable
/*
Флаг неконфигурируемого свойства (configurable: false) иногда предустановлен
для некоторых встроенных объектов и свойств.

Неконфигурируемое свойство не может быть удалено.
*/
/*
Определение свойства как неконфигурируемого – это дорога в один конец. Мы не сможем
отменить это действие, потому что defineProperty не работает с неконфигурируемыми свойствами:
*/

let about = {};

Object.defineProperty(about, 'name', {
  value: 'John',
  writable: false,
  configurable: false,
});

/* 
Теперь невозможно изменить about.name или его флаги
(сможем лишь изменить значение флага writable на false, если он ранее был равен true).

Всё это не будет работать:

about.name = "Pete"
delete about.name
defineProperty(about, "name", { value: "Pete" })
*/

Object.defineProperty(about, 'name', { writable: true }); // Ошибка

//_ Object.defineProperties

// Позволяет определять множество свойств сразу:

Object.defineProperties(user, {
  name: { value: 'John', writable: false },
  surname: { value: 'Smith', writable: false },
  // ...
});

//_ Object.getOwnPropertyDescriptors

// Возвращает дескрипторы всех свойств:

let object = {
  name: 'John',
  age: 23,
};

let desc = Object.getOwnPropertyDescriptors(object);

// Обычно при клонировании объекта мы используем присваивание, чтобы скопировать его свойства:

for (let key in object) {
  clone[key] = object[key];
}

/*
…Но это не копирует флаги. Также for..in игнорирует символьные и неперечисляемые свойства.

Вместе с Object.defineProperties этот метод можно использовать для клонирования
объекта вместе с его флагами:
*/
let clone = Object.defineProperties({}, Object.getOwnPropertyDescriptors(obj));

//_ Глобальное запечатывание объекта

/*
Дескрипторы свойств работают на уровне конкретных свойств.
Но ещё есть методы, которые ограничивают доступ ко всему объекту:

Object.preventExtensions(obj) - запрещает добавлять новые свойства в объект.
(перевод: предотвращать расширения)

Object.seal(obj) - запрещает добавлять/удалять свойства.
Устанавливает configurable: false для всех существующих свойств.

Object.freeze(obj) - запрещает добавлять/удалять/изменять свойства.
Устанавливает configurable: false, writable: false для всех существующих свойств.
*/
/*
А также есть методы для их проверки:

Object.isExtensible(obj) - возвращает false, если добавление свойств запрещено, иначе true.
(перевод: является расширяемым)

Object.isSealed(obj) - возвращает true, если добавление/удаление свойств запрещено
и для всех существующих свойств установлено configurable: false.

Object.isFrozen(obj) - возвращает true, если добавление/удаление/изменение свойств
запрещено, и для всех текущих свойств установлено configurable: false, writable: false.
*/

// * Свойства - геттеры и сеттеры

/*
Все свойства, которые мы использовали до текущего момента, были свойствами-данными.
get и set - это свойства-аксессоры. Это функции, которые присваивают/устанавливают значения
*/

//_ геттеры и сеттеры

// геттер срабатывает, когда obj.propName читается, сеттер – когда значение присваивается
let obj = {
  get propName() {
    // геттер, срабатывает при чтении obj.propName
  },

  set propName(value) {
    // сеттер, срабатывает при записи obj.propName = value
  },
};

let user_info = {
  name: 'John',
  surname: 'Smith',

  get fullName() {
    return `${this.name} ${this.surname}`;
  },

  set fullName(value) {
    [this.name, this.surname] = value.split(' ');
  },
};

// мы не вызываем user_info.fullName как функцию, а читаем как обычное свойство
alert(user_info.fullName); // John Smith

// set fullName запустится с данным значением
user_info.fullName = 'Alice Cooper';

alert(user_info.name); // Alice
alert(user_info.surname); // Cooper

//_ Дескрипторы свойств доступа

/*
Свойства-аксессоры не имеют value и writable, но взамен предлагают функции get и set.

get – функция без аргументов, которая сработает при чтении свойства,
set – функция, принимающая один аргумент, вызываемая при присвоении свойства,
enumerable – то же самое, что и для свойств-данных,
configurable – то же самое, что и для свойств-данных.
*/

let alex = {
  name: 'Alex',
  surname: 'Smith',
};

Object.defineProperty(alex, 'fullName', {
  get() {
    return `${this.name} ${this.surname}`;
  },

  set(value) {
    [this.name, this.surname] = value.split(' ');
  },
});

alert(alex.fullName); // 'Alex Smith'

for (let key in alex) alert(key); // 'name', 'surname'

/*
Свойство объекта может быть свойством-аксессором (с методами get/set),
свойством-данным (со значением value) или методом (функцией, привязанной к объекту).

При попытке указать и get, и value в одном дескрипторе будет ошибка:
*/

Object.defineProperty({}, 'prop', {
  get() {
    return 1;
  },
  value: 2,
}); // Error: Invalid property descriptor.

//_ Умные геттеры и сеттеры

/* 
Геттеры/сеттеры можно использовать как обёртки над «реальными» значениями свойств,
чтобы получить больше контроля над операциями с ними.

Например, если мы хотим запретить устанавливать короткое имя для user,
мы можем использовать сеттер name для проверки,
а само значение хранить в отдельном свойстве _name:
*/

let user = {
  get name() {
    return this._name;
  },

  set name(value) {
    if (value.length < 4) {
      alert('Имя слишком короткое, должно быть более 4 символов');
      return;
    }
    this._name = value;
  },
};

user.name = 'Pete';
alert(user.name); // 'Pete'

user.name = ''; // Имя слишком короткое...

/* 
Таким образом, само имя хранится в _name,
доступ к которому производится через геттер и сеттер.

Технически, внешний код всё ещё может получить доступ к имени напрямую с помощью user._name,
но существует широко известное соглашение о том, что свойства,
которые начинаются с символа "_", являются внутренними,
и к ним не следует обращаться из-за пределов объекта.
*/

//_ Использование для совместимости

/* 
Представим, что мы начали реализовывать объект user,
используя свойства-данные имя name и возраст age:
*/

function User(name, age) {
  this.name = name;
  this.age = age;
}

let john1 = new User('John', 25);

/* 
взамен возраста age мы можем решить хранить дату рождения birthday,
потому что так более точно и удобно:
*/

function User(name, birthday) {
  this.name = name;
  this.birthday = birthday;
}

let john2 = new User('John', new Date(1992, 6, 1));

/*
Для того, чтобы вывести и age и birthday, можно добавить age через Object.defineProperty,
и установить геттер:
*/

// возраст рассчитывается из текущей даты и дня рождения:

Object.defineProperty(this, 'age', {
  get() {
    let todayYear = new Date().getFullYear();
    return todayYear - this.birthday.getFullYear();
  },
});

alert(john2.birthday); // доступен как день рождения
alert(john2.age); // ...так и возраст
