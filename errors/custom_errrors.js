//* Пользовательские ошибки, расширение класса Error

/* 
Когда что-то разрабатываем, то нам часто необходимы собственные классы ошибок
для разных вещей, которые могут пойти не так в наших задачах.

Для ошибок при работе с сетью может понадобиться HttpError,
для операций с базой данных DbError, для поиска – NotFoundError и т.д.

Наши ошибки должны поддерживать базовые свойства, такие как message, name и,
желательно, stack.

Но также они могут иметь свои собственные свойства. Например, объекты HttpError
могут иметь свойство statusCode со значениями 404, 403 или 500.
*/

/* 
JavaScript позволяет вызывать throw с любыми аргументами, то есть технически
наши классы ошибок не нуждаются в наследовании от Error.

Но если использовать наследование, то появляется возможность идентификации
объектов ошибок посредством obj instanceof Error. Так что лучше применять наследование.

По мере роста приложения, наши собственные ошибки образуют иерархию,
например, HttpTimeoutError может наследовать от HttpError и так далее.
*/

// Примерное представление встроенного класса Error:

class Error {
  constructor(message) {
    this.message = message;
    this.name = 'Error'; // (разные имена для разных встроенных классов ошибок)
    // this.stack = <стек вызовов>; // нестандартное свойство, но обычно поддерживается
  }
}

//_ Расширение Error

/* 
Напишем функцию readUser(json), которая должна читать и проверять данные
пользователя в формате JSON.

При получении некорректного json он будет генерировать ошибку SyntaxError.
Но даже если json синтаксически верен, в нем могут быть пропущены
(отсутствовать) необходимые данные.

Например, могут отсутствовать свойства name и age,
которые являются необходимыми для наших пользователей.

Назовём эту ошибку ошибкой валидации ValidationError и создадим для неё класс,
который будет наследовать от класса Error.
*/

class ValidationError extends Error {
  constructor(message) {
    super(message); // (1)
    this.name = 'ValidationError'; // (2)
  }
}

function test() {
  throw new ValidationError('Упс!');
}

try {
  test();
} catch (err) {
  alert(err.message); // 'Упс!'
  alert(err.name); // 'ValidationError'
  alert(err.stack); // список вложенных вызовов с номерами строк для каждого
}

/* 
В строке (1) вызываем родительский конструктор.

JavaScript требует от нас вызова super в дочернем конструкторе, так что это обязательно.
Родительский конструктор устанавливает свойство message.

Родительский конструктор также устанавливает свойство name для "Error",
поэтому в строке (2) мы сбрасываем его на правильное значение.

Реализация для readUser(json):
*/

function readUser(json) {
  let user = JSON.parse(json);

  if (!user.age) {
    throw new ValidationError('Нет поля: age');
  }
  if (!user.name) {
    throw new ValidationError('Нет поля: name');
  }

  return user;
}

// Рабочий пример с try..catch

let user;

try {
  user = readUser('{ "age": 25 }');
} catch (err) {
  if (err instanceof ValidationError) {
    alert('Некорректные данные: ' + err.message); // Некорректные данные: Нет поля: name
  } else if (err instanceof SyntaxError) {
    alert('JSON Ошибка Синтаксиса: ' + err.message);
  } else {
    throw err; // неизвестная ошибка, пробросить исключение (**)
  }
}

/* 
Для проверки типа ошибки используется оператор instanceof, хотя мы могли бы проверить тип
используя err.name: 

// ...
} else if (err.name == "SyntaxError") { // вместо (err instanceof SyntaxError)
// ...

Версия с instanceof гораздо лучше, потому что в будущем мы собираемся расширить
ValidationError, сделав его подтипы, такие как PropertyRequiredError.

И проверка instanceof продолжит работать для новых наследованных классов. 

Также важно, что если catch встречает неизвестную ошибку, то он пробрасывает её в строке (**).
Блок catch знает, только как обрабатывать ошибки валидации и синтаксические ошибки,
а другие виды ошибок он должен выпустить наружу.
*/

//_ Дальнейшее наследование

/* 
Класс ValidationError является слишком общим.

Поэтому для отсутствующих свойств сделаем более конкретный класс PropertyRequiredError.
Он будет нести дополнительную информацию о свойстве, которое отсутствует.
*/

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

class PropertyRequiredError extends ValidationError {
  constructor(property) {
    super('Нет свойства: ' + property);
    this.name = 'PropertyRequiredError';
    this.property = property;
  }
}

// Применение
function readUser(json) {
  let user = JSON.parse(json);

  if (!user.age) {
    throw new PropertyRequiredError('age');
  }
  if (!user.name) {
    throw new PropertyRequiredError('name');
  }

  return user;
}

// Рабочий пример с try..catch

