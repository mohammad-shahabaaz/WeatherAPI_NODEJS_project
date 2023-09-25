const request = require('postman-request')

const geoLocationCode = (address,callback)=>{

    const url2 = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoic2hhaGFiYWF6Y29kZSIsImEiOiJjbG1yNnZieG4wNW5mMmptdWwyYnViNnJqIn0.6xWAI8IZZRTEpwmw3xSEVg`
  
    request({url:url2,json:true},(error,response,body)=>{
           if(error){
            callback("Unable to connect to the weather service",undefined)
          }
          else if (response.body.features.length === 0){
                  callback("Invalid search, Give the correct Input",undefined)
           }
           else{
            callback(undefined,{
              longitude : body.features[0].center[0],
              latitude : body.features[0].center[1],
              Place_name: body.features[0].place_name
            })
           }
          
  
    })
  
  }

  module.exports = geoLocationCode