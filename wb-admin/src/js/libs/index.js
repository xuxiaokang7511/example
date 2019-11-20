import { isObject, isArray, isBoolean } from './validate'

/**
 * 节流
 * @param {*} fn
 */
export function rafThrottle(fn) {
  let locked = false
  return function(...args) {
    if (locked) return
    locked = true
    window.requestAnimationFrame(_ => {
      fn.apply(this, args)
      locked = false
    })
  }
}

/**
 * 节流
 * @param {*} fn
 */
export function throttle(func, wait = 16.7, options) {
  var context, args, result
  var timeout = null
  var previous = 0
  if (!options) options = {}
  var later = function() {
    previous = options.leading === false ? 0 : +new Date()
    timeout = null
    result = func.apply(context, args)
    if (!timeout) context = args = null
  }
  return function() {
    var now = +new Date()
    if (!previous && options.leading === false) previous = now
    var remaining = wait - (now - previous)
    context = this
    args = arguments
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      result = func.apply(context, args)
      if (!timeout) context = args = null
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining)
    }
    return result
  }
}

/**
 * 防抖
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
  var timeout, args, context, timestamp, result

  var later = function() {
    // 据上一次触发时间间隔
    var last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function() {
    context = this
    args = arguments
    timestamp = +new Date()
    var callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

// #region 深度克隆

// #region 常量

// 可继续遍历的数据类型
const mapTag = '[object Map]'
const setTag = '[object Set]'
const arrayTag = '[object Array]'
const objectTag = '[object Object]'
const argsTag = '[object Arguments]'

// 不可连续遍历的数据类型
const boolTag = '[object Boolean]'
const dateTag = '[object Date]'
const numberTag = '[object Number]'
const stringTag = '[object String]'
const symbolTag = '[object Symbol]'
const errorTag = '[object Error]'
const regexpTag = '[object RegExp]'
const funcTag = '[object Function]'

const deepTag = [mapTag, setTag, arrayTag, objectTag, argsTag]

// #endregion

// #region 工具函数

/**
 * 通用while循环
 * @param {*} array
 * @param {*} iteratee
 */
function forEach(array, iteratee) {
  let index = -1
  const length = array.length
  while (++index < length) {
    iteratee(array[index], index)
  }
  return array
}

/**
 * 获取实际类型
 * @param {*} target
 */
function getType(target) {
  return Object.prototype.toString.call(target)
}

/**
 * 初始化被克隆的对象
 * @param {*} target
 */
function getInit(target) {
  const Ctor = target.constructor
  return new Ctor()
}

/**
 * 克隆Symbol
 * @param {Symbol} targe
 */
function cloneSymbol(targe) {
  return Object(Symbol.prototype.valueOf.call(targe))
}

/**
 * 克隆正则
 * @param {RegExp} targe
 */
function cloneReg(targe) {
  const reFlags = /\w*$/
  const result = new targe.constructor(targe.source, reFlags.exec(targe))
  result.lastIndex = targe.lastIndex
  return result
}

/**
 * 克隆函数
 * @param {Function} func
 */
function cloneFunction(func) {
  // const bodyReg = /(?<={)(.|\n)+(?=})/m
  // const paramReg = /(?<=\().+(?=\)\s+{)/
  const funcString = func.toString()
  // if (func.prototype) {
  //   const param = paramReg.exec(funcString)
  //   const body = bodyReg.exec(funcString)
  //   if (body) {
  //     if (param) {
  //       const paramArr = param[0].split(',')
  //       return new Function(...paramArr, body[0])
  //     } else {
  //       return new Function(body[0])
  //     }
  //   } else {
  //     return null
  //   }
  // } else {
  //   return eval(funcString)
  // }
  return eval(funcString)
}

/**
 * 克隆不可遍历类型
 * @param {*} targe
 * @param {*} type
 */
function cloneOtherType(targe, type) {
  const Ctor = targe.constructor
  switch (type) {
    case boolTag:
    case numberTag:
    case stringTag:
    case errorTag:
    case dateTag:
      return new Ctor(targe)
    case regexpTag:
      return cloneReg(targe)
    case symbolTag:
      return cloneSymbol(targe)
    case funcTag:
      return cloneFunction(targe)
    default:
      return null
  }
}

// #endregion

