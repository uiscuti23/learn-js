//* Методы массива

//_ Добавление/удаление элементов

/* 
Мы уже знаем методы, которые добавляют и удаляют элементы:

arr.push(...items) – добавляет элементы в конец,
arr.pop() – извлекает элемент из конца,
arr.shift() – извлекает элемент из начала,
arr.unshift(...items) – добавляет элементы в начало.

Есть и другие.
*/

//' splice

/*
Позволяет добавлять, удалять и заменять элементы.
Меняет исходный массив.

` arr.splice(start[, deleteCount, elem1, ..., elemN])

start - начальная позиция (может иметь отрицательный индекс)
deleteCount - количество элементов для удаления
elem - новые добавляемые элементы (опционально)

Удаляются элементы начиная с индекса start в количестве deleteCount,
затем вствляются элементы elem1, ..., elemN
*/

// Пример 1. Удаление элементов

let first_ex = ['Я', 'изучаю', 'JavaScript'];

let removed = first_ex.splice(1, 1); // удаляем элемент с индексом 1

alert(removed); // [ 'изучаю' ] - возвращается удаленный элемент (в массиве)
alert(first_ex); // [ 'Я', 'JavaScript' ]

/*
Из примера мы видим, что slice возвращает массив из удалённых элементов (переменная removed)
*/

// Пример 2. Удаление и вставка (замена)

let second_ex = ['Я', 'изучаю', 'JavaScript', 'прямо', 'сейчас'];

second_ex.splice(0, 3, 'давай', 'танцевать'); // удаляем 3 первых элемента и заменяем их двумя другими

alert(second_ex); // ['давай', 'танцевать', 'прямо', 'сейчас']

// Пример 3. Вставка элементов

let third_ex = ['Я', 'изучаю', 'JavaScript'];

third_ex.splice(2, 0, 'прекраснейший', 'язык');

alert(third_ex); // ['Я', 'изучаю', 'прекраснейший', 'язык', 'JavaScript']

//' slice

/*
Возвращает новый массив, в который копирует все элементы
с индекса start до end (не включая end).

` arr.slice([start], [end])

start и end - стартовый и конечный индексы (могут быть отрицательными)
*/

/*
Копируются элементы, начиная с индекса start, заканчивая индексом end
(не включая end).
*/

let strArr = ['t', 'e', 's', 't'];

alert(strArr.slice(1, 3)); // 'e','s' (копирует с 1 до 3)
alert(strArr.slice(-2)); // 's','t' (копирует с -2 до конца)

alert(strArr.slice()); // 't','e','s','t' (копируется весь массив)

//' concat

/*
Cоздаёт новый массив, в который копирует данные из других массивов
и дополнительные значения

` arr.concat(arg1, arg2...)

Он принимает любое количество аргументов,
которые могут быть как массивами, так и простыми значениями.

В результате – новый массив, включающий в себя элементы из arr,
затем arg1, arg2 и так далее.

Если аргумент argN – массив, то копируются все его элементы.
Иначе копируется сам аргумент.
*/

let numArr = [1, 2];

alert(numArr.concat([3, 4])); // [1,2,3,4] (массив из: numArr и [3,4])

alert(numArr.concat([3, 4], [5, 6])); // [1,2,3,4,5,6] (из: numArr и [3,4] и [5,6])

alert(numArr.concat([3, 4], 5, 6)); // [1,2,3,4,5,6] (из: numArr и [3,4], 5 и 6)

// Дополнительно про concat
/*
Обычно concat копирует только элементы из массивов.
Другие объекты, если они даже выглядять как массивы, добавляются как есть:
*/

let num_arr = [1, 2];

let array_like = {
  0: 'что-то',
  length: 1,
};

alert(num_arr.concat(array_like)); // [1, 2, {0: 'что-то', length: 1}]

/*
…Но если массивоподобный объект имеет специальное свойство Symbol.isConcatSpreadable,
то он обрабатывается как массив, с помощью concat: вместо него добавляются его элементы.
*/

let pseudo_array = [1, 2];

let arrayLike = {
  0: 'что-то',
  1: 'ещё',
  [Symbol.isConcatSpreadable]: true,
  length: 2,
};

