// * Деструктурирующее присваивание

/*
В JS есть две чаще всего используемые структуры данных – это Object и Array:

- объекты позволяют создать одну сущность, хранящая элементы данных по ключам
- массивы позволяют собирать элементы данных в упорядоченный список

Но когда мы передаём их в функцию, то ей может понадобится
не объект/массив целиком, а элементы по отдельности.
*/

/*
Деструктурирующее присваивание – это специальный синтаксис,
который позволяет нам «распаковать» массивы или объекты
в несколько переменных, так как иногда они более удобны.
*/

// * Деструктуризация массива

let arr = ['Ilya', 'Kantor'];

let [firstName, surname] = arr;

alert(firstName); // 'Ilya'
alert(surname); // 'Kantor'

/*
Теперь мы можем использовать переменные firstName и surname вместо элементов массива.

Отлично смотрится в сочетании со split или другими методами, возвращающими массив:
*/

let [first_name, last_name] = 'Anna Cooper'.split(' ');

alert(first_name); // 'Anna'
alert(last_name); // 'Cooper'

// Особенности деструктуризации

//' "Деструктуризация" не означает разрушение
/*
«Деструктурирующее присваивание» не уничтожает массив.
Оно вообще ничего не делает с правой частью присваивания,
его задача – только скопировать нужные значения в переменные.
*/

let [first, second] = arr; // равнозначен записи:

// let first = arr[0];
// let second = arr[1];

//' Пропускайте элементы, используя запятые
/*
Нежелательные элементы массива также могут быть отброшены
с помощью дополнительной запятой:
*/

let [commander, , rank] = ['Julius', 'Caesar', 'Consul', 'of the Republic'];

alert(commander, rank); // 'Julius', 'Consul'

/* 
В примере выше второй и четвертый элементы массива пропускаются
(так как для них нет переменных)
*/

//' Работает с любым перебираемым объектом с правой стороны
/*
…На самом деле мы можем использовать любой перебираемый объект,
не только массивы:
*/

let [a, b, c] = 'abc';
let [one, two, three] = new Set([1, 2, 3]);

alert(b); // 'b'
alert(three); // 3

//' Присваивайте чему угодно с левой стороны
/*
Мы можем использовать что угодно «присваивающее» с левой стороны.
Например, можно присвоить свойству объекта:
*/

let person = {};

[person.name, person.surname] = 'Ilya Kantor'.split(' ');

alert(person.name); // 'Ilya'
alert(person.surname); // 'Kantor'

//' Цикл с Object.entries()

/* 
Мы можем использовать Object.entries() с деструктуризацией
для цикличного перебора ключей и значений объекта:
*/

let john = {
  name: 'John',
  age: 30,
};

// цикл по ключам и значениям
for (let [key, value] of Object.entries(john)) {
  alert(`${key}: ${value}`); // 'name: John', 'age: 30'
}

// Пример с Map:

let alex = new Map([
  ['name', 'Alex'],
  ['age', '24'],
]);

// Map перебирает как пары [ключ, значение], что очень удобно для деструктурирования
for (let [key, value] of alex) {
  alert(`${key}: ${value}`); // 'name: Alex', 'age: 24'
}

//' Трюк обмена переменных

let guest = 'Jane';
let admin = 'Pete';

// Давайте поменяем местами значения:
// сделаем guest = "Pete", а admin = "Jane"
[guest, admin] = [admin, guest];

alert(`${guest} ${admin}`); // 'Pete Jane' (успешно заменено!)

/* 
Здесь мы создаём временный массив из двух переменных
и немедленно деструктурируем его в порядке замены.

Таким образом, мы можем поменять местами даже более двух переменных.
*/

//_ Остаточные параметры

/*
Обычно, если массив длиннее, чем список слева, «лишние» элементы опускаются.

Например, здесь берутся только первые два элемента, а остальные
просто игнорируются:
*/

let [name1, name2] = ['Julius', 'Caesar', 'Consul', 'of the Roman Republic'];

alert(name1); // 'Julius'
alert(name2); // 'Caesar' (дальнейшие элементы нигде не присваиваются)

/*
Чтобы получить остальные значения можно использовать оператор
"остаточные параметры" - троеточие ("...")
*/

let [name_1, name_2, ...rest] = ['Julius', 'Caesar', 'Consul', 'of the Republic'];

// rest это массив элементов, начиная с 3-го:
alert(rest); // [ 'Consul', 'of the Republic' ]