export function clone(target, map = new WeakMap()) {
  /**
   * 判断是否为引用类型
   * @param {*} target
   */
  const _isObject = function(target) {
    const type = typeof target
    return target !== null && (type === 'object' || type === 'function')
  }
  // 克隆原始类型
  if (!_isObject(target)) {
    return target
  }

  // 初始化
  const type = getType(target)
  let cloneTarget
  if (deepTag.includes(type)) {
    cloneTarget = getInit(target, type)
  } else {
    return cloneOtherType(target, type)
  }

  // 防止循环引用
  if (map.get(target)) {
    return map.get(target)
  }
  map.set(target, cloneTarget)

  // 克隆set
  if (type === setTag) {
    target.forEach(value => {
      cloneTarget.add(clone(value, map))
    })
    return cloneTarget
  }

  // 克隆map
  if (type === mapTag) {
    target.forEach((value, key) => {
      cloneTarget.set(key, clone(value, map))
    })
    return cloneTarget
  }

  // 克隆对象和数组
  const keys = type === arrayTag ? undefined : Object.keys(target)
  forEach(keys || target, (value, key) => {
    if (keys) {
      key = value
    }
    cloneTarget[key] = clone(target[key], map)
  })

  return cloneTarget
}

// #endregion

// #region 深度对象拷贝

// #region 工具函数
function copy(val, key, deep) {
  if (key === '__proto__') {
    return
  }

  var obj = this[key]
  if (
    deep &&
    (isObject(obj) || isArray(obj)) &&
    (isObject(val) || isArray(val))
  ) {
    mix(true, obj, val)
  } else {
    this[key] = val
  }
}

function forIn(obj, fn, thisArg, deep) {
  for (var key in obj) {
    if (fn.call(thisArg, obj[key], key, deep) === false) {
      break
    }
  }
}
// #endregion

/**
 * 深度对象拷贝
 * @memberof $api
 * @param {boolean} [deep=false] 是否深度拷贝
 * @param {object} target 对象扩展。这将接收新的属性。
 * @param {...object} objects 一个或多个对象，合并到target
 * @returns {object} 返回 target
 * @example
 * // 多个对象拷贝
 * // {"title":"sss","obj":{"sub":"abc","test":"sub123"}}
 * mix(
 *  {
 *    title:'dd',
 *    obj:{sub:'abc',subtitle:'sub'}
 *  },
 *  {
 *    title:'sss',
 *    obj:{sub:'abc',test:'sub123'}
 *  }
 * )
 *
 * // 多个对象深度拷贝
 * // {"title":"sss","obj":{"sub":"abc","subtitle":"sub","test":"sub123"}}
 * mix(
 *  true,
 *  {
 *    title:'dd',
 *    id:123,
 *    obj:{sub:'abc',subtitle:'sub'}
 *  },
 *  {
 *    title:'sss',
 *    id1:123,
 *    obj:{sub:'abc',test:'sub123'}}
 * )
 *
 * // 多个数组拷贝
 * // [4,{"sub":"abc","test":"sub123"},3,5]
 * mix(
 *  [1,{sub:'abc',subtitle:'sub'},2,5],
 *  [4,{sub:'abc',test:'sub123'},3]
 * )
 *
 * // 多个数组深度拷贝
 * // [4,{"sub":"abc","subtitle":"sub","test":"sub123"},3,5]
 * mix(
 *  true,
 *  [1,{sub:'abc',subtitle:'sub'},2,5],
 *  [4,{sub:'abc',test:'sub123'},3]
 * )
 *
 * // 对象拷贝到数组中,合并后既是数组也是对象
 * var a= [1,1,2], b={title:'dd',id:123}
 * mix(a,b)
 * JSON.stringify(a)  // "[1,1,2]"
 * console.log(a)     // (3) [1, 1, 2, title: "dd", id: 123]
 * a.title            // "dd"
 * a.id               // 123
 *
 * // 数组拷贝到对象中,合并后还是对象
 * // {"0":1,"1":1,"2":2,"title":"dd","id":123}
 * mix({title:'dd',id:123},[1,1,2])
 */
export function mix(deep, target, objects) {
  if (deep === undefined) {
    deep = false
  }
  var len = arguments.length
  var i = 0
  var _deep = false
  if (isBoolean(deep)) {
    i++
    _deep = deep
  } else {
    target = deep
  }

  while (++i < len) {
    var obj = arguments[i]
    if (isObject(obj) || isArray(obj)) {
      forIn(obj, copy, target, _deep)
    }
  }
  return target
}

// #endregion

/**
 * @param {Array} arr
 * @returns {Array}
 */
export function uniqueArr(arr) {
  return Array.from(new Set(arr))
}
