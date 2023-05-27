const Clipboard = require('clipboard')
if (!Clipboard) {
  throw new Error('你还没有安装 clipboard')
}

export default {
  /**
   * 第一次绑定到元素时调用（初始化）
   * @param el 指令绑定到的元素。这可以用于直接操作 DOM。
   * @param binding 一个对象，包含以下属性.value：传递给指令的值。例如在 v-my-directive="1 + 1" 中，值是 2。
   *                arg：传递给指令的参数 (如果有的话)。例如在 v-my-directive:foo 中，参数是 "foo"。
   * @returns {string|*}
   */
  bind(el, binding) {
    console.log(el)
    console.log(binding)
    if (binding.arg === 'success') {
      el._v_clipboard_success = binding.value
    } else if (binding.arg === 'error') {
      el._v_clipboard_error = binding.value
    } else {
      const clipboard = new Clipboard(el, {
        text() {
          return binding.value
        },
        action() {
          return binding.arg === 'cut' ? 'cut' : 'copy'
        }
      })
      clipboard.on('success', (e) => {
        const callback = el._v_clipboard_success
        callback && callback(e)
      })
      clipboard.on('error', (e) => {
        const callback = el._v_clipboard_error
        callback && callback(e)
      })
      el._v_clipboard = clipboard
    }
  },
  update(el, binding) {
    if (binding.arg === 'success') {
      el._v_clipboard_success = binding.value
    } else if (binding.arg === 'error') {
      el._v_clipboard_error = binding.value
    } else {
      el._v_clipboard.text = function () {
        return binding.value
      }
      el._v_clipboard.action = function () {
        return binding.arg === 'cut' ? 'cut' : 'copy'
      }
    }
  },
  unbind(el, binding) {
    if (binding.arg === 'success') {
      delete el._v_clipboard_success
    } else if (binding.arg === 'error') {
      delete el._v_clipboard_error
    } else {
      el._v_clipboard.destroy()
      delete el._v_clipboard
    }
  }
}
