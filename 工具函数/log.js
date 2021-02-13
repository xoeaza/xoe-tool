const log = {}


function typeColor (type = 'default') {
  let color = ''
  switch (type) {
    case 'default':
      color = '#303133'
      break
    case 'primary':
      color = '#409EFF'
      break
    case 'success':
      color = '#67C23A'
      break
    case 'warning':
      color = '#E6A23C'
      break
    case 'danger':
      color = '#F56C6C'
      break
    default:
      break
  }
  return color
}


log.capsule = function (title, info, type = 'primary') {
  console.log(
    `%c ${title} %c ${info} %c`,
    'background:#35495E; padding: 1px; border-radius: 3px 0 0 3px; color: #fff;',
    `background:${typeColor(
      type
    )}; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff;`,
    'background:transparent'
  )
}


log.colorful = function (textArr) {
  console.log(
    `%c${textArr.map(t => t.text || '').join('%c')}`,
    ...textArr.map(t => `color: ${typeColor(t.type)};`)
  )
}

log.default = function (text) {
  log.colorful([{ text }])
}

log.primary = function (text) {
  log.colorful([{ text, type: 'primary' }])
}

log.success = function (text) {
  log.colorful([{ text, type: 'success' }])
}

log.warning = function (text) {
  log.colorful([{ text, type: 'warning' }])
}

log.danger = function (text) {
  log.colorful([{ text, type: 'danger' }])
}

export default log