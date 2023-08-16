// flavour profile
// https://jwt-u7dev-alb.analogfolk.com/rpc/filter/BuildProfile/?taxonomyProfile=Cocktail&taxonomyName=Flavour&taxonomyValues=Fruity,Fresh&nextPage=/en-jwt/whisky-cocktails/profile-characteristic/&saveData=false

var heroForm = document.querySelector('.hero-carousel')
var heroFormPostURL = '/rpc/filter/BuildProfile/'

// check if hero form exists
if (heroForm) {
  heroForm
    .querySelectorAll(
      '.hero-form__link--next :first-child, .hero-form__link--previous :first-child'
    )
    .forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault()
        var formData = new FormData(heroForm)
        var data = {}
        formData.forEach(function (value, key) {
          data[key] = value
        })

        var taxonomyValuesIdMap = {}

        Object.keys(data).forEach(function (key) {
          taxonomyValuesIdMap[document.getElementById(key).dataset.id] =
            data[key]
        })

        var taxonomyValues = Object.keys(taxonomyValuesIdMap).map(function (
          objectKey
        ) {
          return {
            id: objectKey,
            label: taxonomyValuesIdMap[objectKey],
          }
        })

        var postData = {
          taxonomyProfile: heroForm.getAttribute('data-profile'),
          taxonomyName: heroForm.getAttribute('data-taxonomy'),
          saveData: heroForm.getAttribute('data-savedata'),
          taxonomyValues: taxonomyValues,
          nextPage: e.target.getAttribute('href'),
        }

        fetch(heroFormPostURL, {
          method: 'post',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(postData),
        })
          .then(function (res) {
            return res.json()
          })
          .then(function (res) {
            if (res.result) {
              window.location.assign = res.nextPage
            }
          })
          .catch(function (error) {
            console.log('Failed request: ' + error.message)
          })
      })
    })

  heroForm.addEventListener('click', function (e) {
    if (e.target.type === 'checkbox') {
      var howManySelected = heroForm.querySelectorAll(
        '.hero-carousel__item-selector:checked'
      ).length
      var maxItems = +heroForm.dataset.maxitems

      e.target.focus()
      if (howManySelected > maxItems && e.target.checked) {
        e.preventDefault()
      }
    } else if (e.target.type === 'button' && e.target.dataset.direction) {
      var checkboxList = Array.from(
        heroForm.querySelectorAll('.hero-carousel > input[type="checkbox"]')
      )
      var direction = e.target.dataset.direction

      // Get all checkboxes within .hero-carousel

      // Find the currently focused checkbox
      var currentFocusedIndex = checkboxList.findIndex(function (checkbox) {
        return checkbox.hasAttribute('data-last-focused')
      })

      if (direction === 'left') {
        // If the first checkbox is currently focused, go to the last checkbox. Otherwise, go to the previous checkbox.
        var newFocusedIndex =
          currentFocusedIndex === 0
            ? checkboxList.length - 1
            : currentFocusedIndex - 1
      } else if (direction === 'right') {
        // If the last checkbox is currently focused, go to the first checkbox. Otherwise, go to the next checkbox.
        var newFocusedIndex =
          currentFocusedIndex === checkboxList.length - 1
            ? 0
            : currentFocusedIndex + 1
      }

      // checkboxList[newFocusedIndex].focus()
      checkboxList[newFocusedIndex] &&
        checkboxList[newFocusedIndex].setAttribute('data-last-focused', true)

      // Remove the focus attribute from the previously focused checkbox
      checkboxList[currentFocusedIndex] &&
        checkboxList[currentFocusedIndex].removeAttribute('data-last-focused')
    }
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

  var checkboxList = Array.from(
    document.querySelectorAll('.hero-carousel > input[type="checkbox"]')
  )

  var backgroundContainer = heroForm.querySelector(
    '.hero-carousel__background-list'
  )
  var backgroundContainerLastChild = heroForm.querySelector(
    '.hero-carousel__background-list .hero-carousel__background-effect'
  )

  var backgroundList = heroForm.querySelectorAll(
    '.hero-carousel__background-list > img'
  )

  if (checkboxList.length < 7) {
    var selectedLabelContainer = heroForm.querySelector(
      '.hero-carousel__item-selected-list'
    )
    var descriptionContainer = heroForm.querySelector(
      '.hero-carousel__item-description-list'
    )
    var descriptionList = heroForm.querySelectorAll(
      '.hero-carousel__item-description-list > .hero-carousel__item-description'
    )
    var selectedLabelList = heroForm.querySelectorAll(
      '.hero-carousel__item-selected-list > .hero-carousel__item-remove'
    )
    var itemListContainer = heroForm.querySelector('.hero-carousel__item-list')
    var itemList = heroForm.querySelectorAll(
      '.hero-carousel__item-list > .hero-carousel__item'
    )

    Array.from({ length: 7 - checkboxList.length }, function (_, k) {
      var key = k % checkboxList.length

      // newCheckbox
      var newCheckbox = document.createElement('input')
      newCheckbox.type = 'checkbox'
      newCheckbox.id = 'hero-carousel-' + (checkboxList.length + k + 1)
      newCheckbox.name = 'hero-carousel-' + (checkboxList.length + k + 1)
      newCheckbox.className = 'hero-carousel__item-selector'
      newCheckbox.setAttribute(
        'data-id',
        checkboxList[key].getAttribute('data-id')
      )
      newCheckbox.setAttribute('value', checkboxList[key].getAttribute('value'))
      heroForm.insertBefore(newCheckbox, backgroundContainer)

      // new selected item
      var newSelectedLabel = document.createElement('label')
      newSelectedLabel.setAttribute(
        'for',
        'hero-carousel-' + (checkboxList.length + k + 1)
      )
      newSelectedLabel.innerHTML = selectedLabelList[key].innerHTML
      newSelectedLabel.className = 'hero-carousel__item-remove'
      newSelectedLabel.setAttribute(
        'style',
        selectedLabelList[key].getAttribute('style')
      )
      selectedLabelContainer.appendChild(newSelectedLabel)

      // new clickable label item
      var newSelectableLabel = document.createElement('label')
      newSelectableLabel.setAttribute(
        'for',
        'hero-carousel-' + (checkboxList.length + k + 1)
      )
      newSelectableLabel.innerHTML = itemList[key].innerHTML
      newSelectableLabel.className = 'hero-carousel__item'
      newSelectableLabel.setAttribute(
        'style',
        itemList[key].getAttribute('style')
      )
      itemListContainer.appendChild(newSelectableLabel)

      // new description items
      var newDescription = document.createElement('p')
      newDescription.textContent = descriptionList[key].textContent
      newDescription.className = 'hero-carousel__item-description'
      descriptionContainer.appendChild(newDescription)

      // new background items
      var newBackground = document.createElement('img')
      newBackground.alt = backgroundList[key].getAttribute('alt')
      newBackground.src = backgroundList[key].src
      newBackground.className = 'hero-carousel__background'
      backgroundContainer.insertBefore(
        newBackground,
        backgroundContainerLastChild
      )
    })
  }

  var startX
  var dist
  var threshold = 100 // Minimum distance swiped for action

  heroForm.addEventListener(
    'touchstart',
    function (e) {
      var touchObj = e.changedTouches[0]
      startX = touchObj.pageX
      e.preventDefault()
    },
    false
  )

  heroForm.addEventListener(
    'touchmove',
    function (e) {
      e.preventDefault() // Prevent scrolling while swiping
    },
    false
  )

  heroForm.addEventListener(
    'touchend',
    function (e) {
      var touchObj = e.changedTouches[0]
      dist = touchObj.pageX - startX

      if (Math.abs(dist) >= threshold) {
        var direction = dist > 0 ? 'left' : 'right'

        var navigationButton = heroForm.querySelector(
          'button[data-direction="' + direction + '"]'
        )
        navigationButton && navigationButton.click()
        e.preventDefault()
      } else {
        if (e.target.tagName === 'LABEL') {
          heroForm.querySelector('#' + e.target.getAttribute('for')).click()
        }
      }
    },
    false
  )

  document
    .querySelector('.hero-carousel__current')
    .setAttribute(
      'data-howmany',
      heroForm.querySelectorAll('.hero-carousel__item-selector').length
    )
}

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