alert(pseudo_array.concat(arrayLike)); // [1, 2, 'что-то', 'ещё']

//_ Поиск в массиве

//' indexOf/lastIndexOf и includes

/*
Методы indexOf/lastIndexOf и includes являются аналогами строковым методам.

- arr.indexOf(item, from) ищет item, начиная с индекса from,
и возвращает номер индекса, на котором был найден искомый элемент,
в противном случае - -1.

arr.lastIndexOf(item, from) - делает то же самое, что indexOf, но ищет справа налево.

- arr.includes(item, from) - ищет item, начиная с индекса from,
и возвращает true, если поиск успешен.

Обычно эти методы используются только с одним аргументом: искомым item.
По умолчанию поиск ведется с начала.
*/

let array = [1, 0, false];

alert(array.indexOf(0)); // 1
alert(array.indexOf(false)); // 2
alert(array.indexOf(null)); // -1

alert(array.includes(1)); // true

/*
Методы используют строгое сравнение. Если мы ищем false,
он находит именно false, а не 0.

Если проверяем наличие элемента, предпочтительным будет
метод includes.

includes правильно обрабатывает NaN:
*/

const nan_arr = [NaN];

alert(nan_arr.indexOf(NaN)); // -1 (должен быть 0, но === проверка на равенство не работает для NaN)
alert(nan_arr.includes(NaN)); // true (верно)

//' find и findIndex/findLastIndex

/*
find вернёт первый найденный в массиве элемент, который удовлетворяет заданному условию

` let res = arr.find(function (item, index, array) {...})

- в методе для каждого элемента массива по очереди вызывается функция-колбэк
с заданным условием
- если она возвращает true, поиск (перебор элементов) прерывается
и возвращается текущий элемент item
- если все итерации оказались ложными (вернули false) - возвращается undefined

item, index – очередной элемент и его индекс
array – массив, к которому применили метод
*/

let aboutUsers = [
  { id: 1, name: 'Вася' },
  { id: 2, name: 'Петя' },
  { id: 3, name: 'Маша' },
];

let user = aboutUsers.find(item => item.id == 1);

alert(user.name); // 'Вася'

/*
Метод arr.findIndex – по сути, то же самое, но возвращает индекс,
на котором был найден элемент, а не сам элемент, и -1, если ничего не найдено.

Метод arr.findLastIndex похож на findIndex, но ищет справа налево
*/

//' filter
/*
Метод filter, в отличие от метода find, возвращает не один элемент,
а массив из всех элементов, которые удовлетворяют заданному условию.

` let results = arr.filter(function (item, index, array) {...})

- в методе для каждого элемента массива по очереди вызывается функция-колбэк
с заданным условием
- если она возвращает true, элемент item добавляется к результату, и перебор продолжается
- если все итерации оказались ложными (вернули false) - возвращается пустой массив
*/

// Пример 1

let about_users = [
  { id: 1, name: 'Вася' },
  { id: 2, name: 'Петя' },
  { id: 3, name: 'Маша' },
];
// возвращает массив, состоящий из двух первых пользователей
let someUsers = about_users.filter(item => item.id < 3);

alert(someUsers.length); // 2

// Пример 2

let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

let evenNumbers = numbers.filter(function (item) {
  return item % 2 == 0;
});

alert(evenNumbers); // [2, 4, 6, 8, 10, 12]

//_ Преобразование и упорядочивание массива

//' map

/*
map вызывает функцию для каждого элемента массива
и возвращает массив результатов выполнения этой функции.

` let res = arr.map(function (item, index, array) {...})

- в методе для каждого элемента массива по очереди вызывается функция-колбэк
- возвращается новое значение элемента
*/

let lengths = ['Bilbo', 'Gandalf', 'Nazgul'].map(item => item.length);

alert(lengths); // [ 5,7,6 ]

//' sort

/*
Вызов arr.sort() сортирует массив на месте, меняя в нём
порядок элементов.

Он возвращает отсортированный массив, но обычно возвращаемое
значение игнорируется, так как изменяется сам arr (исходный массив).

Следует учитывать, что по умолчанию элементы сортируются как строки.

Метод sort сравнивает элементы, преобразуя их в строку
и после приводит их к исходному типу
*/

let nums = [1, 2, 15];

