// lulu ui 文件引入地址https://github.com/yued-fe/lulu/blob/master/theme/pure/css/common/ui.css
//IE提示升级
;(function (w) {
  function isIE() {
    if (!!window.ActiveXObject || 'ActiveXObject' in window) return true
    else return false
  }
  if (isIE()) {
    var d = document.createElement('div')
    d.className = 'browsehappy'
    d.innerHTML =
      '<div class=ui-dialog-container style=display:block><div class="ui-dialog ui-dialog-auto"role=dialog tabindex=-1><div class=ui-dialog-body><div class=x-word>尊敬的投资人，当前披露页面不支持IE浏览器，您可以尝试使用chrome、firefox、edge浏览器，感谢！</div><div class=x-logos id=browserlist><div class=x-item><img src=/img/c.png><p>Chrome</div><div class=x-item><img src=/img/f.png><p>Firefox</div><div class=x-item><img src=/img/e.png><p>Edge</div></div></div></div></div>'
    var f = function () {
      var s = document.getElementsByTagName('body')[0]
      if ('undefined' == typeof s) {
        setTimeout(f, 10)
      } else {
        s.insertBefore(d, s.firstChild)
      }
    }
    f()
  }
})(window)
