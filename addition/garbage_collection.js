// * Сборка мусора
/*
При создании примитивов, объектов, функций и тд. они занимают память.
Для очищения памяти от ненужных данных в движке JavaScript есть фоновый процесс,
который называется сборщиком мусора.
Он отслеживает все объекты и удаляет те, которые стали недостижимыми.
*/

/*
«Достижимые» значения – это те, которые доступны или используются.
Они гарантированно находятся в памяти:
- глобальные переменные
- выполняемая в данный момент функция, её локальные переменные и параметры
- другие функции в текущей цепочке вложенных вызовов, их локальные переменные и параметры
- (некоторые другие внутренние значения)

- любое другое значение считается достижимым,
если оно доступно из корня по ссылке или по цепочке ссылок
*/

let user = { name: 'John' };
user = null; // объект { name: "John" } становится недостижимым

let people = { name: 'Alex' };
let people2 = people;
people = null; // объект { name: "John" } все еще достижим через people2
