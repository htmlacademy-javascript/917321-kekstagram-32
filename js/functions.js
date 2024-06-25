function getStringLength (string, number) {
  return(string.length <= number)
}
/* Проверка фукнции getStringLength
console.log(getStringLength('проверяемая строка', 20))
console.log(getStringLength('проверяемая строка', 18))
console.log(getStringLength('проверяемая строка', 10))
*/

function isPalindrom(string){
let firstString = string.replaceAll(' ','').toUpperCase();
let secondString = '';
for(let i = (firstString.length - 1); i >= 0; i --){
secondString += firstString[i]
}
return secondString === firstString;
}
/* Проверка фукнции isPalindrom
console.log(isPalindrom('топот'));
console.log(isPalindrom('ДовОд'));
console.log(isPalindrom('Кекс'));
console.log(isPalindrom('Лёша на полке клопа нашёл '));
*/
function getNumber(param){
  let newNumber = '';
  let firstString = param.toString();

  for(let i = 0; i <= firstString.length; i++){
    let q = parseInt(firstString[i], 10);

    if (!Number.isNaN(q)){
      newNumber += q;
    }
  }
  return (newNumber === '' ? NaN : newNumber);
}
/* Проверка фукнции getNumber
console.log(getNumber('2023 год'));
console.log(getNumber('ECMAScript 2022'));
console.log(getNumber('1 кефир, 0.5 батона'));
console.log(getNumber('агент 007'));
console.log(getNumber('а я томат'));
console.log(getNumber(2023));
console.log(getNumber(-1));
console.log(getNumber(1.5));
*/