try {
  let user = readUser('{ "age": 25 }');
} catch (err) {
  if (err instanceof ValidationError) {
    alert('Неверные данные: ' + err.message); // Неверные данные: Нет свойства: name
    alert(err.name); // PropertyRequiredError
    alert(err.property); // name
  } else if (err instanceof SyntaxError) {
    alert('Ошибка синтаксиса JSON: ' + err.message);
  } else {
    throw err; // неизвестная ошибка, повторно выбросит исключение
  }
}

/* 
Новый класс PropertyRequiredError очень просто использовать:
необходимо указать только имя свойства new PropertyRequiredError(property).

Сообщение для пользователя message генерируется конструктором.
*/

/* 
Обратите внимание, что свойство this.name в конструкторе PropertyRequiredError
снова присвоено вручную

Для того, чтобы указывать его автоматически, можно создать «базовый» класс ошибки,
который будет ставить this.name = this.constructor.name. И затем наследовать все ошибки уже от него
*/

class MyError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

class ValidationError extends MyError {}

class PropertyRequiredError extends ValidationError {
  constructor(property) {
    super('Нет свойства: ' + property);
    this.property = property;
  }
}

alert(new ValidationError('field').name); // PropertyRequiredError

//_ Обёртывание исключений

/* 
Для удобства обработки ошибок, возникащих при чтении json, можно создать общий класс ReadError,
экземпляр которого будет создаваться и пробрасываться при возникновении той или иной ошибки.

Теперь, нет необходимости проверять от какого класса наследуется объект ошибки (при помощи instanceof),
все обрабатываемые ошибки будут наследоваться от ReadError, который предоставит информацию о типе ошибки
*/

class ReadError extends Error {
  constructor(message, cause) {
    super(message);
    this.cause = cause;
    this.name = 'ReadError';
  }
}

class ValidationError extends Error {
  /*...*/
}
class PropertyRequiredError extends ValidationError {
  /* ... */
}

function validateUser(user) {
  if (!user.age) {
    throw new PropertyRequiredError('age');
  }

  if (!user.name) {
    throw new PropertyRequiredError('name');
  }
}

function readUser(json) {
  let user;

  try {
    user = JSON.parse(json);
  } catch (err) {
    if (err instanceof SyntaxError) {
      throw new ReadError('Синтаксическая ошибка', err);
    } else {
      throw err;
    }
  }

  try {
    validateUser(user);
  } catch (err) {
    if (err instanceof ValidationError) {
      throw new ReadError('Ошибка валидации', err);
    } else {
      throw err;
    }
  }
}

try {
  readUser('{bad json}');
} catch (e) {
  if (e instanceof ReadError) {
    alert(e);
    // Исходная ошибка: SyntaxError:Unexpected token b in JSON at position 1
    alert('Исходная ошибка: ' + e.cause);
  } else {
    throw e;
  }
}

/* 
Этот подход называется «обёртывание исключений», потому что мы берём «исключения низкого уровня»
и «оборачиваем» их в ReadError, который является более абстрактным и более удобным для использования
в вызывающем коде.
*/

// * Итог

/*
Мы можем наследовать свои классы ошибок от Error и других встроенных классов ошибок,
но нужно позаботиться о свойстве name и не забыть вызвать super.

Мы можем использовать instanceof для проверки типа ошибок. Это также работает с наследованием.
Но иногда у нас объект ошибки, возникшей в сторонней библиотеке, и нет простого способа получить класс.
Тогда для проверки типа ошибки можно использовать свойство name.

Обёртывание исключений является распространённой техникой: функция ловит низкоуровневые исключения
и создаёт одно «высокоуровневое» исключение вместо разных низкоуровневых.
Иногда низкоуровневые исключения становятся свойствами этого объекта, как err.cause в примерах выше,
но это не обязательно.
*/

// Дополнительно

// Немного улучшенная реализация кода выше:

class MyError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

class ValidationError extends MyError {}

class PropertyRequiredError extends ValidationError {
  constructor(property) {
    super('Нет свойства: ' + property);
    this.property = property;
  }
}

class ReadError extends MyError {
  constructor(message, cause) {
    super(message);
    this.cause = cause;
  }
}

function validateUser(user, props = []) {
  props.forEach(prop => {
    if (!user[prop]) {
      throw new PropertyRequiredError(prop);
    }
  });
}

function checkErr(cb, errClass, message) {
  try {
    cb();
  } catch (err) {
    if (err instanceof errClass) {
      throw new ReadError(message, err);
    } else {
      throw err;
    }
  }
}

function readUser(json) {
  let user;

  checkErr(() => (user = JSON.parse(json)), SyntaxError, 'Синтаксическая ошибка');
  checkErr(() => validateUser(user, ['name', 'age']), ValidationError, 'Ошибка валидации');
}

try {
  readUser('{ "name": "John"}');
} catch (e) {
  if (e instanceof ReadError) {
    console.log('Исходная ошибка: ' + e.cause);
  } else {
    throw e;
  }
}
