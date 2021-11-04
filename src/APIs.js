// API 

// const axios = require("axios"); 



// axios.get(`http://numbersapi.com/random/`).then(function(response){
//     console.log(response.data)
// });
// const {title} = require("process");

// axios.get(`https://ghibliapi.herokuapp.com/films/`).then(function(response){
//     for(let i = 0 ; i <  response.data.length ; i++)
//     console.log(response.data[i].title);
// });


const prompt = require('prompt-sync')()
const axios = require('axios')

let nytKey = 'Q1qDrGWAuH6lPzYT8uxZN25VDqZch81d'
let weatherKey = '6526c49f-fd3c-43d4-97b3-4dad0a58b3ea'

let char = "*"
let charLong = char 
let temp = 0
let getInfo = prompt('Would you like to check weather and news for your area? Reply with Y or N ')

async function getDataFromApis() {
    let weatherResp = await axios.get(`http://api.airvisual.com/v2/nearest_city?key=${weatherKey}`)
    let city = weatherResp.data.data.city
    let state = weatherResp.data.data.state
    let weather = weatherResp.data.data.current.weather
    temp = weather.tp

    charCount = Math.max((city.length + state.length + 26), 57)

    for (let i = 0; i < charCount; i++) { charLong += "*" }

    console.log(charLong)
    console.log(`Here is some informatoni for ${city}, ${state}`)
    console.log(charLong)
    console.log(`----- Weather for ${city} -----`)
    console.log(`${char} Temperature: ${temp} degrees celsuis`)
    console.log(`${char} Pressure: ${weather.pr} hPa`)
    console.log(`${char} Humidity: ${weather.hu}%`)
    console.log(`${char} Wind speed: ${weather.ws} m/s`)
    console.log(`${char} Wind direction: ${weather.wd} degrees. (N=0, E=90, S=180, W=270)`)
    console.log(charLong)
    console.log('\n')

    let nytCityResp = await axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${city}&api-key=${nytKey}`)
    let nytCityDocs = nytCityResp.data.response.docs[0]

    let nytStateResp = await axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${state}&api-key=${nytKey}`)
    let nytStateDocs = nytStateResp.data.response.docs[0]

    let funFact = await axios.get(`http://numbersapi.com/${temp}/`)
    let fact = funFact.data
    
    console.log(`Latest NY Times article from the ${city} area.`)
    console.log(charLong)
    console.log(`Title: ${nytCityDocs.abstract}`)
    console.log(`Link: ${nytCityDocs.web_url}`)
    console.log('\n')

    let getStateNews = prompt(`Would you like to the latest article for ${state}? `)
    if (getStateNews.toLowerCase() == 'y') {
        console.log('\n')
        console.log(`Latest NY Times article from ${state}.`)
        console.log(charLong)
        console.log(`Title: ${nytStateDocs.abstract}`)
        console.log(`Link: ${nytStateDocs.web_url}`)
        console.log('\n')

        let getFact = prompt(`What about a random fact about your temperature (${temp})? `)
        if (getFact.toLowerCase() == 'y') {
            console.log(fact)
        }
        else {
            console.log('Copy that. See ya next time!')
        }
    }
    else {
        let getFact = prompt(`What about a random fact about your temperature (${temp})? `)
        if (getFact.toLowerCase() == 'y') {
            console.log(fact)
        }
        else {
            console.log('Copy that. See ya next time!')
        }
    }
}

if (getInfo.toLowerCase() == 'y') { getDataFromApis().then() }