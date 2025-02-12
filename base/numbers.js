// * Число (number)

// Могут быть целочисленными или с плавающей точкой

let n = 123;
n = 12.345;

//_ Специальные числовые значения чисел:

//` Infinity - бесконечность; -Infinity - отриц. беск

alert(1 / 0); // Infinity
alert(Infinity); // Infinity

//` NaN - вычислительная ошибка
alert('не число' / 2); // NaN

//_ Способы записи числа

let billion = 1e9; // 1 миллиард, буквально: 1 и 9 нулей
alert(7.3e9); // 7.3 миллиардов (7,300,000,000)
let ms = 1e-6; // шесть нулей, слева от 1

billion = 1_000_000; // допустима запись через нижнее подчёркивание

//_ Округление

//` Math.round - округление до ближайшего целого числа
/*
3.1 => 3, 3.6 => 4, -1.1 => -1 */

//` Math.ceil - округление в большую сторону
//` Math.floor - округление в меньшую сторону

//` Math.trunc - удаление дробной части без округления

/*
Для округления чисел до десятой, сотой и тд частей существуют
два метода:*/

// 1.(Рекомендуется). Умножить и разделить:

let num = 1.23456;
alert(Math.floor(num * 100) / 100); // 1.23456 -> 123.456 -> 123 -> 1.23

// 2. Метод toFixed - округляет число до n знаков после запятой
// анологично Math.round:

let number = 12.36;
alert(number.toFixed(1)); // "12.4"
/*
Результатом этого метода будет строка:*/

//_ Другие математические функции

//` Math.random()
/*
Возвращает псевдослучайное число в диапозоне x = [0; 1). */
alert(Math.random()); // 0.1234567894322

//` Math.max(a,b,c...) / Math.min(a,b,c...)
/*
Возвращает наибольшее/наименьшее число из перечисленных аргументов. */
alert(Math.max(3, 5, -10, 0, 1)); // 5
alert(Math.min(1, 2)); // 1

//` Math.pow(n, power)
/*
Возвращает число n, возведённое в степень power */
alert(Math.pow(2, 10)); // 2 в степени 10 = 1024

//_ Неточные вычисления

/*
Число хранится в бинарной форме и числа, такие как 0.1 и 0.2
являются бесконечными дробями, как число 0.3 в десятичной.
0.5 - не бесконечная, тк 0.5 = 1/2. (деление на 2 не создает беск. дроби)
*/
alert(0.1 + 0.2); // 0.30000000000000004

//_ Получение чисел из строк

//` parseInt и parseFloat
/*
Они выводят цифры из строки, пока не дойдут до символов.
ParseInt возвращает целое число, parseFloat - дробное
*/
alert(parseInt('100px')); // 100
alert(parseFloat('12.5em')); // 12.5

alert(parseInt('12.3')); // 12, вернётся только целая часть
alert(parseFloat('12.3.4')); // 12.3, произойдёт остановка чтения на второй точке

/*
Функции parseInt/parseFloat вернут NaN, если не смогли
прочитать ни одну цифру
*/
alert(parseInt('a123')); // NaN

//_ Проверка числа на NaN и Infinity

//` isNaN(value)
/* 
Преобразует значение в число и проверяет является ли оно NaN
*/
alert(isNaN(NaN)); // true
alert(isNaN('str')); // true

/*
Значение NaN уникально тем, что оно не является равным ничему другому, даже самому себе
Нельзя проверить число на NaN просто приравняв ему, тк NaN не равняется другому NaN).
*/

//` isFinite(value)
/*
Используется для проверки, содержится ли в строке число.
Если value - обычное число, возваращает true

Преобразует аргумент в число и возвращает true, если оно является обычным числом,
т.е. не NaN/Infinity/-Infinity
*/
alert(isFinite('15')); // true
alert(isFinite('')); // true, тк "" => 0
alert(isFinite('str')); // false, потому что специальное значение: NaN
alert(isFinite(Infinity)); // false, потому что специальное значение: Infinity

//` Методы Number.isNaN и Number.isFinite
/* 
Это более «строгие» версии функций isNaN и isFinite.
Они не преобразуют аргумент в число, а наоборот – первым делом проверяют,
является ли аргумент числом (принадлежит ли он к типу number).
*/

alert(Number.isNaN('str')); // false, так как "str" является строкой, а не числом
alert(isNaN('str')); // true, так как isNaN сначала преобразует строку "str" в число и в результате преобразования получает NaN

alert(Number.isFinite('123')); // false, так как "123" является строкой, а не числом
alert(isFinite('123')); // true, так как isFinite сначала преобразует строку "123" в число 123

// Дополнительно

//_ Сравнение Object.is
/* 
Существует специальный метод Object.is, который сравнивает значения примерно как ===,
но более надёжен в двух особых ситуациях:

Работает с NaN: Object.is(NaN, NaN) === true, здесь он хорош.
Значения 0 и -0 разные: Object.is(0, -0) === false, это редко используется,
но технически эти значения разные.

Во всех других случаях Object.is(a, b) идентичен a === b.
*/

//_ Запись числа в 2-м, 8-м и 16-м системе счисления

alert(0xff); // 255
alert(0xff); // 255 (то же самое, регистр не имеет значения)

let a = 0b11111111; // бинарная форма записи числа 255
let b = 0o377; // восьмеричная форма записи числа 255

alert(a == b); // true, с двух сторон число 255

/*
Для других систем счисления можно использовать parseInt
*/

//` Метод num.toString(base)
/*
Конвертирует десятичное число в выбранную систему счисления.
(base) - система счисления, может быть от 2 до 36 (по умолч. 10)
*/

let someNum = 255;
alert(someNum.toString(16)); // 'ff'
alert(someNum.toString(2)); // '11111111'

alert((123456).toString(36)); // '2n9c'
alert((123456).toString(36)); // '2n9c'

//` Метод parseInt(str, base)
/*
Преобразует строку в целое число в соответствии с указанной системой
счисления: 2 ≤ base ≤ 36
*/
alert(parseInt('0xff', 16)); // 255
alert(parseInt('ff', 16)); // 255, без 0x тоже работает
alert(parseInt('2n9c', 36)); // 123456

// * Итого:
/*
Чтобы писать числа с большим количеством нулей используйте краткую форму записи чисел – "e"

Можно возвращаnь число внутри строки при помощи parseInt и parseFloat.

Можно округлять числа и производить другие математические операции
при помощи Math.
Также можно округлить число с помощью метода toFixed, которая возвратит строку.

Для проверки на NaN и Infinity используйте isNaN(value), Number.isNaN(value),
isFinite(value), Number.isFinite(value)

Для сравнения NaN с NaN используйте Object.is

Можно преобразовывать числа из 10й системы счисления в другие при
помощи метода num.toString(base).

Можно преобразовать число в произвольной системе счисления, содержащийся в виде строки,
в целое число в 10й системе с помощью метода parseInt(str, base).

Документация объекта Math:
https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math
*/
