/**
 * @param {string} path
 * @returns {Boolean}
 */
export function blob2File(blob, fileName = '') {
  const type = blob.type
  const suffix = type.split('/')[1]
  if (!fileName) {
    fileName = `img.${suffix}`
  }
  return new File([blob], fileName, {
    type: blob.type,
    lastModified: Date.now()
  })
}

export function dataURLtoFile(dataUrl, filename = 'file') {
  const arr = dataUrl.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const suffix = mime.split('/')[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], `${filename}.${suffix}`, { type: mime })
}

export function getRoundedCanvas(sourceCanvas) {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  const width = sourceCanvas.width
  const height = sourceCanvas.height
  canvas.width = width
  canvas.height = height
  context.imageSmoothingEnabled = true
  context.drawImage(sourceCanvas, 0, 0, width, height)
  context.globalCompositeOperation = 'destination-in'
  context.beginPath()
  context.arc(
    width / 2,
    height / 2,
    Math.min(width, height) / 2,
    0,
    2 * Math.PI,
    true
  )
  context.fill()
  return canvas
}
