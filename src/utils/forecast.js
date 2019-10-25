const request = require('request');

const forecast = (longtidute, latidute, callback) => {
    const url = 'https://api.darksky.net/forecast/b97f8f537f4b4d5431bda76e09d16194/' + latidute + ',' + longtidute + '?units=si';

    //{ url: url, json: true } using method shorthand below
    request({ url, json: true }, (error, { body }) => {
        if (error){
            callback('Unable to connect to weather services', undefined);
        }else if (body.error){
            callback('Unable to find location, error code:' + body.code, undefined);
        }else{
            callback(undefined, `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees Celsius out. There is a ${body.currently.precipProbability}% of rain`);
        }
    })
}

module.exports = forecast;