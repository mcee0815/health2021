
 const byNursingHome = (arr) => {
    
    let filt = arr.filter((item) => {
        return item.fac_desc_short === "NH"
})
        return filt
}

 const byHospice = (arr) => {
    return arr.filter((item) => {
        return item.fac_desc_short === "HSPC"
})
}

 const byClinic = (arr) => {
    return arr.filter((item) => {
        return item.fac_desc_short === "HOSP-EC"
})
}

 const notMatch = () => {
    let match  =  document.createElement('p')
       match.setAttribute('class','no-filter-match')
       match.textContent = `No matches found`
       return match      
}

export{byNursingHome,byHospice,byClinic,notMatch}



