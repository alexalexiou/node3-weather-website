const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYWxleGlvdWEiLCJhIjoiY2sxZGg1a21qMDZkdjNjcW13cnZlejVneSJ9.mSuT7mFTtI2yDirfLZGGgQ'; 

    request( {url, json: true }, (error, { body }) => {
        if (error){
        callback('Unable to connect to location services', undefined );             //error, response is undifined
        }else if (body.features.length === 0){
            callback('Unable to find location, try another search,', undefined);
        }else{
            callback(undefined, {
                longtidute: body.features[0].center[0],
                latidute: latitude = body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}


module.exports = geocode;

// //here (error, data)=> console.log... is a callback function. Callback functions are passed
// //in another function (here geocode) as an argument , with intention to be called later on
// geocode('Greece', (error, data) => {                
//     console.log('Error', error);
//     console.log('Data', data);
// })


