const request = require("postman-request")

const getWeather = (lat,long,callback) => {
    const wURL = "http://api.weatherstack.com/current?access_key=2a067c4956e6449315c96bd8284b2207&query="+lat+","+long
    request(wURL, (error,{body} = {}) =>{
        if(error){
            //console.log(error.info)
            callback(error.info,undefined)
        }if(body.error){
            //console.log(response.body.error.info)
            callback(body.error.info,undefined)
        }else{
            const {current} = JSON.parse(body)
            const {temperature, precip, weather_icons, weather_descriptions} = current
            const data = {
                temperature,
                precip,
                weather_icons,
                weather_descriptions
            }
            // const temp = newObj.current.temperature
            // const precip = newObj.current.precip
            callback(undefined,data)
        }
    })
}

module.exports = {
    getWeather : getWeather
} 