nums.sort();

alert(nums); // [1, 15, 2]

alert(typeof nums[0]); // 'number'

/* 
В примере выше, для строк применяется лексикографический порядок,
и действительно выходит, что '2' > '15'

Чтобы использовать наш собственный порядок сортировки,
нам нужно предоставить функцию в качестве аргумента arr.sort():
*/

function compareNumeric(a, b) {
  if (a > b) return 1;
  if (a == b) return 0;
  if (a < b) return -1;
}

let numsArr = [1, 2, 15];

numsArr.sort(compareNumeric);

alert(numsArr); // [1, 2, 15]

/* 
Массив может содержать числа, строки, объекты или что-то ещё, то есть набор каких-то элементов.
Чтобы отсортировать его, нам нужна упорядочивающая функция, которая знает,
как сравнивать его элементы. По умолчанию элементы сортируются как строки.
*/

/* 
На самом деле от функции сравнения требуется любое положительное число,
чтобы сказать «больше», и отрицательное число, чтобы сказать «меньше».

Это позволяет писать более короткие функции:
*/

let nums_arr = [1, 2, 15];

nums_arr.sort(function (a, b) {
  return a - b;
});

alert(nums_arr); // [1, 2, 15]

// Для сравнения чисел, лучше использовать стрелочные функции:
nums_arr.sort((a, b) => a - b);

// Для сравнения строк, используйте localeCompare для правильной сортировки букв, таких как Ö:

let countries = ['Österreich', 'Andorra', 'Vietnam'];
alert(countries.sort((a, b) => a.localeCompare(b))); // ['Andorra', 'Österreich', 'Vietnam']

//' reverse

/* 
reverse меняет порядок элементов в массиве на обратный.

Меняет исходный массив, а также возвращает массив с изменённым порядком элементов
*/

let nums_array = [1, 2, 3, 4, 5];

nums_array.reverse();

alert(nums_array); // [5, 4, 3, 2, 1]

//' split и join

/*
Метод str.split(delim) разбивает строку на массив по заданному разделителю delim.

В примере ниже таким разделителем является строка из запятой и пробела:
*/

let names = 'Вася, Петя, Маша';

let namesArr = names.split(', ');

alert(namesArr); // ['Вася', 'Петя', 'Маша']

for (let name of namesArr) {
  alert(`Сообщение получат: ${name}.`); // 'Сообщение получат: Вася', ... (и другие имена)
}

/*
У метода split есть необязательный второй числовой аргумент –
ограничение на количество элементов в массиве.

Если их больше, чем указано, то остаток массива будет отброшен.
*/

let names_arr = 'Вася, Петя, Маша, Саша'.split(', ', 2);

alert(names_arr); // ['Вася', 'Петя']

// Вызов split('') с пустым аргументом разбил бы строку на массив букв:

let test = 'тест';
alert(test.split('')); // ['т','е','с','т']

/*
Вызов arr.join(glue) делает в точности противоположное split.

Он создаёт строку из элементов arr, вставляя glue между ними.
*/

let friends = ['Вася', 'Петя', 'Маша'];

let str = friends.join(';'); // объединить массив в строку через ;

alert(str); // 'Вася;Петя;Маша'

// Получение строки из массива:

let friendsArr = ['Ваня', 'Иштван', 'Оля'];

alert(String(friendsArr)); // 'Ваня,Иштван,Оля'

//' reduce/reduceRight

/*
Методы reduce/reduceRight позволяют перебрав массив, получить (вычислить)
одно единственное значение на основе всего массива.

Функция применяется по очереди ко всем элементам массива,
результат которого 'переносится' на следующий вызов.

То есть при вызове функции результат её предыдущего вызова
передаётся на следующий вызов в качестве первого аргумента previousValue.

Так, первый аргумент является по сути аккумулятором,
который хранит объединённый результат всех предыдущих вызовов функции.

По окончании он становится результатом reduce
*/

let value = arr.reduce(
  function (previousValue, item, index, array) {
    // ...
  },
  [initial]
);

/*
При вызове reduce для массива, мы передаём в него два аргумента:
- функцию-колбэк с четырьмя аргументами
- начальное значение initial (опционально)

Аргументы:

previousValue - результат предыдущего вызова этой функции,
при первом вызове равный initial (если передан initial).

item, index - очередной элемент и его индекс
array - массив, к которому применен метод
*/

