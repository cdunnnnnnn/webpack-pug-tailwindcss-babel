import '@babel/polyfill'

import '../scss/styles.scss'

function hello() {
  console.log('👋 Hello!')
}

function init() {
  hello()
}

window.onload = () => {
  init()
}
