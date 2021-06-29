export function getInsterfaceName(path: string, suffix: string = '') {
  const arr = path.split('/')
  let name1 = arr[arr.length - 2]
  let name2 = arr[arr.length - 1]
  return upperFirstChar(name1) + upperFirstChar(name2) + suffix
}

function upperFirstChar(name: string) {
  return name.charAt(0).toUpperCase() + name.slice(1)
}

export function getInterfacePath() {
  const idMatch = window.location.href.match(/\/interface\/api\/(\d+)/)
  let id
  if (idMatch && idMatch.length >= 2) {
    id = idMatch[1]
  } else {
    alert('未匹配到id')
    throw new Error()
  }
  return `//***********/api/interface/get?id=${id}`
}