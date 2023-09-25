const express = require('express');
const request = require('postman-request')
const hbs = require('hbs');
const path = require('path')

const app = express()

//Define the paths for Express config

const publicDicrectory = path.join(__dirname,'../public');
const veiwsPath = path.join(__dirname,"../templates/views");
const partialsPath = path.join(__dirname,"../templates/partials")

//Setup handlebars engine and views location

app.set('view engine','hbs');
app.set('views', veiwsPath);
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDicrectory));


app.get('/',(req,res)=>{
    res.render('index',{
        title:"Weather App",
        name:"Created by ____Mohammad Shahabaaz"
    })
})

app.get("/help",(req,res)=>{
    res.render("help",{
        title:"Help",
        name:"Created by ____Mohammad Shahabaaz"
    })
})

app.get("/about",(req,res)=>{ 
    res.render("About",{
        title: "About",
        name:"Created by ____Mohammad Shahabaaz"
    })
})

const geoLocationCode = require('./utils/geoLocation')

const forecast = require('./utils/forecast')

app.get("/weather",(req,res)=>{
    let address = req.query.address
    geoLocationCode(address,(error,{longitude,latitude,Place_name}={}) => {
        if(error){
        //   return console.log("Error : ",error);
          return res.send({Error :error});
        }
        
        forecast(latitude,longitude,(error,forecast)=>{
          if(error){
            // console.log("Error :", error);
            return res.send({Error:error});
          }
          // console.log(data)
        //   console.log("Data :",Place_name)
        //   console.log("Forecast : ", forecast)
          res.send({
            Data  : Place_name,
            Forecast : forecast,
            location: address
        });
        })
      
      })
    })



app.get("/help/*",(req,res)=>{
    res.render("404",{
        title:"404",
        errorMessage: "Help Article not found"
    })
})

app.get("*",(req,res)=>{
    res.render("404",{
        title:"404",
        errorMessage: "Page not Found"
    })
})


app.listen(3000,()=>{
    console.log("Server is running on the port 3000")
})