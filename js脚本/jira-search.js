javascript: (function () {
  function search(name) {
    var t = document.getElementById('assignee')
    var found = false
    if (!t) return
    var ps = t.options
    var len = ps.length
    for (var i = 0; i < len; i++) {
      if (ps[i].text.indexOf(name) != -1) {
        ps[i].selected = true
        found = true
      }
    }
    return found
  }
  ;(function () {
    var name = prompt('%E5%86%99%E5%87%BAta%E7%9A%84%E5%90%8D%E5%AD%97,%E7%BB%99%E5%8A%9B%E7%9A%84%EF%BC%81')
    if (name === null) return
    if (name == '' || !search(name)) {
      alert('JIRA%E4%B8%8A%E6%B2%A1%E6%9C%89' + ((name ? name : 'TA') + '%E5%93%A6'))
      arguments.callee.call()
    }
  })()
})()
