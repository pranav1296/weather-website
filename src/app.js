const path = require('path');
const express = require('express');
const hbs = require('hbs');
const app = express();
const geoCode = require('./utils/geoCode');
const forecast = require('./utils/forecast');

//Define paths for express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup Handlebars and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup Static directory to serve
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Pranav Aneja'
    });
});
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Pranav Aneja'
    });
});
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Pranav Aneja' 
    })
});
app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Please add an address'
        })
    }
    geoCode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({error});
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({error});
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        });
    });
    // res.send({
    //     forecast: 'Its 15 degrees out',
    //     location: 'Punjab',
    //     address: req.query.address
    // })
    // res.send({
    //     forecast: 'Its 15 degrees out',
    //     location: 'Ludhiana'
    // });
});
app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query);
    res.send({
        products: []
    });
})
app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'Pranav Aneja',
        errorMessage: 'Help article not found'
    })
})
app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'Pranav Aneja',
        errorMessage: 'Page not found'
    })
});
app.listen(3000, () => {
    console.log('Server is up on port 3000')
});