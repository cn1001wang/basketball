export const showToast = function ({ type, message, duration = 2000 }) {
  duration = isNaN(duration) ? 2000 : duration // 动画延迟
  var m = document.createElement('div')
  m.className = 'van-popup van-popup--center van-toast van-toast--middle van-toast--success'
  let i = document.createElement('i')
  if (type === 'success') {
    i.className = 'van-badge__wrapper van-icon van-icon-success van-toast__icon'
    m.appendChild(i)
  } else if (type === 'fail') {
    i.className = 'van-badge__wrapper van-icon van-icon-fail van-toast__icon'
    m.appendChild(i)
  } else {
    m.classList.add('van-toast--text')
  }
  const span = document.createElement('span')
  span.className = 'van-toast__text'
  span.innerHTML = message
  m.appendChild(span)

  //   m.style.cssText = `min-width: 150px; padding: 10px;opacity: 0.7;color: rgb(255, 255, 255);text-align: center;
  //     border-radius: 5px;position: fixed;top: 50%;left: 50%;z-index: 999999;
  //     background: rgb(42, 168, 55);font-size: 12px;`
  document.body.appendChild(m)
  if (timer) {
    clearTimeout(timer)
  }
  var timer = setTimeout(function () {
    var d = 0.5
    m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in'
    m.style.opacity = '0'
    if (cssTimer) {
      clearTimeout(cssTimer)
    }
    var cssTimer = setTimeout(function () {
      document.body.removeChild(m)
    }, d * 1000)
  }, duration)
}
