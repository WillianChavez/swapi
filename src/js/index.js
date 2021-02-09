const APISwapi = 'https://swapi.dev/api/people/'
let people = '1' // Estate initial from page
// buttons of pagination
const btnNext = document.getElementById('btn_next')
const btnPrevious = document.getElementById('btn_previous')
// Row where show character'scharacteristic in the table
const rowCharacteristic = document.getElementById('table_row_characteristic')
//  Space in the hear of table where show the name
const nameCharacter = document.getElementById('name_character')
//  Space inside rowCharacterisitc where show the hair color
const hairColor = document.getElementById('hairColor')
//  Space inside rowCharacterisitc where show the height
const height = document.getElementById('height')
//  Space inside rowCharacterisitc where show the gender
const gender = document.getElementById('gender')

const table = rowCharacteristic.parentElement.parentElement

const dropdown = document.querySelector('.dropdown-options')
const dropdownSelectContent = document.getElementById('dropdownSelectContent')

// this function animate table for each click on buttons (next and previus)
const animationRotate = (degRotate) => {
    const tableStyle = table.style
    tableStyle.transition = 'transform 0.2s linear'
    tableStyle.transform = `rotate(${degRotate}deg)`
    setTimeout(() => {
        tableStyle.transition = ''
        tableStyle.transform = ''
    }, 400)
}

const getData = (API, resources) => {
    // confirm if resources is diferrent to 17 because people 17 not exist
    fetch(API + resources)
        .then((res) => res.json())
        .then((character) => {
            nameCharacter.innerText = character.name
            gender.innerText = character.gender
            hairColor.innerText = character.hair_color
            height.innerText = character.height

            rowCharacteristic.append(gender)
            rowCharacteristic.append(hairColor)
            rowCharacteristic.append(height)
        })
}

// Get data for Select options  in document
function getDataOptions(API, i) {
    const res = fetch(API + i)
    const optionCharacter = await res.json()

    const option = document.createElement('div')
    const radiobox = document.createElement('INPUT')
    const label = document.createElement('LABEL')

    option.setAttribute('class', 'options')
    radiobox.setAttribute('type', 'radio')
    radiobox.setAttribute('name', 'optionSelect')
    radiobox.setAttribute('class', 'radiobox')
    radiobox.setAttribute('id', `${i}`)
    label.setAttribute('for', `${i}`)
    label.textContent = optionCharacter.name

    radiobox.addEventListener('change', (event) => {
        dropdownSelectContent.textContent = label.textContent
        getData(API, event.target.id)
        animationRotate(360)
    })

    option.append(radiobox)
    option.append(label)
    dropdown.append(option)
}
/*  these call events (btnNext and btnPrevius) do is obtain and show the character,
    in be able to show the next or previus character in the table and call the animationRotate()
    to animate the table for each  click on buttons
    */
btnNext.addEventListener('click', () => {
    people = parseInt(people, 10)
    if (people !== 83) {
        if (people === 17) people = 18
        people += 1
        people = people.toString()
        getData(APISwapi, people)
        animationRotate(360)
    }
    people = people.toString()
})

btnPrevious.addEventListener('click', () => {
    people = parseInt(people, 10)
    if (people !== 1) {
        if (people === 17) people = 16
        people -= 1
        people = people.toString()
        getData(APISwapi, people)
        animationRotate(-360)
    }
    people = people.toString()
})

// call getData function
getData(APISwapi, people)
const fillOptions = async () => {
    for (let i = 1; i <= 83; i += 1) {
        if (i === 17) {
            // alternative a continue, because is recomendation of Eslint
            i += 1
        }
      await  getDataOptions(APISwapi, i)
        // multiples calls to the function getDataOptions()
    }
}
fillOptions()
