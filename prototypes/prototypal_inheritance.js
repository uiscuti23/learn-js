// * Прототипное наследование

//_ [[Prototype]]
/*
Прототип можно рассматривать как объект со свойствами (свойства-данные, свойства-аксессоры
и методы), к которым может обратиться любой экземпляр объекта.

[[Prototype]] - это скрытое свойство, которое либо равно null, либо ссылается
на другой объект. Этот объект называется "прототип".

Когда мы хотим получить доступ к свойству объекта, а оно отсутствует,
JavaScript ищет его в прототипе, после чего в прототипе прототипа, и так далее,
пока не найдет (при отсутсвии вернется undefined). 

Такой механизм называется «прототипным наследованием».

Один из способов задать [[Prototype]] - использование __proto__ (геттер/сеттер для [[Prototype]]):
*/

let animal = {
  eat: 'Animal eat',
  walk() {
    alert('Animal walk');
  },
};

let rabbit = { jump: 'Rabbit jump' };

rabbit.__proto__ = animal; // устанавливаем animal как прототип для rabbit

alert(rabbit.eat); // 'Animal eat' (значение взято из свойства animal)
alert(rabbit.jump); // 'Rabbit jump'

rabbit.walk(); // 'Animal walk'

/* 
Когда alert пытается прочитать свойство rabbit.eat, его нет в rabbit,
поэтому JavaScript следует по ссылке [[Prototype]] и находит его в animal.

Можно сказать, что 'animal является прототипом rabbit' или
'rabbit прототипно наследует от animal'.

Если у animal много полезных свойств и методов, то они автоматически становятся
доступными у rabbit. Такие свойства называются «унаследованными».

В нашем случае, свойство eat и метод walk будут "унаследованными" для объекта rabbit
*/

// Цепочка прототипов может быть длиннее:

let beast = {
  eat: 'Beast eat',
  walk() {
    alert('Beast walk');
  },
};

let bunny = {
  jump: 'Bunny jump',
  __proto__: beast,
};

let longEar = {
  earLength: 10,
  __proto__: bunny,
};

longEar.walk(); // 'Beast walk' (из beast)
alert(longEar.jump); // 'Bunny jump' (из bunny)

/*
Теперь, если мы прочтём что-нибудь из longEar, и оно будет отсутствовать,
JavaScript будет искать его в bunny, а затем в beast.

Есть только два ограничения:

- cсылки не могут идти по кругу. JavaScript выдаст ошибку,
если мы попытаемся назначить __proto__ по кругу

- значение __proto__ может быть объектом или null. Другие типы игнорируются

Это вполне очевидно, но всё же: может быть только один [[Prototype]].
Объект не может наследоваться от двух других объектов

Если в longEar будет иметь собственный walk, то вызовется этот метод, а не метод
walk объекта beast
*/

/* 
Свойство __proto__ — не то же самое, что внутреннее свойство [[Prototype]].
Это геттер/сеттер для [[Prototype]]. 

Вместо __proto__ можно использовать Object.getPrototypeOf / Object.setPrototypeOf
*/

//_ Значение this

/* 
Неважно, где находится метод: в объекте или его прототипе. При вызове метода this —
это всегда объект перед точкой.

У нас может быть большой объект со множеством методов, от которого можно наследовать.
Наследующие объекты при вызове этих методов будут изменять своё состояние,
а не состояние объекта-родителя (прототипа).

Поэтому, когда мы записываем данные в this, они сохраняются в наследуемых объектах,
а не в прототипе, содержащем эти методы.
*/

let animalObj = {
  walk() {
    if (!this.isSleeping) {
      alert(`I walk`);
    }
  },
  sleep() {
    this.isSleeping = true;
  },
};

let rabbitObj = {
  name: 'White Rabbit',
  __proto__: animalObj,
};

// модифицирует rabbitObj.isSleeping
rabbitObj.sleep();

alert(rabbitObj.isSleeping); // true
alert(animalObj.isSleeping); // undefined (нет такого свойства в прототипе)

/* 
Свойства-аксессоры работают как методы. Записывая/получая значение используя сеттеры/геттеры
фактически мы их вызываем.

В следующем примере свойства-аксессоры находятся в прототипе прототипа объекта longEar_obj
(в объекте animal_obj). Они и будут вызываться для изменения/получения значения свойства id
у longEar_obj:
*/

