const path = require('path');
const express = require('express');   //express is a function
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();


// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');   // joins the paths to the index.html file
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs')                       // tells express that we use handlebars template
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static dir to serve
app.use(express.static(publicDirectoryPath));       // to serve all files of the 'public' folder

app.get('', (req, res) => {                          //it renders the handlebars views file dynamically, it doesn't send
    res.render('index', {
        title: 'Weather',
        name: 'Alex'
    })
})

app.get('/about', (req, res) => {                      //it renders the handlebars views file dynamically, it doesn't send
    res.render('about', {
        title: 'About',
        name: 'Alex',

    })
})

app.get('/help', (req, res) => {                      //it renders the handlebars views file dynamically, it doesn't send
    res.render('help', {
        title: 'Help',
        message: "Help message..",
        name: 'Alex'

    })
})

// /weather
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address term'
        })
    }

    geocode(req.query.address, (error, { longtidute, latidute, location } = {}) => {   //empty default object to resolve destructing issue when the location entered is not valid
        if (error) {
            return res.send( { error} );         //shorthand for {error: error}
        }

        forecast(longtidute, latidute, (error, forecastData) => {
            if (error) {
                return res.send( {error } );
            }

            res.send({
                forecast: forecastData,
                location,                   //shorthand for location: location,
                address: req.query.address
            })
        })
    })


})



app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Help article not found',
        name: 'Alex'
    })
})

// '*' wildcard for any other route, it must be last in the code
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Page not found',
        name: 'Alex'
    })
})

app.listen(3000, () => {
    console.log('server is up on port 3000');
})

