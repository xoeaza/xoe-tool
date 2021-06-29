interface ClickEventArgtype {
  selector: string,
  innerText: string,
  compile: Function,
  btnClsName?: string,
  btnText?: string
}

export function addBtnAndEvent({
  selector,
  innerText,
  compile,
  btnClsName,
  btnText
}: ClickEventArgtype) {
  let doms = document.querySelectorAll(selector)
    if (doms) {
      let boxEle: Element = Array.from(doms).find(d => d.innerHTML.indexOf(innerText) > -1)
      if (boxEle) {
        // 添加新 btn
        let btnEle = boxEle.querySelector(`.${btnClsName}`)
        if (!btnEle) {
          let newBtnEle = document.createElement('button')
          newBtnEle.classList.add(btnClsName, 'ant-btn', 'btn-filter', 'ant-btn-primary')
          newBtnEle.style.marginLeft = '10px'
          newBtnEle.innerText = btnText
          newBtnEle.addEventListener('click', (e) => {
            compile()
          })
          boxEle.appendChild(newBtnEle)
        }
      }
    }
}

// 复制到剪贴板
export function copyToClip(text) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text).then(function() {
    Toast({
      msg: '复制成功'
    })
  }, function(err) {
    console.error(err)
    Toast({
      msg: '复制失败',
      type: 'error',
    })
  });
}

function fallbackCopyTextToClipboard(text) {
  var textArea = document.createElement("textarea");
  textArea.value = text;
  
  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    Toast({
      msg: '复制成功'
    })
  } catch (err) {
    console.error(err)
    Toast({
      msg: '复制失败',
      type: 'error',
    })
  }

  document.body.removeChild(textArea);
}


// 弹窗
interface ToastType {
  msg: string,
  duration?: number,
  type?: 'info' | 'error'
}

export function Toast({
  msg,
  duration = 1000,
  type = 'info'
}: ToastType) {
	var m = document.createElement('div');
	m.innerHTML = msg;
	m.style.cssText = "font-family:siyuan;max-width:60%;min-width: 150px;padding:0 14px;height: 40px;color: rgb(255, 255, 255);line-height: 40px;text-align: center;border-radius: 4px;position: fixed;top: 20%;left: 50%;transform: translate(-50%, -50%);z-index: 999999;background: rgba(0, 0, 0,.7);font-size: 16px;";
	document.body.appendChild(m);
	setTimeout(function() {
		var d = 0.5;
		m.style.transition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
		m.style.opacity = '0';
		setTimeout(function() {
			document.body.removeChild(m)
		}, d * 1000);
	}, duration);
}