let animal_obj = {
  id: 1,

  set idVal(val) {
    this.id = val;
  },
  get idVal() {
    return this.id;
  },
};

let rabbit_obj = {
  id: 2,
  __proto__: animal_obj,
};

let longEar_obj = {
  id: 3,
  __proto__: rabbit_obj,
};

longEar_obj.idVal = 5;
alert(longEar_obj.idVal); // 5

/* 
Важно: если у объекта есть сеттер, то у него же должен быть геттер,
чтобы все работало корректно.
(работает и в обратную сторону: если есть геттер должен быть и сеттер)

В следующем примере у animal_object есть сеттер и геттер, у rabbit_object есть лишь сеттер.
При изменении id у longEar_object сработает сеттер rabbit_object, но при попытке получить id
вернется undefined.

Таким образом, геттер не будет искаться дальше у animal_object:
*/

let animal_object = {
  id: 1,
  set idVal(val) {
    alert('animal setter');
    this.id = val;
  },
  get idVal() {
    alert('animal getter');
    return this.id;
  },
};

let rabbit_object = {
  id: 2,
  __proto__: animal_object,
  set idVal(val) {
    alert('rabbit setter');
    this.id = val;
  },
  // геттер отстутвует
};

let longEar_object = {
  id: 3,
  __proto__: rabbit_object,
};

longEar_object.idVal = 5; // 'rabbit setter'
alert(longEar_object.idVal); // undefined

//_ Цикл for…in

// Цикл for..in проходит не только по собственным, но и по унаследованным свойствам объекта
// (если у этих свойств флаг enumerable === true):

let beastObj = { eats: true };

let bunnyObj = {
  jumps: true,
  __proto__: beastObj,
};

for (let prop in bunnyObj) alert(prop); // 'jumps', затем 'eats'

/*
Если унаследованные свойства нам не нужны, то мы можем отфильтровать их при помощи
встроенного метода obj.hasOwnProperty(key): он возвращает true, если у obj есть собственное,
не унаследованное, свойство с именем key:
*/

let beast_obj = { eats: true };

let bunny_obj = {
  jumps: true,
  __proto__: beast_obj,
};

for (let prop in bunny_obj) {
  let isOwn = bunny_obj.hasOwnProperty(prop);

  if (isOwn) {
    alert(`Our: ${prop}`); // 'Our: jumps'
  } else {
    alert(`Inherited: ${prop}`); // 'Inherited: eats'
  }
}

/*
В этом примере цепочка наследования выглядит так: bunny_obj наследует от beast_obj,
который наследует от Object.prototype (так как beast_obj – литеральный объект {...},
то это по умолчанию), а затем null на самом верху.

Откуда взялся метод bunny_obj.hasOwnProperty? Если посмотреть на цепочку наследования,
то он берется из Object.prototype.hasOwnProperty. То есть он унаследован.

…Но почему hasOwnProperty не появляется в цикле for..in в отличие от eats и jumps?
Он ведь перечисляет все унаследованные свойства.

Ответ простой: оно не перечислимо. То есть у него внутренний флаг enumerable стоит false,
как и у других свойств Object.prototype. Поэтому оно и не появляется в цикле.
*/

/* 
Почти все остальные методы, получающие ключи/значения, такие как Object.keys,
Object.values и другие – игнорируют унаследованные свойства.

Они учитывают только свойства самого объекта, не его прототипа.
*/

alert(Object.keys(bunny_obj)); // [ 'jumps' ]

// * итого

/*
- в JS все объекты имеют скрытое свойство [[Prototype]], которое является
либо другим объектом, либо null.

- мы можем использовать obj.__proto__ для доступа к нему (исторически обусловленный
геттер/сеттер, есть другие способы, которые скоро будут рассмотрены).

- объект, на который ссылается [[Prototype]], называется «прототипом».

- если мы хотим прочитать свойство obj или вызвать метод, которого не существует у obj,
тогда JS попытается найти его в прототипе.

- операции записи/удаления работают непосредственно с объектом, они не используют прототип
(если это обычное свойство, а не сеттер).

- если мы вызываем obj.method(), а метод при этом взят из прототипа, то this всё равно ссылается на obj.
Таким образом, методы всегда работают с текущим объектом, даже если они наследуются.

- цикл for..in перебирает как свои, так и унаследованные свойства.
Остальные методы получения ключей/значений работают только с собственными свойствами объекта.
*/
