console.log('Script is loading...')

const rootElement = document.getElementById('root')
if (rootElement) {
  console.log('Found root element:', rootElement)
  rootElement.innerHTML = '<h1 style="color: green;">JavaScript is working!</h1>'
} else {
  console.error('Failed to find root element')
}
