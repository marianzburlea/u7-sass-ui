// flavour profile
var heroForm = document.querySelector('.hero-carousel')

heroForm.addEventListener('submit', function (e) {
  e.preventDefault()
  var data = Object.fromEntries(new FormData(e.target))
  console.log(data)
})

heroForm.addEventListener('focusin', function (e) {
  var lastFocusedElem = document.querySelector(
    '.hero-carousel input[type="checkbox"][data-last-focused]'
  )

  if (e.target.type === 'checkbox') {
    lastFocusedElem && lastFocusedElem.removeAttribute('data-last-focused')
    e.target.setAttribute('data-last-focused', true)
  }
})

var heroNavigation = document.querySelector('.hero-carousel__nav')

heroNavigation.addEventListener('click', function (e) {
  if (e.target.type === 'button') {
    var direction = e.target.dataset.direction

    // Get all checkboxes within .hero-carousel
    var checkboxes = Array.from(
      document.querySelectorAll('.hero-carousel input[type="checkbox"]')
    )

    // Find the currently focused checkbox
    var currentFocusedIndex = checkboxes.findIndex((checkbox) =>
      checkbox.hasAttribute('data-last-focused')
    )

    if (direction === 'left') {
      // If the first checkbox is currently focused, go to the last checkbox. Otherwise, go to the previous checkbox.
      var newFocusedIndex =
        currentFocusedIndex === 0
          ? checkboxes.length - 1
          : currentFocusedIndex - 1
    } else if (direction === 'right') {
      // If the last checkbox is currently focused, go to the first checkbox. Otherwise, go to the next checkbox.
      var newFocusedIndex =
        currentFocusedIndex === checkboxes.length - 1
          ? 0
          : currentFocusedIndex + 1
    }

    // checkboxes[newFocusedIndex].focus()
    checkboxes[newFocusedIndex].setAttribute('data-last-focused', true)

    // Remove the focus attribute from the previously focused checkbox
    checkboxes[currentFocusedIndex] &&
      checkboxes[currentFocusedIndex].removeAttribute('data-last-focused')
  }
})
// filter
// const smartMainFilterProfileList = document.querySelectorAll(
//   '.smart-filter__main-filter[data-type="profile"]'
// )

// const smartMainFilterAnonymousList = document.querySelectorAll(
//   '.smart-filter__main-filter[data-type="anonymous"]'
// )

// document.querySelector('.smart-filter').addEventListener(
//   'change',
//   (ev) => {
//     console.log(ev.target)
//     console.log('merge')

//     const isChecked = ev.target.checked

//     if (ev.target.id === 'select-all-anonymous') {
//       console.log('select ALL anonymous')
//       smartMainFilterAnonymousList.forEach((element) => {
//         element.checked = isChecked
//       })
//     } else if (ev.target.id === 'select-all-profile') {
//       console.log('select ALL profile')
//       smartMainFilterProfileList.forEach((element) => {
//         element.checked = isChecked
//       })
//     }
//   },
//   false
// )

// window.onerror = (message, source, lineNumber, columnNumber, error) => {
//   console.error('An error is present: ', error)
// }
