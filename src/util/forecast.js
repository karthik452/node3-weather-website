const request = require('request');
const forecast = (lat, lon, callback) => {
    const url_forecast = 'http://api.weatherstack.com/current?access_key=dc880da38b323c7203603f109ccbc320&query=' + lat + ',' + lon;
    request({ url: url_forecast, json: true }, (error, response) => {
    if(error){
        callback('Not able to call service!', undefined);
    }
    else if(response.body.error)
    {
        callback(response.body.error.info, undefined);
    }
    else{
        const forecast_data = {
            currentTemp: 0,
            feelTemp: 0,
            desc: ''
        };
        console.log(response.body.current)
        forecast_data.desc = response.body.current.weather_descriptions[0] + ' and Humidity: ' + response.body.current.humidity ;
        forecast_data.currentTemp = response.body.current.temperature;
        forecast_data.feelTemp = response.body.current.feelslike;
        callback(undefined, forecast_data);
    }
})
};

module.exports = forecast;