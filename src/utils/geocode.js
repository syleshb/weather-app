const request = require("postman-request")

const getGeoCode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) +".json?access_token=pk.eyJ1Ijoic3lsZXNoIiwiYSI6ImNrZjYyYWZydzAyamIydHBqcWpjMHJsNzMifQ.Uu13Kmkt8aK_RqIPL3gqxQ&limit=1"

    request(url,(error,{body} = {}) => {

        if(error){
            //console.log(error.info)
            callback(error.info,undefined)
        }if(body.error){
            //console.log(response.body.error.info)
            callback(body.error.info,undefined)
        }else {
            const {features} = JSON.parse(body)

            if(features.length == 0) {
                callback("Something is wrong with your location, please check and try again",undefined)
            }else{
                const data  = {
                    lat : features[0].center[1],
                    long : features[0].center[0],
                    loc : features[0].place_name
                }
                //console.log("Latitude : "+ obj.features[0].center[1]+" Longitude : "+obj.features[0].center[0])
                callback(undefined,data)
            }
        }
    })
}

module.exports = {
    getGeoCode : getGeoCode
}