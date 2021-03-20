

// application data is stored in this array
export let facilitiesByZip = []

// dom References
 export let accordionDiv = document.querySelector('#accordion-div')// data view/component
 let zip = document.getElementById('zip') // zipcode input text field
 let searchBtn = document.querySelector('#search-btn') // search button
 let zipMsg = document.querySelector('#zip-msg') // validation for proper user input

export let nursingHome = document.querySelector('#nursing-home')
nursingHome.disabled = true // radio buttons disabled at startup since there no data yet.
let zipQuery // stores the zipcode input from the user

export const spinner = () => accordionDiv.innerHTML = '<i class="fas fa-spinner fa-pulse fa-2x"></i>'
const searchSpinner = () => searchBtn.innerHTML = '<i class="fas fa-spinner fa-pulse"></i>'
// spin rates
export const rate = {
    default:1000,
    fast:500,
    slow:1500
}

// search button event listener
// 1: it will check for valid input (zipcode) first.
// 2:once validation is ok, the byZip() function will make the fetch request to the api
searchBtn.addEventListener('click',(e) => {
    zipMsg.style.color = "red"
    zipMsg.style.fontSize = "12px"
    
    if (!zip.value) {
        zipMsg.textContent = 'must enter a zipcode'
        nursingHome.disabled = true
        hospice.disabled = true
    } else if (zip.value.length < 4) {
        zipMsg.textContent = 'Enter a 5 digit zipcode'
        nursingHome.disabled = true
        hospice.disabled = true
    } else if (zip.value.length > 5) {
        zipMsg.textContent = '5 digit zipcodes only'
        nursingHome.disabled = true
        hospice.disabled = true
    } else {
        spinner()
        searchSpinner()
        
        setTimeout(() => {
            byZip(zipQuery)
            searchBtn.innerHTML = '<i class ="fas fa-search"></i>'
        },rate.default)
        
        zipMsg.textContent = ''
        nursingHome.disabled = false
        hospice.disabled = false
        clinic.disabled = false
    }
})

// text input event listener stores value entered by user
zip.addEventListener('input',(e) => { 
    // zipQuery = e.target.value 
    zipQuery = Number(e.target.value)  // convert input to a number
})

const makeParent = (element,parent) => {
    let el = document.createElement(element)
    parent.appendChild(el)
    return el
}
const makeElement = (element,parent,text) => {
    let el = document.createElement(element)
        el.textContent = text
        parent.appendChild(el)
        return el
}
// unchecks the radio buttons when the user clicks input box to make a new search
zip.addEventListener('click',() => {
    nursingHome.checked = false
    hospice.checked = false
    clinic.checked = false
})

const clearView = () => {
    zip.value = ''
    accordionDiv.innerHTML = ''
}
// send the data to the browser
export const  getFacilties = (data) => {
    clearView()
    let noRecords = makeParent('h3',accordionDiv)
    noRecords.setAttribute('class','no-filter-match')
    noRecords.style.display = 'none'
   
    if (data.length === 0) {
            noRecords.style.display = 'block'
            noRecords.textContent = 'None Found'
            nursingHome.disabled = true
            hospice.disabled = true
            clinic.disabled = true
    }

    data.forEach((facility) => {

        let button = makeElement('button',accordionDiv,facility.facility_name)
            button.classList.add(...['active','accordion'])

        let panel = makeParent('div',accordionDiv)
            panel.setAttribute('class','panel')
        
        let address = makeElement('p',panel, `Address: ${facility.address1}`)
        let phone = makeElement('p',panel,`Phone: ${facility.fac_phone}`)
        let description = makeElement('p',panel,`Description: ${facility.description}`)
        let county = makeElement('p',panel,`County: ${facility.county}`)

            button.addEventListener('click',function(e){
            this.classList.toggle('active')
       
        /* Toggle between hiding and showing the active panel */
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
          } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
          }
        })
    });
}
// makes the fetch request ,the data returned gets stored in facilitiesByZip array
export const byZip = (zip) => {
    try {
         fetch(`https://health.data.ny.gov/resource/vn5v-hh5r.json?fac_zip=${zip}`)
        .then((response) => {
            if (!response.ok) {    
                throw new Error('resource unavailable')
            } else {
                return response.json()
            }
        })
        .then(data => {
            facilitiesByZip = data
            getFacilties(facilitiesByZip)  
            });
    } catch (err) {
        console.log(err)
    }
}
// const byZipv2 = (zip) => {

//     return fetch(`https://health.data.ny.gov/resource/vn5v-hh5r.json?fac_zip=${zip}`)
//     .then((response) => {
//         if (response.status === 200) {
//             return response.json()
//         } else {
//             throw new Error('something went wrong')
//         }
//     }).then((data) => {
//         return data   
//     }).catch((err) => {
//         console.log(err)
//     })     
// }

//  byZipv2(11717)
//     .then((data) => {
//         getFacilties(data)
//         console.log(data)
// }).catch((err) => {
//     console.log(err)
// })