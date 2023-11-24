

function add (a, b){

  return a + b
}





















/**
 * 数字运算（主要用于小数点精度问题）
 * [see](https://juejin.im/post/6844904066418491406#heading-12)
 * @param {number} a 前面的值
 * @param {"+"|"-"|"*"|"/"} type 计算方式
 * @param {number} b 后面的值
 * @example 
 * ```js
 * // 可链式调用
 * const res = computeNumber(1.3, "-", 1.2).next("+", 1.5).next("*", 2.3).next("/", 0.2).result;
 * console.log(res);
 * ```
 */
function computeNumber(a, type, b) {
  /**
   * 获取数字小数点的长度
   * @param {number} n 数字
   */
  function getDecimalLength(n) {
    const decimal = n.toString().split(".")[1];
    return decimal ? decimal.length : 0;
  }
  /**
   * 修正小数点
   * @description 防止出现 `33.33333*100000 = 3333332.9999999995` && `33.33*10 = 333.29999999999995` 这类情况做的处理
   * @param {number} n
   */
  const amend = (n, precision = 15) => parseFloat(Number(n).toPrecision(precision));
  const power = Math.pow(10, Math.max(getDecimalLength(a), getDecimalLength(b)));
  let result = 0;

  a = amend(a * power);
  b = amend(b * power);

  console.log(a, b)

  switch (type) {
    case "+":
      result = (a + b) / power;
      break;
    case "-":
      result = (a - b) / power;
      break;
    case "*":
      result = (a * b) / (power * power);
      break;
    case "/":
      result = a / b;
      break;
  }

  result = amend(result);

  return {
    /** 计算结果 */
    result,
    /**
     * 继续计算
     * @param {"+"|"-"|"*"|"/"} nextType 继续计算方式
     * @param {number} nextValue 继续计算的值
     */
    next(nextType, nextValue) {
      return computeNumber(result, nextType, nextValue);
    }
  }
}


const getNumber = () => {
  const len = Math.random() * 10;
  const num = Number((Math.random() * 10).toFixed(len))
  return num
}
const a = getNumber();
const b = getNumber();


const getPower = (a, b) => {
  // 获取a,b小数位长度，如没有小数位则默认值为0
  const aLen = a.toString().split(".")[1]?.length || 0;
  const bLen = b.toString().split(".")[1]?.length || 0;
  // 获取最大长度
  const len = Math.max(aLen, bLen);
  // 计算返回放大倍数
  return Math.pow(10, len)
}

const power = getPower(a, b);
console.log(a, b, power);

