const request = require('request');

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoicHJhbmF2MTI5NiIsImEiOiJjazVnZnJ5aHAwNnFhM21wZXFyODZwaHl0In0.e6DdmL5cjB7f3bAe4Gk01w';
    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to the Map services', undefined);
        } else if(body.features.length === 0) {
            callback('Unable to find location. Try another search', undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location:  body.features[0].place_name
            });
        }
    })
}

module.exports = geoCode;