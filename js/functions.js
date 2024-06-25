function getStringLength (string, number) {
  return(string.length <= number);
}

// Проверка фукнции getStringLength
getStringLength('проверяемая строка', 20);
getStringLength('проверяемая строка', 18);
getStringLength('проверяемая строка', 10);


function isPalindrom(string) {
  const firstString = string.replaceAll(' ','').toUpperCase();
  let secondString = '';
  for(let i = (firstString.length - 1); i >= 0; i --){
    secondString += firstString[i];
  }
  return secondString === firstString;
}

// Проверка фукнции isPalindrom
isPalindrom('топот');
isPalindrom('ДовОд');
isPalindrom('Кекс');
isPalindrom('Лёша на полке клопа нашёл ');

function getNumber(param) {
  let newNumber = '';
  const firstString = param.toString();

  for(let i = 0; i <= firstString.length; i++){
    const q = parseInt(firstString[i], 10);

    if (!Number.isNaN(q)){
      newNumber += q;
    }
  }
  return (newNumber === '' ? NaN : newNumber);
}
// Проверка фукнции getNumber
getNumber('2023 год');
getNumber('ECMAScript 2022');
getNumber('1 кефир, 0.5 батона');
getNumber('агент 007');
getNumber('а я томат');
getNumber(2023);
getNumber(-1);
getNumber(1.5);


