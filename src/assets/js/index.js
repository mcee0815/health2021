import "@scss/styles.scss";
import 'bootstrap'

import {getFacilties,facilitiesByZip,nursingHome,accordionDiv,spinner,rate} from './functions.js'
import {byNursingHome,byHospice,byClinic,notMatch} from './radioFunctions.js'


// NY Health Facility Medical Information API
// https://www.schemecolor.com/css-family-blue.php


let noMatchMsg = notMatch()

// nursing-home radio button click event
nursingHome.addEventListener('click',(e) => {
spinner()
setTimeout(() => {
    let filtered = byNursingHome(facilitiesByZip)
    accordionDiv.innerHTML = ''
    !filtered.length -1 ? getFacilties(filtered) : accordionDiv.appendChild(noMatchMsg)
},rate.fast)
})

// hospice radio button
let hospice = document.querySelector('#hospice')
    hospice.disabled = true
    hospice.addEventListener('click',() => {
    spinner()
    setTimeout(() => {
        accordionDiv.innerHTML = ''
        let filtered = byHospice(facilitiesByZip)
        !filtered.length -1 ? getFacilties(filtered) : accordionDiv.appendChild(noMatchMsg)
    },rate.fast)
    
    })
// hospice radio button
let clinic = document.querySelector('#clinic')
    clinic.disabled = true
    clinic.addEventListener('click',() => {
        spinner()
        setTimeout(() => {
            accordionDiv.innerHTML = ''
            let filtered = byClinic(facilitiesByZip)
            !filtered.length -1 ? getFacilties(filtered) : accordionDiv.appendChild(noMatchMsg)
        },rate.fast)
    })
    



