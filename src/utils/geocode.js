
const axios = require('axios');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoibmlsa2FtYWxzaGFoIiwiYSI6ImNrOGg0bHZiazAzb2ozbG4ybXdmanM2bHUifQ.YB4f9PeNAXzM-rIPAJdN0g&limit=1`
    axios.get(url).then(({data}) => {
        const {features} = data;
        const [longitude, latitude] = features[0].center;
        const {place_name} = features[0];
        if(features.length) {
            callback(undefined, {
                location: place_name,
                latitude,
                longitude
            })
        } else  {
            callback('Unable to find location, Please search with different search term.')
        }
    }).catch(error => {
        callback('Error while connecting with location services')
    })
}

module.exports = geocode;