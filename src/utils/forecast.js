const axios = require('axios');

const forecast = (latitute, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/5fd2cbe952d9ee042313aa0b463bf9f4/${latitute},${longitude}?units=si`
    axios.get(url)
    .then(({data}) => {
        if(data.error) {
            callback('Unable to find weather data for provided coordinates. Please try again')
        } else {
            const { currently } = data;
            callback(undefined,`${data.daily.data[0].summary} It is currently ${currently.temperature} degree out. There is ${currently.precipProbability}% chances of rain`)
        }
    }).catch(error => {
        callback('Error while connecting weather service')
    })
}

module.exports = forecast;