/*
Переменная rest является массивом из оставшихся элементов.

Вместо rest можно использовать любое другое название переменной,
просто убедитесь, что перед переменной есть три точки и она стоит
на последнем месте в деструктурирующем присваивании
*/

//_ Значения по умолчанию

/*
Если в массиве меньше значений, чем в присваивании, то ошибки не будет.
Отсутствующие значения считаются неопределёнными:
*/

let [first_el, second_el] = [];

alert(first_el); // undefined
alert(second_el); // undefined

/*
Если мы хотим, чтобы значение «по умолчанию» заменило отсутствующее,
мы можем указать его с помощью =:
*/

let [value1 = 'Guest', value2 = 'Anonymous'] = ['Julius'];

alert(value1); // 'Julius' (из массива)
alert(value2); // 'Anonymous' (значение по умолчанию)

/*
Значения по умолчанию могут быть гораздо более сложными выражениями или даже функциями.
Они выполняются, только если значения отсутствуют:
*/
let [value_1 = prompt('name?'), value_2 = prompt('surname?')] = ['Julius'];

alert(value_1); // 'Julius' (из массива)
alert(value_2); // результат prompt

// * Деструктуризация объекта

/* 
Деструктурирующее присваивание также работает с объектами.

` let { var1, var2 } = { var1: …, var2: … };
*/

let { varOne, varTwo } = { varOne: 'one', varTwo: 'two' };

alert(varOne, varTwo); // 'one' 'two'

// Чаще бывает удобнее объект из правой части выражения присвоить переменной:

let options = {
  title: 'Menu',
  width: 100,
  height: 200,
};

let { title, width, height } = options; // Порядок в let не имеет значения

alert(title); // 'Menu'
alert(width); // 100
alert(height); // 200

/*
Свойства options.title, options.width и options.height
присваиваются соответствующим переменным.

Порядок переменных в левой части не имеет значения
*/

/*
Если мы хотим присвоить свойство объекта переменной с другим названием,
например, свойство options.width присвоить переменной w, то мы можем
использовать двоеточие:

let { width: w, height: h, title } = { title: 'Menu', width: 100, height: 200 }

alert(title, w, h);  // 'Menu' 100 200
*/

/*
Для потенциально отсутствующих свойств мы можем установить
значения по умолчанию, используя "=", как здесь:

let { width = 100, height = 200, title } = { title: 'Menu' };
*/

/*
Значениями по умолчанию могут быть любые выражения или даже функции.
Они выполнятся, если значения отсутствуют.

В коде ниже prompt запросит width, но не title:

let options = {
	title: "Menu"
};

let { width = prompt("width?"), title = prompt("title?") } = options;

alert(title);  // 'Menu'
alert(width);  // (результат prompt)
*/

/* 
Мы также можем совмещать : и =

let options = {
	title: "Menu"
};

let { width: w = 100, height: h = 200, title } = options;

alert(title, w, h);  // 'Menu' 100 200
*/

/*
Если у нас есть большой объект с множеством свойств, можно взять
только то, что нужно:

let options = {
	title: "Menu",
	width: 100,
	height: 200
};

let { title } = options; // взять только title, игнорировать остальное

alert(title); // 'Menu'
*/

//_ Остаток объекта "..."

/* 
Можно использовать троеточие, как и для массивов.
Оставшиеся свойства будут присвоены новому объекту.
*/

let car = {
  appellation: 'Audi',
  weight: 2.5,
  cost: 12_000,
};

let { appellation, ...restObj } = car;

// сейчас appellation = "Audi", restObj = { weight: 2.5, cost: 12000 }
alert(restObj.weight); // 2.5
alert(restObj.cost); // 12000

// Обратите внимание на let!

/* 
В примерах выше переменные были объявлены в присваивании: let {…} = {…}.
Конечно, мы могли бы использовать существующие переменные и не указывать let,
но тут есть подвох:

let design, memory, price;

{ design, memory, price } = { design: "GTX 1660", memory: '6 GB', price: 219 }; // ошибка

Проблема в том, что JavaScript обрабатывает {...} в основном потоке кода
(не внутри другого выражения) как блок кода, отсюда и ошибка.

Мы можем заключить строку с ошибкой в скобки, чтобы все заработало:
*/

let design, memory, price;

({ design, memory, price } = {
  design: 'GTX 1660',
  memory: '6 GB',
  price: 219,
});

alert(memory); // '6 GB'

//_ Вложенная деструктуризация

/* 
Если объект или массив содержит другие вложенные объекты или массивы,
то мы можем использовать более сложные шаблоны с левой стороны,
чтобы извлечь более глубокие свойства
*/

