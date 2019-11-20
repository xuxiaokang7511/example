/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = JSON.parse(val)
    return rs
  })
  return obj
}

/**
 * @param {Object} json
 * @returns {Array}
 */
export function param(json) {
  if (!json) return ''
  const cleanArray = function(actual) {
    const newArray = []
    for (let i = 0; i < actual.length; i++) {
      if (actual[i]) {
        newArray.push(actual[i])
      }
    }
    return newArray
  }
  return cleanArray(
    Object.keys(json).map(key => {
      if (json[key] === undefined) return ''
      return (
        encodeURIComponent(key) +
        '=' +
        encodeURIComponent(JSON.stringify(json[key]))
      )
    })
  ).join('&')
}
