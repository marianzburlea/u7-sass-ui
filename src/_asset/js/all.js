const smartMainFilterProfileList = document.querySelectorAll(
  '.smart-filter__main-filter[data-type="profile"]'
)

const smartMainFilterAnonymousList = document.querySelectorAll(
  '.smart-filter__main-filter[data-type="anonymous"]'
)

document.querySelector('.smart-filter').addEventListener(
  'change',
  (ev) => {
    console.log(ev.target)
    console.log('merge')

    const isChecked = ev.target.checked

    if (ev.target.id === 'select-all-anonymous') {
      console.log('select ALL anonymous')
      smartMainFilterAnonymousList.forEach((element) => {
        element.checked = isChecked
      })
    } else if (ev.target.id === 'select-all-profile') {
      console.log('select ALL profile')
      smartMainFilterProfileList.forEach((element) => {
        element.checked = isChecked
      })
    }
  },
  false
)

window.onerror = (message, source, lineNumber, columnNumber, error) => {
  console.error('An error is present: ', error)
}