let params = {
  size: {
    breadth: 50,
    altitude: 80,
  },
  items: ['Cake', 'Donut'],
  extra: true,
};

// деструктуризация разбита на несколько строк для ясности
let {
  size: { breadth, altitude },
  items: [item1, item2],
  named = 'Carte', // отсутствует в объекте (используется значение по умолчанию)
} = params;

alert(named); // 'Carte'
alert(breadth); // 50
alert(altitude); // 80
alert(item1); // 'Cake'
alert(item2); // 'Donut'
alert(options.extra); // true

/* 
Весь объект options, кроме свойства extra, которое в левой части отсутствует,
присваивается в соответствующие переменные.

В итоге у нас есть breadth, altitude, item1, item2 и named со значением по умолчанию.

Заметим, что переменные для size и items отсутствуют, так как мы взяли сразу их содержимое.
*/

//_ Умные параметры функций

/*
Представим функцию, которая имеет много параметров, большинство
из которых необязательны (где значения по умолчанию вполне подходят).

Вот так – плохой способ писать подобные функции:
*/

function showInfo(brand = 'Untitled', power = 150, fuelFlow = 5, add = []) {
  // ...
}

/* 
Проблема такого подхода:
- придется запоминать порядок всех аргументов
- придется при вызове функции передавать undefined в параметры,
значения по умолчанию которых нас устраивают
*/

showInfo('Ford', undefined, undefined, ['Taurus', '2012']);

/*
Для того, чтобы код выглядел понятнее, можно передать параметры как объект,
а функция немедленно деструктурирует объект в переменные:
*/

let ford = {
  brand: 'Ford',
  add: ['Taurus', '2012'],
};

// ...и она немедленно извлекает свойства в переменные
function showInfo({ brand = 'Untitled', power = 150, fuelFlow = 5, add = [] }) {
  // brand, add – взято из options,
  // power, fuelFlow – используются значения по умолчанию

  alert(`${brand} ${power} ${fuelFlow}`); // 'Ford 150 5'
  alert(add); // ['Taurus', '2012']
}

showInfo(ford); // мы передаём объект в функцию как аргумент

/*
Мы также можем использовать более сложное деструктурирование
с вложенными объектами и двоеточием в параметрах функции:
*/

let ford1 = {
  brand: 'Ford',
  add: ['Taurus', '2012'],
};

function showInfo({
  brand = 'Untitled',
  power: p = 150, // power присваиваем в p
  fuelFlow: f = 5, // fuelFlow присваиваем в f
  add: [item_1, item_2], // первый элемент add присваивается в item_1, второй в item_2
}) {
  alert(`${brand} ${p} ${f}`); // 'Ford 150 5'
  alert(item_1, item_2); // 'Taurus' '2012'
}

showInfo(ford1);

/*
Такое деструктурирование подразумевает, что в showInfo() будет обязательно передан объект.
Если нам нужны все значения по умолчанию, то нам следует передать пустой объект:
*/
showInfo({}); // ок, все значения - по умолчанию

showInfo(); // так была бы ошибка

/*
Мы можем исправить это, сделав пустой объект значением по умолчанию
для всего объекта параметров:
*/

function showMenu({ brand = 'Untitled', power = 150, fuelFlow = 5 } = {}) {
  alert(`${brand} ${power} ${fuelFlow}`);
}

showMenu(); // 'Untitled 150 5'

// Более дополненный пример:

function showInfo({
  brand = 'Untitled',
  power: p = 150,
  fuelFlow: f = 5,
  add: [item_1 = 'first item', item_2] = [],
} = {}) {
  alert(`${brand} ${p} ${f}`); // 'Untitled 150 5'
  alert(item_1); // 'first item'
  alert(item_2); // undefined
}

showInfo();

//* итого

/*
Деструктуризация позволяет разбивать объект или массив
на переменные при присвоении.

Полный синтаксис для объекта:

let {prop : varName = default, ...rest} = object

Значение свойства prop объекта object здесь должно быть присвоено переменной varName.

Если в объекте отсутствует такое свойство, переменной varName
присваивается значение по умолчанию.

Свойства, которые не были упомянуты, копируются в объект rest.


Полный синтаксис для массива:

let [item1 = default, item2, ...rest] = array

Первый элемент отправляется в item1; второй отправляется в item2,
все остальные элементы попадают в массив rest.

Можно извлекать данные из вложенных объектов и массивов,
для этого левая сторона должна иметь ту же структуру, что и правая.
*/