let sequence = [1, 2, 3, 4, 5];

let amount = sequence.reduce((sum, current) => sum + current, 0);

alert(amount); // 15

/*
При отсутствии initial в качестве первого значения берётся первый элемент массива,
а перебор стартует со второго.

Но такое использование требует крайней осторожности.

Если массив, к которому применен метод является пустым,
то вызов reduce без начального значения выдаст ошибку.

Поэтому рекомендуется всегда указывать начальное значение
*/

let empty = [];

// Error: Reduce of empty array with no initial value
// если бы существовало начальное значение, reduce вернул бы его для пустого массива

empty.reduce((sum, current) => sum + current);

/*
Метод arr.reduceRight работает анологично, но проходит по массиву
справа налево.
*/

// * Итог

/*
Массив – это особый тип объекта, предназначенный для работы
с упорядоченным набором элементов.

Объявление:

- let arr = [item1, item2...]
- let arr = new Array(item1, item2...)

Вызов new Array(number) создаёт массив с заданной длиной,
но без элементов.

Свойство length отражает длину массива или, если точнее,
его последний цифровой индекс плюс один.
Если мы уменьшаем length вручную, массив укорачивается.

Получить элемент массива можно по его индексу, например arr[0],
или используя метод at(i).
Метод at(i) может принимать отрицательный аргумент, и для таких значений i,
он отступает от конца массива.


Для перебора элементов массива используем:

- for (let i=0; i<arr.length; i++) – работает быстрее всего,
совместим со старыми браузерами.

- for (let item of arr) – современный синтаксис только для значений
элементов (к индексам нет доступа).

- метод forEach(func) – вызывает func для каждого элемента.
Ничего не возвращает.

Не следует использовать цикл for..in для перебора элементов массива.


Можно использовать массив как двустороннюю очередь, благодаря операциям:

- pop() удаляет элемент в конце массива и возвращает его.
- push(...items) добавляет items в конец массива.
- shift() удаляет элемент в начале массива и возвращает его.
- unshift(...items) добавляет items в начало массива.

Также для добавления/удаления элементов:

- splice(pos, deleteCount, ...items) – начиная с индекса pos,
удаляет deleteCount элементов и вставляет items.

- slice(start, end) – создаёт новый массив, копируя в него элементы
с позиции start до end (не включая end).

- concat(...items) – возвращает новый массив: копирует все члены
текущего массива и добавляет к нему items.
Если какой-то из items является массивом, тогда берутся его элементы.


Для поиска среди элементов:

- indexOf/lastIndexOf(item, pos) – ищет item, начиная с позиции pos,
и возвращает его индекс или -1, если ничего не найдено.

- includes(value) – возвращает true, если в массиве имеется
элемент value, в противном случае false.

- find/filter(func) – фильтрует элементы через функцию и отдаёт
первое/все значения, при прохождении которых через функцию возвращается true.

- findIndex похож на find, но возвращает индекс вместо значения.


Для преобразования массива:

- map(func) – создаёт новый массив из результатов вызова func
для каждого элемента.

- sort(func) – сортирует массив «на месте», а потом возвращает его.

- reverse() – «на месте» меняет порядок следования элементов
на противоположный и возвращает изменённый массив.

- split/join – преобразует строку в массив и обратно.

- reduce/reduceRight(func, initial) – вычисляет одно значение
на основе всего массива, вызывая func для каждого элемента
и передавая промежуточный результат между вызовами.

Методы sort, reverse, splice, push, pop, shift и unshift изменяют исходный массив.

Можно проверить, является ли объект массивом, используя Array.isArray(arr)

Метод toString в массиве возвращает список элементов (строку), разделённых запятыми.

Не сравнивайте массивы, используя ==

Почти все методы массива, которые вызывают функции (find, filter, map и тд),
за исключением метода sort, принимают необязательный параметр thisArg

Существуют и другие метода массивов (менее важные):

- arr.some(fn) / arr.every(fn)
- arr.fill(value, start, end)
- arr.copyWithin(target, start, end)
- arr.flat(depth) / arr.flatMap(fn)

*/
