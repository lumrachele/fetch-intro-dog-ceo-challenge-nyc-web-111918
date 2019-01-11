console.log('%c HI', 'color: firebrick')

const DOGBREED = []

// waiting for the dom content to load before doing anything
document.addEventListener('DOMContentLoaded', () => {
  // getting the dog images
  fetch("https://dog.ceo/api/breeds/image/random/4")
    .then(function(responseObject){
      return responseObject.json()
      })
    .then(function(parsed){
      loadUpPics(parsed.message)
    })


// getting the dog breeds
  fetch("https://dog.ceo/api/breeds/list/all")
    .then(function(responseObject){
      return responseObject.json()
      })
    .then(function(parsed){
      // const allBreedsList = parsed.message
      makeBreedList(parsed.message)
    })

// CONSTANTS to select the html
  const dogImgContainer = document.querySelector("#dog-image-container")
  const dogBreedList = document.querySelector("#dog-breeds")
  const breedDropDown = document.querySelector("#breed-dropdown")
  // console.log(breedDropDown);


//
  function loadUpPics(array){
    array.forEach(function(imgUrl){
      dogImgContainer.innerHTML += `<img src="${imgUrl}" width= "250px">`
    })
  }

  //
  function makeBreedList(breedsObj){
    Object.entries(breedsObj).forEach(function(breed){
      if (breed[1].length === 0){
        dogBreedList.innerHTML += `<li>${breed[0]}</li>`
      }else {
        breed[1].forEach(function(subBreed){
          dogBreedList.innerHTML += `<li>${breed[0]}-${subBreed}</li>`
        })
      }

    })
  }

// CHANGING COLORS ON CLICK
  dogBreedList.addEventListener("click", function(event){
    event.target.style.color = "red"
  })

//
function filteredBreed(breedsObj, clickValue){
  const filteredDog = Object.entries(breedsObj).filter(function(dog){
    return dog[0][0] == clickValue
  })
  dogBreedList.innerHTML = ""
  filteredDog.forEach(function(dog){
    if (dog[1].length === 0){
      dogBreedList.innerHTML += `<li>${dog[0]}</li>`
    }else {
      dog[1].forEach(function(subBreed){
        dogBreedList.innerHTML += `<li>${dog[0]}-${subBreed}</li>`
      })
    }
  })
}

// BREED DROP DOWN
breedDropDown.addEventListener("change", function(event){
  const option = event.target.value
// calling makeBreedList(on the filtered list)
  // makeBreedList()
  fetch("https://dog.ceo/api/breeds/list/all")
    .then(function(responseObject){
      return responseObject.json()
      })
    .then(function(parsed){
      filteredBreed(parsed.message, option)//make a new method filter
    })

  })


})
