import areaToSport from './src/areaToSport.js';
import areaToInfos from './src/areaToInfos.js';

// Example usage
const spot = 'Pont Alexandre III';
areaToSport(spot)
    .then(data => {
        console.log('Competition sites:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });


areaToInfos(spot)
    .then(data => {
        console.log('Competition sites Infos Event:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });