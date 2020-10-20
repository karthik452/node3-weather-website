const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode_get = require('./util/geolocation');
const forecast = require('./util/forecast');

const app = express();
app.set('view engine', 'hbs');
console.log(__dirname);
console.log(__filename);
console.log(path.join(__dirname, '../public'));
// Define Paths for Express Config
const pubilPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup HandleBars Engine and Views location
app.set('views', viewsPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);

//Setup Static directory to Server
app.use(express.static(pubilPath));
app.get('', (req,res) => {
    res.render('index', {
        title_partials: 'Karthik Website',
        title: 'Weather App',
        name: 'Karthik'
    });
})

app.get('/about', (req,res) => {
    res.render('about',{    
        title_partials: 'Karthik Website'
    });
}
);

app.get('/about/*', (req,res) => {
    res.send('404 - Abount Sub-Page not found');
}
);

app.get('/products', (req,res) => {
    console.log(req.query);
    if(!req.query.search){
        return res.send({
            error: 'Kindly provide search criteria'
         });
    }
    res.send({
        products:[]
    })
}
);

app.get('/weather', (req,res) => {
    console.log(req.query);
    if(!req.query.address){
        return res.send({
           error: 'Kindly provide address criteria'
        });
    }else{
        geocode_get(req.query.address, (error, geo) => {
            if(error)
            {
                res.send({
                    error: 'Enter valid address'
                 });
            }else{
                forecast(geo.latitude, geo.longitude, (error,forecast_data) => {
                    if(error){
                        res.send({
                            error: error                         });
                    }else{
                        res.send({
                            forecast:forecast_data.desc,
                            Temperature:forecast_data.currentTemp,
                            address: req.query.address
                            });
                        }       
                })                
            }
        });
    }
    
}
);

app.get('*', (req,res) => {
    res.send('404 - Page not found');
}
);

// app.get('', (req,res) => {
//     res.send('Home Page')
// }
// );

// app.get('/about', (req,res) => {
//     res.send('About Page')
// }
// );

// app.get('/help', (req,res) => {
//     res.send('Help Page')
// }
// );


app.get('/weather', (req,res) => {
    res.send('Weather Page')
}
);

app.listen(3000, () => {
    console.log('Server is up on Port 3000');
})