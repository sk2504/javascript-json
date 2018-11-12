class Stack {
  constructor() {
    this.list = [];
    this.endCount = -1;
  }
};
function reducer(acc, cur) {
  arg = [acc, cur];
  return checkNumOrStr(...arg) || checkArray(...arg) || checkEnd(...arg) || acc;
};
function checkNumOrStr(acc, cur) {
  if (cur.type !== 'array' && cur !== ']') {
    acc.child.push(cur);
    return acc;
  }
  return false;
};
function checkArray(acc, cur) {
  if (cur.type === 'array') {
    stack.list.push(acc);
    stack.endCount++;
    acc = cur;
    return acc;
  }
  return false;
};
function checkEnd(acc, cur) {
  if (cur === ']' && stack.endCount !== 0) {
    stack.list[stack.endCount].child.push(acc);
    acc = stack.list[stack.endCount];
    stack.endCount--;
    return acc;
  }
  return false;
};
function arrayParser(str) {
  let tokenArray = lexer(tokenize, str);
  let result = tokenArray.reduce(reducer, tokenArray[0]);
  return result;
};
function lexer(fn, str) {
  let tokenArray = fn(str);
  let lexerResult = tokenArray.map(mapper);
  return lexerResult;
};
function mapper(value) {
  let conversionValue = value.match(/[^\s]\w*'|[^\s]\w*/)[0]
  if (conversionValue === '[') return { type: 'array', value: 'ArrayObject', child: [] };
  if (Number(conversionValue)) return { type: 'number', value: `${conversionValue}`, child: [] };
  if (conversionValue === 'null') return { type: 'Null', value: `${conversionValue}`, child: [] };
  if (conversionValue === 'true' || conversionValue === 'false') return { type: 'Boolean', value: `${conversionValue}`, child: [] };
  if (typeof conversionValue === 'string' && conversionValue !== ']') return { type: 'string', value: `${conversionValue}`, child: [] };
  return conversionValue;
}
function tokenize(str) {
  let result = each(str, checkToken);
  return result;
};
function each(str, iter) {
  let result = [];
  let number;
  for (i = 0; i < str.length; i++) {
    number = iter(str, result, number);
  }
  return result;
};
function checkToken(str, result, number) {
  if (number === undefined) number = '';
  if (str[i] === ']' && str[i - 1] !== ']') result.push(number);
  if (str[i].match(/\[|\]/)) result.push(`${str[i]}`);
  if (str[i].match(/[^\[\],]/)) number += str[i];
  if (str[i] === ',') {
    if (str[i - 1] === ']') {
      number = '';
    } else {
      result.push(number);
      number = '';
    }
  };
  return number;
};

let str = "['1a3',[null, false, ['11', [[null,[false]]], 112],55, '99'],33,true]";
let stack = new Stack;
let result = arrayParser(str);
console.log(JSON.stringify(result, null, 2));
