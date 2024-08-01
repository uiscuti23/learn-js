//* Циклы

/*
Циклы предусмотрены для многократного выполнения
одного и того же участка кода, если заданное условие истинно
*/

/* 
В JavaScript существуют циклы:
- while и do..while
- for(;;)
- for…in
- for…of
*/

//_ Цикл «while»

while (condition) {
  // код
  // также называемый "телом цикла"
}

/* 
Код из тела цикла выполняется, пока условие condition истинно.
Цикл ниже выводит c, пока c < 3:
*/

let c = 0;

while (c < 3) {
  alert(c); // выводит 0, затем 1, затем 2
  c += 1; // можно записать как: c++
}

/* 
Одно выполнение тела цикла называется итерацией. Цикл в примере выше совершает три итераций.

Если бы строка c += 1 отсутствовала в примере выше, то цикл бы повторялся (в теории) вечно.
На практике, конечно, браузер не позволит такому случиться
*/

/* 
Любое выражение или переменная может быть условием цикла, а не только сравнение:
условие while вычисляется и преобразуется в логическое значение.

Например, while (j) – более краткий вариант while (j != 0):
*/

let j = 3;

while (j) {
  // когда j будет равно 0, условие станет ложным, и цикл остановится
  alert(j);
  j -= 1; // можно записать как: j--
}

//_ Цикл «do..while»
/*
Если мы хотим, чтобы тело цикла выполнилось хотя бы один раз,
даже если условие окажется ложным, используем цикл do...while
*/

do {
  // тело цикла
} while (condition);

/* 
Цикл сначала выполнит тело, а затем проверит условие condition,
и пока его значение равно true, он будет выполняться снова и снова.
*/

let k = 0;

do {
  alert(k);
  k += 1;
} while (k > 3);

//_ Цикл «for»

/* 
for (Начало; Условие; Шаг) {
	.. тело цикла ...
}
*/

for (let i = 0; i < 3; i++) {
  // выведет 0, затем 1, затем 2
  alert(i);
}

/*
Конструкция for:

начало		| let i = 0		| выполняется один раз при входе в цикл
условие		| i < 3				| проверяется перед каждой итерацией цикла, если оно вычислится в false, цикл остановится
тело			| alert(i)		| выполняется снова и снова, пока условие вычисляется в true
шаг				| i++					| выполняется после тела цикла на каждой итерации перед проверкой условия
*/

/* 
Алгоритм работы цикла for:

Выполнить начало
→ (Если условие == true → Выполнить тело, Выполнить шаг)
→ (Если условие == true → Выполнить тело, Выполнить шаг)
→ ...
*/

// «Встроенное» объявление переменной
/* 
В примере переменная счётчика i была объявлена прямо в цикле.
Такие переменные существуют только внутри цикла.

Для того, чтобы работать с переменной за пределами цикла, можно его объявить раньше:
*/

let count = 0; // значение может быть и не присвоено (undefined)

for (count = 0; count < 3; count++) {
  alert(count); // 0, 1, 2
}

alert(count); // 3, переменная доступна, т.к. была объявлена снаружи цикла

// Пропуск частей «for»
/*
Любая часть внутри круглых скобок цикла for может быть пропущена.
*/

// Пропуск начала:

let n = 0; // мы уже имеем объявленную n с присвоенным значением

for (; n < 3; n++) {
  // нет необходимости в "начале"
  alert(n); // 0, 1, 2
}

// Убираем шаг:

let num = 0;

for (; num < 3; ) {
  alert(num++);
}

/*
убираем всё, получая бесконечный цикл:

for (;;) {
  // будет выполняться вечно
}

Точки с запятой ; в условии обязательно должны присутствовать
*/

//_ Прерывание цикла: «break»

/*
Цикл будет работать, пока условие не вернёт false.
Но мы можем выйти из цикла в любой момент с помощью специальной директивы break.

Директива break полностью прекращает выполнение цикла
*/

let sum = 0;

while (true) {
  let value = +prompt('Введите число', '');

  if (!value) break; // (*)
  sum += value;
}

alert('Сумма: ' + sum); // 'Сумма: ...'

