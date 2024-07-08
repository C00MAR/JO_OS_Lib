import areaToSport from './src/areaToSport.js';

// Example usage
const spot = 'Arena Paris Sud 6';
areaToSport(spot)
    .then(data => {
        console.log('Competition sites:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });