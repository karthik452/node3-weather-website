const request = require('request');
const geocode_get = (address, callback) => {
    const url_geo = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1Ijoia2FydGhpazQ1MiIsImEiOiJja2YzbWxjbjkwNG9zMnBuNG8zbXZ4eGM4In0.zkFROLvTwhfnyr3mdJ8nIg&limit=1';
    request({ url: url_geo, json: true }, (error, response) => {
    if(error){
        callback('Not able to call service!', undefined);
    }
    else if(response.body.features.length === 0 )
    {
        callback('Unable to find geolocation!', undefined);
    }
    else{
        const geolocation = {
            latitude: 0,
            longitude: 0,
            place: ''
        };
        geolocation.latitude = response.body.features[0].center[1];
        geolocation.longitude = response.body.features[0].center[0];
        geolocation.place = response.body.features[0].place_name;
        callback(undefined, geolocation);
    }
})
};

module.exports = geocode_get;