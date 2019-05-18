// APIKEY  - 2a410d0366157c278a2acdb364685685
const express = require('express');
const path = require('path');
const request  =require('request');
const app = express();
const bodyParser = require('body-parser');
const apiKey = '2a410d0366157c278a2acdb364685685';
// SETTING THE STATIC FOLDER
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.render('index', {weather: null, error: null});
});


app.post('/', (req, res) => {
    const city = req.body.city;
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
    request(url, (err, response, body) => {
        if(err){
            res.render('index', {weather: null, error: `Error Occured ${err}, PLease try again later`})
        }else{
            let weather = JSON.parse(body);
            if(weather.main == undefined){
            res.render('index', {weather: null, error: `Error Occured ${err}, PLease try again later`})
            }else{
                let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}`;
                res.render('index', {weather: weatherText, error: null});
            };
        };
    });
});

// PORT
const PORT  = 3000 || process.env.PORT;
// LISTENING ON THE PORT 3000
app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`);
});