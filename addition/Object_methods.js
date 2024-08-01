// * Методы Object

/* 
- Object.is –  сравнивает значения примерно как ===, но работает с NaN и видит различия между 0 и -0

- Object.assign – копирует в целевой объект dest все свойства объектов src1, src2 и тд
(включая и свойства с символьными ключами) и возвращает объект dest

- Object.create(proto, [descriptors]) – создаёт пустой объект со свойством [[Prototype]],
указанным как proto, и необязательными дескрипторами свойств descriptors.

- Object.getPrototypeOf(obj) – возвращает свойство [[Prototype]] объекта obj.

- Object.setPrototypeOf(obj, proto) – устанавливает свойство [[Prototype]] объекта obj как proto.

- Object.keys(obj) / Object.values(obj) / Object.entries(obj) – возвращают массив всех перечисляемых
собственных строковых ключей/значений/пар ключ-значение.

- Object.fromEntries(array) создаёт объект из массива пар вида [ключ, значение]
(тоесть делает противоположное тому, что делает entries)

- Object.getOwnPropertyNames(obj) – возвращает массив всех собственных строковых ключей.

- Object.getOwnPropertySymbols(obj) – возвращает массив всех собственных символьных ключей.
(Reflect.ownKeys(obj) – возвращает массив всех собственных ключей)

(obj.hasOwnProperty(key): возвращает true, если у obj есть собственное (не унаследованное)
свойство с именем key вне зависимости является ли оно строковым или символьным)


- Object.defineProperty и Object.defineProperties – позволяют изменить/определить флаги конкретного свойства
или всех свойств сразу

- Object.getOwnPropertyDescriptor и Object.getOwnPropertyDescriptors –  позволяют получить информацию
о значении свойства и его флагах, то есть полную информацию о свойстве или информацию о всех свойствах

- Object.preventExtensions(obj) - запрещает добавлять новые свойства в объект.
(перевод: предотвращать расширения)

- Object.seal(obj) - запрещает добавлять/удалять свойства.
Устанавливает configurable: false для всех существующих свойств.

- Object.freeze(obj) - запрещает добавлять/удалять/изменять свойства.
Устанавливает configurable: false, writable: false для всех существующих свойств.

- Object.isExtensible(obj) - возвращает false, если добавление свойств запрещено, иначе true.
(перевод: является расширяемым)

- Object.isSealed(obj) - возвращает true, если добавление/удаление свойств запрещено
и для всех существующих свойств установлено configurable: false.

- Object.isFrozen(obj) - возвращает true, если добавление/удаление/изменение свойств запрещено,
и для всех текущих свойств установлено configurable: false, writable: false.

Также у Object имеется свойство prototype.
*/
