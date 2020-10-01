console.log("Client side JS")

// fetch('http://localhost:3000/weather?address=94555').then((response) => {
//     //console.log(response.status)
//     response.json().then((data) => {
//         if(data.error){
//             console.log(data.error)
//         }else{
//             console.log(data.address)
//             console.log(data.temp)
//             console.log(data.precip)
//         }
//     })
// })

const weatherForm = document.querySelector('form')
const addressInput = document.querySelector('input')
const weatherForecast = document.querySelector('#weatherForecast')
const weatherError = document.querySelector('#weatherError')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    
    const address = addressInput.value
    const fetchURL = "/weather?address="+address
    
    weatherForecast.textContent = 'Loading...'

    fetch(fetchURL).then((response) => {

        response.json().then((data) => {
            if(data.error){
                console.log(data.error)
                weatherError.textContent = data.error
                weatherForecast.textContent = ''
            }else{
                weatherForecast.textContent = 'Location :' + data.address
                weatherError.textContent = '\n Temp : ' + data.temp
                weatherError.textContent += "\n Precip : " + data.precip

                console.log(data.address)
                console.log(data.temp)
                console.log(data.precip)
            }
        })
    })
})