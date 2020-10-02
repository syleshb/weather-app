const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require("./utils/geocode")
const weather = require("./utils/weather")
const e = require('express')

//Define paths for Express
const root = path.join(__dirname,'..')
const public = path.join(root,'/public')
const viewPath = path.join(root,'/templates/views')
const partialsPath = path.join(root,'/templates/partials')

console.log(root)
console.log(viewPath)

//creating an express app
const app = express()

//this will get environment variable used for heroku if not found then it will be set to 3000
const port = process.env.PORT || 3000 

//Setup handlerbar engine and views location
app.set('view engine','hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(public))

//set app routes
app.get('', (req,res) => {
    res.render('index',{
        title : "Weather App",
        name : 'Sylesh Ballolla'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About',
        name : 'Sylesh Ballolla',
        profileSrc: 'images/profile.png' 
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        name : 'Sylesh Ballolla',
        message: 'Always make sure you provide the right location' 
    })
})

app.get("/weather", (req,res) => {
    
    const {address} = req.query
    
    if(!address){
        return res.send({
            error: "Please provide address"
        })
    }

    geocode.getGeoCode(address, (error, {lat, long, loc:address} = {}) => {
        if(error){
            return res.send({error})
        }

        weather.getWeather(lat, long, (error,{temperature:temp, precip, weather_icons: icon, weather_descriptions: desc} = {}) => {
            if(error) {
                return res.send({error})
            }

            res.send({
                address,
                temp,
                precip,
                icon,
                desc
            })
        })
    })
})

app.get('/products', (req,res) => {
    //console.log(req.query.search)
    const {search,rating} = req.query
    if(search == undefined){
        return res.send({
            error : "Please provide search term"
        })
    }

    res.send({
        games: ['cricket','footbal']
    })
    
})

app.get('/help/*', (req,res) => {
    const obj = {
        title: '404',
        name : 'Sylesh Ballolla',
        message: 'Sorry, Help Article Not Found' 
    }
    res.render('404', obj)
})

app.get("*", (req,res) => {
    const obj = {
        title: '404',
        name : 'Sylesh Ballolla',
        message: 'Sorry, Page Not Found' 
    }
    res.render('404', obj)
})

//Run express at a particular port
app.listen(port, () => {
    console.log("Server Started on Port "+port+"!!")
})