/*
Директива break в строке (*) полностью прекращает выполнение цикла
*/

//_ Переход к следующей итерации: continue

/*
В процессе выполнения цикла можно досрочно прервать выполнение части тела цикла
и перескочить сразу на следующую итерацию.

При выполнении continue цикл не прерывается,
а переходит к следующей итерации (если условие все ещё равно true).
*/

for (let i = 0; i < 10; i++) {
  if (i % 2 == 0) continue; // если true, пропустить оставшуюся часть тела цикла

  alert(i); // 1, затем 3, 5, 7, 9
}

// Тот же код, только без использования continue:

for (let i = 0; i < 10; i++) {
  if (i % 2) {
    alert(i);
  }
}

/*
Нельзя использовать break/continue справа от оператора „?“.
continue здесь приведёт к ошибке:

(i > 5) ? alert(i) : continue
*/

//_ Метки для break/continue

/* 
Вы можете использовать метки для обозначения циклов,
чтобы затем при помощи break или continue выходить из цикла
или продолжать его работу с новой итерации соответственно.

Метка имеет вид идентификатора с двоеточием перед циклом:

labelName: for (...) {
  ...
}
*/

// Пример с break

outer: for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    let input = prompt(`Значение на координатах (${i},${j})`, '');

    if (!input) break outer; // если пустая строка или Отмена, то выйти из обоих циклов

    // сделать что-нибудь со значениями...
  }
}

// Пример с continue

let i = 0;

loop1: while (i < 3) {
  i += 1;

  let j = 0;
  while (j < 3) {
    j += 1;

    if (j == 2 || i == 2) continue loop1;
    alert(`i: ${i}, j: ${j}`);
  }
}

/* 
Метки не позволяют «прыгнуть» куда угодно, то есть не дают возможности
передавать управление в произвольное место кода.

Нет возможности сделать следующее:

break label; // не прыгает к метке ниже

label: for (...) {
	// ...
}

Директива break должна находиться внутри блока кода:

label: {
  // ...
  break label; // работает
  // ...
}

*/

// Дополнительно

/* 
Следующие циклы будут рассматриваться в темах "объекты" и "массивы",
для полноты картины информацию о них размещу здесь тоже.

- "for..in" используется для перебора свойств объекта
- "for..of" для перебора элементов массива и перебираемых (итерируемых) объектов
*/

//_ Цикл "for..in"

for (let key in object) {
  // тело цикла выполняется для каждого свойства объекта
}

let user = {
  name: 'John',
  age: 30,
  isAdmin: true,
};

for (let key in user) {
  alert(key); // 'name', 'age', 'isAdmin'
  alert(user[key]); // 'John', 30, true
}

//_ Цикл "for..of"

for (let elem of array) {
  // тело цикла выполняется для каждого элемента массива
}

let fruits = ['Яблоко', 'Апельсин', 'Слива'];

for (let fruit of fruits) {
  alert(fruit); // 'Яблоко', 'Апельсин', 'Слива'
}

/*
Цикл for..of не предоставляет доступа к номеру текущего элемента
*/

/*
Т.к массив является объектом, можно использовать вариант for..in,
но этот способ выполняет перебор всех свойств объекта, а не только цифровых.

Также цикл for..in оптимизирован под произвольные объекты, не на массивы,
и поэтому в 10-100 раз медленнее
*/

//* Итого
/* 
Мы рассмотрели все виды циклов:

while и for (;;) проверяет условие перед каждой итерацией.
do..while – проверяет условие после каждой итерации.

while (true) организует бесконечный цикл.

Любой цикл может быть прерван директивой break.

Если на данной итерации цикла делать больше ничего не надо,
но полностью прекращать цикл не следует – используют директиву continue.

break/continue поддерживают метки, позволяющие выйти за пределы текущего цикла,
повлиять на выполнение внешнего. Метки ставятся перед циклом.

Заметим, что метки не позволяют прыгнуть в произвольное место кода,
в JavaScript нет такой возможности.

Для перебора свойств объекта используем цикл "for..in".
Для перебора элементов массива и перебираемых (итерируемых) объектов - цикл "for..of"
*/
