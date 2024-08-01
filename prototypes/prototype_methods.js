// * Методы прототипов

/*
Эти методы желательно использовать вместо __proto__:

- Object.create(proto, [descriptors]) – создаёт пустой объект со свойством [[Prototype]],
указанным как proto, и необязательными дескрипторами свойств descriptors.

- Object.getPrototypeOf(obj) – возвращает свойство [[Prototype]] объекта obj.

- Object.setPrototypeOf(obj, proto) – устанавливает свойство [[Prototype]] объекта obj как proto.
*/

let animal = { eats: true };

// создаём новый объект с прототипом animal
let rabbit = Object.create(animal);

alert(rabbit.eats); // true

alert(Object.getPrototypeOf(rabbit) === animal); // получаем прототип объекта rabbit (true)

Object.setPrototypeOf(rabbit, {}); // заменяем прототип объекта rabbit на {}

/* 
У Object.create есть необязательный второй аргумент: дескрипторы свойств.
Мы можем добавить дополнительное свойство новому объекту таким образом:
*/

let animalObj = { eats: true };

let rabbitObj = Object.create(animalObj, {
  jumps: { value: true },
});

alert(rabbitObj.jumps); // true

/* 
Мы также можем использовать Object.create для «продвинутого» клонирования объекта,
более мощного, чем копирование свойств в цикле for..in:
*/

let clone = Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));

/* 
Такой вызов создаёт точную копию объекта obj, включая все свойства: перечисляемые и неперечисляемые,
геттеры/сеттеры для свойств – и всё это с правильным свойством [[Prototype]].
*/

/* 
Не меняйте [[Prototype]] существующих объектов, если важна скорость.

Изменение прототипа «на лету» с помощью Object.setPrototypeOf или obj.__proto__=
– очень медленная операция, которая ломает внутренние оптимизации для операций доступа
к свойствам объекта. 
*/

//_ Простейший объект

/* 
Иногда бывает полезным использовать объекты без прототипа, во избежание ситуаций, когда мы не можем
установить свойство по ключу __proto__, toString и тд:
*/

let obj = Object.create(null);

let key = prompt("What's the key?", '__proto__');
obj[key] = 'some value';

alert(obj[key]); // 'some value'

/* 
Обратите внимание, что большая часть методов, связанных с объектами, имеют вид Object.something(...).
К примеру, Object.keys(obj). Подобные методы не находятся в прототипе, так что они продолжат
работать для таких объектов:
*/

let chineseDictionary = Object.create(null);
chineseDictionary.hello = '你好';
chineseDictionary.bye = '再见';

alert(Object.keys(chineseDictionary)); // ['hello', 'bye']

// * итого

/* 
Современные способы установки и прямого доступа к прототипу это:

Object.create(proto[, descriptors])
Object.getPrototypeOf(obj)
Object.setPrototypeOf(obj, proto)

Встроенный геттер/сеттер __proto__ не безопасен, если мы хотим использовать созданные пользователями
ключи в объекте. Как минимум потому, что пользователь может ввести "__proto__" как ключ,
от чего может возникнуть ошибка.

Так что мы можем использовать либо Object.create(null) для создания «простейшего» объекта,
либо использовать коллекцию Map.

Кроме этого, Object.create даёт нам лёгкий способ создать поверхностную копию объекта со всеми дескрипторами.

Object.keys(obj) / Object.values(obj) / Object.entries(obj) – возвращают массив всех перечисляемых собственных строковых ключей/значений/пар ключ-значение.
Object.getOwnPropertySymbols(obj) – возвращает массив всех собственных символьных ключей.
Object.getOwnPropertyNames(obj) – возвращает массив всех собственных строковых ключей.
Reflect.ownKeys(obj) – возвращает массив всех собственных ключей.
obj.hasOwnProperty(key): возвращает true, если у obj есть собственное (не унаследованное) свойство с именем key.

Все методы, которые возвращают свойства объектов (такие как Object.keys и другие), возвращают «собственные»
свойства. Если мы хотим получить и унаследованные, можно воспользоваться циклом for..in.
*/
