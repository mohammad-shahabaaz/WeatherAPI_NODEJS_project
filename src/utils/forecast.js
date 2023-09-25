const request = require('postman-request');

const forecast = (latitude,longitude,callback)=>{

const url = `http://api.weatherstack.com/current?access_key=1fb67a227e6e18d31ca96b0e8b89065c&query=${latitude},${longitude}&units=m`
 
request({url:url,json:true},(error,response,body)=>{
            if(error){
              callback("Unable to connect to the weather service",undefined)
            }
            else if (response.body.error){
              callback("Invalid search, Give the correct Input",undefined)
            }
            else{
             callback(undefined,`Today it is like  ${body.current.weather_descriptions[0]} currently with ${body.current.temperature} degrees out in ${body.location.name} . Here it feelslike ${body.current.feelslike} degrees`)
        
            }
})


}

module.exports = forecast


