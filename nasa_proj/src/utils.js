import axios from "axios";



const PATH = 'https://api.nasa.gov/mars-photos/api/v1/'
const ApiKey  ='&api_key=6KfSVyinleEDG2Jo4qIxdb1JbdQBy8QW8OJH9A5g'



//https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2015-6-3&api_key=6KfSVyinleEDG2Jo4qIxdb1JbdQBy8QW8OJH9A5g



/**
 * Return all ImagesByDate
 * @returns {Promise<unknown>}
 */
export const getImagesByDate = async (date,page) => {
    const carousel_of_images = `rovers/curiosity/photos?earth_date=${date}${page?`&page=`+page:''}`
    let images = '';
    try {
        images = await axios.get(PATH + carousel_of_images +ApiKey);
        return images.data;
    } catch (err) {
        console.error(err);
    }
}

/**
 * Return all Weather info
 * @returns {Promise<unknown>}
 */
export const getWeather = async (realData) => {
     let weatherData = '';
     if(realData){
         const api = 'https://mars.nasa.gov/rss/api/?feed=weather&category=insight_temperature&feedtype=json&ver=1.0'
         try {
             weatherData = await axios.get(api);
             return weatherData.data;
         } catch (err) {
             console.error(err);
         }
     }else{
         try {
             weatherData = await axios.get('../mockJson/insight_weather.json');
             return weatherData.data;
         } catch (err) {
             console.error(err);
         }
     }
}
