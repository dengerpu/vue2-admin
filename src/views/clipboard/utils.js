/**
 * 使用execCommand实现copy
 * @param value
 */
export function handleCopy(value) {
  const inputElement = document.createElement('input')
  inputElement.value = value
  document.body.appendChild(inputElement)
  inputElement.select()
  document.execCommand('copy')
  this.$message.success('复制成功')
  document.body.removeChild(inputElement)
}

/***
 * 使用navigator.clipboard实现复制
 * @param value
 */
export function handleCopy2(value) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(value).then(() => {
      this.$message.success('复制成功(navigator.clipboard))')
    })
  } else {
    const textAreaElement = document.createElement('textarea')
    textAreaElement.value = value
    textAreaElement.style.position = 'absolute'
    textAreaElement.style.opacity = '0'
    textAreaElement.style.left = '-99999px'
    textAreaElement.style.top = '-99999px'
    document.body.appendChild(textAreaElement)
    textAreaElement.focus()
    textAreaElement.select()
    document.execCommand('copy')
    this.$message.success('复制成功(execCommand))')
    textAreaElement.remove()
    document.body.removeChild(textAreaElement)
  }
}
